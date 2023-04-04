<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col-12 col-md-6 my-border rounded-5">
        <div class="form-inline d-flex">
          <input
            class="form-control mr-sm-2 border-0 rounded-5"
            v-model="filterName"
            @input="$emit('filterName', filterName)"
            type="search"
            placeholder="Cerca nome del ristorante"
            aria-label="Search"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterName: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@use "../styles/main.scss";

.my-border {
  border: 1px solid #c76262;
  padding: 0.2rem;
  transition: padding, 0.5s;

  &:hover {
    padding: 0.4rem;
  }
}

.form-control:focus {
  box-shadow: none !important;
}
</style>
