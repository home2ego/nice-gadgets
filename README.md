# Nice Gadgets

A modern e-commerce web application for mobile phones, tablets, and accessories, built with **React** and **TypeScript**, with a strong focus on performance, accessibility, and UX.

## [Live Demo](https://nice-gadgets.pages.dev/)

## ⭐ PageSpeed Insights Scores

Achieved 100/100 on both mobile and desktop. See **Technical Challenges & Solutions** for details.

<div align="center">
    <img src="/docs/nice-gadgets-speed-m.png" width="400" alt="100/100 Performance on mobile" />
    <img src="/docs/nice-gadgets-speed-d.png" width="400" alt="100/100 Performance on desktop" />
</div>

## 🛠️ Technical Stack

### Core
- `React` — UI framework
- `TypeScript` — Type safety
- `SCSS` — Modular styles
- `Redux.js` (Toolkit) — Global state management
- `i18next` — Internationalization

### UI/UX & Development
- `React Router` — Client-side routing + query params support
- `Vite` — Build tool
- `Biome`, `Stylelint` — Linting

## 💡 Key Features
- **Context-Aware Internationalization**: Multi-language support with **i18next**, including browser language detection, dynamic pluralization, and locale-aware currency formatting.
- **Global Cart & Favorites**: Global state management with **Redux Toolkit** and `localStorage`.
- **Zero-Library Custom Carousels**: Two custom carousel implementations (**PicturesCarousel**, **ProductsCarousel**) built without external libraries.
- **URL-Based Product Filtering**: Deep-linkable filtering with custom select controls (Cheapest, Newest, Alphabetically) and pagination synchronized via URL query parameters.
- **Adaptive UI**: Fully responsive design across mobile, tablet, and desktop.

## ♿ Accessibility (A11y)
- **Screen Readers**: ARIA live regions for dynamic updates; ARIA labels (where needed) and descriptive `alt` text on images.
- **Keyboard & Focus**: Full keyboard-only navigation with skip links, arrow-key support, `Esc` to close modals, focus trapping, and visible focus indicators.
- **Semantic Structure**: Proper semantic HTML and landmark roles for clear screen reader navigation.
- **Reduced Motion**: Support for the `prefers-reduced-motion` media query.

## 📝 Technical Challenges & Solutions

## 🚦 How to Run

```bash
# Clone the repository
git clone https://github.com/home2ego/todos-app

# Navigate to directory
cd todos-app

# Install dependencies
npm install

# Run development server
npm run dev