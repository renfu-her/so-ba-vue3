<template>
  <div class="container-fluid">
    <h1 class="h3 mb-2 text-gray-800">產品管理</h1>

    <div class="card-body">
      <button class="btn btn-primary" @click="showAddProductModal">
        <font-awesome-icon icon="circle-plus" /> 新增
      </button>
      <button class="btn btn-secondary" @click="deleteSelectedProducts">
        <font-awesome-icon icon="trash-can" /> 刪除
      </button>

      <br /><br />
      <div class="table-responsive">
        <table
          class="table table-hover table-bordered no-footer"
          width="100%"
          cellspacing="0"
          style="color: #000"
        >
          <thead>
            <tr style="color: #ffffff; background-color: #36b9cc">
              <th style="width: 10%">刪除</th>
              <th>類型</th>
              <th>商品型號</th>
              <th>圖片</th>
              <th>價格</th>
              <th>數量</th>
              <th style="width: 20%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.data" :key="product.id">
              <td>
                <input
                  type="checkbox"
                  v-model="selectedProducts"
                  :value="product.id"
                />
              </td>
              <td>{{ product.type == 1 ? "商品" : "配件" }}</td>
              <td>{{ product.name }}</td>
              <td>
                <img
                  :src="product.image"
                  alt="product image"
                  style="width: 150px"
                />
              </td>
              <td>{{ product.price }}</td>
              <td
                :style="{
                  color: product.order_number <= 0 ? 'red' : 'inherit',
                }"
              >
                {{ product.order_number }}
              </td>
              <td>
                <button class="btn btn-info" @click="viewProduct(product.id)">
                  <font-awesome-icon icon="eye" /> 瀏覽
                </button>
                <button
                  class="btn btn-warning"
                  @click="editProduct(product.id)"
                >
                  <font-awesome-icon icon="edit" /> 編輯
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 使用新的 PagePaginator 組件 -->
      <PagePaginator
        :current-page="products.current_page"
        :total-pages="products.last_page"
        @page-change="fetchProductsByPage"
      />

      <!-- 查看/編輯/新增產品的模態框 -->
      <ProductModal
        v-if="showProductModal"
        :productId="selectedProductId"
        :isEditMode="isEditMode"
        :viewMode="viewMode"
        @close="showProductModal = false"
        @product-updated="fetchProducts"
        @product-added="fetchProducts"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ProductModal from "../../modal/ProductModal.vue";
import PagePaginator from "../PagePaginator.vue";

export default {
  components: {
    FontAwesomeIcon,
    ProductModal,
    PagePaginator,
  },
  data() {
    return {
      products: {
        data: [],
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null,
      },
      selectedProducts: [],
      showProductModal: false,
      selectedProductId: null,
      isEditMode: false,
      viewMode: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts(url = "/products") {
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    fetchProductsByPage(page) {
      const url = `/products?page=${page}`;
      this.fetchProducts(url);
    },
    showAddProductModal() {
      this.selectedProductId = null;
      this.isEditMode = false;
      this.viewMode = false;
      this.showProductModal = true;
    },
    deleteSelectedProducts() {
      if (this.selectedProducts.length === 0) {
        alert("請選擇至少一個產品進行刪除");
        return;
      }

      const deletePromises = this.selectedProducts.map((productId) => {
        return axios.delete(`/products/${productId}`);
      });

      Promise.all(deletePromises)
        .then(() => {
          this.selectedProducts = [];
          this.fetchProducts();
          alert("產品刪除成功");
        })
        .catch((error) => {
          console.error("Error deleting products:", error);
        });
    },
    viewProduct(productId) {
      this.selectedProductId = productId;
      this.isEditMode = false;
      this.viewMode = true;
      this.showProductModal = true;
    },
    editProduct(productId) {
      this.selectedProductId = productId;
      this.isEditMode = true;
      this.viewMode = false;
      this.showProductModal = true;
    },
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
