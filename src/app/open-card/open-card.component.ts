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
import { TimerService } from '../timer.service';

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

  constructor(private timerService: TimerService) {}

  flip = 'inactive';
  beenActivated = false;

  ngOnDestroy(): void {
    console.log('open card destroyed');
  }

  ngOnInit(): void {
    console.log('open card inititialized?', this.flip);
    this.timerService.startTimer(5);
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (this.flip === 'inactive') this.flip = 'active';
    });
  }

  // setTimeOutinSeconds(timeInSeconds: number) {
  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //   }
  //   ///Research setting up a timer service
  //   this.timer = setTimeout(() => {
  //     this.timeOutEmitter.emit(true);
  //   }, timeInSeconds * 1000);
  // }

  openCardClicked() {
    this.timerService.startTimer(10);
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
