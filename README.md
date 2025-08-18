AI Scheduler Prototype

A web app that parses natural language inputs (e.g., "Hey, can you put an appointment of 'seeing doctor' on Wednesday Aug 3rd, 2025 at 3:00pm?") and adds events to Google Calendar.

Features

Frontend: Next.js with a simple form for user input.

Parsing: Uses chrono-node to extract date/time and regex for summaries.

Authentication: Google OAuth via NextAuth.js for Calendar API access.

Backend: Next.js API route to process input and integrate with Google Calendar.

Deployment: Vercel (free tier).

Prerequisites

Node.js 18+ and npm.

Google Cloud project with Calendar API enabled and OAuth 2.0 credentials (Client ID/Secret).

Setup

Clone the Repository:

git clone <repo-url>
cd scheduler-prototype

Install Dependencies:

npm install

Configure Environment Variables: Create a .env.local file:

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

Get Google credentials from https://console.cloud.google.com (set redirect URI to http://localhost:3000/api/auth/callback/google).

Generate NEXTAUTH_SECRET with openssl rand -base64 32.

Run Locally:

npm run dev

Open http://localhost:3000.

Sign In:

Click "Sign in with Google" to authenticate.

Enter a schedule request (e.g., "Hey, can you put an appointment of 'seeing doctor' on Wednesday Aug 3rd, 2025 at 3:00pm?").

Submit to add the event to your Google Calendar.

Deployment

Push to GitHub:

git push origin main

Deploy to Vercel:

Import the repo in Vercel (https://vercel.com).

Set environment variables in Vercel dashboard (GOOGLE_CLIENT_ID, etc.).

Deploy and access at your Vercel URL.

Limitations

Chrono-node: Reliable for clear date/time inputs but may struggle with vague phrases (e.g., "see doc soon"). Use regex for summaries.

Duration: Currently sets events to 0-minute duration (start = end). Modify app/api/schedule/route.ts to add duration_minutes.

Edge Cases: Day mismatches (e.g., Aug 3, 2025, is Sunday, not Wednesday) may require custom logic.

Future Improvements

Add AI/LLM: Integrate Ollama for robust NLP:

Create a backend subfolder with Flask to run Ollama.

Deploy Flask to Render/Heroku (Vercel doesn’t support Python).

Update /api/schedule to call Flask for complex inputs.

Enhance Parsing: Handle recurring events, locations, or cancellations.

UI: Add styling (e.g., Tailwind CSS) and error feedback.

Duration: Parse duration from input or set defaults (e.g., 60 minutes).

Troubleshooting

OAuth Errors: Ensure Google Cloud credentials and redirect URI match.

Parsing Failures: Test with clear inputs; consider Ollama for ambiguous cases.

CORS: Not applicable (monolithic app), but needed if adding a Flask backend.

License

MIT
