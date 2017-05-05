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

first_name: String;
last_name: String;
phone: String;
email:String;
city:String;
state:String;
password:String;
cpassword:string;

  constructor(private registerservice: RegistrationService, private router: Router) { }

 
  addUser()
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
    this.registerservice.addUser(newUser)
    .subscribe(registers => {
      this.registers.push(registers); 
      console.log('Registers',this.registers);
       if(this.registers[0]['success']==true){ 
                 this.router.navigate(['/login']);
      }else{
          console.log('Message',this.registers[0]['message']);
        }
    });
    
      this.first_name=null;
      this.last_name=null;
      this.phone=null;
      this.email=null;
      this.city=null;
      this.state=null;
      this.password=null;
      this.cpassword=null;               
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
