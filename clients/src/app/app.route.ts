import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { IndexComponent } from './index/index.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'index', component: IndexComponent },
	{ path: 'forgot', component: ForgotpasswordComponent },
    { path: 'reset', component: ResetpasswordComponent }
];

export const routing = RouterModule.forRoot(appRoutes);