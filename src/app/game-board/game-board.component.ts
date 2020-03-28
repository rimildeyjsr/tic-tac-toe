import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {

  @Input() noOfBoxes: number;
  @Input() currentPlayer: number;
  gameBoardArr = {};
  numberArray = [];
  cell = null;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.noOfBoxes && this.noOfBoxes) {
      for (let i = 0; i < this.noOfBoxes; i++) {
        this.numberArray[i] = i;
        for (let j = 0; j < this.noOfBoxes; j++) {
          const key = i + '-' + j;
          this.gameBoardArr[key] = null;
        }
      }
    }

    if (changes.currentPlayer) {
      this.cell = event.target;
      this.cell['innerHTML'] = this.currentPlayer ? 'X' : 'O';
      this.gameBoardArr[this.cell['dataset']['key']] = this.currentPlayer;
      this.cell = null;
    }
  }

  getKey(i, j) {
    return i + '-' + j;
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
    console.log(this.gameBoardArr);
  }

}
