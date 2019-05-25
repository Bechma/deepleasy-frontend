<template>
    
</template>

<script>
export default {
  name: 'logout',
  beforeMount() {
    this.$cookies.remove('auth')
    this.$router.push('/login')
  }
}
</script>

<style scoped>

</style>
