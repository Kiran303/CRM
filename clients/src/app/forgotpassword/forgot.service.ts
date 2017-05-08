import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ForgotService {
  

  constructor(private http: Http) { }

   addNew(newUser)
   { 
     var headers = new Headers();
     headers.append('Content-Type','application/json');
     
     return this.http.post('http://localhost:3000/api/sendResetLink',newUser,{headers:headers})
    .map(res => res.json(),console.log(newUser));
   
    
   } 
}



