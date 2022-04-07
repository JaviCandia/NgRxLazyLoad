import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { setUser, unsetUser } from '../store/actions/auth.actions';
import { AppState } from '../store/app.reducer';
import { User } from '../models/user.model';

import Swal from 'sweetalert2';
import { unsetItems } from '../store/actions/income-expense.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestoreSubscribe!: Subscription;

  constructor(
    public fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        // if there is user get data from firestore
        this.firestoreSubscribe = this.firestore.collection<User>('users').doc(user.uid)
          .valueChanges()
          .subscribe((firestoreUser) => {
            const user = User.getUser(firestoreUser!);
            this.store.dispatch(setUser({ user }));
          });
      } else {
        // unsubscribe if there's no user
        this.firestoreSubscribe?.unsubscribe();
        this.store.dispatch(unsetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // Updates the displayName of the user in the Auth table
        user?.updateProfile({
          displayName: name,
        });

        // Creates a new record in the Firestore table (User)
        this.firestore.collection<User>('users').doc(user?.uid).set({
          uid: user?.uid,
          name,
          email,
        });

        this.router.navigate(['/dashboard'])
      })
      .catch(({ message }) => {
        this.errorMessage(message);
      });
  }

  login(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.router.navigate(['/dashboard'])
      })
      .catch(({ message }) => {
        this.errorMessage(message);
      });
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState.pipe(map((user) => user != null));
  }

  // SweetAlert stuff
  errorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}
