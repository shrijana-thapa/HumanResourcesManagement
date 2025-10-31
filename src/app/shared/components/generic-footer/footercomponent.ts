import { Component, Input } from '@angular/core';
interface FooterLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-footercomponent',
  standalone: true,
  templateUrl: './footercomponent.html',
  styleUrl: './footercomponent.scss',
})
export class FooterComponent {
  @Input() year: number = new Date().getFullYear();
  @Input() companyName: string = 'my company';
  @Input() links: FooterLink[] = []; //contact,privacy policy
}
