<template>
  <div class="container-fluid">
    <h1 class="h3 mb-2 text-gray-800">成員管理</h1>

    <div class="card-body">
      <button class="btn btn-primary" @click="addMember">
        <font-awesome-icon icon="circle-plus" /> 新增
      </button>
      <button class="btn btn-secondary" @click="deleteSelectedMembers">
        <font-awesome-icon icon="trash-can" /> 刪除
      </button>
      <button class="btn btn-info">
        <font-awesome-icon icon="file-export" /> 匯出 Excel
      </button>

      <br /><br />
      <div class="table-responsive">
        <table
          id="tables"
          class="table table-hover table-bordered no-footer"
          width="100%"
          cellspacing="0"
          style="color: #000"
        >
          <thead>
            <tr style="color: #ffffff; background-color: #36b9cc">
              <th nowrap="nowrap" style="width: 5%">刪除</th>
              <th nowrap="nowrap">姓名</th>
              <th nowrap="nowrap">性別</th>
              <th nowrap="nowrap">手機</th>
              <th nowrap="nowrap" style="width: 25%">功能</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members.data" :key="member.id">
              <td><input type="checkbox" v-model="selectedMembers" :value="member.id" /></td>
              <td>{{ member.name }}</td>
              <td>{{ member.sex == true ? '男' : '女' }}</td>
              <td>{{ member.mobile }}</td>
              <td>
                <button class="btn btn-info" @click="viewMember(member.id)">
                  <font-awesome-icon icon="eye" /> 瀏覽
                </button>
                <button class="btn btn-warning" @click="editMember(member.id)">
                  <font-awesome-icon icon="edit" /> 編輯
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分頁按鈕 -->
      <PagePaginator
        :current-page="members.current_page"
        :total-pages="members.last_page"
        @page-change="fetchMembersByPage"
      />
      <!-- 查看/編輯成員的模態框 -->
      <MemberModal
        v-if="showMemberModal"
        :memberId="selectedMemberId"
        :isEditMode="isEditMode"
        :viewMode="viewMode"
        @close="showMemberModal = false"
        @member-updated="fetchMembers()"
        @member-added="fetchMembers()"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MemberModal from '../../modal/MemberModal.vue';
import PagePaginator from "../PagePaginator.vue";

export default {
  components: {
    FontAwesomeIcon,
    MemberModal,
    PagePaginator,
  },
  data() {
    return {
      members: {
        data: [],
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null
      },
      selectedMembers: [],
      showMemberModal: false,
      selectedMemberId: null,
      isEditMode: false,
      viewMode: false
    };
  },
  created() {
    this.fetchMembers();
  },
  methods: {
    fetchMembers(url = "/members") {
      axios.get(url)
        .then(response => {
          this.members = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching members:', error);
        });
    },
    fetchMembersByPage(page) {
      const url = `/members?page=${page}`;
      this.fetchMembers(url);
    },
    addMember() {
      this.selectedMemberId = null;
      this.isEditMode = false;
      this.viewMode = false;
      this.showMemberModal = true;
    },
    deleteSelectedMembers() {
      if (this.selectedMembers.length === 0) {
        alert("請選擇至少一個成員進行刪除");
        return;
      }

      const deletePromises = this.selectedMembers.map((memberId) => {
        return axios.delete(`/members/${memberId}`);
      });

      Promise.all(deletePromises)
        .then(() => {
          this.selectedMembers = [];
          this.fetchMembers();
          alert("成員刪除成功");
        })
        .catch((error) => {
          console.error("Error deleting members:", error);
        });
    },
    viewMember(memberId) {
      this.selectedMemberId = memberId;
      this.isEditMode = false;
      this.viewMode = true;
      this.showMemberModal = true;
    },
    editMember(memberId) {
      this.selectedMemberId = memberId;
      this.isEditMode = true;
      this.viewMode = false;
      this.showMemberModal = true;
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

.pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
