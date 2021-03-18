

### BOM

操作浏览器的API

#### BOM常见对象

window表示浏览器的一个实例,同时又是全局对象

Navigator 代表当前浏览器的信息,判断什么浏览器

Location 代表浏览器地址栏的信息,设置或获取当前地址信息

History 代表浏览器的历史记录,通过History来实现刷新,上一步,下一步

Screen 用户屏幕信息

#### Navigator对象

```js
        let agent = window.navigator.userAgent;Z
        if (/chrome/i.test(agent)) {
            console.log("谷歌");
        }
        else if (/firefox/i.test(agent)) {
            console.log("火狐");
        }
        else if (/msie/i.test(agent)) {
            console.log("低级IE");
        }
        if ("ActiveXObject" in window) {
            console.log("高级IE");
        }
```

#### Location对象

```js
let oBtn  = document.querySelector("#btn");
oBtn.onclick =  function(){
    //获取地址栏
    console.log(window.location.href);
    //修改地址栏
    // window.location.href = "https://www.bilibili.com/";
    //刷新页面
    window.location.reload(ture);//添加ture表示强制刷新更新缓存
}
```

#### History对象

> 处于隐私,只能拿到当前用户访问的页面

```js
window.history.forward();//前进
window.history.go(n);//正数前进n个,负数回退n个,0表示刷新
window.history.back();//回退
```

#### 获取元素宽高(JS三大家族)

![image-20200906200207808](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200906200207808.png)

![image-20200906200307567](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200906200307567.png)

![image-20200906200356570](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200906200356570.png)

![image-20200906200503874](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200906200503874.png)

```js
//可以获取到元素的宽高,不包括边框和padding,只能获取样式不能设置样式,有兼容问题
oDiv = document.querySelector("div")
let  a = getComputedStyle(oDiv);
console.log(a.width,a.height);
//支持旧版本浏览器,其他和getComputeStyle一样
let b = oDiv.currentStyle;
console.log(b);
//只能通过取到行内样式设置的值,可以设置样式,不包括边框和内边距,无兼容问题
oDiv.style.width
oDiv.style.height
//不能设置样式,包括边框和内边距,无兼容问题
oDiv.offsetWidth
oDiv.offsetHeight
//相对最近的定位祖先的偏移量,如果没有就是相对于body
oDiv.offsetLeft
oDiv.offsetTop
//获取元素最近的定位的祖先元素
oDiv.offsetParent
//只包括内边距,不包括边框
oDiv.clientWidth
oDiv.clientHeight
//左和上边框的宽度
oDiv.clientLeft
oDiv.clientTop
//元素内容没有超出元素范围时等于clientWidth/clientHeight
//元素内容没有超出元素范围时等于clientWidth/clientHeight+超出的width/height
oDiv.scrollWidth
oDiv.scrollHeight
//内容移出去相对于内边距的距离
oDiv.scrollTop
oDiv.scrollLeft
```



