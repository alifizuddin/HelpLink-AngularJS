import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  articles: any[] = [];
  private statsAnimated = false;

  @ViewChildren('statValue') statElements!: QueryList<ElementRef<HTMLSpanElement>>;

  constructor(private newsService: NewsService, private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(data => {
      this.articles = data.articles;
    });
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/news-placeholder.svg';
  }

  private initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stat-card') && !this.statsAnimated) {
            this.animateCounters();
            this.statsAnimated = true;
          }
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.stat-card, .step-card, .featured-card, .news-card, .sdg-content').forEach(el => {
      observer.observe(el);
    });
  }

  private animateCounters() {
    const targets = [
      { element: this.statElements.get(0), target: 12500, suffix: '+' },
      { element: this.statElements.get(1), target: 840, suffix: '+' },
      { element: this.statElements.get(2), target: 320, suffix: '+' },
      { element: this.statElements.get(3), target: 45, suffix: '+' }
    ];

    targets.forEach(({ element, target, suffix }, index) => {
      if (element) {
        setTimeout(() => {
          this.animateNumber(element.nativeElement, 0, target, 2000, suffix);
        }, index * 200);
      }
    });
  }

  private animateNumber(element: HTMLElement, start: number, end: number, duration: number, suffix: string = '') {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeOutCubic(progress);
      const current = Math.floor(start + (end - start) * eased);
      element.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}