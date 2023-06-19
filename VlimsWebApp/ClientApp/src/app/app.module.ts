
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderInterceptor } from './core/loaderinterceptor';
import { LoaderService } from './core/loader.service';
import { ServerconfigService } from './core/serverconfig.service';
import { ApplicationContextService } from './application-context.service';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
  declarations: [
    AppComponent,
	LoaderComponent,
	NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
	NotificationModule,
	DialogsModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Router use:
    LoadingBarRouterModule,
    // for Core use:
    LoadingBarModule
	  ],
  providers: [ ApplicationContextService, LoaderService,
  
	{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide:APP_INITIALIZER,useFactory: (sites:ServerconfigService) => () => sites.loadConfig(),
      deps:[ServerconfigService], multi:true}
	        ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
