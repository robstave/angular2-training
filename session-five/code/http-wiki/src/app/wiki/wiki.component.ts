import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { WikiserviceService } from '../services/wikiservice.service';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  items: Observable<Array<string>>;
  term = new FormControl();
  
  makeData   = function (x:string) {
    return [x, x+"dd"];
  }

  constructor(private wikiService :  WikiserviceService) {}
  
 ngOnInit() {
    this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.wikiService.search(term));
  }

}
