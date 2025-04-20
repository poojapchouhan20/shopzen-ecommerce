import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    //ROUTE THE DATA TO OUR SEARCH ROUTE , IT WILL BE HANDLED BY THE ProductListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }


}
