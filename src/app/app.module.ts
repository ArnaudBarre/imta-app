import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {App} from './app.component';
import {BusPage} from '../pages/bus/bus';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    App,
    BusPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    BusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
