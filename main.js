angular.module("myapp", []).controller('OpenSAPController', ['$scope', '$http',
    function ($scope, $http) {

        // Initializations
        // $scope.filterValue = 's4hana';

        // var opensapURL='/destinations/northwind/V4/Northwind/Northwind.svc/Invoices?$top=15';  
        // var opensapURL = 'https://open.sap.com/api/v2/courses?include=channel%2Cuser_enrollment';
        var opensapURL = '/data/courses.json';
        $http({
            method: 'GET',
            url: opensapURL
        }).then(function successCallback(response) {
            var results = response.data.data.filter(function (course) {
                return course.attributes.language === 'en';
            });
            var courses = [];
            var categories = [];

            _.each(results, function (result) {
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
                categories.push(course.category);
                courses.push(result);
            });
            categories = categories.filter((value, index, self) => { return self.indexOf(value) === index; });

            $scope.courses = courses;
            $scope.categories = categories;

            // console.log(categories);
        }, function errorCallback(response) {
            console.log("Error while fetching courses" + response);
        });

        $scope.onCategorySelected = function (evt, category) {
            // debugger
            $scope.categories
            console.log(category);
            // $scope.greeting = 'Hello ' + $scope.username + '!';
        };

    }
]).filter('dateFormatter', function () {
    return function (myDate) {
        return moment(new Date(myDate), 'YYYYMMDD').fromNow();
    };
}).filter('statusFormatter', function () {
    return function (status) {
        switch (status) {
            case 'announced':
                return 'table-active';
            case 'active':
                return 'table-success';
            case 'self-paced':
                return 'table-warning';
            default:
        }
    };
});