import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Tv } from '../../model/Tv';
import { Result } from '../../model/ResultTmdb';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  tmdbApiUrl = 'https://api.themoviedb.org/3/search/tv?api_key=96eae9a134c350087b45123026c88a3e&language=it-IT&query=';
  
  constructor(public http: Http) { }

  getTvSeries() : Observable<Tv> {
    return this.http.get(this.tmdbApiUrl)
    .map(res => <Tv>res.json())
  }

  getTvSeriesByName(title: string) : Observable<Result[]> {
    return this.http.get(this.tmdbApiUrl + title)
    .map(res => { 
      let data = res.json();
      let tv = data as Tv;
      tv.results.forEach(x=>x.poster_path = 'http://image.tmdb.org/t/p/w185/' + x.poster_path)
      return tv.results;
    })
  }
}

