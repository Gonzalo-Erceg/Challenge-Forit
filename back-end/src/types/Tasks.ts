export interface Task {
  id: number;
  title: string;
  description: string;
  completed: 1 | 0;
}

export interface TaskFilters {
  title?: string;
  description?: string;
  completed?: boolean;
  deadlineFrom?: string;
  page?: number;
  limit?: number;
}

export interface TaskUpdate {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  deadline?: string;
}
