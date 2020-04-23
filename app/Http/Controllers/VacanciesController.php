<?php

namespace App\Http\Controllers;
use App\Resume;
use App\Vacancy;
use App\Work;
use Illuminate\Support\Collection;

class VacanciesController extends Controller
{
    public function index()    {
        $vacncies=new Vacancy;
        $works=new Work;
        $res=collect([]);
        $vacncies->each(function ($item) use($works,$res) {
            foreach ($item['works'] as $k=>$v)
                $item['works'][$k] = $works->get($v)['name'];
            $item['works']=implode(', ',$item['works']);
            $res->push($item);
        });
        return $res->all();
    }


    public function show($vacancyID)
    {

        $vacncies=new Vacancy;
        $works = new Work;
        $res =[];
        $vacncies->each(function ($item) use (&$res,$vacancyID) {
            if ($item['id'] ==$vacancyID) {
                $res = $item;
                return true;
            }
            return;
        });
        $filtered=new Collection;
        if ($res){
            $resumes = new Resume();
            $filtered = new Collection();
            $resumes->each(function ($item) use (&$filtered, &$res){
                if ($item['experience_years']>=$res['experience_years'])
                    $filtered->push($item);
            });
        }
        $res=collect([]);
        $filtered->each(function ($item) use($works,$res) {
            foreach ($item['works'] as $k=>$v)
                $item['works'][$k] = $works->get($v)['name'];
            $item['works']=implode(', ',$item['works']);
            $res->push($item);
        });

        return $res->all();
    }
}
