import {Component, OnInit} from '@angular/core';
import {Events} from 'ionic-angular';
import {UtilsService} from '../../../services/utils.service'
import {EventsService} from '../events.service';
import {Event} from '../event';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
  providers: [UtilsService, EventsService]
})
export class CreatePage implements OnInit {
  associations: Array<string>;
  event = new Event();
  password: string;
  loading = true;

  constructor(private eventsService: EventsService, private utilsService: UtilsService, private events: Events) {
  }

  ngOnInit(): void {
    this.eventsService.getAssociations()
      .then(associations => {
        this.associations = associations;
        this.loading = false;
      })
      .catch(error => {
        console.error(error);
        this.loading = false;
        this.utilsService.toast();
      });
  }

  submit(): void {
    let passwordEntered = this.password;
    this.password = '';
    this.loading = true;
    this.eventsService.createEvent(this.event, passwordEntered)
      .then(event => {
        this.loading = false;
        this.event = new Event();
        this.utilsService.toast('Évènement créé !');
        this.events.publish('eventCreated', event);
      })
      .catch(error => {
        this.loading = false;
        this.utilsService.toast(error.status === 401 ? 'Mauvais mot de passe' : null);
        console.error(error);
      });
  }
}
