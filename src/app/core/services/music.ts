import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sample } from '../../shared/models/sample.model';

@Injectable({ providedIn: 'root' })
export class MusicService {
  tracks = signal<Sample[]>([]);
  loading = signal(false);

  constructor(private http: HttpClient) {}

  loadTracks() {
    this.loading.set(true);

    this.http.get<Sample[]>('/assets/samples/samples.json').subscribe({
      next: (data) => {
        this.tracks.set(data);
        this.loading.set(false);
      },
      error: () => {
        console.error('Could not load tracks.');
        this.loading.set(false);
      }
    });
  }
}
