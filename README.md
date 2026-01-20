# Nice Gadgets

A **React** and **TypeScript** e-commerce web app for Apple devices, built with a focus on performance, accessibility and UX.

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
- **Internationalization**: Multi-language support with **i18next**, including browser language detection, dynamic pluralization, and locale-aware currency formatting.
- **Global Cart & Favorites**: Global state management with **Redux Toolkit** and `localStorage`.
- **Vanilla Carousels**: Two custom carousels built without external libraries.
-  **URL-Synchronized Sorting**: Custom select controls (Cheapest, Newest, Alphabetically) and pagination synchronized via URL query parameters.
- **Adaptive UI**: Fully responsive UI across mobile, tablet, and desktop.

## ♿ Accessibility (A11y)
- **Screen Readers**: Semantic HTML with ARIA labels and live regions where necessary for dynamic updates.
- **Keyboard & Focus**: Full keyboard navigation with skip links, arrow-key support for widgets, `Esc` handling for overlays, focus trapping for active overlays, and visible focus indicators.
- **Reduced Motion**: Support for the `prefers-reduced-motion` media query.

## 📝 Technical Challenges & Solutions

### **Performance**

<details>
<summary>Details about performance</summary>

- **Challenge**  
Performance can become a bottleneck in medium to large apps, so I aimed to achieve high performance without compromising UX.

- **Solution**  
1. I improved loading time by splitting React and ReactDOM into vendor chunks using `advancedChunks` in Vite.
2. I reduced the bundle size using `React.lazy()` and improved perceived performance by showing skeleton UI while pages load.
3. I improved the LCP metric by preloading the LCP image, controlling `fetchpriority`, and using the WebP format.
4. I reduced layout thrashing by using GPU-accelerated CSS properties (`transform`, `opacity`, etc.) for animations.
</details>

### **Vanilla Carousels**

- **Motivation**:  
Most carousel libraries add unnecessary bundle weight, have poor accessibility, and limit styling freedom, so I designed custom carousels to meet my needs.

<details>
<summary>Details about the "Hero" carousel (`PicturesCarousel` component)</summary>

- **Challenge**  
For the first carousel, my goal was to make it infinite with full accessibility compliance, smart autoplay lifecycle management, and mobile touch support.

- **Solution**
1. To create the infinite effect, I added duplicates of the first and last slides, and reset the index when reaching the end to loop smoothly.
2. To implement a smart autoplay, I pause it when the carousel controls gain focus, when the mobile menu opens/closes, or when visibility changes (like switching between tabs, etc.).
3. I created a custom hook to track `touchstart`/`touchend` events for managing mobile swipe gestures.
4. I added support for `prefers-reduced-motion` with a custom hook for motion-sensitive users.
</details>

<details>
<summary>Details about the "Product Strip" carousel (`ProductsCarousel` component)</summary>

- **Challenge**  
For the second carousel, my goal was to combine native scroll behavior with accurate detection of the first/last visible product for correct focus management during keyboard navigation and control button disabling.

- **Solution**  
I used the `IntersectionObserver` API with a `Set` to track visible products for better performance and simpler management. This way I could preserve native scrolling, disable control buttons when the first/last list product is fully visible, and land focus on the first/last visible product during navigation instead of jumping to the first/last product in the list.
</details>

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