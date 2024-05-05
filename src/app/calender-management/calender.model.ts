export interface Holiday {
    id: number;
    date: Date;
    holy_type: string;
    resourceHolidays: ResourceHoliday[];
  }
  
  export interface ResourceHoliday {
    id: number;
    resource: Resource;
    holiday: Holiday;
  }
  
  export interface Resource {
    id: number;
   
  }