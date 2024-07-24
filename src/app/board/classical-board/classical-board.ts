import {Board} from "../board";
import {Tile} from "../../tile/tile";

export class ClassicalBoard extends Board {
  // the representation of the tiles on the board
  tiles: Tile[][];
  numberOfMinesLeft:number;
  numberOfUnRevealedTiles:number=0;


  constructor(id: number, numberOfMinesLeft:number) {
    super(id);
    this.tiles = [];
    this.numberOfMinesLeft = numberOfMinesLeft;
  }

}
