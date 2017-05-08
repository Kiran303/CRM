import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResetpasswordService {

  constructor(private http: Http) { }
  
  resetUser(newUser)
  {
        var headers = new Headers();
     headers.append('Content-Type','application/json');
     
     return this.http.post('http://localhost:3000/api/reset', newUser,{headers:headers})
    .map(res => res.json());

  }



}
