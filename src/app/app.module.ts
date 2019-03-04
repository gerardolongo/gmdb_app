import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchProvider } from '../providers/search/search';
import { HttpModule } from '@angular/http';
import { GmdbapiProvider } from '../providers/gmdbapi/gmdbapi';
import { FavouritePage } from '../pages/favourite/favourite';
import { TvDetailsProvider } from '../providers/tv-details/tv-details';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AirepisodesPage } from '../pages/airepisodes/airepisodes';
import { MatCheckboxModule, MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';
import { DetailBodyComponent } from '../components/detail-body/detail-body';
import { Notify } from '../utility/notify';


@NgModule({
  declarations: [
    MyApp,
    FavouritePage,
    SearchPage,
    AirepisodesPage,
    DetailBodyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavouritePage,
    SearchPage,
    AirepisodesPage,
    DetailBodyComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SearchProvider,
    GmdbapiProvider,
    TvDetailsProvider,
    LocalNotifications,
    Notify
  ]
  
})
export class AppModule {}
