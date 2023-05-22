<template>
  <div id="firebaseui-auth-container" />
</template>

<script setup lang="ts">
import { EmailAuthProvider, GoogleAuthProvider, getAuth } from '@firebase/auth'
import 'firebaseui/dist/firebaseui.css'

onMounted(async () => {
  const { auth } = await import('firebaseui')
  const fbAuth = getAuth()
  const ui = auth.AuthUI.getInstance() || new auth.AuthUI(fbAuth)

  const config = {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult() {
        return false
      }
    }
  }

  ui.start('#firebaseui-auth-container', config)
})
</script>
