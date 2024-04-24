export const state = () => ({
    dynamicLayout: "shoppingLayout",
    menuData: [
        {
            menuName:"product_shopping",
            menuLink:"productShopping"
        },
        {
            menuName:"product_order",
            menuLink:"ProductSeller"
        }
    ]
})
export const mutations = {
}
export const getters = {
    getMenuData: (state) => {
        return state.menuData
    }

}