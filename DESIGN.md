# Design System Document: YARKVING

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Park"**

This design system transcends the typical "fitness tracker" aesthetic by moving away from aggressive, high-energy visuals toward a philosophy of **Organic Editorialism**. We are not building a dashboard; we are curating a digital landscape. 

To achieve the "Ultra-minimalist" yet "Professional" vibe for both Thai elderly and youth, the system breaks the traditional rigid grid. We utilize **intentional asymmetry**, expansive **white space (the "Cream" breathing room)**, and **overlapping 3D topographic elements** that break out of their containers. The goal is to evoke the feeling of a morning run: calm, effortless, and invigorating.

---

## 2. Colors & Surface Philosophy
The palette is rooted in nature, using the Sage Green and Cream to create a high-end, tactile feel reminiscent of premium stationery or park signage.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts or subtle tonal transitions. 
*   *Implementation:* A `surface-container-low` section sitting on a `background` surface is the only way to define a layout block.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-weight paper.
*   **Base:** `surface` (#fefae7 - Cream)
*   **Sectioning:** `surface-container-low` (#f8f4e1)
*   **Emphasis:** `surface-container-high` (#ece8d6) for interactive elements.

### The "Glass & Gradient" Rule
To avoid a flat, "template" look:
*   **Floating Elements:** Use `surface-container-lowest` (#ffffff) with a 60% opacity and a `24px` backdrop-blur to create a "Frosted Cream" effect for navigation bars or floating action buttons.
*   **Signature Textures:** Use a subtle linear gradient (Top-Left to Bottom-Right) from `primary` (#466649) to `primary-container` (#85a787) for hero CTAs to provide depth and "soul."

---

## 3. Typography: The Editorial Voice
We utilize a dual-font strategy to ensure accessibility for the elderly while maintaining a contemporary edge for youth.

*   **Display & Headlines (Plus Jakarta Sans):** A high-character, modern sans-serif. Use `display-lg` (3.5rem) for hero moments to create an "Editorial" impact. For Thai characters, ensure line-height is increased to 1.6x to prevent glyph clipping.
*   **Body & Titles (Be Vietnam Pro):** Chosen for its exceptional legibility at large scales.
*   **Accessibility Note:** The "Standard" body size is `body-lg` (1rem / 16px). For the "Elderly Mode," scale all `body` tokens up by 1.25x while maintaining the same weight.

| Role | Token | Size | Weight |
| :--- | :--- | :--- | :--- |
| **Hero Title** | `display-md` | 2.75rem | 700 (Bold) |
| **Track Name** | `headline-sm` | 1.5rem | 600 (SemiBold) |
| **Navigation** | `title-md` | 1.125rem | 500 (Medium) |
| **Body Text** | `body-lg` | 1rem | 400 (Regular) |

---

## 4. Elevation & Depth
In this system, depth is "felt" rather than "seen."

### Tonal Layering
Depth is achieved by stacking surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift without the "dirtiness" of heavy shadows.

### Ambient Shadows
When a "floating" effect is required (e.g., a "Popular Now" badge):
*   **Shadow Color:** Use a tinted version of the surface color: `rgba(29, 28, 17, 0.06)`. 
*   **Properties:** `0px 12px 32px`. This mimics natural, ambient park light.

### The "Ghost Border"
If a border is required for accessibility (e.g., input fields), use the `outline-variant` (#c2c8bf) at **20% opacity**. Never use 100% opaque borders.

---

## 5. Components

### 3D Topographic Elements
These are the "Signature" of this design system. Map elements should not be flat. Use 3D renders of tracks with soft Sage Green shadows. Allow the "peaks" of the topography to overlap the containers above them to break the "boxed-in" feel.

### Buttons: The "Pebble" Style
*   **Primary:** Background `primary` (#466649), text `on-primary` (#ffffff). Shape: `xl` (1.5rem) for a friendly, soft feel.
*   **Secondary:** Background `secondary-container` (#d4e5ca), text `on-secondary-container`. 
*   **Padding:** Massive horizontal padding (2rem) to ensure a high-end, non-cramped look.

### "Popular Now" Badges
*   **Visual:** `tertiary-container` (#e58800) background with `on-tertiary-container` text. 
*   **Styling:** Use `full` roundedness and a subtle pulse animation to signify "Vibrancy" without being intrusive.

### Cards & Lists
*   **Constraint:** **Strictly forbid divider lines.** 
*   **Separation:** Use `32px` of vertical white space or a shift from `surface` to `surface-container-lowest`. 
*   **Interactions:** On hover, a card should not move up; instead, it should transition its background color slightly toward `surface-bright`.

### Inputs (Elderly Friendly)
*   **Height:** Minimum 64px.
*   **Label:** Always visible (never floating) in `label-md`, placed 8px above the field.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place a 3D map element slightly off-center to create a dynamic, modern feel.
*   **Prioritize Thai Legibility:** Use wider letter-spacing for Thai headlines to ensure "ease of use" for the elderly.
*   **Embrace the Cream:** Use the `background` color generously. Negative space is a luxury feature.

### Don’t:
*   **Don't use Black (#000000):** Use `on-surface` (#1d1c11) for text. Pure black is too harsh for a "serene" park-like aesthetic.
*   **Don't use 90-degree corners:** Use the `roundedness-lg` (1rem) or `xl` (1.5rem) scale for everything. Sharp corners are aggressive.
*   **Don't use standard icons:** Use "Minimalist" stroke icons with a 1.5pt weight and rounded caps to match the Sage Green's softness.

---

## 7. Raw Tokens extracted from Project Theme

### Typography
- **Headline Font:** Plus Jakarta Sans
- **Body Font:** Be Vietnam Pro
- **Label Font:** Be Vietnam Pro

### Extracted Core Colors (Light Mode)
- **Primary:** `#466649`
- **Primary Container:** `#85a787`
- **Secondary:** `#53634d`
- **Secondary Container:** `#d4e5ca`
- **Tertiary:** `#8b5000`
- **Tertiary Container:** `#e58800`
- **Background / Surface:** `#fefae7`
- **Surface Container Low:** `#f8f4e1`
- **Surface Container High:** `#ece8d6`
- **On Surface (Text):** `#1d1c11`
- **Custom App Color:** `#86A789`
