<template>
  <div id="nav">
    <!-- <router-link to="/" class="navItem">Home</router-link>
    <router-link to="/about" class="navItem">About</router-link>
    <router-link to="/brazil" class="navItem">Brazil</router-link>
    <router-link to="/hawai" class="navItem">Hawai</router-link>
    <router-link to="/jamaica" class="navItem">Jamaica</router-link>
    <router-link to="/panama" class="navItem">Panama</router-link> -->
    <!-- Above individual links are not not needed with below implementaion of for loop, ALL COUNTRY FILES ALSO CAN BE DELETED -->
    <!-- replaced all router links with custom component App Link -->
    <AppLink id="logo" to="/">Travel App</AppLink>
     <AppLink v-for="destination in destinations" 
        :key="destination.id" 
        :to="{name: 'destination.show', params:{id: destination.id, slug: destination.slug}}">
            {{destination.name}}
     </AppLink>
     <AppLink :to="{name: 'protected'}">Dashboard</AppLink>
     <AppLink to="https://google.com">Google</AppLink>
  </div>
</template>

<style lang="css">
    #nav .navigation-active {
        color: blue;
        border-bottom: 2px solid blue;
    }
</style>

<script>
import dataSource from '../data.json'
export default {
    data() {
        return {
            destinations: dataSource.destinations
        }
    },
}
</script>