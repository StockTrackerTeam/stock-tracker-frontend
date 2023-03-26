import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-tracker-frontend';

  constructor (
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.setLanguage();
    this.router.navigate(['/users']);
  }

  setLanguage(): void {
    this.translateService.setDefaultLang('es');
    if (window.Intl && typeof window.Intl === 'object') {
      this.translateService.use(navigator.language);
    }
  }
}
