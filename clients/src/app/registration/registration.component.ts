import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Register } from '../Registration';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {

//registers: Register[];
 registers:Register[]=[];
register: Register;
msg: String;
show:Boolean=false;

first_name: String;
last_name: String;
phone: String;
email:String;
city:String;
state:String;
password:String;
cpassword:string;

  constructor(private registerservice: RegistrationService, private router: Router) { }

 
  registerUser()
  {
    const newUser={
      first_name: this.first_name,
      last_name: this.last_name,
      phone:this.phone,
      email:this.email,
      city:this.city,
      state:this.state,
      password:this.password,
      cpassword:this.cpassword
    }   
    this.registerservice.registerUser(newUser)
    .subscribe(register => {
      this.registers.push(register); 
      console.log('Registers',this.registers);
      for(let i=0;i<this.registers.length;i++)
      {
       if(this.registers[i]['success']==true){ 
         
                 this.router.navigate(['/login']);
                 
      }else{
          console.log('Message',this.registers[i]['message']);
          this.msg=this.registers[0]['message'];
          this.show=true;
          this.router.navigate(['/register']);
        }
      }
    }); 
      this.registers=[];            
  }
 
  //deleteContact into mongodb
  deleteContact(id:any)
  {
    var registers= this.registers;
    this.registerservice.deleteUser(id)
    .subscribe(data=>{
      if(data.n==1)
      { 
        //length and splice are the union types that we need to import

        for(var i=0; i< registers.length; i++)
        {
          if(registers[i]._id== id)
          {
            registers.splice(1,1);
          }

        }
      }
    });
  }
   ngOnInit() {
    //we are putting our retriving data logic inside ngOnInIt
    // this.registerservice.getUser()
    // .subscribe(registers =>
    // this.registers = registers);
    
  }
}
