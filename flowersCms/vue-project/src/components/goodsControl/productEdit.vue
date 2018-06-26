<template>
  <div id="productEdit" :class="{'aside-coll':$store.state.asider.isCollapse,'mains':true}">
    <div class="mainheader">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="iconfont icon-home2"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main>
      <div class="forum-module">
        <div class="forum-header">
          <span class="forum-name">
            修改商品
          </span>
          <div class="backbtn">
            <el-button type="default" @click="goback" size="small">返回列表</el-button>
          </div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm table-body">
        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm table-body" :action="'/api'+'/upload'" method="post" enctype="multipart/form-data"> -->
          <el-form-item label="商品名称" prop="f_name">
            <el-input v-model="ruleForm.f_name"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <span>{{$store.state.asider.flower.t_name}}</span>
          </el-form-item>

          <el-form-item label="设置">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="热卖" name="type"></el-checkbox>
              <el-checkbox label="新品" name="type"></el-checkbox>
              <el-checkbox label="特价" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="价格" prop="f_p">
            <el-input v-model="ruleForm.f_p"></el-input>
          </el-form-item>

          <el-form-item label="材料" prop="f_mr">
            <el-input type="textarea" v-model="ruleForm.f_mr"></el-input>
          </el-form-item>

          <el-form-item label="主材" prop="f_zmr" class="meatera">
            <!-- 主材料 -->
            <el-select v-model="ruleForm.f_zmr"  class="select">
              <el-option 
                v-for="item in fzmr"
                :key = "item.label" 
                :label="item.label" 
                :value="item.value">
              </el-option>
            </el-select>
            <!-- 数量 -->
            <el-input type="number" v-model="ruleForm.f_zs" placeholder="数量" class="select"></el-input>
          </el-form-item>

          <el-form-item label="辅材" class="meatera">
            <!-- 辅材 -->
            <el-select v-model="ruleForm.f_fmr" class="select">
              <el-option 
                v-for="item in fzmr"
                :key = "item.label" 
                :label="item.label" 
                :value="item.value">
              </el-option>
            </el-select>
            <!-- 数量 -->
            <el-input type="number" v-model="ruleForm.f_fs" class="select"></el-input>
          </el-form-item>

          <el-form-item label="包装" prop="f_pk">
            <el-input type="textarea" v-model="ruleForm.f_pk"></el-input>
          </el-form-item>

          <el-form-item label="花语" prop="f_word">
            <el-input type="textarea" v-model="ruleForm.f_word"></el-input>
          </el-form-item>

          <el-form-item label="商品图片" prop="desc">
            <el-upload
              class="avatar-uploader"
              :action="'/api/images/img/'"
              accept="image/jpeg,image/jpg,image/gif,image/png,image/bmp"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="isTrun" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <span class="imgedit">点击修改图片</span>
            </el-upload>
          </el-form-item>

          <!-- <el-form-item label="详情图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item> -->

          <!-- 富文本编辑 -->
          <el-form-item label="产品详情" class="details">
             <div class="editor-container">
              <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
            </div> 
          </el-form-item>
          
          <el-form-item>
            <el-button type="warning" @click="submitForm('ruleForm')" size="small">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')" type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import UE from '../../components/ueditor/ueditor.vue';
