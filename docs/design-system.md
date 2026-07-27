# cebulla.dev — Visual Design System

This document describes the visual and interaction language of the current cebulla.dev landing page so the same design can be applied consistently to the Notebook, Lab, article, project, About, and Privacy pages.

---

## 1. Core concept

cebulla.dev should feel like an active one-person workshop.

It is not a portfolio, product landing page, SaaS site, or polished agency presentation. The visual language should suggest a place where ideas are written down, tested, developed, revised, and sometimes abandoned.

The design balances two qualities:

- **Editorial clarity** — strong hierarchy, readable typography, calm spacing, clear structure
- **Workshop character** — handwritten notes, tape labels, rough line art, mint doodles, and visible signs of experimentation

The overall balance should remain roughly:

- **75% calm, structured, and readable**
- **25% expressive, imperfect, and handmade**

The design should feel intentional, not chaotic.

---

## 2. Visual tone

The interface should feel:

- thoughtful
- personal
- exploratory
- slightly punk or zine-inspired
- warm rather than sterile
- technical without looking corporate
- unfinished in spirit, but not unfinished in execution

Avoid:

- glossy product marketing
- generic portfolio layouts
- heavy grunge
- random rotation or fake messiness
- excessive decoration
- dashboard-like density
- overly polished SaaS patterns

The goal is a calm workshop with visible personality.

---

## 3. Color system

### Background

Use a very dark warm charcoal rather than pure black.

The surface may include a subtle paper, chalkboard, or grain texture. The texture should be visible enough to prevent the background from feeling flat, but never strong enough to reduce text readability.

Recommended roles:

- **Primary background:** warm charcoal
- **Elevated surfaces:** slightly lighter or more transparent charcoal
- **Borders/dividers:** muted warm grey with low contrast
- **Primary text:** warm cream
- **Secondary text:** muted cream-grey
- **Accent:** warm mint green

### Mint accent

Mint is the only strong accent color.

Use it for:

- the highlighted word `spark`
- small doodles
- the logo spark
- card headings
- eyebrow labels
- metadata accents
- status text
- link emphasis
- small bullet markers
- hover and focus details

Do not use mint everywhere. It should remain a controlled visual signal.

### Contrast hierarchy

- **Primary headings:** strong warm cream or mint
- **Body copy:** readable muted cream
- **Metadata:** quieter grey
- **Handwritten annotations:** softer cream, but still legible
- **Decorative marks:** lower contrast unless they carry meaning

Always judge contrast against the textured background, not only the flat base color.

---

## 4. Typography

The site uses three typographic roles.

### 4.1 Editorial serif

Use for:

- main hero headline
- large page titles
- section headings on overview pages
- CTA card headings
- article titles
- long-form editorial emphasis

Characteristics:

- strong contrast
- expressive letterforms
- large scale
- tight but readable line-height
- warm, literary tone

The main headline may be tightly set, but ascenders and descenders must never collide across lines.

### 4.2 Monospace

Use for:

- body copy
- metadata
- navigation
- card descriptions
- bullet lists
- status labels
- CTA links
- dates
- technical details

The monospace style helps connect the Notebook and Lab to a developer workshop without turning the design into a terminal aesthetic.

It should remain readable and not too condensed.

### 4.3 Handwritten font

Use for:

- personal quote
- relationship annotations between Notebook and Lab
- tape labels
- small handwritten notes
- selected editorial annotations

Use handwritten text sparingly.

There should be two clear handwritten roles:

- **Marker-like handwriting** for tape labels
- **Pen/pencil handwriting** for quotes and annotations

Do not introduce multiple unrelated handwritten styles.

---

## 5. Spacing and layout principles

The layout should feel generous but not wasteful.

Spacing should be judged by relationships rather than fixed values.

### General rules

- large headings need breathing room before secondary content
- portrait and quote should behave as one grouped component
- section transitions should feel intentional
- equal components must use equal internal spacing
- large empty gaps should only exist when they support hierarchy
- repeated content should use a consistent rhythm

The homepage uses a centered content container aligned to a clear grid.

Major elements should share the same left and right edges:

- hero content
- Notebook/Lab cards
- divider
- Latest Update bar
- CTA cards
- footer content

---

## 6. Header and navigation

The header is visually light and quiet.

### Logo

The logo consists of:

- a small mint spark doodle
- `cebulla.dev` in cream monospace or typewriter-like text

The logo links to the homepage.

Do not:

- place the logo on tape
- underline it permanently
- surround it with a card or badge

### Navigation

Primary links:

- Notebook
- Lab
- About

Use only the name **Lab**.

Do not use:

- Lab / Bench
- Bench
- On the bench

Navigation should remain simple and readable.

The hand-drawn underline motif may be used for hover or active states, but the navigation should not use tape backgrounds.

---

## 7. Hero section

### Main headline

Current headline:

> Following curiosity  
> past the first spark

The word `spark` is:

- mint
- italic or more expressive
- underlined with a hand-drawn mint stroke

