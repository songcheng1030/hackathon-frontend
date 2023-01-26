import { http } from '../services/api'
import { IUser } from '../types/user.types'

class UserService {
  async getAll () {
    const res = await http.get<IUser[]>('/user/all');
    return res.data;
  }

  async updateUser (address: string, payload: IUser) {
    const res = await http.put<IUser>(`/users/${address}`, payload);
    return res.data;
  }

  async imageUpload (payload: {images: FormData}) {
    const res = await http.post<any>(`/uploads`, payload.images);
    console.log('thsi si files222222222', res)
    return res.data;
  }
}

export const userService = new UserService()
