export const state = () => ({
    dynamicLayout: "shoppingLayout",
    menuData: [
        {
            menuName:"product_shopping",
            menuLink:"productShopping"
        },
        {
            menuName:"product_seller",
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