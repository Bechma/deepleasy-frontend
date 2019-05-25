export default async function({ redirect }) {
  // If the user is authenticated redirect
  const auth = window.$nuxt.$cookies.get('auth')
  try {
    const authenticated = auth && auth.refresh && auth.access
    if (authenticated) {
      let correcto = null
      window.$nuxt.$axios.setHeader('Content-Type', 'application/json')
      await window.$nuxt.$axios
        .$post('/api/auth/verify/', { token: auth.access })
        .then(() => (correcto = true))
        .catch(() => (correcto = false))
      if (correcto) return redirect('/home')
    }
  } catch (e) {}
}
