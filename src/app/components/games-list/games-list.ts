import {Component, OnInit} from '@angular/core';
import {RpsService} from '../../services/rps.service';

@Component({
  selector: 'app-games-list',
  imports: [],
  templateUrl: './games-list.html',
  styleUrl: './games-list.css',
  standalone: true
})
export class GamesList implements OnInit {

  gamesCount: number = 0;

  constructor(private rps: RpsService) {}

  async ngOnInit() {
    this.gamesCount = await this.rps.getGamesCount();
  }
}
