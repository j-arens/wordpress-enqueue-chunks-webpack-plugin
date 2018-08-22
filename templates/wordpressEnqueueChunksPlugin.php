<?php

${header}

namespace WordpressEnqueueChunksPlugin;

class AssetRegistrationException extends \\Exception {};

/**
 * Get the manifest
 * 
 * @return array
 */
function getManifest()
{
    static $manifest = null;
    if (is_null($manifest)) {
        $manifest = json_decode('${props.manifest}', true);
    }
    return $manifest;
}

/**
 * Check if a script has already been registered
 * 
 * @param string $asset
 * @return boolean
 */
function isRegistered($asset)
{
    return wp_script_is("${props.prefix}$asset", 'registered');
}

/**
 * Get the full url to an asset
 * 
 * @param string $file
 * @param string $context
 * @return string
 */
function getAssetUrl($file, $context)
{
    $dir = trailingslashit('${props.assetsDir}');
    if ($context === 'plugin') {
        return plugins_url($dir . $file);
    }
    return get_theme_file_uri($dir . $file);
}

/**
 * Maps an asset's dependencies by name
 * 
 * @param string $asset
 * @return array
 */
function mapDependencies($asset)
{
    $manifest = getManifest();
    if (isset($manifest['entries'][$asset])) {
        return array_map(function($dep) {
            return "${props.prefix}$dep";
        }, $manifest['entries'][$asset]['deps']);
    }
    return [];
}

/**
 * Generates arguments to be passed to wp_register_script
 * 
 * @param string $asset
 * @param array $data
 * @return array
 */
function makeScriptArgs($asset, array $data)
{
    $handle = "${props.prefix}$asset";
    $src = getAssetUrl($data['file'], '${props.context}');
    $deps = mapDependencies($asset);
    $version = $data['hash'];
    $inFooter = true;
    return compact('handle', 'src', 'deps', 'version', 'inFooter');
}

/**
 * Register an asset
 * 
 * @param string $asset
 * @param array $args
 * @return boolean
 */
function register($asset, array $args)
{
    if (isRegistered($asset)) {
        return true;
    }
    $filtered = apply_filters("wpecp/register/$asset", $args);
    $success = call_user_func_array('wp_register_script', $filtered);
    if (!$success) {
        throw new AssetRegistrationException("Unable to register $asset!");
        return false;
    }
    return true;
}

/**
 * Get an array of chunks and chunk meta from an array of script names
 * 
 * @param array $assets
 * @param array $manifest
 * @return array
 */
function getChunks(array $assets, array $manifest)
{
    if (empty($assets)) {
        return $manifest['chunks'];
    }
    $deps = array_reduce($assets, function($acc, $asset) use($manifest) {
        if (isset($manifest['entries'][$asset])) {
            return array_merge($acc, $manifest['entries'][$asset]['deps']);
        }
        return $acc;
    }, []);
    $keys = array_flip(array_unique(array_merge($assets, $deps)));
    return array_intersect_key($manifest['chunks'], $keys);
}

/**
 * Registers all or just some of the assets in a manifest
 * 
 * @param array $scripts
 * @return void
 */
function registerScripts(array $scripts = [])
{
    $manifest = getManifest();
    foreach (getChunks($scripts, $manifest) as $chunk => $data) {
        if (isRegistered($chunk)) {
            continue;
        }
        $args = makeScriptArgs($chunk, $data);
        register($chunk, $args);
    }
}
