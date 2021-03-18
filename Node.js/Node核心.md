### NodeJS核心

---

#### Buffer
>  buffer是Node全局对象上的一个类,专门用于存储字节数据的类,用于操作底层
>
>  Buffer本质是一个数组可以通过数组下标操作

+ `Buffer.alloc(size[, fill[, encoding]])`初始化Buffer
  
  - size <integer> 新 Buffer 的所需长度。
  -  fill <string> | <Buffer> | <Uint8Array> | <integer> 用于预填充新 Buffer 的值。默认值: 0。
  -   encoding <string> 如果 fill 是一个字符串，则这是它的字符编码。默认值: 'utf8'。

+ `Buffer.from(str)` 存储字母的ascii码 
+ `buf.write(string[, offset[, length]][, encoding])`

  	- string <string> 要写入 buf 的字符串。
	- offset <integer> 开始写入 string 之前要跳过的字节数。默认值: 0。
	- length <integer> 要写入的最大字节数（写入的字节数不会超出 buf.length - offset）。默认值: buf.length - offset。
	- encoding <string> string 的字符编码。默认值: 'utf8'。
+ `buf.slice()`从第n个截取到第m(不包括m)
+ `buf.length` bufffer长度
+ `buf.toString()` 转字符串
+ `Buffer.isEncoding("utf-8")` 判断编码形式
+ `Buffer.isBuffer(obj)`判断是否是obj
+ `Buffer.byteLength(buf)`buf的长度
+ `Buffer.concat([buf1, buf])`连接两个buf

---

#### path

> 路径相关Api 需要用`require('path')`导入,不在global中

+ `path.basename('C:\\temp\\myfile.html','html')`获取路径最后一个组成部分
+ `path.dirname('C:\\temp\\myfile.html')`获取路径中的目录部分
+ `path.extname('C:\\temp\\myfile.html')`获取路径中最后一部分的拓展名
+ `path.isAbsolute('')` 判断是否是绝对路径
  + window中盘符开头的为绝对路径
  + linux中以`/`开头的是绝对路径
+ `path.sep`获取当前操作系统中路径的分隔符 win为`\` linux为`/`
+ `path.delimiter`获取当前系统环境变量的分隔符 win为`;` linux为`:`
+ `path.parse(aPath)`把路径拆开
+ `path.format(aPathObj)`把路径对象合并
+ `path.join()`拼接路径
+ `path.nomorlize(path)`将路径转换成标准格式
+ `path.relative(from,to)`根据第一个参数找到第二个参数的相对路径
+ `path.resolve`解析路径
  + 给定的路径序列会从右到左进行处理，后面的每个 `path` 会被追加到前面，直到构造出绝对路径。 例如，给定的路径片段序列：`/目录1`、 `/目录2`、 `目录3`，调用 `path.resolve('/目录1', '/目录2', '目录3')` 会返回 `/目录2/目录3`，因为 `'目录3'` 不是绝对路径，但 `'/目录2' + '/' + '目录3'` 是。

---

#### fs

```js
//查看文件信息
fs.stat(__filename,(err,stats)=>{
    console.log(err);
    console.log(stats);
    is
})
//读取文件
fs.readFile(str,"utf8", function (err, data) {
  if (err) return console.error(err);
  console.log(data);
});
//写入文件
fs.writeFile(str,"ssss","utf8",(err)=> {
    if(err){
        throw new Error("写入数据失败");
    }
    else{
        console.log("写入成功");
    }
})
//追加文件内容
fs.appendFile(str, "ssss", "utf8", (err) => {
    if (err) {
        throw new Error("追加数据失败");
    } else {
        console.log("追加成功");
    }
})
// 判断静态资源是否存在
    let isExists = fs.existsSync(filePath);
//读取流
let readStream = fs.createReadStream(str,{encoding:"utf8",highWaterMark:1});
readStream.on("open",function () {
    console.log("成功建立");
})
readStream.on("error",function () {
        console.log("建立失败");

})
readStream.on("data",function (data) {
        console.log("读取成功",data);

})
readStream.on("close",function () {
        console.log("断开关系,读取完毕");

})
//写入流
let writeStream = fs.createWriteStream(writePath);
writeStream.on("open", function () {
    console.log("写入成功建立");
})
writeStream.on("error", function () {
    console.log("写入建立失败");

})
writeStream.on("close", function () {
    console.log("写入断开关系,写入完毕");
    writeStream.end();
});
//管道方法快速拷贝
let writeStream = fs.createWriteStream(writePath);
readStream.pipe(writeStream);
```

#### 目录

```js
let dir=  path.join(__dirname,"abc")
fs.mkdir(dir,function (err) {
    if(err){
        throw new Error("创建目录失败")
    }
    else{
        console.log("创建目录成功");
    }
})
fs.rmdir(dir, function (err) {
    if (err) {
        throw new Error("删除目录失败")
    } else {
        console.log("删除目录成功");
    }
}) 

