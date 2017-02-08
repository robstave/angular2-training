import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usa',
  templateUrl: './usa.component.html',
  styleUrls: ['./usa.component.css']
})
export class UsaComponent implements OnInit {
  favorite = "California";
  others = ["Nevada", "Oregon", "Utah","Oklahoma"];
  constructor() { }

  ngOnInit() {
  }

}
