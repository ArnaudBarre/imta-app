import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {BusPage} from '../pages/bus/bus';
import {EventsPage} from '../pages/events/events';
import {AssociationsPage} from '../pages/associations/associations';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, icon: string, component: any }> = [
    {title: 'Associations', icon: 'people', component: AssociationsPage},
    {title: 'Évènements', icon: 'calendar', component: EventsPage},
    {title: 'Bus', icon: 'bus', component: BusPage}
  ];
  rootPage = this.pages[0].component;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
