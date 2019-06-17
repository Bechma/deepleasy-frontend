export default async function({ app, redirect }) {
  const auth = app.$cookies.get('auth')
  try {
    const authenticated = auth && auth.refresh && auth.access
    if (authenticated) {
      let correcto = null
      app.$axios.setHeader('Content-Type', 'application/json')
      await app.$axios
        .$post('/api/auth/verify/', { token: auth.access })
        .then(() => (correcto = true))
        .catch(() => (correcto = false))
      if (!correcto) return redirect('/login')
    } else {
      return redirect('/login')
    }
  } catch (e) {
    return redirect('/login')
  }
}
