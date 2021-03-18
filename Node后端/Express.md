# Express

> Express是一个基于NodeJS的Web Server开发框架, 能够帮助我们快速的搭建Web服务器

1. 为什么需要Express?
   - 利用原生的NodeJS开发Web服务器,
     我们需要处理很多繁琐且没有技术含量的内容
     例如: 获取路由->解析路由->分配路由->处理路由等
     但是有了Express之后, 就能帮助我们省去大量繁琐的环节, 让我们只用关注核心业务逻辑
   - 利用原生的NodeJS开发Web服务器,
     我们需要自己手动去实现静态/动态资源处理, get/post参数的解析, cookie的解析, 日志处理等
     但是有了Express之后, 已经有现成的插件帮我们实现了上述功能
   - 所以作为单身的程序猿(媛), 如果你还想留一些时间去约会, 那么Express是你的最佳选择

2.永不过时的Express

- Express最早的版本是在2010年发布的, 目前最新的版本是5.0是在2015年左右发布的,虽然Express是一个古老的框架, 但是它并没有过时

    + 因为: 公司老项目仍然在使用
        + 因为: 目前比较火的KOA就是Express原班人马打造的(几乎有这相同的API)
        + 因为: 目前比较火的EggJS就是KOA打造的
        + 所以: 学会Express能够帮助你很好的维护公司的老项目
        + 所以: 学会Express能够帮助你更快的学习KOA和EggJS



## 基本使用

### npm引入

> npm i express

### 创建基础服务

```js
// 1.导入express
const express = require("express");
// 2.创建服务端实例对象
const app = express();

app.get("/", (req, res,next)=> {
  res.writeHead(200,{
      'Content-Type':'text/plain;charset=utf-8'
  })
  res.end('hello world')
});
// 3.告诉服务端监听端口
app.listen(3000,()=>{
    console.log('listen Ok');
});
```



### 处理静态资源

```js
app.use(express.static(path.join(__dirname,'./public')))
```



### 处理动态网页

```js
// 处理动态资源
// 1.告诉express动态资源存储在什么地方
app.set('views', path.join(__dirname, 'views'));
// 2.告诉express动态网页使用的是什么模板引擎
app.set('view engine', 'ejs');
// 3.监听请求, 返回渲染之后的动态网页
app.get('/', (req, res, next)=>{
    // 注意点: express给请求对象和影响对象添加了很多自定义的方法
    res.render('index', {msg:'data'});
});
```



### 处理路由

#### 方式一

```js
// 通过express处理路由方式一
app.get('/api/goods/list', (req, res, next)=>{
    res.end('it666.list.get');
});
app.get('/api/user/login', (req, res, next)=>{
    // 注意点: 响应对象的json方法是express给响应对象扩展的
    //         这个方法会自动将对象转换成字符串之后返回
    //         这个方法还会自动帮助我们设置响应头
    res.json({
        name:'lnj',
        age:33,
        method: 'get'
    });
});
app.post('/api/goods/detail', (req, res, next)=>{
    res.end('it666.detail.post');
});
app.post('/api/user/register', (req, res, next)=>{
    res.json({
        name:'lnj',
        age:33,
        method: 'post'
    });
});
```

#### 方式二

```js
const express = require("express");
const router = express.Router();
// 会将注册的地址和当前的地址拼接在一起来匹配
// /api/user/login
router.get("/login", (req, res, next) => {
  // 注意点: 响应对象的json方法是express给响应对象扩展的
  //         这个方法会自动将对象转换成字符串之后返回
  //         这个方法还会自动帮助我们设置响应头
  res.json({
    name: "lnj",
    age: 33,
    method: "get",
  });
});
router.post("/register", (req, res, next) => {
  res.json({
    name: "lnj",
    age: 33,
    method: "post",
  });
});
module.exports = router;
```

```js
app.use("/api/user",userRouter);
```



### 获取请求参数

- get: 在req.query中

```js
app.get('/get', (req, res, next)=>{
    // express会将get的请求参数转换成对象之后, 放到请求对象的query属性中
    console.log(req.query);
});
```

- post:在req.body中

```js
app.use(express.json()); // 告诉express能够解析 application/json类型的请求参数
app.use(express.urlencoded({extended: false})); // 告诉express能够解析 表单类型的请求参数 application/x-www-form-urlencoded
// express会将解析之后, 转换成对象的post请求参数放到请求对象的body属性中
app.post('/post', (req, res, next)=>{
    console.log(req.body);
});
```

### 处理cookie

- 通过res.cookie可以设置cookie

  ```js
  app.get('/setCookie',(req,res,next)=>{
      res.cookie('cookieTest','12333',{httpOnly:true,path:'/',maxAge:10000})
      res.end()
  })
  ```

