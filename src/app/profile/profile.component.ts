import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService, UserProfile } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  isEditing: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.getUserProfile().subscribe((profile) => {
        if (profile) {
          this.profileForm.patchValue(profile);
          if (!this.isEditing) {
            this.profileForm.disable();
          }
        }
      })
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      if (this.profileForm.valid) {
        const updatedProfile: UserProfile = this.profileForm.value;
        this.userService.updateUserProfile(updatedProfile);
        console.log('Saving profile:', updatedProfile);
      }
      this.profileForm.disable();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
