# Laravel Builder

Intuitive productivity tool for Laravel. [demo](https://googee.github.io/laravel-builder/build003)

You no longer need to write migrations, Doctrine will do it for you.

[PhpStorm plugin Laravel Builder](https://plugins.jetbrains.com/plugin/20064)

[PhpStorm plugin Laravel Generator](https://plugins.jetbrains.com/plugin/15276)


## features

- design database schemas
- manage database migrations
- generate OpenApi document
- generate CRUD files


## install

[PhpStorm plugin](https://plugins.jetbrains.com/plugin/20064)

```bash
composer require --dev googee/laravel-builder

php artisan vendor:publish --provider="GooGee\LaravelBuilder\LaravelBuilderServiceProvider"

php artisan setupLaravelBuilder
```

```php
        'user' => [
            'driver' => 'daily',
            'path' => storage_path('logs/user.log'),
            'level' => env('LOG_LEVEL', 'debug'),
        ],
```


## how to generate migrations?

![migration](https://googee.github.io/laravel-builder/image/migration.gif)

- go to `Migration` page, then select the `User` in sidebar
- click `▼` button to generate the `Entity` file
- click `diff` button to generate a migration file
- click `►|` button to run `php artisan migrate`
- to ignore a table, add its name to the file `config/laravelbuilder.php`

Doctrine compares files in `database/Entity` with the database schemas, and generate a migration file of their difference.


## how to generate CRUD files?

![crud](https://googee.github.io/laravel-builder/image/crud.gif)

- go to `Entity` page, then select `User` in sidebar
- select `File` tab, then click `▼` button to generate the file


## how to generate OpenApi document?

- click `OpenApi` in the menu bar
- click `toJSON` button, then copy the text
- click `editor` link, then paste in the editor


## how file is generated?

for example, lets generate the User `Entity` file.
when `▼` button is clicked, this plugin will do the following:

- GUI fetch all files in `laravel-builder/code`
- execute code in `code-helper.js`
- execute code in `file-1.js` (`1` is the id of `Entity`)
- render template `file-1.txt`
- write the result text to `database/Entity/User.php`


## how to generate custom files?

- go to `Tree` page, then select a file in sidebar
- click `edit` script button to modify the code (optional)
- click `edit` template button to modify the text
- go to `Entity` page, then select `User` in sidebar
- select `File` tab, then click `▼` button to generate the file

Note: if changes didn't work, make sure to save the changed file manually, PhpStorm doesn't save the changed file immediately.

for example

```JavaScript
function run(data) {
    /** @type {DataForScript} */
    const ddd = data

    // define variable `model`
    ddd.model = ddd.db.tables.File.find(item => item.name === 'Model')

    // define function `toString`
    ddd.toString = function(object) {
        return JSON.stringify(object)
    }
}
```

in template

```txt
{{ model.name }}

{{ toString(model) }}
```

[templating engine](https://mozilla.github.io/nunjucks/templating.html)
