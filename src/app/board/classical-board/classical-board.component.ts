import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from '../../tile/tile';
import { TileComponent } from '../../tile/tile.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ClassicalBoardService } from '../../service/classical-board/classical-board.service';
import { ClassicalBoard } from './classical-board';
import { GenerationStrategy, NotificationStatus } from '../../utils/types';
import { TimerService } from '../../service/timer/timer.service';

@Component({
  selector: 'classical-board',
  standalone: true,
  imports: [TileComponent, NgForOf, NgIf, AsyncPipe],
  templateUrl: './classical-board.component.html',
  styleUrl: './classical-board.component.css',
})
export class ClassicalBoardComponent implements OnInit {
  @Input() rowsNumber!: number;
  @Input() columnsNumber!: number;
  @Input() minesNumber!: number;
  @Output() notifyGameStatus: EventEmitter<NotificationStatus> =
    new EventEmitter();
  @Output() restartGameEvent: EventEmitter<void> = new EventEmitter();
  board!: ClassicalBoard;
  flagsNumber: number = 0;
  private hasStarted: boolean = false;
  private firstTileRevealed: boolean = false;
  private generationStrategy: GenerationStrategy = 'AT_FIRST_CLICK';

  constructor(
    private tileService: ClassicalBoardService,
    public timerService: TimerService,
  ) {}

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = this.tileService.generateTileBoard(
      this.rowsNumber,
      this.columnsNumber,
      this.minesNumber,
      this.generationStrategy,
    );
    this.board.status = 'ONGOING';
    this.hasStarted = false;
    this.firstTileRevealed = false;
    this.flagsNumber = 0;
  }

  handleTileClick(tile: Tile) {
    this.start();
    if (!this.firstTileRevealed) {
      this.tileService.finishInitialization(
        this.board.tiles,
        this.generationStrategy,
        this.minesNumber,
        tile,
      );
      this.firstTileRevealed = true;
    }
    if (!tile || tile.isFlagged) {
      return;
    }
    if (this.board.isGameOver() || this.board.isWon()) {
      return;
    }
    this.tileService.revealTile(this.board, tile);

    if (this.board.isWon() || this.board.isGameOver()) {
      this.notifyGameStatus.emit({
        status: this.board.status,
        flagged: this.flagsNumber,
        time: this.timerService.counter - 1,
      });
    }
  }

  onRightClick(tile: Tile) {
    this.start();

    if (tile.isRevealed) return false;
    tile.isFlagged = !tile.isFlagged;
    if (tile.isFlagged) this.flagsNumber++;
    else this.flagsNumber--;
    return false;
  }

  private start() {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.notifyGameStatus.emit({
        status: 'ONGOING',
        flagged: this.flagsNumber,
        time: this.timerService.counter,
      });
    }
  }

  getGameStatus(): string {
    if (this.board.status == 'GAMEOVER') return 'lost';
    if (this.board.status == 'WON') return 'won';
    return 'play';
  }

  restartGame() {
    this.restartGameEvent.emit();
  }

  get tiles(): Tile[][] {
    return this.board.tiles;
  }
}
