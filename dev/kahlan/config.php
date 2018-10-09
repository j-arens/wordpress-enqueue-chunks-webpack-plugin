<?php

use Kahlan\Filter\Filters;

Filters::apply($this, 'bootstrap', function ($next) {
    define('WPECP_TEST', true);
    require 'dev/kahlan/mocks/wordpress.php';
    return $next();
});
