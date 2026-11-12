/**
 * SAMPLE JOB DATA – generated deterministically from role templates so that
 * every count, filter and page on the prototype agrees. Replace with the jobs API.
 */
import { institutions, type Institution, type InstitutionType } from './institutions';
import type { SpecialtyId } from './specialties';

export type JobType = 'Full-time' | 'Part-time' | 'Locum' | 'Contract';
export type Shift = 'Day' | 'Rotational' | 'Night' | 'Weekend';

export interface Job {
  id: number;
  slug: string;
  title: string;
  specialtyId: SpecialtyId;
  institution: Institution;
  city: string;
  type: JobType;
  shift: Shift;
  qualification: string;
  experience: { min: number; max: number };
  salary: { min: number; max: number; unit: 'lpa' | 'shift' };
  postedDaysAgo: number;
  urgent: boolean;
  summary: string;
  duties: string[];
  requirements: string[];
  benefits: string[];
}

interface RoleTemplate {
  specialtyId: SpecialtyId;
  title: string;
  qualification: string;
  experience: [number, number];
  salary: [number, number];
  unit?: 'lpa' | 'shift';
  type?: JobType;
  shifts?: Shift[];
  at: InstitutionType[];
  count: number;
  summary: string;
  duties: string[];
  requirements: string[];
}

const MULTI: InstitutionType = 'Multispecialty hospital';
const COLLEGE: InstitutionType = 'Medical college';
const WOMEN: InstitutionType = "Women & children's hospital";
const CANCER: InstitutionType = 'Cancer centre';
const HEART: InstitutionType = 'Heart institute';
const DIAG: InstitutionType = 'Diagnostic network';

