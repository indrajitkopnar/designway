  import { Component } from '@angular/core';
  import { RegistrationService } from '../registration.service';

  @Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
  })
  export class RegistrationComponent {
    username: string = '';
    email: string = '';
    password: string = '';

    constructor(private registrationService: RegistrationService) {}

    register() {
      this.registrationService.registerUser({
        username: this.username,
        email: this.email,
        password: this.password
      }).subscribe({
        next: (response: any) => {
          console.log('Registration successful');
          // Handle successful registration (e.g., show a success message, redirect to login page)
        },
        error: (error: any) => {
          console.log('Registration failed');
          // Handle registration failure (e.g., show an error message)
        }
      });
    }
  }
