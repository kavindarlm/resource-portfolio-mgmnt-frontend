// delete-sprint-popup.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-sprint-popup',
  templateUrl: './delete-sprint-popup.component.html',
  styleUrls: ['./delete-sprint-popup.component.css']
})
export class DeleteSprintPopupComponent {
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  constructor(private router: Router) {}

  onDelete() {
    this.confirmDelete.emit();
  }

  onCancel() {
    this.cancelDelete.emit();
  }
}
