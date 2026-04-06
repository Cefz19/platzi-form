import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchField = new FormControl;
  results: any[] = [];

  http = inject(HttpClient);

  ngOnInit(): void{
    this.searchField.valueChanges
    .pipe(debounceTime(300))
    .subscribe( value => {
      this.getData(value);
    })
  }

  private getData(query: string) {
    const API = 'fRqE7Z6ywo5g4G7H6cM7nhFsyAka2hJw'
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
    .pipe(
      map((response:  any) => {
        return response.data.map(item => item.images.downsized)
      })
    )
    .subscribe((data) => {
      this.results = data;
    })
    ;
  }

}
