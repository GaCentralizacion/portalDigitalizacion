registrationModule.directive('clickedDisable', function() {
    return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
            $(ele).click(function() {
                $(ele).attr('disabled', true);
            });
        }
    };
});
registrationModule.directive("loading", function () {
    return {
        restrict: "E",
        templateUrl:'AngularJS/Modals/Template/spinner.html'
    };
});