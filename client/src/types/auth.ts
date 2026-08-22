export type Role = "STUDENT" | "STUDENT_COORDINATOR" | "MESS_COORDINATOR" | "WARDEN" | "ADMIN";
export interface User {
  id: string;
  email: string;
  role: Role;
  fullName: string;
}
