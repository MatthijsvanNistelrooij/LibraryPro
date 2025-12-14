import { Component, inject } from '@angular/core';
import { PlayerComponent } from './features/player/player';
import { SequencerComponent } from './features/sequencer/sequencer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent, SequencerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
