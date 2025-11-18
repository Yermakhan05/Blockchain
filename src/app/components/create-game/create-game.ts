import {FormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import {RpsService} from '../../services/rps.service';
import {MoveSelector} from '../move-selector/move-selector';


@Component({
  selector: 'app-create-game',
  imports: [
    FormsModule,
    MoveSelector,
  ],
  templateUrl: './create-game.html',
  styleUrl: './create-game.css',
  standalone: true
})
export class CreateGame {
  selectedMove: number | null = null;
  maxPlayers: number = 2;

  constructor(private rps: RpsService) {}

  async createGame() {
    if (!this.selectedMove) return;
    await this.rps.createGame(this.selectedMove, this.maxPlayers);
  }
}
