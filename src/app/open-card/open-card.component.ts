import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ClueSelectedCoordinates } from '../interfaces/JeopardyBoard';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.css'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateX(179deg)',
          left: 0 + 'px',
          top: 0 + 'px',
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          border: '2px solid #000000',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateX(0)',
          backgroundColor: '#010a78',
        })
      ),
      transition('active => inactive', animate('300ms')),
      transition('inactive => active', animate('300ms')),
    ]),
  ],
})
export class OpenCardComponent implements AfterViewChecked, OnInit, OnDestroy {
  @Input() clueText: string = '';
  @Input() value: number = 0;
  @Input() styling: ClueSelectedCoordinates = { x: 0, y: 0, width: 0 };
  @Output() clickEmitter = new EventEmitter<string>();
  @Output() timeOutEmitter = new EventEmitter<boolean>();
  timer: any;

  flip = 'inactive';

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.setTimeOutinSeconds(5);

    //figure out a way to make it so the above only runs for the client who clicked the clue
    //That way you can get only this client to send out a WS when shit happens.
    //Problem when others try to answer a clue that another client opened.

    //Or something with name checking???
    //communication with server, get the server to do the counting.

    //Need to create a service that will reset the timer in this component. That can be called from the websockets in Game.
  }
  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (this.flip === 'inactive') this.flip = 'active';
    });
  }

  setTimeOutinSeconds(timeInSeconds: number) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    ///Research setting up a timer service
    this.timer = setTimeout(() => {
      this.timeOutEmitter.emit(true);
    }, timeInSeconds * 1000);
  }

  openCardClicked() {
    // this.setTimeOutinSeconds(20);
    clearTimeout(this.timer);
    console.log('timer cleared', this.timer);
    this.clickEmitter.emit('sean');
  }

  getStyling() {
    return {
      position: 'absolute',
      left: this.styling.y + 'px',
      top: this.styling.x + 'px',
      width: this.styling.width + 'px',
      border: '1px solid #000000',
    };
  }
}
