import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { error } from 'console'; 
import { Subscription } from 'rxjs';
import { sharedprojectService } from '../service/sharedproject.service';

@Component({
  selector: 'app-critical-leval',
  templateUrl: './critical-leval.component.html',
  styleUrl: './critical-leval.component.css'
})
export class CriticalLevalComponent implements OnInit{
  constructor(private apiService:ApiService, private shared: sharedprojectService){}
  projectCount: number | undefined;
  highProjects: number | undefined;
  lowProjects: number | undefined;
  MediumProjects: number | undefined;
  Countsubscrip!: Subscription;

  ngOnInit(): void {
      this.Countsubscrip = this.shared.refreshProjectCount$.subscribe(() => {
        this.fetchProjectCount();
        this.fetchHighProjectCount();
        this.fetchLowProjectCount();
        this.fetchMediumProjectCount();
      });
  }

  //Fetch Project Count
  fetchProjectCount(): void{
    this.apiService.getProjectCount().subscribe(
      (count: number) => {
        this.projectCount = count;
      },
      (error) => {
        console.error('Failed to fetch project count:', error);
      }
    )
  }

  //Fetch High Project Count
  fetchHighProjectCount(): void{
    this.apiService.getHighCriticalProjectCount().subscribe(
      (count: number) =>{
        this.highProjects = count;
      },
      (error) => {
        console.error('Failed to fetch High project count:', error);
      }
    )
  }

  //Fetch Low Project Count
  fetchLowProjectCount(): void{
    this.apiService.getLowCriticalProjectCount().subscribe(
      (count: number) =>{
        this.lowProjects = count;
      },
      (error) => {
        console.error('Failed to fetch Low project count:', error);
      }
    )
  }

  //Fetch Medium Project Count
  fetchMediumProjectCount(): void{
    this.apiService.getMediumCriticalProjectCount().subscribe( 
      (count: number) =>{
        this.MediumProjects = count;
      },
      (error) => {
        console.error('Failed to fetch Medium project count:', error);
      }
    )
  }
}
