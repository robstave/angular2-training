import { Component, OnInit } from '@angular/core';
import { Chicken } from '../chicken/chicken.model';  //<--Added

@Component({
  selector: 'app-chicken-list',
  templateUrl: './chicken-list.component.html',
  styleUrls: ['./chicken-list.component.css']
})
export class ChickenListComponent implements OnInit {

  chickens: Chicken[];   

  
  constructor() { 
 
    let lineup = new Array<Chicken>();

    lineup.push(new Chicken('Moneypenny'));
    lineup.push(new Chicken('Butterbean',2));
    lineup.push(new Chicken('Pickles', 3, 'Rhode Island Red'));
    lineup.push(new Chicken('Nugget'));
    this.chickens = lineup;
  }

  ngOnInit() {
 
  }

  public addChicken(newLilClucker:Chicken){
    this.chickens.push(newLilClucker);
  }

}
