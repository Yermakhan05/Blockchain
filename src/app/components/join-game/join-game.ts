import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RpsService} from '../../services/rps.service';
import {MoveSelector} from '../move-selector/move-selector';

@Component({
  selector: 'app-join-game',
  imports: [
    FormsModule,
    MoveSelector
  ],
  templateUrl: './join-game.html',
  styleUrl: './join-game.css',
  standalone: true
})
export class JoinGame {
  gameId: number = 0;
  selectedMove: number | null = null;

  constructor(private rps: RpsService) {}

  async joinGame() {
    if (this.selectedMove === null) return;
    await this.rps.joinGame(this.gameId, this.selectedMove);
  }
}
