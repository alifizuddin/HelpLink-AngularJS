// src/app/pages/jobs/jobs.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs: any[] = [];
  loading = false;
  query = ''; // default search query

  jobType = 'all';
  sortKey = 'newest';

  page = 1;
  pageSize = 9;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.searchJobs();
  }

  searchJobs(): void {
    if (!this.query.trim()) return;
    this.loading = true;
    this.page = 1;
    this.jobService.getJobs(this.query).subscribe({
      next: (res) => {
        this.jobs = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Job API error:', err);
        this.loading = false;
      }
    });
  }

  /* ---------- Filtering & sorting ---------- */

  get filteredJobs(): any[] {
    let list = this.jobs.filter((job) => this.matchesType(job));

    switch (this.sortKey) {
      case 'salary':
        list = [...list].sort(
          (a, b) => (b.job_max_salary || 0) - (a.job_max_salary || 0)
        );
        break;
      case 'title':
        list = [...list].sort((a, b) =>
          String(a.job_title || '').localeCompare(String(b.job_title || ''))
        );
        break;
      default:
        break;
    }

    return list;
  }

  onFilterChange(): void {
    this.page = 1;
  }

  /* ---------- Pagination ---------- */

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredJobs.length / this.pageSize));
  }

  get pagedJobs(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredJobs.slice(start, start + this.pageSize);
  }

  get pageStart(): number {
    return this.filteredJobs.length === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min(this.page * this.pageSize, this.filteredJobs.length);
  }

  changePage(delta: number): void {
    const next = this.page + delta;
    if (next >= 1 && next <= this.totalPages) {
      this.page = next;
    }
  }

  /* ---------- Card helpers ---------- */

  initials(name: string): string {
    if (!name || !name.trim()) return '?';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  avatarClass(index: number): string {
    const tones = ['tone-primary', 'tone-tertiary', 'tone-secondary', 'tone-neutral'];
    return tones[index % tones.length];
  }

  jobLocation(job: any): string {
    if (!job) return '';
    return [job.job_city, job.job_state, job.job_country]
      .filter((part) => !!part)
      .join(', ');
  }

  salaryText(job: any): string {
    if (!job || !job.job_min_salary) return '';
    const currency = job.job_salary_currency ? `${job.job_salary_currency} ` : '';
    const min = Number(job.job_min_salary).toLocaleString();
    const max = job.job_max_salary ? Number(job.job_max_salary).toLocaleString() : null;
    const period = job.job_salary_period ? ` / ${job.job_salary_period}` : '';
    return max ? `${currency}${min} – ${max}${period}` : `${currency}${min}${period}`;
  }

  private matchesType(job: any): boolean {
    if (this.jobType === 'all') return true;
    const type = String(job?.job_employment_type || '').toLowerCase();
    if (this.jobType === 'full_time') return type.includes('full');
    if (this.jobType === 'part_time') return type.includes('part');
    if (this.jobType === 'internship') return type.includes('intern');
    if (this.jobType === 'contract') return type.includes('contract');
    return true;
  }
}
