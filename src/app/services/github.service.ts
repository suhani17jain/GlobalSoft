import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private projecName = 'Rohans1994';
  private username='abc';
  openIssue;
  closedIssue;

  constructor(private _http:Http){
    console.log('Github Service Init...');  
    }

    getOpen(){
     return this._http.get('https://api.github.com/repos/'+this.username+'/'+this.projecName)
      .pipe(
        map((response:Response)=>
        response.json()),
      );
      
  }
  getClosed(){
    return this._http.get('https://api.github.com/search/issues?q=repo:'+this.username+'/'+this.projecName+'+type:issue+state:closed')
    .pipe(
      map((response:Response)=>
        response.json()),
  ) ;
}

  updateURL(projecName:string, username:string){
      this.projecName = projecName;
      this.username = username;
  }


}
