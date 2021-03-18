# 快速入门
### 初始化

连接服务器`mongo`

查看服务器具有数据库`show dbs`

创建数据库 `use testDB`

查看数据库中集合 `show collections`

创建集合  `db.createCollection('xxx')`

![image-20210108095106678](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210108095106678.png)

### 插入

插入单条数据`db.xxx.insert({name:'xxx',age:xx})`

插入多条数据`db.person.insert([{name:'xxx',age:xx},{name:'xxx1',age:2}])`

![image-20210108095703333](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210108095703333.png)

### 删除

删除集合`db.xxx.drop()`

删除数据库 `db.dropDatabase()`

![image-20210108095916293](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210108095916293.png)

### 查询

查询某一集合所有数据`db.xxx.find()`

基本概念

### 主键

每个文档被添加到集合中后,MongoDB会自动为其添加一个主键

- 默认情况下文档主键是一个ObjectId类型的数据
  - ObjectId类型是一个12个字节字符串
    - 4字节是存储这条数据的时间戳
    - 3字节是存储这条数据的那台电脑的标识
    - 2字节是存储这条数据的MongoDB的进程id
    - 3字节是计数器

为什么使用ObjectId作为主键

因为MongoDB支持横向扩展的数据库

- 横向:添加服务器的个数(分布式)
- 纵向:提升服务器的配置

分布式数据库指把数据库安装在多台电脑上,然后把多台电脑组合成一个完整的数据库

通过不断同步的方式,让多台服务器保存同样的数据,用户请求时,派发给不同的服务器处理

如果使用递增主键,多台电脑可能会导致主键重复

在插入数据时,如果插入内容包括`{_id:xxx}`可以自己指定主键,甚至可以采用json文档作为当前文档的主键


# 详细操作
## 写入

```js
db.<collection>.insertOne({<document>})//如果集合不存在,则会自动创建一个集合
db.<collection>.save({<document>})//如果集合不存在,则会自动创建一个集合

//insertOne主键重复会报错,save则不会报错,而会用新的数据直接覆盖掉原来的数据

db.<collection>.insertMany([<document>,<document>...],{
    writeConcern:<document>,//安全级别
    ordered:<boolean>//是否按照顺序写入,不按顺序会自动优化
})

db.<collection>.insert([<document>,<document>...]/<document>,{
    writeConcern:<document>,//安全级别
    ordered:<boolean>//是否按照顺序写入,不按顺序会自动优化
})
```



## 查询

### 等于

```js
db.<collection>.find(
	<query>,//相当于where
    <projection>//相当于select from
)
//默认是and关系,没有顺序要求
db.person.find({name:'ls',age:20})

//如果某个文档的某个字段的取值又是一个文档,那么在在判断的时候可以通过'字段.文档属性'名称的方式来判断
db.person.insert(
[
{name:'zs',age:17,book:{name:'HTML',price:66}},
{name:'ls',age:128,book:{name:'JS',price:11}},
{name:'ww',age:19,book:{name:'css',price:22}}
])
db.person.find({'book.name':'HTML'})

db.person.find({},{_id:0})// 如果不想查询某个字段就可以指定这个字段的投影取值为0
db.person.find({},{_id:0,name:1,age:1,book:1}) // 如果想查询,就可以指定这个字段的投影取值为1
db.person.find({},{_id:0,name:1,age:1,book:0}) //会报错
db.person.find({},{_id:0,book:0}) // 默认为1,除了_id以外,其他字段不能同时出现0和1,
```

### 比较运算符查询

```js
db.person.find()
db.person.find({name:'zs'}) // 默认是相等
db.person.find({name:{$eq:'zs'}}) // 等于
db.person.find({age:{$gte:19}}) // 大于
db.person.find({age:{$lt:19}}) // 小于
db.person.find({age:{$ne:19}}) // 不等于 判断时没有该字段时也是视为不等于
db.person.find({name:{$in:['zs','ls']}}) // 等于其中一个
db.person.find({name:{$nin:['zs','ls']}}) // 不等于其中的任意一个的值
```

### 逻辑运算符

```js
db.person.find({age:{$eq:19}}) // 等于

// not与ne的用法基本一致
db.person.find({age:{$not:{$eq:19}}}) // not 等于
db.person.find({age:{$ne:19}}) // 等于

// and与下面这种查询方式基本一致
db.person.find({$and:[{name:'zs'},{age:{$lt:18}}]}) // and
db.person.find({name:'zs',age:{$lt:18}})

// or 和 nor 基本与in的使用点一致
db.person.find({name:{$in:['zs','ls']}})
db.person.find({$or:[{name:'zs'},{name:'ls'}]})// or
db.person.find({$nor:[{name:'zs'},{name:'ls'}]})// nor
```



