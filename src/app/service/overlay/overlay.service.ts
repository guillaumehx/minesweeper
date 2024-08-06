import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class OverlayService {
    
    overlay!: any;
    content!: any;

    on() {
        (this.content.nativeElement as HTMLElement).classList.add('shake');
        (this.overlay.nativeElement as HTMLElement).style.display = "block";
    }

    off() {
        (this.content.nativeElement as HTMLElement).classList.remove('shake');
        (this.overlay.nativeElement as HTMLElement).style.display = "none";
    }
    
}