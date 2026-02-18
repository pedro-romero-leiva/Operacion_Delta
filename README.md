# OPERACIÓN DELTA

This is a Next.js web application for the "Operación Delta" learning guide.

## Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment to GitHub Pages

This project is configured for easy deployment as a static site to GitHub Pages.

### 1. Create a GitHub Repository

Create a new public repository on GitHub. For the deployment scripts to work without changes, name your repository **`Operacion_Delta`**. If you use a different name, you must update the `repo` variable in `next.config.ts` and the `homepage` URL in `package.json`.

### 2. Push Your Code

Push your local code to the GitHub repository you just created.

```bash
git remote add origin https://github.com/pedro-romero-leiva/Operacion_Delta.git
git branch -M main
git push -u origin main
```

### 3. Automatic Deployment

This project is configured to automatically deploy to GitHub Pages whenever you push changes to the `main` branch.

### 4. Configure GitHub Pages

In your repository's settings on GitHub, navigate to the "Pages" section.

-   **Source:** Select "GitHub Actions".

Your site will be live at `https://pedro-romero-leiva.github.io/Operacion_Delta` shortly after your first push to `main`.
# Operacion_Delta
