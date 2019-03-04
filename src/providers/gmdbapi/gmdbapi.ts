import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Telefilm } from '../../model/Telefilm';
import { ResponseModel } from '../../model/ResponseModel';

@Injectable()
export class GmdbapiProvider {
  gmdbApiUrl = 'https://cors-anywhere.herokuapp.com/http://gmdb-webapi.herokuapp.com/gmdb/';

  constructor(public http: Http) {
    console.log('Hello GmdbapiProvider Provider');
  }

  getAllFavourite() : Observable<Telefilm[]>{
    return this.http.get(this.gmdbApiUrl)
    .map(res => {
        return <Telefilm[]>res.json()
      },
      err => console.log(err))
  }

  delete(id) : Observable<ResponseModel> {
    return this.http.delete(this.gmdbApiUrl + '/' + id)
    .map(res => <ResponseModel> res.json());
  }

  addFavourite(data) : Observable<ResponseModel> { 
    return this.http.post(this.gmdbApiUrl, data)
      .map(res => <ResponseModel>res.json())
  }

  addToken(token){
    let sendToken = { token: token };
    console.log(sendToken);
    return this.http.post(this.gmdbApiUrl + '/token', sendToken)
      .map(res => console.log(res));
  }
}
