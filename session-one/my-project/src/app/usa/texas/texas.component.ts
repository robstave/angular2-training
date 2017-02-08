import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-texas',
  template: `
          <p>
             Dont mess with Texas!
            <app-dallas></app-dallas>
          </p>   `,
  styles: [`
   p {
    border-style: solid;
    border-color: red;
     }
  `]
})
export class TexasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
