<template>
  <div>
    <Row class="margin-top-10 margin-left-10 margin-right-10 margin-bottom-10">
      <Col span="18">
        <Card>
          <Form :label-width="80">
            <FormItem label="文章标题" :error="articleError">
              <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
            </FormItem>
            <div class="article-link-con">
              <transition name="fixed-link">
                <FormItem v-show="showLink" label="固定链接">
                  <span>
                    <span key="pathfixedtext">{{ fixedLink }}</span><span key="pathText" v-if="!editLink">{{ articlePath }}</span>
                    <Input key="pathInput" v-model="articlePath" style="display:inline-block;width:auto"  v-else/>
                  </span>
                  <span style="float:right;">
                    <Button :type="editPathButtonType" @click="editArticlePath">{{ editPathButtonText }}</Button>
                  </span>
                </FormItem>
              </transition>
            </div>
          </Form>
          <div class="margin-top-20" >
            <form method="post">
              <textarea id="mytextarea" >Hello, World!</textarea>
            </form>
          </div>
        </Card>
      </Col>
      <Col span="6" class="padding-left-10">
        <Card>
          <p slot="title">
            <Icon type="paper-airplane"></Icon>
              发布
          </p>
          <p class="margin-top-10">
            <Icon type="android-time"></Icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
            <Select size="small" style="width:90px" value="草稿">
              <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
          </p>
          <p class="margin-top-10">
            <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
            <Button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="text">修改</Button>
            <transition name="openness-con">
              <div v-show="editOpenness" class="openness-radio-con">
                <RadioGroup v-model="currentOpenness" vertical>
                  <Radio label="公开">
                      公开
                    <Checkbox v-show="currentOpenness === '公开'" v-model="topArticle">在首页置顶这篇文章</Checkbox>
                  </Radio>
                  <Radio label="密码">
                      密码
                    <Input v-show="currentOpenness === '密码'" style="width:120px" size="small" placeholder="请输入密码"/>
                  </Radio>
                  <Radio label="私密"></Radio>
                </RadioGroup>
                <div>
                  <Button type="primary" @click="handleSaveOpenness">确认</Button>
                  <Button type="ghost" @click="cancelEditOpenness">取消</Button>
                </div>
              </div>
            </transition>
          </p>
          <p class="margin-top-10">
            <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
            <span v-if="publishTimeType === 'immediately'">立即发布</span><span v-else>定时：{{ publishTime }}</span>
            <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
            <transition name="publish-time">
              <div v-show="editPublishTime" class="publish-time-picker-con">
                <div class="margin-top-10">
                  <DatePicker @on-change="setPublishTime" type="datetime" style="width:200px;" placeholder="选择日期和时间" ></DatePicker>                                    
                </div>
                <div class="margin-top-10">
                  <Button type="primary" @click="handleSavePublishTime">确认</Button>
                  <Button type="ghost" @click="cancelEditPublishTime">取消</Button>
                </div>
              </div>
            </transition>
          </p>
          <Row class="margin-top-20 publish-button-con">
            <span class="publish-button"><Button @click="handlePreview">预览</Button></span>
            <span class="publish-button"><Button @click="handleSaveDraft">保存草稿</Button></span>
            <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
          </Row>
        </Card>
        <div class="margin-top-10">
          <Card>
            <p slot="title">
              <Icon type="navicon-round"></Icon>
                分类目录
            </p>
            <Tabs type="card">
              <TabPane label="所有分类目录">
                <div class="classification-con">
                  <Tree :data="classificationList" @on-check-change="setClassificationInAll" show-checkbox></Tree>
                </div>
              </TabPane>
              <TabPane label="常用目录">
                <div class="classification-con">
                  <CheckboxGroup v-model="offenUsedClassSelected" @on-change="setClassificationInOffen">
                    <p v-for="item in offenUsedClass" :key="item.title">
                      <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                    </p>
                  </CheckboxGroup>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div class="margin-top-10">
          <Card>
            <p slot="title">
              <Icon type="ios-pricetags-outline"></Icon>
                  标签
            </p>
            <Row>
              <Col span="18">
                <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择文章标签">
                  <Option v-for="item in articleTagList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </Col>
              <Col span="6" class="padding-left-10">
                <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="ghost">新建</Button>
              </Col>
            </Row>
            <transition name="add-new-tag">
              <div v-show="addingNewTag" class="add-new-tag-con">
                <Col span="14">
                  <Input v-model="newTagName" placeholder="请输入标签名" />                                
                </Col>
                <Col span="5" class="padding-left-10">
                  <Button @click="createNewTag" long type="primary">确定</Button>
                </Col>
                <Col span="5" class="padding-left-10">
                  <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                </Col>
              </div>
            </transition>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<style scoped>
