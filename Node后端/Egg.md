# Egg

## 手动安装配置

https://eggjs.org/zh-cn/intro/quickstart.html 文档很详细,见文档

需要严格遵守文件命名规范

```shell
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev
```

### 处理Get/Post携带参数和Koa一样

  ```JS
  const Controller = require("egg").Controller;
  
  class HomeController extends Controller {
    async index() {
      this.ctx.body = "Hello world";
    }
    async getQuery() {
      // 获取传统get请求参数
      let query = this.ctx.query;
      this.ctx.body = query;
    }
    async getParams() {
      // 获取动态路由请求参数
      let params = this.ctx.params;
      this.ctx.body = params;
    }
    async getBody() {
      // 获取post请求参数
      let body = this.ctx.request.body;
      this.ctx.body = body;
    }
  }
  
  module.exports = HomeController;
  ```

  - 存在安全隐患,因此直接用postman请求不到可以通过添加配置文件通过json格式,但上线不推荐使用

  ```js
  // config/config.default.js
  module.exports = {
    security: {
      csrf: {
        ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      },
    },
  };
  ```

  ​	

### 静态资源不需要处理

  注意请求路径需要加上public  ` http://127.0.0.1:7002/public/login.html`

### 动态资源处理

  1. EggJS如何处理动态资源?
     - 什么是插件?
       EggJS中的插件就是特殊的中间件
       用来处理那些和请求无关独立的业务逻辑
       https://eggjs.org/zh-cn/basics/plugin.html

  2. 插件的使用
     `npm i egg-view-ejs --save`
     在config目录下新建`plugin.js`
     `exports.ejs={ enable:true, package:'egg-view-ejs', };`
     在`config.default.js`中新增如下配置
     `view:{mapping:{'.html':'ejs'}}`
     在app目录中新建view目录, 将动态网页放到这个目录中
     在控制器中通过上下文render方法渲染

### service层处理

  - 在Service定义的方法中处理数据库和网络的数据即可

  - service的ctx上还挂载了一些其他属性

    - `this.ctx.curl` 发起网络调用(用于处理网络获取的数据)

      - ```js
        // 发送get不带参数的请求
        let response = await this.ctx.curl('http://127.0.0.1:3000/getUser');
        // 发送get带参数的请求
        let response = await this.ctx.curl('http://127.0.0.1:3000/getUser2?name=it666&age=66');
        // 发送post不带参数的请求
        let response = await this.ctx.curl('http://127.0.0.1:3000/getNews', {
            method: 'post'
        });
        // 发送post带参数的请求
        let response = await this.ctx.curl('http://127.0.0.1:3000/getNews2', {
            method: 'post',
            data:{
                name:'lnj',
                age:33
            }
        });
        ```

    - `this.ctx.service.otherService` 调用其他 Service。

    - `this.ctx.db` 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块。

  - mvc

    - service model层 获取前端数据以及与数据库交互
    - view 前端视图 从Controller层获取数据
    - Controller 控制层 从model层获取数据,返回给view层

  - 注意点

    - service目录必须放在app目录中
    - service目录支持多级目录, 如果是多级目录, 那么在调用的时候可以使用链式调用
        `this.ctx.service.abc.def.text.xxx();`
    - service中的js文件, 如果是以_或者首字母都是大写, 那么在调用的时候必须转换成驼峰命名
      - get_user.js --- getUser
      -  GetUser.js --- getUser  

  ### cookie处理

    - 和koa一样
    
    ```js
    async setCookie(){
        this.ctx.cookies.set('name', 'lnj', {
            path:'/',
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
    /*在EggJS中, 为了安全着想, 阿里的安全专家建议我们在设置Cookie的时候, 给保存的数据生成一个签名,将来获取数据的时候, 再利用获取到的数据生成一个签名, 和当初保存的时候的签名进行对比,如果一致, 表示保存在客户端的数据没有被篡改, 如果不一致表示保存在客户端的数据已经被篡改 * */
            signed: true, // 根据config/config.default.js中的keys来生成签名
            encrypt: true // 让EggJS帮我们加密之后再保存
        });
        this.ctx.body = '设置成功';
    }
    async getCookie(){
        let cookie = this.ctx.cookies.get('name', {
            signed: true,
            encrypt: true
        });
        this.ctx.body = `获取Cookie成功 = ${cookie}`;
    }
    ```

  ### 日志处理

    - 默认情况下会自动生成	
    - https://eggjs.org/zh-cn/core/logger.html
    
    ```js
     1.日志分类
        ${appInfo.name}-web.log - 应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它
        egg-web.log             - 框架内核、插件日志
        common-error.log        - ctx.logger.error输出的 错误日志
        egg-agent.log           - 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里
        egg-schedule.log        - 定时任务的日志
    2.日志级别
        NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别
    3.如何输出日志
        ctx.logger.xxx
    4.如何切割日志
        默认自动按照天切割, 也可以手动配置按照大小,按照小时切割
    ```

  ### 定时任务 

