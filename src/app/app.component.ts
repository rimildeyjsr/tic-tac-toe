import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-toe';
  numberOfBoxes: number = null;
  currentPlayer = 0;
  winner = null;

  changeTurn() {
    this.currentPlayer = this.currentPlayer ? 0 : 1;
  }

  stopGame(event) {
    // 0 and 1 values are for players, 2 is for draw game
    this.winner = event;
  }
}
