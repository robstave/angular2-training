import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

 id: string = null;
  loading: boolean;
  data: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UserDataService) {
    this.route.parent.params.subscribe(params => {
      this.id = params["id"];
    });
  }

  makeRequest(id: string): void {

    //clear data and loading
    this.data = null;
    this.loading = true;

    //build request and subscribe to results.

    this.userDataService.getUserAlbums(id)
      .subscribe(res => {
        this.data = res.json();
        this.loading = false;
      });
  }

  ngOnInit() {
    this.makeRequest(this.id);
  }

}

