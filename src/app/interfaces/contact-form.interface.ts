export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    preferredDate: Date;
    membershipOptions: string[];
    message: string;
  }
  
  export interface Membership {
    id: number;
    name: string;
    price: number;
  }