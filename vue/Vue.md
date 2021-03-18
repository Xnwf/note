## VUE

### MVVM设计模式

1. MVVM

   M: Model	数据模型(保存数据,处理数据业务逻辑)

   V: View		视图(展示数据,与用户交互)

   VM: View Model	(数据模型和视图的桥梁)

   支持数据的双向传递 M->VM->V   V->VM->M

   

2. Vue中的MVVM

   被控制的区域 View

   ```html
       <div id="app">
       {{name}}
       </div>
   ```

   Vue实例对象 View Model

   ```js
   let vue = new Vue({
       el:'#app'
   })
   ```

   实例对象中的data Model

   ```js
   let vue = new Vue({
       el:'#app',
       data:{
           name : "xiix" 
       }
   })
   ```

### 数据双向传递

默认情况下vue只支持数据单向传递 M->VM->V

提供部分双向传递的功能`<input> <textarea>以及<select>`上可以使用`v-model`进行双向数据绑定

### Vue数据绑定过程

1. 先将未绑定的数据界面展示给用户
2. 根据模型中的数据和控制的区域绑定数据之后生成HTML
3. 将绑定好的HTML渲染到界面上



### 常用指令

1. `v-once` 数据只渲染一次,不会随着后续的变化而改变

2. `v-cloak `一开始没有绑定数据前,先隐藏,等绑定完成后再显示 

   ```css
   [v-cloak] {
     display: none;
   }
   ```

   ```vue
   <div v-cloak>
     {{ message }}
   </div>
   ```

3. `v-text` 相当于innerText,会覆盖原有内容,不解析html

   ```vue
   <span v-text="msg">dididi</span>
   <span>{{msg}}</span>
   ```

4. `v-html` 相当于 innerHTML,会覆盖原有内容,解析html

   ```vue
   <div v-html="html"></div>
   ```

5. `v-if` 当if中为真则渲染元素,可以直接在v-if内写表达式

   `v-else` 和`v-else-if/v-if`连用,中间不能插入其他标签

   `v-show`与`v-if`操作基本一致 与v-if的不同点在于:

   1. v-if如果为真/假,则会创建/删除元素
   2. v-show是通过设置display的值修改的是否显示
   3. v-show 的性能更好

6. `v-for `可遍历数组,字符串.数字,对象
	
	v-for为了提升性能，采用的是就地复用
	
	![image-20200607105954526](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200607105954526.png)
	
	为了解决选中状态改变的问题，给元素绑定一个key
	
	```html
	<ul >
	    <li v-for="item,index in person" :key= 											"item.id">
	        <input type="checkbox" name="" id="">
	        {{index}}  -  {{item.name}}</li>
	</ul>
	```
	
	
	
	![image-20200607110733613](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200607110733613.png)
	
	​	通过key来判断内存中是否存在
	
	​	注：不能用index作为key
	
7. 给某个元素绑定数据的三种方式`{{}} v-text v-html`,但无法给元素属性进行绑定


#### 属性绑定

1. `v-model`可以负责监听用户的输入事件,

   1. 从而更新数据v-model会忽略所有表单元素的value、checked、selected特性的初始值，它总是将vue实例中的数据作为数据来源。
   2. 绑定属性只能用于`<input> <textarea>以及<select>`

2. `v-bind` 专门给用于给元素的属性绑定数据(即标签内的属性)

   1. 通过`v-bind/:`

   2. `v-bind`赋值可以是一个JS合法表达式

   3. 通过v-bind不能直接给class直接绑定类名,因为默认情况下v-bind会去数据模型model中查找,但model中没有类名数据,需要去style中查找

   4. 想要用v-bind去style中查找类名,需要把类名放在数组中,并用字符串的格式保存

         ```vue
      <p :class="['size','color',flag?'active':'']">bind class</p>
      ```

   5. 可以绑定一个对象

         ```vue
         //第一种
         <p :class="['size','color',{'active':true}]">bind class</p>
         
         //第二种
         <p :class="obj">bind class</p>
             obj:{
             'size':true,
             'color':true,
             'active':false
             }
         
         ```

   6. 绑定样式

         1. 绑定时可以绑定一个对象

         2. 对象的value必须用引号括起来,如果样式名中有`-` 也需要用引号括起来

               ```vue
               //1.直接绑定对象
               <bind :style="{color:'red','font-size':'100px'}">bind style</p>
               //2.在数据模型中绑定
               <bind :style="{styleObj}">bind style</p>
               //3.绑定两个对象
               <bind :style="[styleObj,styleObj]">bind style</p>
               ```
