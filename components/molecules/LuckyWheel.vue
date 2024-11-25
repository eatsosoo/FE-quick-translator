<template>
  <div class="wrap-wheel">
    <div class="arrow-marker"></div>
    <fieldset ref="luckyWheelRef" class="ui-wheel-of-fortune">
      <ul>
        <li v-for="prize in prizes" :key="prize">{{ prize }}</li>
      </ul>
      <button type="button" @click="spinWheel">SPIN</button>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const luckyWheelRef = ref<HTMLElement | null>(null);
const animation = ref<Animation | null>(null);
const preEndDegree = ref<number>(0);
const prizes = [
  "$1000",
  "$2000",
  "$3000",
  "$4000",
  "$5000",
  "$6000",
  "$7000",
  "$8000",
  "$9000",
  "$10000",
  "$11000",
  "$12000",
];
const numSegments = prizes.length;

const spinWheel = () => {
  if (animation.value) {
    animation.value.cancel(); // Reset the animation if it already exists
  }

  const randomDegree = Math.random() * 360 + 1800;
  const newEndDegree = preEndDegree.value + randomDegree;

  if (luckyWheelRef.value) {
    animation.value = luckyWheelRef.value.animate(
      [
        { transform: `rotate(${preEndDegree.value}deg)` },
        { transform: `rotate(${newEndDegree}deg)` },
      ],
      {
        duration: 4000,
        direction: "normal",
        easing: "cubic-bezier(0.440, -0.205, 0.000, 1.130)",
        fill: "forwards",
        iterations: 1,
      }
    );

    animation.value.onfinish = () => {
      const finalDegree = newEndDegree % 360;
      const segmentAngle = 360 / numSegments;
      const winningIndex =
        Math.floor((360 - finalDegree) / segmentAngle) % numSegments;
      const winningPrize = prizes[winningIndex];
      alert(`You won: ${winningPrize}`);
    };
  }
  preEndDegree.value = newEndDegree;
};
</script>

<style lang="scss">
.wrap-wheel {
    position: relative;
    
  .arrow-marker {
    position: absolute;
    top: 50%; /* Adjust as needed */
    left: -1px;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
    border-left: 20px solid red; /* Arrow color */
  }
  :where(.ui-wheel-of-fortune) {
    --_items: 12;
    all: unset;
    aspect-ratio: 1 / 1;
    container-type: inline-size;
    direction: ltr;
    display: grid;
    position: relative;
    width: 100%;

    & > * {
      position: absolute;
    }

    button {
      aspect-ratio: 1 / 1;
      background: hsla(0, 0%, 100%, 0.8);
      border: 0;
      border-radius: 50%;
      cursor: pointer;
      font-size: 5cqi;
      place-self: center;
      width: 20cqi;
    }

    ul {
      all: unset;
      clip-path: inset(0 0 0 0 round 50%);
      display: grid;
      inset: 0;
      place-content: center start;

      li {
        align-content: center;
        aspect-ratio: 1 / calc(2 * tan(180deg / var(--_items)));
        background: hsl(
          calc(360deg / var(--_items) * calc(var(--_idx))),
          100%,
          75%
        );
        clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
        display: grid;
        font-size: 5cqi;
        grid-area: 1 / -1;
        padding-left: 1ch;
        rotate: calc(360deg / var(--_items) * calc(var(--_idx) - 1));
        transform-origin: center right;
        user-select: none;
        width: 50cqi;

        &:nth-of-type(1) {
          --_idx: 1;
        }
        &:nth-of-type(2) {
          --_idx: 2;
        }
        &:nth-of-type(3) {
          --_idx: 3;
        }
        &:nth-of-type(4) {
          --_idx: 4;
        }
        &:nth-of-type(5) {
          --_idx: 5;
        }
        &:nth-of-type(6) {
          --_idx: 6;
        }
        &:nth-of-type(7) {
          --_idx: 7;
        }
        &:nth-of-type(8) {
          --_idx: 8;
        }
        &:nth-of-type(9) {
          --_idx: 9;
        }
        &:nth-of-type(10) {
          --_idx: 10;
        }
        &:nth-of-type(11) {
          --_idx: 11;
        }
        &:nth-of-type(12) {
          --_idx: 12;
        }
      }
    }
  }
}
</style>
