import { Component , Input } from '@angular/core';
import { CreateFormComponent } from '../../create-form/create-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  @Input() listTopic: string = '';
  @Input() projects: any[] = [];


  comp:any ;
  detectComp(comp:any){
    if(comp==="createform"){
      this.comp = CreateFormComponent;
    }
  }

}
