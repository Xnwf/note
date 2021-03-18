# Koa

1.什么是Express?
Express是第一代最流行的web框架，它对Node.js的http进行了封装
但是它是'基于ES5'的语法，内部实现异步代码，只有一个方法：'回调'

2.什么是KOA1.x?
随着新版Node.js开始支持ES6，Express的团队又'基于ES6'重新编写了下一代web框架koa。
和Express相比，koa 1.x使用generator实现异步,用generator实现异步比回调简单了不少，但是generator的本意并不是异步

3.什么是KOA2.x?
koa团队并没有止步于koa 1.x，他们非常超前地'基于ES7'开发了koa2，
和koa 1相比，koa2完全'使用Promise并配合async来实现异步'

4.Express、Koa1.x、Koa2.x区别

- 最大的区别就是内部实现异步的方式不同
  - Express使用回调函数实现异步, 容易出现回调地狱问题, 但是语法更老兼容性更好
  - Koa1.x使用generator实现异步, 解决了回调地狱问题, 但是generator的本意并不是异步
  - Koa2.x使用Promise并配合async来实现异步, 解决了回调地狱问题, 但是语法太新兼容性不
- 第二大的区别就是重量级不同
  - Express中内置了很多封装好的功能, 而Koa中将这些功能都封装到了独立的模块中想要使用这些功能必须先安装对应的模块才能使用, 所以Koa比Express更轻量级



## 基本使用

处理基本都需要自行安装

- ctx是req和res的结合体
  -  ctx.request
  - ctx.response

- 处理静态资源

  - npm i koa-static

- 处理动态资源

  - npm i koa-views
  - https://www.npmjs.com/package/koa-views

- 处理路由

  - ```
    npm i @koa/router
    ```

  - https://github.com/koajs/router/blob/master/API.md

  - ```javascript
    router.post("/api/goods/list", (ctx, next) => {
        ctx.body = ''; // 相当于res.writeHeader + res.end
    });
    
    router.post("/api/goods/list", (ctx, next) => {
        ctx.body = {}; // 相当于res.writeHeader + res.end
    });
    // 启动路由 自动设置请求头
    app.use(router.routes()).use(router.allowedMethods());
    ```

  - 处理get参数

    - 传统形式的get参数

      - `ctx.request.query`转换成对象的请求参数
      - `ctx.request.querystring` 字符串形式的请求参数

    - 处理动态路由形式

      - `ctx.params`

      - ```js
        router.get("/api/user/:name/:age", (ctx, next) => {
          console.log(ctx.params);
          ctx.body = "Hello user ";
        });
        // http://127.0.0.1:3000/api/user/xxx/11
        // { name: 'xxx', age: '11' }
        ```

  - 处理post参数

    - npm i koa-bodyparser
    - https://www.npmjs.com/package/koa-bodyparser
    - `ctx.request.body`

- 处理cookie

  - `ctx.cookies.get(name, [options])`详细见文档
  
  - `ctx.cookies.set(name, value, [options])`详细见文档
  
  - https://www.koajs.com.cn/#context
  
  - tips: 禁止设置中文
  
    - ```js
      // 设置
      let value =  new Buffer('中文').toString('base64')
      // 还原
      let res = new Buffer(value,'base64').toString()
      ```

- 处理错误

  - npm i koa-onerror

  - https://www.npmjs.com/package/koa-onerror

  - ```js
    app.use((err,ctx) => {
        console.log(err.status,err.message);
        ctx.body = err.message
    });
    ```





## 脚手架

> npm install -g koa-generator
>
> https://www.npmjs.com/package/koa-generator
>
> **注意安装的koa版本**

- 安装有nodemon

- 安装cross-env

- 安装Sequelize

- 安装redis

- 安装mysql2

- 安装ajv

