import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Content } from 'ionic-angular';
import { GmdbapiProvider } from '../../providers/gmdbapi/gmdbapi';
import { TvDetailsProvider } from '../../providers/tv-details/tv-details';
import { Telefilm } from '../../model/Telefilm';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-airepisodes',
  templateUrl: 'airepisodes.html',
})

export class AirepisodesPage implements OnInit  {
  telefilms: Telefilm[] = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true; 
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private gmdbProvider: GmdbapiProvider, private tvProvider: TvDetailsProvider,
    private loadingController : LoadingController, private localNotification: LocalNotifications) {
  }
  
  ngOnInit() {
    this.presetLoadingNextEpisodes();
  }

  presetLoadingNextEpisodes() {
     this.loading = this.loadingController.create({
      spinner: 'hide',
      //cssClass: 'spinner',
      content: 'Attendere prego'
    });
  
    this.loading.present();
    this.getNext();
  }

  delete(telefilm, item){
    this.localNotification.get(telefilm.id).then(x => {
      console.log(x);
      if(x == undefined) {
          alert('Hai già disattivato le notifiche per ' + telefilm.original_name)
      }
      else{
        this.localNotification.cancel(telefilm.id).then(res=> {
          console.log(res);
          alert("Hai disattivato la notifica per " + telefilm.original_name)
        });
      }
      item.close();
    })
  }

  getNext() {
    this.gmdbProvider.getAllFavourite().subscribe(
       res => {
        this.loading.dismiss(); 
        res.forEach(telefilm=> {
          this.tvProvider.getDetailsById(telefilm.id)
          .subscribe(x => {
              if (x.next_episode_to_air != null){
                let airDate = x.next_episode_to_air.air_date;
                let telefilmDate = new Date(airDate);
                let currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 3)
                if(currentDate >= telefilmDate){
                  console.log(telefilm);
                  telefilm.tv_details = x;
                  this.telefilms.push(telefilm)
                } 
              } 
          });
        })
      })
  }
}
