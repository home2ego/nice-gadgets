# Nice Gadgets

An e-commerce web application for mobile phones, tablets, and accessories, built with **React** and **TypeScript**, with a strong focus on performance, accessibility, and UX.

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
- **Adaptive UI**: Fully responsive UI across mobile, tablet, and desktop.

## ♿ Accessibility (A11y)
- **Screen Readers**: Semantic HTML with ARIA labels and live regions where necessary for dynamic updates.
- **Keyboard & Focus**: Full keyboard-only navigation with skip links, arrow-key support, `Esc` to close modals, focus trapping, and visible focus indicators.
- **Reduced Motion**: Support for the `prefers-reduced-motion` media query.

## 📝 Technical Challenges & Solutions

### **Performance**

- **Challenge**  
Performance can become a bottleneck in medium to large applications, so I aimed to achieve consistently high performance without compromising UX.

- **Solution**  
I focused on the main performance bottlenecks: bundle size, rendering cost, and improving initial loading speed:

1. Implemented **vendor splitting** via `advancedChunks` for large third-party libraries to improve caching and parallel loading.
2. Added **route-based code splitting** for large pages (e.g. product details), using skeleton UIs during lazy loading to improve perceived performance.
3. Optimized **image loading** with lazy loading for below-the-fold images, preloading the LCP image, controlling request priority (`fetchpriority`), and serving responsive **WebP** images via `<picture>`.
4. Applied **memoization selectively**, only where it provided measurable performance benefits.
5. Reduced **layout thrashing** by avoiding unnecessary DOM updates and favoring compositing-only CSS properties (e.g. `transform`, `opacity`).


## 🚦 How to Run

```bash
# Clone the repository
git clone https://github.com/home2ego/nice-gadgets.git

# Navigate to directory
cd nice-gadgets

# Install dependencies
npm install

# Run development server
npm run dev