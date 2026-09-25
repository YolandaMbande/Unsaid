# Unsaid

**Say it out loud.**

Unsaid is an AI-powered conversational companion built to give people a space to express and unpack their thoughts without needing to have the right words first.

Instead of focusing on productivity or structured prompts, Unsaid is designed around conversation. You can type what is on your mind, speak naturally using voice input, or use Call Mode for a more continuous voice-based experience.

> ![Unsaid Preview](public/images/unsaid_readme.gif)

## Features

- **AI conversations** — Have natural, supportive conversations with Unsaid.
- **Conversation history** — Previous conversations are saved and can be opened again from the sidebar.
- **Voice input** — Speak instead of typing using browser speech recognition.
- **Text-to-speech** — Unsaid can read its responses aloud.
- **Call Mode** — A dedicated voice conversation interface for a more natural back-and-forth experience.
- **Persistent conversations** — Messages and conversations are stored in a database rather than disappearing when the page is refreshed.
- **Responsive interface** — Designed to work across desktop and mobile screens.

## Tech Stack

### Backend
- PHP
- Laravel
- MySQL

### Frontend
- Blade
- HTML
- CSS
- JavaScript
- Vite

### AI & Voice
- OpenRouter API
- Browser Speech Recognition
- Web Speech / Text-to-Speech

## How It Works

Unsaid uses Laravel to handle the application logic, conversation storage, and communication with the AI service.

When a user sends a message, the conversation is passed through the Laravel backend to OpenRouter. The response is returned to the interface and both sides of the conversation are stored in MySQL.

Voice Mode uses the browser's speech recognition capabilities to convert speech into text, while text-to-speech allows Unsaid's responses to be spoken aloud.

Call Mode combines these features into a dedicated voice-first interface.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/YolandaMbande/Unsaid.git
cd Unsaid
```

Install PHP dependencies:

```bash
composer install
```

Install frontend dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure your database and OpenRouter API key in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=unsaid
DB_USERNAME=root
DB_PASSWORD=

OPENROUTER_API_KEY=your_openrouter_api_key
```

Run the database migrations:

```bash
php artisan migrate
```

Start Vite:

```bash
npm run dev
```

Then start Laravel:

```bash
php artisan serve
```

Open the application at:

```text
http://127.0.0.1:8000
```

## Project Structure

```text
app/
├── Http/Controllers/
│   └── ChatController.php
└── Models/
    ├── Conversation.php
    └── Message.php

resources/
├── css/
│   └── chat.css
├── js/
│   └── chat.js
└── views/
    ├── chat.blade.php
    └── welcome.blade.php

database/
└── migrations/

routes/
└── web.php
```

## Future Development

Unsaid is built with room to grow. Future ideas include:

- Expanded voice and Call Mode capabilities
- Multilingual conversations, including isiXhosa and Afrikaans
- Further improvements to conversation memory and context
- More personalisation options

## About the Project

I built Unsaid as a full-stack project to explore how AI can be integrated into a conversational web experience beyond a standard text chatbot.

The project gave me hands-on experience working with Laravel, API integration, database persistence, asynchronous JavaScript, browser speech APIs, responsive UI development, and AI-powered application design.

---

Built by **Yolanda Mbande**