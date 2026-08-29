import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HelpLink';
}
