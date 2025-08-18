# AI Scheduler Chat Prototype

A Next.js web app with a chat-like interface to test natural language parsing using `chrono-node`. Users enter scheduling inputs (e.g., "Hey, can you put an appointment of 'seeing doctor' on Wednesday Aug 3rd, 2025 at 3:00pm?"), and the app displays the parsed result as JSON.

## Features

- **Frontend**: Chat-style form with input field and response display.
- **Parsing**: Uses `chrono-node` for date/time extraction and regex for summaries.
- **Backend**: Next.js API route (`/api/parse`) to process input.
- **Deployment**: Runnable locally or on Vercel (free tier).

## Prerequisites

- Node.js 18+ and npm.

## Setup

1. **Clone the Repository**:

   ```bash
   git clone <repo-url>
   cd scheduler-chat
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run Locally**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

4. **Test the App**:
   - Enter a scheduling request (e.g., "Hey, can you put an appointment of 'seeing doctor' on Wednesday Aug 3rd, 2025 at 3:00pm?").
   - Submit to see the parsed JSON (summary, date, time, duration).
   - Try inputs like:
     - "Meeting tomorrow at 10am"
     - "Dentist next Monday at 2pm"
     - "See doc soon" (may fail due to vagueness)

## Example Input/Output

- **Input**: "Hey, can you put an appointment of 'seeing doctor' on Wednesday Aug 3rd, 2025 at 3:00pm?"
- **Output**:
  ```json
  {
    "message": "Parsed successfully",
    "data": {
      "summary": "seeing doctor",
      "date": "2025-08-06",
      "time": "15:00",
      "duration_minutes": 60
    }
  }
  ```
  (Note: Aug 3, 2025, is a Sunday; chrono-node adjusts to the nearest Wednesday, Aug 6.)

## Limitations

- **Chrono-node**: Reliable for clear date/time inputs but may fail on vague phrases (e.g., "see doc soon"). Use regex for summaries.
- **Edge Cases**: Day mismatches (e.g., Aug 3, 2025, is Sunday) are auto-adjusted; add logic for user confirmation if needed.
- **No Calendar Integration**: This prototype focuses on parsing; Google Calendar integration can be added later.

## Future Improvements

- **Add Google Calendar**: Integrate `googleapis` and NextAuth.js for OAuth (see previous prototype).
- **Enhance Parsing**: Add AI/LLM (e.g., Ollama) for conversational inputs:
  - Create a `backend` subfolder with Flask to run Ollama.
  - Deploy Flask to Render/Heroku.
- **UI**: Add Tailwind CSS for better styling.
- **Features**: Support duration parsing, recurring events, or error feedback.

## Deployment

1. **Push to GitHub**:

   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Import repo in Vercel (https://vercel.com).
   - Deploy and access at your Vercel URL.

## Troubleshooting

- **Parsing Errors**: Ensure inputs include clear date/time phrases. Test with examples like "tomorrow at 9am".
- **Chrono-node Limits**: For vague inputs, consider Ollama for future iterations.
- **Errors in API Route**:
  - Check `chrono` import (lowercase).
  - Use `chrono.parse`, not `parseDate`.
  - Remove invalid options like `formattedDate`.

## License

MIT
