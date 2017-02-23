import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit {

  user: Object;
  loading: boolean;
  id: string;

  constructor(private route: ActivatedRoute, private userDataService: UserDataService) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  makeRequest(id: string): void {

    //clear data and start loading
    this.user = "";
    this.loading = true;

    //build request and subscribe to results.

    this.userDataService.getUser(id)
      .subscribe(res => {
        this.user = res.json();
        this.loading = false;
      });
  }

  ngOnInit() {
    this.makeRequest(this.id)
  }

}

