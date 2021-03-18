

Less

1.为什么需要less

1. CSS的大量书写会产生许多没有逻辑的代码，不利于维护和复用
2. CSS本质是一个非程序式的语言

##### Less（Leaner Style Sheets）

CSS预处理器语言，为CSS赋予了动态语言的特性，增加了变量、Mixin、嵌套、函数、运算符等特性。

##### less的使用方法

1.在浏览器直接运行

​	编写less 

​	引入less.js(在  http://lesscss.cn/ 里下载less.min.js文件)

​	用style标签引入（在vscode中好像会语法无法识别）

​	

​	编写less

​	引入less文件，同时引入less.js 

```html
<link rel="stylesheet/less" href="../css/less1.less">
<script src="../js/less.min.js"></script>
```

​	tips:引入js一定一定要less后，只有在服务端有效，如果直接打开html文件则无效



2.预编译less

将less文件转换成css文件

使用vscode的插件Easy less



#### Less代码特性

##### less注释

````less
// 单行注释 不参与编译
/*多行注释 编译后的css文件只有多行注释*/
````

##### less变量

````css
.box1{
    height: 200px;
    width: 200px;
    background: red;
}
.box2{
    height: 200px;
    width: 200px;
    background: red;
    margin-top: 10px;
}
````

```less
/*@变量:赋值*/
@w:200px;
@h:@w;
.box1{
    @c:blue;//局部变量
    height: @w;
    width: @h;
    background: @c;
    @c:pink;//后定义的覆盖先定义的
}
.box2{
    height: @w;
    width: @h;
    background: @c;
    margin-top: 10px;
}
@c:red;//可预解析，box2也可以取到
```

##### less变量插值

````less
//属性和类名都可以用变量替代，但需要用{}变量插值来取
@wi:width;
@size:200px;
@s:box3;
.@{s}{
    @{wi}:@size;
    height: @size;
    background: salmon;
}
````



##### less运算

```css
{   
    width:200px;
    height:200px;
    position: absolute;
    background:blue;
    left: 50%;
    /*需要口算一半的宽高*/
    margin-left:-100px;
    /*只兼容css3的浏览器*/
    transform: translateX(-50%);
    /*css3 新增函数，可以使用calc函数*/
    margin-left:cala(-200px*0.5);
}
```

````less
{   
    width:200px;
    height:200px;
    position: absolute;
    background:blue;
    left: 50%;
    //注意，cala函数去掉了,编译时会自动运算
    margin-left:(-200px*0.5);
}
````

##### less混合

````less
//单独封装一个类，将其混合到后面中
.center(){
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
}
.father{
    width: 300px;
    height: 300px;
    background: palevioletred;
    .center();

    .son{
    width: 200px;
    height: 200px;
    background:skyblue;
    .center();
    } 
}
````

tips:加括号编译后不保留，不加就保留

```less
//带参数混合
//@wid:形参
.center(@wid:300px,@hei:300px){
    width: @wid;
    height: @hei;
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
}
.father{
    background: palevioletred;
    .center(@hei:400px);//混合的指定形参传递参数

    .son{
    background:skyblue;
    .center(200px,200px);
    } 
}
```

##### less可变个数参数

一般情况

```less
.animate(@name,@time,@mode,@delay){
    // 获取全部参数
    transition: @arguments;
}
.box5{
    width: @w;
    height: @h;
    background: darkmagenta;
    .animate(all, 4s, linear, 0s)
}
.box5:hover{
    width: 400px;
    height: 400px;
}
```

限制个数情况

```less
//不限个数
.animate(...){
    // 获取全部参数
    transition: @arguments;
}
//至少一个，后续以此类推
.animate(@name,...){
    // 获取全部参数
    transition: @arguments;
}
```

##### less匹配模式

```less
.triangle(Down,@width,@color){
    width: 0;
    height: 0;
    border-width: @width;
    border-style: solid solid solid solid;
    // border-color: #000 #f00 #0f0 #00f;
    border-color: @color transparent transparent transparent;
}
.triangle(Left,@width,@color){
    width: 0;
    height: 0;
    border-width: @width;
    border-style: solid solid solid solid;
    // border-color: #000 #f00 #0f0 #00f;
    border-color:  transparent @color transparent transparent;
}
.box6{
    //这里的Down和Left如果不写，后面的就会覆盖掉前面的
    .triangle(Down,80px,skyblue);
}
```

通用匹配模式

````less
// @_表示通用匹配模式，无论匹配的哪个代码，都会先执行这里
.triangle(@_,@width,@color){
    width: 0;
    height: 0;
    border-style: solid solid solid solid;
}
.triangle(Down,@width,@color){
    border-width: @width;
    border-style: solid solid solid solid;
    border-color: @color transparent transparent transparent;
}
.triangle(Left,@width,@color){
    border-width: @width;
    border-color:  transparent @color transparent transparent;
}
````

##### less中导入其他less

````less
@import 'xxx.less'
@import 'xxx'//可省略less
````

##### less内置函数

由于底层采用js，故js函数基本都支持

##### less的层级结构

````less
.son{
    //在less中使用伪类hover
    &:hover{
        background: darksalmon;
    }
    background:skyblue;
    .center(200px,200px);
    //less中使用伪元素
    &::before{
        
    }
} 
//大括号内相当于是后代选择器标识
````

##### less中的继承

````less
.center1{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /*
  less中的继承和less中混合的区别
  1.1使用时的语法格式不同
  1.2转换之后的结果不同(混合是直接拷贝, 继承是并集选择器)
  */
  .father:extend(.center1){
    width: 300px;
    height: 300px;
    background: red;
    //.center;
    .son:extend(.center1){
      width: 200px;
      height: 200px;
      background: blue;
      //.center;
    }
  }
````

##### less中的条件判断

````less
.size(@width,@height) when (@width = 100px){
  width: @width;
  height: @height;
}

// (),()相当于JS中的||
.size(@width,@height) when (@width = 100px),(@height = 100px){
  width: @width;
  height: @height;
}

// ()and()相当于JS中的&&
.size(@width,@height) when (@width = 100px)and(@height = 100px){
  width: @width;
  height: @height;
}

//可以用js里的判断函数等
.size(@width,@height) when (ispixel(@width)){
  width: @width;
  height: @height;
}

div{
  .size(100px,100px);
  background: red;
}
````

