import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full'},
  { path:'login', component:LoginComponent },
  { path:'registro', component:RegistroComponent },
  { path:'home', component:HomeComponent },
  { path:'forgot-password', component:ForgotPasswordComponent},
  { path:'verificar-email', component:VerificarEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
