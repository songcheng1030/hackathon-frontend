import { http } from './api'
import {
  IUser,
} from '../types'

class AuthService {

  async login (address: string) {
    const res = await http.get<IUser>(`/users/login/${address}`)
    return res.data;
  }
  
}

export const authService = new AuthService()
