import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events.service';
import {Events, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import {UtilsService} from '../../../services/utils.service'

@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
  providers: [UtilsService, EventsService]
})
export class SubscriptionsPage implements OnInit {
  associations: Array<{ name: string, subscribe: boolean }> = [];
  subscriptions: Array<string>;
  loading = true;

  constructor(private eventService: EventsService, private navParams: NavParams, private storage: Storage,
              private events: Events, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.subscriptions = this.navParams.get('subscriptions');
    this.eventService.getAssociations()
      .then(associations => {
        this.loading = false;
        this.associations = associations.map(
          association => ({name: association, subscribe: this.subscriptions.includes(association)}));
      })
      .catch(error => {
        this.loading = false;
        this.utilsService.toast();
        console.error(error);
      });
  }

  updateSubscriptions() {
    this.subscriptions = this.associations.filter(a => a.subscribe).map(a => a.name);
    this.storage.set('subscriptions', this.subscriptions)
      .then(() => this.events.publish('subscriptionsUpdated', this.subscriptions))
      .catch(error => console.error(error));
  }
}
