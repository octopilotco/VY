

# Vyxlo — Full Clone of SuperX.so

## Overview
A complete clone of SuperX.so rebranded as "Vyxlo" — covering the marketing landing page, authentication, and the full dashboard application with all features possible within Lovable's capabilities.

---

## Phase 1: Landing Page (Dark Theme Marketing Site)

### Navbar
- Vyxlo logo (🔥 emoji + "Vyxlo" text) on the left
- Navigation links: Features, Testimonials, Creators, Blog, Chrome Extension
- "Get Started for Free" CTA button with arrow icon on the right

### Hero Section
- Split layout: left side with headline "Grow faster on 𝕏 with *hidden insights*" (rotating text animation cycling through "hidden insights", "smart analytics", "actionable data")
- Subheadline text
- "Get Started for Free" CTA button
- "Featured on Chrome Webstore" badge
- Avatar stack with star ratings and "Loved by 1458+ creators" text
- Product Hunt "#1 Product of the Day" badge
- Right side: interactive app preview mockup showing the dashboard sidebar and Inspiration feed

### Testimonials Carousel (Top)
- Horizontally scrolling testimonial cards with auto-scroll
- Each card: star rating, quote text, avatar, name, date
- Infinite loop animation

### Chrome Extension Section
- Headline: "Insights anywhere on 𝕏. Instantly!"
- Description text
- "Get Chrome Extension" CTA
- Large product screenshot

### "For Serious Creators" Section
- Headline + "Try Vyxlo Now" CTA
- Category cards: Indie Hackers, Web Creators, Traders & Analysts, Founders, Influencers
- Each card with title and description

### Features Section — "Vyxlo Just Leveled Up"
- Multiple feature blocks, each with:
  - Category label, headline, description
  - Product screenshot/mockup
  - 3 benefit bullets with icons
- Features covered:
  1. AI Chat Mode — "Your Voice. Infinite Firepower."
  2. Advanced Inspiration Engine — "Never run out of content ideas again"
  3. AI Writer — "Write faster. Write better."
  4. Rewrite with AI — "Your new secret weapon"
  5. Next-Gen Scheduler — "Post at the perfect time"
  6. Automation + Analytics — "Grow with data, not guesswork"
  7. Vyxlo Library — "Search Smarter. Steal Like a Strategist."
  8. Algorithm Simulator — "Win the Algorithm Before You Hit Send"
  9. Advanced Scheduler — "Scheduling That Works While You Sleep"

### Pricing Section
- Two-tier pricing cards side by side:
  - **PRO** — $39/month with feature list
  - **ADVANCED** — $29/month (early discount, crossed-out $49) with extended feature list + "15 more features" note
- "Get Started for Free" CTAs on both

### "Trusted by Creators" Wall of Love
- Horizontally auto-scrolling testimonial cards (second set)
- Multiple rows of creator quotes with avatars and names

### Final CTA Section
- "Take The Easy Route. Grow With Vyxlo!"
- "Get Started for Free" button

### Footer
- Vyxlo branding + "Made with 💛" credit line
- Three columns: Product (Features, Pricing, Chrome Extension), Resources (Blog, Testimonials, Creators, Affiliate Program, tools), Legal (Terms, Privacy)

---

## Phase 2: Authentication & Backend Setup

- Enable Lovable Cloud (Supabase) for database and auth
- User signup/login flow (email + password)
- User profiles table with auto-creation trigger
- Protected routes for dashboard
- Redirect logic after login

---

## Phase 3: Dashboard App UI

### Sidebar Navigation
- Vyxlo logo at top
- Navigation items: My Post Queue, Inspiration, Library, Analytics, Content Studio, Social Hub, Engage, Context
- AI Usage indicator bar
- "Become an Affiliate" link

### Inspiration Page
- Tab bar: All, Media, Articles, Tweets, Daily Mix
- "Today's tweet suggestions" section with "Manage context" button
- Category filter chips: All, Products, Trending, Media, Viral (with counts)
- Tweet suggestion cards with: avatar, username, timestamp, tweet text, category tag, "Use Tweet" and "View" actions

### Content Studio
- AI-powered tweet writing interface
- Text editor with formatting
- "Rewrite with AI" overlay functionality
- Tone/style settings

### Post Queue / Scheduler
- Calendar view of scheduled posts
- Time slot picker
- Auto-retweet, auto-plug, auto-delete toggles

### Analytics Dashboard
- Performance metrics cards
- Follower growth chart
- Top tweets ranking
- Engagement metrics

### Library
- Semantic search interface
- Saved/bookmarked tweets
- Filters by recency and topic

### Settings & Context
- Manage writing context/voice
- Account settings

---

## Phase 4: Stripe Payment Integration

- Connect Stripe for subscription payments
- PRO and ADVANCED plan checkout flows
- Feature gating based on subscription tier
- Upgrade/downgrade logic

---

## Technical Notes
- Dark theme throughout matching SuperX's exact color palette (dark backgrounds, warm accent colors)
- Smooth scroll-triggered animations and transitions
- Fully responsive across desktop, tablet, and mobile
- All "SuperX" references replaced with "Vyxlo"
- Dashboard features will be functional UI with mock data where real Twitter API integration isn't possible

