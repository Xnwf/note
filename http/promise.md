### 线程

JavaScript中所有的代码都是单线程串行执行

#### 同步和异步

JavaScript中除了 事件绑定和回调函数 以外都是同步代码

异步（不会直接执行）

同步（立即执行）

```js
let arr = [];
let index = 0;
let length = arr.length;
while(true){
    let item = arr[index];
    if(item.xxx === xxx){
        执行异步代码
    }
    index++;
    if(index.tiem === 500){
        执行异步代码
    }
}
```



### promise

promise是ES6中新增的异步编程解决方案，在代码中的表现为一个对象

#### 适用对象

需求：从网络上加载三个资源，要求加载资源的顺序为1,2,3，前面任何一个资源加载失败，后续资源都不能加载

为了保存异步代码的执行顺序是，就会出现回调函数层层嵌套的问题，promise对象可以以将异步操作以同步流程来表示，比年了回调函数的层层嵌套



#### promise的使用

promise本身不是异步的

##### promise共有三种状态

- *pending*: 初始状态，既不是成功，也不是失败状态。
- *fulfilled*: 意味着操作成功完成。调用resolve函数。
- *rejected*: 意味着操作失败。调用reject函数
- 状态一旦改变就不可逆



#### then方法

可以通过上一个promise对象的then方法给下一个promise对象的then方法传递参数

无论在上一个promise对象的成功还是失败的回调传递的参数，都会传给下一个promise对象成功的回调

同一个promise对象可以多次调用then方法



#### catch方法

```js
then(undefined,()=>{})
```

catch监听时，只能使用链式编程

原因

1. 如果promise的状态是失败，但是没有对应失败的监听函数就会报错
2. then方法每次执行完毕会返回一个新的promise，状态会继承原来的promise



可以传参

同一个promise对象可以多次调用catch方法

catch方法每次执行完毕后会返回一个新的promise

无论在上一个promise对象的成功还是失败的回调传递的参数，都会传给下一个promise对象成功的回调

如果catch返回的是一个promise对象，name将会将返回的promise对象的执行结果中的值传递给下一个catch方法，如果成功，就返回成功的回调，失败就返回失败的回调

catch方法可以捕获前一个then方法的异常