#### 事件监听

1. `v-on`:默认情况下,回调可以反复执行

   ```vue
   <button v-on:click = 'myFn'>sss</button>
   ```

2. `v-on:click.once`:事件监听函数只回调一次

   ```vue
   <button v-on:click.once = 'myFn'>sss</button>
   ```
3. `v-on:click.prevent`:阻止事件默认行为(如a链接跳转)

   ```vue
   <a v-on:click.prevent = 'myFn'>sss</a>
   ```
##### 事件冒泡

默认情况下在嵌套元素中,如果都监听了相同的事件,那么会触发事件冒泡(子节点->父节点)依次触发

##### 事件捕获

默认情况下在嵌套元素中,如果都监听了相同的事件,使用事件捕获会(父节点->子节点)依次触发


4. `v-on:click.stop `:阻止事件冒泡

   ```vue
   <div v-on:click = 'myFn1'>
       <div v-on:click = 'myFn2'>
           <div v-on:click.stop = 'myFn3'>
           </div>
       </div>
   </div>
   ```
   
5. `v-on:click.self `:当事件是从侦听器绑定的元素本身触发时才触发回调,即在冒泡过程中会跳过该回调

   ```vue
   <div v-on:click = 'myFn1'>
       <div v-on:click = 'myFn2'>
           <div v-on:click.stop = 'myFn3'>
           </div>
       </div>
   </div>
   ```
   
6. `v-on:click.capture `:把事件冒泡变成事件捕获

   ```vue
   <div v-on:click = 'myFn1'>
       <div v-on:click = 'myFn2'>
           <div v-on:click.stop = 'myFn3'>
           </div>
       </div>
   </div>
   ```
   
7. `v-on:keyup.xxx `:按键修饰符
	官方只提供了`.enter .tab .delete (捕获“删除”和“退格”键) .esc .space .up .down .left .right`

   ```vue
	<input v-on:keyup.enter="submit">
	```
```
   
   其他按键可以使用keycode实现
   
   ```vue
   <input v-on:keyup.13="submit">
```

   为了便于查看按键名称,可以配置全局将keycode起个别名

   ```vue
   Vue.config.keyCodes.f1 = 112
   ```

   

8. **tips**:
   1.回调函数可以加括号也可以不加
   2.绑定回调时可以传递参数,可以传递原生的事件对象

      ```vue
         <button v-on:click = 'myFn($event)'>sss</button>
      ```
   3.在回调函数内部使用data中的数据需要添加this
      	
#### 自定义指令
https://cn.vuejs.org/v2/guide/custom-directive.html
```js
        /*两个参数,一个名称,一个对象
         指令可以在不同的生命周期阶段执行
         bind:指令被绑定到元素上的时候执行,当前还没渲染到界面上
         inserted:绑定指令的元素被添加到父元素的时候调用
         ... 更多钩子函数详情见文档
        */
       //默认为全局指令
        Vue.directive("color",{
            //绑定元素的时候执行回调
            bind:function (el,obj) {
                //通过value进行参数传递
                el.style.color=obj.value
            }
        })

       //默认为全局指令
        Vue.directive("focus",{
            //渲染到界面上之后
            insert:function (el) {
				el.focus();
            }
        })

        //用来定义自定义指令的局部变量
        directives:{
            "color1":{
                bind:function (el,obj) {
                el.style.color=obj.value
            }
            }
        }

```



### 计算属性

直接在插值语法中编写表达式或函数没有代码提示十分不方便

为了解决这个问题,添加了计算属性

```js
<p>{{reverseMsg}}</p>

computed:{
    reverseMsg:function(){
        return this.msg.split('').reverse().join('');
    }
}
```

#### 计算属性和函数的区别

计算属性定义的时候为函数的形式,但其实际上是个属性

计算属性执行的时候,只有只要返回值没有改变时,就只执行一次

#### 使用场景

数据经常发生变化时使用函数,数据不会发生变化或者变化频率低就使用计算属性



### 过滤器

#### 几个过滤器

```js
//定义全局过滤器
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

