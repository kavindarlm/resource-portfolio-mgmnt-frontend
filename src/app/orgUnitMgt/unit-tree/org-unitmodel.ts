export interface OrgUnit {
    unitName: string;
    unitId: number;
    parentId: number | null;
    description: string;
    children: OrgUnit[];
}

export interface OrgUnitRecrsive {
    unitName: string;
    unitId: number;
    parentId: number | null;
    description: string;
    createdAt: string;
}