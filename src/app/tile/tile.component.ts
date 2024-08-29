import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Tile } from './tile';

@Component({
  selector: 'tile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
})
export class TileComponent {
  @Input() tile!: Tile;
}