//定义局部过滤器
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
 <p>{{message|capitalize|filter2}}</p>

//时间过滤器
Vue.filter('dateFormat', function (value,fmMsg) {
    let date =  new Date(value);
    let year = date.getFullYear()+'';
    let mouth = date.getMonth()+1+"";
    let day = date.getDay()+'';
    let hour = date.getHours()+'';
    let min = date.getMinutes()+'';
    let second = date.getSeconds()+'';
    return `${year.padStart(2,"0")}-${mouth.padStart(2,"0")}-${day.padStart(2,"0")} ${hour.padStart(2,"0")}:${min.padStart(2,"0")}:${second.padStart(2,"0")}`;
})
```

#### tips

1. 过滤器只能`{{}}`和`v-bind`中使用

2. 过滤器可以连续使用



### 过渡

> https://cn.vuejs.org/v2/guide/transitions.html

vue中提供四种动画方式

1. 通过默认类名 `v-xxx` 来指定过渡动画
2. 使用自定义前缀类名`xxx-xxx`来指定过渡动画
3. 使用自定义类名`xxx-yyy`来指定过渡动画
4. 使用Js钩子函数来指定过渡动画



 #### 单元素/组件过渡

Vue 提供了 `transition` 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

 ```vue
 <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
 ```

可以通过 `appear` attribute 设置节点在初始渲染的过渡

```vue
<transition appear>
  <!-- ... -->
</transition>
```

对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。



#### 默认过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：**2.1.8 版及以上**定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

#### 自定义前缀

```html
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
```



#### 自定义过渡的类名

```html
<transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
</transition>
```



#### 钩子函数

```vue
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
    //推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"
    <div v-bind:css="false"></div>
  <!-- ... -->
</transition>


```

```js
---js
//如果是通过Js钩子实现动画效果,那么必须在动画执行过程中的回调中写上el.offsetWidth/el.offsetHeight;
methods:{
    beforeEnter(el){
		el.style.opacity = 0;
    },
	enter(el,done){
		//done不执行下面的不会执行
		//使用appear时,done需要延迟调用一下
        setTimeout(function(){
                done();
        },0)
	},
	afterEnter(el){
      ...  
	}
}

```

#### 多元素过渡

```html
  <transition-group name="list" tag="ul">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
```

- 默认会把所有执行动画的元素放在span中.通过tag修改
- 内部元素**总是需要**提供唯一的 `key` attribute 值。

#### 过渡模式

默认情况下,out或in的动画是同时执行的,过渡模式可以指定执行的先后顺序

```html
<transition name="fade" mode="out-in">
    !-- ... the buttons ... --> 
</transition>
```

### 组件

#### 1. 组件构造器

   ```html
   let Profile = Vue.extend({
   template:  `
   <div> 
       <img src="images/150.png">
       <p>wouip</p>
   </div>
   `
   })
   ```

#### 2. 组件注册

   2.1 组件模板

   ```html
       <template id="info">
           <div>
               <img src="images/150.png">
               <p>wouip</p>
               <p>{{name}}</p>
           </div>
       </template> 
   ```

#### 3. 全局组件

   ```js
   //通过组件构造器
   Vue.component("firstcom", Profile);
   //通过组件模板
   Vue.component("secendcom", {
               template:"#info",
               methods:{
                   secendcomFn:function(){
                       alert("dd")
                   }
               },
               data:function(){
                   return{
                       name:'sss'
                   }
               }
           });
   ```

#### 4. 局部组件

   ```js
   let vue2 = new Vue({
               el:'#app2',
               data:{
               
               },
               methods:{
               
               },
               components:{
                   "abc":{template:"#info"}
               }
           })
   ```

#### 5. 动态组件

   ```html
   <!-- 组件会在 `currentTabComponent` 改变时改变 -->
   <component v-bind:is="currentTabComponent"></component>
   <!-- 失活的组件状态将会被缓存！-->
   <keep-alive>
   	<component v-bind:is="name"></component>
   </keep-alive>
   ```

#### 6. 组件中的data

   在组件中使用data必须要使用一个函数来返回数据,通过函数绑定时,组件复用的时候返回的是不同的数据,如果使用的是对象返回,会导致数据混乱


#### 7.动态组件

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

#### 8. 父子组件

   子组件不能使用父组件中的数据,在组件的component属性中定义子组件


用于切换组件,相比起v-if的优点在于可以保存切换组件的状态

#####  1.参数传递

1. 传递时通过在父组件中通过`v-bind:自定义接收数据名称 = "要传递的数据"`来传递数据
2. 在子组件中使用`props:["自定义接收数据名称"]`来接收

```html
<son :parentname="name"></son>
<script>
 components:{
     "son":{
         template:"#son",
         //数组形式
         props:["parentname"]
         //对象形式
         props: {
             bannerData: {
                 type: Array,
                 default: () => [],
                 required: true
             }
         }
     }
 }
