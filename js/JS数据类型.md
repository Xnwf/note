### JS数据

JS中有七种内置类型：

undefined null number string boolean object symbol(ES6)

引用数据类型：Object

基本数据类型: 剩下六个

```javascript
typeof(null) //object 陈年老bug
typeof(array) //object
typeof(function) //object
```

#### 假值

undefined

null

false

+0 -0

NaN

""

#### == 和===

==允许在比较的时候进行强制类型转换

===不允许在比较的时候进行强制类型转换



##### 字符串和数字

```javascript
var a = 42;
var b = "42";

a == b //true
a === b //false
```

如果type(x)是数字,type(y)是字符串,返回x== ToNumber(y)的值

如果type(x)是字符串,type(y)是数字,返回ToNumber(x) == y的值

##### 布尔型和其他类型

```javascript
var a = 42;
var b = ture;

a == b //false
a === b //false
```

如果type(x)是布尔型,返回ToNumber(x)==y 的值

如果type(x)是布尔型,返回x==ToNumber(y)的值

##### undifined和null

```javascript
var a = null;
var b = undefined;

a == b //true
a === b //false
```

如果x是null,y是undefined，返回true

如果y是null,x是undefined，返回true

##### 对象和非对象

```javascript
var a = null;
var b = undefined;

a == b //true
a === b //false
```

如果type(x)是字符串或数字,type(y)是对象,则返回x==ToPrimitive(y)

如果type(x)是对象,type(y)是字符串或数字,则返回ToPrimitive(x)==y

##### 一些奇奇怪怪

```javascript
[ ] == ![ ]//true 根据ToBoolean 变成 [ ] == false
2 == [2]//true [2]=>"2"=>2
"" == [null]//true [null]=>[""]=>""
0 == "\n"//true 
```

