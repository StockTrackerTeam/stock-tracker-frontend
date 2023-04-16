import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { NavBarComponent } from './modules/nav-bar/nav-bar.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { UserViewComponent } from './modules/user-view/user-view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserDropdownModule } from 'src/shared/modules/user-dropdown/user-dropdown.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    UserDropdownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
