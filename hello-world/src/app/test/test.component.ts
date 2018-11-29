import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public name = "Codevolution";
  public successClass="text-success";
  public hasError = true;
  public isSpecial = true;
  public messageClasses = {
    "text-success": !this.hasError,
    "text-danger": this.hasError,
    "text-special": this.isSpecial
  }
  public highlightColor = 'orange';
  public titleStyles = {
    color:"blue", 
    fontStyle: "italic"
  }
  public greeting : string;

  public myId = "test id";
  public isDisabled : boolean;
  constructor() { }

  ngOnInit() {
    this.isDisabled = true;
  }

  onClick(event) {
    this.greeting = event.type;
  }

  logMessage(value) {
    console.log(value);
  }
}
