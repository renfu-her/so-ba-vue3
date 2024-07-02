<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditMode ? "編輯成員" : viewMode ? "查看成員" : "新增成員" }}
          </h5>
          <button type="button" class="close" @click="$emit('close')">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">姓名</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="member.name"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="sex">性別</label>
              <select
                class="form-control"
                id="sex"
                v-model="member.sex"
                :disabled="viewMode"
                required
              >
                <option :value="true">男</option>
                <option :value="false">女</option>
              </select>
            </div>
            <div class="form-group">
              <label for="mobile">手機</label>
              <input
                type="text"
                class="form-control"
                id="mobile"
                v-model="member.mobile"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="phone">電話</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                v-model="member.phone"
                :disabled="viewMode"
                required
              />
            </div>
            <!-- 添加其他欄位 -->
            <button type="submit" class="btn btn-primary" v-if="!viewMode">
              {{ isEditMode ? "保存" : "新增" }}
            </button>
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
    memberId: {
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
      member: {
        name: "",
        sex: true,
        mobile: "",
        phone: '',
        county: '',
        district: '',
        zipcode: ''
      },
    };
  },
  created() {
    if (this.isEditMode || this.viewMode) {
      this.fetchMember();
    }
  },
  methods: {
    fetchMember() {
      if (this.memberId) {
        axios
          .get(`/members/${this.memberId}`)
          .then((response) => {
            this.member = response.data;
          })
          .catch((error) => {
            console.error("Error fetching member:", error);
          });
      }
    },
    submitForm() {
      if (this.isEditMode) {
        axios
          .put(`/members/${this.memberId}`, this.member)
          .then(() => {
            this.$emit("member-updated");
            this.$emit("close");
          })
          .catch((error) => {
            console.error("Error updating member:", error);
          });
      } else {
        axios
          .post("/members", this.member)
          .then(() => {
            this.$emit("member-added");
            this.$emit("close");
          })
          .catch((error) => {
            console.error("Error adding member:", error);
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
</style>
