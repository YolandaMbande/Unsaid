<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Unsaid — A space to let it out</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="stylesheet">

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :root {
    --background: #f7f3ed;
    --surface: #fffdf9;

    --text: #2d2722;
    --muted: #756b61;

    --accent: #b08a57;
    --accent-dark: #8c6a3f;

    --border: rgba(45, 39, 34, 0.09);
}

    body {
        min-height: 100vh;
        background: var(--background);
        color: var(--text);
        font-family: "DM Sans", sans-serif;
    }

    nav {
        width: min(1100px, calc(100% - 40px));
        margin: 0 auto;
        padding: 28px 0;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        font-family: "Playfair Display", serif;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.5px;
    }

    .nav-button {
        padding: 10px 18px;

        border: 1px solid var(--border);
        border-radius: 50px;

        background: var(--surface);
        color: var(--text);

        text-decoration: none;
        font-size: 14px;
        font-weight: 600;

        transition: 0.2s ease;
    }

    .nav-button:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
    }

    main {
        width: min(1100px, calc(100% - 40px));
        margin: 0 auto;
    }

    .hero {
        min-height: calc(100vh - 90px);

        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;
        padding: 70px 0 100px;
    }

    .hero-content {
        max-width: 760px;
    }

    .eyebrow {
        display: inline-block;

        margin-bottom: 22px;

        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    h1 {
        margin-bottom: 24px;

        font-family: "Playfair Display", serif;
        font-size: clamp(52px, 9vw, 92px);
        font-weight: 500;
        line-height: 0.95;
        letter-spacing: -3px;
    }

    h1 em {
        color: var(--accent);
    }

    .hero-text {
        max-width: 570px;
        margin: 0 auto 35px;

        color: var(--muted);
        font-size: 18px;
        line-height: 1.7;
    }

.start-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    padding: 15px 25px;

    border-radius: 50px;

    background: #3a3028;
    color: white;

    text-decoration: none;
    font-size: 15px;
    font-weight: 600;

    box-shadow: 0 12px 30px rgba(58, 48, 40, 0.18);

    transition: 0.25s ease;
}

.start-button:hover {
    transform: translateY(-3px);
    background: var(--accent-dark);
}

    .features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;

        padding-bottom: 80px;
    }

    .feature {
        padding: 28px;

        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 20px;

        text-align: left;
    }

    .feature-number {
        display: block;
        margin-bottom: 25px;

        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
    }

    .feature h2 {
        margin-bottom: 10px;

        font-size: 18px;
    }

    .feature p {
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
    }

    footer {
        padding: 30px 0;

        border-top: 1px solid var(--border);

        text-align: center;
        color: var(--muted);
        font-size: 12px;
    }

    @media (max-width: 700px) {
        nav {
            width: min(100% - 30px, 1100px);
        }

        main {
            width: min(100% - 30px, 1100px);
        }

        .hero {
            padding-top: 40px;
        }

        h1 {
            letter-spacing: -2px;
        }

        .hero-text {
            font-size: 16px;
        }

        .features {
            grid-template-columns: 1fr;
        }
    }
</style>

</head>

<body>

<nav>
    <div class="logo">unsaid.</div>

    <a href="{{ url('/chat') }}" class="nav-button">
        Open Unsaid
    </a>
</nav>

<main>

    <section class="hero">

        <div class="hero-content">

            <span class="eyebrow">A space to let it out</span>

            <h1>
                Say the things<br>
                you leave <em>unsaid.</em>
            </h1>

            <p class="hero-text">
                A private space to talk through your thoughts,
                unload your day, and make sense of whatever is
                on your mind — without having to figure out
                how to say it first.
            </p>

            <a href="{{ url('/chat') }}" class="start-button">
                Start talking
                <span>→</span>
            </a>

        </div>

    </section>

    <section class="features">

        <div class="feature">
            <span class="feature-number">01</span>

            <h2>Just talk</h2>

            <p>
                No perfect words required. Start wherever
                your thoughts are.
            </p>
        </div>

        <div class="feature">
            <span class="feature-number">02</span>

            <h2>A judgment-free space</h2>

            <p>
                Talk through your thoughts at your own pace,
                whenever you need to.
            </p>
        </div>

        <div class="feature">
            <span class="feature-number">03</span>

            <h2>Say it out loud</h2>

            <p>
                Voice conversations are coming, so you can
                talk naturally instead of typing everything.
            </p>
        </div>

    </section>

</main>

<footer>
    <p>© {{ date('Y') }} Unsaid. A space to talk.</p>
</footer>
```

</body>
</html>
