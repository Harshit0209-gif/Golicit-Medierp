/**
 * All landing-page copy lives here.
 *
 * Items marked PLACEHOLDER are illustrative and must be replaced with verified,
 * client-approved information before launch. No figure, client or testimonial
 * on this page is a real claim.
 */

export const brand = {
  name: 'MedRecruit',
  descriptor: 'Healthcare recruitment',
};

/** Destinations. Accounts are not built yet, so Login / Register opens the enquiry form. */
export const links = {
  about: '#about',
  doctors: '#professionals',
  hospitals: '#institutions',
  specialisations: '#specialisations',
  contact: '#enquiry',
  login: '#enquiry',
  services: '#services',
  process: '#process',
};

export const nav = [
  { label: 'About', href: links.about, section: 'about' },
  { label: 'For doctors', href: links.doctors, section: 'professionals' },
  { label: 'For hospitals', href: links.hospitals, section: 'institutions' },
  { label: 'Specialisations', href: links.specialisations, section: 'specialisations' },
  { label: 'Contact', href: links.contact, section: 'enquiry' },
];

export const hero = {
  titleLines: ['Connecting medical', 'expertise with', 'healthcare', 'opportunities.'],
  lead: 'We bring exceptional medical professionals and leading healthcare institutions together through specialised recruitment solutions.',
  primary: 'Explore opportunities',
  secondary: 'Hire medical professionals',
  caption: 'Recruiting for hospitals, medical colleges and healthcare groups across India.',
};

/**
 * PLACEHOLDER FIGURES – taken from the original design mock-up, not verified.
 * Replace with audited numbers; the footnote on the page says so until then.
 */
export const figures = [
  { value: 500, suffix: '+', label: 'Healthcare institutions served' },
  { value: 10000, suffix: '+', label: 'Medical professionals in our network' },
  { value: 3000, suffix: '+', label: 'Placements completed' },
  { value: 25, suffix: '+', label: 'Specialisations recruited for' },
];

export const institutionTypes = [
  'Multispecialty hospitals',
  'Medical colleges',
  'Healthcare groups',
  'Diagnostic centres',
  'Specialty clinics',
];

export const about = {
  statement: 'We recruit for medicine the way medicine is practised: by specialty, by setting and by standard of care.',
  body: [
    'MedRecruit is a healthcare recruitment organisation working with hospitals, medical colleges and healthcare groups across India. We find, assess and introduce doctors, specialists, faculty, nurses and allied health professionals.',
    'Our consultants are organised by clinical area rather than by job board, so the person handling a neonatology search understands what a level III unit needs, and the person placing faculty knows the regulatory norms a college must meet.',
  ],
  facts: [
    { term: 'Who we serve', detail: 'Hospitals, medical colleges, healthcare groups and diagnostic networks, and the clinicians who work in them.' },
    { term: 'What we do', detail: 'Permanent placement, contract staffing and volume hiring for clinical and academic roles.' },
    { term: 'How we work', detail: 'Specialty-led consultants, documented credential checks and a single point of contact for every search.' },
  ],
};

export interface Service {
  id: string;
  title: string;
  summary: string;
  roles: string[];
  engagement: string;
}