- 设置session

  - 安装[koa-redis](https://www.npmjs.com/package/koa-redis)

  - 安装[Koa-generic-session](https://www.npmjs.com/package/koa-generic-session)

  - 配置如下

  - tips:下面代码需要放在注册路由前

  - ```js
    app.use(
      session({
        cookie: {
          path: '/',
          httpOnly: true,
          maxAge: 1000 * 60 * 30
        },
        store: redisStore({
          all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
        })
      })
    )
    ```

- 设置log

  - 安装[koa-morgan](https://www.npmjs.com/package/koa-morgan)
  - 和express里的morgan完全一致



## 项目上线

### 跨域问题

1. Cookie的跨域问题

   Cookie是不能跨域使用的, 所以在前后端分离开发的时候, 我们当前的代码就会出现问题
   例如:
   前端地址: http://192.168.0.107:3001/login.html
   后端地址: http://127.0.0.1:3000/api/user/test

2. 什么是跨域?
   https://www.it666.com:3000
   http://www.it666.com:3000

- 协议/一级域名/二级域名/端口号 有一个不同就是跨域,由于3000端口和3001端口不同, 所以就是跨域,所以我们在3000端口设置的cookie3001是不能使用的,我们在3001端口设置的cookie3000也是不能使用的

#### 新建web服务器

全局安装[http-sever](https://www.npmjs.com/package/http-server)

![image-20210311104834297](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210311104834297.png)

跨域cookie不共享,因此保存在server端的cookie数据无法从client端拿到



#### 反向代理

1. 正向代理
   - 代理服务器是为用户服务, 我们称之为正向代理
     例如: 访问谷歌
     用户访问不了谷歌, 但是我可以访问一台海外的服务器, 这台海外服务器又可以访问谷歌那么'用户'就可以先访问'海外的服务器', 再通过'海外的服务器'访问谷歌, 这就是正向代理

2. 正向代理的用途

   - 访问原来无法访问的资源，如google
   - 对客户端访问授权，上网进行认证

3. 反向代理

   - 反向代理服务器是为'服务器'服务,我们称之为反向代理

     - 用户访问代理服务器

     - 代理服务器决定访问前端服务器还是后端服务器

       

#### Nginx

![image-20210311110049933](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210311110049933.png)

用户通过浏览器访问代理服务器,代理服务器判断访问的是根路径还是api路径,如果是api路径就发送后端服务器,后端服务器将cookie返回给代理服务器,代理服务器将cookie设置到用户浏览器上,用于保存登录状态

- 下载Nginx

- 找到nginx.conf文件修改配置

- ```nginx
  修改配置文件
  worker_processes 4; // CPU核数
  
  listen       80; // Nginx服务器端口
  server_name  localhost; //Nginx服务器
  
  location / {  // 请求根路径代理的地址(前端服务器)
  	proxy_pass http://192.168.0.107:3001;
  }
  location /api { // 请求/api代理的地址(后端服务器)
  	proxy_pass http://127.0.0.1:3000;
  	proxy_set_header Host $host;// 把后端服务器响应头里设置给Ngnix服务器
  }
  ```

- 启动ngnix

- 通过http://127.0.0.1:8080/login.html可以访问前端服务器

- 通过http://127.0.0.1:8080/api/user/login发送post可以成功登录,其他依次类推



### 上线PM2

1. 如何上线Node编写的项目?

   - 上线项目需要考虑的几个问题
     - 服务稳定性, 不会因为程序的某个错误或异常导致项目停止服务
     - 线上日志记录, 除了记录访问日志以外, 我们还需要记录错误日志和自定义日志
     - 充分利用服务器资源, Node是单线程的, 服务器是多核的, 一台服务器只运行一个Node程序太浪费资源

2. PM2

   ​	https://www.npmjs.com/package/pm2

   - PM2的进程守护可以在程序崩溃后自动重启
   - PM2自带日志记录的功能, 可以很方便的记录错误日志和自定义日志
   - PM2能够启动多个Node进程, 充分利用服务器资源

   #### PM2

   **env不生效的时候参考该博客**

   https://www.cnblogs.com/ldld/p/10008751.html

   解决方案:通过pm2的配置文件启动项目

   ```js
       "pro": " pm2 start ./bin/pm2.config.js --env production",
   ```

   ```js
   /*
    * @Description:pm2的配置文件
    * @version:
    * @Author: Queen
    * @Date: 2021-03-11 17:56:05
    * @LastEditors: Her
    * @LastEditTime: 2021-03-11 18:56:25
    */
   module.exports = {
     apps: [
       {
         name: 'koademo',
         script: './bin/www',
         watch: true,
         ignore_watch: ['node_modules', 'logs'],
         error_file: 'logs/error.log',
         out_file: 'logs/custom.log',
         log_date_format: 'YYYY-MM-DD HH:mm:ss',
         instances: 4, // 负载均衡(最好不要超过cpu的核心数)
         env: {
           NODE_ENV: 'development'
         },
         env_uat: {
           NODE_ENV: 'uat'
         },
         env_production: {
           PORT: 3002,
           NODE_ENV: 'production'
         }
       }
     ]
   }
   
   ```

   

   - pm2 start app.js|config     // 启动应用程序
   - pm2 list                    // 列出启动的所有的应用程序
   - pm2 restart appName|appId   // 重启应用程序
   - pm2 info appName|appId      // 查看应用程序详细信息
   - pm2 log appName|appId       // 显示指定应用程序的日志
     - 如果通过pm2 来启动Node项目,会自动将log输出添加都自定义的log
   - pm2 monit appName|appId     // 监控应用程序
   - pm2 stop appName|appId      // 停止应用程序
   - pm2 delete appName|appId    // 关闭并删除所有应用



## 总结

整体流程如下

- 建立koa项目
- 建立前端项目
- koa项目处于本地服务器http://127.0.0.1:3002
- 前端项目位于http-server建立的服务器http://10.100.223.9:3001
- 用户如果通过前端页面登录,会产生一个cookie存在koa服务器中
- 但由于前端服务器和koa服务器存在跨域问题,因此无法获取cookie
- 使用ngnix反向代理服务器
  - 通过ngnix配置文件调整,设置代理服务器为http://127.0.0.1:8080
  - 用户访问ngnix会根据请求路径的差异分发给前后端服务器
  - 并将请求结果都保存在在ngnix服务器上返回给用户浏览器
- 使用PM2可以使得不用长时间开启cmd命令行保持项目运行
  - 通过PM2的配置可以自动实现项目守卫,负载均衡,自动生成日志等功能





