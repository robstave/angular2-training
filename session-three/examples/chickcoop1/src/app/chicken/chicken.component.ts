import { Component, OnInit, Input } from '@angular/core';
import { Chicken } from './chicken.model';  //<--Added

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  styleUrls: ['./chicken.component.css']
})
export class ChickenComponent implements OnInit {


  @Input() chicken: Chicken; // <-- Changed to chicken

  constructor() { }

  ngOnInit() {
  }

}
