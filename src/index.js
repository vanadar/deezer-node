/**
 * Created by vanadar on 30/12/15.
 */
exports.init = function() {

    window.location = 'http://www.deezer.com';

    var gui = window.require('nw.gui');
    gui.Window.get().showDevTools();

    var Player = require('mpris-service');

};