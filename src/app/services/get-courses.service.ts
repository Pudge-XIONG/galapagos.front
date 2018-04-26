import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http} from '@angular/http';
import {Course} from '../classes/Course';
import 'rxjs/add/operator/map';
import * as lodash from 'lodash';

@Injectable()
export class GetCoursesService {

  private coursesArray: Observable<Course[]>;

  constructor(private httpClient: Http) { 
    
  };

  public getCourseByDate(date: Date): Observable<any> {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let restUrl = '/galapagos.taxi/export_recap_to_excel.php?year=' + year + '&month=' + month;
    //let restUrl = 'http://localhost/galapagos.taxi/export_recap_to_excel.php?year=' + year + '&month=' + month;
    console.log('calling web service ' + restUrl);
    return this.httpClient.get(restUrl);
  };
}
