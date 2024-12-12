export type Department = {
  id: string;
  name: string;
  members: Employee[];
  manager: Employee;
};

export type Employee = {
  id: string;
  name: string;
  email?: string;
  departmentId: string;
  role: 'employee' | 'manager' | 'ceo';
  position?: string;
};

export type IssueStatus = 
  | 'pending'
  | 'in_review'
  | 'need_info'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export type IssueComment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  attachments?: string[];
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: string;
  reporterId: string;
  assignees: string[];
  departmentIds: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  comments: IssueComment[];
  attachments: string[];
  resolution?: string;
  closedBy?: string;
  closedAt?: Date;
};