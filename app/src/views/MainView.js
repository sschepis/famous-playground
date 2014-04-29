/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name MainView
     * @constructor
     * @description
     */

    function MainView() {
        View.apply(this, arguments);
    }

    MainView.prototype = Object.create(View.prototype);
    MainView.prototype.constructor = MainView;

    MainView.DEFAULT_OPTIONS = {
    };

    module.exports = MainView;
});
