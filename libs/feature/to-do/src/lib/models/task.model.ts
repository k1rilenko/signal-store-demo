export interface Task {
  id: number;
  title: string;
  description: string;
  order: number;
  owner: string;
  priority: number;
}

export type Order = 'asc' | 'desc';

export type TodoState = {
  tasks: Task[];
  isLoading: boolean;
  filter: { query: string; order: Order };
};
