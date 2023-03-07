<template>
  <mc-container class="confabulate-container">
    <a-tabs default-active-key="mine">
      <a-tab-pane key="mine" :title="$t('pages.confabulate.mine')" class="confabulate-container-tab-mine">
        <a-list>
          <a-list-item v-for="(room, id) in SocketStore.getRooms" :key="id">
            <a-page-header :show-back="false">
              <template #title> {{ room.info.name }}</template>
              <template #subtitle>
                {{ room.info.describe }}
                <a-divider direction="vertical" />
                <a-tag :closable="false" color="cyan">
                  <template #icon>
                    <IconUserGroup />
                  </template>
                  {{ useOnlineSum(room.onlineInfo) }}
                  /
                  {{ room.onlineInfo.size }}
                </a-tag>
                <template v-if="room.messageCount">
                  <a-divider direction="vertical" />
                  <a-tag :closable="false" color="purple">
                    <template #icon>
                      <IconMessage />
                    </template>
                    {{ room.messageCount }}
                  </a-tag>
                </template>
              </template>
              <template #extra>
                <a-button v-if="room.info.author === userStore.getInfo.id"
                  class="confabulate-container-tab-mine-action-delete" type="outline" status="danger"
                  @click="useDeleteRooms(id)" style="margin-right: 10px" shape="round">{{ $t('button.delete')
                  }}</a-button>
                <a-button type="outline" @click="useToRoomInformation(id)" shape="round">
                  {{ $t('pages.confabulate.entry') }}
                </a-button>
              </template>
            </a-page-header>
          </a-list-item>
          <a-list-item v-for="room in notJoin" :key="room.id">
            <a-page-header :show-back="false">
              <template #title> {{ room.name }}</template>
              <template #subtitle>
                {{ room.describe }}
              </template>
              <template #extra>
                <a-button shape="round" type="outline" style="float: right" v-if="!compMyRooms.includes(room.id)"
                  @click="useJoinRooms(room)">{{ $t('pages.confabulate.join') }}</a-button>
              </template>
            </a-page-header>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <!-- <a-tab-pane key="all" :title="$t('pages.confabulate.all')" class="confabulate-container-tab-all">
        <a-list>
          <a-list-item v-for="room in rooms" :key="room.id">
            <a-page-header :show-back="false">
              <template #title> {{ room.name }}</template>
              <template #subtitle>
                {{ room.describe }}
              </template>
              <template #extra>
                <a-button shape="round" type="outline" style="float: right" v-if="!compMyRooms.includes(room.id)"
                  @click="useJoinRooms(room)">{{ $t('pages.confabulate.join') }}</a-button>
              </template>
            </a-page-header>
          </a-list-item>
        </a-list>
      </a-tab-pane> -->

      <template #extra>
        <a-button shape="round" type="primary" @click="useCreateRooms">{{ $t('button.create') }}</a-button>
      </template>
    </a-tabs>

    <a-modal :mask-closable="false" v-model:visible="visibleCreate">
      <template #title> {{ $t('pages.confabulate.create') }} </template>
      <a-form auto-label-width ref="refForm" :model="formRoom">
        <a-form-item field="name" :rules="formRoomRules.name" :label="$t('pages.confabulate.name')">
          <a-input v-model="formRoom.name" :placeholder="`${$t('placeholder.enter')} ${$t('pages.confabulate.name')}`" />
        </a-form-item>
        <a-form-item field="describe" :rules="formRoomRules.describe" :label="$t('pages.confabulate.describe')">
          <a-input v-model="formRoom.describe"
            :placeholder="`${$t('placeholder.enter')} ${$t('pages.confabulate.describe')}`" />
        </a-form-item>  
      </a-form>
      <template #footer>
        <a-button shape="round" @click="useCancelCreate">{{ $t('button.cancel') }}</a-button>
        <a-button shape="round" type="primary" @click="useConfirmCreate"> {{ $t('button.submit') }}</a-button>
      </template>
    </a-modal>
  </mc-container>
</template>

<script setup lang="ts">
import ServerApi from "@/api";
import { useSocketStore } from "@/store/modules/socket";
// import { useSocketStore } from "@/store/modules/resetSocket";
import { useUserStore } from "@/store/modules/user";
import { reactive, Ref, ref, nextTick, computed, onMounted } from "vue-demi";
import { Notification } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { IconUserGroup, IconMessage } from "@arco-design/web-vue/es/icon";

const SocketStore = useSocketStore();
const userStore = useUserStore();

const visibleCreate = ref(false);

const compMyRooms = computed(() => {
  return Object.keys(SocketStore.rooms) || [];
});

const notJoin = computed(() => {
  return rooms.value.filter(v => !compMyRooms.value.includes(v.id))
})

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


const rooms: Ref<any[]> = ref([]);
const useGetRoomsAll = async () => {
  try {
    let res = await ServerApi.RoomsAll();
    if (res.code === 200) {
      rooms.value = res.data;
    }
  } catch (error) { }
};
useGetRoomsAll();

const roomsByOwn: Ref<any[]> = ref([]);
// const useGetRoomsOwn = async () => {
//   try {
//     let res = await ServerApi.RoomsOwnRoom();
//     if (res.code === 200) {
//       // roomsByOwn.value = res.data;
//       SocketStore.initRooms(res.data);
//     }
//   } catch (error) { }
// };

const useJoinRooms = async ({ id }: any) => {
  try {
    let res = await ServerApi.RoomsJoin({ room_id: id });
    if (res.code === 200) {
      Notification.success("Join Success!");
      SocketStore.useGetRoomsOwn()
    }
  } catch (error) { }
};
const router = useRouter();
const useToRoomInformation = (id: any) => {
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
      SocketStore.useGetRoomsOwn()
    }
  } catch (error) { }
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
      SocketStore.useGetRoomsOwn()
    }
  } catch (error) { }
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

// 在线人数
const useOnlineSum = (info: any) => {
  let online = 0
  info.forEach((v: any) => online += v.isOnline ? 1 : 0)
  return online
}

</script>

<style lang="scss">
@media screen and (max-width: 600px) {
  .arco-modal {
    width: 100%;
  }
}

.confabulate-container {

  &-tab-mine,
  &-tab-all {
    &-room-name {
      font-weight: 700;
    }

    &-action {
      float: right;

      &-delete {
        margin-right: 10px;
      }
    }
  }

}
</style>