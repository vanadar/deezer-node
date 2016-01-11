/**
 * Created by vanadar on 30/12/15.
 */
exports.init = function(w) {
    //window.location.href = 'http://www.deezer.com';

    var Player = require('mpris-service');

    var mprisPlayer = Player({
        name: 'deezernode',
        identity: 'Deezer Node',
        supportedUriSchemes: ['file'],
        supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
        supportedInterfaces: ['player'],
    });

    var getPlayer = function () {
        return window.dzPlayer;
    };

    var isPlaying = function () {
        return getPlayer().isPlaying();
    };

    var updateMeta = function () {
        mprisPlayer.metadata = {
            'mpris:artUrl': 'http://cdn-images.deezer.com/images/cover/' + getPlayer().getCover() + '/250x250.jpg',
            'mpris:length': getSongLength(),
            'xesam:album': getPlayer().getAlbumTitle(),
            'xesam:artist': getPlayer().getArtistName(),
            'xesam:title': getPlayer().getCurrentSong().SNG_TITLE
        };
    };

    var play = function () {
        getPlayer().control.play();
        mprisPlayer.playbackStatus = 'Playing';
    };

    var pause = function () {
        mprisPlayer.playbackStatus = 'Paused';
        getPlayer().control.pause();
    };

    var stop = function () {
        mprisPlayer.playbackStatus = 'Stopped';
        getPlayer().control.stop();
    };

    var next = function () {
        getPlayer().control.nextSong();
    };

    var prev = function () {
        getPlayer().control.prevSong();
    };

    var getSongLength = function(){
        return parseInt(getPlayer().getCurrentSong().DURATION) * 1e6;
    };

    var setPosition = function(o, x){
        var p = (x/getSongLength()).toFixed(3);
        getPlayer().control.seek(p);
    };

    var raise = function(){
        win.show();
        win.focus();
    };

    mprisPlayer.on("play", play);
    mprisPlayer.on("pause", pause);
    mprisPlayer.on("stop", stop);
    mprisPlayer.on("next", next);
    mprisPlayer.on("previous", prev);
    mprisPlayer.on("raise", raise);
    mprisPlayer.on("position", setPosition);
    mprisPlayer.on("playpause", function(){
        if(isPlaying()) pause();
        else play();
    });

    var onDeezerReady = function(){
        win.window.console.debug("onDeezerReady");
        win.window.document.mp = mprisPlayer;
        win.window.document.sk = seek;

        var Events = window.Events;
        var group = 'deezer-node';
        updateMeta();
        Events.subscribe(Events.player.notify, updateMeta, group);
        Events.subscribe(Events.player.position, function (e, t){
            mprisPlayer.position = t*1e6;
        }, group);
    };

    var gui = window.require('nw.gui');
    var win = gui.Window.get();

    win.window.location.href = 'http://www.deezer.com';

    setTimeout(function(){
        console.log("prout");
        console.debug("pde");
        onDeezerReady();
        win.window.console.log("ok");
    }, 5000);

};