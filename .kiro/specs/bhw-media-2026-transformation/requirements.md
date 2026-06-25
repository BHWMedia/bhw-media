# Requirements Document

## Introduction

This document defines the requirements for the BHW Media 2026 Hyper-Realistic Website Transformation — a four-phase upgrade of an existing Next.js 15/16 website from a premium dark template into a fully immersive, physics-driven environment. The guiding philosophy is that digital experiences should be physically felt through the screen: every pixel carries perceptible weight, inertia, and light.

The transformation covers: (1) Design System & Globals finalization, (2) Component Engineering for hero, portfolio, services, and counters, (3) Contact & Content updates across all surfaces, and (4) Performance & SEO hardening to maintain 100 Lighthouse scores with zero hydration mismatches.

---

## Glossary

- **Website**: The Next.js 16/React 19 application hosted at bhw-media.vercel.app.
- **Design_System**: The Tailwind CSS v4 `@theme` token layer defined in `app/globals.css`.
- **HeroSection**: The full-viewport opening section rendered by `components/HeroSection.tsx`.
- **PortfolioGrid**: The filterable case-study grid rendered by `components/PortfolioGrid.tsx`.
- **PortfolioCarousel**: The 3D perspective vault carousel that replaces PortfolioGrid's flat grid.
- **ServicesGrid**: The service card layout rendered by `components/ServicesGrid.tsx`.
- **HorizontalServicesScroll**: The horizontal scroll section that replaces ServicesGrid.
- **AnimatedCounter**: The spring-based counter in `components/AnimatedCounter.tsx`.
- **OdometerCounter**: The drum-roll odometer counter in `components/OdometerCounter.tsx`.
- **MetricsShowcase**: The stats section in `components/MetricsShowcase.tsx` that renders counters.
- **AmbientGlow**: The persistent fixed background light-source overlay in `app/layout.tsx`.
- **Footer**: The site footer rendered by `components/Footer.tsx`.
- **AuditWizard**: The multi-step audit request form in `components/AuditWizard.tsx`.
- **Layout**: The root layout file at `app/layout.tsx`.
- **Structured_Data**: The JSON-LD schema objects injected in `Layout`'s `<head>`.
- **STEADICAM**: The canonical Framer Motion spring configuration `{ type: 'spring', mass: 3, stiffness: 45, damping: 25 }`.
- **Glassmorphism**: A visual material treatment defined by `backdrop-filter: blur(24px) saturate(180%)`.
- **CLS**: Cumulative Layout Shift — a Core Web Vitals metric measuring visual stability.
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` media query preference.
- **Contact_Record**: The canonical set of contact values: phone `+91 73307 42651`, email `mediabhw@gmail.com`, Facebook page `BHW Media`, Instagram handle `media._bhw`.

---

## Requirements

---

### Requirement 1: Design System Token Completeness

**User Story:** As a developer, I want the Tailwind CSS v4 `@theme` layer to expose every design token referenced in the 2026 blueprint, so that all components can consume values from a single source of truth without hardcoded hex strings.

#### Acceptance Criteria

1. THE Design_System SHALL expose a `--color-void` token with value `#06060D`.
2. THE Design_System SHALL expose a `--color-studio` token with value `#0D0D18`.
3. THE Design_System SHALL expose a `--color-violet` token with value `#7C5BFF`.
4. THE Design_System SHALL expose glassmorphism utility classes `.glass-panel` and `.glass-panel-premium`, where `.glass-panel-premium` applies `backdrop-filter: blur(24px) saturate(180%)` at minimum.
5. WHEN a new component applies the class `bg-void`, THE Design_System SHALL resolve the class to `background-color: #06060D`.
6. WHEN a new component applies the class `bg-studio`, THE Design_System SHALL resolve the class to `background-color: #0D0D18`.
7. WHEN a new component applies the class `text-violet`, THE Design_System SHALL resolve the class to `color: #7C5BFF`.
8. THE Design_System SHALL expose the `STEADICAM` spring constant `{ type: 'spring', mass: 3, stiffness: 45, damping: 25 }` as a shared TypeScript export from `lib/constants.ts` so that all motion components import it from one location.

---

### Requirement 2: AmbientGlow Persistent Light Source

**User Story:** As a visitor, I want a subtle, permanent light source behind all page content, so that the website feels like it has physical depth with real ambient illumination rather than flat darkness.

#### Acceptance Criteria

