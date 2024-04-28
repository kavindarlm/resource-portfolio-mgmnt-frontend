import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-added-resources',
  templateUrl: './added-resources.component.html',
  styleUrls: ['./added-resources.component.css']
})
export class AddedResourcesComponent {
  @Input() HeadArray: any[] = [];
  @Input() tablecontents: any[] = [];

  sprintName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintName = params['Sname'];
    });
  }

  navigateToAvailability(resourceId: string) {
    this.router.navigate([
      'pages-body',
      'handle-request',
      'sprintInfo',
      this.sprintName,
      'allocatedInfo',
      resourceId
    ]);
  }
}