### 字段操作符

```js
// exists 查询文档中某一字段是否存在
db.person.find({gender:{$exists:true}})

// 配合$ne/$nin/$nor/$not 清理不包含该字段的数据
db.person.find({gender:{$exists:true}})
db.person.find({$and:[{gender:{$ne:'男'}},{gender:{$exists:true}}]})
db.person.find({gender:{$ne:'男',$exists:true}})

// type 查询文档中某一字段的数据类型
db.person.find({age:{$type:'string'}})
```



### 数组操作符

```js
// $all 查询数组中包含中所有指定值的文档
// 查询 tags 中包含h2 和 j2 的文档
db.getCollection("person").find({tags:{$all:['h2','j2']}})

// $elemMatch 查找数组中完全符合条件的文档
db.school.find({students:{$elemMatch:{name:'ww',age:18}}})
```



### 运算操作符

```js
// 通过正则进行匹配
db.getCollection('person').find({name:{$regex:/^z/,$options:'i'}})
db.getCollection('person').find({name:{$in:[/^z/i,/^l/i]}})
```



### 兼容JS

```js
// 需求 : 向一个collection中添加n个文档
var arr = [];
for(var i = 0; i < 100; i++){
    arr.push({name:'no.'+i,age:18+i})
}
db.person.insertMany(arr)
```



### 文档游标

执行完find方法后,会有一个返回值,该返回值就是文档游标,即该数据集合的地址指针

文档游标中的常用方法:

`hasNext()`:是否还有下一个外挡

`next()`:去除下一个文档

`forEach()`:依次取出所有文档

注意点: 通过文档游标遍历完所文档后,系统会在10分钟后自动关闭当前游标,如果不想自动关闭,我们可以通过`noCursorTimeout`函数来保持游标一直有效,如果想手动关闭游标,我们也可以通过close函数来手动关闭游标

```js
var cursor = db.person.find().noCursorTimeout()
while(cursor.hasNext()){
    printjson(cursor.next())
}
cursor.forEach(printjson)
cursor.close()
```



#### 分页方法

```js
var cursor = db.person.find()
cursor.limit(5)//取出前n个数据
cursor.skip(5)//跳过前n个数据
// tips: 可以直接在find后调用limit和skip,MongoDB支持链式调用
// tips: 在链式调用的时候无论skip在前面还是后面,都会先于limit执行
cursor.skip(5).limit(5)
```



#### 排序函数

默认情况下,find方法只会返回100个文档,通过limit方法可以查看更多

```js
var cursor = db.person.find()
// 可以传入多个字段, 当前一个字段出现相同的值,会按后一个字段排序
cursor.sort({age:1})//升序
cursor.sort({age:-1})//降序
// sort和limit/skip一起使用时优先执行sort
```



#### 统计函数

统计当前的数据个数

```js
cursor.limit(6).count({applySkipLimit:true})
// count 函数可以寄售一个applySkipLimit参数,通过该参数设置在统计时是否忽略Skip和Limit
// 使用find查询时没有指定查询条件,那么在一台电脑上是准确的,但在分布式上统计的结果不一定准确
// 只要需要使用count统计个数,那么在查询时一定要加上条件,这样无论在什么环境下都是准确的
```



## 更新

### save

用于添加一个新文档或覆盖文档

- 当没有指定文档_id时就是新增
- 指定的_id已经存在于集合中时就是覆盖



### update

> update(<fliter>,<field>,<options>)

默认情况下直接覆盖原有数据,只会更新满足条件的第一条文档,如果在第二个参数中指定了_id,那么必须保证和指定的\_id保持一致,否则会报错,如果需要使用update就不要指定\_id

- 如果想要更新所有满足条件的文档,就可以指定第三个参数为`multi:true`
- 如果指定了multi,就要在第二个参数中使用更新操作符

##### 1. `$set` 更新字段

```js
db.getCollection('person').update({name:'no.18'},{$set:{score:99.9}},{multi:true})

db.getCollection('person').update({name:{$regex:/^no/}},{$set:{score:99.9}},{multi:true})
```

- 更新文档字段

```js
db.person.update({name:'ls'},{$set:{'book.name':'xxx'}})
```

- 更新数组字段
  - 如果操作的索引不存在,那么也会自动更新
  - 如果被操作的索引没有数据,会用null自动填充

```js
db.person.update({name:'ls'},{$set:{'tags.0':'v2'}})
```



##### 2. `$unset` 删除字段

