import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashbord-button',
  templateUrl: './dashbord-button.component.html',
  styleUrl: './dashbord-button.component.css'
})
export class DashbordButtonComponent {
  @Input() buttonText!: string;
  @Input() buttonClass!: string;
}
