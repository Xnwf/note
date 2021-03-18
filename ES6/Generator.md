### Generator

Generator函数是ES6中提供的一种异步编程解决方案

Generator 函数内部可以有多个状态，状态机

#### 定义

普通函数的function后添加一个*



#### 特点

1. 无论有无返回值，都会返回一个迭代器对象
2. 无论有无封装代码，都不会立即执行
3. 在Generator函数中可以使用yield关键字来定义状态，且yield只能在Generator函数中使用
4. yield会将函数切割成多个部分
5. 使用迭代器的next()方法就会执行切割出的部分，并返回
6. 后一个yield可以给上一个yield传递参数

#### 应用场景

1. 让函数返回多个值

2. 利用generator的返回值是一个迭代器，可以用于Iterator遍历对象

   ```js
   function* genObj(){
       let keys = Object.keys(obj);
       for (let i = 0; i < keys.length; i++) {
           yield obj[keys[i]];
       }
   }
   ```

3. 同步流程表示异步操作