export enum ComponentType {
  BEWEGINGSVAARDIGHEDEN = 'Bewegingsvaardigheden',
  MOTORIEK = 'Motoriek',
  SPEELGEDRAG = 'Speelgedrag',
  SPORTPARTICIPATIE = 'Sportparticipatie'
}

export enum LevelColor {
  PURPLE = 'bg-fuchsia-800 text-white', // Niveau 1
  YELLOW = 'bg-yellow-300 text-yellow-900', // Niveau 2
  GREEN = 'bg-emerald-500 text-white', // Niveau 3
  BLUE = 'bg-cyan-500 text-white', // Niveau 4
  GRAY = 'bg-gray-100 text-gray-500' // Niet behaald
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  group: string; // e.g., "Groep 5"
  parnassysId?: string;
}

export interface LevelDescription {
  level: 1 | 2 | 3 | 4;
  description: string;
  criteria?: string[];
}

export interface Skill {
  id: string;
  name: string; // Dit is de "Leerlijn" (bijv. Handstand)
  domain: string; // "Beweegdomein" (bijv. Turnen)
  theme: string; // "Bewegingsthema" (bijv. Balanceren)
  groupCategory: '3-4' | '5-6' | '7-8' | 'All';
  levels: LevelDescription[];
  mediaUrl?: string; // URL to uploaded image/video
  mediaType?: 'image' | 'video';
}

export interface MotorScore {
  studentId: string;
  testName: string; // e.g. "Shuttle Run"
  value: string; // e.g. "8.5" or "12 trappen"
  date: string;
}

export interface BehaviorObservation {
  studentId: string;
  aspect: string; // e.g. "Samenwerken", "Fair Play"
  level: 1 | 2 | 3 | 4;
  note?: string;
}

export interface SportParticipationEntry {
  studentId: string;
  hasSwimmingDiploma: boolean;
  sportClub?: string; // e.g. "Voetbal"
  clubName?: string; // e.g. "FC Lisse"
  frequency?: string; // e.g. "2x per week"
}

export interface SkillProgress {
  studentId: string;
  skillId: string;
  level: 0 | 1 | 2 | 3 | 4; // 0 = not started
  lastUpdated: string;
}

export interface ParnassysImportData {
  fileName: string;
  studentCount: number;
  status: 'success' | 'error' | 'pending';
}