import { Component, OnInit, } from '@angular/core';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private userDataService: UserDataService) {
  }

  makeRequest(): void {

    //clear data and start loading
    this.data = "";
    this.loading = true;

    //build request and subscribe to results.

    this.userDataService.getUsers()
      .subscribe(res => {
        this.data = res.json();
        this.loading = false;
      });
  }


  ngOnInit() {
    this.makeRequest()
  }

}