- 删除时,后面设置任何值都可以

```js
db.person.update({name:'no.0'},{$unset:{'score':''}})
```

- 删除文档字段

```js
db.person.update({name:'ls'},{$unset:{'book.price':''}})
```

- 删除数组中的字段
  - 不会修改数组长度,而是会用null替换掉内容

```js
db.person.update({name:'ls'},{$unset:{'tags.4':''}})
```



#####  3. `$rename` 修改字段名称

- 如果修改的是文档中的字段,必须写上层级关系
- 如果要操作的字段不存在,那么不会做任何操作
- 如果命名后的名称已经存在了,那么已经存在的字段就会被删除掉
- 不能通过rename操作数组中的字段

```js
db.person.update({name:'ls'},{$rename:{'name':'myName'}})
db.person.update({name:'ls'},{$rename:{'book.name':'book.bookName'}})
db.person.update({name:'ls'},{$rename:{'name':'myName'}})
```

-  可以将外层的字段,转移到内层的文档中

```js
db.person.update({myName:'ls'},{$rename:{age:'book.age'}})
```

- 将内层字段转到外层字段中

```js
db.person.update({myName:'ls'},{$rename:{'book.age':'age'}})
```



#####  4. `$inc `  `$mul ` 加减乘除某个字段的值

- 如果操作的字段不存在,会自动新增
  - 如果是`$inc` 那么不仅会新增,而且会将操作的值赋给新增的字段
  - 如果是`$mul`不会给新增字段赋值,用0填充
  - 二者只能操作数值类型

```js
db.person.update({myName:'ls'},{$inc:{age:5}})
db.person.update({myName:'ls'},{$mul:{age:2}})
```



#####  5. `$min` `$max` 用指定的值和原有的值比较,看保留哪个

- 如果操作的字段不存在,会自动新增,会将操作的值赋给新增的字段
- 这两个字段不仅能操作数值,而且只要可以比较的都可以操作
- 不是相同的数据类型也可以进行比较,大小规则见下表

```js
db.person.update({myName:'ls'},{$min:{age:2}})
db.person.update({myName:'def'},{$max:{name:'cde'}})
db.person.update({myName:'ls'},{$max:{age:null}})

Null
Number(ints,longs,doubles,decimals)
Symbol,String
Object
Array
BinData
ObjectId
Boolean
Date
Timestamp
Regular Expression
```



##### 6. `$addToSet` 向数组字段中添加元素

- 如果操作元素不存在,那么会自动新增,并且将操作的值赋给新增的数组字段
- 如果添加的元素已经存在了,就不会添加了,会自动去重
- 如果添加的文档/数组类型,那么必须一模一样才会去重
- 如果往数组字段中添加的是数组,默认会将整个数组作为一个元素添加进去,如果不想作为一个整体,那么必须使用`$each`来添加

```js
db.person.update({myName:'ls'},{$addToSet:{tags:'???'}})

db.person.update({myName:'ls'},{$addToSet:{tags:['2','1']}})
db.person.update({myName:'ls'},{$addToSet:{tags:{$each:['2','1']}}})
```



##### 7. `$push`向数组字段中添加元素

- 与`addToSet`类似,但不会自动去重

```js
db.person.update({myName:'ls'},{$push:{tags:'???'}})
```

##### 8. `$pop`从数组字段中的头或尾部删除元素

- 值为1时从数组最后一个开始删除
- 值为-1时,从数组第一个开始删
- 通过pop删除数组中的元素,哪怕数组已经删空了,也会保留空的数组

```js
db.person.update({myName:'ls'},{$pop:{tags:1}})
```

##### 9. `$pull`从数组字段删除匹配到的元素

- 可以通过值/正则表达式匹配需要删掉的元素
- 如果要删除的元素是个数组,必须要一模一样才能删除
- 如果要删除的元素是一个文档,不用一模一样也可以删除

```js
db.person.update({myName:'ls'},{$pull:{tags:null}})
db.person.update({myName:'ls'},{$pull:{tags:/^v/i}})
```

##### 10. `$pullAll`删除匹配的多个元素

- 如果要删除的元素是个数组,必须要一模一样才能删除
- 如果要删除的元素是一个文档,也必须一模一样

```js
db.person.update({myName:'ls'},{$pull:{tags:['html','js']}})
```



##### 11. $和\$[]更新数组中满足条件的特定元素

`$`用于复用上面的筛选条件

`$[]`可以更新某个数组中所有的元素

