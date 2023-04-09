import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Roles } from 'src/shared/utils/enums';
import { UserEntity } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-tracker-frontend';
  currentUser!: UserEntity;
  token!: string | null;

  constructor (
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.setLanguage();

    this.token = localStorage.getItem('token');
    if (this.token !== null && this.token !== undefined) {
      this.currentUser = JSON.parse(localStorage.getItem('user') as string);
    } else {
      this.router.navigate(['/login']);
    }  
  }

  setLanguage(): void {
    this.translateService.setDefaultLang('es');
    if (window.Intl && typeof window.Intl === 'object') {
      this.translateService.use(navigator.language);
    }
  }
}
