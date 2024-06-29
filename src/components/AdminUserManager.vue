<template>
  <div class="container-fluid">
    <h1 class="h3 mb-2 text-gray-800">最高管理者</h1>

    <div class="card-body">
      <button class="btn btn-primary" @click="addUser">
        <font-awesome-icon icon="circle-plus" /> 新增
      </button>
      <button class="btn btn-secondary" @click="deleteSelectedUsers">
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
              <th nowrap="nowrap">帳號</th>
              <th nowrap="nowrap">姓名</th>
              <th nowrap="nowrap" style="width: 25%">功能</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td><input type="checkbox" v-model="selectedUsers" :value="user.id" /></td>
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>
                <button class="btn btn-info" @click="viewUser(user.id)">
                  <font-awesome-icon icon="eye" /> 瀏覽
                </button>
                <button class="btn btn-warning" @click="editUser(user.id)">
                  <font-awesome-icon icon="edit" /> 編輯
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分頁按鈕 -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
            <a class="page-link" href="#" @click.prevent="fetchUsers(pagination.prev_page_url)">&laquo; 上一頁</a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === pagination.current_page }">
            <a class="page-link" href="#" @click.prevent="fetchUsersByPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
            <a class="page-link" href="#" @click.prevent="fetchUsers(pagination.next_page_url)">下一頁 &raquo;</a>
          </li>
        </ul>
      </nav>
      <!-- 查看/編輯用戶的模態框 -->
      <UserModal
        v-if="showUserModal"
        :userId="selectedUserId"
        :isEditMode="isEditMode"
        :viewMode="viewMode"
        @close="showUserModal = false"
        @user-updated="fetchUsers()"
        @user-added="fetchUsers()"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import UserModal from './AdminUserModal.vue';

export default {
  components: {
    FontAwesomeIcon,
    UserModal
  },
  data() {
    return {
      users: [],
      selectedUsers: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null
      },
      showUserModal: false,
      selectedUserId: null,
      isEditMode: false,
      viewMode: false
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers(url = "/adminUsers") {
      axios.get(url)
        .then((response) => {
          const { data, current_page, last_page, prev_page_url, next_page_url } = response.data.data;
          this.users = data;
          this.pagination = { current_page, last_page, prev_page_url, next_page_url };
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    fetchUsersByPage(page) {
      const url = `/adminUsers?page=${page}`;
      this.fetchUsers(url);
    },
    addUser() {
      this.selectedUserId = null;
      this.isEditMode = false;
      this.viewMode = false;
      this.showUserModal = true;
    },
    deleteSelectedUsers() {
      if (this.selectedUsers.length === 0) {
        alert("請選擇至少一個用戶進行刪除");
        return;
      }

      const deletePromises = this.selectedUsers.map((userId) => {
        return axios.delete(`/adminUsers/${userId}`);
      });

      Promise.all(deletePromises)
        .then(() => {
          this.selectedUsers = [];
          this.fetchUsers();
          alert("用戶刪除成功");
        })
        .catch((error) => {
          console.error("Error deleting users:", error);
        });
    },
    viewUser(userId) {
      this.selectedUserId = userId;
      this.isEditMode = false;
      this.viewMode = true;
      this.showUserModal = true;
    },
    editUser(userId) {
      this.selectedUserId = userId;
      this.isEditMode = true;
      this.viewMode = false;
      this.showUserModal = true;
    }
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (v, k) => k + 1);
    }
  }
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
