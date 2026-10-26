import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Shelter {
  name: string;
  state: string;
  address: string;
  contact: string;
  link?: string;
  type?: string;
  services?: string[];
  note?: string;
}

@Component({
  selector: 'app-shelter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent {
  selectedState: string = 'Selangor';
  keyword: string = '';

  states: string[] = ['Johor', 'Pulau Pinang', 'Selangor', 'Kuala Lumpur'];

  shelters: Shelter[] = [
    // Kuala Lumpur
    {
      name: 'KL Homeless Shelter',
      state: 'Kuala Lumpur',
      address: 'Jalan Raja Laut, Kuala Lumpur',
      contact: '012-3456789',
      link: 'https://www.facebook.com/PusatTransitGelandanganKL/',
      type: 'Emergency Homeless Shelter',
      services: ['Emergency Housing', 'Transition Support', 'Social Reintegration']
    },
    {
      name: 'Yayasan Chow Kit',
      state: 'Kuala Lumpur',
      address: 'Jalan Belia, Kuala Lumpur',
      contact: '03-2602 0892',
      link: 'https://www.facebook.com/YayasanChowKit/',
      type: 'Children & Youth Support Centre',
      services: ['Child Protection', 'Youth Outreach', 'Family Support']
    },
    {
      name: 'Kechara Soup Kitchen',
      state: 'Kuala Lumpur',
      address: 'Jalan Barat Off Jalan Imbi, Kuala Lumpur',
      contact: '03-2141 6046',
      link: 'https://kecharasoupkitchen.com/contact-us/',
      type: 'Food Aid & Outreach Centre',
      services: ['Daily Meals', 'Grocery Aid', 'Volunteer Network'],
      note: 'Walk-in meal distribution'
    },

    // Selangor
    {
      name: 'Persatuan Rumah Caring Kajang',
      state: 'Selangor',
      address: 'Taman Cahaya, Kajang',
      contact: '012-3456789',
      link: 'https://www.facebook.com/PersatuanRumahCaringKajangSelangor/',
      type: 'Residential Care Home',
      services: ['Long-Term Care', 'Meals Provided', 'Daily Living Support']
    },
    {
      name: 'Pusat Jagaan Baitul Amal',
      state: 'Selangor',
      address: 'Seksyen 14, Petaling Jaya',
      contact: '03-7960 9757',
      link: 'https://www.facebook.com/p/Pusat-jagaan-baitul-hidayah-100064928700521/',
      type: 'Residential Care Home',
      services: ['Residential Care', 'Meals Provided', 'Community Support']
    },
    {
      name: 'Pusat Jagaan Al-Fikrah',
      state: 'Selangor',
      address: 'Jalan Cheras, Kajang',
      contact: '03-8733 0715',
      link: 'https://www.facebook.com/alfikrahmas/?locale=ms_MY',
      type: 'Residential Care Home',
      services: ['Residential Care', 'Nursing Support', 'Meals Provided']
    },

    // Johor
    {
      name: 'Johor Care Home',
      state: 'Johor',
      address: 'Jalan Tebrau, Johor Bahru',
      contact: '019-8882233',
      link: 'https://www.facebook.com/johorcarehome/',
      type: 'Residential Care Home',
      services: ['Residential Care', 'Daily Living Support', 'Community Support']
    },
    {
      name: 'Pusat Kebajikan Kalvari Johor',
      state: 'Johor',
      address: 'Taman Sutera, Johor Bahru',
      contact: '019-8882233',
      link: 'https://pkk.com.my/',
      type: 'Welfare Care Home',
      services: ['Welfare Support', 'Community Outreach', 'Volunteer Opportunities']
    },
    {
      name: 'Pusat Jagaan Impian Syimah',
      state: 'Johor',
      address: 'Taman Sutera, Johor Bahru',
      contact: '013-750 7134',
      link: 'https://www.facebook.com/PusatJagaanImpianSyimah/',
      type: 'Residential Care Home',
      services: ['Residential Care', 'Family Support', 'Meals Provided']
    },

    // Pulau Pinang
    {
      name: 'Penang Community Shelter',
      state: 'Pulau Pinang',
      address: 'Lebuh Pantai, George Town',
      contact: '016-5544332',
      link: 'https://www.facebook.com/PenangCommunityShelter/',
      type: 'Community Shelter',
      services: ['Emergency Housing', 'Community Support', 'Street Outreach']
    },
    {
      name: 'Rumah Kebajikan Seri Cahaya',
      state: 'Pulau Pinang',
      address: 'Bayan Lepas, Pulau Pinang',
      contact: '04-626 5101',
      link: 'https://rumahkebajikansericahaya.com/',
      type: 'Welfare Care Home',
      services: ['Residential Care', 'Meals Provided', 'Daily Living Support']
    },
    {
      name: 'Pusat Jagaan St.Joseph',
      state: 'Pulau Pinang',
      address: 'Georgetown, Pulau Pinang',
      contact: '04-263 5419',
      link: 'https://www.stjosephpg.com/',
      type: 'Residential Care Home',
      services: ['Residential Care', 'Senior Support', 'Meals Provided']
    }
  ];

  /** Shelter icons cycled across the result cards. */
  private readonly icons = [
    'roofing',
    'cottage',
    'home_health',
    'child_care',
    'shield_person',
    'food_bank'
  ];

  get filteredShelters(): Shelter[] {
    const term = this.keyword.trim().toLowerCase();

    return this.shelters.filter((shelter) => {
      const matchesState =
        !this.selectedState || shelter.state === this.selectedState;

      if (!matchesState) return false;
      if (!term) return true;

      const haystack = [
        shelter.name,
        shelter.address,
        shelter.state,
        shelter.type || '',
        ...(shelter.services || [])
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }

  stateCount(state: string): number {
    return this.shelters.filter((shelter) => shelter.state === state).length;
  }

  shelterIcon(index: number): string {
    return this.icons[index % this.icons.length];
  }

  updateResults(): void {
    this.keyword = this.keyword.trim();
  }

  clearFilters(): void {
    this.selectedState = '';
    this.keyword = '';
  }

  telHref(contact: string): string {
    return `tel:${String(contact || '').replace(/[^+\d]/g, '')}`;
  }

  displayLink(link: string): string {
    const clean = String(link || '')
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
    return clean.length > 44 ? `${clean.slice(0, 44)}…` : clean;
  }
}
