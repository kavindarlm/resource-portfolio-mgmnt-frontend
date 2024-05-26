import exp from "constants";

export interface projectModel {
  projectid: '';
  projectName: '';
  projectStartDate: '';
  projectEndDate: '';
  criticality_id: '';
  projectManager: '';
  deliveryManager: '';
  projectDescription: '';
}

export interface taskModel {
  taskid: '';
  taskName: '';
  exStartDate: '';
  exEndDate: '';
  taskDescription: '';
  taskAllocationPercentage: '';
  taskProgressPercentage: '';

   // Define an optional error property
   error?: {
    message: string;
  };
}

export interface taskUpdateModel{
  taskProgressPercentage: '';
}

export interface TaskApiResponse {
  success: boolean;
  message: string;
  // Add other properties if needed
}

