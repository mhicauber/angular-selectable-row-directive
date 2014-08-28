describe('Unit testing row-selectable directive', function () {

    var elm, scope;

    // Load the app module, which contains the directive
    beforeEach(module('mhicauber.tch-selectable-row'));

    beforeEach(inject(function ($rootScope, $compile) {

        elm = angular.element('<table id="table1">\n    <tr ng-repeat="object in businessObjectsList" tch-selectable-item  tch-selectable-id="table1">\n        <td>{{object.id}}</td>\n        <td>{{object.value}}</td>\n    </tr>\n</table>\n<table id="table2">\n    <tr ng-repeat="object in businessObjectsList" tch-selectable-item tch-selectable-id="table2">\n        <td>{{object.id}}</td>\n        <td>{{object.value}}</td>\n    </tr>\n</table> ');

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
        var rows = angular.element(elm).filter('#table1').find('tr');
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




    it('should handle several directives on same page', function () {
        // GIVEN
        var clickedRowNumber1 = 0;
        var clickedRowNumber2 = 2;

        var rows1 = angular.element(elm).filter('#table1').find('tr');
        var rowToClick1 = rows1.eq(clickedRowNumber1);

        var rows2 = angular.element(elm).filter('#table2').find('tr');
        var rowToClick2 = rows2.eq(clickedRowNumber2);

        // WHEN
        rowToClick1.click();
        rowToClick2.click();

        // THEN
        for (var i = 0; i < rows1.length; i++) {
            var row = rows1.eq(i);
            if (i === clickedRowNumber1) {
                expect(row.hasClass('row-selected')).toBe(true);
            } else {
                expect(row.hasClass('row-selected')).toBe(false);
            }
        }
        for (var i = 0; i < rows2.length; i++) {
            var row = rows2.eq(i);
            if (i === clickedRowNumber2) {
                expect(row.hasClass('row-selected')).toBe(true);
            } else {
                expect(row.hasClass('row-selected')).toBe(false);
            }
        }

    })

});


