import {App} from './App';

let server: any = new App().expressApp;
server.listen(process.env.PORT || 8080);