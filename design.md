# Creator Space Lab (CSL) — Brand & Design System Specification

> **Document Version:** 1.0.0  
> **Repository:** `CSL-Web`  
> **Brand Identity:** Creator Space Lab (CSL)  
> **Target Audience:** Engineering & Arts College Students, Academic Leaders, Tech Interns, and Enterprise Partners

---

## 1. Brand Essence & Mission

**Creator Space Lab (CSL)** is a premier technical skilling, innovation, and experiential learning ecosystem bridging the divide between academic curricula and cutting-edge industry standards. 

- **Vision:** Transform ambitious students into industry-ready software engineers, AI architects, and tech innovators through hands-on labs, structured internships, and collegiate workshops.
- **Brand Personality:**
  - **Academic Rigor meets Modern Innovation:** Authoritative yet accessible; disciplined yet forward-thinking.
  - **Clean & High-Trust:** Premium collegiate aesthetic with warm tones, crisp typography, and disciplined layouts.
  - **Action-Oriented:** Focused on tangible outcomes, live prototypes, and accredited real-world competencies.

---

## 2. Color Palette & Design Tokens

CSL utilizes a refined, high-contrast palette pairing deep collegiate blues with warm gold accents against an ivory/warm parchment canvas.

### 2.1 Core Palette

| Token | CSS Variable | Hex Value | Role & Usage |
| :--- | :--- | :--- | :--- |
| **CSL Blue** | `--color-csl-blue` | `#1455B8` | Primary brand color, primary CTAs, active navigation items, high-emphasis icons, and gradient stops. |
| **CSL Deep Blue** | `--color-csl-deep-blue` | `#0B2E6F` | Dark brand accent, high-contrast headings, gradient anchors, and primary button gradients (`from-csl-deep-blue to-csl-blue`). |
| **CSL Gold** | `--color-csl-gold` | `#F5B83D` | Distinctive accent, eyebrow indicator rules, active indicators, ratings, highlight badges, and subtle borders (`border-csl-gold/30`). |
| **CSL Light Gold**| `--color-csl-light-gold`| `#FFD45C` | Secondary accent, hover states, glow highlights, and gentle gold backgrounds. |
| **CSL Background**| `--color-csl-bg` | `#FCFAF5` | Warm, premium off-white/ivory canvas that prevents eye fatigue and distinguishes CSL from sterile sterile-white pages. |
| **CSL Text** | `--color-csl-text` | `#111111` | Primary body and heading text color, providing sharp WCAG AAA contrast against `--color-csl-bg`. |
| **CSL Muted** | `--color-csl-muted` | `#6B7280` | Secondary metadata, captions, subtitles, placeholders, and inactive states. |

### 2.2 Functional & Supporting Tones

- **Pure White Surfaces:** `#FFFFFF` (used inside cards, modals, and input fields to lift interactive elements above `#FCFAF5`).
- **Warm Section Background:** `#FAF7F3` (used for alternating section blocks, such as Video Testimonials and Interactive Tabs).
- **Subtle Borders:** `rgba(245, 184, 61, 0.20)` to `rgba(245, 184, 61, 0.35)` (refined gold hairline borders).
- **Glassmorphism Overlays:** `bg-white/90 backdrop-blur-md` or `bg-black/40 backdrop-blur-md`.

---

## 3. Typography & Text Hierarchy

### 3.1 Primary Font Family
- **Font:** **Plus Jakarta Sans** (`--font-sans`)
- **Fallbacks:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Characteristics:** Clean geometric grotesk with humanist curves, providing crisp legibility across dense curriculum outlines, technical specs, and high-impact hero headings.

### 3.2 Type Scale & Rhythm

| Element | Class / Specifications | Weight | Characteristics |
| :--- | :--- | :--- | :--- |
| **Section Eyebrow** | `.section-eyebrow > span` (0.8rem / 12.8px) | 700 (Bold) | `uppercase`, `letter-spacing: 0.18em`, `color: var(--color-csl-blue)`. Accompanied by a 2px CSL Gold horizontal bar (`2rem` width). |
| **Section Heading** | `.section-heading` (`text-3xl` to `text-5xl`) | 800 (Extra Bold)| Tight tracking (`tracking-tight`), compact line-height (`1.0` - `1.05`), often featuring dual-color phrases (e.g. `Workshop <span className="text-csl-blue">Experiences</span>`). |
| **Section Subheading**| `.section-subheading` (`text-sm` to `text-base`)| 500 (Medium) | Generous line-height (`1.75` - `1.8`), max width constrained (`max-w-2xl` / `max-w-3xl`), `color: var(--color-csl-muted)`. |
| **Card Title** | `text-base` to `text-lg` | 700 (Bold) | High-contrast `text-csl-text`, tight leading. |
| **Body & Curriculum** | `text-xs` to `text-sm` | 400 - 500 | Clean, scannable technical descriptions with generous vertical padding. |
| **Badges / Metatags** | `text-[10px]` to `text-xs` | 700 (Bold) / Mono | Monospace or uppercase styling with icon pairs (`MapPin`, `Clock`, `Sparkles`). |

