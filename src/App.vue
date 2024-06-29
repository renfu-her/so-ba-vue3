<template>
  <div id="wrapper">
    <ul
      class="navbar-nav sidebar sidebar-dark accordion"
      id="accordionSidebar"
      style="background-color: #0084b3"
    >
      <a class="sidebar-brand d-flex align-items-center justify-content-center">
        <div class="sidebar-brand-text mx-3" style="font-size: 26px">
          <img :src="logo" style="height: 35px" />
          <h6>產品管理 DEMO</h6>
        </div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <div class="sidebar-heading margin-menu">
        <a href="/backend/members" class="left-menu"> 客戶管理 </a>
      </div>

      <div class="sidebar-heading margin-menu">
        <a class="left-menu" href="/backend/orders"> 訂單管理 </a>
      </div>

      <div class="sidebar-heading margin-menu">
        <a class="left-menu" href="/backend/product">
          庫存管理
          <span
            id="warning_product"
            class="badge rounded-pill badge-notification bg-danger"
            style="display: none; margin-top: -15px"
            >1</span
          >
        </a>
      </div>

      <hr class="sidebar-divider" />

      <div class="sidebar-heading">權限管理</div>

      <li class="nav-item">
        <a class="nav-link" href="/adminUsers">
          <span>一般管理者</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/users">
          <span>最高管理者</span>
        </a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block" />

      <!-- Sidebar Toggler (Sidebar) -->
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->

    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div>
        <nav
          class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
        >
          <!-- Sidebar Toggle (Topbar) -->
          <form class="form-inline">
            <button
              type="button"
              class=""
              id="sidebarToggleTop"
              style="background-color: #0084b3; border: 0"
            >
              <font-awesome-icon icon="bars" style="color: #fff" />
            </button>
          </form>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="managers"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="mr-2 d-none d-lg-inline text-gray-600 small"
                  >管理者</span
                >
                <span class="img-profile rounded-circle"
                  ><i class="fas fa-user-circle fa-2x"></i
                ></span>
              </a>
              <!-- Dropdown - User Information -->
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a class="dropdown-item" href="/backend/logout">
                  <i
                    class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                  ></i>
                  登 出
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <router-view></router-view>
        <!-- Topbar -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      logo: require('./assets/logo.png') // 引用圖片文件
    }
  }
};
</script>

<style>
.sidebar-dark .sidebar-heading {
  color: rgba(255, 255, 255, 0.8);
  /*color: #fff;*/
  font-size: 16px;
}
</style>
