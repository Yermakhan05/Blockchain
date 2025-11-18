import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateGame} from './components/create-game/create-game';
import {JoinGame} from './components/join-game/join-game';
import {Home} from './components/home/home';
import {GamesList} from './components/games-list/games-list';

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Blockchain');
}
