import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions} from '@angular/http';
import { Login } from '../Login';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

 token: string;
  constructor(private http: Http) { }

  userLogin(newUser)
    {
        let headers = new Headers();
		headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // let authToken = localStorage.getItem('auth_token');
        // headers.append('Authorization', `Bearer ${authToken}`);
        return this.http.post('http://localhost:3000/api/login', newUser, options)
        .map((res) => this.setToken(res));
    }

    setToken(res){
    let body = JSON.parse(res['_body']);
    if( body['success'] == true ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({ 
        email: body['user']['email'], 
        token: this.token 
      }));
    }
    return body;
  }

}
