<?php

namespace WordpressEnqueueChunksPlugin;

use function Eloquent\Phony\Kahlan\stubGlobal;

require 'templates/wordpressEnqueueChunksPlugin.php';

describe('wordpressEnqueueChunksPlugin', function () {
    beforeEach(function () {
        // stubs
        $this->trailingslashit = stubGlobal('trailingslashit', __NAMESPACE__)->forwards();
        $this->wp_script_is = stubGlobal('wp_script_is', __NAMESPACE__);
        $this->plugins_url = stubGlobal('plugins_url', __NAMESPACE__)->forwards();
        $this->get_theme_file_uri = stubGlobal('get_theme_file_uri', __NAMESPACE__)->forwards();
        $this->apply_filters = stubGlobal('apply_filters', __NAMESPACE__);
        $this->wp_register_script = stubGlobal('wp_register_script', __NAMESPACE__);
        $this->call_user_func_array = stubGlobal('call_user_func_array', __NAMESPACE__);

        // default config
        $jsonmanifest = file_get_contents('dev/fixtures/manifest.json');
        $this->config = [
            'manifest' => json_decode($jsonmanifest, true),
            'namespace' => 'lol',
            'delimiter' => '_',
            'phpOutputDir' => 'lol/rofl/dir',
            'context' => 'plugin',
            'assetsDir' => 'lol-plugin/public/js',
            '_plugin_url' => 'https://sweet-site.com/wp-content/plugins/',
            '_theme_url' => 'https://sweet-site.com/wp-content/themes/lol-theme/',
        ];
        !defined('WPECP_TEST_CONFIG') && define('WPECP_TEST_CONFIG', $this->config);

        $this->getBuiltPrefix = function () {
            return $this->config['namespace'] . $this->config['delimiter'];
        };

        $this->getBuiltPath = function ($context) {
            return $this->config['_' . $context . '_url'] . $this->config['assetsDir'] . '/';
        };
    });

    describe('getChunks()', function () {
        it('gets all the chunks for the given entry', function () {
            $result = getChunks(['e3'], $this->config['manifest']);
            expect($result)->toBeA('array')->toBe([
                'common-e3-e1' => $this->config['manifest']['chunks']['common-e3-e1'],
                'vendors-e3-e1' => $this->config['manifest']['chunks']['vendors-e3-e1'],
                'vendors-e3' => $this->config['manifest']['chunks']['vendors-e3'],
                'e3' => $this->config['manifest']['chunks']['e3'],
            ]);
        });

        it('gets all the chunks for all the entries if none are specified', function () {
            $result = getChunks([], $this->config['manifest']);
            expect($result)->toBeA('array')->toBe([
                'common-e3-e1' => $this->config['manifest']['chunks']['common-e3-e1'],
                'vendors-e3-e1' => $this->config['manifest']['chunks']['vendors-e3-e1'],
                'e1' => $this->config['manifest']['chunks']['e1'],
                'vendors-e2' => $this->config['manifest']['chunks']['vendors-e2'],
                'e2' => $this->config['manifest']['chunks']['e2'],
                'vendors-e3' => $this->config['manifest']['chunks']['vendors-e3'],
                'e3' => $this->config['manifest']['chunks']['e3'],
            ]);
        });
    });

    describe('makeHandle()', function () {
        it('concats the namespace and delimiter opts with an asset to make a handle', function () {
            $result = makeHandle('sweet_brah');
            expect($result)->toBe('lol_sweet_brah');
        });
    });

    describe('isRegistered()', function () {
        it('returns false if a script has not already been registered with WP', function () {
            $this->wp_script_is->returns(false);
            $result = isRegistered('e1');
            expect($result)->toBe(false);
        });

        it('returns true if a script has already been registered with WP', function () {
            $this->wp_script_is->returns(true);
            $result = isRegistered('e1');
            expect($result)->toBe(true);
        });
    });

    describe('getAssetUrl', function () {
        it('returns the url to an asset when the context is plugin', function () {
            $file = $this->config['manifest']['chunks']['e1']['file'];
            $result = getAssetUrl($file, 'plugin');
            expect($result)->toBe($this->getBuiltPath('plugin') . $file); 
        });

        it('returns the url to an asset when the context is theme', function () {
            $file = $this->config['manifest']['chunks']['e1']['file'];
            $result = getAssetUrl($file, 'theme');
            expect($result)->toBe($this->getBuiltPath('theme') . $file);
        });
    });

    describe('mapDependencies()', function () {
        it('makes an array of an assets dependencies', function () {
            $result = mapDependencies('e3');
            $prefix = $this->getBuiltPrefix();
            expect($result)->toBeA('array')->toBe([
                0 => $prefix . 'common-e3-e1',
                1 => $prefix . 'vendors-e3-e1',
                2 => $prefix . 'vendors-e3',
            ]);
        });
    });

    describe('makeScriptArgs()', function () {
        it('makes an array of args to be passed to wp_register_script', function () {
            $data = $this->config['manifest']['chunks']['vendors-e2'];
            $result = makeScriptArgs('vendors-e2', $data);
            expect($result)->toBeA('array')->toBe([
                'handle' => $this->getBuiltPrefix() . 'vendors-e2',
                'src' => $this->getBuiltPath('plugin') . $data['file'],
                'deps' => [],
                'version' => $data['hash'],
                'inFooter' => true,
            ]);
        });
    });

    describe('register()', function () {
        it('returns true if the asset has already been registered', function () {
            $this->wp_script_is->returns(true);
            $result = register('e2', []);
            expect($result)->toBe(true);
        });

        it('registers an asset with WP', function () {
            $this->wp_script_is->returns(false);
            $this->wp_register_script->returns(true);
            $args = [
                'handle' => $this->getBuiltPrefix() . 'e2',
                'src' => $this->getBuiltPath('plugin') . $this->config['manifest']['chunks']['e2']['file'],
                'deps' => [0 => $this->getBuiltPrefix() . 'vendors-e2'],
                'version' => $this->config['manifest']['chunks']['e2']['hash'],
                'inFooter' => true,
            ];
            $this->call_user_func_array->returns($this->wp_register_script());
            $this->apply_filters->returns($args);
            $result = register('e2', $args);
            $this->apply_filters->calledWith('wpecp/register/e2', $args);
            $this->call_user_func_array->calledWith('wp_register_script', $args);
            $this->wp_register_script->called();
            expect($result)->toBe(true);
        });

        it('throws an exception if it could not register an asset', function () {
            $this->wp_register_script->returns(false);
            $this->call_user_func_array->returns($this->wp_register_script());
            expect(function () {register('e2', []);})
                ->toThrow(new AssetRegistrationException('Unable to register asset e2!'));
        });
    });
});
