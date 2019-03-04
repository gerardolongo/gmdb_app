import { Component, ViewChild } from '@angular/core';
import { NavController, Loading, Nav, NavParams, Searchbar } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { FormBuilder } from '@angular/forms';
import { Result } from "../../model/ResultTmdb";
import { LoadingController, ToastController } from 'ionic-angular';
import { GmdbapiProvider } from '../../providers/gmdbapi/gmdbapi';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Searchbar) searchbar: Searchbar;
  title: string;
  results : Result[];
  loading: Loading;

  constructor(public navCtrl: NavController, public searchProvider : 
    SearchProvider, private formBuilder: FormBuilder, private toastCtrl: ToastController, private loadingController : LoadingController
    ,private gmdbProvider : GmdbapiProvider,  public navParams: NavParams) {
      
  }

  ionViewDidLoad(){
    this.ricerca()
  }

  ricerca(){
    if(this.title!= undefined && this.title.length > 2)
    {
      let searchTitle = this.title;
      searchTitle = this.title.replace(/\s/g, "%20");
      this.loading = this.loadingController.create({content : "Caricamento"});
      this.presentSearchResult(searchTitle);
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  presentSearchResult(searchParam) {
    let loading = this.loadingController.create({
      spinner: 'hide',
      //cssClass: 'spinner',
      content: 'Attendere prego'
    });
  
    loading.present();
    
    this.searchProvider.getTvSeriesByName(searchParam)
    .subscribe(result => {
      this.results = result;
      if(this.results.length > 0) {
        loading.dismiss();
      }
      else {
        this.presentToast('La ricerca non ha prodotto risultati');
        loading.dismiss();
      }
    },
    error => {});
  }

  presentAddTelefilm(item) {
    let loading = this.loadingController.create({
      spinner: 'hide',
      //cssClass: 'spinner'
      content: 'Attendere prego'
    });
  
    loading.present();
    this.addTelefilm(item,loading);
  }

  addTelefilm(item, loading) {
    this.loading = this.loadingController.create({content : "Inserimento telefilm in corso"});
    let telefilm = {id: item.id, overview: item.overview, poster_path: item.poster_path
    , original_name: item.original_name}

    this.gmdbProvider.addFavourite(telefilm)
    .subscribe(res=> {
      this.navCtrl.pop();
      loading.dismiss();
      this.presentToast("Telefilm aggiunto ai preferiti");
    },
    err => {
      let error = err.json();
      this.navCtrl.pop();
      this.presentToast("Attenzione!" + error.message);
      loading.dismiss()
    });
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
}
