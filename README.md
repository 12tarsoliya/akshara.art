# Akshara Tarsoliya Gallery (akshara.art)

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)](https://12tarsoliya.github.io/akshara.art/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20CSS-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)

An elegant, premium digital gallery showcasing original paintings, contemporary abstract expressions, and fluid resin compositions by artist **Akshara Tarsoliya**. 

Designed with a rich, dark-mode glassmorphism aesthetic, **akshara.art** bridges fine art and software engineering. It features an interactive **AI Art Curator** that matches prospective collectors with their ideal artwork based on room environments, budgets, colors, and emotional resonance.

---

## ✨ Key Features

### 🤖 1. Client-Side AI Art Curator Engine
* **Interactive Chatbot:** A customized AI-guided curator assistant that helps visitors choose paintings.
* **Smart Contextual Matching:** Parses user messages for emotional states (e.g., *peace*, *energy*), rooms (e.g., *bedroom*, *office*), colors (e.g., *blue*, *gold*), and styles.
* **Interactive Budgeting:** Automatically parses currency/budget requests (e.g., *"under 15k"*, *"affordable"*, *"premium"*) and recommends pieces that fit within that range.
* **Natural Language Explanation:** Dynamically generates reasoning for why a painting matches the customer's request (e.g., *"It matches your color tone request, and its resin finish is perfect for a spa or bathroom"*).

### 🎨 2. Art Portfolio & Shop
* **Curated Collections:** Filter artworks by aesthetic tiers (Abstract Expressionism, Ethereal Landscapes, Oceanic Fluidity).
* **Interactive Detail View:** Dive deep into each artwork, complete with high-definition rendering, dimension cards, medium/technique listings, and availability status.
* **Shopping Cart System:** A smooth side-drawer shopping cart to manage selected artworks, calculating totals dynamically.

### 🛡️ 3. Artwork Copyright & Anti-Theft Security
* **Right-Click Interception:** Context menus are disabled across the app to prevent users from saving/downloading original high-resolution artwork images.
* **Keyboard Shortcut Blockers:** Blocks combinations commonly used to duplicate content or screenshot (e.g., `PrintScreen`, `Ctrl+C`, `Ctrl+S`, `Ctrl+P`, and `Cmd` equivalent commands).
* **Instant Security Banner:** Displays custom notifications informing visitors about art copyright protection if shortcut violations occur.

### ✍️ 4. Bespoke Commissions Portal
* **Custom Requests:** Dedicated interface for users to commission customized masterpieces.
* **Tailored Inputs:** Collectors can specify target dimensions, preferred mediums (Resin, Oil, Acrylic, Mixed Media), custom color palettes, and describe their concept/story notes.
* **Persistent Inquiries:** Submissions are saved securely using client-side caching (`localStorage`) to simulate backend storage.

### 📊 5. Admin Analytics Dashboard
* **Admin Center:** Access via `/admin` to view administrative analytics.
* **Commission Management:** Track, inspect, and filter custom art commissions submitted by users.
* **Activity Logs:** Monitor incoming requests and shop activity.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** React 19 (Functional components, hooks, custom state providers)
* **Build Tool:** Vite (Ultra-fast Hot Module Replacement)
* **Routing:** React Router v7 (Seamless single-page application navigation)
* **Icons:** Lucide React (Crisp, vector-based modern icons)
* **Styling:** Custom Vanilla CSS (Leverages CSS custom properties, backdrop filters, premium grid layouts, and glow animations)
* **Deployment:** Integrated with `gh-pages` for seamless hosting

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/12tarsoliya/akshara.art.git
   cd akshara.art
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build the production bundle:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment to GitHub Pages

The project contains a pre-configured build & deploy workflow. To deploy:

1. Build and push the code:
   ```bash
   npm run deploy
   ```
2. The `gh-pages` script will automatically compile the bundle (`dist/`) and push it to the `gh-pages` branch, making the application live at:
   **https://12tarsoliya.github.io/akshara.art/**

---

## 📄 License
Custom Portfolio License. All rights reserved. Artwork image assets remain the copyright of Akshara Tarsoliya.