```js
db.person.update(
    {myName:'ls',tags:'js'},
    // 这里的tags.$复用了上面fliter中的筛选条件
    {$set:{'tags.$':'JavaScript'}}
)

// 更新数组中的所有元素
db.person.update({myName:'ls'},{$set:{'tags.$[]':'one for all'}})
```



## 删除

### remove

> db.<collection>.remove(<query>,<options>)

1. 删除所有满足条件的值

   - 和update不同,remove方法会默认删除所有满足条件的数据

   - ```js
     db.person.remove({name:/^no/})
     ```

2. 删除满足条件的第一个

   - 添加options ,`justOne:true`

   - ```js
     db.person.remove({name:/^no/},{justOne:true})
     ```

3. 删除所有文档

   - ```js
     db.person.remove({})
     ```



## 聚合

1. 什么是聚合操作
   - 通过一个方法完成一系列的操作
   - 在聚合操作中,每一个操作我们称之为一个阶段
   - 聚合操作会将上一个阶段处理结果传给下一个阶段继续处理
   - 所有阶段都处理完毕后会返回一个新的结果集合给我们
2. 聚合操作格式

`db.<collection>.aggregate(<pipeline>,<options>)`

`<pipeline>`定义每个阶段操作

`<options>`:聚合操作额外配置



3. 聚合管道阶段

### $project 投影

$project:对输入文档进行再次投影

作用: 按照我们需要的格式生成结果集

格式:`{$project:{<field>:<value>}}`



4. 实例

```js
db.person.aggregate([
{$project:{
    _id:0,
    bookName:['$book.name','$book.price'],
    age:1
    }
}])


// result
/* 1 */
{
    "bookName" : [ 
        null, 
        null
    ]
}

/* 2 */
{
    "age" : 50.0,
    "bookName" : [ 
        null, 
        11.0
    ]
}

/* 3 */
{
    "age" : 19.0,
    "bookName" : [ 
        "css", 
        22.0
    ]
}


```

5. 注意点

- 聚合操作不会修改原有的文档,而是会返回一个新的文档给我们
- 如果在$project中使用了原有文档中不存在的字段,name会自动使用Null填充

  

### $match 筛选

可以进行条件筛选,和find功能一致

```json
db.person.aggregate([
    {$match:{
        'book.price':11
        }},
    {$project:{
        _id:0,
        fullName:['$myName','$book.bookName']
        }}
    ])
```

### $limit 和 \$skip 分页

和游标的limit方法一样,用于指定获取几个文档

和游标的skip方法一样,用户指定跳过几个文档

```js
db.person.aggregate([
    {$skip:1},
    {$limit:1}
    ])
```



### $unwind 展开数组

如果数组不存在/数组中没有元素/数组为null,name$unwind会将这些数据过滤掉

```json
db.person.aggregate([
    {$unwind:{path:'$tags',
              includeArrayIndex:'arrayIndex',//展示原有数组中的索引
              preserveNullAndEmptyArrays:true//不过滤空
             }},
    ])
```



### $sort 文档排序

```js
db.person.aggregate([
    {$sort:{age:1/-1}}
    ])
```



### $lookup 关联查询

把另外一个集合中的数据保存在当前集合中对应的数据,比较当前集合中的数据与关联的集合中某一字段是否相等,若相等,便将其作为一个新的字段保存在当前集合中

```js
// 格式一 该格式下可以进行相关查询
{$lookup:{
    from:'<collection to join>',
    localField:'<field from the input documents>',
    foreignField:'<field from the documents of the 'from' collection>',
    as:'<output array field>'
}
}
//格式二 该格式下默认的是无相关查询
 {$lookup:{
    from:<collection to join>,
    let:{<var_1>:<expression>,...},// 定义给关联集合的聚合操作使用的当前集合的常量
    pipeline:[<pipeline to execute on the collection to join>],
    as:<output array field>
}
}
     
```

### $group 分组

把文档中的数据分组

```js
db.books.aggregate([
{$group:{
            _id:'$name',
            totalPrice:{$sum:'$price'},
            avgPrice:{$avg:'$price'},
            minPrice:{$min:'$price'},
            maxPrice:{$max:'$price'},
            totalName:{$push:'$name'}
        }
    }
])
```

![image-20210123111446309](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210123111446309.png)



### $out 写入文档

把聚合后的结果写入新的文档

- 如果集合已经存在,就会覆盖

```js
db.books.aggregate([
{$group:{
            _id:'$name',
            totalPrice:{$sum:'$price'},
            avgPrice:{$avg:'$price'},
            minPrice:{$min:'$price'},
            maxPrice:{$max:'$price'},
            totalName:{$push:'$name'}
        }
    },
{$out:'newBooks'}
])
```



### 额外配置

