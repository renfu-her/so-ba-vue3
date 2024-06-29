<template>
    <div class="modal" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? '編輯用戶' : '查看用戶' }}</h5>
            <button type="button" class="close" @click="$emit('close')">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="username">帳號</label>
                <input type="text" class="form-control" id="username" v-model="user.username" required>
              </div>
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" class="form-control" id="name" v-model="user.name" required>
              </div>
              <div class="form-group" v-if="isEditMode">
                <label for="password">密碼</label>
                <input type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" class="btn btn-primary" v-if="isEditMode">保存</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      userId: {
        type: Number,
        required: true
      },
      isEditMode: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        user: {
          username: '',
          name: '',
          password: ''
        }
      };
    },
    created() {
      this.fetchUser();
    },
    methods: {
      fetchUser() {
        axios.get(`/users/${this.userId}`)
          .then(response => {
            this.user = response.data;
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
      },
      submitForm() {
        axios.put(`/users/${this.userId}`, this.user)
          .then(() => {
            this.$emit('user-updated');
            this.$emit('close');
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
  </style>
  