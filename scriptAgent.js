'use strict';

let peer = null;
let existingCall = null;

peer = new Peer({
    key: 'dac55d92-613e-4565-a476-72c338ff8759',
    debug: 3
});

peer.on('error', function(err){
    alert(err.message);
});

$('#make-call').submit(function(e){
    e.preventDefault();
    const call = peer.call($('#callto-id').val());
    setupCallEventHandlers(call);
});

$('#end-call').click(function(){
    existingCall.close();
});

function setupCallEventHandlers(call){
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
        addVideo(call,stream);
        setupEndCallUI();
        $('#their-id').text(call.remoteId);
    });

    call.on('close', function(){
        removeVideo(call.remoteId);
        setupMakeCallUI();
    });
}

function addVideo(call,stream){
    $('#their-video').get(0).srcObject = stream;
}

function removeVideo(peerId){
    $('#their-video').get(0).srcObject = undefined;
}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}
