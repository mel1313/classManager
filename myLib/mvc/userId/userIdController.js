app.controller('userIdController', ['$scope','$rootScope', '$log', 'sysBitApi',function ($scope,$rootScope, $log, sysBitApi) {

    // navigation controls
    $rootScope.preventNavigation = true;
    $scope.$watch('masterForm.$dirty', function (dirty) {
        if (dirty) {
            $rootScope.dirty = true;
        }

    });


    $scope.load()


    $scope.form.title = 'UserId';

  //$scope.form.table.name= 'userId';

    $scope.local.userId ='';
    $scope.local.pswd = '';
 


    // Define Columns for Table Grid display
    $scope.form.table.columnDefs.push({ field: 'userId', displayName: 'UserId', width: 200 })
    $scope.form.table.columnDefs.push({ field: 'name', displayName: 'Name', width: 200 })

    if ($rootScope.config.dbType == "mongoDb") {
        $scope.form.table.columnDefs.push({ field: 'userGroup[0].name', displayName: 'User Group', width: 200 })
    }
    else {
        $scope.form.table.columnDefs.push({ field: 'userGroup', displayName: 'User Group', width: 200 })

    }


    if ($rootScope.config.dbType == "mongoDb") {
        $scope.mongoAggregate.push({ $lookup: { from: "userGroup", localField: "userGroup", foreignField: "_id", as: "userGroup" } });
        $scope.mongoAggregate.push({ $project: { "_id": 1, "_ts": 1, "name": 1, "userId": 1, "userGroup": 1 } });
        $slice: ["$favorites", 3]
    }


    // Define LookUp References
    $scope.form.lookUpList.push("userGroup");

    // Initialize 
    $scope.init('userId')


    $scope.tablePop();

    $scope.data.reset = false;
 

        $scope.onSave = function () {

            if ($scope.masterForm.$invalid) {
                angular.forEach($scope.masterForm.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });

                return;

            }

            //if (!$scope.masterForm.$valid) {
            //    sysBitApi.showMsg(-1, "INPUT ERROR", "Invalid Entries")
            //    return;
            //}


            //if ($scope.data.name == undefined | $scope.data.name == "") {
            //    sysBitApi.showMsg($scope.form.msgAlert, "Mandatory Data", "Name must be provided");
            //    return;
            //}


            //if ($scope.data.userId == undefined | $scope.data.userId == "") {
            //    sysBitApi.showMsg($scope.form.msgAlert, "Mandatory Data", "UserId must be provided");
            //    return;
            //}

            //if ($scope.data.eMail == undefined | $scope.data.eMail == "") {
            //    sysBitApi.showMsg($scope.form.msgAlert, "Mandatory Data", "Email must be provided");
            //    return;
            //}


            //if ($scope.data.userGroup == undefined | $scope.data.userGroup == "") {
            //    sysBitApi.showMsg($scope.form.msgAlert, "Mandatory Data", "Group must be provided");
            //    return;
            //}

            if ($scope.data.activeDir != true) {
                if ($scope.data.pswd == undefined | $scope.data.pswd == "") {
                    sysBitApi.showMsg($scope.form.msgAlert, "Mandatory Data", "Password must be provided");
                    return;
                }

                if ($scope.local.userId != $scope.data.userId && $scope.local.pswd == $scope.data.pswd) {
                    sysBitApi.showMsg($scope.form.msgAlert, "Mandatory Data", "New UserId requires new Password");
                    return;
                }


            }

            if ($scope.data.pswd != $scope.local.pswd) {

                var strUserId = new String($scope.data.userId);
                var strPswd = new String($scope.data.pswd);

       
                $scope.data.pswd = sysBitApi.hashCode(strUserId.trim() + strPswd.trim());
            }
           
            $scope.$parent.onSave();

        }

        //$scope.activeDirEnabled = function () {
        //    return $rootScope.config.activeDir;
    //}

    // Events
        $scope.$on('dataEvent', function (event, result) {

            if (result.success = true && result.event == 'dataPop') {

                $scope.local.userId = $scope.data.userId;
                $scope.local.pswd = $scope.data.pswd;

            }

        });

    }]);

