import { Component, OnInit } from '@angular/core';
import { Chicken } from '../chicken/chicken.model';  //<--Added

@Component({
  selector: 'app-chicken-list',
  templateUrl: './chicken-list.component.html',
  styleUrls: ['./chicken-list.component.css']
})
export class ChickenListComponent implements OnInit {

  chickens: Chicken[];  

  eggs: number = 0;
  collectedEggs: number = 0;

  constructor() { 
 
    let lineup = new Array<Chicken>();

    lineup.push(new Chicken('Moneypenny'));
    lineup.push(new Chicken('Butterbean',2));
    lineup.push(new Chicken('Pickles', 3, 'Rhode Island Red'));
    lineup.push(new Chicken('Nugget'));
    this.chickens = lineup;
  }

  deleteChickenFromList(chickenName: string){  
      console.log(`Chicken flew the coop: ${chickenName}`);

      this.chickens = this.chickens.filter(
            (chicken) => !(chicken.name === chickenName)
      );

      this.eggEvent(null);
  }

  eggEvent(collected: number){  
       
      if (collected !== null){
           this.collectedEggs = this.collectedEggs + collected;
      }

      this.eggs = this.chickens.map(function(c){
        return c.eggs
      }).reduce((a, b) => a + b, 0);
      console.log("eggs:"+this.eggs)
   
  }

  ngOnInit() { 
     this.eggEvent(null);
  }

  public addChicken(newLilClucker:Chicken){
    this.chickens.push(newLilClucker);
  }

}
