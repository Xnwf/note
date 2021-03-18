// 1.导入mongoose
const mongoose = require('mongoose');

/*
mongodb://MongoDB服务器IP地址:MongoDB服务器端口号/需要打开的数据库名称
* */
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
// 注意点: 只要创建好了模型, 那么以后就可以使用模型来操作这个集合
// 注意点: mongoose会自动将我们指定的集合名称变成复数
let User = mongoose.model('User', userSchema);

// 3.利用集合创建文档
// 注意点: 只要创建好了对象, 那么以后就可以使用对象来操作文档
let u = new User({ name: 'zs', age:18 });

// 4.操作文档
u.save((err, product) => {
    if (!err){
        console.log('文档保存成功');
        console.log(product);
    }
});