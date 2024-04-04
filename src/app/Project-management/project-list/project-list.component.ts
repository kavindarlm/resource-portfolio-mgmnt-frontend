import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  data: undefined|datamodel[];
  constructor(private api:ApiService){
  }

  ngOnInit(): void {
    this.getProjectList();
  }
  // showupdateproject(){
  //   this.updateproject = true;
  // }

  openProject(project: any) {
    // Implement the logic to open the corresponding project
    console.log('Opening project:', project.projectName);
    alert("Opening project:");
    // Example: Navigate to a project detail page
    // this.router.navigate(['/project', project.id]);
  }
  getProjectList(){
    this.api.getProjectList().subscribe(res=>{
      this.data = res;
    })
  }
}
