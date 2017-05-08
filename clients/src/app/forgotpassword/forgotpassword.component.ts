import { Component, OnInit } from '@angular/core';
import {ForgotService} from './forgot.service';
import { Forgot } from '../forgot';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [ForgotService]
})
export class ForgotpasswordComponent{
forgots: Forgot[] = [];
forgot: Forgot;
msg : String;

email_id:String;
password:String;

  constructor(public forgotservice: ForgotService) { }

  addUser() {
        const newUser={
                       email_id:this.email_id,
                       password:this.password
                      }
 
   this.forgotservice.addNew(newUser)
      .subscribe(forgot => {
      this.forgots.push(forgot);
      if(this.forgots[0]['success']==false){
        this.msg = this.forgots[0]['message'];
         console.log('Forgot message false :',this.msg,this.forgots[0]['message']);
        }
        else{
          console.log('Forgot message true:',this.msg,this.forgots[0]['message']);
        }
      }     
      )}


}
