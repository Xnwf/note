## webpack

### webpack 开端

> webpack是打包JS/CSS/LESS/SCSS/图片等其他文件

使用webpack的原因:

编写代码时,分模块编写,导致导入资源过多,还需要管理模块之间的依赖关系

```js
const path  = require("path")
module.exports = {
    /* mode:指定打包模式
    开发模式:不会对打包的js进行压缩
    上线模式:会对js代码进行压缩
     */
    mode: "production", 
    // "production" | "development" | "none"
    //开发阶段
    devtool: "cheap-module-eval-source-map",
    //上线阶段
    // devtool: "cheap-module-source-map",

    /* 
    指定打包对象
    */
    entry: "./index.js", // string | object | array
    /* 
    指定打包后的模块配置
    */
    
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "dist"), 
        // string
        // 所有输出文件的目标路径
        filename: "bundle.js", // string    
        
        
      },
}
```



### loader

> webpack本质是一个模块打包工具,因此默认只能处理JS文件,不能处理其他文件,因为其他文件中没有模块概念,但为了对图片css等文件进行打包,必须将其他类型文件转换成webpack能够处理的模块,用于将其他类型文件转换为webpack能识别处理模块的工具称为loader

#### 打包图片 file-loader

```bash
npm install --save-dev file-loader
```

```js
import img from './file.png'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                //打包前后名字和拓展名一样
                name:'[name].[ext]',
                //打包后的文件路径
                outputPath: 'images/',
                //第三方服务器路径
                publicPath:'http://xxxx'
            }
          }
        ]
      }
    ]
  }
}
```

生成文件 file.png，输出到输出目录并返回 public URL。

```js
//MD5哈希值
"/public/path/0dcbbaa7013869e351f.png"
```

#### 打包图片 url-loader

> 将图片转成字符串
>
> 对于比较小的图片,转换成base64可能会提升网页性能
>
> 对于比较大的图片,转换成base64则可能导致网页体积变大

```js
import img from './image.png'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //指定图片限制大小,如果超过,就会转换成图片,不会使用base64方式
              limit: 8192
                //其他配置与file-loader一致
            }
          }
        ]
      }
    ]
  }
}
```

#### 打包CSS

```bash
npm install --save-dev css-loader
```

```js
import css from 'file.css';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
          //css-loader用于处理CSS文件中的@import依赖关系
          //style-loader用于将打包好的CSS插入的html中
          //执行顺序是从右至左
        use: [ 'style-loader', 'css-loader' ]
          //这种写法是从上至下
        use: [
          	{
          	loader:'style-loader'
      		},
        	{
          	loader:'css-loader'
      		},
          ]
      }
    ]
  }
}
```

```bash
npm install style-loader --save-dev
```



### ES6模块化

#### 导入导出1

```js
//导出
let name = "ll";
export {name} ;//解构赋值
```

```js
//导入
import {name} from "./模块化";
console.log(name);
```

如果使用`export {}`导出,导入时修改变量名称必须一致

如果使用`export {}`导出,导入时修改名字使用`import {name as str} from '' `

#### 导入导出2

```js
//导出
let name = "ll";
export default name;
```

```js
//导入
import name from "./模块化";
console.log(name);
```

如果使用`export default xxx;`导出,导入时修改变量名称可以不一致

如果使用`export default xxx;`导出,在模块中只能使用一次

**两种方式可以混合使用**

```js
let name = "ll";
let age  = 20;
let say =  function(){
	console.log("xxxx");
}
class Person{
    constructor(){
        this.name = "zs";
    }
}
export {name,age,say};
export default Person;
```

```js
import Person,{name,age,say} from './xxx'
```





### Webpack plugin

#### webpack-html-plugin
```js
plugins: [new HtmlWebpackPlugin({
      template:'./index.html',//打包时带个我们本来就有的html
      minify:'true'//打包后的html是否压缩
    })]
```

#### webpack-clean-plugin

```js
new CleanWebpackPlugin()//清除上一次webpack的东西
```

#### webpack-css-plugin

```js
//打包css文件成单独文件
new MiniCssExtractPlugin({
    filename: 'css/[name].css'
})
```

#### webpack-dev-server

`dev-server`打包时并未将打包文件放入磁盘,而是放在内存中,因为读写磁盘是非常耗时和消耗性能的

热更新插件:内容发生改变时,更新内容但不刷新页面

对于css系统实现了热更新,但js没有提供,需要自己添加

```js
//判断当前是否开启热更新
if(module.hot){
    //告诉热更新需要监听哪一个JS模块的变化
    module.hot.accpet('./xx.js',function(){
        //要做的操作
    })
}
```



