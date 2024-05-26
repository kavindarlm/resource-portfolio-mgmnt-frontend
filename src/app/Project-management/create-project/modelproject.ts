export interface datamodel{
    projectid: string;
    projectName: string;
    projectStartDate: string;
    projectEndDate: string;
    criticality_id: string;
    projectManager: string;
    deliveryManager: string;
    projectDescription: string;
}

export interface criticalityModel{
    criticality_id: string;
    description: string;
    type: string;
    create_date: string;
}