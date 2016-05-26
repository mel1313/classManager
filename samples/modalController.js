app.controller('modalController', function ($scope, $rootScope, $filter, $sce, $modalInstance, params) {
    $scope.data = {};
    $scope.data.title = "  " + params.title;



    $scope.onOk = function () {
        $modalInstance.close();
    };

    $scope.onCancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
