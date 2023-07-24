export interface Workflow {
  id: number;
  name: string;
  code:string;
  stage: string;
  type: string;
  department: string;
  reviewsCount: number;
  approvalsCount: number;
  reviewsType: string;
  approvalsType: string;  
  reviewers: [];
  approvals: [];
  status: string;
}
