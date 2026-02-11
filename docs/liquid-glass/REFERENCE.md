# Liquid Glass — SVG Filter Technical Reference

Complete reference for SVG filter primitives used in liquid glass effects, based on Apple's WWDC 2025 design + kube.io refraction research.

---

## SVG Filter Pipeline

A complete liquid glass filter chains these primitives in order:

```
Source → feGaussianBlur (pre-blur)
       → feTurbulence (noise generation)
       → feGaussianBlur (smooth noise)
       → feDisplacementMap (refraction)
       → feColorMatrix (saturation boost)
       → feSpecularLighting (optional highlights)
       → feBlend (composite)
```

---

## Filter Primitives

### feTurbulence — Noise Generation

Generates Perlin noise for organic distortion patterns.

```xml
<feTurbulence
  type="fractalNoise"
  baseFrequency="0.015 0.012"
  numOctaves="2"
  seed="42"
  result="noise"
/>
```

| Attribute | Values | Effect |
|-----------|--------|--------|
| type | `fractalNoise` / `turbulence` | fractalNoise = smooth cloudy; turbulence = sharp swirly |
| baseFrequency | 0.001 – 0.1 | Lower = larger patterns; higher = finer grain |
| numOctaves | 1 – 5 | More = more detail (diminishing returns > 5) |
| seed | any integer | Different random patterns |

**Glass ranges**: baseFrequency 0.01–0.03, numOctaves 2–3

### feGaussianBlur — Smoothing

Softens noise for gradual glass distortion, or creates frosted blur.

```xml
<feGaussianBlur in="noise" stdDeviation="3" result="smooth" />
```

| stdDeviation | Use Case |
|-------------|----------|
| 0.2 – 1.0 | Pre-blur source before displacement |
| 2 – 5 | Smooth displacement maps |
| 8 – 15 | Frosted glass background blur |

### feDisplacementMap — Refraction

The core refraction primitive. Shifts pixels based on a displacement map's color channels.

```xml
<feDisplacementMap
  in="SourceGraphic"
  in2="smooth"
  scale="8"
  xChannelSelector="R"
  yChannelSelector="G"
/>
```

**Formula**: `P'(x,y) ← P(x + scale × (R(x,y) - 0.5), y + scale × (G(x,y) - 0.5))`

| Attribute | Purpose |
|-----------|---------|
| in | Source image to distort |
| in2 | Displacement map (noise or image) |
| scale | Displacement strength in pixels |
| xChannelSelector | Which channel controls X axis (R/G/B/A) |
| yChannelSelector | Which channel controls Y axis (R/G/B/A) |

**Scale values**:
| Scale | Visual Effect |
|-------|--------------|
| 5–10 | Subtle (text-safe glass) |
| 10–20 | Moderate (UI glass) |
| 20–50 | Strong (dramatic) |
| 50+ | Extreme (artistic) |

**Channel encoding**: Value 127 = no displacement, 0 = -scale/2, 255 = +scale/2

### feColorMatrix — Color Enhancement

Adjusts saturation, tinting, and transparency.

```xml
<feColorMatrix in="displaced" type="saturate" values="1.3" />
```

| Type | Values | Effect |
|------|--------|--------|
| saturate | 0–2+ | 0 = grayscale, 1 = normal, 1.3 = boosted |
| hueRotate | 0–360 | Rotates color wheel |
| luminanceToAlpha | (none) | Bright→opaque, dark→transparent |
| matrix | 20 values | Full 5×4 color transform |

**Glass use**: `type="saturate" values="1.3"` — compensates for saturation loss from blur

### feSpecularLighting — Surface Highlights

Creates 3D specular reflections from a height map.

```xml
<feSpecularLighting
  in="smooth"
  surfaceScale="4"
  specularConstant="0.75"
  specularExponent="25"
  lighting-color="white"
  result="specular"
>
  <feDistantLight azimuth="225" elevation="50" />
</feSpecularLighting>
```

| Attribute | Range | Glass Values |
|-----------|-------|-------------|
| surfaceScale | 0–100 | 2–5 |
| specularConstant | 0–1+ | 0.5–1.0 |
| specularExponent | 1–128 | 15–30 |
| lighting-color | CSS color | white / rgba(255,255,255,0.8) |

**Light sources**:
- `feDistantLight`: azimuth (0–360°), elevation (0–90°) — directional
- `fePointLight`: x, y, z — positional
- `feSpotLight`: x, y, z + pointsAt + cone angle — focused

### feComposite — Layer Combination

Combines two images using compositing operators.

```xml
<feComposite in="specular" in2="SourceAlpha" operator="in" result="masked" />
```

| Operator | Effect |
|----------|--------|
| over | Standard layering (in on top of in2) |
| in | Show in only where in2 is opaque (masking) |
| out | Show in only where in2 is transparent |
| arithmetic | k1×in×in2 + k2×in + k3×in2 + k4 |

**Glass use**: `operator="in"` to clip specular to element shape; `arithmetic k1=0 k2=1 k3=1 k4=0` for additive blending

### feBlend — Blend Modes

```xml
<feBlend in="saturated" in2="specular_masked" mode="screen" />
```

| Mode | Glass Use |
|------|-----------|
| screen | Specular highlights (brightens) |
| soft-light | Subtle tints (gentle) |
| overlay | Texture overlays |
| multiply | Shadows (darkens) |
| normal | Standard compositing |

---

## Complete Filter Examples

