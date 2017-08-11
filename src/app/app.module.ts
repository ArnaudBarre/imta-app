import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import {App} from './app.component';
import {BusPage} from '../pages/bus/bus';
import {EventsPage} from '../pages/events/events';
import {SubscriptionsPage} from '../pages/events/subscriptions/subscriptions';
import {CreatePage} from '../pages/events/create/create';
import {SpinnerComponent} from '../components/spinner/spinner';
import {AssociationsPage} from '../pages/associations/associations';
import {DetailsPage} from '../pages/associations/details/details';
import {NewsPage} from '../pages/associations/news/news';

@NgModule({
  declarations: [
    App,
    BusPage,
    EventsPage,
    SubscriptionsPage,
    CreatePage,
    AssociationsPage,
    DetailsPage,
    NewsPage,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(App),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    BusPage,
    AssociationsPage,
    DetailsPage,
    EventsPage,
    SubscriptionsPage,
    NewsPage,
    CreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
