<?php

namespace App;

use Illuminate\Support\Collection;

class Work extends Collection
{
    function __construct() {
        $path = storage_path() . "\\json\\works.json";
        $json = json_decode(file_get_contents($path), true);
        $collection=collect($json);
        $keyed = $collection->keyBy('id');
        $this->items = $this->getArrayableItems($keyed);
    }
}
