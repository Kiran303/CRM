import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IndexService {

  constructor(public http: Http) { }
token: string;

   logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  //  verify(): Observable<Object> {

  //   let currUser = JSON.parse(localStorage.getItem('currentUser')); 
  //   let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
  //   let headers = new Headers({ 'x-access-token': token });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get('http://localhost:3000/api/success', options).map( res => this.parseRes(res) );
    
  // }

  // parseRes(res){
  //   let body = JSON.parse(res['_body']);
  //   return body;
  // }
}
