import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FoodbankService } from '../../services/foodbank.service';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';

interface Foodbank {
  name: string;
  lat: string | number;
  lon: string | number;
}

type MapLayer = 'mapnik' | 'cyclemap' | 'transportmap';

interface UserLocation {
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterModule, CommonModule, SafeUrlPipe],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit {
  foodbanks: Foodbank[] = [];
  filteredFoodbanks: Foodbank[] = [];
  selectedIndex = 0;

  searchQuery = '';
  selectedCategory = 'food';
  selectedRadius = '25';
  activeChips = new Set<string>(['open']);

  mapLayer: MapLayer = 'mapnik';
  mapSrc = this.buildMapUrl(3.139, 101.6869, this.mapLayer);

  loading = true;
  loadError = false;
  locationNotice = '';
  userLocation: UserLocation | null = null;

  private readonly categoryKeywords: Record<string, string[]> = {
    shelter: ['shelter', 'hostel', 'housing', 'refuge'],
    jobs: ['job', 'employment', 'training', 'career'],
    health: ['health', 'clinic', 'medical', 'hospital', 'mental'],
    artisan: ['artisan', 'craft', 'market', 'grant']
  };

  constructor(
    private foodbankService: FoodbankService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFoodbanks();
  }

  get selectedBank(): Foodbank | undefined {
    return this.filteredFoodbanks[this.selectedIndex];
  }

  loadFoodbanks(): void {
    this.loading = true;
    this.loadError = false;

    this.foodbankService.getFoodBanks().subscribe({
      next: (data) => {
        this.foodbanks = data ?? [];
        this.loading = false;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching foodbanks:', err);
        this.foodbanks = [];
        this.filteredFoodbanks = [];
        this.loading = false;
        this.loadError = true;
      }
    });
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onRadiusChange(event: Event): void {
    this.selectedRadius = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  selectBank(index: number): void {
    this.selectedIndex = index;
    const bank = this.filteredFoodbanks[index];

    if (bank) {
      this.updateMap(bank.lat, bank.lon);
    }
  }

  onCardKeydown(event: KeyboardEvent, index: number): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.selectBank(index);
  }

  updateMap(lat: number | string, lon: number | string): void {
    const parsedLat = Number(lat);
    const parsedLon = Number(lon);

    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLon)) {
      return;
    }

    this.mapSrc = this.buildMapUrl(parsedLat, parsedLon, this.mapLayer);
  }

  setMapLayer(layer: MapLayer): void {
    this.mapLayer = layer;

    const bank = this.selectedBank;
    if (bank) {
      this.updateMap(bank.lat, bank.lon);
      return;
    }

    this.mapSrc = this.buildMapUrl(3.139, 101.6869, layer);
  }

  toggleMapFullscreen(element: HTMLElement): void {
    if (!document.fullscreenElement) {
      element.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  detectLocation(): void {
    if (!navigator.geolocation) {
      this.locationNotice = 'Geolocation is not supported by this browser. Enter a city or postcode instead.';
      return;
    }

    this.locationNotice = 'Detecting your current location…';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.userLocation = { lat, lon };
        this.updateMap(lat, lon);
        this.applyFilters();
        this.locationNotice = `Showing results within the selected radius of your location (${lat.toFixed(4)}, ${lon.toFixed(4)}).`;
      },
      () => {
        this.locationNotice = 'Location access was denied. Enter a city or postcode above to search manually.';
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  clearLocationFilter(): void {
    this.userLocation = null;
    this.locationNotice = '';
    this.applyFilters();
  }

  toggleChip(id: string): void {
    if (this.activeChips.has(id)) {
      this.activeChips.delete(id);
    } else {
      this.activeChips.add(id);
    }
  }

  isChipActive(id: string): boolean {
    return this.activeChips.has(id);
  }

  bankTitle(bank: Foodbank): string {
    const title = bank.name.split(',')[0]?.trim();
    return title || 'Community Food Bank';
  }

  bankAddress(bank: Foodbank): string {
    const parts = bank.name
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);

    return parts.length > 1 ? parts.slice(1).join(', ') : bank.name;
  }

  formatCoord(value: string | number): string {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed.toFixed(5) : String(value);
  }

  directionsUrl(bank: Foodbank): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${bank.lat},${bank.lon}`;
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  private applyFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();
    const radius = this.radiusInMiles();

    this.filteredFoodbanks = this.foodbanks.filter((bank) => {
      const matchesSearch = !query || bank.name.toLowerCase().includes(query);
      const matchesCategory = this.matchesCategory(bank);
      const matchesRadius =
        radius === null ||
        !this.userLocation ||
        this.distanceInMiles(this.userLocation, bank) <= radius;

      return matchesSearch && matchesCategory && matchesRadius;
    });

    this.selectedIndex = 0;

    const firstBank = this.filteredFoodbanks[0];
    if (firstBank) {
      this.updateMap(firstBank.lat, firstBank.lon);
    }
  }

  private matchesCategory(bank: Foodbank): boolean {
    if (this.selectedCategory === 'all' || this.selectedCategory === 'food') {
      return true;
    }

    const keywords = this.categoryKeywords[this.selectedCategory] ?? [];
    const haystack = bank.name.toLowerCase();

    return keywords.some((keyword) => haystack.includes(keyword));
  }

  private radiusInMiles(): number | null {
    if (this.selectedRadius === 'nationwide' || this.selectedRadius === 'global') {
      return null;
    }

    const parsed = Number(this.selectedRadius);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private distanceInMiles(from: UserLocation, bank: Foodbank): number {
    const toLat = Number(bank.lat);
    const toLon = Number(bank.lon);

    if (!Number.isFinite(toLat) || !Number.isFinite(toLon)) {
      return Number.POSITIVE_INFINITY;
    }

    const earthRadiusMiles = 3958.8;
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const dLat = toRadians(toLat - from.lat);
    const dLon = toRadians(toLon - from.lon);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(from.lat)) *
        Math.cos(toRadians(toLat)) *
        Math.sin(dLon / 2) ** 2;

    return 2 * earthRadiusMiles * Math.asin(Math.sqrt(a));
  }

  private buildMapUrl(lat: number, lon: number, layer: MapLayer): string {
    const delta = 0.01;
    const minLat = lat - delta;
    const maxLat = lat + delta;
    const minLon = lon - delta;
    const maxLon = lon + delta;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=${layer}&marker=${lat},${lon}`;
  }
}
