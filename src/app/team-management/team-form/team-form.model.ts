export interface Resource {
    resourceId: number;
    resourceName: string;
    role: string;
    OrgUnit: string;
  }
  
  export interface dataModel {
    id: number;
    teamName: string;
    description: string;
    selectedResources: Resource[];
  }