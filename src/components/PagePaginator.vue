<!-- PagePaginator.vue -->
<template>
  <nav v-if="totalPages > 1" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="onPageChange(currentPage - 1)">&laquo; 上一頁</a>
      </li>
      <li
        v-for="page in visiblePages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage, disabled: page === '...' }"
      >
        <a class="page-link" href="#" @click.prevent="onPageChange(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="onPageChange(currentPage + 1)">下一頁 &raquo;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PagePaginator',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change'],
  methods: {
    onPageChange(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page);
      }
    }
  },
  computed: {
    visiblePages() {
      if (this.totalPages <= 1) {
        return [];
      }

      const pages = [1];
      const range = 2;

      if (this.totalPages <= 7) {
        for (let i = 2; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (this.currentPage > 3 + range) {
          pages.push('...');
        }
        
        const startPage = Math.max(2, this.currentPage - range);
        const endPage = Math.min(this.totalPages - 1, this.currentPage + range);
        
        for (let i = startPage; i <= endPage; i++) {
          if (i !== 1) {
            pages.push(i);
          }
        }
        
        if (this.currentPage < this.totalPages - (2 + range)) {
          pages.push('...');
        }
        
        if (this.totalPages !== 1) {
          pages.push(this.totalPages);
        }
      }

      return pages;
    }
  }
};
</script>

<style scoped>
.pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>