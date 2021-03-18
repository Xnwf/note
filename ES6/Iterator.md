### Iterator

Iterator又叫做迭代器，是一种接口，是一种标准规范

ES6中Iterator接口主要提供for...of消费

for...of 语句创建一个循环来迭代可迭代的对象，在ES6中引入for...of循环以代替for...in forEach()，并支持Iterator循环

Array，Map，Set，String，TypedArray，函数的arguments对象，NodeList对象数据类型都实现的Iterator接口

对象无法用for...of遍历



#### Maps(映射)

Map 对象就是保存 key-value(键值) 对。对象和原始值可以用作 key(键)或 value(值)。Map 对象根据其插入方式迭代元素。换句话说， `for...of` 循环将为每次迭代返回一个 key-value(键值) 数组。



#### Set(集合)

类似于数组，但成员的值都是唯一的，没有重复的值。

#### Iterator
```javaScript
//具有Iterator规范的数据类型都有一个如下属性
let arr = [1,2,3];
for(let value of arr){
console.log(value);
}//1,2,3
let i = arr[Symbol.iterator]()
console.log(i);//Array Iterator {}
console.log(i.next());//{value: 1, done: false}
console.log(i.next());//{value: 1, done: false}
console.log(i.next());//{value: 1, done: false}
console.log(i.next());//{value: undefined, done: true}
```

#### Iterator实现

```javascript
class MyArray{
    constructor(){
        for (let i = 0; i < arguments.length; i++) {
            this[i]=arguments[i]    
        }
        this.length = arguments.length
    }   
    [Symbol.iterator](){
        let index = 0;
        let that = this;
        return {
            next(){
                if(index < that.length){
                    return {value:that[index++],done:false}
                }
                else{
                    return {value:that[index],done:true}
                }

            }
        }
    }
}
```

#### 应用场景

1. 解构赋值

   解构时应用的就是Iterator的next方法进行结构赋值的

2. 拓展运算符

   拓展运算符中