1. THE AmbientGlow SHALL be rendered as a persistent fixed-position element in `Layout` that appears behind all page content.
2. THE AmbientGlow SHALL be marked `aria-hidden="true"` and have `pointer-events-none` so that it does not interfere with interaction.
3. THE AmbientGlow SHALL use `#7C5BFF` as its primary color source.
4. THE AmbientGlow SHALL be present on every route of the Website without requiring per-page configuration.
5. WHEN the page renders on the server, THE AmbientGlow SHALL not cause a hydration mismatch between server-rendered HTML and client-side React.

---

### Requirement 3: HeroSection Cursor-Proximity Character Warping

**User Story:** As a visitor, I want the hero headline text to warp character-by-character toward my cursor as I move across the section, so that the typography feels physically reactive and immersive.

#### Acceptance Criteria

1. WHEN the visitor moves the cursor within the HeroSection bounds, THE HeroSection SHALL apply a displacement transform to each headline character based on the character's distance from the cursor position.
2. THE HeroSection SHALL animate character displacement using the STEADICAM spring configuration `{ type: 'spring', mass: 3, stiffness: 45, damping: 25 }`.
3. WHEN the cursor distance from a character exceeds a defined proximity radius, THE HeroSection SHALL return that character to its resting position using the same STEADICAM spring.
4. THE HeroSection SHALL preserve all existing kinetic entrance animations, fluid mesh background, and scroll parallax behaviors alongside the proximity warping.
5. WHEN the visitor's device reports `Reduced_Motion` preference, THE HeroSection SHALL immediately return all characters to their resting positions and disable proximity warping, kinetic entrance animations, and fluid mesh parallax together, falling back to a fully static headline state.
6. WHEN the HeroSection is rendered on the server, THE HeroSection SHALL guard all `window`-dependent cursor tracking logic inside `useEffect` to prevent hydration mismatches.
7. THE HeroSection SHALL maintain First Contentful Paint under 1 second on a simulated 4G connection after the proximity warping feature is added.

---

### Requirement 4: PortfolioCarousel 3D Perspective Vault Display

**User Story:** As a visitor, I want to browse portfolio case studies in a 3D rotating vault-style carousel, so that each project feels like a physical artifact being presented in three-dimensional space.

#### Acceptance Criteria

1. THE PortfolioCarousel SHALL render case study cards arranged in a 3D arc using `transform-style: preserve-3d` and `perspective` CSS properties.
2. WHEN the visitor navigates forward or backward, THE PortfolioCarousel SHALL rotate the vault to bring the next or previous card to the foreground using the STEADICAM spring configuration.
3. THE PortfolioCarousel SHALL display the active card prominently at full opacity and scale, with flanking cards rendered at reduced scale and opacity to communicate depth.
4. THE PortfolioCarousel SHALL preserve all existing portfolio data from `PORTFOLIO` in `lib/constants.ts` — no case study entries shall be removed.
5. THE PortfolioCarousel SHALL preserve the category filter tabs that existed in PortfolioGrid, allowing visitors to filter which items appear in the carousel.
6. WHEN the visitor's device reports `Reduced_Motion` preference, THE PortfolioCarousel SHALL degrade gracefully to a flat horizontal scroll list without 3D transforms.
7. IF zero portfolio items match the active filter, THEN THE PortfolioCarousel SHALL display a "no items found" message in place of the carousel. IF fewer than two items match, THEN THE PortfolioCarousel SHALL render the available items without 3D rotation.
8. WHEN a portfolio card is clicked, THE PortfolioCarousel SHALL navigate the visitor to the corresponding case study detail page at `/portfolio/[slug]`.
9. THE PortfolioCarousel SHALL be keyboard-navigable, with left/right arrow key support for rotating the vault.

---

### Requirement 5: HorizontalServicesScroll Driven by Vertical Input

**User Story:** As a visitor, I want the services section to scroll horizontally as I scroll vertically down the page, so that the layout feels physically continuous and directionally unexpected — creating a memorable reveal.

#### Acceptance Criteria

