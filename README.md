# Vaibhav's React Web Portfolio

A premium, interactive personal portfolio website designed and developed using **React**, **Vite**, and **Vanilla CSS**.

## Theme & Design Aesthetics
- **Color Palette**: Deep, elegant navy/royal blue as the base dark-mode color scheme, highlighted by glowing orangish-yellow and light blue accents.
- **Visual Features**: Sticky glassmorphic navbar, responsive components (Hero, About, Projects, Skills, Contact), custom badge layout, card hover micro-animations, and dynamic scroll highlights.
- **A11y & Testing Ready**: Structured with semantic HTML5 elements and unique IDs on all interactive links, input controls, and buttons.

## Project Structure
```
├── .github/workflows/deploy.yml   # GitHub Actions workflow for automatic deployment
├── public/                       # Static public assets
├── src/
│   ├── assets/                   # Image assets (avatar, project mockups)
│   ├── App.css                   # Component-specific styles
│   ├── App.jsx                   # Main React component & layout structure
│   ├── index.css                 # Global styles, variables, typography
│   └── main.jsx                  # React DOM entry point
├── index.html                    # Main HTML shell (with Google Fonts & SEO tags)
├── vite.config.js                # Vite bundler configurations
└── package.json                  # Dependencies & script runner configuration
```

## Getting Started

### Local Development
To run this project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173/](http://localhost:5173/) to preview the app.

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment
This project is configured for automated deployment to **GitHub Pages** via GitHub Actions.

On every push to the `main` branch, the [Deploy to GitHub Pages](file:///.github/workflows/deploy.yml) workflow builds the production assets and deploys them to:
`https://Vaibhav1214.github.io/my-web-portfolio/`
