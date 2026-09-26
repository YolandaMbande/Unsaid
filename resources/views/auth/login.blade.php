<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Log In — Unsaid</title>

    @vite('resources/css/auth.css')
</head>

<body>

    <main class="auth-page">

        <a href="{{ url('/') }}" class="auth-logo">
            unsaid.
        </a>

        <section class="auth-card">

            <h1>Welcome back</h1>

            <p class="auth-subtitle">
                Pick up where you left off.
            </p>

            <form method="POST" action="{{ url('/login') }}">
                @csrf

                <div class="form-group">
                    <label for="email">Email</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value="{{ old('email') }}"
                        autocomplete="email"
                        required
                        autofocus
                    >

                    @error('email')
                        <p class="field-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password">Password</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        autocomplete="current-password"
                        required
                    >

                    @error('password')
                        <p class="field-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="remember-row">
                    <label class="remember-me">
                        <input
                            type="checkbox"
                            name="remember"
                            value="1"
                        >
                        <span>Remember me</span>
                    </label>
                </div>

                <button type="submit" class="auth-button">
                    Log in
                </button>

            </form>

            <p class="auth-switch">
                Don't have an account?
                <a href="{{ route('register') }}">Create one</a>
            </p>

        </section>

    </main>

</body>
</html>