<template>
  <mc-container class="confabulate-container">
    <a-tabs default-active-key="mine">
      <a-tab-pane key="mine" title="我的" class="confabulate-container-tab-mine">
        <a-list>
          <a-list-item v-for="(room, id) in SocketStore.getRooms" :key="id">
            <a-row align="center">
              <a-col :span="8">
                <div class="confabulate-container-tab-mine-room-name">
                  {{ room.info.name }}
                </div>
              </a-col>
              <a-col :span="16">
                <div class="confabulate-container-tab-mine-action">
                    <a-button
                      v-if="room.info.author === userStore.getInfo.id"
                      class="confabulate-container-tab-mine-action-delete"
                      type="primary"
                      status="danger"
                      @click="useDeleteRooms(id)"
                      style="margin-right: 10px"
                      >删除</a-button
                    >
                  <a-badge :count="room.messageCount">
                    <a-button type="primary" @click="useToRoomInformation(id)"
                      >进入</a-button
                    >
                  </a-badge>
                </div>
              </a-col>
            </a-row>

            <a-space align="center">
              <div style="flex: 1"></div>
            </a-space>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="all" title="全部" class="confabulate-container-tab-all">
        <a-list>
          <a-list-item v-for="room in rooms" :key="room.id">
            <a-row align="center">
              <a-col :span="8">
                <div class="confabulate-container-tab-all-room-name">
                  {{ room.name }}

                </div>
              </a-col>
              <a-col :span="16">
                <div class="confabulate-container-tab-all-action">

                  <a-button
                    type="primary"
                    style="float: right"
                    v-if="!compMyRooms.includes(room.id)"
                    @click="useJoinRooms(room)"
                    >Join</a-button
                  >
                </div>
              </a-col>
          </a-row>
            
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
// import { useSocketStore } from "@/store/modules/resetSocket";
import { useUserStore } from "@/store/modules/user";
import { reactive, Ref, ref, nextTick, computed } from "vue-demi";
import { Notification } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
const SocketStore = useSocketStore();
const userStore = useUserStore();

const visibleCreate = ref(false);

const compMyRooms = computed(() => {
  return Object.keys(SocketStore.rooms) || [];
});

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
  Notification.info({
    content: msg.message,
    title: msg.action,
    position: 'bottomRight',
    duration: 5000
  })
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
@media screen and (max-width: 600px) {
  .arco-modal {
    width: 100%;
  }
}
.confabulate-container{

  &-tab-mine,
  &-tab-all{
    &-room-name{
      font-weight: 700;
    }

    &-action{
      float: right;

      &-delete{
        margin-right: 10px;
      }
    }
  }

}
</style>