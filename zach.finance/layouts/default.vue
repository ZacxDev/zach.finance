<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">

      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>

      <Body>
        <div v-if="route.path !== '/'" class="flex justify-center">
          <div class="navbar w-11/12 card max-w-none" style="background-color:#232323;">
            <div class="navbar-start flex items-center justify-between">
              <nuxt-link
                class="navbar-item"
                :to="localePath({ name: 'index' })"
              >
                zach.finance
              </nuxt-link>
              <span v-if="user" class="navbar-item" @click="logout()">
                Log out
              </span>
              <nuxt-link
                v-else-if="route.path !== '/signin'"
                class="navbar-item"
                :to="`${'/signin'}?returnTo=${route.path}`"
              >
                Sign in
              </nuxt-link>
            </div>
          </div>
        </div>

        <div v-if="route.path !== '/' && route.path !== '/signin'" class="flex justify-center mt-4">
          <div class="w-11/12 card max-w-none p-8">
            <div v-if="user">
              <PortfolioForm v-if="route.path !== '/'" />
            </div>
            <div v-if="!user">
              <span>
                <nuxt-link :to="`${'/signin'}?returnTo=${route.path}`" class="text-blue-600">
                  Sign-in
                </nuxt-link> to save your portfolio :)
              </span>
            </div>
          </div>
        </div>
        <slot />
      </Body>

    </Html>
  </div>
</template>

<script lang="ts" setup>
import { getAuth } from '@firebase/auth'
import { SigninDocument, SignoutDocument } from '~/gql/graphql'

const { t } = useI18n()
const title = computed(() => t('siteTitle'))
const desc = computed(() => t('siteDescription'))
const route = useRoute()
const user = useCurrentUser()
const router = useRouter()
const localePath = useLocalePath()

useHead({
  meta: [
    { property: 'og:title', content: title },
    { property: 'og:description', content: desc },
    { property: 'og:image', content: '/apple-touch-icon.png' }
  ]
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

const { mutate: signoutOfApi } = useMutation(SignoutDocument)

const logout = () => {
  signoutOfApi().then(() => {
    getAuth().signOut()
  })
}

const { mutate: signinToApi } = useMutation(SigninDocument)

// we don't need this watcher on server
onMounted(() => {
  watch(user, async (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/signin')
    } else if (!prevUser && user) {
      const idToken = await user.getIdToken()
      signinToApi({
        idToken
      }).then((success) => {
        if (success) {
          // user logged in
          if (route.path === '/signin') {
            if (typeof route.query.returnTo === 'string') {
              router.push(route.query.returnTo)
            } else {
              router.push('/')
            }
          }
        } else {
          alert('api signin error')
        }
      })
    }
  })
})

</script>