```js
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserJSPlugin = require('terser-webpack-plugin');
const Webpack = require('webpack')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
/*   //文件变化时会自动打包 一般用devserver代替
  watch: true,
  watchOptions: {
    aggregateTimeout: 300, //防抖
    poll: 1000, //每隔多少秒监听一次
    ignored: /node_modules/ //排除一些不需要监听的文件夹
  }, */

  devServer:{
    contentBase:"./bundle",
    open:true,//是否自动打开网页
    port:9090,//更改端口号
    hot:true,//开启热更新
    hotOnly:true,//哪怕不支持热更新也不要自动刷新网页
/*     proxy:{
      //当我们在代码中发送请求到/user是,devserver会自动将请求地址替换为target
      '/user':{
        target:'http://127.0.0.1:3001',
        changeOrigin:true,//域名跨域
        secure:false,//https跨域
      }
    } */
    //利用它只能解决开发阶段的跨域问题,并不能解决项目上线后的跨域问题
    //因为上线后是将打包好的,打包好的文件里没要webpack
    proxy:[{
      context:['/user','/login'],
      target:'http://127.0.0.1:3001',
      changeOrigin:true,//域名跨域
      secure:false,//https跨域
      pathRewrite:{'':'/api'}//在每个请求前面加上/api
    }]
  },
  /* mode:指定打包模式
  开发模式:不会对打包的js进行压缩
  上线模式:会对js代码进行压缩*/
  mode: "production", // "production" | "development" | "none"

  //开发阶段
  devtool: "cheap-module-eval-source-map",

  //上线阶段
  // devtool: "cheap-module-source-map",

  /* 指定需要打包的文件*/
  entry: "./src/js/index.js", // string | object | array

  /* 指定打包后的模块配置*/
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    filename: "js/bundle.js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  },
  //配置webpack的优化项 压缩css文件用的
  // optimization: {
  //   minimizer: [new TerserJSPlugin({}),new OptimizeCSSAssetsPlugin({})],
  // },

  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            //打包前后名字和拓展名一样
            name: '[name].[ext]',
            //打包后的文件路径
            outputPath: 'images/',
          }
        }, ]
      },
      {
        test: /\.css$/,
        //css-loader用于处理CSS文件中的@import依赖关系
        //style-loader用于将打包好的CSS插入的html中
        //这种写法是从下至上
        use: [{
            loader: MiniCssExtractPlugin.loader,
            //如果启用热更新,需要添加如下配置
            options:{
              hmr:true
            }
          },
          {
            loader: 'css-loader'
          },
        ]
      }
    ]
  },

  /* 告诉webpack需要新增一些什么样的功能 */
  plugins: [
    //自动添加html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: 'true' //打包后的html是否压缩
    }),
    //清除上次打包的文件
    new CleanWebpackPlugin(),
    //打包css文件成单独文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    //创建热更新插件
    new Webpack.HotModuleReplacementPlugin()
  ],

}
```

另外需要在package.json中配置

```js
 "webpack": "npx webpack-dev-server --config webpack.config.js"
```



三个配置文件

```js
    "dev": "npx webpack --config webpack.config.dev.js",
    "prod": "npx webpack --config webpack.config.prod.js"
```

#### webpack.config.common.js

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    /*
    entry: 指定需要打包的文件
    * */
    entry: './src/js/index.js',
    /*
    output: 指定打包之后的文件输出的路径和输出的文件名称
    * */
    output: {
        /*
            filename: 指定打包之后的JS文件的名称
            * */
        filename: 'js/bundle.js',
        /*
        path: 指定打包之后的文件存储到什么地方
        * */
        path: path.resolve(__dirname, 'bundle')
    },
    /*
    module: 告诉webpack如何处理webpack不能够识别的文件
    * */
    module: {
        rules: [
            // 检查编码规范的规则
            {
                // enforce: "pre"作用: 让当前的loader再其它loader之前执行
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                loader: 'eslint-loader',
                options: {
                    // eslint options (if necessary)
                    fix: true
                }
            },
            // 打包JS规则
            // babel 用于ES678 适配低版本浏览器
            {
                test: /\.js$/,
                exclude: /node_modules/, // 告诉webpack不处理哪一个文件夹
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        targets: {
                            // "chrome": "58",
                        }
                        // useBuiltIns: "usage"
                    }]],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                absoluteRuntime: false,
                                corejs: 2,
                                helpers: true,
                                regenerator: true,
                                useESModules: false
                            }
                        ]
                    ]
                }
            },
            // 打包字体图标规则
            {
                test: /\.(eot|json|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // 指定打包后文件名称
                            name: '[name].[ext]',
                            // 指定打包后文件存放目录
                            outputPath: 'font/'
                        }
                    }
                ]
            },
            // 打包图片规则
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 指定图片限制的大小
                            limit: 1024,
                            // 指定打包后文件名称
                            name: '[name].[ext]',
                            // 指定打包后文件存放目录
                            outputPath: 'images/',
                            publicPath: 'http://127.0.0.1:9090/images'
                        }
                    },
                    {
                        // 该loader用于图片质量压缩
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            // 打包CSS规则
            {
                test: /\.css$/,
                use: [
                    {
                        // loader: "style-loader"
                        // 压缩css放到一个单独的文件中
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 适配热更新
                            hmr: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true // 开启CSS模块化
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            // 打包LESS规则
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }, {
                    loader: 'postcss-loader'
                }]
            },
            // 打包SCSS规则
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }, {
                    loader: 'postcss-loader'
                }]
            }
        ]
    },
    /*
    plugins: 告诉webpack需要新增一些什么样的功能
    * */
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/doc', to: 'doc' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
};

