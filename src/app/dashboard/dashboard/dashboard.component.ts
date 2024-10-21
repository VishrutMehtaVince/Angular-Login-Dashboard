import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('currentUser');
  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
