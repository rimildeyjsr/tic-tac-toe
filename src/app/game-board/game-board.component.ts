import {Component, Input, Output, SimpleChanges, OnChanges, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnChanges {

  @Input() noOfBoxes: number;
  @Input() currentPlayer: number;
  @Output() emitWinnerOrDrawGame = new EventEmitter();
  gameBoardArr = {};
  numberArray = [];
  cell = null;
  disableClick = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.noOfBoxes && this.noOfBoxes) {
      for (let i = 0; i < this.noOfBoxes; i++) {
        this.numberArray[i] = i;
        for (let j = 0; j < this.noOfBoxes; j++) {
          const key = this.getKey(i, j);
          this.gameBoardArr[key] = null;
        }
      }
    }

    if (changes.currentPlayer) {
      this.cell = null;
      this.checkForDrawGame();
      this.checkForWinner();
    }
  }

  registerState(event) {
    if (this.cell) {
      let previous = this.cell;
      previous['innerHTML'] = '';
      this.gameBoardArr[previous['dataset']['key']] = null;
    }

    this.cell = event.target;
    this.cell['innerHTML'] = this.currentPlayer ? 'X' : 'O';
    this.gameBoardArr[this.cell['dataset']['key']] = this.currentPlayer;
  }

  checkForDrawGame() {
    let countOfCellsFilled = 0;
    for (let i = 0; i < this.noOfBoxes; i++) {
      for (let j = 0; j < this.noOfBoxes; j++) {
        const key = i + '-' + j;
        if (this.gameBoardArr[key] !== null) {
          countOfCellsFilled += 1;
        }
      }
    }

    if (countOfCellsFilled === (this.noOfBoxes * this.noOfBoxes)) {
      // using value 2 to indicate draw game
      this.emitWinnerOrDrawGame.emit(2);
      this.disableClick = true;
    }
  }

  checkForWinner() {
    const previousPlayer = this.currentPlayer ? 0 : 1;
    let countVert, countHort, countLeftDiagonal = 0, countRightDiagonal = 0;
    for (let i = 0; i < this.noOfBoxes; i++) {
      countVert = 0;
      countHort = 0;
      for (let j = 0; j < this.noOfBoxes; j++) {
        const keyVert = this.getKey(i, j);
        const keyHort = this.getKey(j, i);

        // left diagonal
        if (i == j && this.gameBoardArr[keyVert] === previousPlayer) {
          countLeftDiagonal += 1;
        }

        // right diagonal
        if ( ((i + j) == (this.noOfBoxes - 1)) && this.gameBoardArr[keyVert] === previousPlayer) {
          countRightDiagonal += 1;
        }

        if (this.gameBoardArr[keyVert] === previousPlayer) {
          countVert += 1;
        }

        if (this.gameBoardArr[keyHort] === previousPlayer) {
          countHort += 1;
        }
      }
      this.emitEventIfWinner(countVert, previousPlayer);
      this.emitEventIfWinner(countHort, previousPlayer);
      this.emitEventIfWinner(countLeftDiagonal, previousPlayer);
      this.emitEventIfWinner(countRightDiagonal, previousPlayer);
    }
  }

  getKey(i, j) {
    return i + '-' + j;
  }

  emitEventIfWinner(countForDirection, previousPlayer) {
    if (countForDirection == this.noOfBoxes) {
      this.emitWinnerOrDrawGame.emit(previousPlayer);
      this.disableClick = true;
    }
  }

}
