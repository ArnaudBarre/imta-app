import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {UtilsService} from '../../services/utils.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
  providers: [UtilsService]
})
export class BusPage implements OnInit {
  schedules = [];
  data = [];
  stations : Array<{id: string, name: string, lines: Array<{number: string, directions: Array<string>}>}>= [
    {
      id: 'CTRE',
      name: 'Chantrerie',
      lines: [{number: 'C6', directions: ['Ville']}, {number: '75', directions: ['Facultés']}]
    },
    {
      id: 'BJOI',
      name: 'Beaujoire',
      lines: [{number: 'C6', directions: ['Campus', 'Ville']}, {number: '75', directions: ['Campus', 'Ville']}]
    },
    {id: 'COCH', name: 'Cochard', lines: [{number: 'C6', directions: ['Campus', 'Ville']}]},
    {id: 'FOCH', name: 'Foch', lines: [{number: 'C6', directions: ['Campus']}]},
    {id: 'CRQU', name: 'Place du Cirque', lines: [{number: 'C6', directions: ['Campus']}]},
    {id: 'FACU', name: 'Facultés', lines: [{number: '75', directions: ['Campus']}]}
  ];
  station = this.stations[0];
  line = this.station.lines[0];
  direction = this.line.directions[0];
  loading = true;

  constructor(private http: Http, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.getSchedules();
  }

  getSchedules(): void {
    this.http.get('http://open.tan.fr/ewp/tempsattente.json/' + this.station.id)
      .toPromise()
      .then(response => {
        this.loading = false;
        this.data = response.json();
        if (!this.station.lines.includes(this.line)) this.line = this.station.lines[0];
        else this.updateSchedules();
      })
      .catch(error => {
        this.loading = false;
        this.utilsService.toast();
        console.error(error);
      });
  }

  lineChange() {
    if (!this.line.directions.includes(this.direction)) this.direction = this.line.directions[0];
    else this.updateSchedules();
  }

  updateSchedules() {
    let directionNumber = this.direction === 'Campus' ? 1 : 2;
    this.schedules = this.data
      .filter(schedule => schedule.ligne.numLigne === this.line.number && schedule.sens === directionNumber)
      .map(schedule => schedule.temps);
    if (this.schedules.length === 0) this.schedules.push('Pas de bus');
  }
}
