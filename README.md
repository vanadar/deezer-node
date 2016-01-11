# deezer-node

A deezer app made for linux users. It's implementing mpris so we can use our keyboard media keys to control the player. 

## installation


install packages

`npm install`


You need to recompile dbus witwh nw-gyp:

1. install the following packages:

`sudo aptitude install pkg-config libdbus-1-dev libglib2.0-dev`


2. goto node_modules/dbus and rebuild it

`cd node_modules/dbus && ../.bin/nw-gyp rebuild --target=0.12.3 && cd ../..`


build the package:

`grunt`

run it

`build/deezer-node/linux64/deezer-node`