<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditMode ? "編輯產品" : viewMode ? "查看產品" : "新增產品" }}
          </h5>
          <button type="button" class="close" @click="$emit('close')">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="type">類型</label>
              <select
                class="form-control"
                id="type"
                v-model="product.type"
                :disabled="viewMode"
                required
              >
                <option :value="1">商品</option>
                <option :value="2">配件</option>
              </select>
            </div>
            <div class="form-group">
              <label for="name">名稱</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="product.name"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="image">圖片</label>
              <input
                type="file"
                class="form-control"
                id="image"
                @change="handleFileChange"
                :disabled="viewMode"
              />
              <img
                v-if="product.image"
                :src="product.image"
                alt="圖片預覽"
                style="margin-top: 10px; width: 150px"
              />
            </div>
            <div class="form-group">
              <label for="order_number">數量</label>
              <input
                type="number"
                class="form-control"
                id="order_number"
                v-model="product.order_number"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="price">價格</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="product.price"
                :disabled="viewMode"
                required
              />
            </div>
            <div class="form-group">
              <label for="memo">備註</label>
              <textarea
                class="form-control"
                rows="5"
                id="memo"
                v-model="product.memo"
                :disabled="viewMode"
              ></textarea>
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
    productId: {
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
      product: {
        name: "",
        image: "",
        type: "",
        price: "",
        memo: "",
        user_id: 1, // 這裡設置默認的 user_id
      },
      imageFile: null,
      imagePreview: null,
    };
  },
  created() {
    if (this.isEditMode || this.viewMode) {
      this.fetchProduct();
    }
  },
  methods: {
    fetchProduct() {
      if (this.productId) {
        axios
          .get(`/products/${this.productId}`)
          .then((response) => {
            this.product = response.data;
            this.imagePreview = `/images/products/${this.product.image}`;
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
          });
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imageFile = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    submitForm() {
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("price", this.product.price);
      formData.append("memo", this.product.memo);
      formData.append("type", this.product.type);
      formData.append("order_number", this.product.order_number);
      formData.append("user_id", 1); // 確保 user_id 被傳遞

      if (this.imageFile) {
        formData.append("image", this.imageFile);
      }

      if (this.isEditMode) {
        axios
          .post(`/products/${this.productId}`, formData)
          .then(() => {
            this.$emit("product-updated");
            this.$emit("close");
          })
          .catch((error) => {
            console.error("Error updating product:", error);
          });
      } else {
        axios
          .post("/products", formData)
          .then(() => {
            this.$emit("product-added");
            this.$emit("close");
          })
          .catch((error) => {
            console.error("Error adding product:", error);
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