const templates: RoleTemplate[] = [
  // Cardiology
  {
    specialtyId: 'cardiology',
    title: 'Consultant Interventional Cardiologist',
    qualification: 'DM / DNB Cardiology',
    experience: [5, 15],
    salary: [48, 80],
    at: [HEART, MULTI],
    count: 6,
    summary: 'Lead elective and primary PCI work in a high-volume cath lab and run two cardiology OPDs a week.',
    duties: [
      'Perform diagnostic angiography, PCI and device implantation',
      'Take part in the 24-hour primary angioplasty rota',
      'Run outpatient clinics and review inpatient referrals',
      'Teach DNB residents and contribute to audit',
    ],
    requirements: [
      'DM or DNB in Cardiology, registered with the NMC or a state council',
      'At least 500 independent PCIs',
      'Experience with IVUS or OCT preferred',
    ],
  },
  {
    specialtyId: 'cardiology',
    title: 'Associate Consultant, Cardiology',
    qualification: 'DM / DNB Cardiology',
    experience: [2, 6],
    salary: [28, 40],
    at: [HEART, MULTI],
    count: 5,
    summary: 'Support the consultant team across the CCU, echo lab and cath lab with a clear path to consultant.',
    duties: [
      'Manage CCU patients and handle cardiology referrals',
      'Report transthoracic and transoesophageal echocardiograms',
      'Assist and progressively lead cath lab procedures',
    ],
    requirements: [
      'DM or DNB in Cardiology',
      'Independent echo reporting',
      'ACLS certification',
    ],
  },
  {
    specialtyId: 'cardiology',
    title: 'Senior Resident, Cardiology',
    qualification: 'MD General Medicine',
    experience: [1, 4],
    salary: [14, 19],
    shifts: ['Rotational'],
    at: [HEART, COLLEGE],
    count: 4,
    summary: 'A three-year senior residency on a busy cardiology unit, well suited to doctors preparing for DM entrance.',
    duties: [
      'Cover the CCU and cardiac wards on a rotational rota',
      'Perform temporary pacing and central lines',
      'Present cases at weekly departmental meetings',
    ],
    requirements: ['MD or DNB in General Medicine', 'Valid state council registration'],
  },
  // General medicine
  {
    specialtyId: 'general-medicine',
    title: 'Consultant Physician, Internal Medicine',
    qualification: 'MD / DNB General Medicine',
    experience: [3, 12],
    salary: [26, 42],
    at: [MULTI],
    count: 7,
    summary: 'Run an internal medicine unit with your own beds, daily OPD and an on-call share of the medical take.',
    duties: [
      'Lead ward rounds and admit patients from the emergency department',
      'Run daily outpatient clinics',
      'Supervise medical officers and DNB trainees',
    ],
    requirements: [
      'MD or DNB in General Medicine',
      'Three or more years as a consultant or senior registrar',
      'Comfortable managing HDU-level patients',
    ],
  },
  {
    specialtyId: 'general-medicine',
    title: 'Medical Officer',
    qualification: 'MBBS',
    experience: [0, 3],
    salary: [9, 13],
    shifts: ['Rotational', 'Day'],
    at: [MULTI],
    count: 9,
    summary: 'Ward-based medical officer post with structured supervision and a monthly teaching programme.',
    duties: [
      'Clerk admissions and keep ward documentation current',
      'Respond to ward calls and escalate deteriorating patients',
      'Coordinate discharges with nursing and pharmacy',
    ],
    requirements: ['MBBS with completed internship', 'Valid NMC or state council registration', 'BLS certification'],
  },
  {
    specialtyId: 'general-medicine',
    title: 'Duty Medical Officer, ICU',
    qualification: 'MBBS with ICU experience',
    experience: [1, 5],
    salary: [6000, 9000],
    unit: 'shift',
    type: 'Locum',
    shifts: ['Night', 'Weekend'],
    at: [MULTI],
    count: 6,
    summary: 'Flexible 12-hour locum shifts in a closed ICU under a consultant intensivist.',
    duties: [
      'Manage ventilated and post-operative patients overnight',
      'Perform central lines and arterial lines',
      'Hand over to the day intensivist at 8 am',
    ],
    requirements: ['MBBS with at least one year of ICU experience', 'ACLS certification'],
  },
  // Orthopaedics
  {
    specialtyId: 'orthopaedics',
    title: 'Consultant Orthopaedic Surgeon, Joint Replacement',
    qualification: 'MS / DNB Orthopaedics with arthroplasty fellowship',
    experience: [5, 15],
    salary: [45, 75],
    at: [MULTI],
    count: 5,
    summary: 'Build a joint replacement practice with robotic-assisted theatre time and dedicated physiotherapy support.',
    duties: [
      'Perform primary and revision hip and knee arthroplasty',
      'Run two outpatient clinics a week',
      'Share the trauma on-call rota',
    ],
    requirements: [
      'MS or DNB in Orthopaedics',
      'Fellowship in arthroplasty',
      'At least 200 primary joint replacements as lead surgeon',
    ],
  },
  {
    specialtyId: 'orthopaedics',
    title: 'Associate Consultant, Orthopaedics',
    qualification: 'MS / DNB Orthopaedics',
    experience: [2, 6],
    salary: [24, 36],
    shifts: ['Rotational'],
    at: [MULTI, COLLEGE],
    count: 4,
    summary: 'Trauma-heavy role with exposure to arthroscopy and spine under senior consultants.',
    duties: [
      'Manage orthopaedic trauma from the emergency department',
      'Operate on fracture lists independently',
      'Assist on elective arthroscopy and spine lists',
    ],
    requirements: ['MS or DNB in Orthopaedics', 'Independent trauma operating'],
  },
  // Radiology
  {
    specialtyId: 'radiology',
    title: 'Consultant Radiologist',
    qualification: 'MD / DNB Radiodiagnosis',
    experience: [3, 12],
    salary: [40, 65],
    at: [MULTI, DIAG],
    count: 6,
    summary: 'Report CT, MRI and ultrasound in a department with 3T MRI and a reporting target of under four hours.',
    duties: [
      'Report cross-sectional imaging across all body systems',
      'Perform image-guided biopsies and drainages',
      'Take part in multidisciplinary tumour boards',
    ],
    requirements: ['MD or DNB in Radiodiagnosis', 'Independent MRI reporting', 'PCPNDT registration'],
  },
  {
    specialtyId: 'radiology',
    title: 'Teleradiologist, Remote',
    qualification: 'MD / DNB Radiodiagnosis',
    experience: [3, 10],
    salary: [18, 30],
    type: 'Part-time',
    shifts: ['Night'],
    at: [DIAG],
    count: 3,
    summary: 'Report overnight CT and MRI from home, with a minimum of four sessions a week.',
    duties: [
      'Report emergency CT and MRI within 60 minutes',
      'Escalate critical findings to the referring clinician',
    ],
    requirements: ['MD or DNB in Radiodiagnosis', 'Reliable broadband and a diagnostic-grade monitor'],
  },
  // Paediatrics
  {
    specialtyId: 'paediatrics',
    title: 'Consultant Paediatrician',
    qualification: 'MD / DNB Paediatrics',
    experience: [3, 10],
    salary: [24, 38],
    at: [WOMEN, MULTI],
    count: 6,
    summary: 'General paediatrics with a share of the paediatric emergency and PICU rota.',
    duties: [
      'Run general paediatric OPD and well-baby clinics',
      'Admit and manage paediatric inpatients',
      'Attend high-risk deliveries',
    ],
    requirements: ['MD or DNB in Paediatrics', 'PALS or NRP certification'],
  },
  {
    specialtyId: 'paediatrics',
    title: 'Consultant Neonatologist',
    qualification: 'DM / DNB Neonatology or fellowship',
    experience: [3, 12],
    salary: [36, 55],
    at: [WOMEN],
    count: 4,
    summary: 'Lead care in a 30-cot level III NICU with an active neonatal transport service.',
    duties: [
      'Manage extremely preterm and critically ill neonates',
      'Perform neonatal procedures including surfactant and PICC lines',
      'Counsel families and run follow-up clinics',
    ],
    requirements: ['DM or DNB in Neonatology, or MD Paediatrics with a neonatology fellowship', 'NRP certification'],
  },
  // Obstetrics & gynaecology
  {
    specialtyId: 'obstetrics-gynaecology',
    title: 'Consultant Obstetrician & Gynaecologist',
    qualification: 'MS / DNB Obstetrics & Gynaecology',
    experience: [4, 12],
    salary: [30, 48],
    at: [WOMEN, MULTI],
    count: 6,
    summary: 'High-volume obstetric unit with laparoscopic gynaecology and a dedicated labour ward team.',
    duties: [
      'Manage antenatal, intrapartum and postnatal care',
      'Perform caesarean sections and laparoscopic gynaecological surgery',
      'Share the labour ward on-call rota',
    ],
    requirements: ['MS or DNB in Obstetrics & Gynaecology', 'Independent laparoscopic surgery', 'PCPNDT registration'],
  },
  {
    specialtyId: 'obstetrics-gynaecology',
    title: 'Fertility Specialist, IVF',
    qualification: 'MS / DNB OBG with reproductive medicine fellowship',
    experience: [5, 15],
    salary: [40, 60],
    at: [WOMEN],
    count: 3,
    summary: 'Lead a fertility clinic with an in-house embryology lab and around 60 IVF cycles a month.',
    duties: [
      'Run fertility consultations and plan stimulation protocols',
      'Perform oocyte retrievals and embryo transfers',
      'Work with embryologists on lab quality indicators',
    ],
    requirements: ['MS or DNB in OBG', 'Fellowship in reproductive medicine', 'ART Act registration'],
  },
  // Anaesthesiology
  {
    specialtyId: 'anaesthesiology',
    title: 'Consultant Anaesthesiologist',
    qualification: 'MD / DNB Anaesthesiology',
    experience: [3, 12],
    salary: [32, 50],
    at: [MULTI, HEART, CANCER],
    count: 6,
    summary: 'Elective and emergency theatre work across general, orthopaedic and laparoscopic lists.',
    duties: [
      'Provide anaesthesia for elective and emergency surgery',
      'Run the pre-anaesthetic clinic',
      'Supervise recovery and acute pain services',
    ],
    requirements: ['MD or DNB in Anaesthesiology', 'Ultrasound-guided regional anaesthesia'],
  },
  {
    specialtyId: 'anaesthesiology',
    title: 'Locum Anaesthetist, Weekend Lists',
    qualification: 'MD / DNB Anaesthesiology',
    experience: [2, 10],
    salary: [12000, 18000],
    unit: 'shift',
    type: 'Locum',
    shifts: ['Weekend'],
    at: [MULTI],
    count: 4,
    summary: 'Saturday and Sunday elective lists, booked a month in advance.',
    duties: ['Provide anaesthesia for planned day-care and elective lists', 'Hand over to the on-call consultant'],
    requirements: ['MD or DNB in Anaesthesiology', 'Valid state council registration'],
  },
  // Neurology
  {
    specialtyId: 'neurology',
    title: 'Consultant Neurologist',
    qualification: 'DM / DNB Neurology',
    experience: [3, 12],
    salary: [45, 70],
    at: [MULTI],
    count: 4,
    summary: 'Join a comprehensive stroke centre with thrombolysis, thrombectomy and a dedicated stroke unit.',
    duties: [
      'Lead acute stroke response and thrombolysis decisions',
      'Run epilepsy and movement disorder clinics',
      'Report EEG and nerve conduction studies',
    ],
    requirements: ['DM or DNB in Neurology', 'Experience with acute stroke pathways'],
  },
  {
    specialtyId: 'neurology',
    title: 'Consultant Neurosurgeon',
    qualification: 'MCh / DNB Neurosurgery',
    experience: [6, 15],
    salary: [60, 95],
    at: [MULTI],
    count: 2,
    summary: 'Cranial and spinal neurosurgery with neuronavigation and intraoperative monitoring.',
    duties: ['Perform cranial, spinal and trauma neurosurgery', 'Share the neurotrauma on-call rota'],
    requirements: ['MCh or DNB in Neurosurgery', 'Independent cranial surgery'],
  },
  // Emergency medicine
  {
    specialtyId: 'emergency-medicine',
    title: 'Emergency Physician',
    qualification: 'MEM / DNB Emergency Medicine',
    experience: [2, 8],
    salary: [22, 34],
    shifts: ['Rotational'],
    at: [MULTI],
    count: 6,
    summary: 'Consultant-led emergency department seeing around 150 patients a day, including trauma.',
    duties: [
      'Lead resuscitation and trauma calls',
      'Supervise casualty medical officers',
      'Contribute to triage protocols and audit',
    ],
    requirements: ['MEM, DNB or MD in Emergency Medicine', 'ACLS and ATLS certification'],
  },
  {
    specialtyId: 'emergency-medicine',
    title: 'Casualty Medical Officer',
    qualification: 'MBBS',
    experience: [0, 3],
    salary: [10, 14],
    shifts: ['Rotational'],
    at: [MULTI, COLLEGE],
    count: 6,
    summary: 'Front-line emergency work with consultant cover around the clock.',
    duties: ['Assess and stabilise walk-in and ambulance patients', 'Perform minor procedures and suturing'],
    requirements: ['MBBS with completed internship', 'BLS and ACLS certification'],
  },
  // Oncology
  {
    specialtyId: 'oncology',
    title: 'Consultant Medical Oncologist',
    qualification: 'DM / DNB Medical Oncology',
    experience: [3, 12],
    salary: [55, 85],
    at: [CANCER, MULTI],
    count: 3,
    summary: 'Solid-tumour practice with access to a day-care chemotherapy unit and clinical trials.',
    duties: [
      'Plan and supervise systemic anticancer therapy',
      'Lead tumour boards for your site specialty',
      'Recruit patients to clinical trials',
    ],
    requirements: ['DM or DNB in Medical Oncology'],
  },
  {
    specialtyId: 'oncology',
    title: 'Radiation Oncologist',
    qualification: 'MD / DNB Radiation Oncology',
    experience: [3, 10],
    salary: [36, 55],
    at: [CANCER],
    count: 3,
    summary: 'IMRT, IGRT and SBRT planning on two modern linear accelerators.',
    duties: ['Contour and approve radiotherapy plans', 'Review patients on treatment weekly'],
    requirements: ['MD or DNB in Radiation Oncology', 'AERB-compliant training'],
  },
  // Nursing
  {
    specialtyId: 'nursing',
    title: 'Staff Nurse, ICU',
    qualification: 'B.Sc / GNM Nursing',
    experience: [1, 5],
    salary: [3.6, 5.4],
    shifts: ['Rotational'],
    at: [MULTI, HEART, CANCER],
    count: 12,
    summary: 'Critical care nursing with a 1:2 nurse-to-patient ratio and paid ICU certification after six months.',
    duties: [
      'Care for ventilated and haemodynamically unstable patients',
      'Administer and monitor infusions and blood products',
      'Document care accurately in the electronic record',
    ],
    requirements: ['B.Sc or GNM Nursing', 'Registration with the state nursing council', 'BLS certification'],
  },
  {
    specialtyId: 'nursing',
    title: 'Staff Nurse, Operation Theatre',
    qualification: 'B.Sc / GNM Nursing',
    experience: [1, 5],
    salary: [3.6, 5.2],
    shifts: ['Day', 'Rotational'],
    at: [MULTI, WOMEN],
    count: 8,
    summary: 'Scrub and circulating nurse role across general, orthopaedic and laparoscopic theatres.',
    duties: ['Scrub for elective and emergency cases', 'Maintain sterile technique and instrument counts'],
    requirements: ['B.Sc or GNM Nursing', 'At least one year of theatre experience'],
  },
  {
    specialtyId: 'nursing',
    title: 'NICU Nurse',
    qualification: 'B.Sc / GNM Nursing',
    experience: [2, 6],
    salary: [4.2, 6],
    shifts: ['Rotational'],
    at: [WOMEN],
    count: 5,
    summary: 'Neonatal intensive care nursing in a level III unit with a structured preceptorship.',
    duties: ['Care for preterm and sick newborns', 'Support kangaroo mother care and breastfeeding'],
    requirements: ['B.Sc or GNM Nursing', 'NICU experience', 'NRP certification preferred'],
  },
  {
    specialtyId: 'nursing',
    title: 'Nursing Superintendent',
    qualification: 'M.Sc Nursing',
    experience: [10, 20],
    salary: [9, 14],
    at: [MULTI, COLLEGE],
    count: 3,
    summary: 'Lead a nursing team of more than 300 and own NABH nursing standards.',
    duties: ['Plan nursing rosters and staffing', 'Lead quality and infection-control audits', 'Recruit and develop nurse leaders'],
    requirements: ['M.Sc Nursing', 'At least five years in a nursing leadership role'],
  },
  // Medical faculty
  {
    specialtyId: 'medical-faculty',
    title: 'Assistant Professor, Anatomy',
    qualification: 'MD Anatomy',
    experience: [0, 4],
    salary: [12, 17],
    at: [COLLEGE],
    count: 4,
    summary: 'Teach first-year MBBS students in a department with a new dissection hall and museum.',
    duties: ['Deliver lectures, dissection and small-group teaching', 'Guide postgraduate theses'],
    requirements: ['MD in Anatomy', 'Eligibility as per NMC teacher norms'],
  },
  {
    specialtyId: 'medical-faculty',
    title: 'Associate Professor, General Medicine',
    qualification: 'MD General Medicine',
    experience: [5, 10],
    salary: [18, 26],
    at: [COLLEGE],
    count: 3,
    summary: 'Combine unit-based clinical work with undergraduate and postgraduate teaching.',
    duties: ['Lead a medical unit', 'Teach MBBS and MD students', 'Publish and present research'],
    requirements: ['MD in General Medicine', 'Teaching experience and publications as per NMC norms'],
  },
  {
    specialtyId: 'medical-faculty',
    title: 'Professor & Head, Paediatrics',
    qualification: 'MD Paediatrics',
    experience: [10, 25],
    salary: [28, 40],
    at: [COLLEGE],
    count: 2,
    summary: 'Lead the paediatrics department, its PG programme and the NICU teaching service.',
    duties: ['Head the department and its academic programme', 'Represent the department to the NMC'],
    requirements: ['MD in Paediatrics', 'Eligibility for professor as per NMC norms'],
  },
  {
    specialtyId: 'medical-faculty',
    title: 'Senior Resident, Community Medicine',
    qualification: 'MD Community Medicine',
    experience: [0, 3],
    salary: [12, 15],
    at: [COLLEGE],
    count: 3,
    summary: 'Teaching and field work across the college’s rural and urban health training centres.',
    duties: ['Teach MBBS students in the field', 'Coordinate health camps and surveys'],
    requirements: ['MD in Community Medicine'],
  },
  // Allied health
  {
    specialtyId: 'allied-health',
    title: 'Physiotherapist',
    qualification: 'BPT / MPT',
    experience: [1, 5],
    salary: [3.6, 5.4],
    at: [MULTI],
    count: 6,
    summary: 'Inpatient and outpatient physiotherapy with a focus on post-operative orthopaedic rehabilitation.',
    duties: ['Assess and treat inpatients and outpatients', 'Run joint replacement rehabilitation classes'],
    requirements: ['BPT or MPT', 'Registration with the state physiotherapy council where applicable'],
  },
  {
    specialtyId: 'allied-health',
    title: 'Cath Lab Technologist',
    qualification: 'B.Sc Cardiac Care Technology',
    experience: [2, 6],
    salary: [4, 6.5],
    shifts: ['Rotational'],
    at: [HEART],
    count: 3,
    summary: 'Support coronary and structural procedures in one of four cath labs.',
    duties: ['Run haemodynamic monitoring during procedures', 'Manage cath lab inventory'],
    requirements: ['B.Sc in Cardiac Care Technology', 'Cath lab experience'],
  },
  {
    specialtyId: 'allied-health',
    title: 'MRI Technologist',
    qualification: 'B.Sc Radiology & Imaging Technology',
    experience: [1, 5],
    salary: [3.6, 5.5],
    shifts: ['Rotational'],
    at: [DIAG, MULTI],
    count: 5,
    summary: 'Acquire 1.5T and 3T MRI studies, including cardiac and paediatric protocols.',
    duties: ['Position patients and run scan protocols', 'Screen patients for MRI safety'],
    requirements: ['B.Sc in Radiology & Imaging Technology', 'MRI experience'],
  },
  {
    specialtyId: 'allied-health',
    title: 'Clinical Pharmacist',
    qualification: 'Pharm.D',
    experience: [1, 5],
    salary: [4.5, 7],
    at: [MULTI, CANCER],
    count: 3,
    summary: 'Ward-based clinical pharmacy with antimicrobial stewardship responsibilities.',
    duties: ['Review prescriptions on ward rounds', 'Support the antimicrobial stewardship programme'],
    requirements: ['Pharm.D', 'Registration with the state pharmacy council'],
  },
];

