import { Component, inject, signal } from '@angular/core';
import { SequencerService } from '../../core/services/sequencer';
import { AudioEngineService } from '../../core/services/audio';
import { Sample } from '../../shared/models/sample.model';
import samples from '../../../../public/assets/samples/samples.json';

@Component({
  selector: 'app-sequencer',
  standalone: true,
  templateUrl: './sequencer.html',
  styleUrl: './sequencer.css',
})
export class SequencerComponent {
  seq = inject(SequencerService);
  audio = inject(AudioEngineService);

  tracks = this.seq.tracks;
  currentStep = this.seq.currentStep;

  samples = signal<Sample[]>(samples);

  constructor() {
    samples.forEach((s) => this.audio.loadSample(s));
  }

  setSample(trackId: number, sampleId: string) {
    this.seq.setSample(trackId, sampleId);
  }
}
