// store/session.ts
import { ref, Ref } from 'vue'
import { GetSessionDocument, SetSessionDocument } from '~/gql/graphql'

export interface Session {
  startDate: number;
  endDate: number;
}

const session: Ref<Session | null> = ref(null)

export function useSession() {
  function getSession() {
    const { onError, onResult, result } = useQuery(GetSessionDocument)

    return {
      error: onError,
      onResult,
      result
    }
  }

  async function setSession(startDate: number, endDate: number) {
    const { mutate } = useMutation(SetSessionDocument)
    await mutate({
      input: {
        startDate,
        endDate
      }
    })
  }

  return { session, getSession, setSession }
}
