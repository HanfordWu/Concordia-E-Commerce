import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Observer, of } from "rxjs";
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
    providedIn: "root",
})
export class ShopFormService {

  private countriesUrl = '/api/countries'
  private statesUrl = '/api/states'
    constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]>{
  return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(map(response => response._embedded.countries))
  }



    getCreditCardMonths(startMonth: number): Observable<number[]> {
        let data: number[] = [];
        // build an array for "month" dropdown list, start at current month and loop until
        for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
            data.push(theMonth);
        }
        return of(data);
    }


    getStates(theCountryCode: string): Observable<State[]>{
      const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
      return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(map(response => response._embedded.states))
    }




    getCreditCardYears(): Observable<number[]> {
        let data: number[] = [];
        const startYear: number = new Date().getFullYear();
        const endYear: number = startYear + 10;
        for (let theYear = startYear; theYear <= endYear; theYear++) {
            data.push(theYear);
        }
        return of(data);
    }
}


interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}