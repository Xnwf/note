## Ajax

与服务器交互数据，以达到服务器局部刷新的效果

​        *// 1.创建异步对象*

​        *// 2.设置请求方式和请求地址*

​        *// 3.发送状态*

​        *// 4.监听状态的变化*

​        *// 5.处理返回的结果*

```javascript
let xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET","ajax_info.txt",true);
xmlhttp.send();
xmlhttp.onreadystatechange = (ev2)=>{
    if(xmlhttp.readyState ===4 ){
        if (xmlhttp.status >=200 &&xmlhttp.status<300 || xmlhttp.status===304) {
            // 成功  两种获取请求数据
            xmlhttp.responseText;
            xmlhttp.responseXML;
        }
        else{
            //失败
        }
    }
}
```



#### 状态码

[200) 正确

**304 表示成功，本地缓存数据，服务器已经执行了get，但文件未变化**



#### GET在IE中的问题

IE5和IE6不兼容

在IE中的缓存问题，在ie中get请求同一个url中只有一个结果，然后就会变成一个固定缓存，如果服务器变化，不会发生变化，因此需要在每一次请求后都改变一个url

在GET的url地址后面添加一个随机数据/时间戳

```javascript
xmlhttp.open("GET","xxxx"+(new Date().getTime()),ture)
```

url中不可以出现中文，可以有字母、数字、下划线、ascii



#### POST

post方法比get方法多一个setRequestHeader方法，需要添加个请求头再发送请求，参数在send中发送