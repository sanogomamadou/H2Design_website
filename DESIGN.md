---
name: H2 Design
description: Premium construction, renovation, and architectural services in Mali.
colors:
  primary: "#E8A33D"
  secondary: "#2B3A56"
  dark: "#111111"
  darker: "#161616"
  text: "#666666"
  text-light: "#999999"
  bg: "#ffffff"
  bg-light: "#fafafa"
  bg-accent: "#edf2f5"
typography:
  display:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw, 2.8rem)"
    fontWeight: 400
    lineHeight: 1.3
  service-title:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 400
  body:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    textTransform: "uppercase"
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "50px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "120px"
components:
  button-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    hoverOpacity: 0.85
  button-circle:
    size: "48px"
    backgroundColor: "{colors.bg}"
    textColor: "{colors.dark}"
    border: "1px solid #eee"
    rounded: "50%"
    hoverBg: "{colors.dark}"
    hoverText: "{colors.bg}"
  button-circle-outline:
    size: "40px"
    backgroundColor: "transparent"
    border: "1px solid #ccc"
    rounded: "50%"
  pill-filter:
    padding: "8px 24px"
    rounded: "{rounded.pill}"
    border: "1px solid #e0e0e0"
    activeBg: "{colors.dark}"
    activeText: "{colors.bg}"
---

# Design System: H2 Design

## 1. Overview

**Creative North Star: "Highly structured, vast white space, letting the work speak"**

The H2 Design interface is a premium monograph for a construction agency. It feels airy, confident, and structurally grounded. Generous white space, strict alignment, and high-quality photography carry the visual weight. The layout alternates between full-bleed hero photography, asymmetric two-column grids, and staggered project galleries to maintain editorial rhythm without repetition.

**Key Characteristics:**
- Restrained color palette where the logo's Deep Navy and Warm Amber appear as precise, sparing accents.
- Asymmetric grids and staggered vertical offsets to break monotony.
- Full-viewport hero with dark overlay for immersive entry.
- Photography-first content strategy: images are the primary trust signal.
- Flat-at-rest elevation; shadows appear only on interaction.

## 2. Colors

Colors are derived directly from the H2 Design logo. The "H" letterform is a deep navy blue; the "2" is a warm amber. These two colors anchor the entire palette.

### Brand Colors (from logo)
- **Warm Amber** (`#E8A33D`): The golden orange of the "2" in the logo. Used extremely sparingly as a highlight accent on Trustpilot scores, active states, or a single focal CTA. Its rarity is the point.
- **Deep Navy** (`#2B3A56`): The saturated blue of the "H" and "Design" in the logo. Reserved for the stateliest structural moments: the dark footer block and high-impact headings where navy reads stronger than obsidian.

### Functional Neutrals
- **Obsidian** (`#111111`): Primary text color for headings and high-contrast UI. Also the default button background (`--c-dark`).
- **Charcoal** (`#161616`): Slightly deeper black for the footer background (`--c-darker`), providing subtle contrast separation from obsidian elements.
- **Slate** (`#666666`): Secondary body copy, descriptions, metadata (`--c-text`).
- **Silver** (`#999999`): Tertiary text, light labels, section kickers, stat annotations (`--c-text-light`).
- **Pure Canvas** (`#ffffff`): Dominant background. Vast, unbroken white space is a core design element (`--c-white`).
- **Warm White** (`#fafafa`): Alternating section background for subtle rhythm (`--c-bg-light`).
- **Mist Blue** (`#e5edf0`): The CTA section background. A cool, desaturated blue-gray that provides a soft tonal break before the dark footer (`--c-bg-blue`).

**The Restraint Rule.** The Warm Amber accent appears on no more than 10% of any screen. The interface relies on structure, typography, and photography for hierarchy, not color saturation.

## 3. Typography

**Font:** Outfit (Google Fonts), with system-ui fallback.

**Character:** Modern, geometric, and airy. Hierarchy is established through dramatic scale contrast and weight variation, not color.

### Hierarchy (as implemented in CSS)
| Level | Weight | Size | Line-Height | Usage |
|-------|--------|------|-------------|-------|
| Display | 400 | clamp(3.5rem, 6vw, 6rem) | 1.1 | Hero headline only |
| Headline | 400 | clamp(2.5rem, 4vw, 3.5rem) | 1.2 | Section titles (`.section-title`) |
| Title | 400 | clamp(2rem, 3vw, 2.8rem) | 1.3 | About headline, testimonial quote |
| Service Title | 400 | 2.5rem | 1.2 | Service row headings (`.s-title`) |
| Body | 400 | 1rem | 1.6 | All paragraph text |
| Label | 500 | 0.85rem | — | Section kickers (`.section-label`), uppercase, 0.05em tracking |
| Stat Number | 400 | 3rem | 1 | Large statistics display |