export const services: Service[] = [
  {
    id: 'doctors',
    title: 'Doctor recruitment',
    summary: 'Medical officers, residents and general duty doctors for wards, casualty, ICU cover and outpatient services.',
    roles: ['Medical officers', 'Casualty medical officers', 'Junior and senior residents', 'Duty doctors'],
    engagement: 'Permanent and contract',
  },
  {
    id: 'specialists',
    title: 'Specialist doctor recruitment',
    summary: 'Consultants and super-specialists searched for individually, with clinical references taken before introduction.',
    roles: ['Consultants (MD, MS, DNB)', 'Super-specialists (DM, MCh)', 'Heads of department', 'Visiting consultants'],
    engagement: 'Retained search',
  },
  {
    id: 'nursing',
    title: 'Nursing recruitment',
    summary: 'Registered nurses for critical care, theatres, wards and community settings, through to nursing leadership.',
    roles: ['Staff nurses', 'ICU, NICU and OT nurses', 'Nurse educators', 'Nursing superintendents'],
    engagement: 'Permanent and volume',
  },
  {
    id: 'faculty',
    title: 'Medical faculty recruitment',
    summary: 'Teaching staff for medical, dental and nursing colleges, checked against current regulatory eligibility norms.',
    roles: ['Assistant and associate professors', 'Professors', 'Heads of department', 'Deans and principals'],
    engagement: 'Retained search',
  },
  {
    id: 'allied',
    title: 'Allied healthcare recruitment',
    summary: 'The clinical professionals around the doctor: therapy, imaging, laboratory and pharmacy teams.',
    roles: ['Physiotherapists', 'Radiographers and imaging technologists', 'Laboratory scientists', 'Clinical pharmacists'],
    engagement: 'Permanent and contract',
  },
  {
    id: 'paramedical',
    title: 'Paramedical recruitment',
    summary: 'Technicians and paramedics for theatres, cath labs, dialysis units and emergency transport.',
    roles: ['OT and anaesthesia technicians', 'Cath lab technologists', 'Dialysis technicians', 'Emergency medical technicians'],
    engagement: 'Permanent and volume',
  },
  {
    id: 'staffing',
    title: 'Healthcare staffing',
    summary: 'Short-term and locum cover when a rota has a gap, a unit is opening or a clinician is on leave.',
    roles: ['Locum consultants', 'Locum medical officers', 'Agency nursing', 'Interim leadership'],
    engagement: 'Contract and locum',
  },
  {
    id: 'bulk',
    title: 'Bulk recruitment',
    summary: 'Planned hiring programmes for new hospitals, new units and expansions, run with a dedicated team and weekly reporting.',
    roles: ['Commissioning a new hospital', 'Opening a new department', 'Annual nurse intake', 'Faculty for new seats'],
    engagement: 'Programme-based',
  },
];

export interface SpecialtyGroup {
  title: string;
  items: string[];
}

export const specialtyGroups: SpecialtyGroup[] = [
  {
    title: 'Medicine',
    items: ['General medicine', 'Cardiology', 'Neurology', 'Nephrology', 'Gastroenterology', 'Pulmonology', 'Endocrinology', 'Dermatology', 'Psychiatry'],
  },
  {
    title: 'Surgery',
    items: ['General surgery', 'Orthopaedics', 'Neurosurgery', 'Cardiothoracic surgery', 'Urology', 'Plastic surgery', 'ENT', 'Ophthalmology'],
  },
  {
    title: 'Women and children',
    items: ['Obstetrics and gynaecology', 'Paediatrics', 'Neonatology', 'Reproductive medicine'],
  },
  {
    title: 'Critical care and diagnostics',
    items: ['Anaesthesiology', 'Emergency medicine', 'Critical care', 'Radiology', 'Pathology', 'Nuclear medicine'],
  },
  {
    title: 'Oncology',
    items: ['Medical oncology', 'Surgical oncology', 'Radiation oncology', 'Haemato-oncology'],
  },
  {
    title: 'Teaching, nursing and allied',
    items: ['Medical faculty', 'Nursing', 'Allied health', 'Paramedical'],
  },
];

export const process = {
  professionals: [
    { title: 'Registration', body: 'You share your qualifications, registration, experience and the cities you would consider.' },
    { title: 'Profile assessment', body: 'A consultant from your specialty reviews your profile and talks through what you want next.' },
    { title: 'Opportunity matching', body: 'We put forward roles that fit your training and goals, with the salary range before you apply.' },
    { title: 'Interview coordination', body: 'We arrange interviews, prepare you for each panel and pass on feedback promptly.' },
    { title: 'Placement', body: 'We support you through the offer, notice period and joining, and stay in touch afterwards.' },
  ],
  institutions: [
    { title: 'Requirement submission', body: 'You brief us on the role, qualifications, salary band, rota and joining timeline.' },
    { title: 'Candidate sourcing', body: 'We search our network and the wider market for clinicians who fit the brief.' },
    { title: 'Screening', body: 'Registration, degrees, experience and clinical references are checked before anyone reaches you.' },
    { title: 'Interview coordination', body: 'We schedule panels, collect feedback and keep candidates engaged throughout.' },
    { title: 'Recruitment completion', body: 'We manage offers and notice periods until the professional has joined.' },
  ],
};

