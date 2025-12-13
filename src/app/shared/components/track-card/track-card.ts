import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from '../../models/sample.model';

@Component({
  selector: 'app-track-card',
  standalone: true,
  templateUrl: './track-card.html',
  styleUrls: ['./track-card.css'],
})
export class TrackCardComponent {
  @Input() track!: Sample;
  @Output() play = new EventEmitter<void>();

  onClick() {
    this.play.emit();
  }
}