export default {
  name: 'productEdit',
  components: {UE},
  data () {
    return {
      checkList: ['热卖'],
      // 主材
      fzmr: [
        {
          value: '红玫瑰',
          label: '红玫瑰'
        }, {
          value: '白玫瑰',
          label: '白玫瑰'
        }, {
          value: '黄玫瑰',
          label: '黄玫瑰'
        }, {
          value: '粉玫瑰',
          label: '粉玫瑰'
        }, {
          value: '紫玫瑰',
          label: '紫玫瑰'
        }, {
          value: '香槟玫瑰',
          label: '香槟玫瑰'
        }, {
          value: '康乃馨',
          label: '康乃馨'
        }, {
          value: '百合',
          label: '百合'
        }
      ],
      // 表单
      ruleForm: {},
      rules: {
        f_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        f_p: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        f_mr: [
          { required: true, message: '请输入材料', trigger: 'blur' }
        ],
        f_pk: [
          {  required: true, message: '请输入包装', trigger: 'blur' }
        ],
        f_word: [
          { required: true, message: '请输入花语', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请添加商品图片', trigger: 'change'}
        ],
        f_zmr: [
          { required: true, message: '请选择主材料', trigger: 'blur' }
        ],
      },
      // boolren
      isTrun: false,
      // 详情图片上传
      /*dialogImageUrl: '',
      dialogVisible: false,*/
      // 商品图片
      imageUrl: '',
      imageUrl2: '',
      // 表单要提交的参数
      param: new FormData(),

      // 百度编辑器
      // 百度编辑器默认内容
      defaultMsg: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      }
    }
  },
  methods: {
    // 返回上一页
    goback () {
      // console.log(this.$store.state.asider.nowPage);
      this.$router.go(-1)
    },
    // 详情图片
    /*handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },*/
    // 商品图片
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
      
    },
    // 阻止upload的自己上传，进行再操作
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPEG && !isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF/BMP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // console.log(file);
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.imageUrl=windowURL.createObjectURL(file);
      this.isTrun = true;
      delete this.rules.desc
      // console.log(this.imageUrl);
      // 改变图片名称  可能导致重名 一般不用
      // this.ruleForm.f_url = file.name

      //重新写一个表单上传的方法
      this.param = new FormData();
      // 将图片放到表单对象中 file.name即图片名 'file'是这个图片文件的名称
      this.param.append('file', file, file.name);
      return (isJPEG || isJPG || isBMP || isGIF || isPNG) && isLt2M && false;
    },
    // 提交表单验证
    submitForm(ruleForm) {
      // $refs[]配合ref属性用于获取dome节点
      // 表单验证 this.$refs[formName].validate((valid) => {} formName是指整个表单对象内容
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          /* 提交 */
          // 将表单内容放入表单方法中 只能放文字 不能放对象
          var formeid = this.ruleForm.f_id
          console.log(formeid);
          // console.log(this.ruleForm.f_id);
          if (formeid != undefined) {
            formeid = this.ruleForm.f_id
            this.param.append("f_id",formeid)
          }else{
            formeid = 'no'
            var whatif = this.$store.state.asider.flower.whatif
            console.log(whatif);
            var whatid = this.$store.state.asider.flower.whatid
            var pwhatif = this.$store.state.asider.flower.pwhatif
            var pwhatid = this.$store.state.asider.flower.pwhatid
            this.param.append("whatid",whatid)
            this.param.append("whatif",whatif)
            this.param.append("pwhatid",pwhatid)
            this.param.append("pwhatif",pwhatif)
            this.param.append("f_id",formeid)
          }

          this.param.append('f_mr',this.ruleForm.f_mr)
          this.param.append('f_name',this.ruleForm.f_name)
          this.param.append('f_p',this.ruleForm.f_p)
          this.param.append('f_pk',this.ruleForm.f_pk)
          this.param.append('f_word',this.ruleForm.f_word)
          this.param.append('f_url',this.ruleForm.f_url)
          this.param.append('f_zmr',this.ruleForm.f_zmr)
          this.param.append('f_zs',this.ruleForm.f_zs)
          this.param.append('f_fmr',this.ruleForm.f_fmr)
          this.param.append('f_fs',this.ruleForm.f_fs)
          // console.log(this.param);
          // 设置表单post类型
          let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          };
          // 传到后台
          /*this.$axios.post('/api'+'/upload', {formparam:this.param,flower:this.ruleForm})
            .then(resp => {
              console.log(resp);
          })*/
          let content = this.$refs.ue.getUEContent();
          console.log(content);
          this.param.append('contents',content)
          this.$axios.post('/api'+'/upload',this.param,config)
            .then(resp => {
              // console.log(resp);
              this.$router.go(-1);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      
    },
    // 重置表单 内容清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 百度编辑器
    getUEContent() {
      let content = this.$refs.ue.getUEContent();
      this.$notify({
        title: '获取成功，可在控制台查看！',
        message: content,
        type: 'success'
      });
      console.log(content)
    }

  },
  created () {
    let that = this
    var editfId = this.$store.state.asider.flower.f_id
    console.log(this.$store.state.asider.flower);
    if (editfId == undefined) {
      return
    }
    else {
      this.$axios.get('/api'+'/flowermsg',{params:{flowid:editfId}})
      .then(resp => {
        // console.log(resp);
        that.ruleForm = resp.data[0]
        that.isTrun = true
        // console.log(that.ruleForm);
        that.imageUrl = '/api/images/img/'+that.ruleForm.f_url
        // console.log(that.ruleForm);
        // 取消图片验证
        delete this.rules.desc
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/productedit.less';
</style>
<style lang="css">
  @import '../../assets/css/common.css';
</style>