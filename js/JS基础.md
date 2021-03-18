

#### 浏览器

![img](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/layers.png)

1. **用户界面** - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。

2. **浏览器引擎** - 在用户界面和呈现引擎之间传送指令。

3. **呈现引擎** - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。

4. **网络** - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。

5. **用户界面后端** - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。

6. **JavaScript 解释器**。用于解析和执行 JavaScript 代码。

7. **数据存储**。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

   JS由ECMAScript、DOM、BOM组成

   ECMA（欧洲计算机制造协会） 制定的脚本语言的标准，规定了脚本语言实现的基本内容

   DOM(Document Object Model)：JS操作网页上的元素的API

   BOM(Browser Object Model):JS操作浏览器的部分功能的API

#### JS

##### Js的使用方式

- 在标签内直接写

  ````html
   <div onclick="alert('nisile')">wouale</div>
  ````

- head中写一个<Script>标签

  ````html
      <script>
          //window.onload 界面所有的元素都被加载后
          window.onload =function(){
          var oDiv =document.querySelector("div");
          var text =oDiv.innerText;
          alert(text);}
      </script>
  ````
  
- link引入js文件

##### Js常见的输出方式

```js
alert("滴滴")//除了数字都用单引号或双引号
```
![img](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200330173911310.png)

```js
confirm("哒哒")//除了数字都用单引号或双引号
```
![img](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200330173813200.png)
```js
prompt("啪啪")
```
![img](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200330174041044.png)

````js
    console.log('普通输出');
    console.warn('警告输出');
    console.error("错误输出");
````

![img](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200330202721335.png)

##### Js注意点

JS严格区分大小写

JS语法分号



#### JS语法

#### 常量

1. 整形
2. 浮点(实型)
3. 字符串
4. 布尔

自定义常量

````js
const Num = 666;
````

- ES6新增语法)
- 常量不可被改变

#### 变量

```js
var num ;//定义变量,划分一个内存空间
num = 22;//初始化
```

+ **变量未被初始化时,存储的为undefined**

+ ES6之前,可以不定义直接使用变量

  (原因,js是一个解释型语言,会做一个预解析处理)

ES6定义变量

  ```js
  let num;
  ```

#### 标识符命名

1. 见名知意
2. 驼峰命名

#### 数据类型

1. Number 

   包括整数和小数

2. String

   字符串类型

3. Boolean

   True/False

4. Undefined

5. Null

6. Object

数据类型检测

````js
typeof();
````

#### 数据类型转换

##### 字符串转换

````js
.toString()//转字符串
````

+ undefined/Null不可以使用toString()转换成String
+ .toString()前不可以是常量

```js
//根据传入的数据重新生成一个新的字符串
String();
```

+ undefined/Null可是使用String()转换成String
+ String()前可以是常量

```js
let value =123;
let str = value + "";
```

+ 本质就是调用String()函数

##### 数值类型转换

```js
Number();
```

+ 字符串为空串或空格,转换结果为0
+ Boolean形结果为0/1
+ Null 为0
+ 字符串中不是只有数字,转换后为NaN (Not a Number)
+ NaN属于Number型
+ Undefined位NaN

```js
let str =123;
let num = +str/-str;
```
+ 本质就是调用Number函数,-会改变正负

```js
parseInt();
parseFloat();
```

+ 从左至右提取数值,遇到不是数值的就会停止提取后面的,如果停止时没有提取到,返回**NaN**
+ 无论传入什么类型的数据,它都会将其按字符串处理

##### 布尔类型转换

```js
Boolean();
```

+ 字符串中有内容为true,没有内容为false
+ 数值型,只要不为零和NaN,都为true
+ undefined和null会转化成false

##### 运算

+ 任何数值与字符串相加都会转为字符串拼接
+ 任何数值与字符串相减都会转为数值计算
+ 任何数据与NaN运算都会得到NaN
+ 乘法和减法一致



#### let和Var

通过var定义变量,可以重复定义同名变量

通过var定义变量,可以先使用后定义

通过let定义变量,不可以在相同的定义域内重复定义同名变量

通过let定义变量,不可以先使用后定义

var不区分局部变量和全局变量

let区分局部变量和全局变量

只要出现了let在相同作用域内就不能有相同的变量,即使是var也不行



#### break

break可以用于switch语句和循环结构中

switch语句中break关键字的作用是立即结束当前的switch

循环结构中,break关键字的作用也是立即结束当前循环

````js
let num =123;
switch(num){
    case 123:
        console.log('123');
        break;
    case 124:
        console.log('123');
        break;
    default:
        console.log('other');
        break;
}
//会在第一次执行后立即结束循环
let num = 1;
while(num<=10){
    console.log(num);
    num++;
    break;
}      
````

