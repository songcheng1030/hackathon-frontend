import { http } from './api'
import {
  GEthPrice
} from '../types'

class EthPriceService {

  async getEthPrice () {
    const res = await http.get<GEthPrice>(`/cryptos/price/ethereum/ETH`)
    return res.data;
  }
}

export const ethPriceService = new EthPriceService()
