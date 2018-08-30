## What

This is a simple webpack plugin that maps all of your entries and split chunks into a manifest. A PHP script is then generated with the manifest and a few other variables. That script can then be used in WordPress projects to easily register any required scripts and it's dependencies without having to keep track of webpack compilation changes. 

## Why

When utilizing Webpack's `splitChunks` optimization you won't always know what the final output will be. It can be a pain to keep track of any changes to the ouput and making sure all scripts and it's depedencies are registered in WordPress.

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
  
Making any number of changes in your `splitChunks` config could result in a totally different compilation result from Webpack. This plugin will help you automate registering these scripts in WordPress without having to know what chunks are required for each script.

## How

Require or autoload the generated PHP script in your project. Using the entries and output from above as an example, you can call `registerScript(['foo'])` and `foo.bundle.js` along with `vendors-foo.bundle.js`, `common-foo-bar.bundle.js`, and any other required chunks will automatically be registered with WordPress for you.

#### Install

```
npm i -D wordpress-enqueue-chunks-webpack-plugin
```

#### Usage

With Webpack

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
      phpScriptDir: 'where-the-php-script-should-go',
      context: 'theme',
      namespace: 'my-theme-js',
      delimiter: '-',
    }),
  ],
}
```

With WordPress

```php
use function WordpressEnqueueChunksPlugin\registerScripts;

// register all scripts
registerScripts();

// register specific scripts
registerScripts(['foo', 'bar']);

// args passed to wp_register_script can be filtered for each script
add_filter('wpecp/register/foo', function($args) {
  array_push($args['deps'], 'media-editor', 'jquery');
  return $args;
});

wp_enqueue_script('my-theme-js-foo');
```
