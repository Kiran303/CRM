import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../Login';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ IndexService ]
})
export class IndexComponent implements OnInit {

user: Login;
 message: String;
  constructor(private indexService : IndexService,  private router: Router) { }

  ngOnInit() {

     
    //this.user = JSON.parse(localStorage.getItem('currentUser'));

    try{
      var local_storage = JSON.parse(localStorage.getItem('currentUser'));
     // console.log(`in Index init() ${local_storage.token}`);
      if(local_storage.token){
      console.log('if case');
      this.router.navigate(['/index']);
      }else{
        console.log('else case');
      }
    }
    catch(e){ 
      this.router.navigate(['/login']);
    }
    //example of verification
   // this.indexService.verify().subscribe( (res) => this.message = res['message']);
  }

  logout() {
    this.indexService.logout();
    this.user = null;
    this.message = "Logged out";
    this.router.navigate(['/login']);
  }

}
