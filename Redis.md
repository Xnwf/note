# Redis

> Redis是一个开源免费的NoSQL类型的数据库,存储的是键值对

## 特点

- 速度快
  - 默认将数据存在内存
  - 读取速度能达到10w/s,写入数据达到8w/s
- 支持数据持久化
  - 可将内存数据存在磁盘中
- 支持多种数据结构
  - 除了key-value还提供set,list,zset,hash等
- 定制性强
- 支持分布式



## 应用场景

- 缓存系统
- 排行榜
  - 支持集合和有序集合
- 计数器
  - 提供incr/decr指令,便于实现计数器
  - 转发数,评论数,播放数,访问数
- 存储社交关系
  - 支持存储集合类型,因为社交关系不会经常变化,因此使用
- 消息队列系统
  - 天生支持订阅者模式

## 安装

https://github.com/tporadowski/redis/releases

连接 `redis-cli -h 127.0.0.1 -p 6379`     

redis.windows.conf: 配置文件，将redis作为普通软件使用的配置，命令行关闭则redis关闭
redis.windows-service.conf：配置文件，将redis作为系统服务的配置，用以区别开两种不同的使用方式

配置文件修改
redis.windows-service.conf

- 绑定IP
bind 127.0.0.1
- 绑定端口号
port 6379
- 数据库文件
dbfilename dump.rdb
- 数据文件存储路径
dir ./
- 默认数据库
databases 16
- 日志文件
logfile "server_log.txt"
- 主从复制(类似于双机备份)
slaveof



## string字符串操作

- `get `获取
- `set`设置
- `del`删除
- `setnx`不存在时设置
- `set key value xx`存在时才设置
- `mset`批量设置
- `mget`批量删除
- `getset` 设置新值获取旧值
- `append`追加值
- `strlen`获取取值长度
- `getrange key index index`获取指定范围的值
- `setrange key index index`设置指定范围的值
- `incr`自增 若自增数据不存在自动添加 1
- `decr`自减 若自减数据不存在自动减少 -1
- `incrby` 加指定的数
- `decrby`减少指定的数
- `incrbyfloat` 加一个浮点数,没有减的操作





## 通用操作

- `select` 切换数据库
- `keys*`查询当前数据库所有key
- `flushdb`清空当前数据库
- `flushall`清空所有数据库
- `dbsize`统计key的总数(不耗时)
- `type key` 查看键存储的类型
- `exists key`判断指定key是否存在
- `expire key seconds`设置key的过期时间,过期会自动删掉
- `ttl key`查看过期时间
- `persist key` 取消过期时间



## hash(对象)类型

- `hset`设置
- `hget`获取
- `hdel key field`  删除
- `del key`
- `hmset key field value1 field value2...`批量设置
- `hmset key field field ...`批量获取
- `hlen key` 对象字段数
- `hexists key field`判断指定key有无指定field
- `hkeys key`获取全部key
- `hvals key`获取全部value
- `hgetall key`获取所有field和key



## list列表(数组)

- `lpush key value value2..`  从左插入 存在情况下会追加数据
- `rpush key value value2..` 从右插入 存在情况下会追加数据
- `lrange key index index`查询
  - 第二个index为-1表示取到最后
- `lindex key index` 取出index的值
  - index为负数时相当于从右往左数
- `lset key index value` 修改



- `lpop` `rpop` 从左/从右删除

- `lrem key count value`删除指定个数的元素

  - count 为正数从左往右 删除count个与value相等值
  - count 为负数从右往左 删除|count|与value相等值
  - count为0删除所有与value相等值

- `ltrim key index index` 保留index之间的值

- `linsert key before|after fieldValue curValue` 插入

- `llen key` 获取列表长度

  ### 使用场景

  #### 栈结构

  `lpush + lpop`

  #### 队列结构

  `lpush + rpop`



## set集合

> 无序数据,且不重复

