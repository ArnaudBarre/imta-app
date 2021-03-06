import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {NavController} from 'ionic-angular';
import {Association} from './association';
import {NewsPage} from './news/news';

@Component({
  selector: 'page-associations',
  templateUrl: 'associations.html'
})
export class AssociationsPage implements OnInit {
  groups: Array<{ name: string, associations: Array<Association> }>;

  constructor(private http: Http, private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.http.get('./assets/data/associations.json').subscribe(response => this.groups = response.json());
  }

  goNews(association: Association) {
    this.navCtrl.push(NewsPage, {association: association});
  }
}
