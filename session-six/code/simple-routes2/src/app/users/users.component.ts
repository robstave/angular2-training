import { Component, OnInit, } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: Object;
  user: Object;
  loading: boolean;
  id: string;

  constructor(private http: Http) {
    this.http = http;
  }

  onError = function (e) {
    console.log("error", e);
  }

  //called unconditionally
  onComplete = function (url) {
    console.log("Completed:" + url);
  }

  makeRequest(id: string): void {

    //clear data and loading
    this.data = "";
    this.loading = false;

    let usersUrl = "http://jsonplaceholder.typicode.com/users"
    if (id) {
      usersUrl = usersUrl + "/" + id;
    }


    //start loading
    this.loading = true;

    //build request and subscribe to results.

    this.http.request(usersUrl)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)
      );
  }


  ngOnInit() {
    this.makeRequest(this.id)
  }

}
