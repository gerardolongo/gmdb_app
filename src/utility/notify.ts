import { LocalNotifications } from "@ionic-native/local-notifications";
import { TvDetailsProvider } from "../providers/tv-details/tv-details";
import { GmdbapiProvider } from "../providers/gmdbapi/gmdbapi";
import { Injectable } from "@angular/core";
import { TvDetails } from "../model/Tv";

@Injectable()
export class Notify {
    constructor(public localNotifications : LocalNotifications,  public tvProvider: TvDetailsProvider
        , public gmdbProvider: GmdbapiProvider) { }

    getNext() {
        this.gmdbProvider.getAllFavourite().subscribe(res => res.forEach(x=> {
            this.tvProvider.getDetailsById(x.id)
            .subscribe(x => {
               this.scheduleTelefilm(x);
            });
        }))
    }
    
    scheduleTelefilm(tvDetails: TvDetails) {
        if (tvDetails.next_episode_to_air != null) {
            let airDate = tvDetails.next_episode_to_air.air_date;
            let telefilmDate = new Date(airDate);
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3)
            if (currentDate >= telefilmDate) {
                this.localNotifications.schedule({
                    id: tvDetails.id,
                    text: tvDetails.original_name + ' andrà in onda il ' + airDate,
                    title: 'Notifica prossimo episodio',
                    foreground: true,
                    every: {
                        second: 4
                    },
                    //trigger: { every: { second: 10, minute: 0 }, count : 3 }
                })
            } 
        }
    }
}