import router from './router/index'; 
import pinia from './pinia/index'; 
import vuetify from './vuetify/index';

export function registerPlugins(app) {
  app.use(router);
  app.use(pinia);
  app.use(vuetify);
}