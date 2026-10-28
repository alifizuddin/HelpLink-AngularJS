import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsArticle, NewsService } from '../../services/news.service';

interface TopicPreset {
  label: string;
  q: string;
  icon: string;
}

interface TopicRule {
  label: string;
  tone: string;
  keywords: string[];
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles: NewsArticle[] = [];
  loading = true;
  error = '';
  totalArticles = 0;
  lastUpdated: Date | null = null;

  query = 'poverty';
  country = 'my';
  lang = 'en';
  sortKey = 'newest';

  readonly maxArticles = 10;

  readonly topics: TopicPreset[] = [
    { label: 'Poverty', q: 'poverty', icon: 'trending_down' },
    { label: 'Food security', q: 'food security', icon: 'restaurant' },
    { label: 'Housing', q: 'housing crisis', icon: 'home' },
    { label: 'Jobs & wages', q: 'unemployment wages', icon: 'work' },
    { label: 'Climate & disaster', q: 'climate disaster', icon: 'storm' },
    { label: 'Humanitarian aid', q: 'humanitarian aid', icon: 'volunteer_activism' }
  ];

  readonly countries = [
    { code: 'my', label: 'Malaysia' },
    { code: 'us', label: 'United States' },
    { code: 'gb', label: 'United Kingdom' },
    { code: 'au', label: 'Australia' },
    { code: 'in', label: 'India' },
    { code: 'id', label: 'Indonesia' },
    { code: 'ph', label: 'Philippines' },
    { code: 'sg', label: 'Singapore' },
    { code: 'ca', label: 'Canada' }
  ];

