
<p align="center">
    <img src="src/assets/logo.svg" alt="logo" width="222" />
</p>

# Entity-Builder

:tomato: Laravel 代码生成器 [Online](https://googee.github.io/Entity-Builder/dist)

## 功能

- 自定义逻辑层 (Controller, Model, Repository, 等等)
- 自定义模板 (模板引擎支持指令: `for`, `if`, 等等)
- 根据数据库 schema 生成 Laravel Migration
- 在线部署 PHP 代码
- 设计数据表
- 定义模型工厂
- 添加数据验证规则


## 应用举例

### 创建 Migration

![Migration](https://github.com/GooGee/Entity-Builder/raw/main/image/table.gif)

### 添加数据验证规则

![Validation](https://github.com/GooGee/Entity-Builder/raw/main/image/rule.gif)

### 根据数据库结构生成 Laravel Migration

![Schema](https://github.com/GooGee/Entity-Builder/raw/main/image/schema.gif)

### 自动添加注释到 `Model`

![Model](https://github.com/GooGee/Entity-Builder/raw/main/image/model.png)


## 在线部署 PHP 代码

只能在 `local` 环境中使用！

1. 下载 [dist.zip](https://github.com/GooGee/Entity-Builder/releases)
1. 解压到 Laravel 项目的 public 目录
1. 访问 http://localhost/dist/index.html
1. 安装 PHP [package](https://github.com/GooGee/Entity)
1. 点击 'Connect' 按钮


## 文档

[模板引擎](https://mozilla.github.io/nunjucks/templating.html)

[Entity-Doc](https://googee.github.io/Entity-Builder/docs/model/index.html)
