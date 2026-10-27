import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  toggleCategory(id: string): void {
    const index = this.selectedCategories.indexOf(id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(id);
    }
  }

  onSubmit(): void {
    if (this.selectedCategories.length === 0) {
      alert('Please select at least one assistance category.');
      return;
    }
    if (!this.formData.fullName || !this.formData.phone || !this.formData.city || !this.formData.situation) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }
    if (!this.formData.consent) {
      alert('Please agree to the consent terms to proceed.');
      return;
    }
    alert('Help request submitted successfully. A case coordinator has received your notice.');
  }
}
