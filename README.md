# English Studio

A responsive Next.js English-learning website.

## Features
- Dashboard and local progress tracking
- AI Speaking: Conversation and Teacher modes
- Six real-life speaking scenarios
- Browser microphone speech recognition (browser support varies)
- Browser text-to-speech with US/UK English selection
- Listening/shadowing, vocabulary, reading quiz, writing practice
- Progress and writing saved in this browser
- Server-side OpenAI Responses API endpoint; API key is never exposed in client code

## Run locally
Requires Node.js 20.9+.

1. Run `npm install`
2. Copy `.env.example` to `.env.local`
3. Put your secret key in `OPENAI_API_KEY` inside `.env.local`
4. Run `npm run dev`
5. Open http://localhost:3000

## Publish online with Vercel
1. Upload this project to a GitHub repository.
2. Import the repository at Vercel.
3. Add `OPENAI_API_KEY` in Vercel → Project Settings → Environment Variables.
4. Optionally set `OPENAI_MODEL` to a model available to your API account.
5. Deploy. Vercel will provide a public `*.vercel.app` URL.

Keep the API key server-side. Never use a `NEXT_PUBLIC_` variable for it. OpenAI API usage may incur charges; ChatGPT subscriptions and API billing are separate.

## First-release limitations
- This is deployable source code, not yet published to a public URL.
- AI chat needs an API key and API billing.
- Browser speech recognition depends on browser/device and microphone permission. HTTPS is recommended.
- Microphone transcription is not phoneme-level pronunciation scoring.
- Progress is local to this browser; cloud accounts and cross-device sync are not included yet.
