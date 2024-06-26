export const state = () => ({
  productConfig: {
    listData: {},
    productList: [],
    productLoader: false,
  },
  paginationConfig: {
    pageSize: 12,
    pageNumber: 1,
    totalCount:1,
    min: 1,
    max: 8,
    imgOrder: 12
  }
});
export const mutations = {
  setProductList(state, payload) {
    state.productConfig.listData  =  JSON.parse(JSON.stringify(state.productConfig.productList)) ;

    let productFilter = payload.filter(
      (s) => s.IsActive == true && s.Quantity > 0
    );
    state.paginationConfig.totalCount = productFilter.length;
    state.productConfig.productList = productFilter;

    productFilter = productFilter.slice(
      state.paginationConfig.pageSize * state.paginationConfig.pageNumber - 12,
      state.paginationConfig.pageSize * state.paginationConfig.pageNumber
    );
  
    state.productConfig.listData = productFilter;
  },
  setProductLoader(state, payload) {
    state.productConfig.productLoader = payload;
  },
  setPagination(state, payload) {
    state.paginationConfig.pageNumber = payload;
  },
  applyFilter(state, payload) {
    state.productConfig.listData  =  JSON.parse(JSON.stringify(state.productConfig.productList)) ;
    state.paginationConfig.totalCount =  state.productConfig.productList.length;
    if(payload != '') {
      let filter = state.productConfig.listData.filter((f)=> f.ProductName != '' && f.ProductName.toLowerCase().includes(payload.toLowerCase()) );
      state.paginationConfig.totalCount = filter.length;
      state.productConfig.listData = filter;
    }
  },
  
};
export const getters = {
  getProductList(state) {
    return state.productConfig.listData;
  },
  getProductLoader(state) {
    return state.productConfig.productLoader;
  },
  getPagination(state) {
    return state.paginationConfig;
  },
  
};
export const actions = {
  async initializeProductList({ commit }) {
    commit("setProductLoader", true);
    let serverUrl = "/Product/GetAllProduct";
    await this.$ws
      .get(serverUrl)
      .then((response) => {
        if (response.status == 200) {
          commit("setProductList", response.data);
          commit("setProductLoader", false);
        }
      })
      .catch((error) => {});
  },
  initializeOrderProduct({ commit,state, dispatch }, payload) {
    let serverUrl = "/Order/AddOrder";
    let configData = {
      productId: payload.ProductId,
      quantity: payload.selectedQuantity,
      customerId: "f9e86959-d568-44b9-2087-08dc44a8c8ef",
    };
    this.$ws
      .post(serverUrl, configData)
      .then((response) => {
        if (response.status == 200) {
            if (payload.selectedQuantity == payload.Quantity) {
                state.productConfig.imgOrder = Math.floor(Math.random() * (state.productConfig.max - state.productConfig.min + 1)) + state.productConfig.min;
            }
          dispatch("initializeProductList");
        }
      })
      .catch((error) => {});
  },
  setPagination({ commit, state }, payload) {
    commit("setPagination", payload);
  },
  applyFilter({ commit }, payload) {
    commit("applyFilter", payload);
  },
  
};
