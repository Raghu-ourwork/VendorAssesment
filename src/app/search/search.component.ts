import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedValue: string;

  constructor(private router: Router,) { }
  ngOnInit(): void {
  }

  selectedOption(event) {
    this.selectedValue = event.option.value;
    localStorage.setItem('company name', this.selectedValue);
    this.router.navigate(['/reports']);
  }

  myControl = new FormControl();
  options: string[] = ['Company name 1', 'Company name 2', 'Company name 3'];
}
