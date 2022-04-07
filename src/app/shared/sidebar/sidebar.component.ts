import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string = '';
  authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe(({ user }) => {
      this.userName = user.name;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
