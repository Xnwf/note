// 1.导入mongoose
const mongoose = require('mongoose');

// 2.利用mongoose链接MongoDB服务器
mongoose.connect('mongodb://127.0.0.1:27017/it666');

// 3.监听链接成功还是失败
let db = mongoose.connection;
db.on('error', (err)=>{
    console.log(err, '连接失败');
});
db.once('open', function() {
    console.log('连接成功');
});
db.once('close', function() {
    console.log('断开连接');
});

// 1.定义集合中存储数据规则
let userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// 2.利用规则创建集合
let User = mongoose.model('User', userSchema);

// 增加
/*
User.create({name:'zs', age:666}, (err, result)=>{
    if(!err){
        console.log('插入成功');
        console.log(result);
    }
});
*/
/*
User.create([
        {name:'ls', age:18},
        {name:'ls', age:22},
        {name:'ww', age:21},
        {name:'zl', age:23},
        {name:'lnj', age:33},
    ],
    (err, result)=>{
    if(!err){
        console.log('插入成功');
        console.log(result);
    }
});
 */
/*
(async ()=>{
    let result = await User.create([
            {name:'ls', age:18},
            {name:'ls', age:22},
            {name:'ww', age:21},
            {name:'zl', age:23},
            {name:'lnj', age:33},
        ]);
    console.log(result);
})();
 */

// 查询
/*
User.find({},{},(err, docs)=>{
    if(!err){
        console.log(docs);
    }
});
 */
/*
User.find({},{_id:0, name:1, age:1},(err, docs)=>{
    if(!err){
        console.log(docs);
    }
});
 */
/*
User.find({name:'ls'},{_id:0, name:1, age:1},(err, docs)=>{
    if(!err){
        console.log(docs);
    }
});
 */
/*
User.find({},{_id:0, name:1, age:1},{ skip: 5, limit: 5},(err, docs)=>{
    if(!err){
        console.log(docs);
    }
});
 */
/*
(async ()=>{
    let result = await User.find({},{_id:0, name:1, age:1},{ skip: 5, limit: 5});
    console.log(result);
})();
*/

// 修改
/*
User.update({name:'ls'},{$set:{age:888}},(err, docs)=>{
    if(!err){
        console.log('更新成功');
        console.log(docs);
    }
});
 */
/*
User.update({name:'ls'},{$set:{age:888}}, {multi: true},(err, docs)=>{
    if(!err){
        console.log('更新成功');
        console.log(docs);
    }
});
 */
/*
(async ()=>{
   let result = await User.update({name:'ls'},{$set:{age:123}}, {multi: true});
   console.log(result);
})();
 */

// 删除
/*
User.remove({name:'ww'}, {}, (err, docs)=>{
    if(!err){
        console.log('删除成功');
        console.log(docs);
    }
});
 */
/*
User.deleteOne({name:'lnj'}, (err, docs)=>{
    if(!err){
        console.log('删除成功');
        console.log(docs);
    }
});
 */
(async ()=>{
    let result = await User.deleteOne({name:'lnj'});
    console.log(result);
})();