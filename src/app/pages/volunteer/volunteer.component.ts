import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VolunteerService } from '../../services/volunteer.service';

interface VolunteerInterest {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface CommitmentOption {
  id: string;
  label: string;
  sublabel: string;
}

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {
  interests: VolunteerInterest[] = [
    { id: 'foodbank', label: 'Food Bank & Logistics', icon: 'local_shipping', description: 'Sorting parcels, cold-chain packing & distribution.' },
    { id: 'mentorship', label: 'Youth Mentorship & Tutoring', icon: 'school', description: 'STEM coaching, exam support, and career guidance.' },
    { id: 'skills', label: 'Skill Training & Workshops', icon: 'handyman', description: 'Sewing, crafts, micro-entrepreneurship & culinary skills.' },
    { id: 'shelter', label: 'Shelter Support & Senior Care', icon: 'night_shelter', description: 'Onsite shelter assistance, companionship & meals.' },
    { id: 'translation', label: 'Translation & Casework', icon: 'translate', description: 'Malay, English, Tamil, Mandarin & indigenous dialects.' },
    { id: 'digital', label: 'Digital, Admin & IT Support', icon: 'devices', description: 'Portal updates, intake form digitization & social media.' }
  ];

  selectedInterests: string[] = ['foodbank', 'mentorship'];

  commitments: CommitmentOption[] = [
    { id: 'weekly', label: 'Weekly Commitment', sublabel: '4-8 hrs / week' },
    { id: 'biweekly', label: 'Bi-Weekly', sublabel: '2-4 hrs / fortnight' },
    { id: 'monthly', label: 'Monthly Events', sublabel: 'Weekend drives' },
    { id: 'ondemand', label: 'On-Demand', sublabel: 'Emergency Relief' }
  ];

  commitment: string = 'weekly';

  shifts = {
    weekdayMorning: true,
    weekdayAfternoon: false,
    weekendFullDay: true,
    eveningsRemote: true
  };

  formData = {
    fullName: '',
    email: '',
    phone: '',
    state: 'selangor',
    district: '',
    motivation: '',
    consent: false
  };

  states = [
    { id: 'selangor', label: 'Selangor' },
    { id: 'kl', label: 'Kuala Lumpur' },
    { id: 'penang', label: 'Penang' },
    { id: 'johor', label: 'Johor' },
    { id: 'perak', label: 'Perak' },
    { id: 'pahang', label: 'Pahang' },
    { id: 'sabah', label: 'Sabah' },
    { id: 'sarawak', label: 'Sarawak' }
  ];

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  submitMessage = '';

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' = 'success';

  constructor(private volunteerService: VolunteerService) {}

  openModal(title: string, message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  toggleInterest(id: string): void {
    const index = this.selectedInterests.indexOf(id);
    if (index > -1) {
      this.selectedInterests.splice(index, 1);
    } else {
      this.selectedInterests.push(id);
    }
  }

  onSubmit(): void {
    this.submitStatus = 'idle';
    this.submitMessage = '';

    if (this.selectedInterests.length === 0) {
      this.openModal('Validation Error', 'Please select at least one area of interest.', 'error');
      return;
    }
    if (!this.formData.fullName || !this.formData.email || !this.formData.phone || !this.formData.district) {
      this.openModal('Validation Error', 'Please fill in all required fields (marked with *).', 'error');
      return;
    }
    if (!this.formData.consent) {
      this.openModal('Validation Error', 'Please agree to the Volunteer Code of Conduct to proceed.', 'error');
      return;
    }

    this.isSubmitting = true;
    const application = {
      selectedInterests: this.selectedInterests,
      commitment: this.commitment,
      shifts: { ...this.shifts },
      formData: { ...this.formData }
    };

    this.volunteerService.submitVolunteerApplication(application).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitStatus = 'success';
        this.submitMessage = 'Volunteer application submitted successfully. Our coordinator will contact you within 48 hours.';
        this.openModal('Application Submitted', this.submitMessage, 'success');
        // Reset form
        this.formData = {
          fullName: '',
          email: '',
          phone: '',
          state: 'selangor',
          district: '',
          motivation: '',
          consent: false
        };
        this.selectedInterests = ['foodbank', 'mentorship'];
        this.commitment = 'weekly';
        this.shifts = {
          weekdayMorning: true,
          weekdayAfternoon: false,
          weekendFullDay: true,
          eveningsRemote: true
        };
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitStatus = 'error';
        this.submitMessage = 'Failed to submit volunteer application. Please try again or contact support.';
        this.openModal('Submission Failed', this.submitMessage, 'error');
      }
    });
  }
}
