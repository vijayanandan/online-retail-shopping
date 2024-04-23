<!-- <template>
    <div class=" d-flex align-items-center justify-content-center" style="width: 100%;">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <nuxt-link class="mr-2 action-icon-btn" to="productShopping" v-b-tooltip.hover="{ customClass: 'custom-tooltip' }" title="Product List">
              <div>
                Product Shopping
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <nuxt-link class="mr-2 action-icon-btn" to="addProduct" v-b-tooltip.hover="{ customClass: 'custom-tooltip' }" title="Add Product">
              Add Product
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </template>
   -->


<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <b-card-group deck>
            <nuxt-link class="mr-2 action-icon-btn" to="productShopping"
                v-b-tooltip.hover="{ customClass: 'custom-tooltip' }" title="Product List">
                <b-card title=" Product Shopping">
                </b-card>
            </nuxt-link>
            <nuxt-link class="mr-2 action-icon-btn" to="addProduct"
                v-b-tooltip.hover="{ customClass: 'custom-tooltip' }" title="Product List">
                <b-card title=" Add Product">
                </b-card>
            </nuxt-link>
        </b-card-group>
    </div>
</template>