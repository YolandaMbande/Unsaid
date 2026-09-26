<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function conversations(Request $request)
        {
            $conversations = $request->user()
                ->conversations()
                ->with('messages')
                ->latest('updated_at')
                ->get()
            ->map(function ($conversation) {

                $firstUserMessage = $conversation->messages
                    ->where('role', 'user')
                    ->first();

                return [
                    'id' => $conversation->id,

                    'title' => $conversation->title
                        ?: ($firstUserMessage
                            ? \Illuminate\Support\Str::limit(
                                $firstUserMessage->content,
                                35
                            )
                            : 'New Conversation'),

                    'updated_at' =>
                        $conversation->updated_at->diffForHumans(),
                ];
            });

        return response()->json($conversations);
    }


    public function message(Request $request)
    {
        $request->validate([
            'conversation_id' => [
                'nullable',
                'integer',
                'exists:conversations,id'
            ],

            'conversation' => [
                'required',
                'array'
            ],

            'conversation.*.role' => [
                'required',
                'string'
            ],

            'conversation.*.content' => [
                'required',
                'string',
                'max:5000'
            ],
        ]);


        try {

            $conversation = $request->conversation_id
                ? $request->user()
                    ->conversations()
                    ->findOrFail($request->conversation_id)
                : $request->user()
                    ->conversations()
                    ->create([
                        'title' => 'New Conversation',
                    ]);


            $latestMessage = collect(
                $request->conversation
            )
                ->where('role', 'user')
                ->last();


            if ($latestMessage) {

                $conversation->messages()->create([
                    'role' => 'user',
                    'content' => $latestMessage['content'],
                ]);

            }


            /*
             * Give the conversation a useful title
             * from the first message.
             */

            if (
                $conversation->title === 'New Conversation'
                && $latestMessage
            ) {

                $conversation->update([
                    'title' => \Illuminate\Support\Str::limit(
                        $latestMessage['content'],
                        35
                    ),
                ]);

            }


            $response = Http::withToken(
                config('services.openrouter.api_key')
            )
                ->withHeaders([
                    'HTTP-Referer' =>
                        'http://127.0.0.1:8000',

                    'X-Title' =>
                        'Unsaid',
                ])
                ->post(
                    'https://openrouter.ai/api/v1/chat/completions',
                    [
                        'model' =>
                            'openrouter/free',

                        'messages' =>
                            array_merge(
                                [
                                    [
                                        'role' =>
                                            'system',

                                        'content' =>
                                            'You are Unsaid, a warm, empathetic conversational companion. Help people express and unpack their thoughts. Be supportive, natural, gentle, and conversational. You are not a therapist and should not diagnose people.',
                                    ],
                                ],

                                $request->conversation
                            ),
                    ]
                );


            if ($response->failed()) {

                return response()->json([
                    'error' =>
                        $response->json(
                            'error.message'
                        )
                        ?? 'OpenRouter request failed.',
                ], 500);

            }


            $reply =
                $response->json(
                    'choices.0.message.content'
                )
                ?? 'I’m sorry, I couldn’t come up with a response.';


            $conversation->messages()->create([
                'role' => 'assistant',
                'content' => $reply,
            ]);


            $conversation->touch();


            return response()->json([
                'reply' =>
                    $reply,

                'conversation_id' =>
                    $conversation->id,
            ]);


        } catch (\Throwable $e) {

            return response()->json([
                'error' =>
                    $e->getMessage(),
            ], 500);

        }
    }


public function show(Request $request, Conversation $conversation)
{
    $conversation = $request->user()
        ->conversations()
        ->with('messages')
        ->findOrFail($conversation->id);

    return response()->json([
        'conversation_id' => $conversation->id,
        'title' => $conversation->title,
        'messages' => $conversation->messages->map(function ($message) {
            return [
                'role' => $message->role,
                'content' => $message->content,
            ];
        }),
    ]);
}

public function destroy(Request $request, Conversation $conversation)
{
    $conversation = $request->user()
        ->conversations()
        ->findOrFail($conversation->id);

    $conversation->delete();

    return response()->json([
        'success' => true,
    ]);
}
}