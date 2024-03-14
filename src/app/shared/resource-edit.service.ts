// // resource-edit.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ResourceEditService {
//   private selectedResourceSubject = new BehaviorSubject<any>(null);
//   selectedResource$ = this.selectedResourceSubject.asObservable();

//   constructor() {}

//   setSelectedResource(resource: any) {
//     console.log('Setting selected resource:', resource);
//     this.selectedResourceSubject.next(resource);
//   }
// }
