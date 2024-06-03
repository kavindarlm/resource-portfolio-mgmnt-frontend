export interface projectDataModel{
    projectid: string;
    projectName: string;
    projectStartDate: string;
    projectEndDate: string;
    criticality_id: number;
    projectManager_id: string;
    deliveryManager_id: string;
}

export interface resourceDataModel{
    resourceId: string;
    resourceName: string;
    roleId: number;
    unitId: number;
    teamId: number;
    resourceAllocation: string;
}