import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-component',
  standalone: false,
  templateUrl: './error-component.html',
  styleUrl: './error-component.scss',
})
export class ErrorComponent {
  @Input({ required: true }) error!: string;
}
