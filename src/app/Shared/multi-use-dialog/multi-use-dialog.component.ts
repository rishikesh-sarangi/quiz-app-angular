import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-multi-use-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './multi-use-dialog.component.html',
  styleUrls: ['./multi-use-dialog.component.scss'],
})
export class MultiUseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
