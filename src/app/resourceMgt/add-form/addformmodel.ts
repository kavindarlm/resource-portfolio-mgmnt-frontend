//Resource Model
export interface ResourceModel{
    resourceName : string ;
    resourceId : string; 
    roleId : number ;
    unitId : number;
};

//Job Role Model
export interface JobRoleModel {
    roleId : number;
    roleName : string;
}

//Organizational Unit model
export interface OrgUnitModel {
    unitId : number;
    unitName : string;
    description : string;
    parentId : number;
}