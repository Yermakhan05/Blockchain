import {Component, OnInit} from '@angular/core';
import {RpsService} from '../../services/rps.service';
import {CreateGame} from '../create-game/create-game';
import {EthereumService} from '../../services/ethereum.service';
import {JoinGame} from '../join-game/join-game';
import {GamesList} from '../games-list/games-list';
import {NgIf} from '@angular/common';
import {CompletedGames} from '../completed-games/completed-games';

@Component({
  selector: 'app-home',
  imports: [
    CreateGame,
    JoinGame,
    GamesList,
    NgIf,
    CompletedGames
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit {

  userAddress: string | null = null;
  selectedMove: number | null = null;
  gamesCount: number = 0;

  constructor(
    private eth: EthereumService,
    private rps: RpsService
  ) {}

  async ngOnInit() {
    // Можно попытаться подключиться автоматически, если пользователь уже подключен
    try {
      this.userAddress = await this.eth.connectWallet();
      await this.loadGamesCount();
    } catch {}
  }

  async connectWallet() {
    this.userAddress = await this.eth.connectWallet();
    await this.loadGamesCount();
  }

  async loadGamesCount() {
    this.gamesCount = await this.rps.getGamesCount();
  }
}
