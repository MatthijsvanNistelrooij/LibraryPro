import { Injectable, signal, effect } from '@angular/core';
import { Sample } from '../../shared/models/sample.model';

@Injectable({ providedIn: 'root' })
export class AudioEngineService {
  private ctx = new AudioContext();
  private masterGain = this.ctx.createGain();

  private buffers = new Map<string, AudioBuffer>();

  volume = signal(0.8);

  constructor() {
    this.masterGain.connect(this.ctx.destination);

    effect(() => {
      this.masterGain.gain.value = this.volume();
    });
  }

  async loadSample(sample: Sample) {
    const res = await fetch(sample.file);
    if (!res.ok) throw new Error(`Failed to load ${sample.file}`);

    const arrayBuffer = await res.arrayBuffer();
    const buffer = await this.ctx.decodeAudioData(arrayBuffer);

    this.buffers.set(sample.id, buffer);
  }

  play(sampleId: string) {
    const buffer = this.buffers.get(sampleId);
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.masterGain);
    source.start();
  }

  async resume() {
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }
}
