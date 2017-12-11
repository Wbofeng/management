<template>
  <div id="main" class="mian">
    <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#324057':'white'}">
      <div class="logo-con">
        <img v-show="!hideMenuText"  src="../../images/logo.jpg">
        <img v-show="hideMenuText" src="../../images/logo-min.jpg">
      </div>
      <el-menu class="el-menu-vertical-demo" theme='dark' mode="vertical" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title" >
            <i class="el-icon-warning"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item @click="linkto('root','root','权限测试页','1-1')" index="1-1">权限测试页</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">组件</span>
          </template>
          <el-menu-item index="2-1" @click="linkto('text','text','富文本编辑器','2-1')">富文本编辑器</el-menu-item>
          <el-menu-item index="2-2" @click="linkto('markdown','markdown','Markdown编辑器','2-2')">Markdown编辑器</el-menu-item>
          <el-menu-item index="2-3" @click="linkto('dragtext','dragtext','可拖拽列表','2-3')">可拖拽列表</el-menu-item>
          <el-menu-item index="2-4" @click="linkto('file-upload','file-upload','文件上传','2-4')">文件上传</el-menu-item>
          <el-menu-item index="2-5">数字渐变</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span slot="title">表单编辑</span>
          </template>
          <el-menu-item index="3-1" @click="linkto('article-publish','article-publish','文章发布','3-1')">文章发布</el-menu-item>
          <el-menu-item index="3-2">工作流</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">表格</span>
          </template>
          <el-menu-item index="4-1">可拖拽排序</el-menu-item>
          <el-menu-item index="4-2">可编辑表格</el-menu-item>
          <el-menu-item index="4-3">表格导出数据</el-menu-item>
          <el-menu-item index="4-4">表格转图片</el-menu-item>
        </el-submenu>
        <el-menu-item index="5">
          <i class="el-icon-circle-close"></i>
          <span slot="title">错误页面</span>
        </el-menu-item>
      </el-menu>
    </div>
    <Affix>
      <div class="top" :class="{ width: hideMenuText?'93.5%':'86.1%'}">
        <Breadcrumb separator="/">
          <BreadcrumbItem v-for="item in $store.state.currentPath" 
              :href="item.path" 
              :key="item.name"
              class="bread"
              >{{item.title}}
          </BreadcrumbItem>
        </Breadcrumb>
        <div class="header-avator-con">
          <div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
            <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
            </Tooltip>
          </div>
          <div class="lock-screen-btn-con">
            <Tooltip content="锁屏" placement="bottom">
              <Icon type="locked" :size="20"></Icon>
            </Tooltip>
          </div>
          <div class="message-con">
            <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'" placement="bottom">
              <Badge :count="messageCount" dot>
                <Icon type="ios-bell" :size="22"></Icon>
              </Badge>
            </Tooltip>
          </div>
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown trigger="click" >
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="loginout" @click="quit('signin')">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
        </div>
        </div>
        <div class="history" :class="{ width: hideMenuText?'93.5%':'86.1%'}">
          <div class="history-page">
            <div class="tag" @click="goTo('', '', 'main')">
              {{thefirst}}
            </div>
            <div
              v-for="item in $store.state.historyPath"
              :key="item.name"
              class="tag"
              @click="goTo(item.name,item.title,item.path,item.pageindex)"
            >
            {{item.title}}
            </div>
          </div>
        </div>
      </div>
    </Affix>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spanLeft: 4,
      spanRight: 20,
      currentPageName: '',
      hideMenuText: false,
      userName: 'Wbofeng',
      showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
      isFullScreen: false,
      messageCount: 0,
      lockScreenSize: 0,
      isCollapse: true,
      hidemenu: false,
      thefirst: '首页',
      pages: [],
      breadpages: [],
      showindex: '',
      pageindex: '',
    };
  },
  methods: {
    handleFullScreen() {
      const main = document.getElementById('main');
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } if (!this.isFullScreen) {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
    },
    linkto(path, name, title, pageindex) {
      this.$router.push(
        { name: path },
      );
      if (this.pages.indexOf(title) < 0) {
        this.$store.state.historyPath.unshift({ path, name, title, pageindex });
        this.pages.unshift(title);
      } else {
        this.$store.state.historyPath.splice(this.pages.indexOf(title), 1);
        this.$store.state.historyPath.unshift({ path, name, title, pageindex });
        this.pages.splice(this.pages.indexOf(title), 1);
        this.pages.unshift(title);
      }
      if (this.$store.state.historyPath.length > 9) {
        this.$store.state.historyPath.pop();
      }
      if (this.$store.state.currentPath.length < 2) {
        this.$store.state.currentPath.push({ path, name, title });
      } else {
        this.$store.state.currentPath.pop();
        this.$store.state.currentPath.push({ path, name, title });
      }
    },
    goTo(name, title, path, pageindex) {
      this.$router.push(
        { name: path },
      );
      this.$store.state.currentPath.splice(1);
      this.$store.state.currentPath.push({ path, name, title, pageindex });
      this.showindex = pageindex;
    },
    quit(path) {
      this.$router.push(
        { name: path },
      );
    },
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener('msfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
  },
  watch: {
    '$route'(to) {  // eslint-disable-line object-shorthand
      if (to.path === '/home/main' && this.$store.state.currentPath.length > 1) {
        this.$store.state.currentPath.splice(1);
      }
    },
  },
};
</script>
<style scoped>
.main{
  position: absolute;
  width: 100%;
  height: 100%;
}

.top{
  background-color: white;
  height: 100px;
  top: 0px;
}

.sidebar-menu-con{
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1010;
  background-color: #495060;
  width: 200px;
}

.logo-con{
  padding: 8px;
}

img{
  width: 100%;
}

.menu{
  position: absolute;
  left: 0px;
  top: 100px
}

.icon{
  position: absolute;
  top: 12px;
  left: 225px;
}

.breadcrumb{
  position: absolute;
  left: 280px;
  top: 18px;
  color: black;
  font-size: 15px;
}

.history{
  width: 100%;
  height: 40px;
  background-color: #e9eaec;
  position: absolute;
  top: 60px;
  border-bottom: 2px gainsboro solid;
}

.history-page{
  position: relative;
  left: 220px;
  top: 6px;
}

.tag{
  margin-left: 10px;
  width: 130px;
  float: left;
  height: 28px;
  text-align: center;
  line-height: 28px;
  bottom: 5px;
  background-color: white;
}

.header-avator-con{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 300px;
}

.full-screen-btn-con{
  display: inline-block;
  width: 30px;
  padding: 18px 0;
  text-align: center;
  cursor: pointer;
}

.lock-screen-btn-con{
  display: inline-block;
  width: 30px;
  padding: 18px 0;
  text-align: center;
  cursor: pointer;
}

.message-con{
  display: inline-block;
  width: 30px;
  padding: 18px 0;
  text-align: center;
  cursor: pointer;
}

i{
      vertical-align: middle;
  }

.user-dropdown-menu-con{
  position: absolute;
  right: 14px;
  top: 14px;
  width: 150px;
  height: 100%;
}

.page{
  position: absolute;
  width: 1240px;
  top: 100px;
  left: 200px;
  background-color: #e9eaec;
}

.bread{
  position: relative;
  left: 300px;
  top: 20px;
}
</style>