---

## 4. UI Components & Architectural Patterns

### 4.1 Navigation (`Navbar.tsx`)
- **Structure:** Floating pinned container with `rounded-2xl`, glass backdrop (`bg-csl-bg/95` or `bg-csl-bg`), subtle gold boundary (`border border-csl-gold/20`), and elevation shadow on scroll.
- **Branding Assets:** High-resolution CSL Typography logo on the left.
- **Desktop Links:** Centered navigation items with hover dot transitions (`bg-csl-gold` to `bg-csl-blue scale-125`).
- **Student Portal CTA:** Prominent gradient pill (`from-csl-deep-blue to-csl-blue text-white`) with diagonal arrow indicator (`ArrowUpRight`).
- **Mobile Experience:** Fully responsive layout with edge-safe horizontal padding (`px-3.5 xs:px-4.5 sm:px-6`), `whitespace-nowrap` CTAs, and a distinctive 4-square geometric grid menu button.

### 4.2 Interactive Cards & Elevational Styling
- **Card Container:** `bg-white border border-csl-gold/25 rounded-2xl` or `rounded-3xl` with soft box shadows (`shadow-sm` transitioning to `shadow-md` or `shadow-xl` on hover).
- **Independent State Management:** Interactive expansion controls (such as workshop curriculum cards) expand independently without cascading or unwanted reflows.
- **Accents:** Distinctive badges for levels (`Basic`, `Intermediate`, `Advanced`), trending flags, and collegiate partner tags.

### 4.3 Form Controls & Custom Dropdowns (`CustomDropdown.tsx`)
- Standardized custom accessible dropdowns (replacing generic OS selects) matching the brand aesthetic.
- **Trigger Height:** Consistent `h-10` or `h-11` heights, `rounded-xl`, gold hairline borders (`border-csl-gold/30`), leading Lucide icons, and rotating blue chevrons (`ChevronDown`).
- **Alignment:** Identical vertical rhythm between search inputs and adjacent filter controls.

### 4.4 Multimedia & Dynamic Elements
- **Workshop Video Experience:** Hybrid format supporting widescreen campus laboratory footage (16:9) and mobile/tablet native Shorts reels (9:16 portrait) with custom player controls, fullscreen toggles, and dual-mode swipe/arrow navigation (`ChevronLeft`/`ChevronRight`).
- **Infinite Marquees:** Smooth hardware-accelerated CSS keyframe marquees for student testimonials and enterprise hiring partners.

---

## 5. Responsive Design Breakpoints

The layout adheres to standard Tailwind breakpoints supplemented with a custom tablet/desktop breakpoint:

| Breakpoint | Width | Primary Behavior |
| :--- | :--- | :--- |
| **Mobile (XS / SM)** | `320px` - `639px` | Single-column cards, edge-padded sticky navbar, compact stacked/two-row filters, swipeable video carousels with arrow navigation. |
| **Tablet (MD)** | `640px` - `767px` | 2-column grids, compact controls, touch-friendly tap targets. |
| **Tablet Pro / Small Desktop**| `768px` - `1194px` | Custom breakpoint `custom1195`: transitions navbar between compact mobile action menu and full horizontal desktop mega-menus. |
| **Desktop (LG / XL / 2XL)** | `1024px` - `1536px+`| Multi-column grids (3-column, 4-column cards), expansive mega-dropdowns, horizontal centered domain filters. |

---

## 6. Iconography & Visual Assets

- **Icon Set:** [Lucide React](https://lucide.dev/) (`lucide-react`)
- **Stroke Weights:** Consistent `1.5` to `2.2` stroke weights tailored for crisp visibility on light surfaces.
- **Icon Accent Colors:**
  - `text-csl-blue` for interactive controls and primary highlights.
  - `text-csl-gold` for decorative stars, location markers, sparklines, and status badges.
  - `text-csl-muted` for metadata and subtle search indicators.
- **Brand Imagery:** Authentic laboratory and campus workshop photography, corporate partner logos, and branded vector illustrations.
