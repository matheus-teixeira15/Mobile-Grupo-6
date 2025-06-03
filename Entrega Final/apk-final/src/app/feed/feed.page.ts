import { Component, OnInit } from '@angular/core';

import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false
})
export class FeedPage implements OnInit {

  constructor() {

    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });

   }

  ngOnInit() {
  }

}



