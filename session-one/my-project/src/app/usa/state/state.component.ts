import { Component, 
         OnInit, 
         Input // <-- Added
        } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styles: [`
   p {
    border-style: solid;
    border-color: yellow;
     }
  `]
})
export class StateComponent implements OnInit {

  @Input() name: string = "meh"; // <-- added Input annotation

  constructor() {   }

  ngOnInit() {
  }

}
