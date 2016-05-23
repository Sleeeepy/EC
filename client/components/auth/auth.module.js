'use strict';

angular.module('ecApp.auth', [
  'ecApp.constants',
  'ecApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
