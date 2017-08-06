import {Component, OnInit} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UtilsService} from '../../services/utils.service'
import {EventsService} from './events.service'
import {SubscriptionsPage} from './subscriptions/subscriptions';
import {CreatePage} from './create/create';
import {Event} from './event'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers: [UtilsService, EventsService]
})
export class EventsPage implements OnInit {
  events: Array<Event> = [];
  subscriptions: Array<string> = [];
  loading: boolean;

  constructor(private eventsService: EventsService, private navCtrl: NavController, private storage: Storage,
              private appEvents: Events, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.storage.get('subscriptions').then(subscriptions => {
      if (subscriptions) {
        this.subscriptions = subscriptions;
        this.getEvents();
      }
    }).catch(error => console.error(error));
    this.appEvents.subscribe('subscriptionsUpdated', subscriptions => {
      this.subscriptions = subscriptions;
      this.getEvents();
    });
    this.appEvents.subscribe('eventCreated', event => this.getEvents());
  }

  getEvents() {
    if (this.subscriptions.length) {
      this.loading = true;
      this.eventsService.getEvents(this.subscriptions)
        .then(events => {
          this.events = events;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
          this.utilsService.toast();
        });
    } else this.events = [];
  }

  openSubscriptions(): void {
    if (this.subscriptions) this.navCtrl.push(SubscriptionsPage, {subscriptions: this.subscriptions});
  }

  openCreate(): void {
    this.navCtrl.push(CreatePage);
  }
}
