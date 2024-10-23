import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <app-navbar *ngIf="!isLoginPage"></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = true;

  constructor(private router: Router) {}
  ngOnInit() {
    this.checkRoute(this.router.url);

    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.url);
      });
  }
  // this.router.events.subscribe((event) => {
  //   if (event instanceof NavigationEnd) {
  //     this.isLoginPage = event.url === '/login';
  //   }
  // });
  private checkRoute(url: string) {
    this.isLoginPage = url === '/login' || url === '/';
  }
}