**Heading color:** All headings default to `--c-dark` (#111111). The about-headline uses `--c-text-light` (#999999) with `<strong>` segments reverting to `--c-dark` for emphasis contrast.

### Scale Contrast Rule
Maintain a minimum 1.25x size ratio between adjacent typographic levels.

## 4. Elevation

Strictly **"Flat at Rest, Lifted on Action."**

### Shadow Vocabulary
- **Hover Lift** (`box-shadow: 0 10px 30px rgba(0,0,0,0.05)`): Applied on the Trustpilot rating card and the reviewer avatar badge. The only resting shadow in the entire interface.
- **Image Scale** (`transform: scale(1.03)`): Project cards lift via subtle zoom on hover instead of shadow, with a 0.6s ease transition.

**No resting shadows on cards, sections, or containers.** Depth comes from spacing, photography, and tonal alternation (white → fafafa → e5edf0 → dark footer).

## 5. Layout Architecture

### Page Flow
The page follows a deliberate tonal rhythm:

1. **Hero** (full-viewport, dark overlay on photography)
2. **About** (white background, asymmetric 1:1 grid)
3. **Services** (warm-white `#fafafa`, header grid + stacked service rows)
4. **Projects** (white background, 2-column staggered grid)
5. **Testimonials** (warm-white `#fafafa`, asymmetric 1:1.5 grid)
6. **CTA** (mist-blue `#e5edf0`, centered, image overlapping into footer)
7. **Footer** (charcoal `#161616`, 1:1.5 grid with watermark)

### Grid Patterns (as implemented)
- **About section:** `grid-template-columns: 1fr 1fr` with `--space-xl` (120px) gap.
- **Services header:** `grid-template-columns: 1.5fr 1fr` with bottom border separator.
- **Service rows:** `grid-template-columns: 1fr 1.5fr` (text : images).
- **Projects:** `grid-template-columns: 1fr 1fr` with staggered `margin-top` offsets (80px, -60px) for editorial rhythm.
- **Testimonials:** `grid-template-columns: 1fr 1.5fr`.
- **Footer top:** `grid-template-columns: 1fr 1.5fr`, footer info sub-grid `repeat(3, 1fr)`.

### Responsive Breakpoint
Single breakpoint at `max-width: 1024px`. All grids collapse to single-column. Hero title drops to 3rem. Nav links hide. Hero bottom stacks vertically. Project stagger offsets reset to 0.

## 6. Components

### Buttons
- **Primary (`.btn-dark`):** Obsidian background, white text, pill-shaped (50px radius), 14px 28px padding. Hover: opacity 0.85.
- **Circular Icon (`.btn-circle`):** 48×48px, white background, 1px `#eee` border. Hover: inverts to obsidian bg + white icon.
- **Circular Outline (`.btn-circle-outline`):** 40×40px, transparent, 1px `#ccc` border. Hover: border darkens.
- **Filter Pill (`.pill`):** 8px 24px padding, pill-shaped, 1px `#e0e0e0` border. Active/hover: obsidian fill + white text.

### Hero Cards (`.h-card`)
- Width: 240px (primary), 160px (secondary at 0.7 opacity).
- 16px radius, obsidian background, 160px image height.
- Gradient overlay on content area: `transparent → rgba(0,0,0,0.8)`.

### Project Cards (`.project-card`)
- 16px radius image container, 4:3 aspect ratio.
- Image zoom on hover (`scale(1.03)`, 0.6s ease).
- Optional centered overlay button that fades in on hover.

### Testimonial Block
- House image: 1:1 aspect ratio, 16px radius.
- Reviewer badge: absolute-positioned, offset right by -40px.
- Rating card: white background with hover-lift shadow. Stars in `#fbc02d`.

### Section Labels (`.section-label`)
- 0.85rem, uppercase, 0.05em letter-spacing, `--c-text-light` (#999999).

## 7. Motion

### Reveal Animation (`.reveal`)
- Initial state: `opacity: 0; transform: translateY(30px)`.
- Transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1)` (ease-out-expo).
- Triggered by `.is-visible` class (via Intersection Observer in JS).

### Interactive Transitions
- Button hover opacity: `0.3s ease`.
- Circle button bg/color invert: `0.3s ease`.
- Nav link opacity: `0.3s`.
- Project image zoom: `0.6s ease`.
- Filter pill fill: `0.3s`.

**No layout-property animation.** All motion uses opacity, transform, or box-shadow.

## 8. Do's and Don'ts

### Do:
- **Do** use vast white space to let photography and typography carry the hierarchy.
- **Do** keep the Warm Amber (`#E8A33D`) extremely rare. It should feel like a signature, not a system color.
- **Do** use staggered grid offsets and asymmetric columns for editorial rhythm.
- **Do** maintain the tonal page rhythm (white → warm-white → mist-blue → dark).
- **Do** use fully rounded pill shapes for primary interactive buttons.

### Don't:
- **Don't** use the Warm Amber as a background fill, large border, or heading color. It is an accent, not a surface.
- **Don't** apply resting shadows to cards or containers. Flat at rest, always.
- **Don't** use generic SaaS aesthetics (glowing gradients, glassmorphism, neon accents).
- **Don't** repeat identical card grids. Vary column ratios, stagger offsets, and aspect ratios.
- **Don't** use `border-left` > 1px as a colored stripe on cards or callouts.
- **Don't** clutter the interface. Every element must earn its place on the canvas.
