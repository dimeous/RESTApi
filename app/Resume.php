<?php

namespace App;

use Illuminate\Support\Collection;

class Resume extends Collection
{
    function __construct() {
        $path = storage_path() . "\\json\\resumes.json";
        $json = json_decode(file_get_contents($path), true);
        $collection=collect($json);
        $this->items = $this->getArrayableItems($collection->toArray());
    }
}
