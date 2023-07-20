<template>
    <div>
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input v-model="username" name="username" type="text" class="input"/>
            <label for="password">Password</label>
            <input v-model="username" name="password" type="text" class="input"/>
            <button class="btn">Login</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
      return {
          username: '',
          password: ''
      }  
    },
    methods: {
        login(){
            // actual authentications done here, with api
            // once successfully verified, store user detail on window
            window.user = this.username
            const redirectPath = this.$route.query.redirect || 'protected' // get redirect params from url
            // then can redirect user to asked path
            // this.$router.push({name: 'protected'}) // redirect to specified page, protected in this case
            this.$router.push(redirectPath) // redirect to path shown in url
        }
    }
}
</script>