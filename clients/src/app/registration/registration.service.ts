import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Register } from '../Registration';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {

  constructor(private http: Http) { }

  //retriving  ContactService
  getUser()
    {
      return this.http.get('http://localhost:3000/api/getuser')
      .map(res => res.json());
    }
   
   //add contact
   addUser(newUser)
   { 
   
     var headers = new Headers();
     headers.append('Content-Type','application/json');
     
     return this.http.post('http://localhost:3000/api/adduser', newUser,{headers:headers})
    .map(res => res.json());
   
    
   } 

   //delete contact
   deleteUser(id)
   {
  return this.http.delete('http://localhost:3000/api/deleteuser/'+id)
    .map(res => res.json());
   }


}