- 通过req.cookies可以获取cookie

  - 但是需要使用[cookie-parser](https://www.npmjs.com/package/cookie-parser)插件

  ```js
  const cookieParser = require("cookie-parser");
  
  app.use(cookieParser());
  app.get('/getCookie',(req,res,next)=>{
      console.log(req.cookies);
      res.end()
  })
  ```

### next方法

- use既可以处理没有路由地址的请求,也可以处理没有没有路由地址的请求

- use既可以处理get请求,也可以处理post请求

- 在处理请求的时候是从上至下判断的,哪一个先满足就哪一个处理

- 如果在请求的回调中调用了next方法,只要下面还有满足的就会继续处理

- 使用方法:

  - 通过next方法, 我们可以将同一个请求的多个业务逻辑拆分到不同的方法中处理
  - 这样可以提升代码的可读性和可维护性, 以及保证代码的单一性

  ```js
  app.get('/api/user/info',
      (req, res, next)=>{
          console.log('验证用户是否登陆');
          next();
      },
      (req, res, next)=>{
          console.log('用户已经登陆, 可以查看用户信息');
      });
  
  ```

  

### 错误处理

- 通过[http-errors](https://www.npmjs.com/package/http-errors)插件可以添加错误信息

  ```js
  /*
  由于在处理请求的时候会从上至下的匹配
  由于前面的处理方法都没有调用next方法, 所以处理完了就不会再继续向下匹配了
  由于use没有指定路由地址, 由于use既可以处理get请求, 又可以处理post请求
  所以只要前面的路由都没有匹配到, 就会执行下面的use
  * */
  app.use((req, res, next)=>{
      next(createError(404));
  });
  app.use((err, req, res, next)=>{
      console.log(err.status, err.message);
      res.end(err.message);
  });
  ```



### 中间件

1. 什么是中间件?

- 中间件的本质就是一个函数, 这个函数接收3个参数request请求对象、response响应对象、next函数
- 当请求进来，会从第一个中间件开始进行匹配。如果匹配则进入，如果不匹配，则向后依次对比匹配

2. 中间件的作用?

- 将一个请求的处理过程，分发到多个环节中，目的效率高，便于维护。即每个环节专门干一件事

- 3.中间件的分类

  - 应用级别中间件
    绑定到app实例上的中间件
    例如: app.get / app.post

  - 路由级别中间件
    绑定到router实例上的中间件
    例如: router.get / router.post

  - 错误处理中间件
    与其他中间件函数的定义基本相同，
    不同之处在于错误处理函数多了一个变量：err，即它有4个变量：err, req, res, next

  - 内置中间件
    express.static()、express.json()、express.urlencoded()、...

  - 第三方中间件
    cookie-parser、...



## 脚手架使用

> npm install -g express-generator    
>
> [express](https://www.npmjs.com/package/express-generator)

- 安装[nodemon](https://www.npmjs.com/package/nodemon)

- 安装[cross-env](https://www.npmjs.com/package/cross-env)

- 配置启动环境

  ```js
  "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
  "build": "cross-env NODE_ENV=pro nodemon ./bin/www.js",
  ```

- 安装[Sequelize](https://www.npmjs.com/package/sequelize)

- 安装[mysql2](https://www.npmjs.com/package/mysql2)

- 安装[redis](https://www.npmjs.com/package/redis)

- 安装[ajv](https://www.npmjs.com/package/ajv)

- 安装[eslint](https://www.npmjs.com/package/eslint)

  - `eslint --init`

  - 安装[eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)

    - 安装eslint-plugin-import

    - 安装eslint-plugin-node

    - 安装eslint-plugin-promise

    - ```bash
      npm install --save-dev eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
      ```

- 添加config文件夹
  - 添加数据库配置文件
  - 添加错误处理文件
  
- 添加Controller文件夹
  
  - 添加Controller层业务逻辑代码
  
- 添加db文件夹
  - 添加model文件夹
    - 定义Sequelize表模型
  - 添加redis配置文件
  - 添加Sequelize配置文件
  
- 修改routes文件夹
  
  - 添加路由处理文件
  
- 添加service文件夹
  
  - 添加数据库交互文件
  
- 添加utils文件夹
  
  - 添加加密工具类
  
- 添加validator文件夹
  
  - 添加数据校验文件
  
- 修改views文件夹
  
  - 清空
  
- 安装[express-session](https://www.npmjs.com/package/express-session)

  - 安装后引用,可以设置cookie相关设置
  - 并且会给req添加一个session属性,
  - 可以用它来获取用户数据存在redis中
    - 保存在redis中需要插件[connect-redis](https://www.npmjs.com/package/connect-redis)
    - 将建立的redis连接放在session的对象属性中,就不需要另外保存了

- 日志记录

  - express默认引用了[morgan](https://www.npmjs.com/package/morgan)库
  - 详细用法见文档



