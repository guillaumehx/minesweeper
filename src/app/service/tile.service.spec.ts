import { TestBed } from '@angular/core/testing';

import { TileService } from './tile.service';

describe('TileService', () => {
  let service: TileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO test si il y a plus de mines que de tiles renvoyer une erreur.
  //test si meme nombre, ca s'arrete un jour
});
