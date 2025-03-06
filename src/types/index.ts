
export interface Building {
  id: string;
  name: string;
  description: string;
  location: {
    x: number;
    y: number;
  };
  occupancy: number;
  maxOccupancy: number;
  floors: Floor[];
  image?: string;
}

export interface Floor {
  id: string;
  name: string;
  studySpaces: StudySpace[];
}

export interface StudySpace {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  amenities: string[];
  isReservable: boolean;
  isAvailable: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  course: string;
  dateTime: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  createdBy: string;
  members: string[];
}

export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: string;
  course: string;
  createdAt: string;
  anonymous: boolean;
  resolved: boolean;
  answers: Answer[];
}

export interface Answer {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  isInstructor: boolean;
}

export interface FoodVendor {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  cuisineType: string;
  menu: MenuItem[];
  deliveryTime: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  isVegetarian: boolean;
  isAvailable: boolean;
}

export interface IncidentReport {
  id: string;
  type: string;
  description: string;
  location: string;
  dateTime: string;
  status: 'pending' | 'reviewing' | 'resolved';
  urgency: 'low' | 'medium' | 'high';
  anonymous: boolean;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  type: 'weather' | 'security' | 'health' | 'other';
  severity: 'info' | 'warning' | 'critical';
  dateTime: string;
  affectedAreas: string[];
  instructions: string;
}

export interface LibraryBook {
  id: string;
  rfidTag: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  location: string;
  isAvailable: boolean;
  dueDate?: string;
  coverImage?: string;
}
