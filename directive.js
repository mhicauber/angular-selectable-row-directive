"use strict";

angular.module('mhicauber.tch-row-selectable', [])

    .directive("tchRowSelectable", function () {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                scope.$watch("$parent.$parent.tchRowSelectableChoice",
                    function (value) {
                        elem.toggleClass('row-selected',
                                value === scope.$index);
                    });

                elem.bind('click', function () {
                    scope.$apply(function () {
                        scope.$parent.$parent.tchRowSelectableChoice = scope.$index;
                    });
                });
            }
        }
    });