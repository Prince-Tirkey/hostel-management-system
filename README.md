# Smart Hostel & Mess Management System

A MERN-based hostel management platform designed around **student concerns, AI-assisted complaint management, notices, lend & borrow, mess reviews, and future analytics**.

## Core modules

1. **Student Concerns / Complaints**
   - Raise issues for health, maintenance, electricity, plumbing, cleanliness, water, internet, security, etc.
   - Track status, priority, severity, category and resolution.
   - Students can add comments and evidence later.
2. **AI-Powered Complaint Intelligence**
   - Automatically classify complaint category.
   - Estimate urgency/severity and calculate a priority score.
   - Generate a supervisor summary of repeated/major problems.
   - Architecture isolates the AI provider so Gemini/OpenAI/etc. can be swapped later.
3. **Notice Board**
   - Centralized hostel announcements.
   - Electricity cuts, water interruptions, maintenance, emergency notices, events.
   - Audience/hostel/block targeting and expiry support.
4. **Lend & Borrow**
   - Students list items they are willing to lend.
   - Other students can request them.
   - Request lifecycle: pending → approved/rejected → returned.
5. **Mess Reviews**
   - Ratings and reviews for food quality, hygiene, taste and service.
   - Moderation/status support for coordinators.
6. **Future analytics**
   - Trending/common issues ("hot topics").
   - Food-wastage analysis from daily mess records.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Realtime foundation: Socket.IO
- AI foundation: Gemini provider adapter
- Styling: CSS foundation (Tailwind can be added without changing module boundaries)

## Run

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

In another terminal:

```bash
cd client
npm install
npm run dev
```

MongoDB can run locally or with `docker-compose`.

## Suggested implementation order

**Phase 1:** Auth → Student/Hostel → Complaints → Notices  
**Phase 2:** AI prioritization → Supervisor summary → Notifications  
**Phase 3:** Lend & Borrow → Mess Reviews  
**Phase 4:** Trending issues → Food wastage analytics → dashboards

## Important design decision

Do not put AI logic directly inside controllers. The complaint module calls an `ai` service/provider, which keeps business logic testable and lets the team change AI providers later.
