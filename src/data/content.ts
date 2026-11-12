/**
 * Site copy that is not job data. Items marked SAMPLE or PLACEHOLDER must be
 * replaced with verified information before launch.
 */
import anilMehta from '../assets/images/avatars/anil-mehta.jpg';
import priyaNair from '../assets/images/avatars/priya-nair.jpg';
import rajivDesai from '../assets/images/avatars/rajiv-desai.jpg';
import sameerKhan from '../assets/images/avatars/sameer-khan.jpg';

export const brand = {
  name: 'MedRecruit',
  descriptor: 'Medical recruitment for India',
};

export const navLinks = [
  { label: 'Find jobs', to: '/jobs' },
  { label: 'For doctors', to: '/doctors' },
  { label: 'For hospitals', to: '/hospitals' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/** PLACEHOLDER contact details */
export const contact = {
  email: 'hello@medrecruit.in',
  hiringEmail: 'hiring@medrecruit.in',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  hours: 'Monday to Saturday, 9 am to 7 pm',
  address: ['B-205, Healthcare Business Park', 'Andheri East, Mumbai 400059'],
};

/** SAMPLE outcome figures – replace with audited numbers. */
export const outcomes = [
  { value: '10 days', label: 'median time from brief to first shortlist' },
  { value: '3,000+', label: 'doctors, nurses and faculty placed since 2018' },
  { value: '91%', label: 'of placed candidates still in post after a year' },
];

export const howItWorks = {
  doctors: [
    {
      title: 'Create one profile',
      body: 'Add your qualifications, council registration and the cities you would move to. It takes about five minutes.',
    },
    {
      title: 'We verify it once',
      body: 'We check your registration and degrees, so you never send the same documents to five hospitals.',
    },
    {
      title: 'Apply or get approached',
      body: 'Apply to posts yourself, or let hospitals invite you to interview. Your current employer never sees your profile.',
    },
  ],
  hospitals: [
    {
      title: 'Send us the post',
      body: 'Tell us the role, qualifications, salary band and joining date. A recruiter who knows the specialty calls you back the same day.',
    },
    {
      title: 'Get a verified shortlist',
      body: 'We search our network and screen every candidate, including registration and reference checks, before you see them.',
    },
    {
      title: 'Interview and hire',
      body: 'We schedule interviews, negotiate offers and stay in touch through the notice period until the doctor joins.',
    },
  ],
};

export const verificationChecks = [
  { title: 'Council registration', body: 'Checked against the NMC or state medical and nursing council registers.' },
  { title: 'Degrees and certificates', body: 'MBBS, postgraduate and fellowship certificates verified with the issuing university.' },
  { title: 'Work history', body: 'Experience letters matched to dates, departments and designations.' },
  { title: 'Two clinical references', body: 'Spoken references from senior colleagues, recorded and shared with the hiring hospital.' },
];

export const hospitalServices = [
  {
    title: 'Consultants and specialists',
    body: 'DM, MCh, MD, MS and DNB doctors for consultant and associate consultant posts.',
    time: 'Shortlist in 10 to 15 working days',
  },
  {
    title: 'Medical officers and residents',
    body: 'MBBS doctors for ward, casualty and ICU cover, including senior residencies.',
    time: 'Shortlist in 5 to 7 working days',
  },
  {
    title: 'Nursing teams',
    body: 'Staff nurses through to nursing superintendents, including bulk hiring for new units.',
    time: 'Shortlist in 5 to 10 working days',
  },
  {
    title: 'Medical college faculty',
    body: 'Assistant professors to heads of department who meet NMC teacher eligibility norms.',
    time: 'Shortlist in 15 to 20 working days',
  },
  {
    title: 'Allied health and technicians',
    body: 'Physiotherapists, imaging and cath lab technologists, pharmacists and lab staff.',
    time: 'Shortlist in 5 to 7 working days',
  },
];

export const doctorBenefits = [
  {
    title: 'Salary shown on every post',
    body: 'No “best in industry”. Every listing shows a salary band agreed with the hospital before it goes live.',
  },
  {
    title: 'Only verified employers',
    body: 'We visit or video-audit every hospital and medical college before they can post a role.',
  },
  {
    title: 'Your search stays private',
    body: 'Hide your profile from your current employer and choose which hospitals can see your details.',
  },
  {
    title: 'A recruiter who knows your specialty',
    body: 'Talk to someone who understands the difference between a DNB and a fellowship, and why it matters.',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  outcome: string;
}

/**
 * PLACEHOLDER TESTIMONIALS – names and quotes are illustrative and the photos
 * are stock models. Replace with genuine, consented testimonials.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'We needed three cardiologists for a new cath lab and had been searching for eight months. MedRecruit sent a shortlist in nine days and all three joined before the launch.',
    name: 'Dr. Anil Mehta',
    role: 'Medical Director, Sunrise Multispecialty Hospital',
    avatar: anilMehta,
    outcome: '3 consultants hired in 6 weeks',
  },
  {
    quote:
      'I wanted to move from Delhi to Bengaluru without my hospital finding out. The recruiter only shared my profile with the two hospitals I approved.',
    name: 'Dr. Sameer Khan',
    role: 'Consultant Neurologist',
    avatar: sameerKhan,
    outcome: 'Relocated with a 30% raise',
  },
  {
    quote:
      'Every candidate arrived with their registration and references already checked. Our HR team saved weeks of paperwork on the ICU hiring drive.',
    name: 'Mr. Rajiv Desai',
    role: 'HR Head, Metro Health Group',
    avatar: rajivDesai,
    outcome: '24 ICU nurses onboarded',
  },
  {
    quote:
      'The salary was on the listing, so there were no surprises at the offer stage. I accepted within a week of the interview.',
    name: 'Dr. Priya Nair',
    role: 'Consultant Paediatrician',
    avatar: priyaNair,
    outcome: 'Offer accepted in 7 days',
  },
];

export const faqs = {
  doctors: [
    {
      q: 'Do I pay anything to use MedRecruit?',
      a: 'No. Doctors, nurses and faculty never pay. Hospitals pay us when they hire.',
    },
    {
      q: 'Will my current employer see my profile?',
      a: 'Not unless you allow it. You can hide your profile from any hospital or group, and we never share your details without asking you first.',
    },
    {
      q: 'Which documents do I need?',
      a: 'Your council registration certificate, degree certificates and recent experience letters. You upload them once and we verify them for every application.',
    },
    {
      q: 'Can I apply for locum or part-time work?',
      a: 'Yes. Filter by job type on the search page to see locum, part-time and contract posts.',
    },
  ],
  hospitals: [
    {
      q: 'How do you charge?',
      a: 'A one-time fee when a candidate joins, as a percentage of their first-year salary. There is no charge for briefs that do not result in a hire.',
    },
    {
      q: 'What if a doctor leaves soon after joining?',
      a: 'If a placed candidate leaves within 90 days, we find a replacement at no extra cost.',
    },
    {
      q: 'Can you hire for a new department or hospital?',
      a: 'Yes. We run bulk hiring drives for new units, with a dedicated recruiter and a weekly progress report.',
    },
    {
      q: 'Do you check NMC eligibility for faculty posts?',
      a: 'Yes. For medical college roles we check teaching experience and publications against current NMC teacher eligibility norms before shortlisting.',
    },
  ],
};

/** SAMPLE partner wordmarks shown on the home page (fictional institutions). */
export const partnerNames = [
  'Sunrise Multispecialty',
  'Metro Health Group',
  'Banyan Tree Hospitals',
  'Greenfield Institute',
  'Riverbend Women & Children',
  'Northstar Cancer Centre',
];
