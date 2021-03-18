### 面向对象

#### 对象

##### 创建对象

```js
//构造函数
let obj = new Object();
obj.name = 'wokule';
obj.age = 33;
obj.say = function(){
    console.log("hello world");
}
console.log(obj.name);
//构造函数简写
let obj = {};
obj.name = 'wokule';
obj.age = 33;
obj.say = function(){
    console.log("hello world");
}
console.log(obj.name);

//
let obj={
    name:"wokeyi";
    age:"33";
    say:function(){
        console.log("hello world");
    }
```

##### 函数和方法

函数就是没有和其他的类显示的绑定在一起,可以直接调用

方法就是和其他的类绑定在一起,只能通过对象调用

函数和方法里都有this : this就是谁调用当前的方式,this就是谁

函数内部的this输出window.方法输出的是obj

##### 工厂函数

```js
function createPerson(name,age){
    let obj = new Object;
    obj.name = name;
    obj.age = age;
    obj.say= function(){
        console.log("111")
    }
    return obj;
}
```

##### 构造函数

本质是工厂函数的简写

构造函数的函数名称首字母必须大写

构造函数只能通过new调用

```js

function Person(myName,myAge){
    //let obj = new Object;
    //let this = obj;
    this.name = myName;
    this.age = myAge;
    this.say = function(){
        console.log("222")
    }
    //return this;
}
```

1. new Person时,会自动在构造函数中创建一个对象
2. 将对象赋值给this,返回return
3. 用三个等号可以来判断两个函数名称,表示判断两个函数是否存储在同一块内存

```js
let obj1 = new Person("lll","44");
let obj2 = new Person("xxx","12");

console.log(obj1);
console.log(obj2);
console.log(obj1.say === obj2.say);//false
//这里相同的方法存储在了不同的内存中,影响性能
```
以下是优化方法

```js
//1.构造一个全局函数
let mySay =()=>console.log("uiui");
function Person(myName,myAge){
    this.name = myName;
    this.age = myAge;
    this.say = mySay;
}
console.log(obj1.say === obj2.say);//true
//弊端:函数定义为全局函数,占用了全局域的命名
```

```js
//2.做一个对象用来保存函数
let fns = {
    mySay : function(){
        console.log("test")
    }
}
function Person(myName,myAge){
    this.name = myName;
    this.age = myAge;
    this.say = fns.mySay;
}
console.log(obj1.say === obj2.say);//true
```

```js
//3.用prototype来保存构造函数的方法,开发时使用这个
function Person(myName,myAge){
    this.name = myName;
    this.age = myAge;
}
Person.prototype = {
    say:function(){
        console.log("test")
    }
}
console.log(obj1.say === obj2.say);//true
```

1. 存储在prototype中的方法可以被对应构造函数创建出来的所有对象共享

2. prototype处理可以存储方法,还可以存储属性

3. 构造函数中的同名属性和方法优先级高于prototype中的同名属性和方法

4. prototype一般用于存储所有对象都相同的一些属性和方法

5. 如果是对象的特有属性和方法,就存储在构造函数中

6. 构造函数指向原型对象,原型对象的constructor又指向构造函数

```js
//实例对象的__proto__属性指向原型对象
console.log(obj1.__proto__);
//构造函数中的prototype指向原型对象
console.log(Person.prototype);
//原型对象的constructor属性指向构造函数
console.log(Person.prototype.constructor);
/*
{currentType: "人", say: ƒ}
工厂函数.html:51 {currentType: "人", say: ƒ}
工厂函数.html:53 ƒ Object() { [native code] }
*/
```

##### Function函数

构造函数本身的函数Function本身也是一个构造函数,满足上述的关系

![image-20200413101650851](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200413101650851.png)

![image-20200413102524531](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200413102524531.png)

1. Function函数是所有函数的祖先元素
2. 所有构造函数都有一个prototype属性（指向原型对象）
3. 所有原型对象都有一个constructor属性（指向构造函数）
4. 所有函数都是对象
5. 所有对象都有一个 __ proto __ 属性（指向构造函数的原型对象，相当于object.constructor.prototype ）
6. 原型对象的__ proto __普遍指向object.prototype,object原型对象的指向null

![image-20200413152619180](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200413152619180.png)

