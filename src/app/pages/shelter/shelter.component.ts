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

  states: string[] = ['Johor', 'Pulau Pinang', 'Selangor', 'Kuala Lumpur', 'Melaka', 'Kelantan', 'Pahang', 'Sabah', 'Sarawak'];

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
    name: 'Anjung Kembara, Pusat Transit Gelandangan Kuala Lumpur',
    state: 'Kuala Lumpur',
    address: '20, Jalan Pahang, Titiwangsa Sentral, 53000 Kuala Lumpur',
    contact: '016-747 0797',
    link: 'https://www.google.com/maps/search/?api=1&query=Anjung+Kembara+Kuala+Lumpur',
    type: 'Homeless Shelter',
    services: [
      'Temporary Accommodation',
      'Meals Provided',
      'Skills Training',
      'Job Placement Assistance',
      'Personal Development Programmes'
    ]
  },
  {
    name: 'Rumah Kasih Charity Home Kuala Lumpur',
    state: 'Kuala Lumpur',
    address: '773, Lot 222, Jalan Umbun 2, Taman Setapak, 53000 Kuala Lumpur',
    contact: '013-393 4868',
    link: 'https://rumahkasih.org/contact/',
    type: 'Residential Care Home',
    services: [
      'Residential Care',
      'Homeless Support',
      'Elderly Care',
      'Support for Abandoned Patients'
    ]
  },
  {
    name: 'Ti-Ratana Welfare Society',
    state: 'Kuala Lumpur',
    address: 'Lot 16106, Jalan 13B, Salak South Baru, Desa Petaling, 57100 Kuala Lumpur',
    contact: '03-7988 1818',
    link: 'https://www.ti-ratana.org.my/',
    type: 'Community Welfare Home',
    services: [
      'Residential Care',
      'Children Support',
      'Elderly Care',
      'Women Support',
      'Community Welfare Programmes'
    ]
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
    //Pahang
    {
    name: 'Pertubuhan Kebajikan Baitul Husna Kuantan',
    state: 'Pahang',
    address: 'Lot 132, Kampung Pelindung, 26100 Kuantan, Pahang',
    contact: '019-915 1946',
    link: 'https://www.google.com/maps/search/?api=1&query=Pertubuhan+Kebajikan+Baitul+Husna+Kuantan',
    type: 'Orphanage and Welfare Home',
    services: [
      'Residential Care',
      'Orphan Support',
      'Support for Underprivileged Children',
      'Basic Needs Assistance'
    ]
  },
  {
    name: 'Rapha Children’s Home',
    state: 'Pahang',
    address: '1, Jalan Air Putih 3, Taman Indera, 25300 Kuantan, Pahang',
    contact: '013-901 1788',
    link: 'https://www.google.com/maps/search/?api=1&query=Rapha+Children%27s+Home+Kuantan',
    type: 'Children’s Residential Care Home',
    services: [
      'Residential Care',
      'Child Protection',
      'Daily Living Support',
      'Welfare Assistance'
    ]
  },
  {
    name: 'Pertubuhan Pengurusan Rumah Kebajikan Warga Emas Sang Riang',
    state: 'Pahang',
    address: 'No. 2-13, Jalan Warga Emas, 28300 Triang, Pahang',
    contact: '09-250 5379',
    link: 'https://sangriang.org.my/en',
    type: 'Elderly Welfare Home',
    services: [
      'Residential Elderly Care',
      'Daily Living Assistance',
      'Dialysis Services',
      'Counselling and Welfare Support'
    ]
  },
  {
    name: 'Rumah Perlindungan Jagaan dan Rawatan Casa Femina',
    state: 'Pahang',
    address: 'A2654B, Jalan Tok Sira, Taman Tok Sira, 25050 Kuantan, Pahang',
    contact: '09-514 5575',
    link: 'https://www.google.com/maps/search/?api=1&query=Casa+Femina+Kuantan+Pahang',
    type: 'Women’s Protection and Rehabilitation Shelter',
    services: [
      'Temporary Shelter',
      'Rehabilitation Support',
      'Women’s Welfare',
      'Health and Psychosocial Support'
    ]
  },
  {
    name: 'Pertubuhan Anak-Anak Yatim dan Kebajikan Darul Izzah',
    state: 'Pahang',
    address: 'Lot 901, Simpang Telok, KM 4, Jalan Maran-Temerloh, 28000 Temerloh, Pahang',
    contact: '09-297 1277',
    link: 'https://www.google.com/maps/search/?api=1&query=Pertubuhan+Anak-Anak+Yatim+dan+Kebajikan+Darul+Izzah+Temerloh',
    type: 'Orphanage and Welfare Home',
    services: [
      'Residential Care',
      'Orphan Support',
      'Education Assistance',
      'Daily Living Support'
    ]
  },
  //Sabah and Sarawak
  {
    name: 'Caring For The Future Malaysia (CFFM)',
    state: 'Sabah',
    address: 'Mile 8, Jalan Ulu Kimanis, Kampung Lingan Baru, 89608 Papar, Sabah',
    contact: '013-802 3547',
    link: 'https://www.cffmalaysia.org/home/contact-us',
    type: 'Children’s Residential Welfare Home',
    services: [
      'Residential Care',
      'Orphan Support',
      'Child Protection',
      'Education Assistance',
      'Healthcare Support',
      'Vocational Training'
    ]
  },
  {
    name: 'Pusat Jagaan Seri Murni (Good Shepherd Services)',
    state: 'Sabah',
    address: 'Rumah 37, Jalan Tebrau, Taman Friendly, 88763 Kota Kinabalu, Sabah',
    contact: '088-237 575',
    link: 'https://www.google.com/maps/search/?api=1&query=Pusat+Jagaan+Seri+Murni+Kota+Kinabalu',
    type: 'Women’s Crisis Shelter',
    services: [
      'Temporary Shelter',
      'Women’s Support',
      'Crisis Intervention',
      'Support for Vulnerable Women and Girls'
    ]
  },
  {
    name: 'Anjung Singgah Kuching',
    state: 'Sarawak',
    address: 'Lot 289, Lorong 9, Jalan Rubber Satok, 93400 Kuching, Sarawak',
    contact: '082-233 098',
    link: 'https://www.google.com/maps/search/?api=1&query=Anjung+Singgah+Kuching',
    type: 'Homeless Transit Shelter',
    services: [
      'Temporary Accommodation',
      'Meals Provided',
      'Social Welfare Support',
      'Employment and Reintegration Assistance'
    ]
  },
  {
    name: 'The Salvation Army Community Complex',
    state: 'Sarawak',
    address: 'Block 26, Muara Tuang Land District, Kampung Sungai Jernang Baru, 94300 Kota Samarahan, Sarawak',
    contact: '082-502 215',
    link: 'https://www.salvationarmy.org.my/',
    type: 'Children’s Residential Care Home',
    services: [
      'Residential Care',
      'Child Protection',
      'Education Support',
      'Daily Living Assistance',
      'Youth Development'
    ]
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
    {
      name: 'Grace Community Services',
      state: 'Selangor',
      address: 'Klang, Selangor',
      contact: '03-3341 4044',
      link: 'http://www.gracecommunityservices.my/',
      type: 'Homeless Shelter',
      services: ['Residential Care', 'Nursing Support', 'Meals Provided']
    },
    {
      name: 'Pusat Jagaan Kanak-Kanak Ekliptik Klang (PJKKEK)',
      state: 'Selangor',
      address: 'Klang, Selangor',
      contact: '03-3165 4312',
      link: 'https://www.facebook.com/ekliptikchildren/',
      type: 'Residential Care Home',
      services: ['Residential Care', 'Nursing Support', 'Community Support']
    },
    {
      name: 'Yi Xing USJ Old Folks Home',
      state: 'Selangor',
      address: 'USJ2, Subang Jaya',
      contact: '011-1146 6757',
      link: 'https://yixingusj.org/',
      type: 'Old Folks Home',
      services: ['Residential Care', 'Nursing Support', 'Community Support']
    },
    //Melaka
    {
    name: 'Pertubuhan Kebajikan Villa Harapan',
    state: 'Melaka',
    address: '1212-2, Jalan Tebing Tinggi, 75460 Duyong, Melaka',
    contact: '06-267 2820',
    link: 'https://www.villaharapanmelaka.com/',
    type: 'Residential Welfare Shelter',
    services: [
      'Residential Care',
      'Shelter and Protection',
      'Support for Homeless Individuals',
      'Care for People with Mental Disabilities'
    ]
  },
  {
    name: 'Pusat Jagaan Rumah Cahaya, The Salvation Army',
    state: 'Melaka',
    address: '321, Jalan Parameswara, 75000 Melaka',
    contact: '06-283 1203',
    link: 'https://my.salvationarmy.org/malaysia/Melakacommunityservices',
    type: 'Community Care Centre',
    services: [
      'Special Needs Care',
      'Community Support',
      'Educational Services',
      'Life Skills Training'
    ]
  },
  {
    name: 'Pertubuhan Kebajikan Bhagawan Sri Ramakrishna Malaysia',
    state: 'Melaka',
    address: '451, Jalan Tengkera, 75200 Melaka',
    contact: '06-284 3236',
    link: 'https://www.google.com/maps/search/?api=1&query=Pertubuhan+Kebajikan+Bhagawan+Sri+Ramakrishna+Malaysia+Melaka',
    type: 'Residential Welfare Home',
    services: [
      'Residential Care',
      'Children Support',
      'Education Assistance',
      'Medical Support',
      'Daily Living Support'
    ]
  },
  //Kelantan
  {
    name: 'Yayasan Kebajikan Anak-Anak Yatim Kelantan (YAATIM)',
    state: 'Kelantan',
    address: 'No. 1, Taman Sabariah, Jalan Pengkalan Chepa, 15400 Kota Bharu, Kelantan',
    contact: '09-773 5494',
    link: 'https://www.google.com/maps/search/?api=1&query=Yayasan+Kebajikan+Anak-Anak+Yatim+Kelantan',
    type: 'Orphanage and Welfare Home',
    services: [
      'Residential Care',
      'Orphan Support',
      'Education Assistance',
      'Daily Living Support'
    ]
  },
  {
    name: 'Pusat Jagaan Warga Emas Ummi Zainab',
    state: 'Kelantan',
    address: 'S/45, Lot 1431, Taman Telok Panji, Jalan Telok Panji, 16100 Kota Bharu, Kelantan',
    contact: '012-981 8136 / 013-939 3553',
    link: 'https://seniorceria.com/en/senior-listing/pusat-jagaan-warga-emas-ummi-zainab/',
    type: 'Residential Elderly Care Home',
    services: [
      'Residential Care',
      '24-Hour Care',
      'Respite Care',
      'Assisted Living'
    ]
  },
  {
    name: 'Rumah Seri Kenangan Taman Kemumin',
    state: 'Kelantan',
    address: 'Jalan 14/44, Taman Kemumin, 16100 Pengkalan Chepa, Kelantan',
    contact: '09-773 8388',
    link: 'https://wargaemas.jkm.gov.my/portal/article?category=AK01&id=9020c916-3a23-4371-b46b-d30f310316f2&parent_id=97a9e705-fef3-4287-81b4-441a84915acb',
    type: 'Government Residential Welfare Home',
    services: [
      'Residential Care',
      'Elderly Protection',
      'Daily Living Assistance',
      'Social Welfare Support'
    ]
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
    {
      name: 'Homeless Shelter YKN',
      state: 'Johor',
      address: 'Jalan Sengget, Johor Bahru',
      contact: '07-221 3349',
      link: 'https://www.google.com/maps?vet=10CAAQoqAOahcKEwjoqsum3tmXAxUAAAAAHQAAAAAQCA..i&sca_esv=06eb4749832549b6&udm&fvr=1&pvq=Cg0vZy8xMWJ2dnhtNXkyIg0KB3NoZWx0ZXIQAhgD&lqi=ChBzaGVsdGVyIGluIGpvaG9yIgPwAQFIoq-mruuqgIAIWh4QABgAGAIiEHNoZWx0ZXIgaW4gam9ob3IqBAgDEACSARBob21lbGVzc19zaGVsdGVy&cs=1&um=1&ie=UTF-8&fb=1&gl=my&sa=X&geocode=KU0RpPPnEtoxMfZU53MG39Gd&daddr=2+%26+3,+Jalan+Segget,+Bangunan+MCA,+80000+Johor+Bahru,+Johor+Darul+Ta%27zim',
      type: 'Homeless Shelter',
      services: ['Emergency Housing', 'Community Support', 'Street Outreach']
    },
    {
      name: 'Pertubuhan Kebajikan Shan De Johor Bahru',
      state: 'Johor',
      address: 'Taman Sri Tebrau, Johor Bahru',
      contact: '07-333 3211',
      link: 'https://www.facebook.com/PertubuhanKebajikanShanDe/',
      type: 'Orphanage',
      services: ['Orphan Care', 'Community Support', 'Street Outreach']
    },
    {
      name: 'Exodus Shelter Home',
      state: 'Johor',
      address: 'Jalan Kasturi, Segamat',
      contact: '019-776 6214',
      link: 'https://share.google/Mu0KtF8Xn2nwqE07g',
      type: 'Old Folks Home',
      services: ['Old Folks Care', 'Community Support', 'Street Outreach']
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
    },
    {
    name: 'Pusat Transit Harapan Pulau Pinang',
    state: 'Pulau Pinang',
    address: '19, Jalan C.Y. Choy, George Town, Pulau Pinang',
    contact: '014-790 4744',
    link: 'https://www.google.com/maps/search/?api=1&query=Pusat+Transit+Harapan+Pulau+Pinang',
    type: 'Homeless Shelter',
    services: ['Temporary Shelter', 'Homeless Support']
  },
  {
    name: 'Anjung Singgah Pulau Pinang',
    state: 'Pulau Pinang',
    address: '53, Lebuh Chulia, George Town, Pulau Pinang',
    contact: '04-261 1530',
    link: 'https://www.google.com/maps/search/?api=1&query=Anjung+Singgah+Pulau+Pinang',
    type: 'Temporary Shelter',
    services: ['Temporary Accommodation', 'Social Assistance', 'Homeless Support']
  },
  {
    name: 'Naomi Homeless Shelter',
    state: 'Pulau Pinang',
    address: 'Lintang Teratai, Taman Lean Fung, Jalan Raja Uda, Butterworth, Pulau Pinang',
    contact: '010-956 9595',
    link: 'https://www.google.com/maps/search/?api=1&query=Naomi+Homeless+Shelter+Butterworth',
    type: 'Community Care Shelter',
    services: ['Residential Care', 'Meals and Daily Support', 'Support for Vulnerable People']
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
