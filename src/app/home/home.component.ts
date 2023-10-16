import { Component } from '@angular/core';
import { DatabaseService } from '../database-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Store } from '@ngrx/store';
import { setCurrentPlayer } from '../state/current-player/current-player.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  gameToLoad: number | string = '';
  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store
  ) {}

  openEnterNameModal(): void {
    const modalData = {
      title: 'Enter Name',
      content: '',
      placeholder: '',
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((responseGiven) => {
      //Every client should take care of their own score as in plus and minusing and sending it to the back end.
      //Or perhaps it just does a broadcast through WS.
      //get the scores to be sent through initially in the getGame. Then update it all using WS.
      //But we do need to know who we are in state to send the appropriate WS clicks etc.
      //Need to work out if

      this.store.dispatch(
        setCurrentPlayer({
          currentPlayer: { name: responseGiven, id: 0, score: 0, game_id: 0 },
        })
      );

      //if a gameId has been entered, navigate to that game
      if (this.gameToLoad) {
        this.router.navigate(['/game', this.gameToLoad]);
      }
      //otherwise start a new game and go to that gameId
      else {
        this.databaseService.newJeopardyGame().subscribe({
          next: (gameId: number) => {
            this.router.navigate(['/game', gameId]);
          },
          error: (error: Error) => {
            console.error(error);
          },
        });
      }
    });
  }

  loadGame() {
    if (!this.gameToLoad) {
      alert('Enter a game ID please');
      return;
    }
    this.openEnterNameModal();
  }

  async newGame() {
    this.openEnterNameModal();
  }
}
