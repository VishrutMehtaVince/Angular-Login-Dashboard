import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <ul class="nav-list">
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        </li>
        <li class="dropdown">
          <button class="dropbtn" (click)="toggleDropdown()">
            More
            <span class="arrow-down">▼</span>
          </button>
          <div class="dropdown-content" [class.show]="isDropdownOpen">
            <a routerLink="/profile">Profile</a>
            <a (click)="logout()">Logout</a>
          </div>
        </li>
      </ul>
    </nav>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  constructor() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.matches('.dropbtn')) {
        this.isDropdownOpen = false;
      }
    });
  }
}
