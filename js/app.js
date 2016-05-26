var app = angular.module('app', ['ngRoute', 'ngTouch', 'ui.grid', 'ui.grid.selection',  'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.selection', 'ui.grid.pinning','ui.bootstrap', 'ui.grid.moveColumns','ngFileUpload','ngMessages'])

app.config(['$routeProvider', '$httpProvider' ,function ($routeProvider, $httpProvider) {


    //////Enable cross domain calls
    //$httpProvider.defaults.useXDomain = true;

    ////Remove the header used to identify ajax call  that would prevent CORS from working
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

  

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }


    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


    $httpProvider.interceptors.push(['$rootScope', '$q',  function ($rootScope, $q) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};

                var value = $rootScope.token;

                if (value != null) {
                   
                    if (value.length > 0) {
                        config.headers.Authorization = 'Token ' + value;
                    }
                }
                return config;
            },
            'responseError': function (response) {
           
                return $q.reject(response);
            }
        };
    }]);



    //////////////////////////////////////////////////////////////


    $routeProvider.
         when("/signUp", {
             templateUrl: "mvc/logIn/signUpView.html",
             controller: "signUpController"
            

         }).

        when("/addStudent", {
            templateUrl: "mvc/addStudent/addStudentView.html",
            controller: "addStudentController",
            resolve: {
                isAllowed: function ($rootScope, $q) {
                    var deferred = $q.defer();
                    if ($rootScope.isLogIn == true) {
                        deferred.resolve();
                    }


                    return deferred.promise;

                }
            }

        }).

         when("/addClass", {
             templateUrl: "mvc/addClass/addClassView.html",
             controller: "addClassController",
             resolve: {
                 isAllowed: function ($rootScope, $q) {
                     var deferred = $q.defer();
                     if ($rootScope.isLogIn == true) {
                         deferred.resolve();
                     }


                     return deferred.promise;

                 }
             }

         }).

       
        when("/classroom", {
            templateUrl: "mvc/classroom/classroomView.html",
            controller: "classroomController",
            resolve: {
                isAllowed: function ($rootScope, $q) {
                    var deferred = $q.defer();
                    if ($rootScope.isLogIn == true) {
                        deferred.resolve();
                    }


                    return deferred.promise;

                }
            }

        }).

        when("/student", {
            templateUrl: "mvc/student/studentView.html",
            controller: "studentController",
            resolve: {
                isAllowed: function ($rootScope, $q) {
                    var deferred = $q.defer();
                    if ($rootScope.isLogIn == true) {
                        deferred.resolve();
                    }


                    return deferred.promise;

                }
            }

        }).

         when("/teacher", {
             templateUrl: "mvc/teacher/teacherView.html",
             controller: "teacherController",
             resolve: {
                 isAllowed: function ($rootScope, $q) {
                     var deferred = $q.defer();
                     if ($rootScope.isLogIn == true) {
                         deferred.resolve();
                     }


                     return deferred.promise;

                 }
             }

         }).

           when("/menu", {
          templateUrl: "mvc/menu/menuView.html",
          controller: "menuController",
          resolve: {
              isAllowed: function ($rootScope, $q) {
                  var deferred = $q.defer();
                  if ($rootScope.isLogIn == true) {
                      deferred.resolve();
                  }


                  return deferred.promise;

              }
          }

        }).
         when("/userId", {
            templateUrl: "myLib/mvc/userId/userIdView.html",
            controller: "userIdController",
            resolve: {
                isAllowed: function ($rootScope, $q) {
                    var deferred = $q.defer();
                    if ($rootScope.isLogIn == true) {
                        deferred.resolve();
                    }


                    return deferred.promise;

                }
            }

        }).
         when("/group", {
             templateUrl: "myLib/mvc/group/groupView.html",
             controller: "groupController",
             resolve: {
                 isAllowed: function ($rootScope, $q) {
                     var deferred = $q.defer();
                     if ($rootScope.isLogIn == true) {
                         deferred.resolve();
                     }


                     return deferred.promise;

                 }
             }

         }).
        when("/splash", {
            templateUrl: "mvc/splash/splashView.html",
             controller: "splashController",
            resolve: {
                isAllowed: function ($rootScope, $q) {
                    var deferred = $q.defer();
                    if ($rootScope.isLogIn == true) {
                        deferred.resolve();
                    }


                    return deferred.promise;

                }
            }

        }).

      when("/", { templateUrl: "mvc/logIn/logInView.html", controller: "logInController" })
}])

