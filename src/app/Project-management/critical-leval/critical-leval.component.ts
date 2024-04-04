import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { error } from 'console';

@Component({
  selector: 'app-critical-leval',
  templateUrl: './critical-leval.component.html',
  styleUrl: './critical-leval.component.css'
})
export class CriticalLevalComponent implements OnInit{
  constructor(private apiService:ApiService){}
  projectCount: number | undefined;
  highProjects: number | undefined;
  lowProjects: number | undefined;
  MediumProjects: number | undefined;

  ngOnInit(): void {
      this.fetchProjectCount();
      this.fetchHighProjectCount();
      this.fetchLowProjectCount();
      this.fetchMediumProjectCount();
  }

  fetchProjectCount(): void{
    this.apiService.getProjectCount().subscribe(
      (count: number) => {
        this.projectCount = count;
      },
      (error) => {
        console.error('Failed to fetch project count:', error);
      }
    )
    // console.log(this.projectCount);
  }

  fetchHighProjectCount(): void{
    this.apiService.getHighCriticalProjectCount().subscribe(
      (count: number) =>{
        this.highProjects = count;
      },
      (error) => {
        console.error('Failed to fetch High project count:', error);
      }
    )
    // console.log(this.highProjects);
  }

  fetchLowProjectCount(): void{
    this.apiService.getLowCriticalProjectCount().subscribe(
      (count: number) =>{
        this.lowProjects = count;
      },
      (error) => {
        console.error('Failed to fetch Low project count:', error);
      }
    )
    // console.log(this.lowProjects);
  }

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
