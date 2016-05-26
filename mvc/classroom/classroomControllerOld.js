app.controller('classroomController', ['$scope', '$rootScope', '$log', 'sysBitApi', function ($scope, $rootScope, $log, sysBitApi) {

    // navigation controls
    $rootScope.preventNavigation = true;
    $scope.$watch('masterForm.$dirty', function (dirty) {
        if (dirty) {
            $rootScope.dirty = true;
        }

    });


    // initial page load
    $scope.load()

    // define title
    $scope.form.title = 'classroom';

    // define columns for table grid display
    $scope.form.table.columnDefs.push({ field: 'code', displayName: 'Code', width: 200 })
    $scope.form.table.columnDefs.push({ field: 'name', displayName: 'Name', width: 200 })

    // place your code here
    ///////////////////////////////







    ///////////////////////////////

    // initiate
    $scope.init('classroom');

    // populate the table grid display
    $scope.tablePop();


    // save trigger
    $scope.onSave = function () {


        // default validation
        if (!$scope.masterForm.$valid) {
            sysBitApi.showMsg(-1, "INPUT ERROR", "Invalid Entries")
            return;
        }

        // other validation you require
        ///////////////////////////////







        ///////////////////////////////

        $scope.$parent.onSave();

    }






}]);