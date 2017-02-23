import { Component, OnInit } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Object;
  loading: boolean;
  id: string;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.http = http;
    route.params.subscribe(params => { this.id = params['id']; });
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

    this.user = "";
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

        this.user = res.json();
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

