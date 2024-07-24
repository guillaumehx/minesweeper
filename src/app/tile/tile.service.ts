import { Injectable } from '@angular/core';
import {Tile} from "./tile";
import {Util} from "../utils/util";

@Injectable({
  providedIn: 'root'
})
export class TileService {

  constructor() { }

  reveal(tile: Tile) {
    if(tile.isRevealed) return;
    tile.isRevealed = true;

    if(tile.isMine) return;

    let threatCount = tile.getThreatCount();
    if(threatCount == 0) {
      for(let neighbor of tile.neighbors) {
        this.reveal(neighbor);
      }
    }
  }

  generateTiles(tilesNumber:number, minesNumber:number):Tile[] { // dans un Service ?
    let tiles: Tile[] = [];
    for(let i = 0; i< tilesNumber; i++) {
      tiles.push(new Tile(i, false));
    }
    while (minesNumber > 0) {
        var idxMine = Util.getRandomInt(0, tilesNumber);
        if(!tiles[idxMine].isMine) {
            tiles[idxMine].isMine = true;
            minesNumber--;
        }
    }
    return tiles;
  }

}