1. THE HorizontalServicesScroll SHALL translate its card track horizontally in proportion to the visitor's vertical scroll progress through the section's scroll container.
2. THE HorizontalServicesScroll SHALL use Framer Motion's `useScroll` and `useTransform` to map vertical scroll progress to horizontal translation.
3. THE HorizontalServicesScroll SHALL display all six service entries from `SERVICES` in `lib/constants.ts`.
4. WHEN the visitor scrolls on a touch device, THE HorizontalServicesScroll SHALL not suppress the browser's native vertical scroll so that the page remains scrollable.
5. WHEN the visitor's device reports `Reduced_Motion` preference, THE HorizontalServicesScroll SHALL render as a standard vertical grid without horizontal scroll behavior.
6. THE HorizontalServicesScroll SHALL apply the STEADICAM spring configuration to any motion values used for card entrance animations within the scroll track.
7. WHEN the HorizontalServicesScroll section is not in the viewport, THE Website SHALL not apply horizontal scroll transforms to prevent unintended layout shift.

---

### Requirement 6: OdometerCounter Wired to MetricsShowcase

**User Story:** As a visitor, I want to see metric numbers animate as vertical drum-roll digits when they scroll into view, so that the statistics feel kinetic and physically weighty rather than just a number counting up.

#### Acceptance Criteria

1. THE MetricsShowcase SHALL render all numeric counters using OdometerCounter instead of AnimatedCounter.
2. WHEN a metric counter scrolls into the viewport, THE OdometerCounter SHALL animate each digit column from top to bottom using the drum-roll strip mechanism already implemented in `OdometerCounter.tsx`.
3. THE OdometerCounter SHALL animate digit transitions using STEADICAM spring physics `{ type: 'spring', mass: 3, stiffness: 45, damping: 25 }`.
4. THE OdometerCounter SHALL trigger the animation only once per page load when the element first enters the viewport.
5. WHEN the visitor's device reports `Reduced_Motion` preference, THE OdometerCounter SHALL display the final numeric value immediately without animation.
6. THE OdometerCounter SHALL always render the final numeric value as visible text regardless of animation state, so that the counter value is never missing; the animated drum strip SHALL be marked `aria-hidden="true"`.

---

### Requirement 7: Consistent Contact Records Across All Surfaces

**User Story:** As a visitor or client, I want every phone number, email address, and social media link on the website to match the canonical contact details, so that I can always reach BHW Media using any contact point I find.

#### Acceptance Criteria

1. THE Footer SHALL display phone number `+91 73307 42651` as a clickable `tel:` link.
2. THE Footer SHALL display email `mediabhw@gmail.com` as a clickable `mailto:` link.
3. THE Footer SHALL include a Facebook link pointing to the `BHW Media` Facebook page.
4. THE Footer SHALL include an Instagram link pointing to the `media._bhw` Instagram handle at `https://instagram.com/media._bhw`.
5. THE AuditWizard SHALL display phone number `+91 73307 42651` in the fallback error message and any visible contact prompt.
6. THE AuditWizard SHALL display email `mediabhw@gmail.com` as the fallback contact address in the submission error state.
7. THE Structured_Data in Layout SHALL set the `telephone` field of the `organizationSchema` to `+91 73307 42651`.
8. THE Structured_Data in Layout SHALL set the `email` field of the `organizationSchema` to `mediabhw@gmail.com`.
9. FOR ALL three contact surfaces (Footer, AuditWizard, Structured_Data), THE phone number, email, Facebook, and Instagram values SHALL be identical to the Contact_Record canonical values.

---

### Requirement 8: Portfolio Imagery with Thematic High-Resolution Assets

**User Story:** As a visitor, I want each portfolio case study to display a thematic high-resolution image that reflects the industry and color accent of the project, so that I immediately understand the domain and quality of BHW Media's work.

#### Acceptance Criteria

1. THE PortfolioCarousel SHALL display the Real Estate case study (`aura-real-estate`) with an image depicting architectural glass and steel with violet accent lighting.
2. THE PortfolioCarousel SHALL display the Hospitality case study (`cafe-noire`) with an image depicting moody high-end interior lighting with gold accent.
3. THE PortfolioCarousel SHALL display the Fitness case study (`elite-fitness`) with an image depicting a high-contrast tech-integrated gym environment with cyan accent.
4. THE PortfolioCarousel SHALL display the Automotive case study (`car-motors-repair`) with an image depicting macro precision engine photography with crimson accent.
5. WHEN a portfolio image is rendered or present in the DOM regardless of load state, THE PortfolioCarousel SHALL include an explicit `sizes` prop on every `<Image>` component to prevent CLS.
6. WHEN a portfolio image is rendered, THE PortfolioCarousel SHALL specify either explicit `width` and `height` attributes or a single dimension sufficient to preserve the declared aspect ratio on every `<Image>` component.
7. IF a portfolio image fails to load, THEN THE PortfolioCarousel SHALL display the case study card with the category color accent as a fallback background so that the layout does not break.

