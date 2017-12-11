<template>
  <div class="preview-main">
    <div class="preview-header">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="preview-header-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
              导航一
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
              导航二
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
              导航三
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
              导航四
          </MenuItem>
        </div>
      </Menu>
    </div>
    <Row class="margin-top-20">
      <Col span="12" offset="5">
        <div>
          <Card>
            <h1>{{ articleTitle }}</h1>
            <p class="preview-publish-time"><Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ publishTime }}</p>
            <div class="preview-tags-con">
              <b class="preview-tip"><Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b><Tag v-for="item in tagsList" type="border" color="blue" :key="item">{{ item }}</Tag>
            </div>
            <div class="preview-content-con" v-html="content"></div>
            <div class="preview-classifition-con">
              <b class="preview-tip"><Icon type="navicon-round"></Icon>&nbsp;目录：</b>
              <a class="preview-classifition-item" v-for="item in classificationSelected" :key="item">
                <Icon type="android-folder-open"></Icon>
                  {{ item }}
              </a>
            </div>
          </Card>
        </div>
      </Col>
      <Col span="4" class="padding-left-10">
        <div>
          <Card>
            <p slot="title">
              <Icon type="paper-airplane"></Icon>
                热门文章
            </p>
            <div class="preview-placeholderCon">
              <div class="preview-placeholder"></div>
              <div class="preview-placeholder"></div>
              <div class="preview-placeholder"></div>
              <div class="preview-placeholder"></div>
            </div>
          </Card>
        </div>
        <div class="margin-top-10">
          <Card>
            <p slot="title">
              <Icon type="paper-airplane"></Icon>
              最新文章
            </p>
            <div class="preview-placeholderCon">
              <div class="preview-placeholder"></div>
              <div class="preview-placeholder"></div>
              <div class="preview-placeholder"></div>
              <div class="preview-placeholder"></div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<style scoped>
.preview-main{
  width: 100%;
  height: 100%;
  background: #d7e1ed;
}
.preview-header{
  padding-right: 20px;
  height: 60px;
  background: #4a5161;
  text-align: right;
}
.preview-placeholderCon{
  height: 200px;
}
.preview-placeholder{
  height: 40px;
  margin-bottom: 10px;
  background: #9fafd4;
  border-radius: 3px;
}
.preview-tags-con{
  padding: 5px 0;
  margin: 10px 0;
}
.preview-tip{
  font-size: 12px;
  color: #c3c3c3;
}
.preview-content-con{
  border-top: 1px solid #edeff1;
  border-bottom: 1px solid #edeff1;
  padding: 12px 0 20px;
  margin-bottom: 20px;
}
.preview-classifition-con{
  padding: 5px 0;
}
.preview-classifition-item{
  margin-right: 8px;
}
.preview-publish-time{
  font-size: 12px;
  color: gray;
  margin-top: 5px;
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
export default {
  data() {
    return {
      articleTitle: '',
      tagsList: '',
      classificationSelected: [],
      content: '',
      publishTime: '',
    };
  },
  mounted() {
    this.articleTitle = localStorage.articleTitle;
    this.tagsList = localStorage.tagsList ? JSON.parse(localStorage.tagsList) : [];
    this.classificationSelected = localStorage.classificationSelected ? JSON.parse(localStorage.classificationSelected) : []; // eslint-disable-line max-len
    this.content = localStorage.content;
    this.publishTime = localStorage.publishTime;
  },
};
</script>
