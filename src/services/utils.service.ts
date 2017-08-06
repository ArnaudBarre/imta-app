import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()
export class UtilsService {

  constructor(private toastCtrl: ToastController) {
  }

  toast(message?: string): void {
    this.toastCtrl.create({
      message: message ? message : 'Erreur de connexion',
      showCloseButton: true,
      closeButtonText: 'Ok'
    }).present();
  }
}
