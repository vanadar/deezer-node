/**
 * Created by vanadar on 30/12/15.
 */
exports.init = function() {
    var gui = window.require('nw.gui');

    gui.Window.get().showDevTools();

    window.location = 'http://www.deezer.com';

};