export interface projectModel {
  projectid: '';
  projectName: '';
  projectStartDate: '';
  projectEndDate: '';
  criticality: '';
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
