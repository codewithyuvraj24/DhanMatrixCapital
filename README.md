# DhanMatrixCapital 🚀

**Institutional-Grade Wealth Management for the Modern Investor.**

DhanMatrix Capital is a premium fintech platform designed to provide high-growth investment strategies to Indian investors. Built with a focus on **transparency**, **security**, and **performance**, it offers a seamless, app-like experience on the web.

---

## 🌟 Key Features

### 💎 Premium Investment Plans
Tailored strategies for every investor profile, featuring:
*   **Silver Plan**: For steady, consistent growth (₹25k - ₹75k).
*   **Gold Plan**: Our most popular balanced strategy (₹75k - ₹1.25L).
*   **Platinum Plan**: High-yield strategies for serious investors (₹1.25L - ₹2.5L).

### ⚡ Ultra-High Performance
*   **Server Components**: Critical UI (Hero, Dashboard) rendered on the server for instant page loads.
*   **60fps Animations**: GPU-accelerated framer-motion interactions.
*   **Optimized Assets**: Next.js Image optimization and dynamic code splitting.

### 🛡️ Secure & Compliant
*   **SEBI Regulated**: Built with compliance at the core.
*   **ISO 27001**: Bank-grade security standards.
*   **Transparent**: Real-time tracking of returns and invested amounts.

---

## 🛠️ Technology Stack

This project is built using the bleeding edge of the React ecosystem:

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Backend** | Firebase (Auth & Firestore) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Analytics** | Vercel Analytics & Speed Insights |

---

## 🏗️ Architecture Overview

### Client vs. Server Components
We utilize a hybrid rendering approach:
*   **Server Components (`Hero.tsx`, `DashboardMock.tsx`)**: Handle static content and initial data fetching to reduce bundle size.
*   **Client Components (`HeroActions.tsx`, `PlansPreview.tsx`)**: Handle user interactivity (clicks, hover states, animations).

### Performance First
*   **Dynamic Imports**: Heavy components like animations and charts are lazy-loaded.
*   **Font Optimization**: `next/font` with `display: swap` ensures text is visible instantly.
*   **CSS Blobs**: Background animations use `will-change: transform` to offload rendering to the GPU.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/codewithyuvraj24/DhanMatrixCapital.git
    cd DhanMatrixCapital
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase credentials:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    # ... other firebase config
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📱 Mobile First Design

Every component is designed mobile-first, ensuring a flawless experience on devices of all sizes—from the smallest iPhone SE to 4K Ultra-Wide monitors.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built with ❤️ by [CodeWithYuvraj](https://github.com/codewithyuvraj24)*
