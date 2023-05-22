<!-- components/PortfolioForm.vue -->
<template>
  <form class="flex flex-col justify-start gap-12" @submit.prevent>
    <div>
      <h2 class="text-2xl font-bold">
        Viewport
      </h2>
      <div class="flex gap-4">
        <div class="flex flex-col items-start">
          <label for="startDate">Start Date:</label>
          <input
            id="startDate"
            class="input"
            :value="startDateString"
            type="date"
            @input="updateStartDate(($event.target as HTMLInputElement).value)"
          >
        </div>
        <div class="flex flex-col items-start">
          <label for="endDate">End Date:</label>
          <input
            id="endDate"
            class="input"
            :value="endDateString"
            type="date"
            @input="updateEndDate(($event.target as HTMLInputElement).value)"
          >
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold">
        Portfolio
      </h2>
      <div class="flex">
        <div class="flex flex-col gap-4">
          <div>
            <div v-if="portfolio" class="flex flex-col items-start">
              <strong>{{ portfolio.name }}</strong>
              <label for="ticker">Tickers:</label>
              <div class="flex gap-2 items-center">
                <div v-for="p in portfolio.positions" :key="p.ticker" class="badge badge-primary">
                  {{ p.ticker }}
                </div>
                <button v-if="!isAddAssetVisible" class="btn btn-xs btn-primary" @click="toggleIsAddAssetVisible">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div v-if="isAddAssetVisible" class="flex gap-2 items-center">
            <input id="ticker" v-model="newTicker" type="text" class="input">
            <button class="btn btn-primary" @click="addAsset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="!isAddPositionVisible">
          <button class="btn btn-solid-primary" @click="toggleIsAddPostitionVisible">
            Add Purchase
          </button>
        </div>
      </div>

      <div v-if="portfolio !== null && isAddPositionVisible" class="flex flex-col gap-4">
        <label for="asset">Asset:</label>
        <select id="asset" v-model="selectedAsset" class="select">
          <option v-for="asset in portfolio.positions" :key="asset.ticker" :value="asset.ticker">
            {{ asset.ticker }}
          </option>
        </select>
        <div>
          <label for="purchaseDate">Purchase Date:</label>
          <input id="purchaseDate" v-model="newPurchase.date" type="date" class="input">
        </div>
        <div>
          <label for="quantity">Quantity:</label>
          <input id="quantity" v-model.number="newPurchase.quantity" type="number" class="input">
        </div>
        <div class="flex justify-end">
          <button class="btn btn-primary" @click="addPurchase">
            Save
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Portfolio } from '~/gql/graphql'
import { useCreatePortfolio, usePortfolios, useUpdatePortfolio } from '~/store/portfolio'
import { Session, useSession } from '~/store/session'

export default defineComponent({
  setup() {
    const { portfolios, onResult: onPortfoliosResult, refetch } = usePortfolios()
    const { create: createPortfolio } = useCreatePortfolio()
    const { update: updatePortfolio } = useUpdatePortfolio()
    const portfolio = ref<Portfolio | null>(portfolios.value?.getPortfolios[0] || null)
    const user = useCurrentUser()

    onPortfoliosResult((p) => {
      if (p.data.getPortfolios.length) {
        portfolio.value = p.data.getPortfolios[0]
      }
    })

    onMounted(() => {
      if (portfolios.value) {
        if (portfolios.value.getPortfolios.length) {
          portfolio.value = portfolios.value.getPortfolios[0]
        } else {
          const pname = user.value ? `${user.value.displayName}'s Portfolio` : 'New Portfolio'
          createPortfolio({
            name: pname,
            positions: []
          }).then(() => refetch())
        }
      }
    })

    const { getSession, setSession } = useSession()
    const { onResult, result } = getSession()
    const session = ref<Session | null>(result.value?.getSession || null)
    const defaultStartDateTimeString = session.value?.startDate ? new Date(session.value.startDate * 1000).toISOString().substring(0, 10) : undefined
    const defaultEndDateTimeString = session.value?.endDate ? new Date(session.value.endDate * 1000).toISOString().substring(0, 10) : undefined

    onResult((s) => {
      const ss = s.data.getSession
      session.value = ss

      startDateString.value = ss.startDate ? new Date(ss.startDate * 1000).toISOString().substring(0, 10) : undefined
      endDateString.value = ss.endDate ? new Date(ss.endDate * 1000).toISOString().substring(0, 10) : undefined
    })

    const newTicker = ref('')
    const selectedAsset = ref('')
    const newPurchase = ref({ date: '', quantity: 0 })

    const startDateString = ref<string | undefined>(defaultStartDateTimeString)
    const endDateString = ref<string | undefined>(defaultEndDateTimeString)

    const isAddPositionVisible = ref(false)

    const toggleIsAddPostitionVisible = () => {
      isAddPositionVisible.value = !isAddPositionVisible.value
    }

    const isAddAssetVisible = ref(false)

    const toggleIsAddAssetVisible = () => {
      isAddAssetVisible.value = !isAddAssetVisible.value
    }

    const addAsset = async () => {
      const p = portfolios.value?.getPortfolios[0]
      if (p?.uid) {
        const alreadyHasAsset = p.positions.some(
          p => p.ticker === newTicker.value
        )
        if (alreadyHasAsset) {
          return
        }

        await updatePortfolio({
          uid: p.uid,
          name: p.name,
          positions: [
            ...p.positions,
            {
              ticker: newTicker.value,
              purchases: []
            }
          ]
        })
      } else {
        await createPortfolio({
          name: 'New Portfolio',
          positions: [{
            ticker: newTicker.value,
            purchases: []
          }]
        })
      }
      newTicker.value = ''

      await refetch()
    }

    const addPurchase = async () => {
      // Add logic to update a portfolio with a new purchase
    }

    const updateStartDate = (dateString: string) => {
      const startDate = new Date(dateString).getTime() / 1000
      if (session.value) {
        setSession(startDate, session.value.endDate)
      } else {
        setSession(startDate, Math.round(new Date().getTime() / 1000))
      }
    }

    const updateEndDate = (dateString: string) => {
      const endDate = new Date(dateString).getTime() / 1000
      if (session.value) {
        setSession(session.value.startDate, endDate)
      } else {
        setSession(Math.round(new Date().getTime() / 1000), endDate)
      }
    }

    return {
      portfolio,
      newTicker,
      selectedAsset,
      newPurchase,
      addAsset,
      addPurchase,
      startDateString,
      endDateString,
      updateStartDate,
      updateEndDate,
      toggleIsAddPostitionVisible,
      isAddPositionVisible,
      toggleIsAddAssetVisible,
      isAddAssetVisible
    }
  }
})
</script>
