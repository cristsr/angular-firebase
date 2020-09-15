import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<any>;

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  async login(credentials: any): Promise<User> {
    const result = await this.fireAuth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    return result.user;
  }

  async loginWithGoogle(): Promise<User> {
    const provider = new auth.GoogleAuthProvider();
    const result = await this.fireAuth.signInWithPopup(provider);
    return result.user;
  }

  async register(data: any): Promise<any> {
    const result = await this.fireAuth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );

    await result.user.updateProfile({
      displayName: data.name
    });

    await this.sendVerificationEmail();

    return result.user;
  }

  async logout(): Promise<void> {
    await this.fireAuth.signOut();
  }

  getCurrentUser(): Promise<User> {
    return this.fireAuth.authState.pipe(first()).toPromise();
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.fireAuth.currentUser).sendEmailVerification({
      url: environment.url
    });
  }

  getUser(): Observable<User> {
    return this.fireAuth.authState;
  }
}
