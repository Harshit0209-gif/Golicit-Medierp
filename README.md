# MedRecruit

A multi-page job platform for medical recruitment in India. Doctors, nurses and faculty search hospital posts and apply; hospitals and medical colleges send hiring requirements.

Built with React 19, TypeScript, Vite and React Router 7. Styling is CSS Modules on a small token system, with no CSS framework. Icons come from Lucide.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Deep links such as `/jobs/consultant-radiologist-…` need an SPA fallback when hosted. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already provide one.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Audience switch ("Find a job" or "Hire staff"), directory board of departments, job search, latest openings, how it works, credential checks, testimonials |
| `/jobs` | Search and filters (department, city, job type, experience, sort), all kept in the URL so searches can be shared. Shows active-filter chips, a "show more" button and an empty state |
| `/jobs/:slug` | Job detail with key facts, duties, requirements, benefits, employer profile, an application form and similar posts |
| `/doctors` | Benefits, process, posts by department, profile registration form, FAQ |
| `/hospitals` | Outcomes, services, process, a three-step requirement form (prefilled from the home page), FAQ |
| `/about`, `/contact` | Story and principles; contact form, details and FAQ |
| `*` | 404 page |

## Structure

```
src/
  data/            jobs.ts (generated sample jobs), specialties.ts, institutions.ts, content.ts (copy)
  lib/             format.ts (salary, dates), useForm.ts (validation)
  styles/          fonts.css (self-hosted), tokens.css (design tokens), base.css
  components/
    layout/        SiteHeader, SiteFooter, Layout (scroll + hash handling)
    ui/            Button, Field, Logo, Accordion, PageIntro, SectionHeader, Quotes, Outcomes, icons
    home/          Hero, Directory (the signboard)
    jobs/          JobList (container-query table)
    forms/         ApplyForm, RequirementForm, RegisterForm, ContactForm
  pages/           one file per route; every route except home is code-split
archive/reference-replica/   the earlier pixel replica of the original mock-up
docs/                        case study and screenshots
```

## Design system

| | |
| --- | --- |
| Concept | Hospital wayfinding: a lobby directory board, colour-coded floor tape, signage typography |
| Colour | Theatre green `#0E3B34`, scrub green `#1B6B5F`, signal yellow `#FFC83D`, ceil blue `#9CC6E6`, ward white `#F4F7F6` |
| Route colours | Doctors follow ceil blue, hospitals follow signal yellow |
| Type | Overpass (display and UI, from Highway Gothic) and Atkinson Hyperlegible Next (body, designed for low-vision readers). Both are self-hosted variable fonts |
| Scale | Major third from a 17px body; 8px spacing grid; 96px section rhythm |

All tokens live in `src/styles/tokens.css`.

## Content to replace before launch

Everything below is **sample or placeholder** and is marked in the source:

- **Jobs** (`data/jobs.ts`) are generated from role templates with a seeded random generator, so counts agree across pages. Replace them with the jobs API.
- **Institutions** (`data/institutions.ts`) are fictional.
- **Testimonials** use fictional names and stock photos. **Outcome figures** and **available-specialist counts** are samples.
- **Contact details and social links** are placeholders.
- **Forms** validate in the browser and show a confirmation, but nothing is sent. There is no backend yet.

## Quality checks

These were measured on the production build with Lighthouse 12, mobile preset, served locally:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 97 | 100 | 100 | 100 |
| Jobs | 96 | 100 | 100 | 100 |
| Job detail | 97 | 100 | 100 | 100 |
| Doctors | 95 | 100 | 100 | 100 |
| Hospitals | 92 | 100 | 100 | 100 |
| About | 95 | 100 | 100 | 100 |
| Contact | 97 | 100 | 100 | 100 |

Real hosting (CDN, HTTP/2, compression) will move these numbers.

## Image credits

Photos come from Unsplash and Pexels under their free licences. They are cropped so that no third-party hospital names or logos are visible.

| File | Source |
| --- | --- |
| hospital-team-*.jpg | Pexels #8460371 (Cristian Rojas) |
| doctor-radiology*.jpg | Pexels #5738735 |
| about-hospital*.jpg | Unsplash photo-1764885517847 (LEDC) |
| avatars/anil-mehta.jpg | Pexels #27298085 |
| avatars/priya-nair.jpg | Pexels #32160036 |
| avatars/sameer-khan.jpg | Pexels #6762866 (Usman Yousaf) |
| avatars/rajiv-desai.jpg | Unsplash photo-1742981365880 (Ratul Puri) |

Fonts: Overpass and Atkinson Hyperlegible Next, SIL Open Font License.
