#### VIVO

a标签清除默认样式

```css
.header-left li a{
    text-decoration: none;
    color:#ccc;
}
```

当一个元素某个方向上浮动时，最好不要设置该方向的margin

横向导航栏可以采用flex布局左右对齐

````css
{   display: flex;
    justify-content: space-between;
}
````

logo通常采用h1标签

常见的banner结构

````html
            <ul>
                <li><a href=""><img src="" alt=""></a></li>
            </ul>
````

默认图片是inline-block类型标签，并且它在底部是有默认的空格，以及会解析标签中间的空格

````css
vertical-align: bottom
````

伸缩容器中图片居中

```css

.main>.main-bottom{
    display: flex;
    width: 100%;
}
.main>.main-bottom>div{
    flex:1;
    height: 300px;
    position: relative;父元素相对定位
}
.main>.main-bottom>div img{
    position: absolute;子元素绝对定位
    left: 50%;
    transform: translateX(-50%);
}
```

