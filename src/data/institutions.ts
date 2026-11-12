/**
 * SAMPLE INSTITUTIONS – fictional hospitals and colleges used to populate the
 * job board prototype. Replace with real, consenting partner institutions.
 */
export type InstitutionType =
  | 'Multispecialty hospital'
  | 'Medical college'
  | "Women & children's hospital"
  | 'Cancer centre'
  | 'Heart institute'
  | 'Diagnostic network';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  cities: string[];
  beds?: number;
  founded: number;
  accreditation: string;
  about: string;
}

export const institutions: Institution[] = [
  {
    id: 'sunrise',
    name: 'Sunrise Multispecialty Hospital',
    type: 'Multispecialty hospital',
    cities: ['Mumbai', 'Pune'],
    beds: 420,
    founded: 1998,
    accreditation: 'NABH accredited',
    about:
      'A 420-bed tertiary care hospital with a 40-bed critical care unit, a level-one trauma centre and a busy outpatient service across two cities.',
  },
  {
    id: 'metro-health',
    name: 'Metro Health Group',
    type: 'Multispecialty hospital',
    cities: ['Gurugram', 'Delhi', 'Noida'],
    beds: 650,
    founded: 2006,
    accreditation: 'NABH and NABL accredited',
    about:
      'Three hospitals and twelve clinics across Delhi NCR, known for minimal-access surgery, transplant services and a large emergency department.',
  },
  {
    id: 'lakeview',
    name: 'Lakeview Care Hospital',
    type: 'Multispecialty hospital',
    cities: ['Bhopal'],
    beds: 280,
    founded: 2011,
    accreditation: 'NABH accredited',
    about:
      'The largest private hospital in central Madhya Pradesh, with a new 30-bed critical care block opening this year.',
  },
  {
    id: 'greenfield',
    name: 'Greenfield Institute of Medical Sciences',
    type: 'Medical college',
    cities: ['Nagpur'],
    beds: 900,
    founded: 1987,
    accreditation: 'NMC recognised, 150 MBBS seats',
    about:
      'A medical college and 900-bed teaching hospital with postgraduate programmes in 18 specialties and an active research office.',
  },
  {
    id: 'riverbend',
    name: "Riverbend Women & Children's Hospital",
    type: "Women & children's hospital",
    cities: ['Kochi', 'Thiruvananthapuram'],
    beds: 220,
    founded: 2009,
    accreditation: 'NABH accredited',
    about:
      'A dedicated maternity and paediatric hospital with a level III NICU, fetal medicine unit and 24-hour paediatric emergency.',
  },
  {
    id: 'northstar',
    name: 'Northstar Cancer Centre',
    type: 'Cancer centre',
    cities: ['Hyderabad'],
    beds: 180,
    founded: 2014,
    accreditation: 'NABH accredited',
    about:
      'A comprehensive cancer centre offering surgical, medical and radiation oncology, with two linear accelerators and a bone marrow transplant unit.',
  },
  {
    id: 'banyan',
    name: 'Banyan Tree Hospitals',
    type: 'Multispecialty hospital',
    cities: ['Bengaluru', 'Chennai', 'Hyderabad'],
    beds: 1100,
    founded: 2002,
    accreditation: 'NABH and JCI accredited',
    about:
      'A network of five hospitals across south India with centres of excellence in neurosciences, orthopaedics and organ transplantation.',
  },
  {
    id: 'coastline',
    name: 'Coastline Medical College',
    type: 'Medical college',
    cities: ['Mangaluru'],
    beds: 750,
    founded: 1995,
    accreditation: 'NMC recognised, 200 MBBS seats',
    about:
      'A teaching hospital and medical college with strong community medicine outreach across coastal Karnataka.',
  },
  {
    id: 'saffron',
    name: "Saffron Women's Hospital",
    type: "Women & children's hospital",
    cities: ['Jaipur', 'Ahmedabad'],
    beds: 160,
    founded: 2013,
    accreditation: 'NABH accredited',
    about:
      'Specialist care in obstetrics, gynaecology, IVF and neonatology, delivering more than 6,000 babies each year.',
  },
  {
    id: 'harbour-heart',
    name: 'Harbour Heart Institute',
    type: 'Heart institute',
    cities: ['Kolkata', 'Chennai'],
    beds: 240,
    founded: 2008,
    accreditation: 'NABH accredited',
    about:
      'A dedicated cardiac hospital with four cath labs, a cardiac surgery programme and a structural heart disease clinic.',
  },
  {
    id: 'clearview',
    name: 'Clearview Diagnostics',
    type: 'Diagnostic network',
    cities: ['Lucknow', 'Ahmedabad', 'Pune'],
    founded: 2010,
    accreditation: 'NABL accredited',
    about:
      'A diagnostic network of 60 collection centres and 9 imaging centres with 3T MRI, PET-CT and teleradiology reporting.',
  },
];

export const institutionById = Object.fromEntries(institutions.map((i) => [i.id, i])) as Record<
  string,
  Institution
>;
