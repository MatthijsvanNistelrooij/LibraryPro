import { Injectable, signal } from '@angular/core';
import { AudioEngineService } from './audio';

interface Step {
  active: boolean;
}

interface Track {
  id: number;
  sampleId: string;
  steps: Step[];
}

@Injectable({ providedIn: 'root' })
export class SequencerService {
  bpm = signal(120);
  isPlaying = signal(false);
  currentStep = signal(0);

  tracks = signal<Track[]>([
    this.createTrack(0),
    this.createTrack(1),
    this.createTrack(2),
    this.createTrack(3),
    this.createTrack(4),
    this.createTrack(5),
    this.createTrack(6),
    this.createTrack(7),
    this.createTrack(8),
    this.createTrack(9),
  ]);

  private intervalId: any;

  constructor(private audio: AudioEngineService) {}

  private createTrack(id: number): Track {
    return {
      id,
      sampleId: 'kick1',
      steps: Array.from({ length: 16 }, () => ({ active: false })),
    };
  }

  async play() {
    await this.audio.resume();

    if (this.isPlaying()) return;
    this.isPlaying.set(true);

    this.intervalId = setInterval(() => this.tick(), this.stepMs());
  }

  pause() {
    this.isPlaying.set(false);
    clearInterval(this.intervalId);
  }

  stop() {
    this.pause();
    this.currentStep.set(0);
  }

  toggleStep(trackId: number, stepIndex: number) {
    this.tracks.update((tracks) =>
      tracks.map((track) =>
        track.id !== trackId
          ? track
          : {
              ...track,
              steps: track.steps.map((s, i) =>
                i === stepIndex ? { active: !s.active } : s
              ),
            }
      )
    );
  }

  setSample(trackId: number, sampleId: string) {
    this.tracks.update((tracks) =>
      tracks.map((t) => (t.id === trackId ? { ...t, sampleId } : t))
    );
  }

  private stepMs() {
    return 60_000 / this.bpm() / 4;
  }

  private tick() {
    const step = this.currentStep();

    for (const track of this.tracks()) {
      if (track.steps[step].active) {
        this.audio.play(track.sampleId);
      }
    }

    this.currentStep.set((step + 1) % 16);
  }
}
