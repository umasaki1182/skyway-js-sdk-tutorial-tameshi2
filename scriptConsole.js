'use strict';

let localStream = null;
let peer = null;
let existingCall = null;

navigator.mediaDevices.getDisplayMedia({'video':true})
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;
    }).catch(function (error) {
        // Error
        console.error('mediaDevice.getDisplayMedia() error:', error);
        return;
    });

peer = new Peer({
    key: 'dac55d92-613e-4565-a476-72c338ff8759',
    debug: 3
});

peer.on('open', function(){
    $('#my-id').text(peer.id);
});
peer.on('call', function(call){
    call.answer(localStream);
    setupCallEventHandlers(call);
});
peer.on('error', function(err){
    alert(err.message);
});
peer.on('close', function(){
});
peer.on('disconnected', function(){
});

function setupCallEventHandlers(call){
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
        $('#their-id').text(call.remoteId);
    });
    call.on('close', function(){
    });
}
