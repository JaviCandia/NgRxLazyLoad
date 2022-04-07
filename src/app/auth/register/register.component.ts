import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/store/actions/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  isLoading: boolean = false;
  uiSubscription!: Subscription;
  
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(({isLoading}) => {
      this.isLoading = isLoading;
    })
  }

  invalidInput(fieldName: string) {
    return this.registerForm.get(fieldName)?.invalid && this.registerForm.get(fieldName)?.touched;
  }

  validInput(fieldName: string) {
    return this.registerForm.get(fieldName)?.valid;
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(isLoading());
    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
      .then(() => {
        this.store.dispatch(stopLoading());
      }).catch(() => {
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
