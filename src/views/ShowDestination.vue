<template>
  <section v-if="destination" class="destination">
    <h1>{{ destination.name }}</h1>
    <GoBack />
    <div class="destination-detail">
      <img :src="`/images/${destination.image}`" :alt="destination.name" />
      <p>{{ destination.description }}</p>
    </div>
  </section>

  <section class="experiences">
    <h2>Top experiences in {{ destination.name }}</h2>
    <div class="cards">
        <router-link
        v-for="experience in destination.experiences"
        :key="experience.slug"
        :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}">
            <ExperienceCard :experience="experience" />
        </router-link>
    </div>
    <router-view />
  </section>
</template>

<script>
import sourceData from "../data.json";
import { watch } from "vue"; // to watch route params
import ExperienceCard from "../components/ExperienceCard.vue";
import GoBack from '../components/GoBack.vue';
export default {
  components: { ExperienceCard, GoBack },
  props: {
    id: { type: Number, required: true },
  },
  computed: {
    // destinationId() {
    //     return parseInt(this.$route.params.id)
    // },
    destination() {
      // gettin static data from mocked json
      return sourceData.destinations.find(
        // with $route n destinationId()
        // destination => destination.id === this.destinationId

        (destination) => destination.id == this.id
      );
    },
  },
};
</script>
