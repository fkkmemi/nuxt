export default function({ store, redirect, route }) {
  if (!store.state.user && route.path !== '/auth/signIn')
    return redirect('/auth/signIn')
}
