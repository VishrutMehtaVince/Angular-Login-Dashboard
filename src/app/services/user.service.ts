import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  name: string;
  address: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly STORAGE_KEY = 'userProfile';
  private profileSubject: BehaviorSubject<UserProfile>;

  constructor() {
    const initialProfile = this.getStoredProfile();
    this.profileSubject = new BehaviorSubject<UserProfile>(initialProfile);
  }

  private getStoredProfile(): UserProfile {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.error('Error parsing stored profile data:', e);
      }
    }
    return {
      name: 'XYZ',
      address: 'USA',
      email: 'xyz@gmail.com',
      phone: '9281718181',
    };
  }

  getUserProfile(): Observable<UserProfile> {
    return this.profileSubject.asObservable();
  }

  updateUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      this.profileSubject.next(profile);
      console.log('Profile saved successfully:', profile);
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  }
}
