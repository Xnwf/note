## GIT

默认情况下，文件在工作区（不被git管理）

版本库：将工作区的文件添加到暂缓区，再移动到head指针指向的区

### 使用环境
- 单人使用的时候需要一个本地库
- 多人使用的时候需要一个版本共享库S(Git服务区,第三方如GitHub等)

### Git 的好处
- 通过git可以查看修改了哪些文件
- 查看修改了哪些地方
- 回退代码版本
***
### 常见指令
- **初始化**
    + `Git init` 初始化一个空的仓库 
    + `git config -l` 查看配置项
    + `git config user.name "xxx"` 添加姓名以及邮件属性,用于身份识别
    + `git status` 用于查看git工作区中没有被托管的文件以及修改状态

- **添加至版本库**
    + `git add filename` 添加文件加入git的暂缓区
    + `git add .` 添加所有文件加入git的暂缓区
    + `git commit -m "some statements"` 将暂缓区中所有的文件添加到head指针指向的master分支/其他分支分区,并添加注释

- **版本控制**
    + `git diff filename`查看修改前后文件的不同之处
    + `git log filename` 查看一个文件的修改历史
    + `git log` 查看所有文件修改历史
    + `git reflog` 查看简单的修改历史
    + `git reset --hard HEAD^` 恢复上一个版本
    + `git reset --hard reflog中的版本号` 恢复到任意版本号 

- **代码git**
    + `git clone 远程服务器共享版本库地址` 初始化一个git远程版本库
    + `git push`提交到远程服务器
    + `git pull`其他开发人员拿到更新的代码

- **分支**
    + `git branch`查看分支
    + `git branch branchName`创建分支
    + `git branch -r`查看远程服务器的分支
    + `git merge branchName`合并分支
    + `git branch -d branchName`删除本地分支
    + `git push origin --delete branchName`删除远程分支
    
- **项目标记**
    + `git tag -a v0.x -m "注释"` 给当前项目打一个标记
    + `git tag` 查看标记
    + `git push origin tag` 将tag提交到远程仓库 
    + `git show tag`查看不同tag的信息 

