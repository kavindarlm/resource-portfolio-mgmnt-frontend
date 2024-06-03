// Object model for the team form
export interface JobRole {
  roleId: number;
  roleName: string;
  
}

export interface OrgUnit {
  unitId: number;
  unitName: string;
 
}

// In team-form.model.ts
export interface Resource {
  resourceId: string;
  roleName: string; // was jobRole
  unitName: string; // was orgUnit
  teamId?: number;
  isSelected?: boolean; // Add this line
}

export interface dataModel {
  teamId: number;
  team_Name: string;
  team_description: string;
  resources: Resource[];
}
