import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public timerEmitter = new EventEmitter<number>();
  counter: number = 0;
  private running: boolean = false;
  private timerRef: any;

  constructor() { }

  start() {
    if (this.running) { return; }
    this.running = true;
    const emitAndSchedule = () => {
      this.timerEmitter.emit(this.counter++);
      this.timerRef = setTimeout(emitAndSchedule, 1000);
    };
    emitAndSchedule();
  }

  stop() {
    if (this.running) {
      clearInterval(this.timerRef);
    }
  }

  clear() {
    this.running = false;
    this.counter = 0;
    this.timerEmitter.emit(this.counter);
    clearInterval(this.timerRef);
  }
}