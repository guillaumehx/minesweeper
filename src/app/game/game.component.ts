import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClassicalBoardComponent } from "../board/classical-board/classical-board.component";
import { NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../service/confetti/confetti.service';
import { TimerService } from '../service/timer/timer.service';
import { StorageService } from '../service/storage/storage.service';
import { HistoryComponent } from "../history/history.component";
import { BoardInput, GameMode, HistoryRecord, NotificationStatus, OverlayContent, OverlayData } from '../utils/types';
import { OverlayComponent } from "../overlay/overlay.component";

@Component({
  selector: 'game',
  standalone: true,
  imports: [
    ClassicalBoardComponent,
    HistoryComponent,
    NgIf,
    FormsModule,
    OverlayComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  result: undefined | 'ONGOING' | 'WON' | 'GAMEOVER'
  @ViewChild('minesweeper') minesweeper!: ClassicalBoardComponent;

  mode: GameMode = GameMode.BEGINNER;
  displayInputs: boolean = false;  
  maxMines: number = 0;

  input: BoardInput = { row: 1, column: 1, mine: 1 };
  overlayData: OverlayData = { display: false, content: OverlayContent.HISTORY};

  constructor(
    private conffetiService: ConfettiService,
    private timerService: TimerService,
    private storageService: StorageService
  ) { }

  startNewGame(rows?: number, columns?: number, mines?: number, mode?: string) {
    if (mode) {
      this.mode = mode as GameMode;
    }
    if (rows !== undefined && columns !== undefined && mines !== undefined) {
      this.minesweeper.rowsNumber = rows;
      this.minesweeper.columnsNumber = columns;
      this.minesweeper.minesNumber = mines;
    }
    this.minesweeper.initializeBoard();
    this.result = undefined;
    this.timerService.clear();
    this.conffetiService.stopConfettis(true);
  }

  updateGameStatus(event: NotificationStatus) {
    if (event.status === 'WON' || event.status === 'GAMEOVER') {
      let record: HistoryRecord = {
        ...event,
        mode: this.mode,
        date: new Date()
      };
      if (this.mode === GameMode.CUSTOM) {
        record.input = this.input;
      }
      this.storageService.insert(record);
      if (event.status === 'WON') {
        this.conffetiService.stopConfettis(false);
        this.conffetiService.triggerConfettis();
      }
      if (event.status === 'GAMEOVER') {
        this.overlayData = { display: true, content: OverlayContent.EXPLOSION };
      }
      this.timerService.stop();
      this.result = event.status;
    } else if (event.status === 'ONGOING') {
      this.timerService.start();
      this.result = event.status;
    }
  }

  customGame() {
    this.mode = GameMode.CUSTOM;
    if (!this.displayInputs) {
      this.displayInputs = true;
    }
    this.input = { row: 3, column: 3, mine: 1 };
    this.updateBoard();
  }

  updateBoard() {
    this.maxMines = this.input.row * this.input.column;
    this.startNewGame(this.input.row, this.input.column, this.input.mine);
  }

  settings() {
    this.overlayData = { display: true, content: OverlayContent.HISTORY };
  }

}