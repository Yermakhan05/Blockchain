import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-move-selector',
  imports: [],
  templateUrl: './move-selector.html',
  styleUrl: './move-selector.css',
  standalone: true
})
export class MoveSelector {
  @Output() moveSelected: EventEmitter<number> = new EventEmitter<number>();

  selectedMove: number | null = null; // Сохраняем выбранный ход

  select(move: number) {
    this.selectedMove = move;       // Сохраняем состояние
    this.moveSelected.emit(move);   // Эмиттим событие наружу
  }
}
