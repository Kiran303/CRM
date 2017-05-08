import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../Login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
 //[] remove if errr push is unable to push of 
 logins:Login[]=[];
 login:Login;
 user:boolean=false;
 email:String;
 password:String;
 msg: String;
show:Boolean=false;

  constructor( 
        private loginService:LoginService,
        private route: ActivatedRoute,
        private router: Router
        )
         { }
  
  
Login(){
  const newUser={
      email:this.email,
      password:this.password
    }
     this.loginService.userLogin(newUser)
    .subscribe(logins=> {
      this.logins.push(logins);
      console.log(this.logins);
      // if(this.logins[0]['success']==true) {
      //     this.router.navigate(['/index']);
      // }else{
      //   console.log('Login msg:',this.logins[0]['message']);
      //     this.msg=this.logins[0]['message']; 
      //     this.show=true;
      //  console.log("after login");
      // }
      for(let i=0;i<this.logins.length;i++)
      {
       if(this.logins[i]['success']==true){ 
         
                 this.router.navigate(['/index']);
                 
      }else{
          console.log('Message',this.logins[i]['message']);
          this.msg=this.logins[0]['message'];
          this.show=true;
        }
      }
               
    });
}

//   Login()
//    {
//       this.loginService.userLogin()
//       .subscribe(logins =>{
//       this.logins = logins;
//       console.log(this.logins);
//       for(let i=0;i<logins.length;i++)
//       {
//         if(logins[i].email==this.email && logins[i].password==this.password)
//         {
//           this.user=true;
//         }
        
//     }
//     console.log(logins);
    
//     if(this.user==true){
//       console.log("login successfull");
//       this.user=false;
//      this.router.navigate(['/index']);
//     }
//     else{
//       console.log("user not found");
//     }
     
//   }
// );

//    }       


  ngOnInit() {
    try{
      var local_storage = JSON.parse(localStorage.getItem('currentUser'));
      //console.log(`in Index init() ${local_storage.token}`);
      if(local_storage.token){
     //console.log('login if case');
      this.router.navigate(['/index']);
      }else{
        console.log('login else case');
      }
    }
    catch(e){ 
      this.router.navigate(['/login']);
    }
  }

}
