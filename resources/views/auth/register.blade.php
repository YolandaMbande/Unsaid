<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Create Account — Unsaid</title>

    @vite('resources/css/auth.css')
</head>

<body>

    <main class="auth-page">

        <a href="{{ url('/') }}" class="auth-logo">
            unsaid.
        </a>

        <section class="auth-card">

            <h1>Create your account</h1>

            <p class="auth-subtitle">
                A private space for the things you haven't said yet.
            </p>

            <form method="POST" action="{{ url('/register') }}">
                @csrf

                <div class="form-group">
                    <label for="name">Name</label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value="{{ old('name') }}"
                        autocomplete="name"
                        required
                        autofocus
                    >

                    @error('name')
                        <p class="field-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="email">Email</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value="{{ old('email') }}"
                        autocomplete="email"
                        required
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
                        autocomplete="new-password"
                        required
                    >

                    @error('password')
                        <p class="field-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password_confirmation">
                        Confirm password
                    </label>

                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        autocomplete="new-password"
                        required
                    >
                </div>

                <button type="submit" class="auth-button">
                    Create account
                </button>

            </form>

            <p class="auth-switch">
                Already have an account?
                <a href="{{ route('login') }}">Log in</a>
            </p>

        </section>

    </main>

</body>
</html>