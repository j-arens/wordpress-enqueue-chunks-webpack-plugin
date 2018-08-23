## What

This is a simple webpack plugin that maps all of your entries and split chunks into a manifest. A simple PHP script is then generated with the aforementioned manifest and a few other variables. That script can then be used in WordPress projects to easily register any required scripts without having to keep track of changes from build to build. 

## Why

When utilizing Webpack's `splitChunks` optimization you won't always know what the final output will be. It can be a pain to keep track of any changes to the ouput and making sure all scripts plus it's depedencies are registered in WordPress.

For example, passing the following entries into Webpack could result in the following output depending on how `splitChunks` is configured:

###### Entries
 - src/foo.js
 - src/bar.js
 
###### Output
  - foo.bundle.js
  - bar.bundle.js
  - vendors-foo.bundle.js
  - common-foo-bar.bundle.js
  - vendors-bar.bundle.js
  
Making any number of changes in your `splitChunks` config could result in a totally different compilation result from Webpack. Instead of trying to manually keep track of the built scripts this plugin allows you to simply register a known entry script, and the PHP script generated will take care of registering it as well as any required chunks.

## How

#### Install

```
npm i -D wordpress-enqueue-chunks-webpack-plugin
```

#### Usage

In Webpack

| Name           | Type                | Required | Description                                                                                   |
|----------------|---------------------|----------|-----------------------------------------------------------------------------------------------|
| `AssetsDir`    | `{string}`          | yes      | Path to your built scripts                                                                    |
| `phpScriptDir` | `{string}`          | yes      | Path to where you want the generated PHP script to go                                         |
| `namespace`    | `{string}`          | no       | Prefix added to the handle used when registering scripts with WordPress                       |
| `delimiter`    | `{string}`          | no       | Specify a delimiter to be used between the namespace and script name when creating a handle   |
| `context`      | `{plugin \| theme}` | no       | Defaults to plugin, tells the PHP script how to resolve the absolute path to the built assets |

```js
const { WordPressEnqueueChunksPlugin } = require('wordpress-enqueue-chunks-webpack-plugin');

module.exports = {
  plugins: [
    new WordPressEnqueueChunksPlugin({
      assetsDir: 'path-to-your-built-scripts',
      phpScriptDir: 'path-to-where-the-php-script-will-go',
    }),
  ],
}
```

In WordPress

```php
use function WordpressEnqueueChunksPlugin\registerScripts;

// the args passed to wp_register_script can be filtered
add_filter('wpecp/register/foo', function($args) {
  array_push($args['deps'], 'media-editor', 'jquery');
  return $args;
});

// register specific scripts
registerScripts(['foo', 'bar']);

// register all scripts
registerScripts();

wp_enqueue_script('foo');
```