`db.<collection>.aggregate(<pipeline>,<options>)`

常用配置 `allowDiskUse:<boolean>`

- 默认情况下管道阶段操作内存占用不能超过100M
- 设置`allowDiskUse`可以超过100M



### 聚合操作表达式

1. 字段路径表达式
   - `$<filed>`:使用$来指示字段路径
     - `$name  $book.name`
   - `$<filed>.<sub-filed>`:使用$和.来指示内嵌文档的字段路径

2. 系统变量表达式
   - `$$CURRENT`: 表示当前操作的文档
     - `$$CURRENT.name` 等价于`$name`
3. 常量表达式
   - `$literal:<value>`:表示常量,告诉数据库这里不是一个特殊字符,相当于转义操作
     - `$literal:'$name'`表示常量字符$name



### 数据类型转换操作符

因为数据类型繁杂,对后续使用数据时会造成不便

`$convert`

```js
{
    $convert:{
        input:'需要转换的字段',
        to:'转换后的数据类型',
        onError:'不支持的转换类型',
        onNULL:'空的转换'
    }
}
```



## 索引

### 获取索引

`db.books.getIndexes()`

- MongoDB会自动创建一个索引

### 创建索引

#### 单值索引

`db.books.createIndex({<filed>:1/-1})`

- 创建索引,1升序,-1降序

- 如果只指定一个字段就是单值索引




#### 复合索引

如果创建索引时写多个字段就是复合索引

  `db.books.createIndex({name:1,price:-1})`

- 如果创建的是复合索引,那么在使用的时候,只支持前缀查询
  - A,B,C如果使用ABC/AB/A会使用索引,如果是BC/C则不会使用索引查询



#### 多键索引

- 给数组创建索引的时候就会对数组中的每个元素都建立一个索引



#### 唯一索引

`db.books.createIndex({<filed>:1/-1},{unique:true})`

- 添加唯一索引后,插入数据就不能重复

- 如果添加的是复合索引,那么复合索引的组合也不能重复



#### 稀疏索引

`db.books.createIndex({<filed>:1/-1},{sparse:true})`



- 默认情况下,MongoDB会给每个文档都创建索引,哪怕这个文档中没有任何字段或者字段为null,为了进一步优化,我们可以创建稀疏索引,

- 即只会为存在索引字段,并且索引字段取值不是null的文档创建索引



#### 唯一稀疏索引

`db.books.createIndex({<filed>:1/-1},{unique:true,sparse:true})`

- 如果索引具备唯一稀疏性,name就可以多次添加缺失字段



#### 索引生存时间

`db.books.createIndex({addTime:1},{expireAfterSeconds:5})`

- 超时就会自动删除当前数据

- 我们只能给单值索引还有多键索引添加超时时间

- 如果给数组字段添加超时时间,那么会以数组字段中时间最小的那个元素来计算超过时间

### 使用索引

- 查看是否使用索引
  - `db.books.find({name:'js',price:20}).explain()`

- 排序和索引 如果排序的字段不是索引字段,会先进行排序,但如果是索引字段就会直接输出,如果是复合索引,只有在排序的指定的字段和创建的复合索引完全一致,才会使用索引



### 删除索引

> 在mgdb中是没有修改索引操作的

`db.person.dropIndex({<filed>:1/-1})`



## 关系模型

 MongoDB中我们可以通过内嵌式结构和规范式结构来表达文档之间的关系

内嵌式:

集合嵌套

```json
{
    name:'zs',
    age:'18',
    card:{
        num:'1111111111111111',
        date:2018
    }
    
}
```

规范式:

文档存储在不同集合中然后通过某一字段建立文档之间的关系

```json
{
    _id:1,
    num:'1111111111111111',
    date:2018
}
{
    name:'zs',
    age:'18',
    cardId:1
}
```

#### 一对一

##### 内嵌式

- 优势
  - 一次查询就能得到所有数据
- 劣势
  - 如果数据复杂,不方便管理和更新
- 应用场景
  - 数据不复杂/查询频率高的数据



##### 规范式

- 优势
  - 如果数据比较复杂,也方便管理和更新
- 劣势
  - 查询数据相对内嵌结果稍微有些复杂(常用关联查询lookup)
- 应用场景
  - 数据复杂/更新频率高的数据



#### 一对多

```json
//	内嵌式
{
    name:'zs',
    age:'18',
    card:{
        num:'1111111111111111',
        date:2018
    },
    books:[
        {
            name:'js',
            price:20
    	},
        {
            name:'css',
            price:20 
        }]
    
}

// 规范式
{
    name:'zs',
    age:'18',
    id:1,
    booksId:[1,2]
}
{   
    cardId:1
    num:'1111111111111111',
    date:2018
}
{	
    bookId:1
    name:'js',
    price:20
}
{	
    bookId:2
    name:'css',
    price:20
}

```

