## Node.js

>Node.js是一个基于Chorme V8引擎的JS运行环境
>
>> V8引擎是一款专门解释和执行JS的虚拟机,任何程序只要集成了V8引擎都可以执行JS

执行方式:

1. 在浏览器中编写
2. 在node cmd(REPL Read Eval Print Loop : 交互式解释器)
3. 在命令行中直接执行js文件 node filename.js

在项目下执行`npm install --save @types/node` 可补全代码提示

---

#### Node和浏览器的区别

1. node.js全局对象默认为global
2. node.js中this指向一个空对象3
3. node.js中没有HTML节点以及DOM/BOM相关的API

#### 什么是模块?Ss
> 在浏览器开发中为了避免命名冲突,方便维护等,我们采用类或者立即执行函数来封装JS代码,来避免冲突和提升维护性,这里的一个类或立即执行函数就是一个模块
```js
let obj = {

}

(function(){

})()
```
	问题: 没有标准和规范

#### Node中的模块
NodeJS采用CommonJS规范实现模块系统

**CommonJS规范**
+ 一个文件就是模块
+ 每个文件中的变量函数都是私有的,对其他文件不可见
+ 每个文件中的变量函数必须通过exports暴露之后其他文件才可以使用
+ 要想使用其他文件暴露的变量函数必须通过require()导入模块

**模块导出的几种方式**

**1.exports**

```js
//导出文件
exports.attribute  = attribute/function in thisFile
//引入文件
let aModule  =  require(filepath)
```

**2.module**

```js
module.exports.attribute = attribute/function;
module.exports.attribute = attribute/function;
```

**3.global(不用)**

```js
global.attribute = attribute/function;
global.attribute = attribute/function;
```
**exports和module的区别**
1. `exports = name` 取不到,不能直接赋值
2. `module.exports =  name` 取得到,可以直接赋值
3. 但都不要这么用

---

#### require注意点

1. 导入模块时可以不添加后缀,自动按顺序查找`.js >.json >.node`都没找到就报错
2. 可以导入自定义模块(文件模块),系统模块(核心模块),第三方模块
3. 导入自定义模块时必须加路径

---

#### 包

**1. 什么是包**

编写代码尽量遵循单一原则,一个模块尽量值完成一个特定的功能,但有些复杂的功能需要多个模块组成,维护多个模块之间关系的东西叫做包

**2.NPM**

NodJS包管理器 NPM

`npm config list` 查看配置列表

`npm install -g package@version`   全局安装

`npm uninstall -g package` 全局卸载

`npm update -g package@version` 全局更新

新建文件夹->`npm init(自定义)`/`npm init -y(自动)` -> 生成`package.json`文件

`npm install package --save`   保存在package.json中的dependencies中
`npm install package --dev`   不保存在package.json中的devDependencies中
`npm install package --save-dev`   保存在package.json中的devDependencies中
devDependencies 开发阶段需要的包,dependencies上线后需要的包

`npm install` 安装所有包
`npm install --development` 只安装devdependencies中的包
`npm install --production` 只安装dependencies中的包

`npm uninstall package` 本地卸载
`npm update  package@version` 本地更新



