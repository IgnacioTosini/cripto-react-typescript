import axios from "axios";
import { create } from "zustand";
import { CryptoCurrenciesResponseSchema } from "./components/schema/crypto-schema";
import { CryptoCurrency } from "./types";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[],
    fetchCryptos: () => Promise<void>
}
async function getCryptos() {
    const url = `/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD`
    const { data: { Data } } = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    if (result.success) {
        return result.data
    }
}

export const useCryptoStore = create<CryptoStore>((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    }
}))