![img](file:///D:\qqFile\record\532204489\Image\C2C\{638CC6C0-8FFF-9B24-DFBE-D4CCA9C11AAD}.png)

```js
//4.最终版,要记得添加原型对象的回指,即constructor
function Person(myName,myAge){
    this.name = myName;
    this.age = myAge;
}
Person.prototype = {
    //注意这里要手动添加
    constructor:Person;
    say:function(){
        console.log("test")
    }
}
console.log(obj1.say === obj2.say);//true
```

##### this

谁调用就指向谁,默认为window

```js
//bind用于修改this的指定对象
let fn = test.bind(obj,11);//会返回一个函数
fn();
//call用于修改this的指定对象
test.call(obj,22);//会立即调用执行

//apply用于修改this的指定对象
test.apply(obj,[11]);//会立即调用执行,和call的传参格式不同
```

##### 继承

1. 将子类的prototype指向父类的实例对象(原型链方法)

   ```js
   function Person(){
       this.name="???";
       this.age="888";
       this.say= function(){
           console.log("nihc");
       }
   
   }
   function Student(){
       this.num;
       this.score;
       this.study = function(){
           console.log("dididi");
       }
   }
   //Student最初的prototype指向Student的原型对象
   console.log(Student.prototype);
   //Person的实例对象变成Student
   Student.prototype = new Person();
   Student.prototype.costructor = Student;
   
   let stu1 = new Student();
   console.log(stu1.name);
   ```

   缺点,当子类实例化需要传入父类参数时,由于会先执行实例化,后执行对于prototype指针修改,会导致找不到父类的参数,同时会存在实例属性变成原型属性导致属性共享的问题

2. 借用构造函数

```js
function Person(name,age){
    this.name=name;
    this.age=age;
    this.say= function(){
        console.log("nihc");
    }

}
function Student(name,age,score){
    this.score;
    Person.call(this,name,age,score);
    this.study = function(){
        console.log("dididi");
    }
}

let stu1 = new Student(1,2,3);
stu1.say();
console.log(stu1);
```

缺点:由于相当于是在stu的实例上动态添加了属性,当Person将方法变为原型方法后,stu实例就无法从原型对象里获得Person的方法,因为stu中的__ proto __  指向的是Student构造函数的原型对象,而不是Person的原型对象

3.组合继承(缺陷版)

```js
function Person(name,age){
    this.name=name;
    this.age=age;
    // this.say= function(){
    //     console.log("nihc");
    // }
}

Person.prototype = {
    say:function(){
        console.log("nihc");
    }
}
function Student(name,age,score){
    this.score;
    Person.call(this,name,age,score);
    this.study = function(){
        console.log("dididi");
    }
}

//更改Student的原型对象
Student.prototype = Person.prototype;
Student.prototype.costructor = Student;

let stu1 = new Student(1,2,3);
stu1.say();
console.log(stu1);
```

缺点: 给子类的原型对象添加方法时,父类也会能取到这个子类方法,污染了父类原型

4.组合继承终极版

```js
function Person(name,age){
    this.name=name;
    this.age=age;
    // this.say= function(){
    //     console.log("nihc");
    // }
}

Person.prototype = {
    say:function(){
        console.log("nihc");
    }
}
function Student(name,age,score){
    this.score;
    Person.call(this,name,age);
    this.study = function(){
        console.log("dididi");
    }
}

//更改Student的原型对象
//唯一的不同
//Student.prototype = Person.prototype;
Student.prototype = new Person();
// new Person()
Student.prototype.costructor = Student;

let stu1 = new Student(1,2,3);
stu1.say();
console.log(stu1);
```



多态

JS是弱类型语言,不用关注多态



#### ES6对象和类

ES6提供class关键字

```js
        class Person{
            //实例属性
            
            constructor(myName,myAge){
                this.name=myName;
                this.age = myAge;
                //这里相当于直接在类中创建方法
                this.say = function(){
                console.log(this.name,this.age);
            	}
            }
            //实例方法
            //这种相当于在原型对象添加方法
            say(){
                console.log(this.name,this.age)
            }
            //静态属性静态方法必须通过类名调用
            //ES6中不支持用static定义静态属性
            //static num = 666;
            static run(){
                console.log('run');
            }
        }
		//使用这种方式来创建静态属性
		Person.num  = 666;
		//可以使用这种方法给原型对象添加属性
		Person.prototype.type = "人";
        let p  = new Person("zs",11);
        p.say();
        console.log(Person.num);
        Person.run()
```

##### 获取对象相关函数

```js
        let obj  = Object();
        let arr = new Array();
        function Person(){
            //构造函数本质还是用对象
            // let obj = new Object;
            // let this = obj;
            this.name = 'ii';
            this.age = 35;
        }
        let p = new Person();
        //object
        console.log(typeof obj);
        console.log(typeof arr);
        console.log(typeof p);
        //object array person
        console.log(obj.constructor.name);
        console.log(arr.constructor.name);
        console.log(p.constructor.name); 

		//true 判定是不是Person的实例对象
		//判断时.只要Person的原型对象出现在p实例对象的原型链上.都会返回true
        console.log(p instanceof Person);

		//用于判断是否是原型对象
		//判断时.只要Person的原型对象出现在p实例对象的原型链上.都会返回true
		console.log(Person.prototype.isPrototypeOf(p));

		//判断是否包含这个属性
		//原型对象中出现含有时也会返回true
        console.log("name" in p);
		//判断某个类中是否有一个属性
		//只查类,不查原型
		console.log(p.hasOwnProperty("name"));

```

##### 对象增删改查

```js
        //增
        p.zengjia = "新属性";
        p["zengjia2"] = "新属性2";
        p.say = function(){
            console.log("新方法");
        }
        p['say1'] = function(){
            console.log("新方法2");
        }
        //删
        // delete p.name;
        // delete p['name']
        delete p.say1;

        //改
        p.name = "xx";
        p.say = function(){
            console.log("新方法改");
        }
        console.log(p)

```



##### 对象遍历

```js
         class Person{
            //实例属性
            
            constructor(myName,myAge){
                this.name=myName;
                this.age = myAge;
                //这里相当于直接在类中创建方法
                this.say = function(){
                console.log(this.name,this.age);
            	}
            }
            //实例方法
            //这种相当于在原型对象添加方法在key中取不到
            // say(){
            //     console.log(this.name,this.age)
            // }     
        }

        let p = new Person("ll",23)
        for(let key in p){
            console.log(key)//属性方法名
            console.log(p[key])//取值
        }
//for-in遍历的是无序的东西,不适合用于数组
```

##### 对象的解构赋值

```js
        // let obj = {
        //     name:"xx",
        //     age:"34"
        // }
        // let {name,age} = {name:"l",age:34};

        // let {name} = {name:"l",age:34};
        // console.log(name);

        // let {name,age,hh=11} = {name:"l",age:34};
        // console.log(name,age,hh)
        
        //对象解构赋值中,左边的变量名称必须和对象的属性名称一致,才能解构出数据
        let {name,age} = {name:"l",age:34};
```

应用场景

```js
   		//数组
		let arr = [1,3];
        function sum([a,b]){
            return a+b;
        }
        // let res =  sum(arr[0],arr[1]);
        let res = sum(arr)
        console.log(res)

		//对象
        let obj = {
            name:"xx",
            age:"34"
        }
        function say({name,age}){
            console.log(name,age);
        }
        say(obj);
```



##### 深拷贝和浅拷贝

1. 深拷贝:修改新变量的值,不会修改原本的值

   默认情况下基本数据类型都是深拷贝

2. 浅拷贝:修改新变量的值,不会修改原本的值

   默认情况下引用类型都是浅拷贝

对象深拷贝

```js
function Person(){
    this.name = 'ii';
    this.age = 35;
}

let p1 = new Person();
let p2 = new Object();
//assign方法 仅适用于基本数据类型
Object.assign(p2,p1)
console.log(p2)

//自定义递归方法实现深拷贝
class Person {
    name = "xx";
cat ={
    age:3
}
source = [12,3]
}  

let p1 = new Person();
let p2 = new Object(); 
//自定义函数
function deepCopy(target,source){
    //1.遍历拿到source的全部属性
    for(let key in source){

        //2.取出当前遍历到的属性的取值
        let sourceValue = source[key];
        //3.判断是否是引用数据类型
        if(sourceValue instanceof Object){
            //sourceValue.constructor指向对象或数组
            //给target创建数组或对象
            target[key] = new sourceValue.constructor;
            //递归调用
            deepCopy(target[key],sourceValue);

        }
        else{
            target[key] = sourceValue;
        }

    }
}
deepCopy(p2,p1);
console.log(p2);
```

#### 数组高级API

##### 1. 数组遍历

```js
        //1.遍历数组
        let arr = [1,3,5,7,9]
        for(let value of arr){
            console.log(value)
        }
        //数值,数组index,取到的数组
        arr.forEach(function(currentValue,currentIndex,currentArray){
            console.log(currentValue,currentIndex,currentArray);
        })
```

##### 2. 数组查找

```js
        //查到了返回数据索引,查不到返回-1
		let index = 
        arr.findIndex(function (currentValue,currentIndex,currentArray){
           if(currentValue === 5){
               return true;
           }
        })
        //查到了返数值,查不到返回undefined
        let value = 
        arr.find(function(currentValue,currentIndex,currentArray){
            if(currentValue === 10){
                return true;
            }
        })
        console.log(index);//2
		console.log(value);//undefined
```

##### 3. 满足某条件的元素单独放一个数组

```js
        //filter
        let newArr =
        arr.filter(function(currentValue,currentIndex,currentArray){
            if(currentValue % 2 ===0 ){
                return true;
            }
        })
        //map映射
        let newArr2 =
        arr.map(function(currentValue,currentIndex,currentArray){
            if(currentValue % 2 ===0 ){
                return currentValue;
            }
        })
        console.log(newArr);//[8]
        console.log(newArr2);
		//[undefined, undefined, undefined, undefined, 8, undefined]
 
```

##### 4. 遍历的同时删除数组中的元素

```js
        //4.遍历的同时删除数组中的元素

        //注意这里删除会造成数组长度变化,且删除后后面的元素会前移
        // let len  = arr.length-1;
        // for(let i = len; i>=0; i--){
        //     arr.splice(i,1)//从第i个开始删,删一个
        // }

        for(let i = 0; i<=arr.length; i++){
            delete arr[i];//变成空 
        }
        console.log(arr)//[empty × 6]
```

##### 5.数组排序

```js
        let arr1 = ["c","a","b"];
        let arr2 = [3,4,5,2,1];
        let arr3 = ["1231","22","333"];
        let arr4 = [
            {name:"zs",age:34},
            {name:"ls",age:35},
            {name:"ww",age:38},
            {name:"zl",age:37},
        ];

        arr1.sort(function(a,b){
            if(a>b){
                return -1;//通过修改这两个值的正负来调整升序降序
            }
            else if(a<b){
                return 1;//通过修改这两个值的正负来调整升序降序
            }
            else{
                return 0;
            }
        });
        arr2.sort(function(a,b){
                //升序a-b,降序b-a
                return b-a;
            });
        arr3.sort(function(a,b){
            //按字符串长度排序
            return a.length-b.length;//倒序b.length-a.length;
        })
        arr4.sort(function(o1,o2){
            return o1.age-o2.age;//倒序o2.age-o1.age;
        })
        console.log(arr1);
        console.log(arr2);
        console.log(arr3);
        console.log(arr4);
```

##### 6. 字符串方法

```js
        //1.获取长度length
        //2.获取某个索引的字符 [索引]/charAt
        //3.字符串查找 indexOf/lastIndexOf/includes
        //4.字符串拼接 str1 + str2(推荐使用)/str1.concat(str2)
        //5.字符串截取 slice(1,3)索引从1-3,用于数组/substing(1,3)索引从1-3/substr(1,3)从索引1开始截取三个
        //6.字符串切割 arr.join("-")用横线切割数组转为字符串, str.split("-")用-作为分隔符将字符串切割为数组
        //7.ES6判断是否指定字符串开头 str.startWith("")
        //8.ES6判断是否指定字符串结尾 str.endWith("")
        //9.ES6字符串模板 let str = ``;(反引号) 大量文本不用 "" + 来拼接
		//10.字符串替换 str.replace("a","b");生成新的字符串
        let str2 = 
        ` <ul>
        <li>我是第1个li</li>
        <li>我是第2个li</li>
        <li>我是第3个li</li>
         </ul>`;
         let name = "ii";
         let age = 34;
         let arr12 = `我的名字是:${name},我的年龄是:${age}`
         console.log(arr12);

	
```

#### 数据类型

六个基本数据类型

1. Number (包括整数和小数)

2. String(字符串类型)

3. Boolean (True/False)

4. Undefined

5. Null

6. Object

没有属性和方法,一些方法能使用是因为,调用的时候将其包装成对象类型

```js
let str  = new String(str);
```

#### 三种对象

1. 宿主对象:

   浏览器/服务器的运行环境

   常见的有Window Document,所有的BOM和DOM都属于宿主对象

2. 本地对象:

   ECMAScript标准中定义的类(构造函数)

3. 内置对象:

   与宿主无关,无论在浏览器还是服务器中都有的对象

   ECMAScript已经创建好的,不用new

   如:Global,Math,JSON



##### Math内置对象

```js
Math.floor();//向下取整
Math.cell();//向上取整
Math.round();//四舍五入
Math.abs();//绝对值
Math.random();//伪随机数
```

