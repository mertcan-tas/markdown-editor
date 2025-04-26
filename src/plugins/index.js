import vuetify from './vuetify/index';
import pinia from './stores/index'; 

export function registerPlugins(app) {
  app.use(pinia);
  app.use(vuetify);
}