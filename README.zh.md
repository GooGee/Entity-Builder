
<p align="center">
    <img src="public/logo.svg" alt="logo" width="222" />
</p>

# Entity-Builder

:tomato: Laravel 代码生成器 [Online](https://googee.github.io/Entity-Builder/dist)

可深度定制模板。


## 功能

- 自定义逻辑层 (Controller, Model, Repository, 等等)
- 自定义预设值 (Laravel type, PHP type, MySQL type, 等等)
- 自定义模板 (模板引擎支持指令: `for`, `if`, 等等)
- 根据数据库 schema 生成 Laravel Migration
- 在线部署 PHP 代码
- 设计数据表
- 定义模型工厂
- 添加数据验证规则


## 应用举例

创建 Migration

![Table](https://github.com/GooGee/Entity-Builder/raw/gh-pages/image/table.gif)

自动添加注释到 `Model`

![Model](https://github.com/GooGee/Entity-Builder/raw/gh-pages/image/model.png)


## 在线部署 PHP 代码

只能在 `local` 环境中使用！

1. 下载 [dist.zip](https://github.com/GooGee/Entity-Builder/releases)
1. 解压到 Laravel 项目的 public 目录
1. 访问 http://localhost/dist/index.html
1. 安装 PHP [package](https://github.com/GooGee/Entity)
1. 点击 'Connect' 按钮


## 快速开始

如果只需要生成简单模板
> 用这几个页面即可: 'Table', 'Model', 'File'

如果想要定制模板
> 关注 'Script' 和 'Template' 页  
> 在 'Script' 中定义方法后，就可以在 'Template' 中调用  

关系
> 一个 `Entity` 包含很多 `File` 例如: UserController.php, UserRepository.php  
> 一个 `File` 属于一个 `Layer`  
> 每个 `Layer` 都有一个 `Script` 和一个 `Template`  


## 文档

[模板引擎](https://mozilla.github.io/nunjucks/templating.html)

[Entity-Core](https://googee.github.io/Entity-Core/docs/)
