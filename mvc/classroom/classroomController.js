app.controller('classroomController', ['$scope', '$rootScope', '$log', '$modal', 'sysBitApi', function ($scope, $rootScope, $log, $modal, sysBitApi) {

    $scope.data = {};

    // define form
    $scope.form = {};
    $scope.form.title = 'Class Rooms';
    $scope.myClassList = [];


    //define grid
    $scope.form.student = {
        multiSelect: false,
        enableCellEditOnFocus: true
    };

    //columns
    $scope.form.student.columnDefs = [];
    $scope.form.student.columnDefs.push({ field: "name", displayName: "name", width: "40%" });

    popClassList();

    popTable();

    // function triggered by event

    $scope.onCreateClass = function () {

        var myInstance = $modal.open({
            animation: true,
            templateUrl: 'mvc/addClass/addClassView.html',
            controller: 'addClassController',
            size: 'lg',


        });



        myInstance.result.then(
                                    function (objResponse) {

                                        saveClass(objResponse);

                                    },
                                    function (strCancel) {

                                        var a = 1;

                                    });
      
    }

    $scope.onAddStudent = function () {

        var myInstance = $modal.open({
            animation: true,
            templateUrl: 'mvc/addStudent/addStudentView.html',
            controller: 'addStudentController',
            size: 'lg',

            resolve: {
                params: function () {
                    return { myClass: $scope.data.myClass};             
                }
            }
        });

        myInstance.result.then(
            function (objReturn) {

                addStudent(objReturn)
            }
         )

    }

    $scope.onClassChange = function () {

        popTable();

    }

    // utility functions

    function saveClass(name) {

        var objSave = {}
        objSave.data = {};
        objSave.dbAction = "insert" 

       
        objSave.collectionName = "classroom" 

        objSave.data.name = name;

        sysBitApi.webApi(objSave).then(

                                            function (objResponse) {

                                                addToClassList(name);

                                            },
                                            function (objErr) {

                                                sysBitApi.showHttpErr(objErr);

                                            }
                                    );

    }

    function addToClassList(name) {

        $scope.myClassList.push({ key: name, value: name });

    }

    function popClassList() {

        var objSel = {}
        objSel.data = [];
        objSel.dbAction = "aggregate" 

        
        objSel.collectionName = "classroom"  

        objSel.data.push({ $group: { _id: "$name" } })
        objSel.data.push({ $project: { key: "$_id", value: "$_id" } });

       
       
        sysBitApi.webApi(objSel).then(

                                            function (objResponse) {

                                                $scope.myClassList = objResponse.data;

                                                $scope.data.myClass = objResponse.data[0].value;
                                             

                                            },
                                            function (objErr) {

                                                sysBitApi.showHttpErr(objErr);
                                               
                                            }
                                    );
       
    }

    function addStudent(objReturn) {

        var objSave = {}
        objSave.data = {};
        objSave.dbAction = "insert";

        
        objSave.collectionName = "student";

        objSave.data.class = objReturn.myClass;
        objSave.data.name = objReturn.name;


        sysBitApi.webApi(objSave).then(

                                            function (objResponse) {


                                            },
                                            function (objErr) {

                                                sysBitApi.showHttpErr(objErr);

                                            }
                                    );

    }

    function popTable() {

        var objSel = {}
        objSel.data = [];
        objSel.dbAction = "aggregate";


        objSel.collectionName = "student";

        objSel.data.push({ $match: { class: $scope.data.myClass} });
        objSel.data.push({ $project: { name: 1 } });
        

        sysBitApi.webApi(objSel).then(

                                           function (objResponse) {

                                               $scope.form.student.data = objResponse.data;

                                               popTable();


                                           },
                                           function (objErr) {

                                               sysBitApi.showHttpErr(objErr);

                                           }
                                   );

    }


}]);