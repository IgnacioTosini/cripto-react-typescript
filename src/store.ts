import { create } from "zustand";
import { CryptoCurrency, CryptoPrice, PairP } from "./types";
import { devtools } from "zustand/middleware";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CyptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[],
    result: CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>
    fetchData: (pair: PairP) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
    }
})))