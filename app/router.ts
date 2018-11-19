import { Application } from 'egg';
import { wrapper } from 'egg-swagger-decorator';
export default (app: Application) => {
  const { controller, router } = app;

  wrapper(app, {
    // // [optional] default is /swagger-html
    // swaggerHtmlEndpoint: '/sw',
    // // [optional] default is /swagger-json
    // swaggerJsonEndpoint: '/sj',
    // // [optional] default is false. if true, will call makeSwaggerRouter(app) automatically
    // makeswaggerRouter: false,

    title: 'CQB 报表服务',
    version: '1.0.0',
    description: '生成 PDF 报表',

  });
  // makeSwaggerRouter(app);

  router.get('/', controller.home.index);

  router.post('/api/report/create', controller.report.create);
};