##### 内嵌式

- 优势
  - 一次查询就能得到所有数据
- 劣势
  - 冗余数据多,不方便管理和更新
- 应用场景
  - 数据不复杂/查询频率高的数据
- 查询
  - `db.person.find({name:'zs'})`

##### 规范式

- 优势
  
  - 冗余数据少,更新数据方便
- 劣势
  
  - 查询数据相对内嵌结果稍微有些复杂(常用关联查询lookup)
- 应用场景
  
- 数据复杂/更新频率高的数据
  
- 查询

   ```
    db.books.aggregate([{
        $lookup:{
            from:关联集合名称,
            localField:当前集合中的字段名,
            foreignField:关联集合中的字段名,
            as:输出字段名
            }
            }])
   ```



#### 多对多

##### 内嵌式

- 优势
  - 一次查询就能得到所有数据
- 劣势
  - 冗余数据多,不方便管理和更新
- 应用场景
  - 数据不复杂/查询频率高的数据
- 查询
  - `db.person.find({name:'zs'})`

##### 规范式

通过添加关系集合方式实现

- 优势

  - 冗余数据少,更新数据方便

- 劣势

  - 查询数据相对内嵌结果稍微有些复杂(常用关联查询lookup)

- 应用场景

  - 数据复杂/更新频率高的数据

- 查询

  - ```js
    db.students.aggregate([{
        $lookup:{
            from:'relations',
            localField:'_id',
            foreignField:'sid',
            as:'relation'
            }
        },
        {
            $lookup:{
            from:'teachers',
            localField:'relation.tid',
            foreignField:'_id',
            as:'teacher'
        }},
        {
            $project:{
                _id:0,
                name:1,
                teacher:1
            }
        }
        ])
    ```





# Mongoose 

> Mongoose NodeJS 中操作数据库的对象模型工具
>

使用了了对象思想对于原生的mongoDB命令进行了封装

- 一个模型对应一个集合
- 一个对象对应一个文档
- 一个对象的属性对应文档的一个字段



1. npm安装mongoose 

   `npm i mongoose`

2. 使用 

   1. 引入包,连接数据库,监听连接状态

      ```js
      const mongoose = require("mongoose");
      /* 
      mongodb://server address:port/db name
      */
      mongoose.connect("mongodb://localhost:27017/User", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      const db = mongoose.connection;
      
      // listen connection status
      db.on("error", ()=>{
          console.log("connection failed");
      });
      db.once("open", function () {
          console.log("connection successed");
      });
      
      ```

      

   2. 定义集合的数据模型,新建集合

      ```js
      // schema : defines the rules for storing in a collection 
      const userSchema = new mongoose.Schema({
          name:String,
          age:Number
      })
      
      // create a model(collection)
      const User = mongoose.model("UserTest",  userSchema );
      ```

      

   3. 插入数据

      ```js
      // create a document(data)
      const lz = new User({ name: "lizheng", age: 22 });
      
      // insert current document in collection
      // method of insert 1
      lz.save((err, product) => {
        if (!err) {
          console.log("save successed");
          console.log(product);
        }
      });
      // method of insert 2
      User.create({ name: "zs", age: 666 }, (err, result) => {
        if (!err) {
          console.log("插入成功");
          console.log(result);
        }
      });
      // method of insert 3
      User.create(
        [
          { name: "zs", age: 666 },
          { name: "ww", age: 21 },
        ],
        (err, result) => {
          if (!err) {
            console.log("插入多条成功");
            console.log(result);
          }
        }
      ); 
      // method of insert 4
      (async () => {
       let result = await User.create([
          { name: "zs", age: 666 },
          { name: "ww", age: 21 },
        ]);
        console.log(result);
      })();
      ```

      

   4. 查询数据

      ```js
      (async ()=>{
         let findResult =  await User.find({name:'zs'},{_id:0,name:1,age:1},{skip:0,limit:2})
         console.log(findResult);
      })()
      ```

      

   5. 修改数据

      ```js
      // 更新所有
      (async ()=>{
          let updateResult = await User.updateMany({name:'zs'}, {$set:{age:999}})
          console.log(updateResult);
      })()
      // 更新一条
      (async ()=>{
          let updateResult = await User.updateOne({name:'zs'}, {$set:{age:999}})
          console.log(updateResult);
      })()
      ```

      

   6. 删除数据

      ```js
      // 删除所有
      (async () => {
        let removeResult = await User.remove({ name: "zs" }, { justOne: true });
        console.log(removeResult);
      })();
      // 删除一条
      (async () => {
        let removeResult = await User.deleteOne({ name: "zs" }, { justOne: true });
        console.log(removeResult);
      })();
      // 删除所有
      (async () => {
        let removeResult = await User.deleteMany({ name: "zs" }, { justOne: true });
        console.log(removeResult);
      })();
      ```

      



