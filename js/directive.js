"use strict";

/**
 * This simple directive allow you to track a clicked element.
 * Designed to be used in conjunction with ng-repeat.
 * It will add a css class on clicked row in table, and allow a scope callback function to be called.
 *
 * usage :
 *
 *    <tr ng-repeat="object in businessObjectsList" tch-selectable-item tch-selectable-index="$index" tch-selectable-callback="myCallback(object.id)" >
 */
angular.module('mhicauber.tch-selectable-row', [])

    .factory('tchDataService', function () {

        var tracker;

        return {
            setTrackedId: function (id) {
                tracker = id;
            },

            getTrackedId: function () {
                return tracker;
            }
        }
    })


    .directive("tchSelectableItem", function (tchDataService) {
        return {
            restrict: 'A',
            scope: {
                callbackFunction: '&tchSelectableCallback',
                index: '=tchSelectableIndex'
            },
            link: function (scope, elem, attrs, selectableCtrl) {
                scope.$watch(tchDataService.getTrackedId,
                    function (value) {
                        elem.toggleClass(
                            'row-selected',
                                value === scope.index);
                    });

                elem.bind('click', function () {
                    scope.$apply(function () {
                        tchDataService.setTrackedId(scope.index);
                        if (scope.callbackFunction) {
                            scope.callbackFunction();
                        }
                    });
                });
            }
        }
    })
