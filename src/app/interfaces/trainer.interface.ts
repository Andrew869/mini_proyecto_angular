export interface Trainer {
    id: number;
    name: string;
    specialty: string;
    bio: string;
    image: string;
    experience: number;
    certifications: string[];
    socialMedia: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  }