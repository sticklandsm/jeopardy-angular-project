import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.css'],
})
export class OpenCardComponent {
  @Input() clueText: string = '';

  //research event emitters in order to make this componenent when clicked sound out an event to Card
  //So that it can turn off show full screen.
  //research how to make this component appear in a cool way.
  //fix up all the gobblygook code in card which relates to showing full screen
}
