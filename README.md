# Inflow - AI-Powered Invoice Financing Platform 🚀

**Inflow** is a modern, AI-powered invoice discounting and supply chain financing marketplace. It connects Micro, Small & Medium Enterprises (MSME) suppliers with trusted investors, enabling suppliers to convert their unpaid invoices into working capital within 24 hours, instead of waiting the typical 90-180 days.

---

## 🌟 Key Features

* **Role-Based Workflows:** Distinct, customized dashboards and logic for `Suppliers`, `Investors`, and `Admins`.
* **AI-Powered Chatbot:** Integrated with Google Gemini (1.5 Flash) to assist users with platform navigation, supply chain finance questions, and KYC procedures.
* **Smart Risk Engine:** Automated algorithm that calculates invoice risk tiers (AAA to BBB) based on documentation and GSTIN verification.
* **Live Bidding Marketplace:** Real-time auction system where investors can bid on verified invoices, maximizing yield and competition.
* **Instant Verification Animation:** AI verification simulation UI during invoice upload for enhanced user experience.

---

## 💻 Tech Stack

* **Frontend:** [Next.js (App Router)](https://nextjs.org/), React, TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/), Framer Motion (Animations), Lucide React (Icons)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Authentication)
* **AI Integration:** Google Generative AI API (Gemini)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🛠️ Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/sadatahmad2/inflow.git
cd inflow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔒 Security

* **Authentication:** Handled securely via Supabase Auth.
* **Data Privacy:** Implements Row Level Security (RLS) in PostgreSQL ensuring users only access their own authorized data.
