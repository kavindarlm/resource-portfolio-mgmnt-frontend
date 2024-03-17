import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-buttuns',
  templateUrl: './project-buttuns.component.html',
  styleUrl: './project-buttuns.component.css'
})
export class ProjectButtunsComponent {
  @Input() text: string = "";
  @Input() btnClss: string = "";
  @Input() mli: string= "";
  @Output() onClick = new EventEmitter<void>();
}
