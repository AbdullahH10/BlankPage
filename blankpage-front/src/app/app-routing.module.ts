import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageboxComponent } from './messagebox/messagebox.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'inbox', component: InboxComponent},
  { path: 'writeMessage', component: MessageboxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
