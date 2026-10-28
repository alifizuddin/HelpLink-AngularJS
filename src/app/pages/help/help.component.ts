import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HelpService } from '../../services/help.service';

interface HelpCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface UrgencyOption {
  id: string;
  label: string;
  sublabel: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  categories: HelpCategory[] = [
    { id: 'food', label: 'Food & Groceries', icon: 'soup_kitchen', description: 'Emergency food baskets, community kitchen' },
    { id: 'shelter', label: 'Safe Shelter & Housing', icon: 'cottage', description: 'Immediate transit bed, family refuge' },
    { id: 'jobs', label: 'Youth Job & Skills Placement', icon: 'work', description: 'Job coaching, urgent income, apprenticeships' },
    { id: 'family', label: 'Family & Child Welfare', icon: 'family_restroom', description: 'School assistance, infant formula, diapers' },
    { id: 'health', label: 'Healthcare & Elderly Support', icon: 'medication', description: 'Medication subsidy, mobility gear, checkups' },
    { id: 'other', label: 'Other Urgent Need', icon: 'help_outline', description: 'Legal aid, document recovery, translation' }
  ];

  selectedCategories: string[] = ['food'];

  urgencyOptions: UrgencyOption[] = [
    { id: 'standard', label: 'Standard', sublabel: 'Within 48 hours' },
    { id: 'urgent', label: 'Urgent', sublabel: 'Within 24 hours' },
    { id: 'crisis', label: 'Immediate Crisis', sublabel: 'Tonight / Urgent safety' }
  ];

  urgency: string = 'urgent';

  formData = {
    fullName: '',
    phone: '',
    email: '',
    contactMethod: 'whatsapp',
    language: 'bm',
    state: 'selangor',
    city: '',
    situation: '',
    consent: false
  };

  languages = [
    { id: 'bm', label: 'Bahasa Melayu' },
    { id: 'en', label: 'English' },
    { id: 'zh', label: '中文 (Mandarin)' },
    { id: 'ta', label: 'தமிழ் (Tamil)' }
  ];

  states = [
    { id: 'selangor', label: 'Selangor' },
    { id: 'kl', label: 'Kuala Lumpur' },
    { id: 'penang', label: 'Penang' },
    { id: 'johor', label: 'Johor' },
    { id: 'perak', label: 'Perak' },
    { id: 'sabah', label: 'Sabah' },
    { id: 'sarawak', label: 'Sarawak' },
    { id: 'other_state', label: 'Other States' }
  ];

  contactMethods = [
    { id: 'whatsapp', label: 'WhatsApp (Fastest response)' },
    { id: 'phone', label: 'Direct Phone Call' },
    { id: 'sms', label: 'SMS Text' },
    { id: 'email', label: 'Email' }
  ];

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  submitMessage = '';

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' = 'success';

  constructor(private helpService: HelpService) {}

  openModal(title: string, message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  toggleCategory(id: string): void {
    const index = this.selectedCategories.indexOf(id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(id);
    }
  }

  onSubmit(): void {
    this.submitStatus = 'idle';
    this.submitMessage = '';

    if (this.selectedCategories.length === 0) {
      this.openModal('Validation Error', 'Please select at least one assistance category.', 'error');
      return;
    }
    if (!this.formData.fullName || !this.formData.phone || !this.formData.city || !this.formData.situation) {
      this.openModal('Validation Error', 'Please fill in all required fields (marked with *).', 'error');
      return;
    }
    if (!this.formData.consent) {
      this.openModal('Validation Error', 'Please agree to the consent terms to proceed.', 'error');
      return;
    }

    this.isSubmitting = true;
    const request = {
      selectedCategories: this.selectedCategories,
      urgency: this.urgency,
      formData: { ...this.formData }
    };

    this.helpService.submitHelpRequest(request).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitStatus = 'success';
        this.submitMessage = 'Help request submitted successfully. A case coordinator has received your notice.';
        this.openModal('Request Submitted', this.submitMessage, 'success');
        // Optionally reset form
        this.formData = {
          fullName: '',
          phone: '',
          email: '',
          contactMethod: 'whatsapp',
          language: 'bm',
          state: 'selangor',
          city: '',
          situation: '',
          consent: false
        };
        this.selectedCategories = ['food'];
        this.urgency = 'urgent';
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitStatus = 'error';
        this.submitMessage = 'Failed to submit help request. Please try again or contact support.';
        this.openModal('Submission Failed', this.submitMessage, 'error');
      }
    });
  }
}
