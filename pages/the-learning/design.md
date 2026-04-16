# the-learning — Design Spec (Immersive Dark Edition)

> Architecture: chapter component in a single-page presentation. Not a standalone page.
> Token values in design-system/MASTER.md. Refer by name only.
> Chapter accent colors defined in MASTER.md Chapter Accents table.

## Component file
`site/components/chapters/`

## Design approach
Dark glass cards over persistent R3F canvas. Space Grotesk display, DM Sans body, Space Mono labels.
Glass-morphism for all content panels. Chapter accent color drives overline, stats, and progress bar.

## Layout
Left-anchored content panel (max-width 640px for text-heavy) or centered (for Chapter 05).
Padding: clamp(48px,6vw,100px) with paddingTop: 80px for nav clearance.
Cards: glass background, rounded-xl, hover border lifts to accent color.

## Motion
Chapter enter: 0.9s power3.out, y:28→0, blur:10→0, delay 0.05s (via GSAP).
Chapter exit: 0.5s power3.in, y:0→-28, blur:0→6 (triggered by isActive false).
Card hover: 0.25s translateY(-4px) + border-color transition.
