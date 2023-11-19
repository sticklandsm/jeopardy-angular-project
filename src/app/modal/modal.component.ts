import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      placeholder: string;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Implement the save logic here, if needed
    // You can also return a result to the component that opened the modal

    this.dialogRef.close(this.data.content);
  }

  onCancelClick(): void {
    // Implement the cancel logic here, if needed
    this.dialogRef.close('pass');
  }

  onEnterKey(event: Event): void {
    if ((event as KeyboardEvent).key === 'Enter') {
      this.onSaveClick();
    }
  }
}

//
