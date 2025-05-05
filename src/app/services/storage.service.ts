import { Injectable } from '@angular/core';
import { ContactForm } from '../interfaces/contact-form.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TEMPLATE_FORM_KEY = 'contactFormData';
  private readonly REACTIVE_FORM_KEY = 'membershipFormData';

  saveContactForm(data: ContactForm): void {
    const existingData = this.getContactForms();
    existingData.push(data);
    localStorage.setItem(this.TEMPLATE_FORM_KEY, JSON.stringify(existingData));
  }

  getContactForms(): ContactForm[] {
    const data = localStorage.getItem(this.TEMPLATE_FORM_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveMembershipForm(data: any): void {
    const existingData = this.getMembershipForms();
    existingData.push(data);
    localStorage.setItem(this.REACTIVE_FORM_KEY, JSON.stringify(existingData));
  }

  getMembershipForms(): any[] {
    const data = localStorage.getItem(this.REACTIVE_FORM_KEY);
    return data ? JSON.parse(data) : [];
  }

  deleteContactForm(index: number): void {
    const existingData = this.getContactForms();
    existingData.splice(index, 1);
    localStorage.setItem(this.TEMPLATE_FORM_KEY, JSON.stringify(existingData));
  }

  deleteMembershipForm(index: number): void {
    const existingData = this.getMembershipForms();
    existingData.splice(index, 1);
    localStorage.setItem(this.REACTIVE_FORM_KEY, JSON.stringify(existingData));
  }

  updateContactForm(index: number, updatedData: ContactForm): void {
    const existingData = this.getContactForms();
    existingData[index] = updatedData;
    localStorage.setItem(this.TEMPLATE_FORM_KEY, JSON.stringify(existingData));
  }

  updateMembershipForm(index: number, updatedData: any): void {
    const existingData = this.getMembershipForms();
    existingData[index] = updatedData;
    localStorage.setItem(this.REACTIVE_FORM_KEY, JSON.stringify(existingData));
  }
}