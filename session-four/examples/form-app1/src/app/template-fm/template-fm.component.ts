import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-fm',
  templateUrl: './template-fm.component.html',
  styleUrls: ['./template-fm.component.css']
})
export class TemplateFmComponent implements OnInit {

  constructor() { }

  onSubmit(x){
    console.log(x)
   
  }
  ngOnInit() {
  }

}
