import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from "../../tile/tile";
import { TileComponent } from "../../tile/tile.component";
import { NgForOf, NgIf } from "@angular/common";
import { ClassicalBoardService } from "../../service/classical-board/classical-board.service";
import { ClassicalBoard } from "./classical-board";
import { GenerationStrategy } from "../../utils/types";
import { TimerService } from '../../service/timer/timer.service';

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
  public hasStarted: boolean = false;
  private generationStrategy:GenerationStrategy = 'AT_FIRST_CLICK';
  count: number = 0;

  constructor(
    private tileService: ClassicalBoardService,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
    this.initializeBoard();
    this.timerService.timerEmitter.subscribe((count) => {
      this.count = count;
    });
  }

  initializeBoard() {
    this.board = this.tileService.generateTileBoard(this.rowsNumber, this.columnsNumber, this.minesNumber, this.generationStrategy);
    this.board.status = 'ONGOING';
    this.hasStarted = false;
    this.flagsNumber = 0;
  }

  handleTileClick(tile:Tile){
    if(!this.hasStarted) {
      this.hasStarted = true;
      this.notifyGameStatus.emit('ONGOING');
      this.tileService.finishInitialization(this.board.tiles, this.generationStrategy, this.minesNumber, tile);
    }

    if(!tile || tile.isFlagged){
      return;
    }
    if (this.board.isGameOver() || this.board.isWon()) {
      return;
    }
    this.tileService.revealTile(this.board, tile);

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