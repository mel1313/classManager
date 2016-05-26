app.controller('addStudentController', function ($scope, $rootScope, $filter, $sce, $modalInstance, sysBitApi, params) {



    $scope.data = {};
    $scope.data.title = "Add Student";
    $scope.myClass = params.myClass;
    


    $scope.onOk = function () {

        if ($scope.data.student == "") {
            sysBitApi.showMsg(-1, "INPUT ERROR", "student name is required");
            return;
        }

        studentChk($scope.data.student)
       
    };

    $scope.onCancel = function () {
        $modalInstance.dismiss('cancel');
    };



    function studentChk(student) {



        var objChk = {};
        objChk.data = { name: student, "class": $scope.myClass };


        objChk.dbAction = "findOne";

        objChk.collectionName = "student";


        sysBitApi.webApi(objChk).then(

                                            function (objResponse) {


                                                if (objResponse.data != "") {

                                                    sysBitApi.showMsg(-1, "INVALID ENTRY", "Student exist in your class!");
                                                    return;
                                                }

                                                else {
                                                    $modalInstance.close({ name: $scope.data.student, myClass: $scope.myClass });
                                                }
                                            },
                                            function (objErr) {

                                                sysBitApi.showHttpErr(objErr);

                                            }
                                    );

    }

});

