import {Component, OnDestroy} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'timer',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnDestroy {
  private timerRef: any;
  private running: boolean = false;
  counter: number = 0;

  startTimer() {
    if (this.running) return;
    this.running = true;

    const startTime = Date.now() - (this.counter || 0);
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
    });
  }

  clearTimer() {
    this.running = false;
    this.counter = 0;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
