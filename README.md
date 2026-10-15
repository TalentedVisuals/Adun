# Adùn — Afro-Fusion Fine Dining & Salon

An elevated West African gastronomic sanctuary in Victoria Island, Lagos. Indigenous terroir, 9-course chef's tasting journey, woodfire hearth, and late-night vinyl lounge.

---

## 🚀 Deploying to Vercel

This project is pre-configured and 100% production-ready for deployment on [Vercel](https://vercel.com).

### Option 1: Deploy via GitHub (Recommended)

1. Push this repository to GitHub or GitLab.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** > **"Project"**.
3. Import your repository.
4. Vercel automatically detects the framework presets from `vercel.json` and `package.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your site will be live on a secure Vercel URL in seconds!

### Option 2: Deploy using Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. In the project root directory, run:
   ```bash
   vercel
   ```
3. Follow the prompts. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## ⚙️ Configuration Details

- `vercel.json`: Handles SPA rewrites (`/(.*) -> /index.html`) so client-side routing and page reloads work smoothly without 404 errors.
- `.npmrc` & `package-lock.json`: Pre-configured with resolved dependencies and `legacy-peer-deps=true` to eliminate `ERESOLVE` npm peer dependency installation errors during Vercel builds.
- `"engines": { "node": ">=20.0.0" }`: Ensures Vercel selects Node.js 20 or higher for full Vite 8 compatibility.
- Forms are wired via FormSubmit (`32056367a847e46a95ba48aca22f7755`) without exposing personal email addresses directly.