- 会有许多场景需要执行一些定时任务
  - 定时进行文件切割、临时文件删除
  - 定时上报应用状态。(例如监控系统, 时时监控系统有没有问题, 典型例子MongoDB/Redis集群选举)
  - 定时从远程接口更新本地缓存。
- 用法见文档 https://eggjs.org/zh-cn/basics/schedule.html



### Egg框架扩展

给app和ctx,req,res等对象添加方法

https://eggjs.org/zh-cn/basics/extend.html



在helper放工具方法,如加密方法通过`this.ctx.helper调用`



### 中间件

添加自定义的中间件

### 国际化

设置对应的字符

### MySQL

连接与CRUD MySQL

### Sequelize

通过Sequelize 连接与CRUD



### 配置文件

```
config
|- config.default.js
|- config.prod.js
|- config.unittest.js
`- config.local.js
```

### 部署

在上线阶段,启动服务需要通过 [egg-scripts](https://github.com/eggjs/egg-scripts)

EGG_SERVER_ENV是egg的全局环境变量

通过cross-env设置EGG_SERVER_ENV达到环境的切换

框架内置了 [egg-cluster](https://github.com/eggjs/egg-cluster) 来启动 [Master 进程](https://eggjs.org/zh-cn/core/cluster-and-ipc.html#master)，Master 有足够的稳定性，不再需要使用 [pm2](https://github.com/Unitech/pm2) 等进程守护模块。

```js
	"dev": "cross-env EGG_SERVER_ENV=dev egg-bin dev",
    "prod": "cross-env EGG_SERVER_ENV=prod egg-scripts start --daemon",
    "stop": "egg-scripts stop"
```



## 脚手架

### 初始化

```shell
$ npm init egg --type=simple
$ npm i
```

查看文档就行

egg的文档是在写的太详细了

### tips:

- 可以安装sequelize-cli用于数据库的生成和回退
  - https://eggjs.org/zh-cn/tutorials/sequelize.html
  - 注:即使是安装了cli,也要在配置文件中添加数据库的配置
  - 在Sequelize中也可以验证数据格式见文档https://www.sequelize.com.cn/core-concepts/validations-and-constraints
- **在前端中:**
- 想要拿到表单提交的数据,那么在提交数据的时候必须将服务端给客户端设置的csrfToken也传递过去,不然会被egg拦截,拿不到参数
  -  https://eggjs.org/zh-cn/core/security.html
  - 从cookie中获取csrfToken的值
  - 设置请求头,给请求头添加`xhr.setRequestHeader("x-csrf-token", csrftoken);`
- 安装[egg-ajv](https://www.npmjs.com/package/egg-ajv)

#### egg-ajv大坑

```js
// 千万不要按照文档写
文档中的这个$async一定要弄成false或直接不写
不然会默认运用egg自带的验证来进行处理
//   $async: false,
//   additionalProperties: false,
```

- 在extend目录下添加context.js和helper.js用于错误处理
  - 给context添加返回方方
  - 在helper中保存状态码
- 在helper中添加加密方法
  - 使用原来的md5方法,可以通过this.config调用config中的keys作为加盐
- 通过Sequelize 的findAll方法查询的结果是一个数组,如果没有查到就是空数组
- session设置
  - https://eggjs.org/zh-cn/core/cookie-and-session.html#ctxcookiessetkey-value-options
  - 安装[egg-redis](https://github.com/eggjs/egg-redis)
  - 安装[egg-session-redis](https://github.com/eggjs/egg-session-redis) 
  - 使用方法`     ctx.session.user = user;`





## 单元测试

### Mocha的生命周期钩子

单个测试用例的生命周期

 before -> beforeEach -> it -> afterEach -> after 的顺序执行

多个测试用例

 before -> 

beforeEach -> it -> afterEach  

beforeEach -> it -> afterEach

 -> after 

生命周期钩子的作用:

在测试之前申请一些资源,在测试用例执行之后去释放申请的资源

- 在测试前添加一些测试数据,测试完成之后删除这些测试数据

