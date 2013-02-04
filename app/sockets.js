define(['socket.io'], function(socket){
  return function(server){
    var io = socket.listen(server);  //(server, {log:false;}) to squelch cli logs

    io.sockets.on('connection', function(socket) {
      console.log('Client connected');

      socket.on('disconnect',function() {
        console.log('Client disconnected');
      });
    });

    return io;
  }
});
