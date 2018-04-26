import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MyDateAdapter} from '../../classes/MyDateAdapter';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@Component({
  selector: 'app-course-filters',
  templateUrl: './course-filters.component.html',
  styleUrls: ['./course-filters.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MyDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})

export class CourseFiltersComponent implements OnInit {
  _pickedDate: Date;
  _pickedState: String;

  @Input()
  public set pickedState(value: String){
    this._pickedState = value;
    this.pickedStateChange.emit(this._pickedState);
  };

  public get pickedState(): String{
    return this._pickedState;
  };

  @Input()
  public set pickedDate(value: Date){
    this._pickedDate = value;
    this.pickedDateChange.emit(this._pickedDate);
  };

  public get pickedDate(): Date{
    return this._pickedDate;
  };

  @Output() pickedDateChange = new EventEmitter();
  @Output() pickedStateChange = new EventEmitter();
  

  selectedState = "None";

  constructor(private adapter: DateAdapter<any>) {}

  ngOnInit() {
    this.adapter.setLocale('fr');
  }

}