const benefitsByType: Record<InstitutionType, string[]> = {
  'Multispecialty hospital': [
    'Group health cover for you and your family',
    'Annual CME and conference allowance',
    'Relocation support and six months of accommodation',
    'Indemnity insurance paid by the hospital',
  ],
  'Medical college': [
    'Pay as per the institution’s scale, aligned to NMC norms',
    'On-campus housing',
    'Research grants and protected academic time',
    'Paid leave for examinations and conferences',
  ],
  "Women & children's hospital": [
    'Group health cover for you and your family',
    'Paid certification in NRP or PALS',
    'Childcare support on campus',
    'Annual CME allowance',
  ],
  'Cancer centre': [
    'Group health cover for you and your family',
    'Sponsored international fellowships',
    'Access to clinical trial programmes',
    'Annual CME allowance',
  ],
  'Heart institute': [
    'Group health cover for you and your family',
    'Procedure-linked incentives',
    'Annual conference sponsorship',
    'Relocation support',
  ],
  'Diagnostic network': [
    'Flexible reporting hours',
    'Remote reporting set-up provided',
    'Volume-linked incentives',
    'Annual CME allowance',
  ],
};

/** Small seeded PRNG (mulberry32) so the sample data is identical on every load. */
function createRandom(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function buildJobs(): Job[] {
  const random = createRandom(20261112);
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)];
  const roundTo = (value: number, step: number) => Math.round(value / step) * step;
  const result: Job[] = [];
  let id = 1;

  for (const template of templates) {
    const eligible = institutions.filter((inst) => template.at.includes(inst.type));
    const offset = Math.floor(random() * eligible.length);

    for (let n = 0; n < template.count; n++) {
      const institution = eligible[(offset + n) % eligible.length];
      const city = pick(institution.cities);
      const unit = template.unit ?? 'lpa';
      const step = unit === 'shift' ? 500 : template.salary[1] < 10 ? 0.2 : 1;
      const jitter = 1 + (random() - 0.5) * 0.12;
      const salaryMin = roundTo(template.salary[0] * jitter, step);
      const salaryMax = roundTo(template.salary[1] * jitter, step);
      // Recent posts are more common than old ones, spread over about five weeks.
      const postedDaysAgo = Math.round(Math.pow(random(), 1.25) * 34);

      result.push({
        id,
        slug: `${slugify(template.title)}-${institution.id}-${id}`,
        title: template.title,
        specialtyId: template.specialtyId,
        institution,
        city,
        type: template.type ?? 'Full-time',
        shift: pick(template.shifts ?? ['Day']),
        qualification: template.qualification,
        experience: { min: template.experience[0], max: template.experience[1] },
        salary: { min: Number(salaryMin.toFixed(1)), max: Number(salaryMax.toFixed(1)), unit },
        postedDaysAgo,
        urgent: random() < 0.12,
        summary: template.summary,
        duties: template.duties,
        requirements: template.requirements,
        benefits: benefitsByType[institution.type],
      });
      id++;
    }
  }

  return result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo || a.id - b.id);
}

export const jobs: Job[] = buildJobs();

export const jobBySlug = new Map(jobs.map((job) => [job.slug, job]));

export const cities = [...new Set(jobs.map((job) => job.city))].sort((a, b) => a.localeCompare(b));

export const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Locum', 'Contract'];

export const experienceBands = [
  { id: '0-2', label: 'Up to 2 years', min: 0, max: 2 },
  { id: '2-5', label: '2 to 5 years', min: 2, max: 5 },
  { id: '5-10', label: '5 to 10 years', min: 5, max: 10 },
  { id: '10+', label: '10 years or more', min: 10, max: 99 },
] as const;

export const jobCountBySpecialty = jobs.reduce<Partial<Record<SpecialtyId, number>>>((acc, job) => {
  acc[job.specialtyId] = (acc[job.specialtyId] ?? 0) + 1;
  return acc;
}, {});

export const hospitalCount = new Set(jobs.map((job) => job.institution.id)).size;
