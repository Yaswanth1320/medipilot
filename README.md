
<h3 align="center">MediPilot</h3>

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
    <img src="https://img.shields.io/badge/-Neon-black?style=for-the-badge&logo=postgresql&logoColor=white&color=1A1A1A" alt="neon" />
    <img src="https://img.shields.io/badge/-Drizzle_ORM-black?style=for-the-badge&logoColor=white&color=3A0CA3" alt="drizzle" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&color=3E1F92" alt="clerk" />
    <img src="https://img.shields.io/badge/-AssemblyAI-black?style=for-the-badge&logoColor=white&color=FF9900" alt="assemblyai" />
    <img src="https://img.shields.io/badge/-Vapi-black?style=for-the-badge&logoColor=white&color=0A9396" alt="vapi" />
    <img src="https://img.shields.io/badge/-NativeWind-black?style=for-the-badge&logoColor=white&color=38BDF8" alt="nativewind" />
    <img src="https://img.shields.io/badge/-ShadCN-black?style=for-the-badge&logoColor=white&color=7C3AED" alt="shadcn" />
  </div>
</div>

---

## 📋 Table of Contents

1. 🧠 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🩺 [Features](#features)
4. 🚀 [Quick Start](#quick-start)

---

## 🧠 Introduction

**MediPilot** is an intelligent clinical assistant that acts as a secure co-pilot for doctors, nurses, and medical staff.
Our advanced AI quickly analyzes complex patient data and delivers **evidence-based** insights to aid **critical healthcare decisions**, improving both accuracy and efficiency in clinical settings.

---

## ⚙️ Tech Stack

* **Framework:** Next.js
* **Database:** Neon (PostgreSQL) with Drizzle ORM
* **Authentication:** Clerk
* **AI + Voice:** Vapi + AssemblyAI + OpenRouter
* **Styling:** NativeWind + ShadCN
* **Language:** TypeScript

---

## 🩺 Key Features

👉 **Secure Authentication:** Powered by Clerk for seamless and secure access control.
👉 **AI-Powered Clinical Insights:** Real-time patient data processing and diagnostic suggestions.
👉 **Voice-Enabled Assistance:** Uses Vapi + AssemblyAI to offer voice-based interactions and TTS.
👉 **Modern UI/UX:** Built with NativeWind and ShadCN for a responsive, accessible experience.
👉 **Smart Dashboard:** Personalized view for medical staff to manage patients and records efficiently.
👉 **Evidence-Based Suggestions:** Leverages AI to deliver science-backed recommendations.

---

## 🚀 Quick Start

Follow these steps to run MediPilot locally:

### 🔧 Prerequisites

* [Node.js](https://nodejs.org/en)
* [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)

### 📁 Clone the Repo

```bash
git clone https://github.com/your-username/medipilot.git
cd medipilot
```

### 📦 Install Dependencies

```bash
npm install
```

### 🛠️ Set Environment Variables

Create a `.env.local` file in the root and add the following:

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
OPEN_ROUTER_API_KEY=
NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_VAPI_API_KEY_PRIVATE=

```

> 💡 Replace with your actual keys from Neon, Clerk, Vapi, and AssemblyAI.

### ▶️ Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.The website will take a while as we use only free AI Models so please be patient.

---

Let me know if you want to generate badges for GitHub Actions, Vercel deploy, or add contributing/license sections!
