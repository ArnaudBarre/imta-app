import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Association} from '../association';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit {
  association: Association;

  constructor(private navParams: NavParams, private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.association = this.navParams.get('association');
  }

  goDetails(association: Association) {
    this.navCtrl.push(DetailsPage, {association: association});
  }
}
