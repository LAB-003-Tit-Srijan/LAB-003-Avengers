## Important: stack reality check

You asked for MERN (MongoDB + Express + React + Node). Lovable's sandbox runs **TanStack Start + Lovable Cloud** (Postgres + Auth + Storage + Edge Functions + Realtime + Gemini AI Gateway). MongoDB/Express servers cannot be hosted here.

**Recommendation:** Build Kampus on Lovable Cloud. You get every feature 1:1 (DB, auth, realtime chat, file uploads, Gemini AI), a live deployable URL for your demo, and zero backend setup — judges won't care about the DB engine, they'll care about the product. If you must hand in a MERN repo, we can later port the schema/edge functions to Express+Mongo; the React frontend is already portable.

If you'd rather just receive a MERN scaffold to run locally yourself (no preview, no live demo), tell me and I'll switch.

Below is the plan assuming **Lovable Cloud**.

---

## Product: Kampus

Verified student-only marketplace for buying, selling, renting, exchanging campus items, plus Lost & Found, AI fair-price prediction, AI recommendations, real-time chat, trust scores.

## Build phases

To keep quality high (you asked for "investor-demo ready"), I'll ship in 3 tight phases. Each is a clean checkpoint you can demo.

### Phase 1 — Premium Landing + Auth + Verification (first build)
- Exsell-style premium landing: Hero, "Why not OLX" trust section, Features, How It Works, AI Price Prediction highlight, Testimonials, FAQ, Footer. Framer Motion, gradient/aurora hero, soft shadows, rounded-2xl cards, premium type pairing.
- Auth: email + password via Lovable Cloud, restricted to college email domains (regex allowlist e.g. `.ac.in`, `.edu`, `.edu.in`). Verified badge auto-granted on confirmed college email.
- Profile + trust score scaffold (starts at 50, grows with completed trades).
- Routes: `/`, `/login`, `/signup`, `/verify`, `/app` (authed shell).

### Phase 2 — Marketplace + AI Pricing + Post Listing
- DB tables: `profiles`, `listings`, `categories`, `listing_images`, `favorites`, `reports`. RLS on every table. Roles via `user_roles` table.
- Storage bucket `listing-images` (public read, owner write).
- `/marketplace` dashboard: search, category filters (Books, Electronics, Notes, Hostel, Cycles, Lab Equipment, Furniture, Lost&Found), grid of listing cards with image, title, condition, AI price band, seller verified badge, trust score, location.
- `/listing/$id` detail page with image gallery, seller card, "Chat with seller", "Schedule meetup".
- `/post` create-listing flow: images upload, title, description, condition, age, original price, expected price.
- **Hero AI feature:** Edge function `suggest-price` calls Gemini (`google/gemini-3-flash-preview`) via Lovable AI Gateway with structured tool-call output → returns `{min, max, reasoning}`. Shown in a glowing "AI Fair Price" card with animated reveal.
- AI Recommendations: edge function `recommend` returns related items based on title/category embeddings-lite (Gemini classification).

### Phase 3 — Realtime Chat + Meetup + Lost & Found + Trust polish
- Realtime chat using Lovable Cloud Realtime (Postgres changes on `messages` table) — same UX as Socket.IO, no extra server.
- `/chat` inbox + thread view, negotiation-friendly (price-offer message type).
- Meetup scheduler: suggested campus points (seeded list), date/time picker, both-party confirm, ICS download.
- Lost & Found section: separate listing type with "lost" / "found" toggle, contact via chat.
- Trust system: seller rating after trade, completed-trades counter, response-rate (computed from chat), fraud heuristics flag (too-cheap-vs-AI-band, new account + high-value item) shown as a warning banner.
- Seed data: ~30 realistic listings, 6 demo students, sample chats — instant wow on demo.

## Technical details

```text
src/
  routes/
    __root.tsx                  # shell, providers
    index.tsx                   # landing
    login.tsx  signup.tsx  verify.tsx
    _authed.tsx                 # guard layout
    _authed/marketplace.tsx
    _authed/listing.$id.tsx
    _authed/post.tsx
    _authed/chat.tsx
    _authed/chat.$threadId.tsx
    _authed/lost-found.tsx
    _authed/profile.$id.tsx
    api/                        # webhooks if needed
  components/
    landing/  (Hero, TrustSection, Features, HowItWorks, AIPriceShowcase, Testimonials, FAQ, Footer)
    marketplace/ (ListingCard, Filters, CategoryPills, VerifiedBadge, TrustMeter)
    listing/    (Gallery, SellerCard, AIPricePanel, MeetupScheduler)
    chat/       (Thread, MessageBubble, OfferBubble, Inbox)
    common/     (GradientButton, SectionHeading, Aurora, Marquee)
supabase/functions/
  suggest-price/   # Gemini structured price band
  recommend/       # Gemini related-items
  trust-recompute/ # cron-style score updater
```

DB (high-level): `profiles(id, college, verified, trust_score, trades_done, response_rate)`, `listings(id, seller_id, title, desc, category, condition, age_months, original_price, asking_price, ai_min, ai_max, status, type[sale|rent|exchange|lost|found], location)`, `listing_images(listing_id, url, sort)`, `threads(id, listing_id, buyer_id, seller_id)`, `messages(id, thread_id, sender_id, kind[text|offer|meetup], body, price?, meetup_at?, meetup_place?)`, `ratings(rater, ratee, stars, comment)`, `favorites(user_id, listing_id)`, `user_roles(user_id, role)`.

Design tokens: deep indigo/violet primary with electric accent, soft neutral surfaces, oklch tokens in `src/styles.css`. Premium fonts via `@fontsource` (Inter + Sora). Framer Motion page transitions, scroll-reveal sections, aurora gradient background on hero.

AI: All Gemini calls go through edge functions using `LOVABLE_API_KEY` (auto-provisioned). Structured outputs via tool-calling, never raw JSON parsing.

## What I'll build first when you approve

Phase 1 only: enable Lovable Cloud, set up auth + college-domain check, ship the full premium landing page + signup/login/verify. Then we iterate Phase 2, Phase 3.

Confirm and I'll start with Phase 1 — or tell me to switch to a MERN scaffold instead.