```



#### webpack.config.dev.js

```js
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');

const DevConfig = {
    /*
    devServer: 自动检测文件变化配置
    * */
    devServer: {
        contentBase: './bundle',
        open: true,
        port: 9090,
        proxy: [{
            context: ['/user', '/login'],
            target: 'http://127.0.0.1:3000',
            changeOrigin: true, // 域名跨域
            secure: false, // https跨域
            pathRewrite: { '': '/api' } // 路径重写, 将路径中的api替换为空
        }],
        hot: true, // 开启热更新, 只要开启了热更新就不会自动刷新网页了
        hotOnly: true // 哪怕不支持热更新也不要刷新网页
    },
    /*
    配置sourcemap
    development: cheap-module-eval-source-map
    production: cheap-module-source-map
    * */
    devtool: 'cheap-module-eval-source-map',
    /*
    mode: 指定打包的模式, 模式有两种
    一种是开发模式(development): 不会对打包的JS代码进行压缩
    还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压缩
    * */
    mode: 'development', // "production" | "development"
    /*
    plugins: 告诉webpack需要新增一些什么样的功能
    * */
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包的模板, 如果不指定会自动生成一个空的
            template: './src/index.html'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = merge(CommonConfig, DevConfig);

```



#### webpack.config.prod.js

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');

const ProdConfig = {
    /*
    optimization: 配置webpack的优化项
    * */
    optimization: {
        // 压缩js和css代码
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    /*
    配置sourcemap
    development: cheap-module-eval-source-map
    production: cheap-module-source-map
    * */
    devtool: 'cheap-module-source-map',
    /*
    mode: 指定打包的模式, 模式有两种
    一种是开发模式(development): 不会对打包的JS代码进行压缩
    还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压缩
    * */
    mode: 'production', // "production" | "development"
    /*
    plugins: 告诉webpack需要新增一些什么样的功能
    * */
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包的模板, 如果不指定会自动生成一个空的
            template: './src/index.html',
            minify: {
                // 告诉htmlplugin打包之后的html文件需要压缩
                collapseWhitespace: true
            }
        })

    ]
};
module.exports = merge(CommonConfig, ProdConfig);

```

### Webpack 优化

#### tree shaking

> 打包时不打包未引用的方法/css(通常用于上线阶段)

通过 purifycss 插件以及webpack优化项

```
npm i -D purifycss-webpack purify-css
```

```js
    //优化项 告诉webpack只打包用到的js tree shaking
    optimization:{
        usedExports:true
    }
```



#### 代码分割

> 由于所有js都被打包,会导致用户重复下载未改变的js文件,此时,我们可以将经常修改的文件放在一个打包文件中,不常修改的文件放在一个打包文件中.

在common的optimization中添加

```js
splitChunks: {
    chunks: 'all',
},
```

#### 异步加载模块

> 由于页面中,有时模块用不到,因此可以把一些用到才加载的模块写成异步加载模块(需要把eslint的版本改成11),异步代码会默认代码分割

```js
//promise写法
function getComponent() {
    return import('jquery').then(({
        default: $
    }) => {
        const $div = $('<div>我是div</div>');
        return $div;
    });
}
//async await写法
async function getComponent() {
	const { default: $ } = await import('jquery');
	const $div = $('<div>我是div</div>');
	return $div;
}

```



#### Prefetch

> 利用空闲时间去加载 

利用魔法注释

```js
async function getComponent() {
    // 该注释的意思是,在空闲的是时候加载当前模块
    const { default: $ } = await import(
        /* webpackPrefetch: true */ /* webpackChunkName:"Jquery" */ 'jquery');
    const $div = $('<div>我是div</div>');
    return $div;
}
```



#### 长缓存优化

webpack中有三种hash

1. hash 根据编译内容生成的,每次都不一样
2. chunkhash  根据不同的入口文件(entry)进行依赖文件解析(只支持css和js,不支持其他资源)
3. contenthash(推荐) 根据某个文件内容生成哈希值,只要某个文件内容改变,就会改变

```js
 filename: 'js/[name].[contenthash].js',
     name: '[name].[contenthash].[ext]'
```

**tips:和热更新插件冲突**

SplitChunkPlugin 

> 异步代码自动打包的就运用的该插件

```js
  optimization: {
    splitChunks: {
      chunks: 'async',//分割打包异步代码 all是全部
      minSize: 20000,//被分割代码的最小体积
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,//引入次数
      maxAsyncRequests: 30, //异步加载并发最大请求书
      maxInitialRequests: 30,//最大的初始请求数
      automaticNameDelimiter: '~',//被分割文件名的连接符
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
            //专门用于处理node_modules中引入的模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10//优先级大于default
        },
        default: {
            //处理默认任意地方引入的模块
          minChunks: 2,//至少被引入几次
          priority: -20,
              //是否需要复用分割代码
          reuseExistingChunk: true
        }
      }
    }
  }
```



#### 模块的引入方式

1. 在HTML中全局引用
2. 用npm安装,通过import导入

3. 使用Provide-Plugin (全局引入)推荐使用这个

   ```js
   const webpack = require('webpack');
   
   new webpack.ProvidePlugin({
     $: 'jquery',
     jQuery: 'jquery'4
   });
   ```

4. imports-loader

   > https://www.webpackjs.com/loaders/imports-loader/

   ```js
   $ npm install imports-loader --save-dev
   ```

   还可以修改模块中this的指向

   修改this指向时,系统会将代码放在一个立即执行函数中

#### Resolve

配置模块导入的规则,比如是否优先导入css等

> https://www.webpackjs.com/configuration/resolve/



#### noParse

独立的库不需要分析依赖关系

```js
module :{
    noParse:/jquery/
}
```

#### IgnorePlugin

如moment.js这个库中存在大量不同语言,打包时会变得很大,为了局部打包某些 文件,尅使用

```js
//打包moment这个库时,整个locate都忽略掉
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
```

另外需要手动导入自己需要的文件



#### externals

导入的第三方库不要反复打包时,这个方式导入的是cdn的包,不是npm的包

> https://www.webpackjs.com/configuration/externals/



#### dll动态链接库

1. 新建一个配置文件,专门用于打包不会变化的第三方库

```js
const path = require("path");
const webpack = require('webpack');
module.exports = {
    //该配置文件是用于,将cdn引入的js打包到一个单独的dll文件中,便于管理配置
    mode: 'production',
	/*
    entry: 指定需要打包的文件
    * */
	entry: {
		vendors: ['jquery']
	},
	output: {
		/*
            filename: 指定打包之后的JS文件的名称
            * */
		filename: '[name].dll.js',
		/*
        path: 指定打包之后的文件存储到什么地方
        * */
        path: path.resolve(__dirname, 'dll'),
        library:'[name]'
    },
    plugins:[
        //打包第三方库时,生成一个清单文件
        new webpack.DllPlugin({
            name:'[name]',
            path:path.resolve(__dirname,'dll/[name].manifest.json')
        })
    ]
};

```



2. 在打包项目的配置文件中,通过add-assert-html-webpack-plugin将通过dll配置文件打包生成的js文件插入到html中

```js
"dll": "npx webpack --config webpack.config.dll.js"
npm run dll
```

```js
  new HtmlWebpackPlugin(),
        new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname,'dll/vendors.dll.js') }),
```



3. 在dll配置文件中生成配置清单

```js
    plugins:[
        //打包第三方库时,生成一个清单文件
        new webpack.DllPlugin({
            name:'[name]',
            path:path.resolve(__dirname,'dll/[name].manifest.json')
        })
    ]
```



4. 在打包项目的配置文件中,告诉webpack从清单文件中查询,如果包含就不引入了

```js
new webpack.DllReferencePlugin({
          manifest:path.resolve(__dirname,'dll/vendors.manifest.json')
        })
```



#### happypack

> https://www.npmjs.com/package/happypack

webpack默认是单线程,使用happypack可以多线程打包各类文件



#### 打包多页面应用

```js
//1. 指定多个入口
entry: {
    index: './src/js/index.js',
    other: './src/js/other.js',
}
//2. 创建多个插件以及设置其相关js文件
new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename:'index.html',
    chunks:['index','vendors~index']
}),        
new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename:'other.html',
    chunks:['other','vendors~other']
}),
```

#### bundle analyze

图形化界面工具,可以查看打包结果