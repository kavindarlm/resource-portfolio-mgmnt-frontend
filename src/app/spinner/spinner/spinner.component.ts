import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(private spinner: NgxSpinnerService){}
  
}
