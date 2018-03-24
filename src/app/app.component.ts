import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  url = '';
  note = '';

  bookmark: Element[] = [
    {url: 'ww.asd', created: '2012-01-02', note: 'heloo'},
    {url: 'ww.asd2', created: '2012-01-03', note: 'world'},
  ];

  constructor() {}

  ngOnInit() {}
}

interface Element {
  url: string;
  created: string;
  note: string;
}
