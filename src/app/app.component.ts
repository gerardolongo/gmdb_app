import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FavouritePage } from '../pages/favourite/favourite';
import { AirepisodesPage } from '../pages/airepisodes/airepisodes';
import { Notification } from '../utility/notification';

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
    , private notify: Notification) {
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

