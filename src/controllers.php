<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

//Request::setTrustedProxies(array('127.0.0.1'));

$app->get('/', function (Request $request) use ($app) {
    $page = $request->get('page');
    if(is_null($page))
        $page = 1;
    
    return $app['twig']->render('pages/news.html.twig', array('type' => 'topstories', 'page' => $page));
})
->bind('homepage');

$app->get('/newest', function (Request $request) use ($app) {
    $page = $request->get('page');
    if(is_null($page))
        $page = 1;

    return $app['twig']->render('pages/news.html.twig', array('type' => 'newstories', 'page' => $page));
});

$app->get('/past', function (Request $request) use ($app) {
    $page = $request->get('page');
    if(is_null($pages))
        $page = 1;

    return $app['twig']->render('pages/news.html.twig', array('type' => 'past', 'page' => $page));
});

$app->get('/item', function (Request $request) use ($app) {
    $id = $request->get('id');
    return $app['twig']->render('pages/item.html.twig', array('id' => $id));
});


$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        'errors/'.$code.'.html.twig',
        'errors/'.substr($code, 0, 2).'x.html.twig',
        'errors/'.substr($code, 0, 1).'xx.html.twig',
        'errors/default.html.twig',
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});
