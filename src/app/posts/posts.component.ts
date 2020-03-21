import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  @Input() feed: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  formatTime(time) {
    return moment(time).fromNow();
  }
}
