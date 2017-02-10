import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ChickenListComponent } from './chicken-list/chicken-list.component'; //<--Added
import { Chicken } from './chicken/chicken.model';  //<--Added

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(ChickenListComponent) chickenList: ChickenListComponent 

  ngAfterViewInit(){
        console.log('How many Chickens: ' + this.chickenList.chickens.length);
  }

  addChicken(name: HTMLInputElement, breed: HTMLInputElement): boolean {
    console.log(`Adding Chicken name: ${name.value} breed: ${breed.value}`);

    let newChicken:Chicken = new Chicken(name.value, 0, breed.value );
    name.value = '';
    breed.value = '';
 
    this.chickenList.addChicken(newChicken);
    return false;
  }

}
