/**
 * Created by vanadar on 30/12/15.
 */
exports.init = function(w) {

    window.location = 'http://www.deezer.com';

    var gui = window.require('nw.gui');
    //gui.Window.get().showDevTools();

    var Player = require('mpris-service');

    var player = Player({
        name: 'deezernode',
        identity: 'Deezer player',
        supportedUriSchemes: ['file'],
        supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
        supportedInterfaces: ['player']
    });

    var getPlayer = function(){
        return window.dzPlayer;
    };

    var isPlaying = function(){
        return getPlayer().isPlaying();
    };

    var updateMeta = function(){
        player.metadata = songInfo = {
            'mpris:artUrl': '',
            // Convert milliseconds to microseconds (1s = 1e3ms = 1e6µs)
            'mpris:length': window.dzPlayer.getCurrentSong().DURATION * 1e3,
            'xesam:album': '',
            'xesam:artist': '',
            'xesam:title': window.dzPlayer.getCurrentSong().SNG_TITLE
        };
    };

    var play = function(){
        getPlayer().control.play();
        updateMeta();
        player.playbackStatus = 'Playing';
    };

    var pause = function(){
        player.playbackStatus = 'Paused';
        getPlayer().control.pause();
    };

    var stop = function(){
        running = false;
        player.playbackStatus = 'Stopped';
        getPlayer().control.stop();
    };

    var next = function(){
        getPlayer().control.nextSong();
    };

    var prev = function(){
        getPlayer().control.prevSong();
    };


    player.on("playpause", function(){
        if(isPlaying()) pause();
        else play();
    });

    player.on("play", play);
    player.on("pause", pause);
    player.on("stop", stop);
    player.on("next", next);
    player.on("previous", prev);
};