A small mint spark doodle sits just beyond the word so both read as one visual idea.

The doodle should feel connected to `spark`, not like a separate floating decoration.

### Headline composition

- two lines on desktop
- large editorial serif
- tight line-height
- no letter collisions
- clear visual dominance
- enough room below for the portrait-and-quote block

The headline should feel complete before the quote begins.

### Portrait and quote

The portrait and quote form one authored statement.

Current quote:

> I write, build, and test ideas in public.  
> Some stay small. Some go nowhere.  
> Either way, I learn as I go.

Composition:

- abstract single-color line-art portrait
- no filled background
- no shading
- no multiple colors
- portrait aligned closely with the quote
- handwritten quote
- mint quotation mark placed near the first line
- no signature beneath the quote

The quote block should feel personal but secondary to the headline.

---

## 8. Notebook and Lab introduction cards

The homepage introduces the two main areas with equal visual weight.

### Shared structure

Each card uses:

1. tape label
2. primary statement
3. supporting description
4. divider
5. concise bullet list

Both cards must remain equal in:

- width
- height
- border strength
- padding
- text density
- visual prominence

### Tape labels

Use tape only for major content labels such as:

- NOTEBOOK
- LAB

Tape characteristics:

- warm cream
- subtle paper texture
- irregular torn edges
- marker-style uppercase lettering
- slight handmade imperfection

Do not overuse tape elsewhere.

### Notebook card

Label:

`NOTEBOOK`

Heading:

`Thinking out loud.`

Description:

`Notes, reflections, half-formed ideas, patterns, and questions.`

Supporting points:

- Capture what catches my attention
- Develop thoughts through writing
- Keep ideas that may never become projects

### Lab card

Label:

`LAB`

Heading:

`Building in public.`

Description:

`Experiments, prototypes, and tools at different stages of development.`

Supporting points:

- Test ideas in practice
- Learn through building
- Keep what is useful, including failed attempts

---

## 9. Notebook ↔ Lab relationship

The relationship between Notebook and Lab is cyclical, not linear.

Copy:

> Sometimes a note becomes an experiment.

> An experiment can return as a new thought.

### Desktop

Use:

- two loose, curved, hand-drawn arrows
- one arrow in each direction
- annotations placed close to the matching arrow
- enough central space to understand the loop

The connector should not look like a formal process diagram.

### Mobile

The desktop arrows should not simply be rotated vertically.

On mobile:

- keep the relationship block between Notebook and Lab
- hide the large arrows
- preserve both sentences
- arrange them as one compact transition block
- keep handwritten typography
- use intentional line wrapping
- keep the block clearly shorter than either card
- do not introduce a new illustration or new design language

A tiny existing decorative mark may remain, but no new large connector should be added.

---

## 10. Latest Update component

The Latest Update is the only specific content item highlighted on the homepage.

### Structure

- full-width card
- entire card is clickable
- small accent doodle
- compact metadata line
- title
- one-line summary
- arrow on the far right

Example metadata:

`LATEST UPDATE · JUL 19, 2026 · NOTEBOOK`

### Visual behavior

- restrained border
- slightly elevated surface
- enough internal breathing room
- title and summary receive more emphasis than metadata
- arrow aligns with the content block
- subtle hover state
- visible keyboard focus state
- no nested clickable elements

The bar should answer:

- what changed
- where it belongs
- where to click

---

## 11. Lower destination cards

The homepage ends with two equal destination cards:

- Notebook
- Lab

These cards should feel like calm doors into the site, not marketing cards.

### Shared structure

1. mint uppercase monospace eyebrow
2. editorial serif heading
3. concise description
4. monospace CTA link

Do not use tape labels here.

Do not use decorative underlines beneath the headings.

### Notebook destination card

Eyebrow:

`NOTEBOOK`

Heading:

`More from the Notebook`

Description:

`Thoughts, reflections, and questions that may—or may not—turn into something buildable.`

CTA:

`Browse the Notebook →`

### Lab destination card

Eyebrow:

`LAB`

Heading:

`Explore the Lab`

Description:

`Experiments, prototypes, and projects at different stages of development.`

CTA:

`See what’s brewing in the Lab →`

### Interaction

- whole card is clickable
- border brightens subtly on hover
- arrow shifts slightly
- no large filled buttons
- both cards remain equal in height
- internal elements align to the same baselines
- CTA links remain anchored consistently near the bottom

---

## 12. Cards, borders, and surfaces

Cards should feel lightly drawn rather than heavily boxed.

Use:

- thin warm-grey borders
- large but restrained corner radius
- almost-transparent dark surfaces
- no heavy shadows
- subtle hover brightening

Avoid:

- glassmorphism
- glowing neon borders
- large drop shadows
- strong gradients
- filled marketing panels

Dividers should be visible but quiet.

---

## 13. Doodles and handmade elements

Hand-drawn elements are used as punctuation.

Approved roles:

- mint spark by the logo
- mint spark near the hero word
- hero underline
- tape labels
- portrait line art
- handwritten quote
- Notebook/Lab arrows and annotations
- small Latest Update accent

Rules:

- never add decoration only to fill empty space
- do not rotate every element
- do not use multiple doodles in the same small area
- keep line weights consistent
- decorative elements must remain secondary to content
- hide purely decorative SVGs from assistive technology

The homepage introduces the visual character. Inner pages should use fewer doodles.

---

## 14. Responsive behavior

### Desktop

- large two-line hero headline
- portrait and quote shown as one horizontal composition
- Notebook and Lab displayed side by side
- relationship connector centered between them
- Latest Update full width
- Notebook and Lab destination cards side by side

### Mobile

Recommended order:

1. Header
2. Hero headline
3. Portrait and quote
4. Notebook card
5. Compact relationship block
6. Lab card
7. Latest Update
8. Notebook destination card
9. Lab destination card
10. Footer

Mobile rules:

- stack content vertically
- avoid horizontal scrolling
- preserve readable line wrapping
- reduce portrait scale
- keep portrait and quote grouped
- never allow hero letterforms to overlap
- hide large desktop arrows
- do not rely on hover
- maintain generous touch targets
- preserve the same color, type, and surface system

---

## 15. Motion

Motion should be restrained and semantic.

Approved motion:

- small CTA arrow shift
- subtle border brightening
- underline reveal
- gentle decorative drawing animation
- small hover transitions

Avoid:

- continuous animation
- parallax
- large movement
- bouncing
- decorative motion without meaning

Respect `prefers-reduced-motion`.

Under reduced motion:

- remove drawing animations
- use instant or simple opacity changes
- preserve all state communication

---

## 16. Accessibility

All pages should include:

- semantic heading order
- semantic links and buttons
- visible keyboard focus
- sufficient contrast
- `aria-current="page"` for active navigation
- decorative SVGs hidden from assistive technology
- no meaning communicated by color alone
- readable link text out of context
- reduced-motion support
- touch targets suitable for mobile

Clickable cards should use a single semantic link structure rather than nested links.

---

## 17. Applying the design to other pages

The same design language should continue across all remaining pages, but with lower decorative intensity than the homepage.

### Notebook overview

Tone:

- reflective
- editorial
- spacious
- text-led

Recommended structure:

1. page intro
2. current highlight
3. latest writing
4. full collection
5. footer

Use:

- editorial titles
- text-only content
- dates and tags in monospace
- occasional handwritten annotation
- no thumbnails

### Notebook article

Use:

- strong editorial title
- readable long-form width
- quiet metadata
- serif headings
- monospace body or supporting metadata according to the existing type system
- optional `Where I stand now`
- optional `Further reflection`
- related Lab project when relevant

The article should feel calm and readable. Doodles should be rare.

### Lab overview

Tone:

- operational
- experimental
- slightly denser than Notebook
- status-aware

Recommended structure:

1. page intro
2. current highlight
3. latest work
4. full project collection
5. footer

Use:

- status labels
- update dates
- concise technical summaries
- restrained monospace emphasis
- the same border and card system as Notebook

### Lab project page

Recommended structure:

1. project title and status
2. overview
3. current snapshot
4. reverse-chronological development updates
5. stable information
6. related Notebook note
7. reason for pause or stop when applicable

Possible lifecycle states:

- Exploring
- Active
- Paused
- Stable
- Stopped

Do not rely on color alone for status.

### About page

The About page should describe the workshop rather than present a résumé.

Focus on:

- why the site exists
- how Notebook and Lab relate
- the role of curiosity, writing, building, and learning
- the one-person workshop character

Avoid:

- portfolio language
- client lists
- professional biography emphasis
- large contact CTA

### Privacy page

The Privacy page should be the simplest page.

Use:

- same header and footer
- same background and typography
- narrow readable content width
- minimal decoration
- clear legal hierarchy
- no unnecessary cards

---

## 18. Content principles

The copy should sound:

- direct
- thoughtful
- honest
- personal
- curious
- non-promotional

Avoid:

- corporate mission language
- exaggerated claims
- productivity clichés
- startup vocabulary
- forced cleverness
- “thought leadership” language

The site should openly allow for:

- small ideas
- unfinished ideas
- failed experiments
- changed opinions
- abandoned work
- learning without a polished outcome

---

## 19. Design token intent

When implementing or extending the system, prefer reusable tokens for:

- background colors
- cream text levels
- mint accent
- border colors
- radius values
- content widths
- vertical rhythm
- typography roles
- card padding
- focus styles
- motion duration
- reduced-motion behavior

Do not solve page-specific issues with brittle one-off transforms when a shared token or responsive layout rule can solve them.

---

## 20. Final design rule

Every design decision should support at least one of these goals:

- make the content easier to understand
- make the relationship between thinking and building clearer
- reinforce the one-person workshop character
- improve readability
- preserve the site’s calm but expressive tone

If a decorative element does none of these, remove it.