fs.readdir(__dirname,function (err,files) {
    if (err) {
        throw new Error("读取目录失败")
    } else {
        console.log(files);
        files.forEach((item)=>{
            let filePath = path.join(__dirname,item);
            console.log(filePath);
            let stats = fs.statSync(filePath)
            if(stats.isFile()){
                console.log(item +"是一个文件");
            }else if(stats.isDirectory()){
                console.log(item +"是一个目录");
            }
        })
    }
})

//快速创建目录结构
class CreatProjetDir{
    constructor(rootPath,projectName){
        this.rootPath = rootPath;
        this.projectName = projectName;
        this.subDirs = ["images","css","js","index.html"]
    }
    initProject(){
        //创建站点文件夹
        let projectPath = path.join(this.rootPath,this.projectName);
        let imgaesPath = path.join(projectPath,this.subDirs[0])
        let cssPath = path.join(projectPath, this.subDirs[1])
        let jsPath = path.join(projectPath, this.subDirs[2])
        this.subDirs.forEach(function(filename) {
            if (path.extname(filename) === "") {
                    let dirPath = path.join(projectPath, filename);
                    fs.mkdirSync(dirPath);
            }
            else{
                let filePath = path.join(projectPath, filename);
                fs.writeFileSync(filePath,"");
            }
        })

}
}
let newProject = new CreatProjetDir(__dirname,"一代目");
newProject.initProject();
```

#### http

```js
let http = require("http");
//创建一个服务器实例对象
let server = http.createServer();
//注册请求监听
server.on("request",(req,res)=>{
    //end:结束本次请求并返回数据
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
})
    res.end("那没事了");
})
//指定监听的端口
server.listen(3000);
```

**简写形式**

```js
http.createServer(function (req,res) {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8"
    })
    res.end("222")
}).listen(3000)
```

+ `request`对象实际上是`http.IncomingMessage`类的实例
+ `response`对象实际上是`http.serverResponse`类的实例

**路由分发**

```js
http.createServer(function (req,res) {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8"
    })
    console.log(req.url);
    //通过req的url可以取到请求路径的尾部
    if(req.url.startsWith("/index")){
        res.end("首页")
    }
    else{
    res.end("其他")
    }
}).listen(3000)
```

+ 如果使用end返回数据,只会返回一次,并且会立刻结束请求
+ 如果使用write返回数据,可以返回多次,不会结束请求,需要手动调用end

**返回html**

```js
function readFile(req, res) {
    let filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, "utf8", function (err, content) {
        if(err){
            res.end("Server Error");
        }
        res.end(content);
    });
}
```

**返回静态资源**

和上面的差不多,就是不能加utf8,同时要添加相应的响应头

```js
// let path = require("path");
let fs = require("fs");
let mime = require("./mime.json");

function readFile(req, res, rootPath) {
    let filePath = path.join(rootPath, req.url);
    // console.log(filePath);
    /*
    注意点:
    1.加载其它的资源不能写utf8
    2.如果服务器在响应数据的时候没有指定响应头, 那么在有的浏览器上, 响应的数据有可能无法显示
    * */
    let extName = path.extname(filePath);
    let type = mime[extName];
    if(type.startsWith("text")){
        type += "; charset=utf-8;";
    }
    res.writeHead(200, {
        "Content-Type": type
    });
    fs.readFile(filePath, function (err, content) {
        if(err){
            res.end("Server Error");
        }
        res.end(content);
    });
}

exports.StaticServer = readFile;
```

**get请求**

```js
http.createServer(function (req, res) {
    let obj = url.parse(req.url,true);
    res.end(obj.query.name+"---"+obj.query.age);

}).listen(3000)
```

**Post请求**

```js
let http = require("http");
let queryString = require("querystring");

// 1.创建一个服务器实例对象
let server = http.createServer();
server.on("request", function (req, res) {
    // 1.定义变量保存传递过来的参数
    let params = "";
    // 注意点: 在NODEJS中 ,POST请求的参数我们不能一次性拿到, 必须分批获取
    req.on("data", function (chunk) {
        // 每次只能拿到一部分数据
        console.log(chunk.toString());
        params += chunk;
    });
    req.on("end", function () {
        // 这里才能拿到完整的数据
        // console.log(params);
        let obj = queryString.parse(params);
        // console.log(obj.userName);
        // console.log(obj.password);
        res.end(obj.userName + "----" + obj.password);
    });
});
// 3.指定监听的端口
server.listen(3000);
```

+ 通过`req.method`可以获取请求类别