#### continue

循环结构中,continue关键字的作用是跳过本次循环

#### 数组

```js
       let array = new Array(5);
```

tips:

在javascript中,数组未定义变量的数据类型为undefined

```js
console.log(typeof(array[3]))
//undefined
```

在javascript中,访问数组未定义变量的数据会返回undefined

```js
console.log(array[999])
//undefined
```

在javascript中,数组会自动扩容

```js
let array = new Array(5);
array=["1",'2','3','4','5','6','7'];
console.log(array[6]);
//7
```

在javascript中,数组可以同时存储不同的数据类型

```	js
console.log(array[999]);
array=["1",2,undefined,null,true,'6','7'];
// ["1", 2, undefined, null, true, "6", "7"]
```

js中数组存储空间不连续,采用哈希映射来分配

![image-20200407150817774](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200407150817774.png)

浏览器对js的优化:

如果数组中存储的相同数据,会尽量分配连续的内存空间

如果数组中存储的不同数据,就不会分配连续的内存空间



##### 创建数组的方式

```js
//通过构造函数
let name = new Array(size);//指定大小
let name = new Array();//空数组
let name = new Array(data1,data2,...);

//通过字面量创建数组
let name =[];
let name =[data1,data2,..];
```

##### 数组遍历

```js
array.length//获取长度
```

##### 数据解构赋值

ES6中新增的赋值方式

```js
//let arr = [1,3,5];
//let [a,b,c] =arr;
let [a,b,c] = [1,3,5];
console.log('a = '+ a);
console.log('b = '+ b);
console.log('c = '+ c);
```

tips:

当左边格式和右边的格式完全一致时,可以完全解构

数组解构赋值中,左边的个数和右边的个数可以不同


数组解构赋值中,右边的个数和左边的个数可以不同

```js
        let[a,b = 666,c]=[1]
        console.log('a = '+ a);
        console.log('b = '+ b);
        console.log('c = '+ c);
		//a = 1 ,b = 666, c = undefined
```

解构不到的数据可以添加默认值,如果没有则会被赋值为undefined,

结构赋值中可以用ES6中新增的拓展运算符来打包剩余的数据

拓展运算符: ...

如果使用了拓展运算符,拓展运算符只能使用最后一个变量的在前面

```js
let [a,...b]=[3,4,5];
console.log('a = '+ a);
console.log(b);
//(2) [4, 5]
//将4,5重新组合成一个数组
```



##### 数组常用方法

1. 清空数组

   ```js
   arr.splice(0,arr.length);
   arr = [];
   arr.length = 0;
   ```

2. 数组转换为字符串

   ```js
   arr.toString();
   ```

3. 数组转换成指定格式的字符串

   ```js
   arr.join("+");//元素连接符号
   //1+2+3+4+5
   ```

4. 数组拼接

   ```js
   //数组不能用+拼接
   //1.concat 此方法不会修改原有数组,会生成一个新的
   arr1.concat(arr2);
   
   //2.拓展运算符方式
   let res = [...arr1,...arr2];
   ```

5. 数组翻转

   ```js
   //此方法会修改原有数组
   let res = arr.reverse();
   ```

6. 截取数组的指定范围

   ```js
   // slice方法是包头不包尾(包含起始位置, 不包含结束的位置)
   let res = arr.slice(1, 3)
   ```

7. 查找元素在数组中的位置

   ```js
   // indexOf方法如果找到了指定的元素, 就会返回元素对应的位置
   // indexOf方法如果没有找到指定的元素, 就会返回-1
   // 注意点: indexOf方法默认是从左至右的查找, 一旦找到就会立即停止查找
    let res = arr.indexOf(3);
    let res = arr.indexOf(6);
   // 参数1: 需要查找的元素
   // 参数2: 从什么位置开始查找
    let res = arr.indexOf(3, 4);
   // 注意点: lastIndexOf方法默认是从右至左的查找, 一旦找到就会立即停止查找
    let res = arr.lastIndexOf(3);
    let res = arr.lastIndexOf(3, 4);
    console.log(res);
   ```

8. 判断数组中是否包含某个元素

   ```js
   // 1.我们可以通过indexOf和lastIndexOf的结果, 判断是否是-1即可,不能判断是否有NaN的元素
   // 2.includes函数,可以判断NaN
   let res = arr.includes(4);
   ```

##### slice splice split的区别

slice方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

用于截取一个字符串中的某一部分

```js
const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(31));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"
```

splice用于删除或替换现有元素或者原地添加新的元素来修改数组

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');//插入
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

