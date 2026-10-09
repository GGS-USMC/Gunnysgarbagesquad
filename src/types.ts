export interface HoaQuoteFormData {
  name: string;
  hoaName: string;
  email: string;
  phone: string;
  city: string;
  approxHomes: string;
  frequency?: string;
  message: string;
}

export interface ResidentRequestFormData {
  residentName: string;
  communityName: string;
  email: string;
  phone: string;
  city: string;
  zipCode: string;
  hoaBoardContact?: string;
  notes?: string;
}

export interface CityServiceInfo {
  name: string;
  county: string;
  status: 'Active' | 'Expanding' | 'Accepting Requests';
  zipCodes: string[];
  description: string;
  popularCommunities: string[];
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyGunnyCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'HOA Boards' | 'Residents' | 'Operations';
}
