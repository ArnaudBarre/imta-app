import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Association} from '../association';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage implements OnInit {
  association: Association;

  constructor(public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.association = this.navParams.get('association');
  }
}
