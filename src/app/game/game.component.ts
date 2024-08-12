import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClassicalBoardComponent } from "../board/classical-board/classical-board.component";
import { NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ConfettiService } from '../service/confetti/confetti.service';
import { TimerService } from '../service/timer/timer.service';
import { OverlayService } from '../service/overlay/overlay.service';
import { StorageService } from '../service/storage/storage.service';
import { HistoryComponent } from "../history/history.component";
import { BoardInput, GameMode, HistoryRecord, NotificationStatus } from '../utils/types';

@Component({
  selector: 'game',
  standalone: true,
  imports: [
    ClassicalBoardComponent,
    HistoryComponent,
    NgIf,
    FormsModule
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements AfterViewInit {

  result: undefined | 'ONGOING' | 'WON' | 'GAMEOVER'
  @ViewChild('content') content!: HTMLElement;
  @ViewChild('minesweeper') minesweeper!: ClassicalBoardComponent;
  @ViewChild('overlay') overlay!: HTMLElement;

  mode: GameMode = GameMode.BEGINNER;
  displayInputs: boolean = false;
  settingsClicked: boolean = false;
  
  input: BoardInput = { row: 1, column: 1, mine: 1 };
  maxMines: number = 0;

  constructor(
    private conffetiService: ConfettiService,
    private timerService: TimerService,
    private overlayService: OverlayService,
    private storageService: StorageService
  ) { }

  ngAfterViewInit(): void {
    this.overlayService.overlay = this.overlay;
  }

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
    this.settingsClicked = !this.settingsClicked;
    if (this.displayInputs) {
      this.displayInputs = false;
    }
  }

}