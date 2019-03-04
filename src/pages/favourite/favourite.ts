import { Component, OnInit } from '@angular/core';
import { NavController, Loading, ModalController } from 'ionic-angular';
import { Telefilm } from '../../model/Telefilm';
import { GmdbapiProvider } from '../../providers/gmdbapi/gmdbapi';
import { LoadingController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TvDetailsProvider } from '../../providers/tv-details/tv-details';
import { SearchPage } from '../search/search';
import { DetailBodyComponent } from '../../components/detail-body/detail-body';


@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html'
})
export class FavouritePage implements OnInit {
  favouriteTelefilm : Telefilm[];
  loading: Loading;  

  ngOnInit() { }

  constructor(public navCtrl: NavController, private gmdbProvider : GmdbapiProvider
    , private toastCtrl: ToastController, private loadingController : LoadingController
    , private alertCtrl: AlertController, private tvDetailsProvider : TvDetailsProvider
    , public modalCtrl: ModalController) {
      
  }

  ionViewWillEnter() {
    this.loadAllFavourite();
  }
  
  loadAllFavourite() {
    let loading = this.loadingController.create({
      spinner: 'hide',
      content: 'Attendere prego...',
      //cssClass: 'spinner'
    });
  
    loading.present();
    
    this.gmdbProvider.getAllFavourite()
    .subscribe(res => { 
      this.favouriteTelefilm = res;
      this.favouriteTelefilm.forEach(telefilm=>{
        let id = telefilm.id;
        console.log(id);
        this.getDetailsById(id, telefilm);        
      })

      loading.dismiss();
    });
  }

  getDetailsById(id, item : Telefilm) {
    this.tvDetailsProvider.getDetailsById(id)
    .subscribe(res=> { 
      item.tv_details = res;
      console.log(item);
    })
  }

  addTelefilm() {
    this.navCtrl.push(SearchPage)
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      
    });
    
    toast.present();
  }

  presentProfileModal(telefilm: Telefilm) {
    let modal = this.modalCtrl.create(DetailBodyComponent, {telefilm: telefilm});
    modal.onDidDismiss(data => {
      if(data == 'reload')
        this.loadAllFavourite();
    });
    modal.present();
  }
}
