import {Component, OnInit} from '@angular/core';
import {RpsService} from '../../services/rps.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-completed-games',
  imports: [
    NgForOf
  ],
  templateUrl: './completed-games.html',
  styleUrl: './completed-games.css',
  standalone: true
})
export class CompletedGames implements OnInit{
  completedGames: any[] = [];
  totalGames: number = 0;

  constructor(private rps: RpsService) {}

  async ngOnInit() {
    this.totalGames = await this.rps.getGamesCount();
    for (let i = 0; i < this.totalGames; i++) {
      const game = await this.rps.getGame(i);
      if (game.finished) {

        this.completedGames.push(game);
      }
    }
  }

  getResultText(game: any): string {
    let result = Number(game.result)-2;
    if (!game.finished) return 'Game not finished';
    if (result === 1) return 'Draw';
    result += 2
    if (result >= 2 && result < 2 + game.players.length) {
      return game.players[result - 2];
    }
    return 'Unknown';
  }


}
