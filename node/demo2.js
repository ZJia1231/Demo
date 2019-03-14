
var events = require('events');
var eventEmitter =  new events.EventEmitter();
eventEmitter.on('cc',showMsg);
function showMsg() {
    console.log('1');
}
eventEmitter.emit('cc');