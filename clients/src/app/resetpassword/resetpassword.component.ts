import { Component, OnInit } from '@angular/core';
import { Register } from '../Registration';
import {ResetpasswordService} from './resetpassword.service'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
 providers: [ResetpasswordService]
})
export class ResetpasswordComponent implements OnInit {
registers: Register[]= [];
register: Register;
msg: String;
show:Boolean=false;

  password:String;

  constructor(private resetpasswordservice: ResetpasswordService, private router: Router) { }

newPassword()
{
    const newUser={
                    password:this.password,
                  }
     this.resetpasswordservice.resetUser(newUser)
    .subscribe(register => {
      this.registers.push(register);
      console.log('Reset ',this.registers,this.registers[0]['success']);
      // if(this.registers[0]['success']==true){ 
      //            this.router.navigate(['/login']);
      // }else{
      //     console.log('Message-->',this.registers[0]['message']);
      //   }
      if(this.registers[0]['success']==true){ 
         
                 this.router.navigate(['/login']);
                 
      }else{
          console.log('Message',this.registers[0]['message']);
          this.msg=this.registers[0]['message']; 
          this.show=true;
        }
   });  
     
}

  ngOnInit()
  {
  }

}
