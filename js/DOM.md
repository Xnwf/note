### DOM

#### window

window是一个全局对象,代表浏览器中一个打开的窗口,每个窗口都是一个window对象

#### document

document是window的一个属性,是一个对象

代表当前窗口的整个网页,通过它可以操作网页上所有的内容

#### DOM

Document Object Model 文档对象模型

HTML标签也称DOM元素

使用document时可以不加window



##### 获取DOM元素

```js
    //id
	let oDiv=document.getElementById("box");
    console.log(oDiv);
    console.log(typeof(oDiv));
	//class
    let oDivs=document.getElementsByClassName("father");
    console.log(oDivs);
    console.log(typeof(oDivs));
	//name
    let oDivs1=document.getElementsByName("test");
    console.log(oDivs1);
    console.log(typeof(oDivs1));
	//标签
    let oDivs2=document.getElementsByTagName("div");
    console.log(oDivs2);
    console.log(typeof(oDivs2));
	//选择器,只返回第一个
    // let oDivs3=document.querySelector("#box");
    let oDivs3=document.querySelector(".father");
    console.log(oDivs3);
    console.log(typeof(oDivs3));
	//选择器返回所有
    let oDivs4=document.querySelectorAll(".father");
    console.log(oDivs4);
    console.log(typeof(oDivs4));
```

   ##### 获取指定元素子元素

```js
    let oDiv=document.getElementById("box");
    console.log(oDiv);
    //指定元素中所有的子元素
    console.log(oDiv.children);
    //指定元素中所有的节点
    console.log(oDiv.childNodes);
```

![img](https://upload-images.jianshu.io/upload_images/16749538-64b1ae6106efded7.png?imageMogr2/auto-orient/strip|imageView2/2/w/486/format/webp)

![image-20200419163623973](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200419163623973.png)

```js
    //获取元素节点
    for(let node of oDiv.childNodes){
        if(node.nodeType === Node.ELEMENT_NODE ){
            console.log(node)
        }
    }
```

```js
    let oDiv=document.getElementById("box");
    console.log(oDiv.firstChild);//第一个子节点
    console.log(oDiv.firstElementChild);//第一个子元素
    console.log(oDiv.lastChild);//最后一个子节点
    console.log(oDiv.lastElementChild);//最后一个子元素
    let item = document.getElementById("hh");
    console.log(item.parentElement)//获取父元素
    console.log(item.parentNode)//获取父节点
    console.log(item.previousSibling)//获取相邻的上一节点
    console.log(item.previousElementSibling)//获取相邻的上一元素
    console.log(item.nextSibling)//获取相邻的下一节点
    console.log(item.nextElementSibling)//获取相邻的下一元素
```

##### 元素增删改查

```js
    //1.创建节点
    let oSpan = document.createElement("span");
    console.log(oSpan);
    //2.添加节点
    let oDiv = document.querySelector("div");
    // oDiv.appendChild(oSpan);//添加到最后
    //3.插入节点
    let oH1 = document.querySelector("h1");
    //插入在某节点前面
    oDiv.insertBefore(oSpan,oH1);
    //4.删除节点
    oSpan.parentNode.removeChild(oSpan);
    //5.节点克隆
    oDiv.cloneNode();//不包含子元素
    oDiv.cloneNode(true);//包含子元素
```

##### 属性的增删改查

```js
    let oImg = document.querySelector("img");
    //这种方式无法获取自定义的属性
    console.log(oImg.alt);
    //这种方式可以获取自定义的属性
    console.log(oImg.getAttribute("alt"));
    //改,和上述一致
    console.log(oImg.setAttribute("title","222"));
    //增 不存在就新增,存在就修改
    oImg.setAttribute("wofol","222")
    //删
    oImg.removeAttribute("alt");
```

##### 获取内容

1.innerHTML获取的内容包含标签,InnerText/textContent不包含标签

2.innerHTML/textContent不会去除两端空格

```js
    let oDiv = document.querySelector("div");
    console.log(oDiv.innerHTML);
    console.log(oDiv.innerText);
    console.log(oDiv.textContent);

	// oDiv.innerHTML = "<span>www</span>";//www
	//不会转化标签,这两个有兼容性问题
    // oDiv.innerText = "<span>www</span>";//<span>www</span>
    // oDiv.textContent = "<span>www</span>";//<span>www</span>
```

##### 操作元素样式

```js
    let oDiv = document.querySelector("div");
    // oDiv.className = 'box';
    oDiv.style.background = "pink"//设置的都是行内样式
    oDiv.style.width = "300px"
    console.log(oDiv.style.width);//只能获取到行内样式的值
    let style = window.getComputedStyle(oDiv);
    console.log(style.width);//可以取到全部样式
```

##### 事件

用户和浏览器之间的交互行为称为事件,比如:点击/移入/移出

给元素绑定事件

元素.事件名称=function(){};



##### 箭头函数

1.普通方法中的this,谁调用就是谁

2.箭头函数中的this,指向它父作用域的this

3.箭头函数中的this不可以被bind call apply这类的函数修改

```js
    //全局 0级
    console.log(this);//Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
    let p = {
        a:"nn",
        say:function(){
            //1级
            console.log(this);//{a: "nn", say: ƒ, hi: ƒ}
        },
        hi:()=>{
            console.log(this);//Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
        }  
    }
    p.say();
    p.hi();

    function Person(){
        this.name = "xx",
        this.say = function(){
            console.log(this);//Person {name: "xx", say: ƒ, hi: ƒ}
        },
        this.hi = ()=>{
            console.log(this);//Person {name: "xx", say: ƒ, hi: ƒ}
        }

        }
        
    
    let person = new Person();
    person.say();
    person.hi();

    person.say.apply({name:"didi"});//{name: "didi"}
    person.hi.apply({name:"didi"});//Person {name: "xx", say: ƒ, hi: ƒ}
```

