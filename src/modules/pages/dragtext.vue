<template>
<div>
  <Row class="margin-top-10 margin-left-10 margin-right-10">
    <Col span="16">
      <Card>
        <Row>
          <Col span="12">
            <Card dis-hover>
              <p slot="title">
                <Icon type="ios-list-outline"></Icon>
                  本周欲完成任务清单(拖拽到右侧删除)
              </p>
              <div style="height: 360px;">
                <ul id="doList" class="iview-admin-draggable-list"></ul>
              </div>
            </Card>
          </Col>
          <Col span="12" class="padding-left-10">
            <Card dis-hover>
              <p slot="title">
                <Icon type="ios-list"></Icon>
                  所剩任务清单(拖拽到左侧添加)
              </p>
              <div style="height: 360px;">
                <ul id="todoList" class="iview-admin-draggable-list">
                  <li v-for="(item, index) in todoArray" :key="index" class="notwrap todolist-item" :data-index="index">
                      {{ item.content }}
                  </li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Col>
      <Col span="8" class="padding-left-10">
        <Card>
          <p slot="title">
            <Icon type="ios-paper-outline"></Icon>
              本周已选任务清单
          </p>
          <div style="height: 394px;">
            <ul class="iview-admin-draggable-list">
              <li v-for="(item, index) in doArray" :key="index" class="notwrap" :data-index="index">
                  {{ item.content }}
              </li>
            </ul>
          </div>
        </Card>
      </Col>
    </Row>
    <Row class="margin-top-10 margin-left-10 margin-right-10 margin-bottom-10">
      <Col span="16">
        <Card>
          <p slot="title">
            <Icon type="navicon-round"></Icon>
              可滚动拖拽
          </p>
          <Row>
            <Col span="12">
              <Card dis-hover>
                <div style="height: 360px;">
                  <ul id="affordList" class="iview-admin-draggable-list"></ul>
                </div>
              </Card>
            </Col>
            <Col span="12" class="padding-left-10">
              <Card dis-hover>
                <div style="height: 360px;">
                  <ul id="shoppingList" class="iview-admin-draggable-list">
                    <li v-for="(item, index) in shoppingList" :key="index" class="notwrap todolist-item" :data-index="index">
                        好吃的美食--{{ item.name }}
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="8" class="padding-left-10">
        <Card>
          <p slot="title">
            <Icon type="android-funnel"></Icon>
              买得起的清单
          </p>
          <div style="height: 394px;">
            <ul class="iview-admin-draggable-list">
              <li v-for="(item, index) in affordList" :key="index" class="notwrap" :data-index="index">
                  {{ item.name }}
              </li>
            </ul>
          </div>
        </Card>
      </Col>
    </Row>
</div>
</template>
<style scoped>
.iview-admin-draggable-list{
    height: 100%;
}
.iview-admin-draggable-list li{
    padding: 9px;
    border: 1px solid #e7ebee;
    border-radius: 3px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    transition: all .2s;
}
.iview-admin-draggable-list li:hover{
    color: #87b4ee;
    border-color: #87b4ee;
    transition: all .2s;
}
.iview-admin-draggable-delete{
    height: 100%;
    position: absolute;
    right: -8px;
    top: 0px;
    display: none;
}
.iview-admin-draggable-list li:hover .iview-admin-draggable-delete{
    display: block;
}
.placeholder-style{
    display: block !important;
    color: transparent;
    border-style: dashed !important;
}
.delte-item-animation{
    opacity: 0;
    transition: all .2s;
}
.iview-admin-draggable-list{
    overflow: auto
}
.margin-top-8{
    margin-top: 8px;
}
.margin-top-10{
    margin-top: 10px;
}
.margin-top-20{
    margin-top: 20px;
}
.margin-left-10{
    margin-left: 10px;
}
.margin-bottom-10{
    margin-bottom: 10px;
}
.margin-bottom-100{
    margin-bottom: 100px;
}
.margin-right-10{
    margin-right: 10px;
}
.padding-left-6{
    padding-left: 6px;
}
.padding-left-8{
    padding-left: 5px;
}
.padding-left-10{
    padding-left: 10px;
}
.padding-left-20{
    padding-left: 20px;
}
.height-100{
    height: 100%;
}
.height-120px{
    height: 100px;
}
.height-200px{
    height: 200px;
}
.height-492px{
    height: 492px;
}
.height-460px{
    height: 460px;
}
.line-gray{
    height: 0;
    border-bottom: 2px solid #dcdcdc;
}
.notwrap{
    word-break:keep-all; 
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.padding-left-5{
    padding-left: 10px;
}
[v-cloak]{
    display: none;
}
</style>


<script>
import Sortable from 'sortablejs';

export default {
  data() {
    return {
      todoArray: [
        {
          content: '完成iview-admin基本开发',
        },
        {
          content: '对iview-admin进行性能优化',
        },
        {
          content: '对iview-admin的细节进行优化',
        },
        {
          content: '完成iview-admin开发',
        },
        {
          content: '解决发现的bug',
        },
        {
          content: '添加更多组件',
        },
        {
          content: '封装更多图表',
        },
        {
          content: '增加更多人性化功能',
        },
      ],
      doArray: [],
      shoppingList: [
        { name: '香肠' },
        { name: '烤鸭' },
        { name: '烧鸡' },
        { name: '卤煮' },
        { name: '酱汁腊肉' },
        { name: '松花小肚' },
        { name: '白丸子' },
        { name: '红丸子' },
        { name: '汆丸子' },
        { name: '蒸熊掌' },
        { name: '蒸羊羔' },
        { name: '蒸鹿尾' },
        { name: '梅菜扣肉' },
        { name: '四喜丸子' },
        { name: '酒酿萝卜皮' },
        { name: '红烧胖大海' },
        { name: '连年有鱼' },
      ],
      affordList: [],
    };
  },
  mounted() {
    document.body.ondrop = function (event) { // eslint-disable-line func-names
      event.preventDefault();
      event.stopPropagation();
    };
    const vm = this;
    const todoList = document.getElementById('todoList');
    Sortable.create(todoList, {
      group: {
        name: 'list',
        pull: true,
      },
      animation: 120,
      ghostClass: 'placeholder-style',
      fallbackClass: 'iview-admin-cloned-item',
      onRemove(event) {
        vm.doArray.splice(event.newIndex, 0, vm.todoArray[event.item.getAttribute('data-index')]);
      },
    });
    const doList = document.getElementById('doList');
    Sortable.create(doList, {
      group: {
        name: 'list',
        pull: true,
      },
      sort: false,
      filter: '.iview-admin-draggable-delete',
      animation: 120,
      fallbackClass: 'iview-admin-cloned-item',
      onRemove(event) {
        vm.doArray.splice(event.oldIndex, 1);
      },
    });
    const shoppingList = document.getElementById('shoppingList');
    Sortable.create(shoppingList, {
      group: {
        name: 'list',
        pull: true,
      },
      animation: 120,
      ghostClass: 'placeholder-style',
      fallbackClass: 'iview-admin-cloned-item',
      onRemove(event) {
        vm.affordList.splice(event.newIndex, 0, vm.shoppingList[event.item.getAttribute('data-index')]);
      },
    });
    const affordList = document.getElementById('affordList');
    Sortable.create(affordList, {
      group: {
        name: 'list',
        pull: true,
      },
      sort: false,
      filter: '.iview-admin-draggable-delete',
      animation: 120,
      fallbackClass: 'iview-admin-cloned-item',
      onRemove(event) {
        vm.affordList.splice(event.oldIndex, 1);
      },
    });
  },
};
</script>
