import { ResultSetHeader } from "mysql2"

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
  created_at: string;
}

export interface UserResultSetHeader extends ResultSetHeader {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
  created_at: string;
}