split方法使用指定的分隔符字符串将一个[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)对象分割成子字符串数组

```js
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');//用空格将字符截断成数组
console.log(words[3]);
// expected output: "fox"

const chars = str.split('');
console.log(chars[8]);
// expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["The quick brown fox jumps over the lazy dog."]
```

##### 选择排序和冒泡排序

```js
        //选择排序 4,3,-5,1
        //每个数据和没有比较过的数据比较 
        // 0和1 0和2 0和3 1和2 1和3 2和3
        let arr = [4,3,-5,1];
        for(let i=arr.length;i>0;i--){//4次循环1从0-3
            for(let j=0; j<i ;j++){
                temp=arr[i-1];
               if(temp<arr[j]){
                   arr[i-1]=arr[j];
                   arr[j]=temp;
                   console.log(arr)
               }
            }
            document.write("<br>")
        }

        //冒泡排序 4,3,-5,1
        //用第一个元素依次和剩余元素比较
        //0和1 1和2 2和3 1和2 1和3 2和3  
        let arr = [4,3,-5,1];
        for(let i=0;i<arr.length;i++){//0,1,2,3
            //内部的循环次数每次减一
            //记住,j在每次的i循环中都会清零从来

            /*
            第一轮i=0,j=3,j>i,执行*1 j=2 执行*2 j=1 执行*3 
            第二轮i=1,j=3,j>i,执行*1 j=2 执行*2
            第三轮i=1,j=3,j>i,执行*1

            第一轮i=0,j=0,j<3,执行*1 j=1 执行*2 j=2 执行*3 
            第二轮i=1,j=0,j<2,执行*1 j=1 执行*2
            第三轮i=1,j=3,j<1,执行*1
            */
            for(let j=0;j<arr.length-1-i;j++){

                if(arr[j]>arr[j+1]){
                   let temp =arr[j];
                   arr[j]=arr[j+1];
                   arr[j+1]=temp;

                }
                console.log(arr)

            }
            // document.write("<br>")

        }
```

##### 二维数组

```js
let arr=[[],[]];
arr[0]=[1,2];
arr[0][1]=1;
```



#### 函数

##### 函数定义方式

ES6之前函数定义的三种方式

```js
//function语句定义
function 函数名称(形参列表){
	封装代码;
}
//函数表达式
let 函数名 = function(形参列表){
	封装代码;
}
//function()构造函数定义(不常用)
let say = new Function(
"x","y","let z = x+y ;return z;"
)
```

默认形参

```js
//ES6设置形参默认值
function test(a = "didi",b = getName()){
	封装代码;
}
```

嵌套定义函数

```js
//js里的函数可以嵌套定义
function test(){
    let say = function(){
        console.log("???"); 
    }
    return say;
}

```

**tips:**

为定义return时默认值为undefined

js中形参和实参的个数可以不同

##### arguments

```js
//arguments 会保存传入的所有参数
//arguments 是一个伪数组
function test(){
	console.log(arguments);
}
```

##### 拓展运算符

​	拓展运算符在等号左边

```js
//拓展运算符在等号左边,将剩余数组打包成一个新的数组
//只能写在最后一个变量的前面
let [a,...b] = [1,3,5];
//expected output : a=1;b=[3,5];
```
​	拓展运算符在等号右边

```js
//拓展运算符在等号右边,将数组解开
let arr1 = [1,3,5];
let arr2 = [2,4,6];
let arr = [...arr1,...arr2];
//expected output : arr = [1,3,5,2,4,6];
```

​	拓展运算符在形参中

```js
function test(...values){
    console.log(values);
}
test(1,2,3,4);
//expected output:valuse=[1,2,3,4];
//形参中也只能写在最后一个参数的前面
function test1(a,...values){
    console.log(a);
    console.log(values);
}
test1(1,2,3,4);
//expected output: a=1; valuse=[2,3,4];
```

##### 匿名函数

1. 匿名函数就是没有名称的函数

   ```js
   function(){
   	console.log("???")
   }
   ```
   
   不能只定义不使用
   
2. 使用场景
   ```js
//1.作为其他函数的参数
   function test(a){
       a();
   }
   test(
       function(){
       console.log("???");
   }
   );
   
   //2.作为其他函数的返回值
   function test(){
       return function(){
           console.log("???");
       }
   }
   //3.作为一个立即执行的函数
   (function(){
       console.log('???');
   })();
   	//在函数后加上括号可立即执行,在匿名函数中需要用一个圆括号把函数体包起来
   	//也叫自调用函数
   ```

##### 箭头函数

ES6中新增的定义函数的方式

目的:简化定义函数的代码

```js
let 函数名称 = (形参列表) =>{
	封装的代码
}
```

