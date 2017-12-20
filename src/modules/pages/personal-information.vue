<template>
  <div id="container">
    <div id="personMessage">
      <div id="header">
        <img src="webimage/个人信息.png">
        <h1 class="header-p">个人信息</h1>
      </div>
      <div id="message">
        <div class="message-form">
          <li>
            <label class="message-lab">用户姓名:</label>
            <input class="message-input-name" type="text">
          </li>
          <li>
            <label class="message-lab">用户手机:</label>
            <input  class="message-input-number" type="text">
            <button class="message-button-number">获取验证码</button>
            <p class="message-error">请输入正确的格式</p>
          </li>
          <li>
            <label class="message-lab i">公司:</label>
            <span>TalkingData</span>
          </li>
          <li>
            <label class="message-lab i">部门:</label>
            <span>可视化部门</span>
          </li>
          <li>
            <label class="message-lab">登录密码:</label>
            <span>修改密码</span>
          </li>
          <li>
            <button class="message-cancel">取消</button>
            <button class="message-keep">保存</button>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const phoneNumber = document.getElementsByClassName('message-input-number')[0];
  function show() {
    const p = document.getElementsByClassName('message-error');
    p[0].style.display = 'block';
    phoneNumber.style.border = '1.5px solid red';
  }
  function hide() {
    const p = document.getElementsByClassName('message-error');
    p[0].style.display = 'none';
    phoneNumber.style.border = '1px solid #ccc';
  }
  phoneNumber.addEventListener('keyup', () => {
    const text = phoneNumber.value;
    if (text !== '') {
      const str = /^[0-9]+$/;
      if (!str.test(text)) {
        show();
      } else {
        hide();
      }
    } else {
      hide();
    }
  });
  const left = document.getElementsByClassName('message-input-number')[0].offsetLeft;
  const p = document.getElementsByClassName('message-error')[0];
  p.style.left = left + 'px'; // eslint-disable-line prefer-template
</script>
<css>
  *{
  margin:0;
  padding:0;
  }
  #container{
  width:100%;
  min-width:800px;
  margin:0 auto;
  }
  #personMessage{
  overflow:hidden;
  margin-top:20px;
  margin-left:40px;
  }
  img{
  float:left;
  width:30px;
  height:30px;
  }
  .header-p{
  margin-top:5px;
  float:left;
  margin-left:30px;
  font-size:17px;
  }
  #header{
  width:100%;
  height:50px;
  border-bottom:1px solid #ccc;
  }
  #message{
  margin-top:-30px;
  margin-left:20px;
  }
  #message li{
  list-style:none;
  margin-top:60px;
  }
  .message-lab{
  margin-right:20px;
  font-size:15px;
  }
  .i{
  margin-left:30px;
  }
  .message-input-name{
  width:400px;
  height:40px;
  }
  .message-input-number{
  width:270px;
  height:40px;
  }
  .message-error{
  position:absolute;
  display:none;
  color:red;
  }
  .message-button-number{
  border-radius:5px;
  border:0;
  background-color:#f7f7f7;
  width:130px;
  margin-left:2px;
  height:42px;
  cursor:pointer;
  }
  .message-form span{
  font-size:15px;
  }

  .message-cancel,.message-keep{
  width:150px;
  height:50px;
  margin-left:20px;
  border-radius:5px;
  border:0;
  cursor:pointer;
  }
  .message-keep{
  color:white;
  background-color:rgba(14,131,248,0.7);
  }
  .message-cancel:hover{
  color:#0e83f8;
  }
  .message-keep:hover{
  background-color:rgba(14,131,248,1);
  }

</css>
