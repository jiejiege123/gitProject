<template>
    <el-row>
        <el-col :span="8" :offset="8">
            <div id="upload">
                <label class="el-form-item__label" style="width: 80px;">上传图片</label>
                <!--elementui的上传图片的upload组件-->
                <el-upload
                  class="upload-demo"
                  :before-upload="beforeupload"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  style="margin-left:80px;">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
                
                <!--elementui的form组件-->
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name" name="names" style="width:360px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        
        <!--展示选中图片的区域-->
        <el-col :span="4" >
            <div style="width:100%;overflow: hidden;margin-left:150px;">
                <img :src="src" alt="" style="width:100%;"/>
            </div>
        </el-col>
    </el-row>
    
</template>

<script>
    export default {
        data() {
            return {
                form: {//form里面的参数
                  name: ''
               },
               param:"",//表单要提交的参数
               src:"https://afp.alicdn.com/afp-creative/creative/u124884735/14945f2171400c10764ab8f3468470e4.jpg" //展示图片的地址
            };
        },
        methods: {
            beforeRemove(file, fileList) {
                //return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //阻止upload的自己上传，进行再操作
            beforeupload(file) {
                console.log(file);
                //创建临时的路径来展示图片
                var windowURL = window.URL || window.webkitURL;
                
                this.src=windowURL.createObjectURL(file);
                //重新写一个表单上传的方法
                this.param = new FormData();
                this.param.append('file', file, file.name);
                return false;
            },
            //覆盖默认的上传行为
            httprequest() {

            },
            onSubmit(){//表单提交的事件
                var names = this.form.name;
                //下面append的东西就会到form表单数据的fields中；
                this.param.append('message', names);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                //然后通过下面的方式把内容通过axios来传到后台
                //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
                this.$reqs.post("/upload", this.param, config).then(function(result) {
                        console.log(result);
                })
            }
        }
    }

var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js'); //封装的mongodb的增删改查和分页基本操作的文件；
var ObjectId = require('mongodb').ObjectId; //对mongo的_id处理的插件；
var formidable = require('formidable');
var fs = require("fs");


router.post("/",function(req,res,next){
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    //form.uploadDir = "./public/images";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
        console.log("files:",files)  //这里能获取到图片的信息
        console.log("fields:",fields) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到
        
    })
})

/*较完整版*/
var formData = new FormData();
var files = document.getElementById("myfiles").files;
// 设置多文件属性
formData.enctype="multipart/form-data";
var fileArray=[].slice.call(files,0);//类数组转换为数组
fileArray.forEach(function(file){
    formData.append("myfile",file);//循环遍历把文件对象插到formData对象上
});


var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs'); 
app.post('/upload', function(req, res, next) {//对应前端请求的路径，请求方法
   var form = formidable.IncomingForm({
       encoding : 'utf-8',//上传编码
       uploadDir : "public/files",//上传目录，指的是服务器的路径，如果不存在将会报错。
       keepExtensions : true,//保留后缀
       maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
   });
   var allFile=[];
   form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
     var progressInfo = { 
        value: bytesReceived, 
        total: bytesExpected 
     }; 
     console.log('[progress]: ' + JSON.stringify(progressInfo)); 
     res.write(JSON.stringify(progressInfo)); 
   })
   .on('file', function (filed, file) {
      allFile.push([filed, file]);//收集传过来的所有文件
   })
   .on('end', function() { 
      res.end('上传成功！'); 
   })
   .on('error', function(err) {
     console.error('上传失败：', err.message); 
     next(err); 
   })
   .parse(req,function(err, fields, files){
     if(err){
        console.log(err);
     }
     allFile.forEach(function(file,index){
         var fieldName=file[0];
         var types = file[1].name.split('.');
         var date = new Date();
         var ms = Date.parse(date);
         fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
     });
   }); 
 });

/*  *** 富文本案例 ***  */
</script>

<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                class="avatar-uploader"
                :action="serverUrl"
                name="img"
                :headers="header"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
        <el-row v-loading="uillUpdateImg">
        <quill-editor
            v-model="detailContent"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)">
        </quill-editor>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                serverUrl: '',  // 这里写你要上传的图片服务器地址
                header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token 
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                detailContent: '', // 富文本内容
                editorOption: {}  // 富文本编辑器配置 
            }
        },
        methods: {
            // 上传图片前
            beforeUpload(res, file) {},
            // 上传图片成功
            uploadSuccess(res, file) {},
            // 上传图片失败
            uploadError(res, file) {}
        }
    }
</script>

<!-- 富文本编辑器使用quill-image-extend-module插件 -->
<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>
<script>
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    components: {quillEditor},
    data() {
      return {
       content: '',
        // 富文本框参数设置
        editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: updateUrl,
              response: (res) => {
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    }
  }
</script>
<!-- quill-image-extend-module 的所有可配置项 -->
<script type="text/javascript">
editorOption: {
    modules: {
         ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 
             name: 'img',  // 图片参数名
             size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
             action: updateUrl,  // 服务器地址, 如果action为空，则采用base64插入图片
             // response 为一个函数用来获取服务器返回的具体图片地址
             // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
             // 则 return res.data.url
             response: (res) => {
                 return res.info
             },
             headers: (xhr) => {
             // xhr.setRequestHeader('myHeader','myValue')
             },  // 可选参数 设置请求头部
             sizeError: () => {},  // 图片超过大小的回调
             start: () => {},  // 可选参数 自定义开始上传触发事件
             end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
             error: () => {},  // 可选参数 上传失败触发的事件
             success: () => {},  // 可选参数  上传成功触发的事件
             change: (xhr, formData) => {
             // xhr.setRequestHeader('myHeader','myValue')
             // formData.append('token', 'myToken')
             } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
         },
         toolbar: {  // 如果不上传图片到服务器，此处不必配置
             container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
             handlers: {
                 'image': function () {  // 劫持原来的图片点击按钮事件
                     QuillWatch.emit(this.quill.id)
                 }
             }
         }
    }
}

// 注意事项 （matters need attention）
// 由于不同的用户的服务器返回的数据格式不尽相同

// 因此 在配置中，你必须如下操作

 // 你必须把返回的数据中所包含的图片地址 return 回去
 respnse: (res) => {
    return res.info  // 这里切记要return回你的图片地址
 }
// 比如你的服务器返回的成功数据为

{
code: 200,
starus: true,
result: {
    img: 'http://placehold.it/100x100' // 服务器返回的数据中的图片的地址
 }
}
// 那么你应该在参数中写为：

 // 你必须把返回的数据中所包含的图片地址 return 回去
 respnse: (res) => {
    return res.result.img  // 这里切记要return回你的图片地址
 }

</script>