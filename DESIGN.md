# Design System Document: YARKVING (The Digital Park)

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Park"**

YARKVING's design philosophy is centered around **Organic Editorialism**. Moving away from high-intensity fitness visuals, we create a digital landscape that is calm, professional, and accessible. The interface should evoke the feeling of a morning run: expansive, effortless, and invigorating.

---

## 2. Visual Fundamentals

### 2.1 Color Palette (Actual Tokens)
The palette is rooted in nature, using Sage Green and Cream to create a tactile, premium feel.

| Token | Hex | Role |
| :--- | :--- | :--- |
| `background` | `#fefae7` | Primary page background (Cream) |
| `surface` | `#fefae7` | Base surface for cards and UI elements |
| `primary` | `#466649` | Headlines, primary buttons (Sage Green) |
| `primary-container`| `#85a787` | Hover states, subtle highlights |
| `secondary` | `#53634d` | Sub-headlines, secondary emphasis |
| `tertiary-container`| `#e58800` | Warning, pulse badges (Amber) |
| `on-surface` | `#1d1c11` | Primary text (Deep Charcoal - Never #000) |
| `outline-variant` | `#c2c8bf` | Subtle borders, dividers (at 20% opacity) |

### 2.2 Surface Philosophy: The "No-Line" Rule
*   **Boundaries**: Strictly avoid 1px solid borders for sectioning. Use background shifts (e.g., `surface` vs `surface-container-low`) or spacing to define layout blocks.
*   **Frosted Glass**: For floating elements (Nav, Popups, Cookie Banner), use `surface-container-lowest/80` with `backdrop-blur-xl` and a `shadow-ambient`.

---

## 3. Typography & Accessibility

Dual-font strategy Optimized for Thai and Latin characters.

*   **Display/Headlines**: `IBM Plex Sans Thai` (700 Bold). 
    *   Line-height: `leading-[1.1]` for headlines.
    *   Thai Letter-spacing: Wide for clarity.
*   **Body/UI**: `IBM Plex Sans Thai` (400 Regular / 500 Medium).
*   **Mono**: `Inter` (used for distance, ratings, and credits).

### Typography Scale
| Role | Size | Weight | Line-Height |
| :--- | :--- | :--- | :--- |
| **Hero Title** | `6xl` / `7xl` | 700 | 1.1 |
| **Track Name** | `2xl` | 700 | Normal |
| **Body Text** | `lg` / `xl` | 400 | Relaxed |
| **Labels** | `xs` / `sm` | 600 | Tight |

---

## 4. Layout & Components

### 4.1 Grid & Spacing
- **Container**: Max width `7xl` (1280px).
- **Section Padding**: Vertical padding `py-24` (96px) for major sections.
- **Grids**: Use `gap-12` (48px) for card grids to maintain "breathing room."

### 4.2 Buttons: The "Pebble" Style
- **Shape**: `rounded-[2rem]` or `rounded-full` (never sharp corners).
- **Height**: Standard `h-14`, Hero `h-20`.
- **Primary**: `bg-primary` with `text-white`. Soft shadow `shadow-lg shadow-primary/10`.
- **Interaction**: Transition `active:scale-[0.98]` and `hover:scale-[1.01]`.

### 4.3 Card Design
- **Elevation**: Use `shadow-ambient` (Soft bloom shadow) instead of heavy borders.
- **Image Handling**: `rounded-xl` with `aspect-[4/3]`. Use `object-cover`.
- **Hover**: Subtle vertical translation (`group-hover:-translate-y-1`) and image zoom (`group-hover:scale-105`).

### 4.4 Global Overlays
- **Cookie Consent / Popups**: Position bottom-right. Use 80% opacity frosted background with `24px` blur to ensure readability over maps.

---

## 5. UI/UX Standards Checklist

1.  **Strictly No Pure Black**: Use `on-surface` (#1d1c11) for all text and icons.
2.  **Soft Transitions**: All interactive elements MUST have a `duration-300` or `duration-500` transition.
3.  **Image Attribution**: All fetched images MUST display a `© imageCredit` overlay in the bottom-right corner.
4.  **Empty States**: Always provide a polite message (e.g., "ยังไม่มีรีวิว...") instead of leaving sections blank.
5.  **Thai Accessibility**: Ensure `leading-relaxed` for Thai paragraph text to prevent overlapping characters.

---

## 6. Implementation Notes
- **Utility Layer**: Use `clsx` and `tailwind-merge` for component modularity.
- **Icons**: Use `lucide-react` with a stroke width of `1.5` or `2.0` for a professional, clean look.
