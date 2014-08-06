angular-selectable-row-directive [![Build Status](https://travis-ci.org/mhicauber/angular-selectable-row-directive.svg?branch=master)](https://travis-ci.org/mhicauber/angular-selectable-row-directive)
=============================================

This project was intended to help me testing functionalities, Travis CI integration and sharing an angular component with Bower.

Usage
---------------------------------------

Easy way : import the directive via Bower
```bower
bower install mhicauber/angular-selectable-row-directive --save
```

Then include the `directive.js` file Bower just downloaded into your project.

The directive is intended to be used in conjunction with ng-repeat directive

```html
<tr ng-repeat="item in list" tch-selectable-row>
...
</tr>
```

Output
---------------------------------------

This will render the `<tr>..</tr>` items, and `tch-selectable-row` directive will bind a `click` event on each row dom element.
When a row gets clicked on, the directive adds the `row-selected` CSS class.

All you have to do is to customize the class to fit your needs.