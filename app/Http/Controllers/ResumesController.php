<?php

namespace App\Http\Controllers;
use App\Resume;

class ResumesController extends Controller
{
    public function index()    {
        $resume=new Resume;
        return $resume->all();;
    }

    public function show($resumeID)
    {
        $resume=new Resume;
        return $resume->get($resumeID);
    }
}
