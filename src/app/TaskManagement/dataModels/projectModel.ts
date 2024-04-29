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
}

export interface taskUpdateModel{
  taskProgressPercentage: '';
}

