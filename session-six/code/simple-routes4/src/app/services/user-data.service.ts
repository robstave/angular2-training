import { Injectable, } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UserDataService {

  constructor(private http: Http, ) {
    this.http = http;
  }

  //Get users given a user Id
  getUser(id: string): Observable<any> {
    let userUrl = "http://jsonplaceholder.typicode.com/users/" + id;
    return this.http.request(userUrl);
  };

  //Get all users.
  getUsers(): Observable<any> {
    let userUrl = "http://jsonplaceholder.typicode.com/users";
    return this.http.request(userUrl);
  };

  getUserTodos(id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', id);

    let userUrl = "http://jsonplaceholder.typicode.com/todos";
    return this.http.request(userUrl, { search: params });
  };

  getUserPosts(id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', id);

    let userUrl = "http://jsonplaceholder.typicode.com/posts";
    return this.http.request(userUrl, { search: params });
  };

  getUserAlbums(id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', id);

    let userUrl = "http://jsonplaceholder.typicode.com/albums";
    return this.http.request(userUrl, { search: params });
  };


}
