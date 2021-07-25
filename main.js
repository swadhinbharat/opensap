angular.module("myapp", []).controller('OpenSAPController', ['$scope', '$http',
    function($scope, $http) {

        // Initializations
        // $scope.filterValue = 's4hana';
        
        // var opensapURL='/destinations/northwind/V4/Northwind/Northwind.svc/Invoices?$top=15';  
        var opensapURL = 'https://open.sap.com/api/v2/courses?include=channel%2Cuser_enrollment';
        $http({
            method: 'GET',
            url: opensapURL
        }).then(function successCallback(response) {
            var results = response.data.data.filter(function(course){
                return course.attributes.language === 'en';
            });
            var courses = [];

            _.each(results, function(result) {
                var course = {};
                course.title = result.attributes.title;
                course.status = result.attributes.status;
                course.accessible = result.attributes.accessible;
                course.startdate = moment(new Date(result.attributes.start_at), "YYYYMMDD").fromNow();
                course.category = result.attributes.classifiers.category ? result.attributes.classifiers.category.join() : '';
                course.topic = result.attributes.classifiers.topic ? result.attributes.classifiers.topic.join() : '';
                course.url = 'https://open.sap.com/courses/' + result.attributes.slug + '/progress';
                course.teachers = result.attributes.teachers;
                // console.log(result.attributes.teachers);


                // console.log(new Date(result.attributes.start_at));
                // if (new Date(result.attributes.start_at) > new Date() ) {
                //     course.class = 'table-active'; 
                // }
                // if (new Date(result.attributes.end_at) > new Date() ) {
                //     course.class = 'table-info'; 
                // }


                // courses.push(course);
                courses.push(result);
            });
            $scope.courses = courses;
        }, function errorCallback(response) {
            console.log("Error while fetching courses" + response);
        });
    }
]).filter('dateFormatter', function() { 
    return function(myDate) {
        return moment(new Date(myDate), 'YYYYMMDD').fromNow();
    };
}).filter('statusFormatter', function() {
    return function(status) {
        switch (status) {
            case 'announced':
                return 'table-active';
            case 'active':
                return 'table-success';
            case 'self-paced':
                return 'table-warning';
            default:
        }
        x
    };
});