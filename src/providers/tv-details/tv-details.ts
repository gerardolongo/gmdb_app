import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TvDetails } from '../../model/Tv';

/*
  Generated class for the TvDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TvDetailsProvider {
  tmdbApiUrl = '';

  constructor(public http: Http) { }

  getDetailsById(id: number) : Observable<TvDetails> {
    this.tmdbApiUrl = 'https://api.themoviedb.org/3/tv/:id?api_key=96eae9a134c350087b45123026c88a3e&language=it-IT';
    this.tmdbApiUrl = this.tmdbApiUrl.replace(':id', id.toString());
    return this.http.get(this.tmdbApiUrl)
    .map(res => <TvDetails>res.json())
  }
}
