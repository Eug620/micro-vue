<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-18 05:33:53
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-19 10:53:44
 * @FilePath: /micro-vue/src/views/confabulate/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <mc-container>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="All">
        <div v-for="room in rooms" :key="room.id">
          {{ room.name }}
          <a-button @click="useJoinRooms(room)">Join</a-button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="Mine">
        <div v-for="room in roomsByOwn" :key="room.id">
          {{ room.name }}
          <a-button @click="useToRoomInformation(room)">Start</a-button>
          <template v-if="room.author === userStore.getInfo.id">
            <a-button @click="useDeleteRooms(room)">Delete</a-button>
            (My)
          </template>
        </div>
      </a-tab-pane>

      <template #extra>
        <a-button @click="useCreateRooms">Create Room</a-button>
      </template>
    </a-tabs>

    <a-modal :mask-closable="false" v-model:visible="visibleCreate">
      <template #title> Create Room </template>
      <a-form auto-label-width ref="refForm" :model="formRoom">
        <a-form-item field="name" :rules="formRoomRules.name" label="Name: ">
          <a-input
            v-model="formRoom.name"
            placeholder="please enter your Room name..."
          />
        </a-form-item>
        <a-form-item
          field="describe"
          :rules="formRoomRules.describe"
          label="Describe: "
        >
          <a-input
            v-model="formRoom.describe"
            placeholder="please enter your Room describe..."
          />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="useCancelCreate">Cancel</a-button>
        <a-button type="primary" @click="useConfirmCreate">Confirm</a-button>
      </template>
    </a-modal>
  </mc-container>
</template>

<script setup lang="ts">
import ServerApi from "@/api";
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { reactive, Ref, ref, nextTick } from "vue-demi";
import { Notification } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
const SocketStore = useSocketStore();
const userStore = useUserStore();

const visibleCreate = ref(false);

const formRoom = reactive({
  name: "",
  describe: "",
});
const formRoomRules = reactive({
  name: [
    { required: true, message: "name is required" },
    { minLength: 5, message: "must be greater than 5 characters" },
  ],
  describe: [
    { required: true, message: "describe is required" },
    { minLength: 5, message: "must be greater than 5 characters" },
  ],
});
const refForm: any = ref(null);

SocketStore.useMonitor("online", (msg: any) => {
  console.log("🔗 :", msg);
});

const rooms: Ref<any[]> = ref([]);
const useGetRoomsAll = async () => {
  try {
    let res = await ServerApi.RoomsAll();
    console.log(res);
    if (res.code === 200) {
      rooms.value = res.data;
    }
  } catch (error) {}
};
useGetRoomsAll();

const roomsByOwn: Ref<any[]> = ref([]);
const useGetRoomsOwn = async () => {
  try {
    let res = await ServerApi.RoomsOwnRoom();
    console.log(res);
    if (res.code === 200) {
      roomsByOwn.value = res.data;
    }
  } catch (error) {}
};

useGetRoomsOwn();

const useJoinRooms = async ({ id }: any) => {
  try {
    let res = await ServerApi.RoomsJoin({ room_id: id });
    console.log(res);
    if (res.code === 200) {
      Notification.success("Join Success!");
      useGetRoomsOwn();
    }
  } catch (error) {}
};
const router = useRouter();
const useToRoomInformation = ({ id }: any) => {
  router.push({
    name: "roomInformation",
    params: { id },
  });
};
const useDeleteRooms = async ({ id }: any) => {
  try {
    let res = await ServerApi.RoomsDelete({ id });
    if (res.code === 200) {
      Notification.success("Delete Success!");
      useGetRoomsAll();
      useGetRoomsOwn();
    }
  } catch (error) {}
};
const useSublimCreate = async () => {
  try {
    let res = await ServerApi.RoomsCreate(formRoom);
    if (res.code === 200) {
      Notification.success("Create Success!");
      visibleCreate.value = false;
      formRoom.name = "";
      formRoom.describe = "";
      useGetRoomsAll();
      useGetRoomsOwn();
    }
  } catch (error) {}
};

const useCreateRooms = () => {
  visibleCreate.value = true;
};
const useConfirmCreate = () => {
  refForm.value.validate((err: any, res: any) => {
    if (err) {
      Notification.error("Field is Required!");
    } else {
      useSublimCreate();
    }
  });
};
const useCancelCreate = () => {
  visibleCreate.value = false;
};
</script>

<style lang="scss">
</style>