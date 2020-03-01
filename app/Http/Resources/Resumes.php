<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class Resumes extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    function __construct() {
        $path = storage_path() . "\\json\\resumes.json";
        $json = json_decode(file_get_contents($path), true);
        $this->collection= collect($json);

    }
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
