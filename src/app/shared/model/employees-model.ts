export interface EMPLOYEE {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: string;
  joiningDate: string;
  status: string;
  profilePhoto?: string;
  skills: Skill[];
  incomes: Income[];
}
export interface Skill {
  experience: number;
  level: string;
}
export interface Income {
  skillName: string;
  freuency: number;
  interval: string;
  amount: number;
}
