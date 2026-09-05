# AI Startup Idea Validator

A full-stack MERN application that uses OpenAI to validate startup ideas across nine dimensions — SWOT, market analysis, competitor analysis, investor scoring, revenue modeling, cost estimation, tech stack suggestions, business plan generation, and pitch deck creation — with PDF/PPTX export, Razorpay-powered subscriptions, and a full admin panel.

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, OpenAI API, Razorpay, Nodemailer, PDFKit, PptxGenJS
**Frontend:** React 18, Vite, Tailwind CSS, Zustand, React Router, Recharts, Axios

## Project Structure

```
├── client/          # React frontend (deploy to Vercel)
└── server/          # Express API (deploy to Render)
```

## Features

- JWT authentication (register, login, forgot/reset password)
- Submit a startup idea and run a full AI validation suite in parallel
- 9 AI analysis modules, each independently re-runnable:
  SWOT · Market Analysis · Competitor Analysis · Investor Score ·
  Revenue Model · Cost Estimate · Tech Stack Suggestion · Business Plan · Pitch Deck
- Overall viability score + verdict computed by AI
- Export full report as PDF, pitch deck as PPTX, or summary as CSV
- Razorpay subscription plans (Free / Pro / Enterprise) with usage limits
- Notifications, usage dashboard, and account management
- Full admin panel: platform analytics, user management, idea moderation, feedback, revenue

## Local Development

### 1. Backend

```bash
cd server
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, OPENAI_API_KEY at minimum
npm install
npm run dev             # starts on http://localhost:5000
```

Optional: create an admin user (`ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars, or defaults):

```bash
npm run seed:admin
```

### 2. Frontend

```bash
cd client
cp .env.example .env    # set VITE_API_URL to your backend URL + /api
npm install
npm run dev              # starts on http://localhost:5173
```

## Deployment

### Backend → Render

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, point at the repo. It will detect `render.yaml` automatically (root directory: `server`).
3. Fill in the required environment variables in the Render dashboard: `MONGO_URI`, `CLIENT_URL` (your Vercel URL), `OPENAI_API_KEY`, and optionally Razorpay/Cloudinary/SMTP credentials.
4. Deploy. Health check is available at `/health`.

If you'd rather set it up manually instead of using the blueprint: Root Directory `server`, Build Command `npm install`, Start Command `npm start`.

### Frontend → Vercel

1. In Vercel: **New Project**, import the repo, set **Root Directory** to `client`.
2. Framework preset: Vite. Build command `npm run build`, output directory `dist` (auto-detected).
3. Add environment variable `VITE_API_URL` = `https://<your-render-service>.onrender.com/api`.
4. Deploy. `client/vercel.json` already handles SPA client-side routing rewrites.

### Post-deploy checklist

- [ ] Update `CLIENT_URL` on Render to your live Vercel domain (needed for CORS + email links)
- [ ] Update `VITE_API_URL` on Vercel to your live Render domain
- [ ] Add real `OPENAI_API_KEY` — without it, all AI endpoints return 503
- [ ] Add Razorpay live keys if you want real payments (test mode works with Razorpay test keys)
- [ ] Run `npm run seed:admin` (via Render shell or locally against the production DB) to create your first admin account

## License

See [LICENSE](./LICENSE).
