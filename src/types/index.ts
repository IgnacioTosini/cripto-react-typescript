import { z } from "zod"
import { CryptoPriceSchema, PairSchema } from './../components/schema/crypto-schema';
import { CryptoCurrencyResponseSchema, CurrencySchema } from "../components/schema/crypto-schema"

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type PairP = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>