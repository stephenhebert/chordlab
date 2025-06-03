<script setup lang="ts">
defineProps<{
  lowestFret: number,
  hasNut: boolean
}>()
</script>

<template>
  <text 
    x="356.36" 
    y="287.38086128234863" 
    class="fret-position"
  >
		<tspan dy="49.4" x="356.36">
			{{ lowestFret }}fr
		</tspan>
	</text>
</template>

<style scoped>
.fret-position {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 38px;
  text-anchor: left;
  fill: #000000;
}
</style>