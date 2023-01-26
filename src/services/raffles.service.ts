import { http } from './api'
import {
  GRaffles,
  GSoldHistory,
  GRaffleSoldHistory,
  GNotification,
} from '../types'

class RafflesService {

  async getRaffles () {
    const res = await http.get<GRaffles>(`/raffles/filterByState/0,1`)
    return res.data;
  }

  async getRafflesById (id: number) {
    const res = await http.get<GRaffles>(`/raffles/getByRaffleid/${id}`)
    return res.data;
  }

  async getSoldHistory (id: number) {
    const res = await http.get<GSoldHistory[]>(`/raffles/getSoldHistory/${id}`)
    console.log('this is getSoldHistory', res);
    return res.data;
  }
  async getRaffleListed (address: string) {
    const res = await http.get<GRaffles[]>(`/raffles/getListedByOwner/${address}`)
    return res.data;
  }

  async getRaffleSold (address: string) {
    const res = await http.get<GRaffleSoldHistory[]>(`/raffles/getSoldFromOwner/${address}`)
    return res.data;
  }

  async getNotification (address: string) {
    const res = await http.get<GNotification[]>(`/raffles/unreadSoldNFTHistory/${address}`)
    return res.data;
  }
}

export const rafflesService = new RafflesService()