### Minimal Glass Refraction
```xml
<filter id="glass-refract" colorInterpolationFilters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="preblur" />
  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="42" result="noise" />
  <feGaussianBlur in="noise" stdDeviation="3" result="smooth" />
  <feDisplacementMap in="preblur" in2="smooth" scale="8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
  <feColorMatrix in="displaced" type="saturate" values="1.3" />
</filter>
```

### Full Kube.io Pipeline (with specular)
```xml
<filter id="liquid-glass-full" colorInterpolationFilters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" result="blurred_source" />
  <feImage href="displacement-map.png" result="displacement_map" />
  <feDisplacementMap in="blurred_source" in2="displacement_map" scale="50" xChannelSelector="R" yChannelSelector="G" result="displaced" />
  <feColorMatrix in="displaced" type="saturate" values="6" result="displaced_saturated" />
  <feImage href="specular-map.png" result="specular_layer" />
  <feComposite in="displaced_saturated" in2="specular_layer" operator="in" result="specular_saturated" />
  <feComponentTransfer in="specular_layer" result="specular_faded">
    <feFuncA type="linear" slope="0.2" />
  </feComponentTransfer>
  <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation" />
  <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
</filter>
```

### Chromatic Aberration
```xml
<filter id="chromatic-glass" colorInterpolationFilters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blurred" />
  <feTurbulence baseFrequency="0.02" result="displacement" />
  <!-- Red channel: least refraction -->
  <feDisplacementMap in="blurred" in2="displacement" scale="10" xChannelSelector="R" yChannelSelector="G" result="red_d" />
  <feColorMatrix in="red_d" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
  <!-- Green channel: medium refraction -->
  <feDisplacementMap in="blurred" in2="displacement" scale="12" xChannelSelector="R" yChannelSelector="G" result="green_d" />
  <feColorMatrix in="green_d" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
  <!-- Blue channel: most refraction -->
  <feDisplacementMap in="blurred" in2="displacement" scale="14" xChannelSelector="R" yChannelSelector="G" result="blue_d" />
  <feColorMatrix in="blue_d" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
  <!-- Combine with screen mode -->
  <feBlend in="green" in2="red" mode="screen" result="rg" />
  <feBlend in="blue" in2="rg" mode="screen" />
</filter>
```

---

## Displacement Map Generation

### Encoding Format
- **Red channel**: X-axis displacement (127 = neutral)
- **Green channel**: Y-axis displacement (127 = neutral)
- **Blue channel**: Unused (set to 127)
- **Alpha channel**: Fully opaque (255)

### JavaScript Generator (Radial Lens)
```javascript
function createDisplacementMap(width, height, strength = 0.3) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const data = ctx.createImageData(width, height);
  const cx = width / 2, cy = height / 2;
  const maxR = Math.min(cx, cy);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxR) {
        const angle = Math.atan2(dy, dx);
        const mag = (1 - dist / maxR) * strength;
        data.data[i]     = 128 + Math.cos(angle) * mag * 127; // R
        data.data[i + 1] = 128 + Math.sin(angle) * mag * 127; // G
        data.data[i + 2] = 128;                                // B
        data.data[i + 3] = 255;                                // A
      } else {
        data.data[i] = data.data[i+1] = data.data[i+2] = 128;
        data.data[i + 3] = 255;
      }
    }
  }
  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL('image/png');
}
```

### Surface Profiles (from Snell's Law)

**Convex Squircle** (Apple's preferred — smooth edges):
```javascript
const convexSquircle = (x) => Math.pow(1 - Math.pow(1 - x, 4), 0.25);
```

**Convex Circle** (sharper edges):
```javascript
const convexCircle = (x) => Math.sqrt(1 - Math.pow(1 - x, 2));
```

**Concave** (bowl shape — diverges light):
```javascript
const concave = (x) => 1 - convexSquircle(x);
```

---

## CSS Integration

### Applying via backdrop-filter (Chrome/Edge only)
```css
.glass {
  backdrop-filter: blur(26px) saturate(1.7) url(#glass-refract);
}
```

### Applying via filter (cross-browser)
```css
.overlay {
  filter: url(#glass-refract);
}
```

### Progressive Enhancement
```css
.glass {
  -webkit-backdrop-filter: blur(26px) saturate(1.7);
  backdrop-filter: blur(26px) saturate(1.7);
}

@supports (backdrop-filter: url(#a)) {
  .glass-enhanced {
    backdrop-filter: blur(26px) saturate(1.7) url(#glass-refract);
  }
}
```

---

## Known Issues

| Issue | Cause | Solution |
|-------|-------|---------|
| Rainbow artifacts | `mix-blend-mode: screen` + `feTurbulence` | Use `soft-light` or avoid blend modes |
| Flickering on scroll | `position: sticky` + `backdrop-filter` | Use `position: fixed` instead |
| Jagged rounded corners | `backdrop-filter` aliasing | Add `border: 0.5px solid rgba(...)` |
| No effect visible | Background fully opaque | Lower background alpha to 0.1–0.3 |
| External SVG fails | Chrome CORS / reference bug | Always use inline SVG |

---

## Sources

- [kube.io — Liquid Glass in the Browser](https://kube.io/blog/liquid-glass-css-svg/)
- [Apple WWDC 2025 — Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)
- [CSS-Tricks — Getting Clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)
- [LogRocket — How to create Liquid Glass effects with CSS and SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- [Smashing Magazine — Deep Dive Into SVG Displacement Filtering](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)
- [MDN — feDisplacementMap](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)
- [MDN — feSpecularLighting](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting)
- [FreeFrontEnd — 16 CSS Liquid Glass Effects](https://freefrontend.com/css-liquid-glass/)
