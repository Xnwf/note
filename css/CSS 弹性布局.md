### CSS 弹性布局

![image-20200316093920688](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316093920688.png)

将上面三个盒子水平放置

#### 实现方式

1. 使用display

   ````css
       ul>li{
           width: 100px;
           height: 100px;
           line-height: 100px;
           font-size: 30px;
   
        	display: inline-block;
       
   
       }
   ````

   需要将<li>写成如下形式

   ````html
       <ul>
           <li>1</li><li>2</li><li>3</li>
       </ul>   
   ````

   

2. 使用float浮动实现

   ````css
       ul{
           width: 500px;
           margin: 0 auto;
           margin-top: 100px;
           border: 1px solid #000;
           list-style: none;
           text-align: center;
           box-sizing: border-box;
           overflow: hidden;
       }
   
       ul>li{
           width: 100px;
           height: 100px;
           line-height: 100px;
           font-size: 30px;
           float: left; 
   
       }
   ````

   

3. 弹性布局

   ````css
       ul{
           width: 500px;
           margin: 0 auto;
           margin-top: 100px;
           border: 1px solid #000;
           list-style: none;
           text-align: center;
           box-sizing: border-box;
           
           display: flex;
       }
   ````

   伸缩容器<ul>  伸缩项<li> 

   伸缩容器有主轴和侧轴

   ![image-20200316100131822](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316100131822.png)

***

#### 伸缩容器主轴对齐方向

默认情况下，伸缩容器的主轴是水平方向，默认主轴方向在最左边，所有伸缩项都是从主轴的起点开始排版的

但可以通过属性来修改

```css
/*用于修改主轴方向*/
flex-direction
```

````css
flex-direction:row-reverse;
````

![image-20200316101326175](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316101326175.png)

````css
flex-direction:column;
````

![image-20200316101519780](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316101519780.png)

````css
flex-direction:column-reverse;
````

![image-20200316101739744](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316101739744.png)

**主轴和侧轴永远保持垂直**

***

#### 伸缩项位于主轴的位置

```css
justify-content
```

justify-content包括以下属性：

````css
/* 主轴起点位置 */
justify-content: flex-start;
/* 主轴终点位置 */
justify-content: flex-end;
/* 主轴终点位置 */
justify-content:center;
````

````css
/*（伸缩容器宽度-伸缩项宽度）/伸缩项个数*2 */
justify-content: space-around;
````

![image-20200316103341625](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316103341625.png)

````css
/*（伸缩容器宽度-伸缩项宽度）/伸缩项个数-1 */
justify-content: space-between;
````

![image-20200316103503852](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316103503852.png)

***

#### 伸缩容器侧轴对齐方式

```css
align-items
```

align-items包括以下属性：

````css
/* 起点 */
align-items: flex-start;
/* 终点 */
align-items: center;
/* 底部 */
align-items: flex-end;
````

**tips:**

1. 没有两端和环绕对齐
2. 用于伸缩容器中

```css
/*基线对齐*/
align-items: baseline;
```

![image-20200316105836903](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316105836903.png)

```css
/* 拉伸对齐/等高对齐
伸缩项不能设置高度，否做会无效
*/
align-items: stretch;
```

![image-20200316110244638](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316110244638.png)

***

如果想在伸缩容器中单独控制某个伸缩项在侧轴的对齐方式，可采用如下属性：

```css
align-self
```

**tips**：用于伸缩项

***

#### 伸缩布局换行

当伸缩项的总宽度大于伸缩容器是，会将伸缩项的进行等比压缩，以达到将所有伸缩项都放入伸缩容器中

```css
    ul{
        width: 500px;
        height: 600px;
        margin: 0 auto;
        margin-top: 100px;
        border: 1px solid #000;
        list-style: none;
        box-sizing: border-box;
        display: flex;
        flex-direction:row;
    }

    ul>li{
        width: 300px;
        height: 200px;
        line-height: 100px;
        font-size: 30px;
    }
```

![image-20200316112055291](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316112055291.png)



***

##### 伸缩项是否换行

> flex-wrap

```css
/* 默认值 不换行*/
flex-wrap: nowrap;
/* 换行 */
flex-wrap: wrap;
/* 换行且反转顺序 */
flex-wrap: wrap-reverse;
```

##### 换行后侧轴的对齐方式

> alien-content

```css
/* 侧轴起点 */
align-content: flex-start;
/* 侧轴中点 */
align-content: center;
/* 侧轴终点 */
align-content: flex-end;
/* 侧轴环绕 */
align-content: space-around;
/* 侧轴拉伸 */
align-content: space-between;
```

***

##### 伸缩项排序

> order

​	伸缩项属性，默认为0，order越大排的越后

```css
    ul>li:nth-child(1){
        background-color: blue;
        order: 2;
    }
```



***

##### 伸缩项扩充

> flex-grow

````css
    ul>li:nth-child(1){
        background-color: blue;
        flex-grow: 1;
    }
    ul>li:nth-child(2){
        background-color: rgb(32, 173, 86);
        flex-grow: 2;
    }
    ul>li:nth-child(3){
        background-color: rgb(157, 255, 0);
        flex-grow: 5;
    }
````

![image-20200316115002653](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200316115002653.png)

**tips：**

1. 按比例填充伸缩容器
2. 在伸缩项宽度总和小于伸缩容器宽的时才有效
3. 默认取值为0
4. (伸缩容器宽度-伸缩项宽度总和)/扩充比例总和*该伸缩项所占比例+当前的宽度 =伸缩项扩充后的宽度

***

##### 伸缩项缩小

>   flex-shrink

```css
    ul>li:nth-child(1){
        background-color: blue;
        flex-shrink: 1;
    }
    ul>li:nth-child(2){
        background-color: rgb(32, 173, 86);
        flex-shrink: 2;
    }
    ul>li:nth-child(3){
        background-color: rgb(157, 255, 0);
        flex-shrink: 3;
    }
```

**tips：**

1. 在伸缩项宽度总和大于伸缩容器宽的时等比缩小自己
2. 在伸缩项宽度总和大于伸缩容器宽的时才有效
3. 默认取值为1
4. 900-600=300   1\* 300+2\*300+3\*300=1800   如第一个<li>的宽度就应为300\*300\*n/1800

***

##### 扩充和缩小的注意点：

1. 扩充和缩小的是主轴方向，如果主轴方向垂直，则相应的会在垂直方向进行

2. 伸缩布局中可以通过flex-basis属性设置宽度

   ```css
       ul>li:nth-child(1){
           background-color: blue;
           flex-basis: 100px;
       }
   ```

3. 伸缩布局中flex-basis的优先级>width，且只在伸缩布局中有效

4. 伸缩布局下，同时通过flex-basis和width，一个auto，一个有具体值，会使用具体值的属性

##### 属性连写

> flex：扩充 缩小 宽度

```css
    ul>li:nth-child(1){
        background-color: blue;
        flex:1 1 auto;
    }
    ul>li:nth-child(2){
        background-color: rgb(32, 173, 86);
        flex:2 1 auto;

    }
    ul>li:nth-child(3){
        background-color: rgb(157, 255, 0);
        flex:3 1 auto;

    }
```