- `sadd key value1 value2..`添加/追加(重复元素会忽略)
- `smembers key`获取
- `srandmember key count`随机获取count个value
- `spop key count` 随机删除count个value
- `srem key value`删除指定value
- `scard key`统计集合中元素的个数
- `sismember key member`判断是否存在
- `sinter key key`交集
- `sunion key key`并集
- `sdiff key key`差集

### 应用场景

- 抽奖 `srandmember`

- 绑定标签 `saad`

- 社交关系

  - `sinter`
  - `sunion`
  - `sdiff`

  

## zset有序集合

> 通过权重排序的数据当做一个value存储起来

- `zadd key weight value weight value .. `添加
- `zrange key index index`获取数据
  - `zrange key weight weight `通过权重获取
  - `zrevrange key weight weight` 从大到小获取
  - `zscore key element`寻指定元素权值
  - `zcount key weight weight` 查询权重范围内的元素个数
  - `zcard key`查询该集合中元素的个数
- `zrem key value`删除元素
  - `zremrangebyrank key index index`删除指定排名范围内的元素
  - `zremrangebyscore key weight weight`删除指定权重范围内的元素
- `zincrby key weight element`增加/减少权重
- 应用场景
  - 存储排行榜数据



## 发布订阅

- `subscribe channal`添加订阅

- `publish channal message`发布消息



# Redis 持久化

> 将内存数据写入磁盘 支持 RDB和AOF持久化

- RDB:快照,将内存中保存的数据原封不动写入磁盘
- AOF:日志,就用户操作的指令写入磁盘中



## RDB 

- 存储方法

  - 手动执行`save`命令

    - 同步执行,会阻塞进程
    - 会覆盖旧的RDB文件

  - 手动执行`bgsave`命令

    - 异步执行
    - 会覆盖旧的RDB文件

  - 通过配置文件指定自动生成条件,一旦满足条件就会自动执行`bgsave`

    - `dir ./ `RDB文件保存路径
    - `dbfilename dump.rdb ` RDB文件名称
    - `save` 自动保存条件多少s内做了多少操作会自动保存
      - #save 900 1
        #save 300 10
        #save 60 10000
    - `stop-writes-on-bgsave-error yes`发生错误时是否停止写入
    - `rdbcompression yes` 存储是否压缩
    - `rdbchecksum yes`是否对生成RDB文件校验

  - 自动生成的弊端(一般不使用自动生成)

    - 无法控制生成频率.如果频率过高好导致性能消耗较大

  - 推荐配置

    ```bush
    dir /rdbdiskpath                #由于备份是比较占用磁盘空的, 所以推荐使用一个比较大的磁盘路径
    dbfilename dump-${prot}.rdb     #由于一台服务器上可能部署多个Redis, 所以可以给RDB文件添加端口号作为区分
    stop-writes-on-bgsave-error yes #bgsave发生错误是否停止写入
    rdbcompression yes              #是否采用压缩模式写入
    rdbchecksum yes                 #是否对生成的RDB文件进行校验
    ```

- RDB存在的问题

  - 不可控,数据丢失
    - 服务器宕机之前的数据,未写入RDB就会丢失
  - 耗时/耗性能
    - 一次性写入,比较耗时
    - RDB每次都是把所有数据写入磁盘(会重复写入)
    - 如果通过save会阻塞,用bgsave写入不会阻塞,但是会专门开启子进程写入,消耗内存



## AOF

> 将每一条用户操作指令写入文件

- 生成AOF三种机制 在配置文件中的appendfsync设置

  - always
    - 每条命令都写入
    - 不会丢失数据
    - 磁盘I/O消耗大
  - everysec
    - 每秒写入一次
    - 磁盘IO消耗相对较小
    - 可能会丢失1s数据
  - no
    - 让操作系统决定什么时候写入
    - 不可控,可能会丢失大量数据

