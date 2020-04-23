<?php

namespace App\Http\Controllers;
use App\Vacancy;
use App\Resume;
use App\Work;
use Illuminate\Support\Collection;

class ResumesController extends Controller
{
    public function index()    {
        $resumes=new Resume;
        $works=new Work;
        $res=collect([]);
        $resumes->each(function ($item, $key) use($works,$res) {
            foreach ($item['works'] as $k=>$v)
                $item['works'][$k] = $works->get($v)['name'];
            $item['works']=implode(', ',$item['works']);
            $res->push($item);
        });
        return $res->all();
    }

    public function show($resumeID)
    {

        $resumes = new Resume;
        $works = new Work;
       $res =[];
        $resumes->each(function ($item) use (&$res,$resumeID) {
            if ($item['id'] ==$resumeID) {
                $res = $item;
                return true;
            }
        });
        $filtered=new Collection;
        if ($res){
            $vacancies = new Vacancy;
            $filtered = new Collection();
             $vacancies->each(function ($item) use (&$filtered, &$res){
                 if ($item['experience_years']<=$res['experience_years'])
                     $filtered->push($item);
            });
        }
        $res=collect([]);
        $filtered->each(function ($item, $key) use($works,$res) {
            foreach ($item['works'] as $k=>$v)
                $item['works'][$k] = $works->get($v)['name'];
            $item['works']=implode(', ',$item['works']);
            $res->push($item);
        });

        return $res->all();
    }
}
