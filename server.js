var Hapi   = require("hapi");
var server = new Hapi.Server();
var Path   = require("path");

server.connection({
  port: 8000 || Number(process.env.PORT)
});

server.route({
  method: "GET",
  path  : "/",
  handler: function(req, reply) {
    return reply.file("./public/index.html");
  }
});
server.route({
  method: "GET",
  path  : "/{param*}",
  handler: {
    directory: {
      path: Path.join(__dirname) + "/public/"
    }
  }
});

module.exports = server;
