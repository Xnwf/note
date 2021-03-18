# TS

1. 什么是TypeScript(TS)？
   TypeScript简称TS
   TS和JS之间的关系其实就是Less/Sass和CSS之间的关系
   就像Less/Sass是对CSS进行扩展一样, TS也是对JS进行扩展
   就像Less/Sass最终会转换成CSS一样, 我们编写好的TS代码最终也会换成JS

2. 为什么需要TypeScript?
   因为JavaScript是弱类型, 很多错误只有在运行时才会被发现
   而TypeScript是强类型, 它提供了一套静态检测机制, 可以帮助我们在编译时就发现错误
   ... ...

3. TypeScript特点
支持最新的JavaScript新特特性
支持代码静态检查
支持诸如C,C++,Java,Go等后端语言中的特性
(枚举、泛型、类型转换、命名空间、声明文件、类、接口等)



## 数据类型

在ts中可以直接编写js

- ts支持类型注解

- 定义number类 `let val:number;`

- 数组定义
  - 定义数组 `let val:Array<number>`
  - 定义数组`let val:string[]`
  - 定义联合类型 `let val:(number|string)[]`
  - 定义任意类型`let val:any[]`
  
- 元组类型
  - 数组的扩展
  - `arr:[string,number,boolean]`
  - 指定元素必须按指定顺序
  
- 枚举类型

  - ```typescript
    enum Gender{
        Male = 6,
        Female
    }
    // Gender变量中只能保存Male/Female
    let val:Gender
    val1 = Gender.Male
    val2 = Gender.Female
    console.log(Gender.Male)//6
    console.log(Gender.Female)//7
    console.log(Gender[0])
    ```

  - 注意点:

    -  Ts中枚举类型的底层实现的本质是数值类型,所以赋值一个数值不会报错\
    - 枚举类型的取值默认是从上至下从0开始递增的
    - 虽然默认是从零开始递增的,但是是可以手动指定的
    - 如果手动指定了前面枚举的值,后面的枚举的值会根据前面的值来递增
    - 如果指定后面枚举的值,那么前面枚举的值会从0开始,不受影响
    - 我们可以同时修改多个枚举的取值,如果同时修改多个,那么修改的是什么,最后就是什么
    - 可以枚举值拿到对应的数字
    - 可以通过数字拿到对应的枚举值

- any类型

  - 表示任意类型,当我不清楚某个具体的类型的时候使用any类型
  - 用于定义一些通用性比较强的标了
  - 在ts中任何数据类型的值都可以赋值给any类型

- void类型

  - 表示没有任何类型,一般用于函数的返回值

  - 在ts中只有null和undefined可以赋值给void类型

  - ```typescript
    function test():void{
    }
    ```

  - null和undefined是所有类型的子类型,因此可以赋值给任意类型

- never

  - 表示那些永不存在值的类型

  - 一般用于抛出异常和根本不可能有返回值的函数

  - ```typescript
    function test():never{
        throw new Error('xxx')
    }
    function test():never{
        while(true){}
    }
    ```

- object类型

  - 表示一个存储对象的数据类型

- 类型断言

  - 和其他变成语言的类型转换很像

  - 比如我们拿到一个any类型变量,但我们知道里面保存的是字符串,此时我们可以通过类型断言告诉编译器该变量是一个字符串类型,此时我们就可以通过类型断言将any类型转换为string类型

  - ```typescript
    // 方式一
    let str:any = 'it'
    let len = (<string>str).length
    // 方式二
    let len = (str as string).length
    ```

  - 在开发中推荐使用as进行类型断言

    - 因为第一种方式有兼容性问题,在使用到jsx时兼容性不是很好
  


## 变量声明 解构与展开

let const

数组解构

对象解构

数组展开

对象展开

``` js
let input = ['2','1','4','4']
let [one,two,...rest] = input
console.log(one); // outputs 2
console.log(one); // outputs 1
console.log(rest); // outputs ['4','4' ]
```



## 索引签名

索引签名用于描述那些“通过索引得到”的类型，比如arr[10]或obj["key"]

- 用于限定key的数据类型

```typescript
interface FullName {
    [propName:string]:string
}
let obj:FullName = {
    // 注意点: 只要key和value满足索引签名的限定即可, 无论有多少个都无所谓
    firstName:'Jonathan',
    lastName:'Lee',
    // middleName:false // 报错
    // false: '666' // 无论key是什么类型最终都会自动转换成字符串类型, 所以没有报错
}
```

- ### 只读属性

  - 对象创建后就不能被修改了

  - ```typescript
    interface FullName {
        firstName:string
        readonly lastName:string // 只读
    }
    ```

  - 只读数组

  - ```typescript
    // let arr2:Array<string> = ['a', 'b', 'c'];
    let arr2:ReadonlyArray<string> = ['a', 'b', 'c'];
    ```

