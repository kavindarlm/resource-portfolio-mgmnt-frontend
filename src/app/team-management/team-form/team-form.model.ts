// Object model for the team form
export interface JobRole {
  role_id: number;
  role_name: string;
  
}

export interface OrgUnit {
  org_unit_id: number;
  unit_name: string;
 
}

export interface Resource {
  resourceId: any;
  id: number;
  resourceName: string;
  jobRole: JobRole;
  orgUnit: OrgUnit;
  teamId: number;
}

export interface dataModel {
  id: number;
  teamName: string;
  description: string;
  resources: Resource[];
}