- AOF文件重写

  > 随着时间的推移AOF文件会越来越大,因此提供了重写机制,可以自动去除冗余命令,可以自动删除没有用的命令

  - 触发AOF重写的方法

    ​	1. 执行`bgwriteaof`命令

    - ​	开启一个新的子进程,根据内容中的数据生成命令写入到AOF中

    2. 通过配置文件设置

       ```bash
       auto-aof-rewrite-percentage 100 # 对比上次重写后增长了百分之多少重写
       auto-aof-rewrite-min-size 64mb # 文件体积多大时重写
       ```

    3. AOF推荐配置

       ```bash
       appendonly yes                           #是否使用AOF
       appendfilename "appendonly-${prot}.aof"  #AOF文件名称
       appendfsync everysec                     #写入命令的同步机制
       dir /rdbdiskpath                         #保存AOF文件路径
       auto-aof-rewrite-min-size 64mb           #AOF文件重写体积
       auto-aof-rewrite-percentage 100          #AOF文件增长率
       no-appendfsync-on-rewrite yes            #AOF重写时是否正常写入当前操作的命令
       ```

## 对比

- AOF优先级高于RDB
    + 如果Redis服务器同时开启了RDB和AOF, 那么宕机重启之后会优先从AOF中恢复数据
- RDB体积小于AOF
    + 由于RDB在备份的时候会对数据进行压缩, 而AOF是逐条保存命令, 所以RDB体积比AOF小
- RDB恢复速度比AOF恢复速度快
    + 由于AOF是通过逐条执行命令的方式恢复数据, 而RDB是通过加载预先保存的数据恢复数据
      所以RDB的恢复速度比AOF快
- AOF数据安全性高于RDB
    + 由于AOF可以逐条写入命令, 而RDB只能定期备份数据, 所以AOF数据安全性高于RDB
- 所以综上所述, 两者各有所长, 两者不是替代关系而是互补关系



## Node操作Redis

https://www.npmjs.com/package/redis

```js
// 1.导入Redis
const redis = require("redis");
// 2.连接Redis服务器
const client = redis.createClient('6379','127.0.0.1');
// 3.监听连接成功还是失败
client.on("error", function (error) {
  console.error(error);
});
// 4.操作Redis 一比一还原的Redis的操作
client.set("person", "999", redis.print);
client.get('person',(err,val)=>{
    if(!err){
        console.log(val);
    }
});

```



# Redis主从复制

## 主从复制的优点

1. 高可用性

   如果我们有多台Redis服务器, 并且每台服务器中存储的内容都相同,那么即使有一台服务器宕机了, 用户还可以继续使用其它的服务器

2. 数据安全性

   如果我们有多台Redis服务器, 并且每台服务器中存储的内容都相同 那么即使有一台服务器坏了, 也不会导致数据丢失

3. 数据分流

   如果我们有多台Redis服务器, 如果我们把请求分流到不同的服务器 那么就可以降低了服务器压力, 加快数据处理速度并且如果我们将多台服务器安装到不同的区域, 还可以采用就近原则访问还可以进一步提升用户的访问速度

## 主从复制的特点

- 主从复制中必须有一个主节点
    + 主节点主要负责写入数据和读取
- 主从复制中除了主节点以外的节点我们称之为'从节点'
    + 副节点默认情况下只能读取数据, 不能写入数据
    + 副节点主要负责从主节点不断复制数据
- 和MongoDB不同的是,Redis中的主从复制, 主节点挂掉后不会自动选举,如果需要自动选举需要借助Redis Sentinel来实现



## 搭建主从复制



1.搭建Redis主从复制
1.1拷贝多份Redis安装包
1.2修改主节点配置