## 接口
- 接口类型

  - 可以约束数据类型

  - ```typescript
    interface FullName{
        firstName:string
        lastName:string
    }
    // 需求: 要求定义一个函数输出一个人完整的姓名, 这个人的姓必须是字符串, 这个人的名也必须是一个字符
    function say({firstName, lastName}:FullName):void {
        console.log(`我的姓名是:${firstName}_${lastName}`);
    }
    ```

  - 如果使用接口来限定了变量或形参,在给变量或形参赋值的时候,赋值必须和接口一模一样,多一个少一个都不行

    - 解决方法

    - ```typescript
      // 少几个
      interface FullName{
          firstName:string
          lastName:string
          middleName?:string // 可选属性,可写可不写,添加个问号
      }
      ```

    - ```typescript
      // 多几个
      
      // 方式一: 类型断言
      say({firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'} as FullName);
      // 方式二: 使用变量
      let obj = {firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'};
      say(obj);
      // 方式三: 使用索引签名
      interface FullName{
          firstName:string
          lastName:string
          middleName?:string
          [propName:string]:any
      }
      say({firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc', 123:123, def:"def"});
      ```

### 函数接口

我们除了可以通过接口来限定对象以外, 我们还可以使用接口来限定函数

```typescript
interface SearchFunc {
  (//参数1   限定  , 参数2      限定   ): 返回值限定
  (source: string, subString: string): boolean;
}
```

tips:因为函数本身就是一个对象,因此可以给函数添加属性

```typescript
interface SumInterface {
    (a:number, b:number):number
}
let sum:SumInterface = function (x:number, y:number):number {
    return x + y;
}

// 混合类型接口
// 约定的内容中既有对象属性, 又有函数 
// 要求定义一个函数实现变量累加

// 接口约束 要求
interface CountInterface {
    // 要求
    ():void
    count:number
}
let getCounter = (function ():CountInterface {
    /*
    CountInterface接口要求数据既要是一个没有参数没有返回值的函数
                              又要是一个拥有count属性的对象
    fn作为函数的时候符合接口中函数接口的限定 ():void
    fn作为对象的时候符合接口中对象属性的限定  count:number
    * */
    let fn = <CountInterface>function () {
        fn.count++;
        console.log(fn.count);
    }
    fn.count = 0;
    return fn;
})();
```

### 接口的继承

```typescript
interface LengthInterface {
    length:number
}
interface WidthInterface {
    width:number
}
interface HeightInterface {
    height:number
}
interface RectInterface extends LengthInterface,WidthInterface,HeightInterface {
    // length:number
    // width:number
    // height:number
    color:string
}
```





## 函数

```typescript
// 命名函数
function say1(name:string):void {
    console.log(name);
}
// 匿名函数
let say2 = function (name:string):void {
    console.log(name);
}
// 箭头函数
let say3 = (name:string):void =>{
    console.log(name);
}
```

### 完整格式

```typescript
// 函数定义
let AddFun:(a:number, b:number)=>number;
// 根据定义实现函数
AddFun = function (x:number, y:number):number {
    return x + y;
};

// 简写
let AddFun:(a:number, b:number)=>number =
    function (x, y) {
        return x + y;
    };
```

### 函数声明

```typescript
// 先声明一个函数
type AddFun = (a:number, b:number)=>number;
// 再根据声明去实现这个函数
let add:AddFun = function (x, y) {
    return x + y;
};
```

### 函数重载

函数的重载就是同名的函数可以根据不同的参数实现不同的功能

```js
// 定义函数的重载
function getArray(x:number):number[];
function getArray(str:string):string[];
// 实现函数的重载
function getArray(value:any):any[] {
    if(typeof value === 'string'){
        return value.split('');
    }else{
        let arr = [];
        for(let i = 0; i <= value; i++){
            arr.push(i);
        }
        return arr;
    }
}
```

### 可选和默认参数

```js
// 可选参数可以配置函数重载一起使用, 这样可以让函数重载变得更加强大
function add(x:number, y:number):number;
function add(x:number, y:number, z:number):number;
function add(x:number, y:number, z?:number) {
    return x + y + (z ? z : 0);
}
//与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。 
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

```



## 泛型

```typescript

let getArray = <T>(value:T, items:number = 5):T[]=>{
    return new Array(items).fill(value);
};
// 注意点: 泛型具体的类型可以不指定
//         如果没有指定, 那么就会根据我们传递的泛型参数自动推导出来
let arr = getArray<string>('abc');
let arr = getArray<number>(6);

```