----
### 忽略Git管理
`touch .gitignore` 通过修改文件的内容,可以选择忽略各种类型的文件
[企业开发忽略文件链接](https://github.com/github/gitignore)
```javascript
#               表示此为注释,将被Git忽略
*.a             表示忽略所有 .a 结尾的文件
!lib.a          表示但lib.a除外
/TODO           表示仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/          表示忽略 build/目录下的所有文件，过滤整个build文件夹；
doc/*.txt       表示会忽略doc/notes.txt但不包括 doc/server/arch.txt
 
bin/:           表示忽略当前路径下的bin文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin:           表示忽略根目录下的bin文件
/*.c:           表示忽略cat.c，不忽略 build/cat.c
debug/*.obj:    表示忽略debug/io.obj，不忽略 debug/common/io.obj和tools/debug/io.obj
**/foo:         表示忽略/foo,a/foo,a/b/foo等
a/**/b:         表示忽略a/b, a/x/b,a/x/y/b等
!/bin/run.sh    表示不忽略bin目录下的run.sh文件
*.log:          表示忽略所有 .log 文件
config.php:     表示忽略当前路径的 config.php 文件
 
/mtk/           表示过滤整个文件夹
*.zip           表示过滤所有.zip文件
/mtk/do.c       表示过滤某个具体文件
 
被过滤掉的文件就不会出现在git仓库中（gitlab或github）了，当然本地库中还有，只是push的时候不会上传。
 
需要注意的是，gitignore还可以指定要将哪些文件添加到版本管理中，如下：
!*.zip
!/mtk/one.txt
 
唯一的区别就是规则开头多了一个感叹号，Git会将满足这类规则的文件添加到版本管理中。为什么要有两种规则呢？
想象一个场景：假如我们只需要管理/mtk/目录中的one.txt文件，这个目录中的其他文件都不需要管理，那么.gitignore规则应写为：：
/mtk/*
!/mtk/one.txt
 
假设我们只有过滤规则，而没有添加规则，那么我们就需要把/mtk/目录下除了one.txt以外的所有文件都写出来！
注意上面的/mtk/*不能写为/mtk/，否则父目录被前面的规则排除掉了，one.txt文件虽然加了!过滤规则，也不会生效！
 
----------------------------------------------------------------------------------
还有一些规则如下：
fd1/*
说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
 
/fd1/*
说明：忽略根目录下的 /fd1/ 目录的全部内容；
 
/*
!.gitignore
!/fw/ 
/fw/*
!/fw/bin/
!/fw/sf/
说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；注意要先对bin/的父目录使用!规则，使其不被排除。
```

---

### Git使用
#### 个人开发

**一.  准备工作(只做一次)**
1. 创建一个工作区
2. 在工作区使用`git init`初始化一个版本库
3. 使用`git config`设置姓名和邮箱
4. 使用`git config -l` 查看设置情况

**二.  开发阶段**

1. 编写代码
2. 通过`git add filename/git add .(所有文件)` 添加到暂缓区
3. 通过`git commit -m "annotation" 提交到版本库的master分
+ **Tips: **
	- 每完成一个功能模块后再add commit
	- annotation一定要好好写
4. 重复上述功能

#### 多人开发

1. 在远程服务器上创建一个版本库
	- 项目负责人在远程服务器上创建一个工作区
	- 在工作区中初始化GIt远程版本库`git init --bare`
	
2. 开发人员下载版本库
	- 开发人员在自己电脑上打开git
	- 从远程服务器下载共享版本库`git clone 远程服务器共享版本库地址`
	
3. 和单人开发一样
	- 设置用户名和邮箱
	- 编写代码
	- 添加暂缓区
	- 提交代码
	- `git push`提交到远程服务器
	- `git pull`其他开发人员拿到更新的代码
	
	**Tips**
	
	- 切记不能将不能运行的代码提交
	
	- 如果服务器上有其他开发人员更新内容,我们必须先pull以后再提交自己的更新
	
	- 如果更新内容和其他同事的内容有冲突(同一个文件的同一行代码),需要我们手动更新冲突,再提交
	
	  **开发技巧:只要开发完了一个功能就立即提交,因为企业开发中,谁后提交谁就负责解决冲突,谁的工作量就会增加**


### GIT分支
1. 如何创建一个分支
	- 可以通过`git branch`查看分支,如果是空的版本库就不会输出
	- 如果出现`*master`就表明当前head指针指向master分支
	- 可以通过`git branch branchName`创建分支
2. 如何切换分支
	- 通过`git switch branchName`切换分支 
3. 如何将分支提交到远程服务器
	- 通过`git branch -r`可以查看远程服务器的分支
	- 切换到新建的分支
	- `git push`提交分支
	- `git push --set-upstream origin branchName`提交成功
4. 如何合并分支
	- 切换回master分支
	- 通过`git merge branchName`来合并分支
5. 如何删除分支
	- `git branch -d branchName`删除本地分支
	- `git push origin --delete branchName`删除远程分支

### Gitflow

![image-20200830202502700](C:\Users\HerMajesty\AppData\Roaming\Typora\typora-user-images\image-20200830202502700.png)
一、准备阶段
    1.初始化远程工作区和共享版本库
    2.项目经理初始化项目, 并在master定制标记
    3.将master分支提交到远程服务器
    4.项目经理基于master分支创建develop分支
    5.项目经理将新建的分支提交到远程的服务器
    4.项目经理给开发人员分配工作任务
二、开发阶段
    1.开发人员基于develop分支创建功能分支
    2.开发人员在自己的分支上add commit push
    3.开发完成告诉项目经理, 由项目经理审核代码并合并代码到develop
三、准备上线阶段
    1.项目经理基于develop分支创建release分支
    2.测试人员获取release分支代码进行测试
    3.发现bug由开发人员基于release分支创建bugfix分支进行修复
    4.修复完成后重新合并到release分支
    5.将测试和修复完所有bug的最终代码合并到master分支和develop分支git
四、正式上线阶段
    1.项目经理给master分支制定标记
    2.项目经理将标记提交到远程服务器
    3.项目完成上线
五、上线之后
    1.项目上线后如果出现了紧急bug
    2.基于master分支创建hotfix分支, 在该分支上修复bug
    3.修复完成后重新合并到master分支和develop分支
    4.项目经理在master分支定制标记



