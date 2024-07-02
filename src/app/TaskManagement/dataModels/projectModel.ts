// Purpose: Define the interfaces for the Project and Task Models

// Define the Project Model interface
export interface projectModel {
  projectid: '';
  projectName: '';
  projectStartDate: '';
  projectEndDate: '';
  criticality_id: '';
  projectManager_id: '';
  deliveryManager_id: '';
  projectDescription: '';
}

// Define the Task Model interface
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

// Define the Task Update Model interface
export interface taskUpdateModel {
  taskProgressPercentage: '';
}

// Define the Task Api Response interface
export interface TaskApiResponse {
  success: boolean;
  message: string;
}

// Define the ResourceName and Id interface
export interface ResourceNameandId {
  resourceId: '';
  resourceName: '';
}
