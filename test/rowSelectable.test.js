describe('Unit testing row-selectable directive', function () {

    var elm, scope;

    // Load the app module, which contains the directive
    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $compile) {

        elm = angular.element('<div ng-switch="true"><table ng-switch="true" class="ng-scope" id="myTable" row-selectable>\n    <tr tch-row-selectable ng-repeat="object in businessObjectsList">\n        <td>{{object.id}}</tbject.d>\n        <td>{{object.value}}</td>\n    </tr>\n</table></div>');

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


});

