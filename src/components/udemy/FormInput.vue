<script setup lang="ts">
import { computed } from "vue";
import type { Status } from "../../validation";
interface Prop {
  name: string;
  id: string;
  modelValue: string;
  status: Status;
  type: string;
}
const props = defineProps<Prop>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
}

const modalClass = computed(() => {
  return !props.status.valid ? "is-invalid" : "is-valid";
});
</script>
<template>
  <div class="input-group has-validation">
    <div class="form-floating mb-3" :class="modalClass">
      <input
        :type="type"
        class="form-control"
        :class="modalClass"
        :id="props.name + props.id"
        placeholder=""
        :value="modelValue"
        @input="handleInput"
      />
      <label :for="props.name + props.id">{{ props.name }}</label>
    </div>
    <div v-if="!status.valid" class="invalid-feedback">
      {{ status.message }}
    </div>
    <div v-if="status.valid" class="valid-feedback">Looks good!</div>
  </div>
</template>
<style scoped></style>
