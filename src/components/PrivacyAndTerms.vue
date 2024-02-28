<script setup lang="ts">

</script>



<template>
   <div class="reg_privacy">
      <p class="text-center lexend-light text-sm">I accept all the</p>
      <p class="text-center lexend-light text-sm">
         <span><router-link class="text-gradient-primary" to="/terms">Terms & Conditions</router-link></span>
         &
         <span><router-link class="text-gradient-primary" to="/privacy">Privacy Policy</router-link></span>
      </p>
   </div>
</template>



<style scoped lang="scss">
a {
   border-bottom: 2px solid transparent;

   &:hover {
      border-color: $middle_color;
   }
}
</style>