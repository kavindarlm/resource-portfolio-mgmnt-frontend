export interface OrganizationalUnitModel {
    unitId: number;
    unitName: string;
    parentId?: number;
    description: string;
    children?: OrganizationalUnitModel[];
}