# 复制集

> 多台服务器保存相同的内容组成的集群,用于解决数据安全性的问题

## 复制集相关概念

- 复制集的节点:在复制集中每一台服务器就是一个节点
- 复制集的特点:
  - 每个复制集最多有50个节点
  - 在复制集中必须有一个主节点
- 主节点: 在复制集中只有一个节点可以**读写**数据,那么这个结点就称之为主节点
- 副节点:副节点只能读取数据不能写入数据
- 复制集中节点每隔2s就会发送心跳请求
  - 为了相互检查有无节点出现问题
  - 如果某一个节点出现10s未响应,就会认为该节点出现问题
  - 如果主节点出现了问题,副节点就会自动发起投票,重新选取主节点
    - 每个节点中有一个选举计数器,发起选举的节点会成为候选节点
    - 候选节点自己的选举计数器+1,给所有节点发起选举请求,并把计数器的值发送给所有节点
    - 其他节点会先更新自己的选举计数器,并对比自己和候选节点谁的值保存的完整,如果自己完整就反对,反之则同意,如果超过半数同意,候选节点就会成为主节点,如果没有,其他节点会发送选举请求,直到出现半数同意
    - 如果某些节点出现问题,默认反对票
    - 复制集中参与投票的节点最多只能有7个,同时由于投票规则,所以创建复制集的时候最少需要三个节点
- 触发选举的条件
  - 初始化复制集的时候
  - 新结点加入时
  - 主节点故障时
- 复制集如何保证所有结点保存数据一致
  - 初始化同步
    - 当有个新的结点加入复制集中,.会自动进行初始化同步
  - 同步写库记录
    - 在每一个mongodb的服务器上都有个local数据库,在这个数据库中有一个oplog集合,该集合会保存当前服务器中会,副节点会定期执行同步写库记录
- 投票节点
  - 不保存任何数据,只参与投票的节点
  - 因为初始化同步或同步写库记录都需要消耗性能,因此并不是副节点越多越好,所以在保证高可用性数据库安全性的同时,为了提升服务器性能还可以添加投票节点
  - 同时保证了性能问题和副节点过少无法投票的问题



## 复制集搭建

1. MongoDB复制集搭建
   https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.6.zip
   - 解压MongoDB安装包
   - 在安装目录下新建data/conf/log文件夹
   - 在conf文件夹下新建mongo.config
   - 在mongo.config中配置如下内容

```bash
# Where and how to store data.

storage:
  dbPath: D:\Developer\MongoDB666\mongodb27020\data
  journal:
    enabled: true

# where to write logging data.

systemLog:
  destination: file
  logAppend: true
  path:  D:\Developer\MongoDB666\mongodb27020\log\mongo.log

# network interfaces

net:
  port: 27020
  bindIp: 127.0.0.1
  
# 配置服务器需要添加的
# 告诉系统当前服务器是配置服务器
sharding:
  clusterRole: configsvr
# 当前复制集的名称
replication:
  replSetName: "HerMajesty"
  
  
# 路由服务器配置需要添加的
# 配置服务器集群的名称/地址
sharding:
  configDB: "HerMajesty"/127.0.0.1:27018,127.0.0.1:27019,127.0.0.1:27020
```

2. 注册配置MongoDB
   注册服务(注意配置服务器的环境变量)

```bash
 mongod --config D:\environment\mongoDuplicateSet\mongodbDuplicateSet1\bin\mongo.config --serviceName "MongoDB27018" --serviceDisplayName "MongoDB27018" --replSet "HerMajesty" --install
mongod --config D:\environment\mongoDuplicateSet\mongodbDuplicateSet2\bin\mongo.config --serviceName "MongoDB27019" --serviceDisplayName "MongoDB27019" --replSet "HerMajesty" --install
mongod --config D:\environment\mongoDuplicateSet\mongodbDuplicateSet3\bin\mongo.config --serviceName "MongoDB27020" --serviceDisplayName "MongoDB27020" --replSet "HerMajesty" --install
```

3. 在任务管理器中 手动启动服务

   或是`` net start name``

4. 测试连接

