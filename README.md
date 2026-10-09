<div align="center">

# ☁️ Nimbus (Insight AI)

### AI analytics product site — front-end showcase with interactive, simulated demos

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

<p align="center">
  <b>Front-end only: all data and metrics are simulated for demonstration. There is no backend.</b><br/>
  A high-conversion, interactive product platform featuring rich visual data visualizations, dark obsidian aesthetic, animated globe telemetry, interactive product demos, and pricing tiers.
</p>

</div>

---

## 🌟 Key Highlights & Architecture

- ⚡ **Next.js 16 + React 19:** Powered by the latest Next App Router and React Server/Client component architecture.
- 🎨 **Next-Gen Tailwind CSS v4:** Modern `@tailwindcss/postcss` setup with fluid typography, responsive glassmorphism, and custom gradient accents.
- 🔮 **Interactive 3D Data Visualizations:** Includes an animated Data Globe and dynamic dashboard previews built with Framer Motion and SVG.
- 📊 **Deep Feature Showcases:**
  - **AI Insights Showcase:** Live anomaly diagnosis and telemetry metrics simulation.
  - **Analytics Showcase:** Multi-series performance cards and latency graphs.
  - **Interactive Demo Modal:** Seamless modal preview for product onboarding.
  - **Pricing Tier Matrix:** Dynamic annual vs. monthly billing calculations with feature toggles.
- ♿ **Accessible & High-Performance:** Optimized typography loading, zero layout shift, and semantic HTML elements.

---

## 🏗️ Architecture & Component Hierarchy

```
nimbus/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with font optimization & metadata
│   │   └── page.tsx           # Home entry point & modal state coordinator
│   ├── components/
│   │   └── landing/
│   │       ├── Navbar.tsx             # Floating responsive header navigation
│   │       ├── HeroSection.tsx        # High-impact hero with CTA & glow effects
│   │       ├── DashboardPreview.tsx   # Simulated analytics dashboard
│   │       ├── DataGlobe.tsx          # Real-time connection node visualization
│   │       ├── ProductShowcase.tsx    # Tabbed feature inspection engine
│   │       ├── AIInsightsShowcase.tsx # Real-time insight feeds
│   │       ├── PricingSection.tsx     # Tier matrix & checkout flows
│   │       ├── ContactSection.tsx     # Lead capture form with validations
│   │       └── DemoModal.tsx          # Animated backdrop product preview modal
│   └── lib/                   # Utility helpers and clsx/twMerge config
└── tailwind.config / next.config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `≥ 20`
- npm, pnpm, or bun

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/karthik1122-code/nimbus.git
cd nimbus

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live interface.

---

## 📄 License

MIT © [Karthik Uppari](https://github.com/karthik1122-code)
