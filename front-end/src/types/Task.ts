export interface Task {
  id: number;
  title: string;
  description: string;
  completed: 1 | 0;
  deadline?: Date;
}
