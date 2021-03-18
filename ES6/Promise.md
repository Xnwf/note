### Promise

在JavaScript中，如何表示和控制一个持续执行的程序行为？

即，一段程序的前半部分执行完，要经过一段时间才执行另一部分

现在运行 => 将来运行 即异步编程的核心

JavaScript最基本的块单位是函数

从现在到将来的最简单的方法是 回调函数



JavaScript引擎本身并没有时间的概念，只是按需执行JavaScript任意代码，在ES6之前，是通过事件循环的方式进行执行。

异步：是关于现在和未来的时间间隙

JavaScript是单线程的

ES6中，有一个新概念建立在时间循环队列上，叫任务队列，它是挂载在事件循环队列的每一个tick之后的一个队列，在每个tick中，可能出现的异步操作不会导致一个完整的新事件添加到事件循环队列中，而是会在当前的tick的任务队列末尾添加一个任务

#### 回调地狱

在编写异步回调代码时，往往会出现，不断嵌套的代码

```javascript
function A(a.function(){
    function C();
    function D(function E(){
        function F(function H(){}){
            function G();
        }
        
    })
})
function B();
```

在使用回调的时候，控制权可能会交给第三方，从而导致一系列的问题，比如多次回调等，为了解决缺乏顺序性和可信任性的问题，我们提出了Promise



#### promise

为了不把控制权给第三方，我们可以要求第三方给我们提供了解其何时结束任务的能力，在接收到结束信息之后，再决定做什么。

这种范式就称为Promise

一个点单的例子，点单（发出请求）=>收据（承诺）=>拿到餐品/没有拿到（成功/失败）

在回调过程中我们可能出现的问题：过早，过晚，次数过多/过少，未能传递所需环境和参数，吞掉可能的错误和异常

就是把一层一层向内嵌套调用的方法，给拉成一串连续调用的方法，每个嵌套调用的方法，都向调用者返回this，也就是返回自身，然后带着上次调用的结果，进入下一个嵌套的环节

```javascript
var abc = new XX();
abc.先调用了Xx();
//xx执行完后，带着执行的结果，返回this
abc.再调用aa();
..
//promise连续调用自己上一轮的运行结果，用的就是.then
abc.then(..xx).then(..aa)..
```

####  一些特性

1、创建promise后，会立即执行它回调中的代码

2、在promise中有三个状态，以达到用同步表示异步

​    *pending：还没有给定成功或失败状态*

​    *fulfilled：操作成功*

​    *rejected：操作失败*

​    *状态不可逆*

​    *如果状态变成成功，就执行then()中的回调*

​    *如果状态变成失败，就执行catch()中的回调*

3、可以在前一个then或catch的回调中添加return传值给下一个promise

4、then或catch中无论是成功还是失败中return都会传递给下一个promise成功的回调

5、一个promise实例可以有多个then或catch调用，会多次执行



#### 个人理解

使用promise时，通过new创建promise实例，在promise的构造函数中添加一个回调函数，该回调函数拥有两个参数，resolve和reject，这两个参数也是两个回调函数，promise创建时的回调中可以调用resolve和reject方法，用于改变当前promise实例的状态（promise有三个状态，pending，fulfilled，rejected，状态改变为不可逆），未调用resolve或reject时为pending状态，同时可以使用resolve和reject方法进行传参，该参数会被传递给then或catch方法中。

Promise原型中拥有then和catch方法，then方法有两个回调函数作为参数，第一个回调函数在状态为fulfilled情况下启用，第二个回调函数在状态为rejected的情况下启用，同时这两个回调函数也可以return参数，并将其传递给下一个then或catch。then和catch方法调用结束后会返回一个新的promise对象，该对象会继承当前的promise对象的状态，因此可以采用链式编程的形式不断往下，而catch实际上是第一个参数为undefined的then，因此，catch会优先接受上一个then中return回的数据作为其接受数据，如果上一个then没有设定第二个参数，就会接受promise实例通过reject方法传递来的参数，catch还可以捕获上一个then中的错误，作为输出。

promise的传参，首先是resolve和reject中的参数，会分别传给对应的then中的两个方法，而then中执行回调的函数，如果有返回值，不管是成功还是失败的两种，都返回给下一个then中成功的回调，返回的promise对象也会变成fulfilled状态

总的来说，在状态为Pending的情况下，采用的是观察者模式，所有then中等待状态变化的回调函数可以看做是一个个观察者，在观察者模式中，我们会在状态发生变动的时候，调用观察者类中的notify方法，以达到信息通知的目的，而这里与观察者模式不同的地方在于观察者本身就是一个方法，当状态发生变化时，可以直接调用这些观察者方法，所以在pending状态下，可以将then中等待的回调函数加入观察者序列，当调用resolve或reject方法时，修改状态的同时调用观察者序列中的回调函数，达到一个异步调用的效果

#### 异常处理

```javascript
try{
   //可能发生错误的代码 
}
catch(e){
    console.log(e);
}
```



#### all方法

all方法接受一个数组，如果数组中有多个promise对象，对数组中只有都成功才会执行then，并且会按照添加的顺序，将所有成功的结果重新打包到一个数组中返回给我们，如果数组中不是promise对象，立即执行then方法

#### race方法

谁的状态先改变，就听谁的

race接收一个数组，如果数组中有多个Promise对象，谁先返回状态就听谁的，如果数组中不是Promise对象，直接执行then方法

应用场景：接口调试，超时处理

#### finally方法

promise执行结束后，无论是fulfilled还是rejected状态，在then和catch后都会执行finally中的回调函数





