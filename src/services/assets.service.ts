import { http } from './api'
import {
  GNftData,
  GOwnedNft
} from '../types'

class AssetsService {

  async getAssets (address: string) {
    const res = await http.get<GNftData>(`/nfts/getAssets/${address}`)
    return res.data;
  }

  async getAssetById (address: string, id: number) {
    const res = await http.get<GOwnedNft>(`/nfts/getAsset/${address}/${id}`)
    return res.data;
  }

  async postRequestRarity (address: string) {
    const payload = {
      nftAddress: address
    }
    await http.post(`/nfts/requestRarity`, payload)
  }
}

export const assetsService = new AssetsService()
