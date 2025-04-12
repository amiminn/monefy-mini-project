<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccessTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('access-token');
        $access_token = "xZivrDzRAFLqUUveAebNfGbd";

        if ($token !== $access_token) {
            return response()->json([
                'error' => 'Unauthorized. Invalid access token.'
            ], 401);
        }

        return $next($request);
    }
}
