app.controller('addClassController', function ($scope, $rootScope, $filter, $sce, $modalInstance, sysBitApi) {

    $scope.data = {};
    $scope.data.title = "Add Class";
    $scope.data.class = "";


    $scope.onOk = function () {

        if ($scope.data.class == "") {
            sysBitApi.showMsg(-1, "INPUT ERROR", "group name is required");
            return;
        }

        ChkClass($scope.data.class);

    };

    $scope.onCancel = function () {
        $modalInstance.dismiss('cancel');
    };

    
    function ChkClass(myClass) {

        var objChk = {};
        objChk.data = { name: myClass };

        objChk.dbAction = "findOne";

        objChk.collectionName = "classroom";

        sysBitApi.webApi(objChk).then(

                                            function (objResponse) {


                                                if (objResponse.data != "") {

                                                    sysBitApi.showMsg(-1, "INVALID ENTRY", "class exist!");
                                                    return;
                                                }

                                                else {
                                                    $modalInstance.close($scope.data.class);
                                                }
                                            },
                                            function (objErr) {

                                                sysBitApi.showHttpErr(objErr);

                                            }
                                    );
    }

});
