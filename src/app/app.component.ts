import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from "./game/game.component";
import { OverlayService } from './service/overlay/overlay.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('overlay') overlay!: HTMLElement;
  @ViewChild('game') game!: any;

  constructor(private overlayService: OverlayService) { }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event && event.key === 'Escape') {
      this.off();
    }
  }

  ngAfterViewInit(): void {
    this.overlayService.content = this.game.content;
    this.overlayService.overlay = this.overlay;   
  }

  off() {
    this.overlayService.off();
  }
}
