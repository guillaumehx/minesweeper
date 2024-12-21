export class Tile {
  id: number;
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  neighbors: Tile[];

  constructor(id: number, isMine: boolean) {
    this.id = id;
    this.isMine = isMine;
    this.isRevealed = false;
    this.isFlagged = false;
    this.neighbors = [];
  }

  getThreatCount(): number {
    return this.neighbors.filter((tile) => tile.isMine).length;
  }
}
