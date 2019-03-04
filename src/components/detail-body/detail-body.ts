import { Component, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { ViewController, NavParams, LoadingController, AlertController, NavController } from 'ionic-angular';
import { Telefilm } from '../../model/Telefilm';
import { GmdbapiProvider } from '../../providers/gmdbapi/gmdbapi';

/**
 * Generated class for the DetailBodyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detail-body',
  templateUrl: 'detail-body.html'
})
export class DetailBodyComponent {
  telefilm : Telefilm;
  localNotifications: any;

  constructor(public viewCtrl: ViewController, params: NavParams,
    private loadingController : LoadingController, private alertCtrl: AlertController
    , private gmdbProvider : GmdbapiProvider, public navCtrl: NavController) { 
    this.telefilm = params.get('telefilm');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteTelefilmConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Conferma',
      message: 'Vuoi cancellare il telefilm dai preferiti?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            //this.localNotifications.cancel(id).then(result => {
              
            //});
            this.deleteTelefilm(id);
          }
        }
      ]
    });
    
    alert.present();
  }

  deleteTelefilm(id){
    this.presetLoadingDelete(id);
  }

  presetLoadingDelete(id) {
    let loading = this.loadingController.create({
      spinner: 'hide',
      //cssClass: 'spinner'
      content: 'Attendere prego'
    });
  
    loading.present();
    
    this.gmdbProvider.delete(id)
    .subscribe(res=> {
      loading.dismissAll();
      this.viewCtrl.dismiss('reload');
    });
  }
}
