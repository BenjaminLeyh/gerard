// Mock data for the premium pet collar app - All text in French
import petAvatarImage from '@/assets/pet-avatar.jpg';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  species: 'dog' | 'cat';
  age: number;
  weight: number;
  avatar: string;
  status: 'healthy' | 'active' | 'resting' | 'alert';
  collarBattery: number;
  collarColor: string;
}

export interface HealthMetrics {
  heartRate: number;
  heartRateMin: number;
  heartRateMax: number;
  respiratoryRate: number;
  temperature: number;
  steps: number;
  stepsGoal: number;
  calories: number;
  caloriesGoal: number;
  distance: number;
  activeMinutes: number;
  activeMinutesGoal: number;
  sleepHours: number;
  sleepQuality: number;
}

export interface BehaviorData {
  stressLevel: number;
  barkingFrequency: number;
  activityLevel: 'low' | 'moderate' | 'high';
  mood: 'calm' | 'happy' | 'anxious' | 'excited';
  lastBarkTime: string;
  unusualBehavior: boolean;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  isInSafeZone: boolean;
  lastUpdate: string;
}

export interface Alert {
  id: string;
  type: 'health' | 'location' | 'behavior';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const pet: Pet = {
  id: '1',
  name: 'Luna',
  breed: 'Golden Retriever',
  species: 'dog',
  age: 3,
  weight: 28,
  avatar: petAvatarImage,
  status: 'healthy',
  collarBattery: 78,
  collarColor: '#0A84FF',
};

export const healthMetrics: HealthMetrics = {
  heartRate: 85,
  heartRateMin: 62,
  heartRateMax: 142,
  respiratoryRate: 24,
  temperature: 38.5,
  steps: 8420,
  stepsGoal: 10000,
  calories: 245,
  caloriesGoal: 350,
  distance: 4.2,
  activeMinutes: 48,
  activeMinutesGoal: 60,
  sleepHours: 10.5,
  sleepQuality: 87,
};

export const behaviorData: BehaviorData = {
  stressLevel: 15,
  barkingFrequency: 12,
  activityLevel: 'moderate',
  mood: 'happy',
  lastBarkTime: 'Il y a 2h',
  unusualBehavior: false,
};

export const locationData: LocationData = {
  latitude: 48.8566,
  longitude: 2.3522,
  address: '15 Rue de la Paix, Paris',
  isInSafeZone: true,
  lastUpdate: 'À l\'instant',
};

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'health',
    severity: 'info',
    title: 'Objectif atteint !',
    message: 'Luna a atteint 80% de son objectif d\'activité quotidien',
    time: 'Il y a 30 min',
    read: false,
  },
];

export const heartRateHistory = [
  { time: '00:00', value: 68 },
  { time: '04:00', value: 62 },
  { time: '08:00', value: 78 },
  { time: '12:00', value: 95 },
  { time: '16:00', value: 88 },
  { time: '20:00', value: 85 },
  { time: '23:59', value: 72 },
];

export const weeklyHeartRate = [
  { day: 'Lun', avg: 78, min: 58, max: 125 },
  { day: 'Mar', avg: 82, min: 60, max: 132 },
  { day: 'Mer', avg: 75, min: 55, max: 118 },
  { day: 'Jeu', avg: 80, min: 62, max: 128 },
  { day: 'Ven', avg: 85, min: 65, max: 142 },
  { day: 'Sam', avg: 88, min: 68, max: 145 },
  { day: 'Dim', avg: 76, min: 58, max: 120 },
];

export const sleepData = [
  { phase: 'Léger', hours: 4.5, color: '#5AC8FA' },
  { phase: 'Profond', hours: 4.0, color: '#007AFF' },
  { phase: 'REM', hours: 2.0, color: '#5856D6' },
];

export const activityHistory = [
  { day: 'Lun', steps: 9200, calories: 280 },
  { day: 'Mar', steps: 7800, calories: 230 },
  { day: 'Mer', steps: 10500, calories: 320 },
  { day: 'Jeu', steps: 8900, calories: 265 },
  { day: 'Ven', steps: 11200, calories: 340 },
  { day: 'Sam', steps: 12500, calories: 380 },
  { day: 'Dim', steps: 6500, calories: 195 },
];

export const behaviorEvents = [
  { time: '08:30', event: 'Réveil actif', type: 'activity' },
  { time: '10:15', event: 'Aboiement (visiteur)', type: 'bark' },
  { time: '12:00', event: 'Sieste', type: 'sleep' },
  { time: '14:30', event: 'Promenade', type: 'walk' },
  { time: '16:45', event: 'Jeu actif', type: 'play' },
  { time: '18:00', event: 'Repas', type: 'meal' },
];

export const stressHistory = [
  { time: '06:00', level: 10 },
  { time: '09:00', level: 25 },
  { time: '12:00', level: 15 },
  { time: '15:00', level: 30 },
  { time: '18:00', level: 20 },
  { time: '21:00', level: 12 },
];

export const safeZones = [
  { id: '1', name: 'Maison', radius: 50, latitude: 48.8566, longitude: 2.3522, active: true },
  { id: '2', name: 'Parc du quartier', radius: 100, latitude: 48.8600, longitude: 2.3550, active: true },
  { id: '3', name: 'Vétérinaire', radius: 30, latitude: 48.8520, longitude: 2.3480, active: false },
];

export const locationHistory = [
  { time: '08:00', lat: 48.8566, lng: 2.3522 },
  { time: '10:00', lat: 48.8580, lng: 2.3540 },
  { time: '12:00', lat: 48.8600, lng: 2.3550 },
  { time: '14:00', lat: 48.8590, lng: 2.3535 },
  { time: '16:00', lat: 48.8570, lng: 2.3525 },
  { time: '18:00', lat: 48.8566, lng: 2.3522 },
];

export const healthTips = [
  {
    id: '1',
    title: 'Hydratation',
    tip: 'Assurez-vous que Luna a toujours accès à de l\'eau fraîche, surtout après l\'exercice.',
    icon: '💧',
  },
  {
    id: '2',
    title: 'Activité recommandée',
    tip: 'Encore 1 580 pas pour atteindre l\'objectif quotidien. Une courte promenade suffirait !',
    icon: '🏃',
  },
  {
    id: '3',
    title: 'Sommeil optimal',
    tip: 'Luna a bien dormi cette nuit. Maintenez cette routine pour son bien-être.',
    icon: '😴',
  },
];

export const statusLabels: Record<Pet['status'], string> = {
  healthy: 'En bonne santé',
  active: 'Actif',
  resting: 'Au repos',
  alert: 'Alerte',
};

export const moodLabels: Record<BehaviorData['mood'], string> = {
  calm: 'Calme',
  happy: 'Joyeux',
  anxious: 'Anxieux',
  excited: 'Excité',
};

export const activityLabels: Record<BehaviorData['activityLevel'], string> = {
  low: 'Faible',
  moderate: 'Modéré',
  high: 'Élevé',
};