```js
//e.g
let say3 = (name) =>{
    console.log("xii" + name);
} 
```

tips:

箭头函数中如果只有一个形参,圆括号可以省略

```js
let say3 = name =>{
    console.log("xii" + name);
} 
```

箭头函数中,如果只有一句代码,大括号也可以省略

```js
let say3 = name => console.log("xii" + name);
```

##### 递归函数

do-while

```js
let pwd=-1;
do{
    pwd = prompt("输入密码");
}while(pwd!=="123456")

    alert("欢迎")

//do-while 先执行循环体里的结构,再判定条件
//pwd=-1时,while内为true,pwd=123456时,pwd!==123456这个条件为假,终止循环
```

递归:自己调用自己

```js
let login = () =>{
    let pwd = prompt("?");
    if(pwd!=="123456"){
        login();
    }
}
login();
```



##### 作用域

1. 在js中{ }外面作用域称为全局作用域
2. 在js中函数后{ }的作用域称为局部作用域
3. 在ES6中只要没有和函数结合在一起的,都被称为块级作用域
4. 块级作用域中,用var定义的变量是全局变量
5. 块级作用域中,用let定义的变量是局部变量
6. 局部作用域中,用无论是let还是var定义的变量都是是局部变量
7. 无论在哪个作用域中,省略前面的let 或 var的变量都是全局变量
8. 定义变量尽量不要省略前面的let或var



##### 作用域链

###### ES6之前

1. ES6之前没有let

2. ES6之前没有块级作用域,只有全局作用域和局部作用域

   1. 全局作用域就是0级作用域

   2. 定义函数开启的作用域就是1级/2级/3级...作用域

   3. js会将这些作用域链接在一起,形成一个链条

      ```js
      //全局作用域 0级
      var num = 123;
      function test(){
          //1级
          var num = 456;
          function test2(){
              //2级
              var num = 789;
              console.log(num);
          }
      }
      //expected output: 789
      ```

   作用域链中变量的查找规则    自内向外  如果到0级都没找到就报错



###### ES6之后

1. ES6新增let变量

2. ES6新增了块级作用域,还有全局作用域和局部作用域

3. 对块级作用域来说,如果用let定义变量,则和局部作用域没有差别,都是局部变量

   1. 块级作用域也参加到作用域链中

      ```js
      //全局作用域 0级
      let num = 123;
      {	//块级作用域 1级
          function test(){
              //1级 => 2级
              let num = 456;
              function test2(){
                  //2级 =>3级
                  let num = 789;
                  console.log(num);
              }
          }
      }
      
      ```

      作用域链中变量的查找规则    自内向外  如果到0级都没找到就报错



##### 函数预解析

```js
test();
function test(){
	 console.log("xii" + name);
}//会被预解析,可以提前调用
//预解析后
function test(){
	 console.log("xii" + name);
}
test();
//--------------------------------
test();
//函数表达式
var test = function(){
	 console.log("xii" + name);
}//只有变量会被预解析,函数不会被预解析,会报错test is not a function

//--------------
test();
//箭头函数
let test = () =>{
     console.log("xii" + name);
}//不会被预解析,会报错 test is not defined
```

```js
//练习1
if(true){
    function demo(){
        console.log("小朋友,你是否有很多的问号?");
    }
}else{
    function demo(){
        console.log("小问号,你是否有很多的朋友?");
    }
}
demo();
//预解析
//在ES6前没有块级作用域,因此这两个函数属于全局作用域
function demo(){
    console.log("小朋友,你是否有很多的问号?");
}
function demo(){
    console.log("小问号,你是否有很多的朋友?");
}
if(true){
    
}else{

}
demo();
/*
后定义的覆盖先定义的
因此理论上的expected output是第二个: 小问号,你是否有很多的朋友?
但在高级浏览器中,不会对{}中定义的函数进行提升,因此会保留原来的格式
只有在低级浏览器中,才会按预解析来输出第二个,比如ie
*/
if(true){
    function demo(){
        console.log("小朋友,你是否有很多的问号?");
    }
}else{
    function demo(){
        console.log("小问号,你是否有很多的朋友?");
    }
}
//expected output:小朋友,你是否有很多的问号?
```

```js
//练习2
console.log(value);
var value = 123;
function value(){
    console.log("fn value");
}      
console.log(value);

//预解析
var value;
function value(){
    console.log("fn value");
}    
//变量名称和函数名称同名,那么函数的优先级高于变量,所有先执行value函数
//开发中千万不要重名
console.log(value);
value = 123;
console.log(value);//就近原则

/*expected output: 
function value(){
		console.log("fn value");
}
123
*/
```

