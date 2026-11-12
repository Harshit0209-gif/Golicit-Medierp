# MedRecruit – Landing Page

Public landing page for **MedRecruit, the Medical Recruitment Portal**. Built with React 19, TypeScript, Vite and Lucide icons. Styling is plain CSS with design tokens. There is no CSS framework.

## Scripts

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Structure

```
src/
  data/siteContent.ts        ← ALL copy, figures, links and image references
  styles/tokens.css          ← colours, fonts, radii, shadows, container widths
  styles/global.css          ← reset, utilities, section heading, reveal animation
  hooks/                     ← useReveal (entrance animation), useScrollSpy (active nav link)
  components/
    layout/                  ← Navbar (sticky + mobile menu), Footer
    sections/                ← Hero, StatsBar, About, Solutions, Specialisations,
                               WhyChooseUs, AudienceCards, Testimonials, FinalCta
    ui/                      ← ButtonLink, SectionHeading, Logo, Lines, Reveal
    icons/                   ← NurseCapIcon, social brand icons (not in Lucide)
  assets/images/             ← optimised photography (fingerprinted by Vite)
```

Layout values are authored for a **1440px** canvas, matching the reference design. Breakpoints at 1360, 1180, 1080, 960, 767, 640 and 480px adapt it down to 375px.

## Content to replace before launch

All of these live in `src/data/siteContent.ts`:

| Item | Status |
| --- | --- |
| `stats` (500+, 10,000+, …) | **Sample figures.** Replace with verified numbers. |
| `specialisations[].jobs` | **Sample job counts.** Wire these to live vacancy data. |
| `testimonials` | **Placeholders** (`isPlaceholder: true`). The names and quotes are fictional, and the photos are stock models. Replace them with genuine, consented testimonials. |
| `footer.contact` | **Placeholder** address, phone and email. |
| `footer.social` | Generic network URLs. Replace with the real profiles. |
| `routes` | Login, Register and form CTAs point at on-page sections until those pages exist. |

## Image credits

All photos come from Unsplash or Pexels. Both licences allow free commercial use without attribution. Credits are listed here for reference. Several images were cropped so that third-party hospital signage stays out of frame.

| File | Source |
| --- | --- |
| hero-medical-team.jpg | Pexels #8460371 (Cristian Rojas) |
| about-hospital.jpg | Unsplash photo-1764885517847 (LEDC) |
| institutions-hospital.jpg | Unsplash photo-1626315869436 (Acton Crawford) |
| professional-doctor.jpg | Pexels #6749773 |
| cta-stethoscope.jpg | Unsplash photo-1655313719493 (Etactics Inc) |
| specialisations/cardiology.jpg | Unsplash photo-1688565631550 (César Badilla Miranda) |
| specialisations/neurology.jpg | Unsplash photo-1758691463110 (Vitaly Gariev) |
| specialisations/radiology.jpg | Unsplash photo-1666214280352 (Accuray) |
| specialisations/orthopaedics.jpg | Pexels #7446998 (Gustavo Fring) |
| specialisations/general-medicine.jpg | Pexels #19438563 |
| specialisations/paediatrics.jpg | Unsplash photo-1632053002928 (CDC) |
| specialisations/gynaecology.jpg | Pexels #7089035 (MART Production) |
| specialisations/anaesthesiology.jpg | Unsplash photo-1571772996211 (Artur Tumasjan) |
| avatars/* | Pexels #27298085, #5738735, #32160036, #6762866 · Unsplash photo-1742981365880 |
