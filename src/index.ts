// import ApplicationExpress class
import ApplicationExpress from "./app";

async function serverGo() {
  // create new instance from ApplicationExpress
  const server = new ApplicationExpress();

  //
  await server.apolloServer();
  // fire listen
  server.listen();
}
serverGo();