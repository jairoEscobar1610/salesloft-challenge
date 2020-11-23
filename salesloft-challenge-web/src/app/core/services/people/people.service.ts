import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';

import { environment } from '../../../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { People } from 'src/app/shared/models/people.model';
import { CharacterFrequency } from 'src/app/shared/models/character-frequecy.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

   public apiUrl = environment.apiUrl;  // URL to web api

  constructor(
    private http: HttpClient,
    private logger: LoggerService) { }

  /**
   * @description Get list of people
   * @param page 
   * @param per_page 
   */
  getPeopleList (page?:number,per_page?:number): Observable<any> {
    const url = `${this.apiUrl}/people/list`;
    let params = new HttpParams();

    params = (page ? params.append('page',`${page}`) : params);
    params = (per_page ? params.append('per_page',`${per_page}`) : params);
    return this.http.get<People[]>(url, {params})
      .pipe(
        tap(_ => this.log('fetched people')),
        catchError(this.handleError('getPeopleList', []))
      );
  }

  /**
   * @description Get character frequency from people list
   */
  getCharacterFrequency (): Observable<any> {
    const url = `${this.apiUrl}/people/character-frequency`;

    return this.http.get<CharacterFrequency[]>(url)
      .pipe(
        tap(_ => this.log('fetched frequency')),
        catchError(this.handleError('getCharacterFrequency', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.logError(`${operation} failed: ${error.message}`);

      return of(error as T);
    };
  }

  /** Log error messages from api calls*/
  private logError(message: string) {
    this.logger.error(`People Service (error): ${message}`);
  }
  private log(message: string) {
    this.logger.info(`People Service (info): ${message}`);
  }

}
