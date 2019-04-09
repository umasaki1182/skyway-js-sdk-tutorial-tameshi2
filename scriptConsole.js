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
    key: 'ad8bf632-34e6-413a-8134-ba112c584b75',
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

function setupCallEventHandlers(call){
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;
}
