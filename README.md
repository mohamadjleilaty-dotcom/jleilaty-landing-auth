# JLEILATY — Landing + Auth + Consultations

Stack: Vite + React + Tailwind + Firebase Auth + React Router

## Run locally
```bash
npm install
cp .env.local.example .env.local   # ثم ضع مفاتيح Firebase
npm run dev
```

## Firebase setup
Console: create project → Authentication (Email/Password) → Web App → copy keys into `.env.local`:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

## Routes
- `/` landing
- `/login` sign in
- `/register` sign up
- `/reset` password reset
- `/consultations` protected (requires login)

## GitHub
```bash
git init
git add .
git commit -m "init auth + consultations"
git branch -M main
git remote add origin https://github.com/YOUR_USER/jleilaty-site.git
git push -u origin main
```
