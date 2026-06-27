# PulseDesk -- Forge 2 / Edition 1  (rename this repo: forge2-<yourname>)

A multi-tenant support-desk SaaS, BUILT BY ORCHESTRATING Hermes + OpenClaw over Slack.
This is a STARTER SKELETON -- structure only, zero features. Build the features with your agents.

## Stack (required)
Laravel 11 . PHP 8.2 . MySQL 8 . Laravel Sanctum . React 19 . Vite . Tailwind

## EastRouter models I used
- Hermes (planning / product owner): <e.g. deepseek/deepseek-v4-pro>
- OpenClaw (coding): <e.g. z-ai/glm-5.1>

## How to run  (EXACT -- a judge will run these from a fresh clone)
### Backend (Laravel + MySQL)
    cd pulsedesk
    cp .env.example .env          # set DB_* for your MySQL
    composer install
    php artisan key:generate
    php artisan migrate --seed
    php artisan serve             # http://127.0.0.1:8000
### Frontend (React + Vite)
    cd frontend
    cp .env.example .env          # set VITE_API_URL=http://127.0.0.1:8000
    npm install
    npm run dev                   # http://127.0.0.1:5173

## Demo logins (from the seeder)  -- fill in after you build the seeder
- admin@acme.test / password
- agent@acme.test / password
- customer@acme.test / password

## Live URL
<paste if deployed, else: "runs locally per the steps above">

## Where my evidence lives (everything is in THIS repo -- no Drive, no video)
- agents/        -- real Hermes + OpenClaw configs (secrets redacted)
- agent-log.md   -- the human->Hermes->OpenClaw loop
- sprints/       -- one doc per sprint
- slack-export/  -- Slack export, or per-channel screenshots
- evidence/screenshots/ -- app, agents-running, CI screenshots
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
