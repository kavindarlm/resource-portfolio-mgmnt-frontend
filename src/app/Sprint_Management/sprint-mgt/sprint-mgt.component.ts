import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
startDate: string = '';
endDate: string = '';

constructor(private route: ActivatedRoute,private sprintService: SprintManagementService,private router: Router) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.sprintName = params['Sname'];
    this.getSprintDetails(this.sprintName);
  });
}

getSprintDetails(sprintName: string): void {
  this.sprintService.getSprintDetailsByName(sprintName).subscribe(
    (data: any) => {
      this.startDate = data.Start_Date;
      this.endDate = data.End_Date;
    },
    error => {
      console.error('Error fetching sprint details:', error);
    }
  );
}



}