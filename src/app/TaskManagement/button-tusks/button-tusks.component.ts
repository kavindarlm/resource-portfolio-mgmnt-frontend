import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-tusks',
  templateUrl: './button-tusks.component.html',
  styleUrl: './button-tusks.component.css'
})
export class ButtonTusksComponent {
  @Input() text: string = "";
  @Input() btnClss: string = "";
  @Input() mli: string= "";
  @Output() onClick = new EventEmitter<void>();
}
