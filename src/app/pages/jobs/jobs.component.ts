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

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.searchJobs();
  }

  searchJobs(): void {
    if (!this.query.trim()) return;
    this.loading = true;
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
}
