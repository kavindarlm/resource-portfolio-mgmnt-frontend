export interface ResourceModel{
    // id : number;
    resourceName : string ;
    resourceId : string; 
    roleId : number ;
    unitId : number;
};

export interface JobRoleModel {
    roleId : number;
    roleName : string;
}

//until the orgUnit feature is done
export interface OrgUnitModel {
    unitId : number;
    unitName : string;
    description : string;
    parentId : number;
}