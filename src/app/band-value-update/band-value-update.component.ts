import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-band-value-update',
  templateUrl: './band-value-update.component.html',
  styleUrls: ['./band-value-update.component.scss']
})
export class BandValueUpdateComponent implements OnInit {
  userForm: any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      company  : ['', Validators.required],
      dimension: ['', Validators.required],
      factors: ['', Validators.required],
      attributes: ['', Validators.required],
      bandvaluess: ['', Validators.required],
    });
  }

}
