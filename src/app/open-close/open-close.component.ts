import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          width: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          width: '100px',
          opacity: 0.8,
          backgroundColor: 'purple',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
      transition('void => open', [animate('1s')]),
      transition('open => void', [animate('0.5s')]),
      transition('void => closed', [animate('1s')]),
      transition('closed => void', [animate('0.5s')]),
    ]),
  ],
})
export class OpenCloseComponent {
  isOpen = true;
  doesItExist = true;

  toggleExist() {
    this.doesItExist = !this.doesItExist;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
