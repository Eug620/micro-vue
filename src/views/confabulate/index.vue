<template>
  <mc-container>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="All">
        <a-list>
          <a-list-item v-for="room in rooms" :key="room.id">
            {{ room.name }}
            <a-button
              type="primary"
              style="float: right"
              @click="useJoinRooms(room)"
              >Join</a-button
            >
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="2" title="Mine">
        <a-list>
          <a-list-item v-for="(room, id) in SocketStore.getRooms" :key="id">
            {{ room.info.name }}
            <div style="float: right">
              <template v-if="room.info.author === userStore.getInfo.id">
                (My)
                <a-button
                  type="primary"
                  status="danger"
                  @click="useDeleteRooms(id)"
                  style="margin-right: 10px"
                  >Delete</a-button
                >
              </template>
              <a-badge :count="room.messageCount">
                <a-button type="primary" @click="useToRoomInformation(id)"
                  >Start</a-button
                >
              </a-badge>
            </div>
          </a-list-item>
        </a-list>
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
      // roomsByOwn.value = res.data;
      SocketStore.initRooms(res.data);
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
const useToRoomInformation = (id: any) => {
  console.log(id);

  router.push({
    name: "roomInformation",
    params: { id },
  });
};
const useDeleteRooms = async (id: any) => {
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