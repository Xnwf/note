### async-await

ES8中新增的特性

```javascript
function request() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("拿到的数据");
        }, 1000);
    });
}

async function genRes() {
    let res1 = await request();
    console.log(res1);
    let res2 = await request();
    console.log(res2);
    let res3 = await request();
    console.log(res3);  
}
//会依次执行genRes内的异步操作，await会等待promise执行完毕，并将promise执行完的的结果返回
```

- 自动将常规函数转换成Promise，返回值也是一个Promise对象

- 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数

- 异步函数内部可以使用await

- await 放置在Promise调用之前，await 强制后面点代码等待，直到Promise对象resolve，得到resolve的值作为await表达式的运算结果

- await只能在async函数内部使用,用在普通函数里就会报错

  

  