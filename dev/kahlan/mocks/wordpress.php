<?php

function trailingslashit($str) {
    return $str . '/';
};

function plugins_url($path) {
    return WPECP_TEST_CONFIG['_plugin_url'] . $path;
};

function get_theme_file_uri($path) {
    return WPECP_TEST_CONFIG['_theme_url'] . $path;
};

function wp_script_is() {};
function apply_filters() {};
function wp_register_script() {};
