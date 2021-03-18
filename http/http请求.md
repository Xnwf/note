#### GET POST

##### 相同

都用于将数据提交到远程服务器	

##### 不同

GET 将数据放在URL后

POST 将数据放在请求头

GET 对数据大小有限制

POST对数据大小无限制



##### 应用场景

敏感数据和大数据用POST

不敏感数据和小数据用GET



#### cookie

cookie 会话跟踪技术（客户端

seesion 会话跟踪技术 （服务端



**cookie作用**

将网页中的数据保存在浏览器中



**cookie的生命周期**

默认情况下是浏览器关闭

如果通过expires设置的过期时间，如果时间没有过期，那么就不会清空



**注意点：**

cookie默认不会保存任何数据

cookie不能一次性设置多条数据，要想保存多条数据，只能一条一条的设置

cookie有大小和个数的限制

个数限制：20~50

大小限制：4KB左右



**作用范围:**

同一个浏览器的同一个路径（可以访问同一路径的不同文件）

如果想要所有文件都能访问，则需在设置cookie的时候需要添加path=/

如果在一个域名下保存了一个cookie，想在在另一个域名中访问，

则需在设置cookie时添加domain属性



#### hash

在路径后添加一个值，用于网页分享时打开的依然是hash值的那一页



#### Cookie SessionStorage LocalStorage

##### 生命周期

cookie 默认是关闭浏览器，可以设置过期时间

SessionStorage 关闭当前窗口或浏览器时，不能设置过期时间

LoaclStorage 除非被清除，否则永久保存

##### 容量大小

cookie 4k 20~50个左右

SessionStorage 5MB左右，无个数限制，不同浏览器和操作系统决定

LoaclStorage 5MB左右，无个数限制，不同浏览器和操作系统决定

##### 网络请求

cookie 每次都会携带在HTTP头中，如果cookie过多会带来性能问题

SessionStorage 仅在浏览器保存，不参与与服务器的通信

LoaclStorage 仅在浏览器保存，不参与与服务器的通信

##### 应用场景

Cookie 判断用户是否登录

SessionStorage 表单数据

LoaclStorage 购物车

##### 注意点

不要将敏感信息存储在本地



#### 跨域问题

##### 同源策略

同源是指：协议，域名，端口都相同



http://www.baidu.com:80/index.html

协议：http/https/..

一级域名：www

二级域名：baidu.com

端口号：80



同源策略下，ajax不能请求到不同源的数据

解决方案：jsonp

##### JSONP

###### 原理

同一界面中可以定义多个script标签

同一界面中多个script标签的数据可以互相访问

可以通过script的src属性来导入其他资源