```bash
bind 127.0.0.1                  #绑定ip地址
port 6380                       #绑定端口号
dir ./                          #RDB文件存储路径
dbfilename dump-${prot}.rdb     #RDB文件名称
stop-writes-on-bgsave-error yes #bgsave遇到错误是否停止
rdbcompression yes              #是否压缩RDB文件
rdbchecksum yes                 #是否校验RDB文件
#save 900 1
#save 300 10
#save 60 10000
appendonly yes                           #是否使用AOF
appendfilename "appendonly-${prot}.aof #AOF文件名称
appendfsync everysec                     #写入命令的同步机制
dir /rdbdiskpath                         #保存AOF文件路径
auto-aof-rewrite-min-size 64mb           #AOF文件重写体积
auto-aof-rewrite-percentage 100          #AOF文件增长率
no-appendfsync-on-rewrite yes            #AOF重写时是否正常写入当前操作的命令
logfile "${prot}_log.txt"                #系统日志文件名称
```



1.3修改从节点配置

```bash
port 6381                       #绑定端口号
slaveof 127.0.0.1 6380                   #主节点地址和端口

port 6382                       #绑定端口号
slaveof 127.0.0.1 6380                   #主节点地址和端口
```
1.4注册启动Redis服务
命令行进入安装包路径下, 执行如下指令

```bash
redis-server.exe --service-install redis.windows-service.conf  --service-name Redis6380
redis-server.exe --service-install redis.windows-service.conf  --service-name Redis6381
redis-server.exe --service-install redis.windows-service.conf  --service-name Redis6382
```
1.5查看主从状态

```bash
redis-cli -h 127.0.0.1 -p 6380
info replication
redis-cli -h 127.0.0.1 -p 6381
info replication
redis-cli -h 127.0.0.1 -p 6382
info replication
```



### Redis-Sentinel

- 主从复制中,只有主节点可读取数据,因此一旦主节点宕机,用户就不能继续写入数据了,即在Redis的主从复制中,主节点宕机了,系统是不会自动重新选举一个主节点出来,而redis-sentinel就是为了解决这个问题

> Redis-Sentinel: 用来监控主从结构中每个结点的状态

-  如何做到高可用性
  - 三个定时任务
    - 一个用于获取主从关系,发现新结点
    - 一个用于交换信息,投票选出新主服务器
    - 一个用于监听节点是否可用
  - 每10s每个sentinel结点(一个特殊的Redis服务器)对master结点和slave结点执行info操作
    - 确定主从关系
    - 发现子节点
  - 每2秒每个sentinel节点通过master节点的channel（sentinel:hello）交换信息
    - 目的就是为故障判断,信息交互提供通道
  - 每1秒每个sentintel节点对master节点和slave节点以及其余的sentinel节点执行ping操作
    - 心跳检测节点是否发生故障

1.Redis-Sentinel搭建
1.1首先搭建一个主从结构
1.2然后搭建一个奇数个Sentinel节点的Sentinel
1.3修改Sentinel配置文件(sentinel.conf)

```bash
port 26380                                  # 当前Sentinel服务运行的端口
sentinel monitor mymaster 127.0.0.1 6380 2  # 主服务器名称 主服务器地址 主服务器端口，客观下线票数
sentinel down-after-milliseconds mymaster 10000 # 主观下线时间
sentinel parallel-syncs mymaster 1          # 故障转移之后,从节点是串行还是并行同步数据
sentinel failover-timeout mymaster 20000    # 故障转移超时时间
daemonize yes                               #以守护进程方式运行
```



1.4注册sentinel服务

```bash
redis-server.exe --service-install sentinel.conf --sentinel --service-name Sentinel26380
redis-server.exe --service-install sentinel.conf --sentinel --service-name Sentinel26381
redis-server.exe --service-install sentinel.conf --sentinel --service-name Sentinel26382
```



1.5测试Redis-Sentinel
`info replication`



## RedisCluster分片集群

- 分布式存储中常见的分片规则
  - 顺序分片
    - 特点:
      1.支持顺序访问
      2.键值和业务相关
      3.可能会出现数据倾斜
  - 哈希分片
    - 特点:
      1.数据分散度高
      2.支持批量操作
      1.不支持顺序访问
      2.键值和业务无关 