export const institutions = {
  title: 'Build a stronger healthcare workforce.',
  lead: 'Clinical hiring is slow when it is treated as general recruitment. We run every search with a consultant who knows the specialty, the regulations and the market.',
  audiences: ['Hospitals', 'Medical colleges', 'Healthcare groups', 'Diagnostic centres', 'Specialised healthcare facilities'],
  points: [
    { title: 'Shortlists, not inboxes', body: 'You see a small number of assessed candidates with references attached, not a pile of CVs.' },
    { title: 'Regulatory awareness', body: 'Faculty searches are checked against current eligibility norms before candidates are introduced.' },
    { title: 'One accountable consultant', body: 'A single point of contact from brief to joining day, with clear progress updates.' },
  ],
  cta: 'Discuss your hiring requirements',
};

export const professionals = {
  title: 'Your expertise. Your next opportunity.',
  lead: 'Whether you are completing residency or leading a department, we help you find a role that matches your training, your ambitions and the life you want around it.',
  audiences: ['MBBS doctors', 'MD and MS specialists', 'Super-specialists', 'Medical faculty', 'Nursing professionals', 'Allied healthcare professionals'],
  promises: [
    'Confidential searches. Your current employer is never contacted without your permission.',
    'Salary ranges shared before you apply.',
    'No fees for medical professionals, ever.',
  ],
  cta: 'Explore career opportunities',
};

export interface Testimonial {
  audience: 'Hospital' | 'Doctor' | 'Medical college' | 'Nursing';
  quote: string;
  role: string;
  setting: string;
  /** The result the quote refers to, set as a single figure. */
  outcome: { value: string; label: string };
}

/**
 * PLACEHOLDER TESTIMONIALS – illustrative only, attributed by role rather than
 * by name. Outcomes are examples, not claims. Replace with genuine,
 * client-approved quotes and verified results.
 */
export const testimonials: Testimonial[] = [
  {
    audience: 'Hospital',
    quote:
      'They understood that a cardiac surgery programme needs more than a CV. Every candidate we met had been properly assessed, and we filled the post at the second interview.',
    role: 'Medical Director',
    setting: 'Multispecialty hospital, Western India',
    outcome: { value: '2nd', label: 'interview to offer' },
  },
  {
    audience: 'Doctor',
    quote:
      'I wanted to move cities without my hospital finding out. The consultant only shared my profile with the two institutions I approved, and the salary was clear from the first call.',
    role: 'Consultant Neurologist',
    setting: 'Placed with a hospital group, South India',
    outcome: { value: '2', label: 'institutions approved to see the profile' },
  },
  {
    audience: 'Medical college',
    quote:
      'Faculty hiring is difficult to get right. Their shortlist already met the eligibility norms, which saved our office weeks of checking.',
    role: 'Dean',
    setting: 'Medical college, Central India',
    outcome: { value: '100%', label: 'of the shortlist met eligibility norms' },
  },
  {
    audience: 'Nursing',
    quote:
      'Opening a new critical care block meant hiring a full nursing team at once. We had one consultant, one weekly report and no surprises on joining day.',
    role: 'Nursing Superintendent',
    setting: 'Tertiary care hospital, North India',
    outcome: { value: '1', label: 'point of contact for the whole intake' },
  },
];

export const closing = {
  title: 'Better healthcare begins with the right people.',
  lead: 'Tell us what you are looking for. A consultant from the relevant specialty will reply within one working day.',
};

/** PLACEHOLDER contact details. */
export const contact = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'enquiries@medrecruit.in',
  address: ['B-205, Healthcare Business Park', 'Andheri East, Mumbai 400059'],
  hours: 'Monday to Saturday, 9:30 am to 6:30 pm',
};

export const footer = {
  columns: [
    {
      title: 'MedRecruit',
      links: [
        { label: 'About us', href: links.about },
        { label: 'Our process', href: links.process },
        { label: 'Contact', href: links.contact },
      ],
    },
    {
      title: 'Recruitment services',
      links: services.slice(0, 6).map((s) => ({ label: s.title, href: links.services })),
    },
    {
      title: 'Medical professionals',
      links: [
        { label: 'Explore opportunities', href: links.doctors },
        { label: 'Specialisations', href: links.specialisations },
        { label: 'Register your profile', href: links.contact },
      ],
    },
    {
      title: 'Healthcare institutions',
      links: [
        { label: 'Hire professionals', href: links.hospitals },
        { label: 'Bulk recruitment', href: links.services },
        { label: 'Submit a requirement', href: links.contact },
      ],
    },
  ],
  /** PLACEHOLDER profile URLs. */
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
  legal: [
    { label: 'Privacy policy', href: '#privacy' },
    { label: 'Terms and conditions', href: '#terms' },
  ],
};
