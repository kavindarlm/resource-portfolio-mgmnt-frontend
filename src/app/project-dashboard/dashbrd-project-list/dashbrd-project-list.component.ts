import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbrd-project-list',
  templateUrl: './dashbrd-project-list.component.html',
  styleUrl: './dashbrd-project-list.component.css'
})
export class DashbrdProjectListComponent implements OnInit{
  projects = [
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 218, 97)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 218, 97)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)'},
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 218, 97)' },
    { title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
  ];

  constructor() { }

  currentPage = 1;
  itemsPerPage = 8;
  totalPages = Math.ceil(this.projects.length / this.itemsPerPage);

  ngOnInit(): void {
  }
}
