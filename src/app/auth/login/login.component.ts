import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/store/actions/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  uiSubscription!: Subscription;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) { 
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.isLoading = isLoading;
    });
  }

  invalidInput(fieldName: string) {
    return (
      this.loginForm.get(fieldName)?.invalid &&
      this.loginForm.get(fieldName)?.touched
    );
  }

  validInput(fieldName: string) {
    return this.loginForm.get(fieldName)?.valid;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(isLoading());
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then(() => {
        this.store.dispatch(stopLoading());
      }).
      catch(() => {
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
