# 🌍 HelpLink: Tools and Support to End Poverty

**Project Title:** HelpLink: Tools and Support to End Poverty
**SDG Focus:** Sustainable Development Goal 1 – No Poverty
**Technology:** Angular 19 (Rich Internet Application)

HelpLink is a Rich Internet Application (RIA) developed with Angular that supports the United Nations' Sustainable Development Goal 1: No Poverty. The platform is designed to provide users—especially those in underserved communities—with access to essential data, support services, and actionable opportunities.

The application aims to go beyond raising awareness by offering real tools and interactive features that empower users to take steps toward poverty reduction. Whether it's accessing real-time poverty data, exploring job opportunities, or finding nearby community aid, HelpLink serves as a bridge between people and the resources they need.

## 🔑 Key Features

- **📊 News & Data Dashboard** — Real-time poverty news articles via the GNews API (proxied server-side).
- **🛠️ Job & Training Opportunities** — A searchable directory of job listings with search by keyword.
- **🧭 Community Support Map** — Food bank discovery via OpenStreetMap (Nominatim) with an interactive embedded map.
- **🏠 Shelter Directory** — Filterable list of local shelters by state.
- **🛒 Community Market** — A local marketplace for artisans.
- **📝 Help & Volunteer Forms** — Request and volunteering forms.

## 🚀 Tech Stack

- **Frontend:** Angular 19 (standalone components, hash-based routing, SSR via `@angular/ssr`)
- **Styling:** Tailwind CSS v4, FontAwesome (CDN)
- **Maps:** OpenStreetMap (Nominatim + embedded map)
- **API Integration:** GNews API, JSearch API (RapidAPI), OpenStreetMap Nominatim
- **Backend proxy:** Node/Express (`proxy-server/`) that keeps API keys server-side

## 🔐 API Keys & Security

External API keys (**GNews**, **JSearch**) are **never shipped to the browser**. All keyed API calls go through the local proxy server, which reads the keys from environment variables.

To set up:

1. Copy `proxy-server/.env.example` to `proxy-server/.env`.
2. Fill in your real API keys.
3. Start the proxy: `npm run start:proxy` (or `node proxy-server/server.js`).
4. In a separate terminal, start the Angular app: `npm start`.

The proxy exposes three endpoints:
- `GET /news` — GNews poverty news (query params: `q`, `lang`, `country`, `max`)
- `GET /jobs` — JSearch job listings (query params: `query`, `country`, `page`)
- `GET /search` — OpenStreetMap Nominatim search for food banks (`q`)

## 📌 Project Goals

- Provide practical, data-backed tools for addressing poverty.
- Empower users to improve their lives through skill development and employment.
- Encourage collaboration and knowledge-sharing among users and communities.
