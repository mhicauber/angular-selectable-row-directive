"use strict";

angular.module('mhicauber.tch-selectable-row', [])

    .directive("tchSelectableRow", function () {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                scope.$watch("$parent.$parent.tchSelectableRowChoice",
                    function (value) {
                        elem.toggleClass('row-selected',
                                value === scope.$index);
                    });

                elem.bind('click', function () {
                    scope.$apply(function () {
                        scope.$parent.$parent.tchSelectableRowChoice = scope.$index;
                    });
                });
            }
        }
    });