.article-link-con{
    height: 32px;
    width: 100%;
}
.fixed-link-enter{
    opacity: 0;
}
.fixed-link-enter-active, .fixed-link-leave-active {
    transition: opacity .3s
}
.fixed-link-enter-to{
    opacity: 1
}
.openness-radio-con{
    margin-left: 40px;
    padding-left: 10px;
    height: 130px;
    border-left: 1px dashed #ebe9f3;
    overflow: hidden;
}
.publish-time-picker-con{
    margin-left: 40px;
    padding-left: 10px;
    height: 100px;
    border-left: 1px dashed #ebe9f3;
    overflow: hidden;
}
.openness-con-enter{
    height: 0;
}
.openness-con-enter-active, .openness-con-leave-active{
    transition: height .3s;
}
.openness-con-enter-to{
    height: 130px;
}
.openness-con-leave{
    height: 130px;
}
.openness-con-leave-to{
    height: 0;
}
.publish-button-con{
    border-top: 1px solid #f3eff1;
    padding-top: 14px;
}
.publish-button{
    float: right;
    margin-left: 10px;
}
.publish-time-enter{
    height: 0;
}
.publish-time-enter-active, .publish-time-leave-active{
    transition: height .3s;
}
.publish-time-enter-to{
    height: 100px;
}
.publish-time-leave{
    height: 100px;
}
.publish-time-leave-to{
    height: 0;
}
.classification-con{
    height: 200px;
    margin-top: -16px;
    border-left: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    border-radius: 0 0 3px 3px;
    padding: 10px;
    overflow: auto;
}
.add-new-tag-con{
    margin-top: 20px;
    border-top: 1px dashed #dbdddf;
    padding: 20px 0;
    height: 60px;
    overflow: hidden;
}
.add-new-tag-enter{
    height: 0;
    margin-top: 0;
    padding: 0px 0;
}
.add-new-tag-enter-active, .add-new-tag-leave-active{
    transition: all .3s;
}
.add-new-tag-enter-to{
    height: 60px;
    margin-top: 20px;
    padding: 20px 0;
}
.add-new-tag-leave{
    height: 60px;
    margin-top: 20px;
    padding: 20px 0;
}
.add-new-tag-leave-to{
    height: 0;
    margin-top: 0;
    padding: 0px 0;
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
import tinymce from 'tinymce';
import 'tinymce/themes/modern/theme.min';
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/skins/lightgray/content.min.css';

export default {
  data() {
    return {
      articleTitle: '',
      articleError: '',
      showLink: false,
      fixedLink: '',
      articlePath: '',
      articlePathHasEdited: false,
      editLink: false,
      editPathButtonType: 'ghost',
      editPathButtonText: '编辑',
      articleStateList: [{ value: '草稿' }, { value: '等待复审' }],
      editOpenness: false,
      Openness: '公开',
      currentOpenness: '公开',
      topArticle: false,
      publishTime: '',
      publishTimeType: 'immediately',
      editPublishTime: false,  // 是否正在编辑发布时间
      articleTagSelected: [],  // 文章选中的标签
      articleTagList: [],  // 所有标签列表
      classificationList: [],
      classificationSelected: [],  // 在所有分类目录中选中的目录数组
      offenUsedClass: [],
      offenUsedClassSelected: [],  // 常用目录选中的目录
      classificationFinalSelected: [],  // 最后实际选择的目录
      publishLoading: false,
      addingNewTag: false,  // 添加新标签
      newTagName: '', // 新建标签名
    };
  },
  methods: {
    handleArticletitleBlur() {
      if (this.articleTitle.length !== 0) {
        // this.articleError = '';
        localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
        if (!this.articlePathHasEdited) {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/'; // eslint-disable-line prefer-template
          this.articlePath = this.articleTitle;
          this.articlePathHasEdited = true;
          this.showLink = true;
        }
      } else {
        // this.articleError = '文章标题不可为空哦';
        this.$Message.error('文章标题不可为空哦');
      }
    },
    editArticlePath() {
      this.editLink = !this.editLink;
      this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost';
      this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑';
    },
    handleEditOpenness() {
      this.editOpenness = !this.editOpenness;
    },
    handleSaveOpenness() {
      this.Openness = this.currentOpenness;
      this.editOpenness = false;
    },
    cancelEditOpenness() {
      this.currentOpenness = this.Openness;
      this.editOpenness = false;
    },
    handleEditPublishTime() {
      this.editPublishTime = !this.editPublishTime;
    },
    handleSavePublishTime() {
      this.publishTimeType = 'timing';
      this.editPublishTime = false;
    },
    cancelEditPublishTime() {
      this.publishTimeType = 'immediately';
      this.editPublishTime = false;
    },
    setPublishTime(datetime) {
      this.publishTime = datetime;
    },
    setClassificationInAll(selectedArray) {
      this.classificationFinalSelected = selectedArray.map(item => item.title);
      localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected);
    },
    setClassificationInOffen(selectedArray) {
      this.classificationFinalSelected = selectedArray;
    },
    handleAddNewTag() {
      this.addingNewTag = !this.addingNewTag;
    },
    createNewTag() {
      if (this.newTagName.length !== 0) {
        this.articleTagList.push({ value: this.newTagName });
        this.addingNewTag = false;
        setTimeout(() => {
          this.newTagName = '';
        }, 200);
      } else {
        this.$Message.error('请输入标签名');
      }
    },
    cancelCreateNewTag() {
      this.newTagName = '';
      this.addingNewTag = false;
    },
    canPublish() {
      if (this.articleTitle.length === 0) {
        this.$Message.error('请输入文章标题');
        return false;
      } else { // eslint-disable-line no-else-return
        return true;
      }
    },
    handlePreview() {
      if (this.canPublish()) {
        if (this.publishTimeType === 'immediately') {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const hour = date.getHours();
          const minute = date.getMinutes();
          const second = date.getSeconds();
          localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second; // eslint-disable-line prefer-template
        } else {
          localStorage.publishTime = this.publishTime;  // 本地存储发布时间
        }
        localStorage.content = tinymce.activeEditor.getContent();
        this.$router.push({
          name: 'preview',
        });
      }
    },
    handleSaveDraft() {
      if (!this.canPublish()) {
        //
      }
    },
    handlePublish() {
      if (this.canPublish()) {
        this.publishLoading = true;
        setTimeout(() => {
          this.publishLoading = false;
          this.$Notice.success({
            title: '保存成功',
            desc: '文章《' + this.articleTitle + '》保存成功', // eslint-disable-line prefer-template
          });
        }, 1000);
      }
    },
    handleSelectTag() {
      localStorage.tagsList = JSON.stringify(this.articleTagSelected);  // 本地存储文章标签列表
    },
  },
  computed: {
    completeUrl() {
      const finalUrl = this.fixedLink + this.articlePath;
      localStorage.finalUrl = finalUrl;  // 本地存储完整文章路径
      return finalUrl;
    },
  },
  mounted() {
    this.articleTagList = [
      { value: 'vue' },
      { value: 'iview' },
      { value: 'ES6' },
      { value: 'webpack' },
      { value: 'babel' },
      { value: 'eslint' },
    ];
    this.classificationList = [
      {
        title: 'Vue实例',
        expand: true,
        children: [
          {
            title: '数据与方法',
            expand: true,
          },
          {
            title: '生命周期',
            expand: true,
          },
        ],
      },
      {
        title: 'Class与Style绑定',
        expand: true,
        children: [
          {
            title: '绑定HTML class',
            expand: true,
            children: [
              {
                title: '对象语法',
                expand: true,
              },
              {
                title: '数组语法',
                expand: true,
              },
              {
                title: '用在组件上',
                expand: true,
              },
            ],
          },
          {
            title: '生命周期',
            expand: true,
          },
        ],
      },
      {
        title: '模板语法',
        expand: true,
        children: [
          {
            title: '插值',
            expand: true,
          },
          {
            title: '指令',
            expand: true,
          },
          {
            title: '缩写',
            expand: true,
          },
        ],
      },
    ];
    this.offenUsedClass = [
      {
        title: 'vue实例',
      },
      {
        title: '生命周期',
      },
      {
        title: '模板语法',
      },
      {
        title: '插值',
      },
      {
        title: '缩写',
      },
    ];
    tinymce.init({
      selector: '#mytextarea',
      theme: 'modern',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality emoticons template paste textcolor',
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
    });
  },
  destroyed() {
    tinymce.get('mytextarea').destroy();
  },
};
</script>
