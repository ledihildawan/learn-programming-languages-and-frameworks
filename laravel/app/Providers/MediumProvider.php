<?php

namespace App\Providers;

use JonathanTorres\MediumSdk\Medium;
use Illuminate\Support\ServiceProvider;

class MediumProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        return $this->app->bind('medium-app-sdk', function () {
            return new Medium(config('medium'));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->make('router')->get('medium', function () {
            return 'medium home';
        });
    }
}
