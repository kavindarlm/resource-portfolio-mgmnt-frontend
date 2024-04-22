import { Component, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { HttpClient } from '@angular/common/http';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-unit-tree',
  templateUrl: './unit-tree.component.html',
  styleUrl: './unit-tree.component.css'
})


////////////////////////////////////////////////////////////////////////////////////


// export class UnitTreeComponent implements OnInit {

//   treeData = {
//     unitName: 'Unit 1',
//     unitId:1,
//     // level: 1,
//     parentId: null,
//     description: 'This is unit 1',
//     children: [
//       {
//         unitName: 'Unit 2',
//         unitId: 2,
//         // level: 2,
//         parentId: 1,
//         description: 'This is unit 2',
//         children: [
//           {
//             unitName: 'Unit 4',
//             unitId: 4,
//             // level: 3,
//             parentId: 2,
//             description: 'This is unit 4',
//             children: []
//           }
//         ]
//       },
//       {
//         unitName: 'Unit 3',
//         unitId: 3,
//         // level: 2,
//         parentId: 1,
//         description: 'This is unit 3',
//         children: [
//           {
//             unitName: 'Unit 5',
//             unitId: 5,
//             // level: 3,
//             parentId: 3,
//             description: 'This is unit 5',
//             children: []
//           },
//           {
//             unitName: 'Unit 6',
//             unitId: 6,
//             // level: 3,
//             parentId: 3,
//             description: 'This is unit 6',
//             children: [
//               {
//                 unitName: 'Unit 8',
//                 unitId: 8,
//                 // level: 4,
//                 parentId: 6,
//                 description: 'This is unit 8',
//                 children: []
//               },
//               {
//                 unitName: 'Unit 9',
//                 unitId: 9,
//                 // level: 4,
//                 parentId: 6,
//                 description: 'This is unit 9',
//                 children: []
//               },
//               {
//                 unitName: 'Unit 10',
//                 unitId: 10,
//                 // level: 4,
//                 parentId: 6,
//                 description: 'This is unit 10',
//                 children: [
//                   {
//                     unitName: 'Unit 11',
//                 unitId: 11,
//                 // level: 4,
//                 parentId: 10,
//                 description: 'This is unit 11',
//                 children: []
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             unitName: 'Unit 7',
//             unitId: 7,
//             // level: 3,
//             parentId: 3,
//             description: 'This is unit 7',
//             children: []
//           },
//           {
//             unitName: 'Unit 12',
//             unitId: 12,
//             // level: 3,
//             parentId: 3,
//             description: 'This is unit 12',
//             children: []
//           }
//         ]
//       }
//     ]
//   };

//   //treeData: OrganizationalUnitModel[] | undefined;//declaring an array for orgUnits

//   constructor(private http: HttpClient, private orgUnitMgtService: OrgUnitMgtService) {}

//   ngOnInit(): void {
//     this.loadOrgUnits();
//   }

//   loadOrgUnits() {
//     this.orgUnitMgtService.getOrgUnits()
//     .pipe(
//       catchError((error) => {
//         console.error('Error fetching org units:', error);
//         alert('An error occurred while fetching org units. Please try again');
//         return throwError('Error fetching org units');
//       })
//     )
//     .subscribe((res: any) => {
//       this.treeData = res;
//       console.log(this.treeData);
//     },
//     (error) => {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again');
//     }
//   );
//   }

//   // Recursive function to build tree structure
//   private buildTree(orgUnits: OrganizationalUnitModel[]): OrganizationalUnitModel[] {
//     const map: { [unitId: number]: OrganizationalUnitModel } = {};
//     const roots: OrganizationalUnitModel[] = [];

//     // Create a map of units for easy access
//     orgUnits.forEach(unit => {
//       map[unit.unitId] = unit;
//       unit.children = [];
//     });

//    // Connect children to their parent
//   orgUnits.forEach(unit => {
//   if (unit.parentId && map[unit.parentId]) {
//     // Using optional chaining to access children safely
//     map[unit.parentId]!.children = map[unit.parentId]!.children || [];
//     map[unit.parentId]!.children!.push(unit);
//   } else {
//     roots.push(unit); // If no parent, it's a root node
//   }
// });


//     return roots;
//   }
// }

////////////////////////////////

export class UnitTreeComponent implements OnInit {

  treeData: OrganizationalUnitModel[] = [];

  constructor(private http: HttpClient, private orgUnitMgtService: OrgUnitMgtService) {}

  ngOnInit(): void {
    this.loadOrgUnits();
  }

  loadOrgUnits() {
    this.orgUnitMgtService.getOrgUnits()
      .pipe(
        catchError((error) => {
          console.error('Error fetching org units:', error);
          alert('An error occurred while fetching org units. Please try again');
          return throwError('Error fetching org units');
        })
      )
      .subscribe((res: OrganizationalUnitModel[]) => {
        // Convert flat data to hierarchical structure
        this.treeData = this.buildTree(res);
        console.log(this.treeData);
      },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again');
      }
    );
  }

  // Recursive function to build tree structure
  private buildTree(orgUnits: OrganizationalUnitModel[]): OrganizationalUnitModel[] {
    const map: { [unitId: number]: OrganizationalUnitModel } = {};
    const roots: OrganizationalUnitModel[] = [];

    // Create a map of units for easy access
    orgUnits.forEach(unit => {
      map[unit.unitId] = unit;
      unit.children = [];
    });

    // Connect children to their parent
    orgUnits.forEach(unit => {
      if (unit.parentId && map[unit.parentId]) {
        // Using optional chaining to access children safely
        map[unit.parentId]!.children = map[unit.parentId]!.children || [];
        map[unit.parentId]!.children!.push(unit);
      } else {
        roots.push(unit); // If no parent, it's a root node
      }
    });

    return roots;
  }
}
