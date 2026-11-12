/**
 * Landing page content.
 *
 * All copy, figures and image references live here so they can be updated
 * without touching the presentation components.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Baby,
  Bone,
  Brain,
  GraduationCap,
  Handshake,
  Headset,
  HeartPulse,
  Hospital,
  Network,
  ScanLine,
  SearchCheck,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
  Venus,
  Zap,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { NurseCapIcon } from '../components/icons/NurseCapIcon';

import cardiologyImg from '../assets/images/specialisations/cardiology.jpg';
import neurologyImg from '../assets/images/specialisations/neurology.jpg';
import radiologyImg from '../assets/images/specialisations/radiology.jpg';
import orthopaedicsImg from '../assets/images/specialisations/orthopaedics.jpg';
import generalMedicineImg from '../assets/images/specialisations/general-medicine.jpg';
import paediatricsImg from '../assets/images/specialisations/paediatrics.jpg';
import gynaecologyImg from '../assets/images/specialisations/gynaecology.jpg';
import anaesthesiologyImg from '../assets/images/specialisations/anaesthesiology.jpg';
import anilMehtaImg from '../assets/images/avatars/anil-mehta.jpg';
import nehaSharmaImg from '../assets/images/avatars/neha-sharma.jpg';
import rajivDesaiImg from '../assets/images/avatars/rajiv-desai.jpg';
import priyaNairImg from '../assets/images/avatars/priya-nair.jpg';
import sameerKhanImg from '../assets/images/avatars/sameer-khan.jpg';

export type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

/* ------------------------------------------------------------------ */
/* Brand & navigation                                                  */
/* ------------------------------------------------------------------ */

export const brand = {
  name: 'MedRecruit',
  tagline: 'Medical Recruitment Portal',
  description:
    'A specialised medical recruitment platform connecting healthcare talent with leading institutions.',
};

/**
 * Destinations for calls-to-action. Account and form flows are not part of
 * the landing page yet, so they point at the most relevant on-page section.
 * Repoint these when the real pages exist.
 */
export const routes = {
  home: '#home',
  about: '#about',
  forDoctors: '#for-doctors',
  forHospitals: '#for-hospitals',
  specialisations: '#specialisations',
  contact: '#contact',
  login: '#contact',
  register: '#for-doctors',
  postRequirement: '#for-hospitals',
  privacy: '#contact',
  terms: '#contact',
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** id of the section this link activates in the scroll-spy */
  sectionId: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: routes.home, sectionId: 'home' },
  { label: 'About Us', href: routes.about, sectionId: 'about' },
  { label: 'For Doctors', href: routes.forDoctors, sectionId: 'for-doctors' },
  { label: 'For Hospitals', href: routes.forHospitals, sectionId: 'for-hospitals' },
  { label: 'Specialisations', href: routes.specialisations, sectionId: 'specialisations' },
  { label: 'Contact', href: routes.contact, sectionId: 'contact' },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  titleLines: ['Connecting Medical', 'Talent With Healthcare'],
  titleAccent: 'Opportunities.',
  description:
    'We bridge the gap between skilled medical professionals and leading healthcare institutions through reliable, efficient and specialised recruitment solutions.',
  primaryCta: { label: 'Explore Opportunities', href: routes.specialisations },
  secondaryCta: { label: 'Hire Medical Professionals', href: routes.forHospitals },
};

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: string;
  label: string;
  icon: IconComponent;
}

/**
 * SAMPLE FIGURES – replace with verified company numbers before launch.
 */
export const stats: Stat[] = [
  { value: '500+', label: 'Healthcare Institutions', icon: Hospital },
  { value: '10,000+', label: 'Medical Professionals', icon: Users },
  { value: '3,000+', label: 'Successful Placements', icon: Handshake },
  { value: '25+', label: 'Medical Specialisations', icon: Stethoscope },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: 'About Us',
  titleLines: ['Your Trusted Partner in', 'Healthcare Recruitment.'],
  description:
    'We connect qualified doctors, specialists and healthcare professionals with hospitals, medical colleges and healthcare institutions across India, helping organisations build strong and competent healthcare teams.',
  cta: { label: 'Discover Our Approach', href: routes.forHospitals },
};

/* ------------------------------------------------------------------ */
/* Recruitment solutions                                               */
/* ------------------------------------------------------------------ */

export interface Solution {
  title: string;
  description: string;
  icon: IconComponent;
}

