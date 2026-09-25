<!DOCTYPE html>

<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="csrf-token"
        content="{{ csrf_token() }}"
    >

    <title>Unsaid — Talk</title>

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;1,500&display=swap"
        rel="stylesheet"
    >

      @vite(['resources/css/chat.css', 'resources/js/chat.js'])

</head>


<body>


<div class="app-layout">

<div
    class="mobile-sidebar-overlay"
    id="mobileSidebarOverlay"
></div>
    <!-- SIDEBAR -->

    <aside class="conversation-sidebar">

        <div class="sidebar-header">

            <a
                href="{{ url('/') }}"
                class="sidebar-logo"
            >
                unsaid.
            </a>


            <button
                type="button"
                id="newConversationButton"
                class="new-conversation-button"
            >
                + New conversation
            </button>

        </div>


        <div
            class="conversation-list"
            id="conversationList"
        >

            <!-- Conversations appear here -->

        </div>

    </aside>


    <!-- MAIN CHAT -->

    <div class="chat-page">


        <header>

        <button
    type="button"
    class="mobile-menu-button"
    id="mobileMenuButton"
    aria-label="Open conversations"
>
    ☰
</button>
            <a
                href="{{ url('/') }}"
                class="logo"
            >
                unsaid.
            </a>


            <a
                href="{{ url('/') }}"
                class="back-button"
            >
                ← Back
            </a>

        </header>


        <section class="chat-intro">

            <h1>
                What's on your mind?
            </h1>


            <p>
                You don't have to organise your thoughts first.
                Just start wherever you are.
            </p>

        </section>


        <main
            class="chat-window"
            id="chatWindow"
        >

            <!-- Messages appear here -->

        </main>


        <section class="chat-input-area">


            <form
                class="chat-form"
                id="chatForm"
            >


                <input
                    type="text"
                    id="messageInput"
                    placeholder="Say what's on your mind..."
                    autocomplete="off"
                >


                <button
                    type="button"
                    class="icon-button"
                    id="voiceButton"
                    aria-label="Voice mode"
                >
                    ♫
                </button>


                <button
                    type="button"
                    class="icon-button call-button"
                    id="callButton"
                    aria-label="Start Call Mode"
                >
                    ☎
                </button>


                <button
                    type="submit"
                    class="icon-button send-button"
                    id="sendButton"
                    aria-label="Send message"
                >
                    ↑
                </button>


            </form>


            <p class="voice-note">

                <span>Voice mode</span>
                will let you talk instead of type.

            </p>


        </section>


    </div>

</div>



<!-- =========================================
     CALL MODE
========================================= -->

<div
    class="call-screen"
    id="callScreen"
>


    <div class="call-header">


        <button
            type="button"
            class="call-back"
            id="callBackButton"
            aria-label="Close Call Mode"
        >
            ↓
        </button>


        <span>
            Unsaid
        </span>


    </div>


    <div class="call-content">


        <div
            class="call-avatar"
            id="callAvatar"
        >
            <span>u.</span>
        </div>


        <h1>
            unsaid.
        </h1>


        <p
            class="call-status"
            id="callStatus"
        >
            Ready to listen
        </p>


        <div
            class="call-timer"
            id="callTimer"
        >
            00:00
        </div>

        <div class="call-transcript" id="callTranscript"></div>


    </div>


    <div class="call-controls">


        <button
            type="button"
            class="call-control mute-control"
            id="muteButton"
            aria-label="Mute microphone"
        >
            🎤
        </button>


        <button
            type="button"
            class="call-end"
            id="endCallButton"
            aria-label="End call"
        >
            ✕
        </button>


    </div>


</div>

<script>
    window.unsaidConfig = {
        conversationsUrl: @json(url("/conversations")),
        chatUrl: @json(url("/chat")),
        chatMessageUrl: @json(url("/chat/message"))
    };
</script>
</body>

</html>