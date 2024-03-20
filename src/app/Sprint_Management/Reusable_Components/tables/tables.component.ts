import { Component , Input , OnInit } from '@angular/core';
import { AvailabiilityComponent } from '../../availabiility/availabiility.component';

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

  comp:any ;
  detectComp(comp:any){
    if(comp === "availability"){
      this.comp = AvailabiilityComponent;
  }
}

}
