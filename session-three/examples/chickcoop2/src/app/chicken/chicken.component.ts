import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Chicken } from './chicken.model';   

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  outputs: ['deleteEvent', 'eggEvent'],
  styleUrls: ['./chicken.component.css']
})
export class ChickenComponent implements OnInit {

  deleteEvent: EventEmitter<string>
  eggEvent: EventEmitter<number>

  @Input() chicken: Chicken; 

  constructor() {
    this.deleteEvent = new EventEmitter();
    this.eggEvent = new EventEmitter();
  }

  deleteChicken(name: string): void {
    this.deleteEvent.emit(name)
  }


  addEgg() {
    this.chicken.addEgg();
    this.eggEvent.emit(null)
  }

  collectEggs() {
       this.eggEvent.emit(this.chicken.collectEggs());
  }

  ngOnInit() {
  }

}
