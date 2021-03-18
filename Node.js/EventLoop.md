### EventLoop

#### 宏任务和微任务

JS的异步代码中分为"宏任务"和"微任务".

宏任务:比较费时,比较慢的任务

`setTimeOut,setInterval,setImmediate(ie独有)`

`setImmediate`无法指定延迟时间

微任务:相对没那么费时的任务

`Promise,MutationObserver,process.nextTick(node独有)`

`MutationObserver`用于监听节点变化的

##### 浏览器事件环完整的执行顺序

1. 从上至下执行所有同步代码
2. 在执行过程中,遇到宏任务就放在宏任务队列,遇到微任务就放在微任务队列
3. 所有同步代码执行完毕后,执行微任务队列中满足需求的所有回调
4. 当微任务队列所有满足需求回调执行完毕后,会执行宏任务的队列满足的回调
5. 每执行一个宏任务都会立即检查是否有微任务,如果有就先执行微任务

##### Node中的事件循环

一. node中有6个任务队列

1. `timers` 执行setTimeout 和setInterval回调
2. `pending callbacks `:执行系统操作的回调,如tcp,udp通讯错误的回调
3. `idle/prepare `只在内部使用
4. `poll` 执行与I/O相关的回调(出来close回调,定时器回调,以及setImmediate之外,几乎都执行)
5. `check `执行setImmediate的回调
6. `close callbacks` 执行close事件的回调,例如socket.on()

二. node中没有专门存储微任务的队列

三. node事件环只有在同步代码执行完毕,或者其他上述六个队列之间切换时会清空微任务

四. node事件环中,node没有微任务队列,所以是按照任务优先级`process.nextTick(node独有)优先级>Promise优先级`

#### Node中的完整的执行顺序

优先执行同步代码,执行完毕后,判断是否有满足条件的微任务,当微任务执行完毕后,开始执行上述六个任务队列,每次执行完一个时会优先判断是否有满足条件的微任务,如果有就按照优先级依次执行,然后才切换队列.

如果poll队列执行完后,查看check队列有无任务,有就切换,如果没有,就查看timers队列,如果timers队列也没有任务,就会阻塞在poll队列,避免资源浪费