<template>
  <div class="wrap-wheel">
    <div class="prize-marker"></div>
    <fieldset
      ref="luckyWheelRef"
      class="ui-wheel-of-fortune"
      :style="{ '--_items': prizes.length }"
    >
      <ul>
        <li
          v-for="(prize, index) in prizes"
          :key="prize"
          :style="{ '--_idx': index + 1 }"
        >
          {{ prize }}
        </li>
      </ul>
      <button type="button" @click="spinWheel">SPIN</button>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  prizes: {
    type: Array as PropType<string[]>,
    required: true,
  },
  duration: {
    type: Number,
    default: 4000,
  },
});

const emits = defineEmits(["finish"]);

const luckyWheelRef = ref<HTMLElement | null>(null);
const animation = ref<Animation | null>(null);
const preEndDegree = ref<number>(0);

const getPrize = (newEndDegree: number, prizes: string[]) => {
  const finalDegree = newEndDegree % 360;
  const segmentAngle = 360 / prizes.length;
  const adjustedDegree = (360 - finalDegree + 360) % 360;
  const winningIndex = (adjustedDegree / segmentAngle) % prizes.length;
  const winningPrize = prizes[customRoundNumber(winningIndex)];

  return winningPrize;
};

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
        duration: props.duration,
        direction: "normal",
        easing: "cubic-bezier(0.440, -0.205, 0.000, 1.130)",
        fill: "forwards",
        iterations: 1,
      }
    );

    animation.value.onfinish = () => {
      const prize = getPrize(newEndDegree, props.prizes);
      emits("finish", prize);
      alert(`You won: ${prize}`);
    };
  }
  preEndDegree.value = newEndDegree;
};
</script>

<style lang="scss">
.wrap-wheel {
  position: relative;
  background-color: tomato;

  .prize-marker {
    position: absolute;
    top: 50%; /* Adjust as needed */
    left: -20px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
    border-left: 20px solid red; /* prize color */
  }
  :where(.ui-wheel-of-fortune) {
    all: unset;
    aspect-ratio: 1 / 1;
    container-type: inline-size;
    direction: ltr;
    display: grid;
    position: relative;
    border: 0.5rem solid white;
    border-radius: 50%;

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
      }
    }
  }
}
</style>