export const solutionsSection = {
  title: 'Our Recruitment Solutions',
  subtitle: 'Comprehensive hiring solutions for a wide range of healthcare roles.',
};

export const solutions: Solution[] = [
  {
    title: 'Doctor Recruitment',
    description:
      'Recruitment of qualified doctors and medical specialists across various specialisations.',
    icon: Stethoscope,
  },
  {
    title: 'Nursing Recruitment',
    description:
      'Qualified and experienced nursing professionals for hospitals and healthcare facilities.',
    icon: NurseCapIcon,
  },
  {
    title: 'Medical Faculty Recruitment',
    description: 'Recruitment of experienced faculty for medical colleges and teaching hospitals.',
    icon: GraduationCap,
  },
  {
    title: 'Healthcare Staffing',
    description:
      'Recruitment of allied health and paramedical professionals, including technicians and support staff.',
    icon: Users,
  },
];

/* ------------------------------------------------------------------ */
/* Specialisations                                                     */
/* ------------------------------------------------------------------ */

export interface Specialisation {
  name: string;
  /** SAMPLE job count – wire to live vacancy data when available */
  jobs: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the card crop */
  focus?: string;
  icon: IconComponent;
}

export const specialisationsSection = {
  title: 'Explore Medical Specialisations',
  subtitle: 'Discover opportunities across a wide range of medical disciplines.',
  cta: { label: 'Explore All Specialisations', href: routes.specialisations },
};

export const specialisations: Specialisation[] = [
  {
    name: 'Cardiology',
    jobs: '120+ Jobs',
    image: cardiologyImg,
    imageAlt: 'Clinician adjusting a cardiac monitor beside a patient bed',
    focus: '50% 40%',
    icon: HeartPulse,
  },
  {
    name: 'Neurology',
    jobs: '85+ Jobs',
    image: neurologyImg,
    imageAlt: 'Two doctors reviewing brain MRI scans',
    focus: '45% 45%',
    icon: Brain,
  },
  {
    name: 'Radiology',
    jobs: '75+ Jobs',
    image: radiologyImg,
    imageAlt: 'Modern MRI scanner in a radiology suite',
    focus: '55% 60%',
    icon: ScanLine,
  },
  {
    name: 'Orthopaedics',
    jobs: '110+ Jobs',
    image: orthopaedicsImg,
    imageAlt: 'Doctors examining a spinal X-ray',
    focus: '50% 45%',
    icon: Bone,
  },
  {
    name: 'General Medicine',
    jobs: '150+ Jobs',
    image: generalMedicineImg,
    imageAlt: 'Doctor in a white coat with a stethoscope',
    focus: '50% 30%',
    icon: Stethoscope,
  },
  {
    name: 'Paediatrics',
    jobs: '90+ Jobs',
    image: paediatricsImg,
    imageAlt: 'Paediatrician examining a young child',
    focus: '50% 40%',
    icon: Baby,
  },
  {
    name: 'Gynaecology',
    jobs: '95+ Jobs',
    image: gynaecologyImg,
    imageAlt: 'Gynaecologist performing a prenatal ultrasound',
    focus: '55% 45%',
    icon: Venus,
  },
  {
    name: 'Anaesthesiology',
    jobs: '80+ Jobs',
    image: anaesthesiologyImg,
    imageAlt: 'Anaesthesia team in an operating theatre',
    focus: '40% 40%',
    icon: Syringe,
  },
];

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

export const whyChooseUs = {
  title: 'Why Choose Us?',
  description: 'A focused, reliable and professional approach to healthcare recruitment.',
  benefits: [
    { lines: ['Specialised', 'Medical Recruitment'], icon: Award },
    { lines: ['Extensive', 'Healthcare Network'], icon: Network },
    { lines: ['Qualified', 'Professional Screening'], icon: SearchCheck },
    { lines: ['Dedicated', 'Recruitment Support'], icon: Headset },
    { lines: ['Efficient', 'Hiring Process'], icon: Zap },
    { lines: ['Confidentiality', '& Transparency'], icon: ShieldCheck },
  ] satisfies { lines: [string, string]; icon: IconComponent }[],
};

/* ------------------------------------------------------------------ */
/* Audience call-to-action cards                                       */
/* ------------------------------------------------------------------ */

