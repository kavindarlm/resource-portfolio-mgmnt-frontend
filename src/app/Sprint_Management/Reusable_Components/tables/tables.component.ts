import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {

  @Input () HeadArray :string[]=[];
  @Input () GridArray :any[]=[];

  ngOnInit() {
    
  }

}
