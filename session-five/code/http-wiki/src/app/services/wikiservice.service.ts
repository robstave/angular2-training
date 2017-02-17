import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
 
@Injectable()
export class WikiserviceService {
  
  constructor(private jsonp: Jsonp) {}
  
  public search(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
                .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                .map((request) => request.json()[1]);
  }

}

 
