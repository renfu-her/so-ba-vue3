<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditMode ? "編輯用戶" : viewMode ? "查看用戶" : "新增用戶" }}
          </h5>
          <button type="button" class="close" @click="$emit('close')">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="username">帳號</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="user.username"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="name">姓名</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="user.name"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="enabled">啟用</label>
              <select
                class="form-control"
                id="enabled"
                v-model="user.enabled"
                :disabled="viewMode"
                required
              >
                <option :value="true">是</option>
                <option :value="false">否</option>
              </select>
            </div>
            <div class="form-group">
              <label for="admin_enabled">管理員</label>
              <select
                class="form-control"
                id="admin_enabled"
                v-model="user.admin_enabled"
                :disabled="viewMode"
                required
              >
                <option :value="true">是</option>
                <option :value="false">否</option>
              </select>
            </div>
            <div class="form-group" v-if="!viewMode">
              <label for="password">密碼</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="user.password"
                :required="!isEditMode"
              />
              <small v-if="isEditMode" class="form-text text-muted"
                >保持空白以保持原密碼不變。</small
              >
            </div>
            <div class="button-container">
              <button type="submit" class="btn btn-primary" v-if="!viewMode">
                {{ isEditMode ? "保存" : "新增" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    userId: {
      type: Number,
      required: false,
      default: null,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    viewMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {
        username: "",
        name: "",
        enabled: true,
        admin_enabled: false,
        password: "",
      },
    };
  },
  created() {
    if (this.isEditMode || this.viewMode) {
      this.fetchUser();
    }
  },
  methods: {
    fetchUser() {
      if (this.userId) {
        axios
          .get(`/users/${this.userId}`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      }
    },
    submitForm() {
      if (this.isEditMode) {
        // 如果密碼字段為空，則不更新密碼
        const userData = { ...this.user };
        if (!userData.password) {
          delete userData.password;
        }
        axios
          .put(`/users/${this.userId}`, userData)
          .then(() => {
            this.$emit("user-updated");
            this.$emit("close");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } else {
        axios
          .post("/users", this.user)
          .then(() => {
            this.$emit("user-added");
            this.$emit("close");
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