```bash
mongo --host 127.0.0.1 --port 27018
mongo --host 127.0.0.1 --port 27019
mongo --host 127.0.0.1 --port 27020
```

5. 初始化复制集 

   连接后在任意cmd命令行执行

```bash
rs.initiate({
_id: 'HerMajesty',
// 分片的配置服务器需要添加下面这个语句 分片服务器不需要添加该语句
configsvr: true,
members: [
{_id: 0, host: '127.0.0.1:27018'},
{_id: 1, host: '127.0.0.1:27019'},
{_id: 2, host: '127.0.0.1:27020'}]
})

/*
_id	        整数	节点的唯一标识。
host	    字符串	节点的IP地址，包含端口号。
arbiterOnly	布尔值	是否为投票节点，默认是false。是设置投票(选举)节点有关的参数
priority	整数	选举为主节点的权值，默认是1，范围0-1000。
hidden	    布尔值	是否隐藏，默认false，是设置隐藏节点有关的参数。
votes	    整数	投票数，默认为1，取值是0或1，是设置”投票“节点有关的参数。
slaveDelay	整数	延时复制，是设置延时节点有关的参数。单位秒(s)
*/
```
6. 在主节点写入读取不受影响
   1. 查看结点状态可以调用`rs.status()`
7. 在副节点读取需要调用该命令~~`rs.slaveOk()`~~推荐使用`rs.secondaryOk()`



# 分片(分布式)

> 专门存储不同数据的MongoDB服务称之为分片服务器

1. 注意点
   - 并不是数据库所有集合都需要使用分片,对于不需要使用分片的集合会统一保存到主分片中
     - 默认没给数据库都有一个主分片,用于保存那些不需要分片的集合数据
     - 在创建数据库的时候,系统会自动选择存储容量最少的分片作为主分片
   
2. 配置服务器
   
   - 配置服务器是专门用于存储分片服务器存储数据的范围的,只有有了范围,我们将来才知道如何存储数据和查询数据
   
3. 路由服务器 mongos
   
   - 专门用于负责分发用户请求的服务器
   
4. 用户存储数据/查询数据的流程
   - 用户将请求发到路由服务器
   - 路由服务器去配置服务器查询数据段
   - 根据查询的结果到对应的分片服务器上做处理
   - 拿到处理结果将处理结果返回给用户
   
5. 分片片键
   - 什么是分片片键
     - 可以将文档的一个或多个字段设置成分片片键
     - 设置完分片片键后,mongo会自动对字段坑的取值进行划分,划分出一个个数据段
     - 划分完数据段后,mogoDB会自动决定对哪些分片服务器保存哪些对应的数据
   - 注意点
     - 片键可以是一个字段,也可以是多个字段
     - 只有索引字段才能设置为片键
     - 分片服务器保存哪些数据段的值是随机的,并不是连续的
     - 数据段的划分可以使用片键的取值,也可以使用片键取值的哈希
   - 选择片键的原则
     - 应该选取取值范围更大的字段作为片键
     - 应选择取值分配更平衡的字段作为片键
     - 不应该选择单向增加或减少的字段作为片键
   - 片键选择技巧
     - 如果片键字段取值范围不够广,那么可以使用复合片键
     - 如果片键字段的取值不够平衡,可以使用复合片键
     - 如果字段的取值是单向增加或减少,我们可以采用片键字段的哈希值
   - **片键一旦选择就不可更改**
   
6. 分片优化

   - 数据段分裂:当一个数据段中数据过多,就会自动拆分,将数据段分裂成多个(系统自己执行)

   - 分片平衡:当各个分片服务器上保存的数据段之间数量相差较大时,会自动触发分片服务器数据段迁移,通过集群平衡器来负责监视分片的平衡和调整分片平衡

7. 分片查询

   1. 查询的条件是分片片键:路由服务器可以准确的找到保存对应数据的分片服务器,可以很快的返回数据
   2. 查询条件不是分片片键:路由服务器无法准确找到对应,那么会将请求发送给所有分片服务器,再将返回的结果集合整合后返回给用户

构建配置集和分片集合以及路由服务器后

https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/

1. 添加分片`sh.addShard( "<replSetName>/s1-mongo1.example.net:27018,s1-mongo2.example.net:27018,s1-mongo3.example.net:27018")`

2. 查看分片`sh.status()`

3. 开启分片`sh.enableSharding("<database>")`

4. 设置片键

   - 按键值分片`sh.shardCollection("<database>.<collection>", { <shard key field> : 1, ... } )`	

   - 按哈希分片`sh.shardCollection("<database>.<collection>", { <shard key field> : "hashed" } )`