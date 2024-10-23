import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService, UserProfile } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<UserProfile> {
  constructor(private userService: UserService) {}

  resolve(): Observable<UserProfile> | Promise<UserProfile> | UserProfile {
    return this.userService.getUserProfile();
  }
}
