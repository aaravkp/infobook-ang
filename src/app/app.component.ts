import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infobook';
  name = "Arvind";
  address = "Banaglore";

  products:any = [];

  constructor(private http:HttpClient)
  {
  }
  ngOnInit()
  {
    let obs = this.http.get('http://adasdem2.eastus.cloudapp.azure.com:8963/solr/imagecollection_shard1_replica1/select?q=MetaDataText%3A*wire*&wt=json&indent=true');
    obs.subscribe((response)=> console.log(response));
    //this.getProductsData();
    
  }
  endpoint = 'http://localhost:64027/api/values/asjson';
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
private extractData(res: Response) {
  let body = res;
  return body || { };
}

getProducts(): Observable<any> {
  return this.http.get(this.endpoint).pipe(
    map(this.extractData));
}
getProductsData() {
  this.products = [];
  this.getProducts().subscribe((data: {}) => {
    console.log(data);
    this.products = data;
    
  });
}  


}
