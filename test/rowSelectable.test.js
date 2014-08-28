describe('Unit testing row-selectable directive', function () {

    var elm, scope;

    // Load the app module, which contains the directive
    beforeEach(module('mhicauber.tch-selectable-row'));

    beforeEach(inject(function ($rootScope, $compile) {

        elm = angular.element('<table>\n    <tr ng-repeat="object in businessObjectsList" tch-selectable-item tch-selectable-index="$index" tch-selectable-callback="myCallback(object.id)" >\n        <td>{{object.id}}</td>\n        <td>{{object.value}}</td>\n    </tr>\n</table>\n\n');

        scope = $rootScope;

        scope.businessObjectsList = [
            {
                "id": 1,
                "value1": "value1"
            },
            {
                "id": 2,
                "value": "value2"
            },
            {
                "id": 3,
                "value": "value3"
            },
        ];

        scope.$parent = {};

        $compile(elm)(scope);
        scope.$digest();

    }));


    it('should add row selected class only on clicked row', function () {

        // GIVEN
        var clickedRowNumber = 1;
        var rows = angular.element(elm).find('tbody tr');
        var rowToClick = rows.eq(clickedRowNumber);

        // WHEN
        rowToClick.click();

        // THEN
        for (var i = 0; i < rows.length; i++) {
            var row = rows.eq(i);
            if (i === clickedRowNumber) {
                expect(row.hasClass('row-selected')).toBe(true);
            } else {
                expect(row.hasClass('row-selected')).toBe(false);
            }
        }
    });

    it('should call the scope callback function whenever there\'s one ', function() {
        // GIVEN
        var clickedRowNumber = 1;
        var rows = angular.element(elm).find('tbody tr');
        var rowToClick = rows.eq(clickedRowNumber);
        var watchedValue = "";
        scope.myCallback = function(value) {
            watchedValue = value;
        };

        // WHEN
        rowToClick.click();

        // THEN
        expect(watchedValue).toBe(scope.businessObjectsList[clickedRowNumber].id);

    })


});


