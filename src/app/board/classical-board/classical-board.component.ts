import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tile} from "../../tile/tile";
import {TileComponent} from "../../tile/tile.component";
import {NgForOf, NgIf} from "@angular/common";
import {ClassicalBoardService} from "./classical-board.service";
import {ClassicalBoard} from "./classical-board";
import {GenerationStrategy} from "../../utils/types";

@Component({
  selector: 'classical-board',
  standalone: true,
  imports: [
    TileComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './classical-board.component.html',
  styleUrl: './classical-board.component.css'
})
export class ClassicalBoardComponent implements OnInit {
  @Input() rowsNumber!: number;
  @Input() columnsNumber!: number;
  @Input() minesNumber!: number;
  @Output() notifyGameStatus:EventEmitter<string> = new EventEmitter();
  board!: ClassicalBoard;
  flagsNumber: number = 0;
  private classicalBoardService: ClassicalBoardService;
  public hasStarted: boolean = false;
  private generationStrategy:GenerationStrategy = 'AT_FIRST_CLICK';

  constructor(tileService: ClassicalBoardService) {
    this.classicalBoardService = tileService;
  }

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = this.classicalBoardService.generateTileBoard(this.rowsNumber, this.columnsNumber, this.minesNumber, this.generationStrategy);
    this.board.status = 'ONGOING';
    this.hasStarted = false;
    this.flagsNumber = 0;
  }

  handleTileClick(tile:Tile){
    if(!this.hasStarted) {
      this.hasStarted = true;
      this.notifyGameStatus.emit('ONGOING');
      this.classicalBoardService.finishInitialization(this.board.tiles, this.generationStrategy, this.minesNumber, tile);
    }

    if(!tile || tile.isFlagged){
      return;
    }
    if (this.board.isGameOver() || this.board.isWon()) {
      return;
    }
    this.classicalBoardService.revealTile(this.board, tile);

    if(this.board.isWon() ||this.board.isGameOver()) {
      this.notifyGameStatus.emit(this.board.status);
    }
  }

  onRightClick(tile:Tile) {
    if(!this.hasStarted) {
      this.hasStarted = true;
      this.notifyGameStatus.emit('ONGOING');
    }

    if(tile.isRevealed) return false;
    tile.isFlagged = !tile.isFlagged;
    if(tile.isFlagged) this.flagsNumber++;
    else this.flagsNumber--;
    return false;
  }

  get tiles():Tile[][] {
    return this.board.tiles;
  }


}
