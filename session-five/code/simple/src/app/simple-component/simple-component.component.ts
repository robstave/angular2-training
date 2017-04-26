import { Component, OnInit } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'app-simple-component',
  templateUrl: './simple-component.component.html',
  styleUrls: ['./simple-component.component.css']
})
export class SimpleComponentComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private http: Http) {
    this.http = http;
  }

  onError = function (e) {
    console.log('error', e);
  }

  // called unconditionally
  onComplete = function (url) {
    console.log('Completed:' + url);
  }

  makeRequest(id: number): void {

    // clear data and loading
    this.data = null;
    this.loading = false;

    let usersUrl = 'http://jsonplaceholder.typicode.com/users';
    if (id) {
      usersUrl = usersUrl + '/' + id;
    }

    // start loading
    this.loading = true;

    // build request and subscribe to results.

    this.http.request(usersUrl)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)

      );
  }

  makeRequestForElvis(): void {

    // clear data and loading
    this.data = '';
    this.loading = false;

    const params: URLSearchParams = new URLSearchParams();
    params.set('website', 'elvis.io');


    const usersUrl = 'http://jsonplaceholder.typicode.com/users';

    let headers: Headers = new Headers(); //<--- Added
    headers.append("Cache-Control", "no-store"); //<--- Added
    headers.append("Access-Control-Allow-Credentials", "true"); //<--- Added
    headers.append("Session-token", "password"); //<--- Added

    // start loading
    this.loading = true;

    // build request and subscribe to results.

    this.http.request(usersUrl, { params: params, headers: headers })
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)

      );
  }

  ngOnInit() {
  }

}