import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

@Input('parentData') public name;
@Output() public childEvent = new EventEmitter();

 displayName = false;
 public color = 'red';
 public colors = ["red", "blue", "green", "yellow"]

  constructor() { }

  ngOnInit() {
  }

  fireEvent() {
    this.childEvent.emit('Hey Giwon from Child');
  }
}
