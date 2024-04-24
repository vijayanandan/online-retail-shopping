<template>
<div class="sidebar-menu navbar-menu">
    <div class="navbar-brand-box my-2">
        <a href="#" class="logo">
            <span class="logo-sm">
                <img src="~static/img/shopping.jpeg" class="w-100" height="50" alt="logo">
            </span>
        </a>
    </div>
    <div id="scrollbar" class="h-100 scrollbar">
        <div class="simplebar-content-wrapper sidebar_icon_wrapper">
            <div class="simplebar-content">
                <ul class="navbar-nav scrollbar" id="navbar-nav">
                <template v-for="(menuInfo, mKey) in menuList">
                    <li class="nav-item" :key="mKey">
                        <nuxt-link  :to="`/${menuInfo.menuLink}`" class="nav-link menu-link collapsed">
                            <i  aria-hidden="true"></i> <span class="new_menu_text">
                                {{  $t('common')[menuInfo.menuName]}}
                                </span>
                        </nuxt-link>
                    </li>
                </template>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    computed: {
        menuList: function () {
            return this.$store.getters.getMenuData;
        },
    }
}
</script>
