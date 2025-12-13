import { Component, inject } from '@angular/core';
import { AudioEngineService } from '../../core/services/audio';
import { SequencerService } from '../../core/services/sequencer';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class PlayerComponent {
  private seq = inject(SequencerService);
  audio = inject(AudioEngineService);

  isPlaying = this.seq.isPlaying;
  currentStep = this.seq.currentStep;
  bpm = this.seq.bpm;

  togglePlay() {
    this.isPlaying() ? this.seq.pause() : this.seq.play();
  }

  stop() {
    this.seq.stop();
  }

  setBpm(value: number) {
    if (Number.isNaN(value)) return;
    this.bpm.set(Math.max(40, Math.min(240, value)));
  }
}