---

### Requirement 9: Image Sizes Props for Zero CLS

**User Story:** As a site owner, I want all `<Image>` components across the site to have explicit `sizes` and dimension props, so that the browser can reserve the correct space before images load and the Cumulative Layout Shift score remains at zero.

#### Acceptance Criteria

1. THE Website SHALL ensure every `<Image>` component rendered in HeroSection, PortfolioCarousel, HorizontalServicesScroll, MetricsShowcase, and Footer has an explicit `sizes` prop describing the responsive image width at each breakpoint.
2. WHEN the Website is measured by a Lighthouse CLS audit, THE Website SHALL achieve a CLS score of 0.00; THE Website SHALL maintain this score during normal browsing by reserving correct image space at all times regardless of whether Lighthouse is actively measuring.
3. THE Website SHALL ensure no `<Image>` component uses a `layout="fill"` pattern without a sized parent container.

---

### Requirement 10: Zero Hydration Mismatches

**User Story:** As a developer, I want all browser-only APIs to be guarded so that the server-rendered HTML always matches the initial client render, so that React does not produce hydration warnings in production.

#### Acceptance Criteria

1. WHEN any component accesses `window`, `document`, or `navigator`, THE Website SHALL guard that access inside a `useEffect` hook or a `useState` initialized to a server-safe default value.
2. WHEN the Website is loaded in a browser with React strict mode or Next.js development mode, THE Website SHALL produce zero hydration mismatch warnings in the browser console.
3. THE HeroSection SHALL not read `window.innerWidth` during the initial render phase; WHEN layout-dependent values are needed before `useEffect` runs, THE HeroSection SHALL render a loading state or layout placeholder until the `useEffect` hook provides real dimensions after mount.
4. THE PortfolioCarousel SHALL not compute 3D transform values that depend on DOM measurements during server-side rendering; WHEN such measurements are needed, THE PortfolioCarousel SHALL defer them to a `useEffect` after mount.

---

### Requirement 11: Reduced Motion Accessibility

**User Story:** As a visitor with vestibular disorders or motion sensitivity, I want all animations to be disabled or substantially reduced when I have set `prefers-reduced-motion: reduce` in my OS settings, so that the website does not trigger discomfort.

#### Acceptance Criteria

1. WHEN the visitor's OS reports `Reduced_Motion` preference, THE HeroSection SHALL immediately return all characters to rest positions and disable cursor-proximity character warping, kinetic entrance animations, and fluid mesh parallax together as a unified fallback to a static state; IF any one of these animation types cannot be disabled, THE entire HeroSection animation SHALL fall back to static rendering.
2. WHEN the visitor's OS reports `Reduced_Motion` preference, THE PortfolioCarousel SHALL disable 3D vault rotation and render a flat accessible list.
3. WHEN the visitor's OS reports `Reduced_Motion` preference, THE HorizontalServicesScroll SHALL render as a standard vertical grid.
4. WHEN the visitor's OS reports `Reduced_Motion` preference, THE OdometerCounter SHALL display the target value immediately without digit-drum animation.
5. THE Website SHALL implement the `Reduced_Motion` check using the CSS rule `@media (prefers-reduced-motion: reduce)` already present in `globals.css` and/or the Framer Motion `useReducedMotion()` hook in interactive components.

---

### Requirement 12: Lighthouse Performance Target

**User Story:** As a site owner, I want the website to maintain a 100 Lighthouse performance score after all Phase 2 component changes are applied, so that the transformation does not degrade the technical quality that BHW Media's brand depends on.

#### Acceptance Criteria

1. WHEN the Website is audited by Lighthouse in a production build, THE Website SHALL achieve a Performance score of 95 or above on mobile and 100 on desktop.
2. THE HorizontalServicesScroll SHALL use `will-change: transform` only on the actively animating track element, not on all children, to prevent GPU layer proliferation.
3. THE PortfolioCarousel SHALL lazy-load images for cards that are not in the foreground position using `loading="lazy"` on non-active `<Image>` components.
4. THE HeroSection proximity-warping feature SHALL not register more than one global `mousemove` event listener per HeroSection mount.
5. WHEN a route is navigated to, THE Website SHALL achieve a First Contentful Paint under 1.5 seconds on a simulated mobile 4G connection.
