<template>
  <div class="paginator-content">
    <nav aria-label="navigation example">
      <ul class="pagination">

        <li class="page-item" v-if="this.current_page > 1">
          <a class="page-link" @click="previousPage(this.current_page - 1)" href="#">Previous</a>
        </li>

        <li class="page-item" :class="{ active: page === this.current_page }" v-for="page in displayedPages" :key="page">
          <a class="page-link" @click="clickPageNum(page)" href="#">{{ page }}</a>
        </li>

        <li class="page-item" v-if="this.current_page < this.pages">
          <a class="page-link" @click="nextPage(this.current_page + 1)" href="#">Next</a>
        </li>

      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: "Paginator",

  props: {
    current_page: Number,
    pages: Number,
  },

  methods: {
    nextPage(page: number) {
      this.$emit("nextPage", page);
    },
    clickPageNum(page: number) {
      this.$emit("clickPage", page);
    },
    previousPage(page: number) {
      this.$emit("previous", page);
    },
  },

  computed: {
    // Calcula las páginas que se mostrarán en la barra de paginación en función del tamaño de la pantalla
    displayedPages() {
      const totalDisplayPages = 5; // Número total de páginas que se mostrarán en la barra de paginación
      const pages = [];
      const halfDisplayPages = Math.floor(totalDisplayPages / 2);
      let startPage = Math.max(1, this.current_page - halfDisplayPages);
      let endPage = Math.min(this.pages, startPage + totalDisplayPages - 1);

      if (endPage - startPage + 1 < totalDisplayPages) {
        startPage = Math.max(1, endPage - totalDisplayPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.page-item {
  margin: 0 5px;
}

</style>