- 三种常见的哈希分片
  - 节点取余
    - 节点取余存在的问题
      数据迁移量较大
    - 节点取余推荐扩容方式
      翻倍扩容
  - 一致性哈希
    - 一致性Hash算法将整个哈希值的空间组织成一个0~2(32)次方的虚拟的圆环
    - 然后再求出分片服务器的Hash值, 根据分片服务器的Hash值将服务器配置到虚拟的圆环对应的位置
    - 然后再求出需要保存数据键的Hash值, 根据求出的值在虚拟的圆环顺时针方向上存入对应的分片服务器中
    - 如果保存数据键的Hash值超过2(32)次方，就会保存到第一台分片服务器上
    - <img src="C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210221201732124.png" alt="image-20210221201732124" style="zoom:50%;" />
  - 虚拟槽哈希    
    - Redis Cluster采用的是'虚拟槽哈希'的方式来分片
    - 在Redis Cluster中一共有0~16383个虚拟槽, 我们可以把这些槽分配给对应的分片服务器
    - 在存储数据的时候通过 slot = CRC16(key) & 16383 计算出对应数据键的槽值,
      然后将该值保存到对应槽的分片服务器上       
    - <img src="C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210221201940579.png" alt="image-20210221201940579" style="zoom: 67%;" /> 

![image-20210221202505007](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20210221202505007.png)

https://redis.io/topics/cluster-tutorial

### 命令行搭建

0. 为Cluster启动6台Redis服务器

1. 准备6台Redis服务器

2. 修改服务器配置

   ```bash
   port 7000
   daemonize yes                        #以守护进程方式运行
   cluster-enabled yes                  #表示这是一个Cluster节点
   cluster-config-file nodes-7000.conf  #Cluster信息配置文件, 内容会自动生成
   cluster-require-full-coverage no     #是否集群中所有节点都能提供服务, 才对外提供服务
   cluster-node-timeout 15000           #故障转移或者节点超时时间
   ```

3. 注册服务器进程

   ```bash
   redis-server.exe --service-install redis.windows-service.conf  --service-name Redis7000
   ```

4. 启动相关Redis服务器

5. 测试读写

6. 让6台Redis服务器相互握手

   ```cmd
   redis-cli -h 127.0.0.1 -p 7000 cluster nodes
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7001
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7002
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7003
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7004
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7005
   ```

7. 给分片服务器分配槽

   ```cmd
   
   redis-cli -h 127.0.0.1 -p 7000 cluster addslots 0
   ... ...
   redis-cli -h 127.0.0.1 -p 7001 cluster addslots 5462
   ... ...
   redis-cli -h 127.0.0.1 -p 7002 cluster addslots 16383
   
   
   redis-cli -h 127.0.0.1 -p 7000 cluster slots
   
   #这里通过脚本进行分配 文件名 addslots.bat
   @echo off
   for /l %%i in (0,1,5461) do (
   	redis-cli -h 127.0.0.1 -p 7000 cluster addslots %%i
   )
   pause
   ```

8. 分配主从关系

   ```cmd
   redis-cli -h 127.0.0.1 -p 7000 cluster nodes
   redis-cli -h 127.0.0.1 -p 7003 cluster replicate  7000node-id
   redis-cli -h 127.0.0.1 -p 7004 cluster replicate  7001node-id
   redis-cli -h 127.0.0.1 -p 7005 cluster replicate  7002node-id
   ```

### Ruby脚本搭建

0. 配置注册并启动6台服务器
1. 下载Ruby: http://railsinstaller.org/en
2. 安装Ruby
3. 下载RubyGems: https://rubygems.org/pages/download
4. 在RubyGems: ruby setup.rb
5. 通过RubyGems安装Redis:` gem install redis`
6. 下载在redis源码的src目录的redis-trib.rb文件：https://github.com/MicrosoftArchive/redis/releases
7. 在终端执行redis-trib.rb创建Redis Cluster
```cmd
ruby redis-trib.rb create --replicas 1 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005
```