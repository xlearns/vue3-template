<template>
  <div
    class="bg-gray-200 h-full w-full flex justify-center items-center flex-col gap-[5px]"
  >
    <ElButton @click="send">test</ElButton>
    <div class="h-[50px]">
      <ElScrollbar>
        <div v-for="(item, index) in list" :key="index">
          {{ item.label }}
        </div>
      </ElScrollbar>
    </div>
    <Test />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Test from "@c/Test.vue";
import { getTestGet } from "@a/gitlab";
import { ElMessage } from "element-plus";

interface IData {
  label: string;
}

const list = ref<IData[]>([]);
async function send() {
  try {
    const { code, data } = await getTestGet<IData[]>();
    if (code != 200) {
      return ElMessage.error("请求失败");
    }
    list.value = data;
  } catch (e) {
    throw new Error(e);
  }
}
</script>
