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

  changeTurn() {
    this.currentPlayer = this.currentPlayer ? 0 : 1;
    console.log(this.currentPlayer);
  }
  // possible players can be 0 and 1
  // game starts -> 1st turn 0
  // button -> when 0 is satisfied, only then click button when that position gets fixed
  // turn goes to player 2 repeat
}
