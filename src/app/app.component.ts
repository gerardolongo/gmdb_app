import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FavouritePage } from '../pages/favourite/favourite';
import { AirepisodesPage } from '../pages/airepisodes/airepisodes';
import { Notify } from '../utility/notify';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FavouritePage;
  pages: Array<{title: string, component: any}>;
  showSplash = true;
  isLoaded: boolean = false;
  @ViewChild(Nav) nav: Nav;
  
  constructor(platform: Platform, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen
    , private notify: Notify) {
    this.pages = [
      { title: 'Preferiti', component: FavouritePage },
      { title: 'Prossimi Episodi', component: AirepisodesPage },
    ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.notify.getNext();
    });
  }

  /*
  getNext() {
    this.isLoaded = false;
    this.gmdbProvider.getAllFavourite().subscribe(
      res => res.forEach(x=> {
        this.tvProvider.getDetailsById(x.id)
        .subscribe(x=>{
          this.isLoaded = true;
            if (x.next_episode_to_air != null){
              let airDate = x.next_episode_to_air.air_date;
              let telefilmDate = new Date(airDate);
              let currentDate = new Date();
              currentDate.setDate(currentDate.getDate() + 3)
              if (currentDate >= telefilmDate) {
                this.localNotifications.schedule({
                  id: x.id,
                  text: x.original_name + ' andrà in onda il ' + airDate,
                  title: 'Notifica prossimo episodio',
                  foreground: true,
                  every: {
                    second: 4
                  },
                  //trigger: { every: { second: 10, minute: 0 }, count : 3 }
               });
              } 
            } 
        });
      }))
  }
  */

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  getCountScheduling(telefilmDate: Date){
    let now = new Date();
    console.log(telefilmDate.getDate() - now.getDate())
    return telefilmDate.getDate() - now.getDate();
  }
}

