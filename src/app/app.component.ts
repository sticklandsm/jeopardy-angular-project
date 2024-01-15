import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jeopardy-angular-project';

  onClickShowHowToPlay({ target }: MouseEvent) {
    alert(
      'Welcome to Jeopardy! In this game you are given several categories of trivia to choose from each with dollar ammounts. Click an amount and you will be given a Clue. If you think you know the response to this clue, click it again and type in your response. You will be given or taken away money depending on if your response was correct. There is a timer though so answer quickly. If no one responds in time, you should hear a beeping noise and you can go onto the next clue'
    );
    return;
  }
}
