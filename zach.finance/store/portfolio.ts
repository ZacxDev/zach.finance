// store/portfolio.ts
import { Ref, ref } from 'vue'
import { CreatePortfolioDocument, GetPortfoliosDocument, UpdatePortfolioDocument } from '~/gql/graphql'

export interface PurchaseInput {
  timestamp: number
  shareAmount: number
  pricePerShare: number
}

export interface PositionInput {
  ticker: string
  purchases: PurchaseInput[]
}

export interface CreatePortfolioInput {
  name: string
  positions: PositionInput[]
}

export interface UpdatePortfolioInput {
  uid: string
  name: string
  positions: PositionInput[]
}

export function usePortfolios() {
  const { result, onError, onResult, refetch } = useQuery(GetPortfoliosDocument)

  return {
    portfolios: result,
    error: onError,
    onResult,
    refetch
  }
}

export function useCreatePortfolio() {
  const { mutate: createPortfolio } = useMutation(CreatePortfolioDocument)
  const loading: Ref<boolean> = ref(false)

  async function create(input: CreatePortfolioInput) {
    loading.value = true
    const result = await createPortfolio({ createPortfolioInput: input })
    loading.value = false
    return result?.data?.createPortfolio
  }

  return {
    create,
    loading
  }
}

export function useUpdatePortfolio() {
  const { mutate: updatePortfolio } = useMutation(UpdatePortfolioDocument)
  const loading: Ref<boolean> = ref(false)

  async function update(input: UpdatePortfolioInput) {
    loading.value = true
    const result = await updatePortfolio({ updatePortfolioInput: input })
    loading.value = false
    return result?.data?.updatePortfolio
  }

  return {
    update,
    loading
  }
}
