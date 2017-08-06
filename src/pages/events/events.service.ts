import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Event} from './event';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  constructor(private http: Http) {
  }

  getEvents(subscriptions: Array<string>): Promise<Array<Event>> {
    let params = new URLSearchParams();
    subscriptions.forEach(sub => params.append('sub', sub));
    return this.http.get('/server/events', {params: params}).map(res => res.json()).toPromise();
  }

  getAssociations(): Promise<Array<string>> {
    return this.http.get('/server/events/associations').map(res => res.json()).toPromise();
  }

  createEvent(event: Event, password: string): Promise<any> {
    return this.http.post('/server/events', {event: event, password: password}).map(res => res.json()).toPromise();
  }
}
