import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintManagementService } from '../../services/sprint-management.service';

@Component({
  selector: 'app-sprint-mgt',
  templateUrl: './sprint-mgt.component.html',
  styleUrl: './sprint-mgt.component.css'
})
export class SprintMgtComponent implements OnInit {

CloseTab(){
  
}

hArray=['Resource_ID','Team','Job_Role','Org_Unit','Availability'];

resources = [

];

sprintName: string = '';
constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.sprintName = params['sprintName'];
  });
}

}