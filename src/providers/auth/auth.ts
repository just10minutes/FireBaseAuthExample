import { Injectable } from '@angular/core';
import firebase from 'firebase';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor() {}


  loginUser(email: string, password: string): firebase.Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: email });
      });
    }

  resetPassword(email: string): firebase.Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
    }
  
  logoutUser(): firebase.Promise<void> {
    return firebase.auth().signOut();
    }
}
