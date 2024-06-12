import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  msg = "";
  frm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{8,}$/)]),
    lastname: new FormControl('', [Validators.minLength(2), Validators.required]),
    emailid: new FormControl('', [Validators.email, Validators.required]),
    gender: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    isverified: new FormControl('', Validators.required)
  });

  onSubmit() {
    console.log(this.frm.value);
    this.msg = JSON.stringify(this.frm.value, null, 2);
  }

  countryList = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'UK' }
  ];
}
