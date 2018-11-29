import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';
// import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) { }

  get userName() {
    return this.registrationForm.get('userName');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }
  ngOnInit() {
    this.registrationForm = this.init();

    // conditional validation on email by subscribe field
    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      })
  }
  init(): FormGroup {
    return this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: [''],
      }),
      alternateEmails: this.fb.array([])
    }, { validator: PasswordValidator });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
      response => console.log('Success', response),
      error => console.error('Error!', error)
      );
  }

  addItem(item: string): FormControl {
    return new FormControl(item);
  }
  loadAPIData() { // This is test data for UI, will be replaced by backend REST API call later...

    this.registrationForm.patchValue({
      userName: 'Bruce',
      email: 'lee@gmail.com',
      subscribe: false,
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'Mississauga',
        state: 'Ontario',
        postalCode: 'L4Z3V3'
      },

      // alternateEmails: emailList
    });
    // dynamically add emails from server to template
    const arr = new FormArray([]);
    let emailList = ['leesungki@gmail.com', 'scott.lee@td.com', 'rufina@test.com'];
    emailList.forEach(item => arr.push(this.addItem(item)))
    this.registrationForm.setControl('alternateEmails', arr);

    // To load data by FormGroup...
    // registrationForm = new FormGroup({
    //   userName: new FormControl(''),
    //   password: new FormControl(''),
    //   confirmPassword: new FormControl(''),
    //   address: new FormGroup({
    //     city: new FormControl(''),
    //     state: new FormControl(''),
    //     postalCode: new FormControl('')
    //   })
    // });

    // loadAPIData() {
    //   this.registrationForm.setValue( {
    //     userName: 'Bruce', 
    //     password: 'test', 
    //     confirmPassword: 'test', 
    //     address: {
    //       city: 'Mississauga', 
    //       state: 'Ontario', 
    //       postalCode: 'L4Z3V3'
    //     }
    //   })

    // this.registrationForm.patchValue( {
    //   userName: 'Bruce', 
    //   password: 'test', 
    //   confirmPassword: 'test'
    // })
  }

}
