import { Component, OnInit, Input } from '@angular/core';

import { formatTime, capitalize } from '../share/utility';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input() post: any;

  formatTime: any;
  capitalize: any;

  constructor() {
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  ngOnInit() {

  }

}
