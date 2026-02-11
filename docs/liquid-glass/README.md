# Liquid Glass Design System

CSS-only implementation of Apple's Liquid Glass design language (WWDC 2025), with optional SVG refraction filters for progressive enhancement.

## Architecture

Three tiers of glass effects, each with increasing visual density:

| Class | Use Case | Blur | Opacity | Features |
|-------|----------|------|---------|----------|
| `.glass` | Navbar, footer | 26px | 0.42-0.48 | Shimmer, specular glow, prismatic edges |
| `.glass-card` | Content cards | 20px | 0.06-0.52 | Hover lift, chromatic edges on hover |
| `.glass-pill` | Tags, badges | 8px | 0.05 | Minimal, fast |

## Quick Start

```html
<!-- Navbar -->
<nav class="glass rounded-[20px]">...</nav>

<!-- Card -->
<div class="glass-card rounded-2xl p-6">...</div>

<!-- Tag -->
<span class="glass-pill rounded-full px-3 py-1">Tag</span>
```

## Visual Layers (per element)

Each `.glass` element has three visual layers:

```
┌─────────────────────────────────────┐
│ ::before  — Specular highlight      │  z-index: 3
│   • Soft overhead glow (gradient)   │
│   • Sharp 1px top-edge line         │
│   • Breathing animation             │
├─────────────────────────────────────┤
│ ::after   — Prismatic refraction    │  z-index: 2
│   • 4× radial color gradients       │
│   • Chromatic inset edge borders    │
│   • Each side = different wavelength│
├─────────────────────────────────────┤
│ element   — Frosted glass base      │  z-index: auto
│   • backdrop-filter: blur + sat     │
│   • Animated shimmer background     │
│   • Ring border (box-shadow)        │
└─────────────────────────────────────┘
```

## How It Simulates Real Glass

### 1. Frosted Blur (backdrop-filter)
Real glass scatters light passing through it. We use `backdrop-filter: blur(26px) saturate(1.7) brightness(1.08)` to simulate this. The saturation boost compensates for the desaturation that blur causes, and brightness lift prevents the glass from looking too dark.

### 2. Specular Highlights (::before)
When light hits glass from above, it creates a bright reflection along the top edge. We simulate this with:
- A soft `linear-gradient(180deg)` glow fading downward
- A sharp 1px `linear-gradient(90deg)` line at the very top
- A slow breathing animation for organic feel

### 3. Chromatic Refraction (::after)
Real glass refracts different wavelengths of light at slightly different angles (chromatic aberration). We simulate this with:
- **Radial gradients**: Positioned at each edge (left=cyan, top=violet, right=pink, bottom=green)
- **Inset box-shadows**: 1px colored borders on each side, each a different color
- This creates the impression of light splitting at glass boundaries

### 4. Shimmer (background animation)
A subtle white gradient sweeps across the glass surface via `background-position` animation, simulating a moving light source reflecting off the glass.

### 5. Ring Border (box-shadow)
Instead of CSS `border` (which is too thick), we use `box-shadow: 0 0 0 0.5px` for an ultra-thin edge that mimics the boundary of real glass.

## SVG Refraction Filters

Two SVG filters are defined in `PortfolioHome.tsx` for optional use:

### `#glass-refract` (subtle)
```
Pipeline: preblur(0.3) → feTurbulence(0.015, 2 octaves) → blur(3) → displacement(scale=8) → saturate(1.3)
```
- Scale 8 = gentle distortion visible at edges
- Good for navbar, footer, cards

### `#glass-refract-strong` (dramatic)
```
Pipeline: preblur(0.4) → feTurbulence(0.012, 3 octaves) → blur(4) → displacement(scale=16) → saturate(1.5)
```
- Scale 16 = noticeable refraction
- Good for hero sections, feature highlights

### Applying SVG Filters

**Chrome/Edge only** (via backdrop-filter):
```css
@supports (backdrop-filter: url(#a)) {
  .glass-enhanced {
    backdrop-filter: blur(26px) saturate(1.7) url(#glass-refract);
  }
}
```

**Cross-browser** (via filter on overlay):
```css
.refraction-overlay {
  position: absolute;
  inset: 0;
  filter: url(#glass-refract);
  pointer-events: none;
}
```

> **Warning**: Do NOT combine `filter: url(#svg)` with `mix-blend-mode: screen` on elements using `feTurbulence`. This causes visible colored artifacts (the "corruption" bug). Use `soft-light` or `overlay` blend modes instead, or avoid blend modes on SVG-filtered elements entirely.

## Customization

### Adjusting Opacity
Edit the background gradient alpha values in `.glass`:
```css
/* More transparent */
background: ..., linear-gradient(135deg, rgba(18,22,35,0.30), rgba(12,16,28,0.25));

/* More opaque */
background: ..., linear-gradient(135deg, rgba(18,22,35,0.65), rgba(12,16,28,0.60));
```

### Adjusting Blur
```css
backdrop-filter: blur(16px) ...;  /* lighter frosting */
backdrop-filter: blur(36px) ...;  /* heavier frosting */
```

### Adjusting Prismatic Intensity
Edit the `::after` opacity:
```css
.glass::after { opacity: 0.5; }  /* subtle */
.glass::after { opacity: 1.0; }  /* vivid */
```

### Adjusting Specular Brightness
Edit the `::before` gradient white values:
```css
/* Bright specular */
rgba(255,255,255,0.12)  /* glow */
rgba(255,255,255,0.70)  /* edge line */

/* Dim specular */
rgba(255,255,255,0.04)  /* glow */
rgba(255,255,255,0.30)  /* edge line */
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| backdrop-filter: blur() | 76+ | 104+ | 9.1+ | 17+ |
| backdrop-filter: url(#svg) | Yes | No | No | Yes |
| filter: url(#svg) | Yes | Yes | Yes | Yes |
| CSS animations | Yes | Yes | Yes | Yes |

The system works in all modern browsers. SVG refraction filters via `backdrop-filter` are Chrome/Edge only; the CSS-only layers (specular, prismatic, shimmer) work everywhere.

## Performance

- **Mobile**: Reduce blur to 12-16px and disable shimmer animation
- **Many elements**: Limit `.glass` usage to 2-3 elements (navbar, footer). Use `.glass-card` for cards (lighter) and `.glass-pill` for tags (minimal)
- **will-change**: Only add during hover/active, never permanently
- **contain: paint**: Add to card containers to isolate repaints

## Files

- `src/app/globals.css` — Glass classes (lines 157+)
- `src/app/components/PortfolioHome.tsx` — SVG filter definitions (GlassFilters component)
- `docs/liquid-glass/README.md` — This file
- `docs/liquid-glass/REFERENCE.md` — Full SVG filter technical reference
