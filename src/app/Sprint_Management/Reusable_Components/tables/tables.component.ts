import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})


export class TablesComponent implements OnInit {

  @Input () HeadArray :string[]=[];
  @Input () GridArray :any[]=[];

  ngOnInit() {
    
  }


}
