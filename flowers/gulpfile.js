/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:04
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-05-10 22:50:58
*/
/* jshint esversion: 6 */ 
const gulp = require("gulp");
const del = require("del");  //删除
const bs = require("browser-sync");  //同步刷新
const concat = require("gulp-concat");  //合并文件
const cheerio = require("gulp-cheerio");//修改文件
const uglify = require("gulp-uglify"); // 压缩JS文件
const babel = require("gulp-babel");  //把ES6 转换成ES5的语法
const rename = require("gulp-rename"); //修改文件名称
const autoprefixer = require("gulp-autoprefixer");//自动给CSS3新属性加前缀
const ejs = require('gulp-ejs');
