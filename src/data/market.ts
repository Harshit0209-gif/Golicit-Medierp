/**
 * SAMPLE MARKET DATA for the hero.
 *
 * Every figure, employer and opening here is invented to make the interface
 * work. None of it is real. Replace `marketSnapshot` and `wireItems` with the
 * openings API; the hero only reads the shapes declared below.
 */

export interface CountrySnapshot {
  /** ISO alpha-2, joins to CountryGeometry.code */
  code: string;
  name: string;
  live: number;
  closingWeek: number;
  topEmployer: string;
}

export interface MarketSnapshot {
  liveOpenings: number;
  closingThisWeek: number;
  sources: number;
  lastUpdateMinutesAgo: number;
  countries: CountrySnapshot[];
  topEmployers: { name: string; short: string }[];
}

export interface WireItem {
  id: string;
  title: string;
  employer: string;
  positions: number;
  countryName: string;
  countryCode: string;
}

/** Fictional employers. */
const employers = [
  'Northgate Health Group',
  'Harbour General Hospital',
  'Meridian Medical Centre',
  'St. Alder University Hospital',
  'Crescent Care Network',
  'Lakeside Children’s Hospital',
  'Summit Regional Health',
  'Riverbend Clinics',
  'Aurora Heart Institute',
  'Coastal Teaching Hospital',
  'Pinecrest Medical Group',
  'Westfield Women’s Hospital',
];

// [code, name, live openings]
const rows: [string, string, number][] = [
  ['US', 'United States', 2480],
  ['GB', 'United Kingdom', 1860],
  ['AU', 'Australia', 1320],
  ['CA', 'Canada', 1050],
  ['DE', 'Germany', 940],
  ['SA', 'Saudi Arabia', 760],
  ['AE', 'United Arab Emirates', 690],
  ['IE', 'Ireland', 520],
  ['NZ', 'New Zealand', 470],
  ['IN', 'India', 410],
  ['NL', 'Netherlands', 360],
  ['SG', 'Singapore', 310],
  ['QA', 'Qatar', 280],
  ['FR', 'France', 250],
  ['CH', 'Switzerland', 230],
  ['SE', 'Sweden', 210],
  ['ZA', 'South Africa', 190],
  ['KW', 'Kuwait', 170],
  ['OM', 'Oman', 150],
  ['NO', 'Norway', 140],
  ['DK', 'Denmark', 130],
  ['MY', 'Malaysia', 120],
  ['JP', 'Japan', 110],
  ['BH', 'Bahrain', 95],
  ['IT', 'Italy', 90],
  ['ES', 'Spain', 85],
  ['BE', 'Belgium', 80],
  ['KE', 'Kenya', 70],
  ['NG', 'Nigeria', 60],
  ['MT', 'Malta', 55],
  ['LU', 'Luxembourg', 35],
  ['MV', 'Maldives', 22],
];

/** Small seeded PRNG (mulberry32) so the sample data is identical on every load. */
function random(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = random(20261112);

const countries: CountrySnapshot[] = rows.map(([code, name, live], i) => ({
  code,
  name,
  live,
  closingWeek: Math.max(2, Math.round(live * (0.07 + rand() * 0.06))),
  topEmployer: employers[(i * 5 + 3) % employers.length],
}));

export const marketSnapshot: MarketSnapshot = {
  liveOpenings: countries.reduce((n, c) => n + c.live, 0),
  closingThisWeek: countries.reduce((n, c) => n + c.closingWeek, 0),
  sources: 48,
  lastUpdateMinutesAgo: 4,
  countries,
  topEmployers: employers.slice(0, 5).map((name) => ({
    name,
    short: name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3),
  })),
};

const roles = [
  'ICU Staff Nurse',
  'Registered Nurse',
  'General Physician',
  'Radiographer',
  'Consultant Cardiologist',
  'Theatre Nurse',
  'Anaesthetist',
  'Emergency Physician',
  'Clinical Pharmacist',
  'Physiotherapist',
  'Midwife',
  'Medical Laboratory Scientist',
  'Paediatric Nurse',
  'Consultant Radiologist',
];

const items: WireItem[] = [];
countries.forEach((c, ci) => {
  const n = Math.max(2, Math.min(7, Math.round(c.live / 420) + 2));
  for (let k = 0; k < n; k++) {
    items.push({
      id: `${c.code.toLowerCase()}-${1000 + ci * 10 + k}`,
      title: roles[Math.floor(rand() * roles.length)],
      employer: employers[Math.floor(rand() * employers.length)],
      positions: 1 + Math.floor(rand() * rand() * 24),
      countryName: c.name,
      countryCode: c.code,
    });
  }
});

// Interleave countries so the worldwide feed does not read country by country.
for (let i = items.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [items[i], items[j]] = [items[j], items[i]];
}

export const wireItems: WireItem[] = items;
