### Fetch

ES6中新增的，基于promise的网络请求方法

```javascript
//get
fetch(url,{
    method:"get"
}).then((res)=>{
    // return res.text();//这是一个promise对象 string
    return res.json();//这是一个promise对象 json
}).catch((e)=>{
    console.log(e);
}).then((data)=>{
    console.log(data);
})
//post
fetch(url,{
    method:"post",
    body:JSON.stringify({
        teacher:"22"
    })
}).then((res)=>{
    return res.json();//这是一个promise对象 json
}).catch((e)=>{
    console.log(e);
}).then((data)=>{
    console.log(data);
})
```