export const audienceCards = {
  institutions: {
    id: 'for-hospitals',
    eyebrow: 'For Healthcare Institutions',
    titleLines: ['Building Stronger', 'Healthcare Teams Starts Here.'],
    description:
      'Whether you need experienced consultants, specialist doctors, medical faculty or healthcare staff, we help you find the right professionals for your institution.',
    cta: { label: 'Submit Your Hiring Requirement', href: routes.contact },
  },
  professionals: {
    id: 'for-doctors',
    eyebrow: 'For Medical Professionals',
    titleLines: ['Your Medical Expertise', 'Deserves the Right Opportunity.'],
    description:
      'Discover career opportunities across leading hospitals, medical colleges and healthcare institutions.',
    cta: { label: 'Register as a Medical Professional', href: routes.contact },
  },
};

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation?: string;
  avatar: string;
  /** Marks illustrative content that must be replaced with genuine testimonials. */
  isPlaceholder: boolean;
}

export const testimonialsSection = {
  titleLines: ['What Our Partners', 'Say About Us'],
};

/**
 * PLACEHOLDER TESTIMONIALS – names, quotes and photos are illustrative only.
 * Replace every entry with genuine, consented testimonials before going live.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'A reliable recruitment partner. They understood our requirements well and helped us onboard highly qualified specialists within a short time.',
    name: 'Dr. Anil Mehta',
    role: 'Medical Director,',
    organisation: 'Sunrise Multispecialty Hospital',
    avatar: anilMehtaImg,
    isPlaceholder: true,
  },
  {
    quote:
      'The team was supportive and professional throughout the process. I found an excellent opportunity that perfectly matches my experience and career goals.',
    name: 'Dr. Neha Sharma',
    role: 'Consultant Radiologist',
    avatar: nehaSharmaImg,
    isPlaceholder: true,
  },
  {
    quote:
      'Their domain knowledge in medical recruitment is excellent. The screening and shortlisting process was thorough, which saved us a lot of time.',
    name: 'Mr. Rajiv Desai',
    role: 'HR Head,',
    organisation: 'Metro Health Group',
    avatar: rajivDesaiImg,
    isPlaceholder: true,
  },
  {
    quote:
      'They staffed our new critical-care unit with experienced nurses quickly. Communication was clear and timely at every stage.',
    name: 'Dr. Priya Nair',
    role: 'Chief Nursing Officer,',
    organisation: 'Lakeview Care Hospital',
    avatar: priyaNairImg,
    isPlaceholder: true,
  },
  {
    quote:
      'Finding senior faculty for a medical college is never easy. They shortlisted candidates who met every requirement.',
    name: 'Dr. Sameer Khan',
    role: 'Dean,',
    organisation: 'Greenfield Institute of Medical Sciences',
    avatar: sameerKhanImg,
    isPlaceholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* Final call-to-action                                                */
/* ------------------------------------------------------------------ */

export const finalCta = {
  title: "Let's Build the Future of Healthcare Together.",
  description:
    "Whether you're a medical professional looking for your next opportunity or a healthcare institution searching for exceptional talent, we're here to help.",
  primary: { label: 'Find Opportunities', href: routes.specialisations },
  secondary: { label: 'Hire Professionals', href: routes.forHospitals },
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  quickLinks: navLinks.map(({ label, href }) => ({ label, href })),
  services: [
    { label: 'Doctor Recruitment', href: routes.forHospitals },
    { label: 'Nursing Recruitment', href: routes.forHospitals },
    { label: 'Medical Faculty Recruitment', href: routes.forHospitals },
    { label: 'Healthcare Staffing', href: routes.forHospitals },
    { label: 'Bulk Hiring', href: routes.forHospitals },
    { label: 'Recruitment Process', href: routes.about },
  ],
  /** PLACEHOLDER contact details – replace with the registered office details. */
  contact: {
    addressLines: ['B-205, Healthcare Business Park,', 'Andheri (E), Mumbai – 400059, India'],
    phone: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    email: 'info@medrecruit.in',
  },
  /** Social profile URLs – replace with the real profiles. */
  social: [
    { network: 'linkedin', label: 'MedRecruit on LinkedIn', href: 'https://www.linkedin.com/' },
    { network: 'youtube', label: 'MedRecruit on YouTube', href: 'https://www.youtube.com/' },
    { network: 'instagram', label: 'MedRecruit on Instagram', href: 'https://www.instagram.com/' },
    { network: 'facebook', label: 'MedRecruit on Facebook', href: 'https://www.facebook.com/' },
  ] as const,
  legal: [
    { label: 'Privacy Policy', href: routes.privacy },
    { label: 'Terms & Conditions', href: routes.terms },
  ],
};
