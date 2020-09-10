import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<any>;

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  async login(credentials: any): Promise<any> {
    const result = await this.fireAuth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    return result.user;
  }

  async register(credentials: any): Promise<any> {
    const result = await this.fireAuth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    return result.user;
  }

  async logout(): Promise<void> {
    await this.fireAuth.signOut();
  }

  getCurrentUser(): Promise<User> {
    return this.fireAuth.authState.pipe(first()).toPromise();
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.fireAuth.currentUser).sendEmailVerification();
  }

  getUser(): Observable<User> {
    return this.fireAuth.authState;
  }
}
