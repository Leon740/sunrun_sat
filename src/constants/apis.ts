const BRANCH_API_URI = 'https://sunrun-sat-back.onrender.com/api/branches';
// const BRANCH_API_URI = 'http://localhost:5001/api/branches';

export const APIS = {
  ALL_BRANCHES_SHORT_API_URI: `${BRANCH_API_URI}/short`,
  EMPLOYEE_API_URI: (branchId: string) => `${BRANCH_API_URI}/${branchId}/employee`,
  ALL_EMPLOYEES_API_URI: (branchId: string) => `${BRANCH_API_URI}/${branchId}/allEmployees`,
  SATURDAYS_API_URI: (branchId: string) => `${BRANCH_API_URI}/${branchId}/saturdays`
};
