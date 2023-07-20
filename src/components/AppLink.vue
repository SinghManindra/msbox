<!-- this custom component will replace all the router links in the app, 
navigation will work like SPA, for external as well as internal routes -->
<template>
    <!-- handles external link -->
    <!-- adding target="_blank" rel="noopener" will open external link in new tab -->
    <a v-if="isExternal" :href="to"><slot /></a>
    <!-- handles internal link -->
    <router-link v-else v-bind="$props"><slot /></router-link>
</template>
<script>
import { RouterLink } from 'vue-router'

export default{
    props:{
        ...RouterLink.props
    },
    computed: {
        isExternal(){
            return typeof this.to === 'string' && this.to.startsWith('http')
        }
    }
}
</script>
