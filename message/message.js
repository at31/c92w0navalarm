var io;
var socket;

exports.init=function(_io,_socket)
{
	io=_io;
	socket=_socket;

	socket.emit('mainsocket',{data:'socket connected, wait...'});

};

exports.sendData=function(data){
    //socket.emit('data',data);
    io.emit('data',data);
};