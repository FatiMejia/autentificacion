import { Injectable, NgZone} from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';

export interface User{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState : any;

  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone:NgZone
  ) { 
    this.fireAuth.authState.subscribe(user =>{
      if(user){
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user') as any);
      }else{
        localStorage.setItem('user',null!);
        JSON.parse(localStorage.getItem('user')as any);
      }
    })
  }

  //metodo para login con usuario y contraseña
  login(email:string, password:string){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['home']);
      });
      this.setUserData(result.user);
    }).catch((error)=>{
      window.alert(error.message)
    })

  }

  //metodo para registro con usuario y contraseña
  registrar(email:string, password:string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      this.sendVerificationMail();
      this.setUserData(result.user);
    }).catch((error)=>{
      window.alert(error.message)
    })
  }
}