  readonly languages = [
    { code: 'en', label: 'English' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ta', label: 'Tamil' }
  ];

  /**
   * GNews has no category field, so topics are inferred from the headline text.
   * The badge always reflects the story copy we actually received.
   */
  private readonly topicRules: TopicRule[] = [
    {
      label: 'Food security',
      tone: 'topic--food',
      keywords: ['food', 'hunger', 'hungry', 'nutrition', 'famine', 'meal', 'pantry']
    },
    {
      label: 'Housing',
      tone: 'topic--housing',
      keywords: ['housing', 'homeless', 'rent', 'shelter', 'eviction', 'tenancy']
    },
    {
      label: 'Jobs & wages',
      tone: 'topic--jobs',
      keywords: ['job', 'employment', 'unemployment', 'wage', 'worker', 'labour', 'labor']
    },
    {
      label: 'Climate & disaster',
      tone: 'topic--climate',
      keywords: ['climate', 'flood', 'disaster', 'drought', 'storm', 'earthquake', 'wildfire']
    },
    {
      label: 'Humanitarian aid',
      tone: 'topic--aid',
      keywords: ['aid', 'relief', 'humanitarian', 'donation', 'charity', 'ngo']
    },
    {
      label: 'Policy',
      tone: 'topic--policy',
      keywords: ['policy', 'government', 'minister', 'budget', 'parliament', 'law']
    },
    {
      label: 'Poverty',
      tone: 'topic--poverty',
      keywords: ['poverty', 'poor', 'inequality', 'income', 'destitute']
    }
  ];

  constructor(
    private newsService: NewsService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    // The GNews proxy only exists in the browser session; during SSR/prerender
    // keep the loading shell so hydration starts from the same markup.
    if (isPlatformBrowser(this.platformId)) {
      this.loadNews();
    }
  }

  loadNews(): void {
    this.loading = true;
    this.error = '';

    this.newsService
      .getNews({
        q: this.query.trim() || 'poverty',
        lang: this.lang,
        country: this.country,
        max: this.maxArticles
      })
      .subscribe({
        next: (res) => {
          if (res?.error) {
            this.articles = [];
            this.totalArticles = 0;
            this.error =
              'The news service returned an error. Check that the proxy server has a valid GNews API key configured.';
          } else {
            this.articles = res?.articles ?? [];
            this.totalArticles = res?.totalArticles ?? this.articles.length;
            this.lastUpdated = new Date();
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('News API error:', err);
          this.articles = [];
          this.totalArticles = 0;
          this.error =
            'We could not reach the news service. Make sure the local proxy server is running on port 3000, then try again.';
          this.loading = false;
        }
      });
  }

  search(): void {
    this.loadNews();
  }

  selectTopic(topic: TopicPreset): void {
    this.query = topic.q;
    this.loadNews();
  }

  isActiveTopic(topic: TopicPreset): boolean {
    return this.query.trim().toLowerCase() === topic.q.toLowerCase();
  }

  clearSearch(): void {
    this.query = '';
  }

  refresh(): void {
    this.loadNews();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('news-placeholder.svg')) {
      img.src = 'assets/news-placeholder.svg';
    }
  }

  trackByUrl(_index: number, article: NewsArticle): string {
    return article.url;
  }

  /* ---------- Layout slices ---------- */

  private get newestFirst(): NewsArticle[] {
    return [...this.articles].sort((a, b) => this.timestamp(b) - this.timestamp(a));
  }

  get featuredArticle(): NewsArticle | null {
    return this.newestFirst[0] ?? null;
  }

  get sideArticles(): NewsArticle[] {
    return this.newestFirst.slice(1, 4);
  }

  get gridArticles(): NewsArticle[] {
    const rest = this.newestFirst.slice(4);

    switch (this.sortKey) {
      case 'oldest':
        return rest.reverse();
      case 'source':
        return rest.sort((a, b) =>
          String(a.source?.name || '').localeCompare(String(b.source?.name || ''))
        );
      default:
        return rest;
    }
  }

  get sourceCount(): number {
    const names = this.articles
      .map((article) => article.source?.name)
      .filter((name): name is string => !!name);
    return new Set(names).size;
  }

  get newestArticle(): NewsArticle | null {
    return this.articles.reduce<NewsArticle | null>((latest, article) => {
      if (!latest) {
        return article;
      }
      return this.timestamp(article) > this.timestamp(latest) ? article : latest;
    }, null);
  }

  get resultsCaption(): string {
    const shown = this.articles.length;

    if (shown === 0) {
      return 'No stories loaded';
    }
    if (this.totalArticles > shown) {
      return `Showing ${shown} of ${this.totalArticles.toLocaleString()} matching stories`;
    }
    return `${shown} matching ${shown === 1 ? 'story' : 'stories'}`;
  }

  get scopeLabel(): string {
    const countryLabel =
      this.countries.find((item) => item.code === this.country)?.label ??
      this.country.toUpperCase();
    const languageLabel =
      this.languages.find((item) => item.code === this.lang)?.label ??
      this.lang.toUpperCase();
    return `${countryLabel} · ${languageLabel}`;
  }

  /* ---------- Article helpers ---------- */

  summary(article: NewsArticle): string {
    const raw = article.description || article.content || '';

    return raw
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s*\[\d+\s*chars\]\s*$/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  initials(name?: string): string {
    if (!name || !name.trim()) {
      return 'N';
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  topicFor(article: NewsArticle): string {
    const haystack = `${article.title} ${article.description || ''}`.toLowerCase();
    const match = this.topicRules.find((rule) =>
      rule.keywords.some((keyword) => haystack.includes(keyword))
    );
    return match?.label ?? 'General';
  }

  topicTone(article: NewsArticle): string {
    const label = this.topicFor(article);
    return this.topicRules.find((rule) => rule.label === label)?.tone ?? 'topic--general';
  }

  relativeTime(iso?: string): string {
    if (!iso) {
      return 'Date unavailable';
    }

    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) {
      return 'Date unavailable';
    }

    const minutes = Math.floor((Date.now() - then) / 60000);

    if (minutes < 1) {
      return 'Just now';
    }
    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days}d ago`;
    }

    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  private timestamp(article: NewsArticle): number {
    const value = new Date(article.publishedAt).getTime();
    return Number.isNaN(value) ? 0 : value;
  }
}
