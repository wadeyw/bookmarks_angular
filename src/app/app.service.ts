import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/bookmarks';

  getBookmark(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl)
      .pipe(
        tap(book => console.log('fetched book')),
        catchError(this.handleError('getBook', []))
      );
  }

  createBookmark(book: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, book, httpOptions)
      .pipe(
        tap((books) => console.log(`create, id=${books.url}`)),
        catchError(this.handleError<Bookmark>('addBook'))
      );
  }

  updateBookmark(id, book: Bookmark): Observable<any> {
    const selfUrl = `${this.baseUrl}/${id}`;
    console.log('updateBookmark', selfUrl);
    return this.http.put(selfUrl, book, httpOptions)
      .pipe(
        tap(_ => console.log(`uppdate, id=${book.id}`)),
        catchError(this.handleError<Bookmark>('updateBook'))
      );
  }

  deleteBookmark(id): Observable<any> {
    const selfUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<Bookmark>(selfUrl, httpOptions)
      .pipe(
        tap(_ => console.log(`delete, id=${id}`)),
        catchError(this.handleError<Bookmark>('deleteBook'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

export class Bookmark {
  id: string;
  url: string;
  createDate: Date;
  note: string;
}
