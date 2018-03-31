import { Component, OnInit } from '@angular/core';
import { AppService, Bookmark } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  url = '';
  note = '';

  book = bookmark;
  displayedColumns = ['open', 'url', 'created', 'note', 'command'];
  private bookstro: Bookmark[] = [];

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.getBook();
    // this.createBook('hello.com', 'dummy note');
    // this.updateBook('work.com', 'new note');
    this.deleteBook(2);
  }

  getBook(): void {
    const boosto: any = [];
    this.appService.getBookmark()
      .subscribe(books => {
        for (const book of books['_embedded']['bookmarks']) {
          this.bookstro.push({
            id: book['_links']['self']['href'],
            url: book['url'],
            createDate: new Date(),
            note: book['note'],
          });
        }
        // console.log('get books:', JSON.stringify(this.bookstro));
      });
  }

  createBook(url, note): void {
    this.appService.createBookmark({url, note} as Bookmark)
      .subscribe(book => {
        console.log('create', JSON.stringify(book));
      });
  }

  updateBook(url, note): void {
    this.appService.updateBookmark(1, {url, note} as Bookmark)
      .subscribe(book => {
        console.log('update', JSON.stringify(book));
      });
  }

  deleteBook(id): void {
    this.appService.deleteBookmark(id)
      .subscribe(book => {
        console.log('delete', JSON.stringify(book));
      });
  }
}

interface Element {
  url: string;
  created: string;
  note: string;
}

const bookmark: Element[] = [
  {url: 'ww.asd', created: '2012-01-02', note: 'heloo'},
  {url: 'ww.asd2', created: '2012-01-03', note: 'world'},
];
