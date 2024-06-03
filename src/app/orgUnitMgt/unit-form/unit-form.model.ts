export interface OrganizationalUnitModel {
    unitId: number;
    unitName: string;
    parentId: number | null;
    description: string;
    children?: OrganizationalUnitModel[];
}