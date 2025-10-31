import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardcomponent',
  standalone: true,
  templateUrl: './cardcomponent.html',
  styleUrl: './cardcomponent.scss',
})
export class Cardcomponent {
  @Input() title: string = '';
  @Input() className: string = '';
}