</script>
```

##### 2.方法传递

1. 传递时通过在父组件中通过`@自定义传递方法名称 = "要传递的方法"`来传递数据
2. 在子组件中使用`this.$emit("自定义传递方法名称")`来接收

```html
<son :parentname="name" @parentsay="say"></son>
<script>
methods:{
    sonFn(){
        this.$emit("parentsay")
    }
}
</script>
```

##### 3.子组件给父组件传递数据

在emit的后续参数给调用的方法传递参数

```html
<son @parentsay="say"></son>
<script>
methods:{
    sonFn(){ 
//第一个：需要调用的名称
//后续，给函数传递的参数
      this.$emit("parentsay","ddd")
	
    }
}
</script>
```

#### 9.组件及数据方法传递命名注意点

1. 注册组件时,使用驼峰命名的话,在使用的时候需要使用短横线命名

   ```html
   <my-component></my-component>
   
   <script>
       Vue.component("myFather":{
                     	//...
                     })
   </script>
   ```

   

2. 组件间传递参数时,传参时自定义的参数名,如果在接收参数的时候想用驼峰命名,则该自定义参数名就必须写成短横线命名

   ```html
   <son :parent-name="name"></son>
   <script>
    components:{
        "son":{
            template:"#son",
            props:["parentName"]
        }
    }
   </script>
   ```

   

3. 传递方法时只能使用短横线命名法，不能使用驼峰命名，用的时候也只能用短横线命名

   ```html
   <son @parent-say="say"></son>
   <script>
   methods:{
       sonFn(){
           this.$emit("parent-say")
       }
   }
   </script>
   ```




#### 10.组件插槽

使用场景:动态的给组件添加内容

##### 匿名插槽

如果没有给插槽添加name,就是一个匿名插槽,有几个匿名插槽就会填充几次,一个组件中推荐只写一个匿名插槽,其他的使用具名插槽
```html
    <template id="son">
        <div>
            <p>我是子组件</p>
            <--会被换掉的内容替换掉-->
            <slot>默认数据</slot>
        </div>
    </template>
