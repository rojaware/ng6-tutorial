import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;
  errorMsg = '';
  sucessMsg = '';
  userModel = new User('Rohit', 'test@gmail.com', 4163173344, 'default', 'morning', true);

  constructor(private _enrollmentService: EnrollmentService) {

  }
  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }

  }

  onSubmit() {
    this.submitted = true;
    this._enrollmentService.enrol(this.userModel)
    .subscribe(
      data => this.successMsg = 'Submitted Successfully';
      error => this.errorMsg = error.statusText
    )
  }
}
