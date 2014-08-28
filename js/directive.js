"use strict";

/**
 * This simple directive allow you to track a clicked element.
 * Designed to be used in conjunction with ng-repeat.
 * It will add a css class on clicked row in table
 * Can be used multiple times on a page : add tch-selectable-id attribute and give its value a unique id on the page.
 *
 * usage :
 *
 *    <tr ng-repeat="object in businessObjectsList" tch-selectable-item [tch-selectable-id="id1"] >
 *
 *    <tr ng-repeat="object in businessObjectsList" tch-selectable-item tch-selectable-id="id2" >
 */
angular.module('mhicauber.tch-selectable-row', [])

    .factory('tchDataService', function () {

        var tracker = {};

        return {
            setTrackedId: function (id, index) {
                tracker[id] = index;
            },

            getTrackedId: function (id) {
                return tracker[id]
            }
        }
    })


    .directive("tchSelectableItem", function (tchDataService) {

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                var elementId = "unique";
                if (attrs.tchSelectableId) {
                    elementId = attrs.tchSelectableId;
                }

                scope.$watch(function () {
                        return tchDataService.getTrackedId(elementId)
                    },
                    function (value) {
                        elem.toggleClass(
                            'row-selected',
                                value === scope.$index);
                    });

                elem.bind('click', function () {
                    scope.$apply(function () {
                        tchDataService.setTrackedId(elementId, scope.$index);
                    });
                });
            }
        }
    })
