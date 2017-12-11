<template>  
  <div>
    <Row class="margin-top-8 margin-left-10 margin-right-10">
      <Col span="8">
        <Row>
          <Card>
            <Row type="flex" class="user-infor">
              <Col span="8">
                <Row class-name="made-child-con-middle" type="flex" align="middle">
                  <img class="avator-img"/>
                </Row>
              </Col>
              <Col span="16" style="padding-left:6px;">
                <Row class-name="made-child-con-middle" type="flex" align="middle">
                  <div>
                    <b class="card-user-infor-name">WBoFeng</b>
                    <p>super admin</p>
                  </div>
                </Row>
              </Col>
            </Row>
            <div class="line-gray"></div>
            <Row class="margin-top-8">
              <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
              <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
            </Row>
            <Row class="margin-top-8">
              <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
              <Col span="16" class="padding-left-8">北京</Col>
            </Row>
          </Card>
        </Row>
        <Row class="margin-top-10">
          <Card>
            <p slot="title" class="card-title">
              <Icon type="android-checkbox-outline"></Icon>
              待办事项
            </p>
            <a type="text" slot="extra" @click="addNewToDoItem">
              <Icon type="plus-round"></Icon>
            </a>
            <div class="to-do-list-con">
              <div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
                <to-do-list-item :content="item.title"></to-do-list-item>
              </div>
            </div>
          </Card>
        </Row>
      </Col>
      <Col span="16" class-name="padding-left-5">
       <Row>
          <Col span="6">
            <infor-card
                  id-name="user_created_count"
                  :end-val="count.createUser"
                  iconType="android-person-add"
                  color="#2d8cf0"
                  intro-text="今日新增用户"
            ></infor-card>
          </Col>
          <Col span="6" class-name="padding-left-5">
            <infor-card
                  id-name="visit_count"
                  :end-val="count.visit"
                  iconType="ios-eye"
                  color="#64d572"
                  :iconSize="50"
                  intro-text="今日浏览量"
            ></infor-card>
          </Col>
          <Col span="6" class-name="padding-left-5">
            <infor-card
                  id-name="collection_count"
                  :end-val="count.collection"
                  iconType="upload"
                  color="#ffd572"
                  intro-text="今日数据采集量"
            ></infor-card>
          </Col>
          <Col span="6" class-name="padding-left-5">
            <infor-card
                  id-name="transfer_count"
                  :end-val="count.transfer"
                  iconType="shuffle"
                  color="#f25e43"
                  intro-text="今日服务调用量"
            ></infor-card>
          </Col>
        </Row>
        <Row class="margin-top-10">
          <Card :padding="0">
            <p slot="title" class="card-title">
              <Icon type="map"></Icon>
              今日服务调用地理分布
            </p>
            <div class="map-con">
              <Col span="10">
              </Col>
              <Col span="14" class="map-incon">
                <Row type="flex" justify="center" align="middle">
                </Row>
              </Col>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
    <Row class="margin-top-10 margin-left-10 margin-right-10">
      <Col span="8">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-map"></Icon>
              上周每日来访量统计
          </p>
          <div class="data-source-row">
            <visite-volume></visite-volume>
          </div>
        </Card>
      </Col>
      <Col span="8" class="padding-left-10">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
                数据来源统计
          </p>
          <div class="data-source-row">
            <data-source-pie></data-source-pie>
          </div>
        </Card>
      </Col>
      <Col span="8" class="padding-left-10">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-wifi"></Icon>
              各类用户服务调用变化统计
          </p>
          <div class="data-source-row">
            <user-flow></user-flow>
          </div>
        </Card>
      </Col>
    </Row>
    <Row class="margin-top-10 margin-left-10 margin-right-10 margin-bottom-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-shuffle-strong"></Icon>
          上周每日服务调用量(万)
        </p>
        <div class="line-chart-con">
          <service-requests></service-requests>
        </div>
      </Card>
    </Row>
  </div>
</div>
</template>
<style scoped>
.user-infor{
    height: 120px;
}
.avator-img{
    display: block;
    width: 80%;
    max-width: 100px;
    height: auto;
}
.card-user-infor-name{
    font-size: 2em;
    color: #2d8cf0;
}
.card-title{
    color: #abafbd;
}
.made-child-con-middle{
    height: 100%;
}
.to-do-list-con{
    height: 160px;
    overflow: auto;
}
.to-do-item{
    padding: 2px;
}
.infor-card-con{
    height: 100px;
}
.infor-card-icon-con{
    height: 100%;
    color: white;
    border-radius: 3px 0 0 3px;
}
.map-con{
    height: 305px;
}
.map-incon{
    height: 100%;
}
.data-source-row{
    height: 200px;
}
.line-chart-con{
    height: 150px;
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
import toDoListItem from '../components/toDoListItem';
import inforCard from '../components/inforCard';
import visiteVolume from '../components/visiteVolume';
import dataSourcePie from '../components/dataSourcePie';
import userFlow from '../components/userFlow';
import serviceRequests from '../components/serviceRequests';


export default {
  components: {
    toDoListItem,
    inforCard,
    visiteVolume,
    dataSourcePie,
    userFlow,
    serviceRequests,
  },
  data() {
    return {
      toDoList: [
        {
          title: '去iView官网学习完整的iView组件',
        },
        {
          title: '去iView官网学习完整的iView组件',
        },
        {
          title: '去iView官网学习完整的iView组件',
        },
        {
          title: '去iView官网学习完整的iView组件',
        },
        {
          title: '去iView官网学习完整的iView组件',
        },
      ],
      showAddNewTodo: false,
      newToDoItemValue: '',
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498,
      },
    };
  },
  methods: {
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue,
        });
        setTimeout(function a() {
          this.newToDoItemValue = '';
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error('请输入待办事项内容');
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = '';
    },
  },
};
</script>

