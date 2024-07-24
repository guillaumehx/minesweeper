import {Tile} from "../tile/tile";

export abstract class Board {
  // Id of the board
  id: number;
  // Current status
  status: 'ONGOING' | 'GAMEOVER' | 'WON';
  // the tile set
  tileSet: Tile[];

  constructor(id: number) {
    this.id = id;
    this.status = 'ONGOING';
    this.tileSet = [];
  }
  isGameOver(): boolean {
    return  (this.status == 'GAMEOVER');
  }

  isWon(): boolean {
    return  (this.status == 'WON');
  }
}
