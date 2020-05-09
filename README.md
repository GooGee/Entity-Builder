
<p align="center">
    <img src="public/logo.svg" alt="logo" width="222" />
</p>

# Entity-Builder

:tomato: Laravel generator [Online](https://googee.github.io/Entity-Builder/dist)

With deeply customizable template.

[中文介绍](README.zh.md)


## Feature

- Custom layer (Controller, Model, Repository, etc.)
- Custom preset (Laravel type, PHP type, MySQL type, etc.)
- Custom template (not plain text, with syntax: `for`, `if`, etc.)
- Convert database schema to Laravel Migration
- Deploy PHP code online
- Design table fields and indexes
- Define model factories
- Make field validation rules


## Example

Create a Migration

![Table](https://github.com/GooGee/Entity-Builder/raw/gh-pages/image/table.gif)

Add doc to `Model` automatically

![Model](https://github.com/GooGee/Entity-Builder/raw/gh-pages/image/model.png)


## Deploy PHP code online

Only available in `local` environment!

1. Download the [dist.zip](https://github.com/GooGee/Entity-Builder/releases)
1. Unzip it to the public folder of your Laravel project
1. Visit http://localhost/dist/index.html
1. Install the PHP [package](https://github.com/GooGee/Entity)
1. Click 'Connect' button


## Quick Start

If you just want some templates
> Stay at 'Table', 'Model', 'File' pages

If you want to do some customization
> Focus on 'Script' and 'Template' pages  
> Define a function in a `Script`, then you can call it in a `Template`  

Relation
> An `Entity` includes many `File` eg: UserController.php, UserRepository.php  
> A `File` belongs to a `Layer`  
> Every `Layer` has a `Script` and a `Template`  


## Document

[Template](https://mozilla.github.io/nunjucks/templating.html)

[Entity-Core](https://googee.github.io/Entity-Core/docs/)


## Project setup
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Lints and fixes files
```
npm run lint
```
