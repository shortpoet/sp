import { createRouter } from 'vue-router';
import createRouterConfig from './createRouterConfig';
const routerConfig = createRouterConfig.createRouterConfig();

const router = createRouter(routerConfig);

export default router;
