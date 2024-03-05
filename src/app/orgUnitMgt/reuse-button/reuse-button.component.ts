import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reuse-button',
  templateUrl: './reuse-button.component.html',
  styleUrl: './reuse-button.component.css'
})
export class ReuseButtonComponent implements OnInit{

  @Input() text: string | undefined; 
  constructor(){}

  ngOnInit(): void {
    
  }
}