```

##### 具名插槽

为了给不同的插槽添加不同的内容

**注:slot写法不被推荐使用,推荐使用`template`的`v-slot(简写为#)`写法**

```html
<!-- 父组件 -->
<template id="father">
    <div>
        <son :fatherdata="name" @parent-fn="fatherFn">
            <div>匿名</div>
            <div slot="one">one</div>
            <template v-slot:two><div>twooo</div></template>
            <template #two><div>twooo</div></template>
        </son>
    </div>
</template>

<!-- 子组件 -->
<template id="son">
    <div>
        <slot>默认数据</slot>
        <slot name="one">默认one</slot>
        <slot name="two">默认two</slot>
    </div>
</template>
```

具名插槽填充时如果没有指定`slot`默认是不会填充的

##### 作用域插槽

为了填充时使用子组件中的数据

**注:slot写法不被推荐使用,推荐使用`template`的`v-slot`即`#具名插槽名`写法**

```html
//第一种(废弃)
<slot name="two" v-bind:sonname='name'>默认two</slot>
<template #two><div>{{sonname}}</div></template>
//第二种
<slot name="two" v-bind:sonname='name'>默认two</slot>
<template #具名插槽名="slotProps">
    <div>{{slotProps.sonname}}</div>
</template>
```



#### 11 .数据传递问题

子组件使用祖先组件中的数据，需要一层一层传递，非常麻烦

兄弟组件之间不能相互传递数据，需要通过父组件，更麻烦

解决方案：VueX



### VueX

#### 使用方法

1. 新建一个`vuex`对象

   ```js
   const store = new Vuex.Store({})
   ```

2. 对象内有`state`的key-value用于保存数据

   ```js
   const store = new Vuex.Store({
       state: {
           msg: "xxx",
           count:0
       },
   })
   ```

3. **获取`state`中的数据的方法(state)**

   1. 在需要获取数据的组件内添加`store:store`的key-value

      ```js
       Vue.component("grandfather", {
              template: "#grandfather",
              store: store
           )}
      ```

   2. 组件可以通过`this.$store.state.xxx`获取state中的保存的数据

      ```html
      <p>{{this.$store.state.msg}}</p>
      ```

4. **修改`state`中的数据的方法(mutations)**

   1. 不推荐直接修改state中的数据,因为会导致不易查看错误

   2. 使用`mutations`

      ```js
      mutations:{
          mAdd(state){
              state.count = state.count + 1 ;
          },
          mSub(state){
              state.count = state.count - 1 ;
          }
      }
      ```

   3. 组件中调用mutation中的方法

      ```js
      this.$store.commit("mutation中的方法名");
      ```

5. **保存计算属性,即只需要执行一次的方法(getters)**

   1. 计算属性可以自动缓存,只计算一次

   2. 使用getters

      ```js
      getters:{
          formart:function(state){
              console.log("111");
              return state.msg + "it666"
          }
      }
      ```

   3. 调用getters中的方法

      ```js
      this.$store.getters.方法名;
      this.$store.getters.方法名;
      this.$store.getters.方法名;
      连续执行三次只会执行一次
      ```



#### 详细代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>58-Vuex-共享数据</title>
    <script src="js/vue.js"></script>
    <!--1.导入Vuex-->
    <!--注意点: 在导入Vuex之前必须先导入Vue-->
    <script src="js/vuex.js"></script>
</head>
<body>
<!--
1.当前在企业开发中我们遇到了两个问题:
1.如果想要在子组件中使用祖先组件中的数据, 那么就必须一层一层的传递(非常麻烦)
2.兄弟组件之间不能直接传递数据, 如果兄弟组件之间想要传递数据, 那么就必须借助父组件(非常麻烦)
解决方案: 使用Vuex

2.什么是Vuex?
vuex 是 Vue 配套的 公共数据管理工具，我们可以将共享的数据保存到 vuex 中，
方便整个程序中的任何组件都可以获取和修改vuex中保存的公共数据

注意点:
必须在引入Vue之后再引入Vuex
只有需要共享的才放到vuex上, 不需要共享的数据依然放到组件自身的data上
-->
<!--这里就是MVVM中的View-->
<div id="app">
    <grandfather></grandfather>
</div>
<template id="grandfather">
    <div>
        <p>{{this.$store.state.msg}}</p>

        <p>{{this.$store.getters.formart}}</p>
        <father></father>
    </div>
</template>
<template id="father">
    <div>
        <!--4.在使用Vuex中保存的共享数据的时候, 必须通过如下的格式来使用-->
        <p>{{this.$store.state.count}}</p>
        <son></son>
        <son1></son1>
    </div>
</template>
<template id="son">
    <div>

            <input type="text" :value="this.$store.state.count">
            <button @click="add">+1</button>
            <button @click="sub">-1</button>
    </div>
</template>
<template id="son1">
    <div>
        <p>{{this.$store.state.count}}</p>
    </div>
</template>

<script>
    // 2.创建Vuex对象
    const store = new Vuex.Store({
        // 这里的state就相当于组件中的data, 就是专门用于保存共享数据的
        state: {
            msg: "知播渔",
            count:0
        },
        //用于保存修改数据的方法
        mutations:{
            //执行mutations中的
            mAdd(state){
                state.count = state.count + 1 ;
            },
            mSub(state){
                state.count = state.count - 1 ;
            }
        },
        //与vue中的computed属性一样，只计算一次，会缓存下来
        getters:{
            formart:function(state){
                console.log("111");
                return state.msg + "it666"
            }
        }
    });
    // 爷爷组件
    Vue.component("grandfather", {
        template: "#grandfather",
        // 3.在祖先组件中添加store的key保存Vuex对象
        // 只要祖先组件中保存了Vuex对象 , 那么祖先组件和所有的后代组件就可以使用Vuex中保存的共享数据了
        store: store,
        // 爸爸组件
        components: {
            "father": {
                template: "#father",
                // 儿子组件
                components: {
                    "son": {
                        template: "#son",
                        methods:{
                            add:function(){
                                this.$store.commit("mAdd");
                            },
                            sub:function(){
                                this.$store.commit("mSub");

                            }
                        }
                    },
                    "son1":{
                        template:"#son1"
                    }
                }
            }
        }
    });
    // 这里就是MVVM中的View Model
    let vue = new Vue({
        el: '#app',
        // 这里就是MVVM中的Model
        data: {
        },
        // 专门用于存储监听事件回调函数
        methods: {
        },
        // 专门用于定义计算属性的
        computed: {
        },
        // 专门用于定义局部组件的
        components: {
        },
    });
</script>
</body>
</html>
```

### Vue Router

`vue-router`和`v-if/v-show`一样,都是用来切换组件的,与之不同的是通过哈希来切换(#/xxx),且在切换的同时还可以传值

#### 使用方法

1. 定义组件

   ```js
   const one = {
       template:'#one'
   }
   const two = {
       template:'#two'
   }
   ```

2. 定义路由映射关系

   ```js
   const routes = [{
               path: '/one',
               component: one
           },
           {
               path: '/two',
               component: two
           }];
   ```

3. 新建router实例

   ```js
   const router = new VueRouter({
       routes:routes
   })
   ```

4. 将router实例绑定在vue实例

   ```js
   let vue = new Vue({
       el: '#app',
       router:router,
       data: {
   
       },
       methods: {
   
       }
   })
   ```

#### router-link

用来代替a标签,通过`router-link`来设置URL的hash值,name不用写`#`号,通过to属性来设置hash值

```html
<router-link to='/one'>切换到第一个</router-link>
```



默认情况下,渲染`router-link`时是一个`a`标签,如果不想用`a`标签.可以用tag来告诉vue渲染成什么标签

```html
<router-link to='/one' tag='button'>切换到第一个</router-link>
```

创建router实例的时候可以添加`linkActiveClass:xxx`的key来告诉系统将来渲染router-link激活状态使用的类名,通过重写该类名的样式表,可以修改激活样式

#### 路由重定向

```js
        const routes = [
            {
                path: '/',
                redirect: '/one'
            }]
```

#### 参数传递

##### 第一种

1. 在`router-link`的url中使用`/url?key=value&key=value`

```html
<router-link to='/one?name=ll&age=33' tag='button'>切换到第一个</router-link>
```

2. 在`router-link`对应的组件的`created`生命周期方法中通过`this.$router.query`获取对应的参数

```js
const one = {
    template: '#one',
    created:function(){
        console.log(this.$route.query);
    }
}
```

##### 第二种

1. 在路由规则中设置占位符

```js
{
    path: '/two/:key/:key',
        component: two
}
```

2. 在`router-link`中传入对应的参数

```html
<router-link to='/two/ll/88'>切换到第二个</router-link>
```

3. 通过对应组件的`created`生命周期方法中使用`this.$router.params`获取数据

```js
const two = {
    template: '#two',
    created: function () {
        console.log(this.$route.params);
    }
}
```



#### 嵌套路由

1. 注册组件

2. 在路由规则中使用`children`的key来添加子路由

   ```js
               {
                   path: '/one',
                   component: one,
                   children: [{
                           path: '/sub1',
                           component: sub1
                       },
                       {
                           path: '/sub2',
                           component: sub2
                       }
                   ]
               },
   ```

   

3. 在一级路由的组件中添加router-link和router-view

   ```html
   <template id='one'>
       <div>我是one
           <router-link to='sub1'>切换到第一个</router-link>
           <router-link to='sub2'>切换到第二个</router-link>
           <router-view></router-view>
       </div>
   </template>
   ```

   tips:`router-link`中不用写一级路由的名称,也不用写斜杠



#### 命名视图

和匿名插槽一样,在使用多个`router-view`时,那么当路由地址被匹配后,多个`router-view`显示的内容是一样的,如果想要显示不同的内容,需要起名字

```js
{
    path:'/',
        //注意这里加了s
    components:{
        name1:one,
        name2:two
    }
}
```

```html
<router-view name='name1'></router-view>
<router-view name='name2'></router-view>
```



#### Watch 属性

1. watch属性是专门用于监听数据变化的,只要数据变化,就会自动调用数据对应的回调方法

```js
watch: {
    num1: function (newValue, oldValue) {
        console.log(newValue, oldValue);
    },
}
```

2. 用watch监听路由变化

```js
watch: {
    '$route.path':function (newValue, oldValue) {
        console.log(newValue, oldValue);
    },
}
```



### Vue生命周期

#### 创建期间的生命周期方法

##### beforeCreate

调用beforeCreate时仅仅表示Vue实例刚刚被创建出来，此时的data和methods还未被初始化，无法调用

##### created

此时data和methods已经被初始化完毕，最早能访问data和methods的地方

##### beforeMount

根据data和模板生成对应的HTML，还没渲染到界面上

##### Mounted

完成模板的渲染，已经拿到最终的数据

#### 运行期间的生命周期方法

##### beforeUpdate

调用beforeUpdate时，保存的数据被修改时调用

但此时数据被修改，界面还未被更新

##### updated

调用updated时，vue实例中的数据被修改，界面也被同步更新之后就会调用

#### 销毁期间的生命周期方法

##### beforeDestroy

当前组件即将被被销毁，beforeDestroy是我们最后能访问data和methods的的方法

##### destroyed

当前组件已经被销毁，如果不被销毁就不会被调用，不能在访问data和methods



<img src="D:\BaiduNetdiskDownload\Vue核心基础\68-Vue-生命周期方法\images\lifecycle.png" alt="lifecycle" style="zoom:200%;" />

### VUE的特殊特性

#### ref

不推荐用原生的语法获取DOM,原生语法拿到的都是原生DOM

推荐用给DOM添加ref属性,可以通过`$refs`获取组件和原生元素

```html
<p ref="xxx">我是原生</p>
<one ref='myOne'></one>

<script>
    console.log(this.$refs);
    console.log(this.$refs.xxx);
    console.log(this.$refs.myOne);
</script>
```



#### render

默认情况下,组件是通过标签的形式渲染的,渲染到vue的实例控制区中

```js
//在vue实例中添加render的key
render:function(createElement){
    let html = createElement("one");
    return html;
},
```

render和标签的区别在render会直接替换掉控制区,而标签是添加在控制器区



### Vue-Cli

修改webpack配置

添加`vue.config.js`文件在根目录下,vue二次封装的webpack配置

> https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE

```js
const path = require('path');
const webpack = require('webpack');
module.exports = {
	/* 为了方便,对webpack原有属性进行了一层封装,
        如果可以满足需求,就用封装好的
        如果不行可以通过configureWebpack来添加
    */
	outputDir: 'bundle',
	configureWebpack: {
		plugins: [
			new webpack.BannerPlugin({
                banner:'Borhap'
            })
		]
	}
};
```



### 插件plugin

1. 编写组件

2. 添加`index.js`文件,引入组件,添加`install` 的key-function

3. 通过`Vue.extend(组件)`生成一个组件的构造函数

4. new一个组件实例

5. 把组件挂载在一个元素上,把元素插入在界面中

6. `install`对应的是`Vue.use(组件,Options:{})`方法,传入两个参数,后一个参数可以用来传参

   ```js
   Vue.use(Loading, {
     title: '你在说什么'
   })
   ```

   index.js

```js
   import Loading from './Loading.vue'
   
   export default {
     install: function (Vue, Options) {
       // 1.根据组件生成一个构造函数
       const LoadingConstructor = Vue.extend(Loading)
       // 2.创建一个实例对象
       const LoadingInstence = new LoadingConstructor()
       // 3.随便创建一个标签
       const oDiv = document.createElement('div')
       // 4.将标签添加在界面上
       document.body.appendChild(oDiv)
       // 5. 将创建好的实例对象挂载到创建好的元素上
       LoadingInstence.$mount(oDiv)
   
       if (Options && Options.title !== null && Options.title !== undefined) { LoadingInstence.title = Options.title }
     }
   }
   
```

#### 方法

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }// 通过Vue.myGlobalMethod()调用

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }//通过 this.$myMethod()来调用
}
```

