import { Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrl: './availabiility.component.css'
})
export class AvailabiilityComponent  {
  deleteContent(){
    
  }

  Projects: string[] = ['Project 01', 'Project 02', 'Project 03'];
  Tasks : string[] = ['Task 01', 'Task 02', 'Task 03'];

  AddPercentages(){
    
  }
  // inputValue: number = 0;
  
  // @ViewChild('range', { static: true }) rangeInput!: ElementRef;

  // ngOnInit() {
  //   this.updateThumbPosition();
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   this.updateThumbPosition();
  // }

  // onRangeInput() {
  //   this.updateThumbPosition();
  // }

  // private updateThumbPosition() {
  //   const rangeInput = this.rangeInput.nativeElement as HTMLInputElement;
  //   const thumb = document.querySelector('.range-thumb') as HTMLElement;

  //   if (rangeInput) {
  //     const max = parseInt(rangeInput.max, 10);
  //     const thumbWidth = thumb.clientWidth;

  //     const value = parseInt(rangeInput.value, 10);
  //     const text = value >= max ? '100' : value;
  //     const xPX = (value * (rangeInput.clientWidth - thumbWidth)) / max;

  //     thumb.style.left = `${xPX}px`;
  //     thumb.setAttribute('data-val', text.toString());
  //   }
  // }
}
