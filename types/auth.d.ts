export interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

export interface LoginFormInput {
  email: string
  password: string
}
