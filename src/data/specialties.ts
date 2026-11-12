import {
  Baby,
  Bone,
  Brain,
  GraduationCap,
  HeartPulse,
  Microscope,
  Ribbon,
  ScanLine,
  Siren,
  Stethoscope,
  Syringe,
  Venus,
} from 'lucide-react';
import { NurseCapIcon, type IconComponent } from '../components/ui/icons';

export type SpecialtyId =
  | 'cardiology'
  | 'general-medicine'
  | 'orthopaedics'
  | 'radiology'
  | 'paediatrics'
  | 'obstetrics-gynaecology'
  | 'anaesthesiology'
  | 'neurology'
  | 'emergency-medicine'
  | 'oncology'
  | 'nursing'
  | 'medical-faculty'
  | 'allied-health';

export interface Specialty {
  id: SpecialtyId;
  name: string;
  icon: IconComponent;
  /**
   * SAMPLE – specialists currently available to interview, shown to hospitals
   * on the home page directory. Replace with live candidate-pool numbers.
   */
  availableSpecialists: number;
}

export const specialties: Specialty[] = [
  { id: 'cardiology', name: 'Cardiology', icon: HeartPulse, availableSpecialists: 46 },
  { id: 'general-medicine', name: 'General medicine', icon: Stethoscope, availableSpecialists: 212 },
  { id: 'orthopaedics', name: 'Orthopaedics', icon: Bone, availableSpecialists: 58 },
  { id: 'radiology', name: 'Radiology', icon: ScanLine, availableSpecialists: 39 },
  { id: 'paediatrics', name: 'Paediatrics', icon: Baby, availableSpecialists: 64 },
  { id: 'obstetrics-gynaecology', name: 'Obstetrics & gynaecology', icon: Venus, availableSpecialists: 71 },
  { id: 'anaesthesiology', name: 'Anaesthesiology', icon: Syringe, availableSpecialists: 52 },
  { id: 'neurology', name: 'Neurology', icon: Brain, availableSpecialists: 23 },
  { id: 'emergency-medicine', name: 'Emergency medicine', icon: Siren, availableSpecialists: 48 },
  { id: 'oncology', name: 'Oncology', icon: Ribbon, availableSpecialists: 19 },
  { id: 'nursing', name: 'Nursing', icon: NurseCapIcon, availableSpecialists: 386 },
  { id: 'medical-faculty', name: 'Medical faculty', icon: GraduationCap, availableSpecialists: 94 },
  { id: 'allied-health', name: 'Allied health', icon: Microscope, availableSpecialists: 143 },
];

export const specialtyById = Object.fromEntries(specialties.map((s) => [s.id, s])) as Record<
  SpecialtyId,
  Specialty
>;
