import { Component, Input } from '@angular/core';
import { MaterialModule } from 'app/shared/material-module/material-module';

@Component({
  selector: 'app-card-component',
  imports: [MaterialModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() actions: boolean = false;
}
