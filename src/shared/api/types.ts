export interface PutRating {
  id: number;
  user_rate: number;
  token: string;
}

export interface AuthorizeType {
  login: string;
  password: string;
}

export interface FetchFilmsParams {
  title?: string;
  page?: number;
  genre?: string;
  release_year?: string;
}