import express from 'express';
import { contentSecurityPolicy, errorHandler, httpLogger } from '@/middlewares';
import logger from '@/logger';
import routes from '@/routes';
import { IS_PRODUCTION, SERVER_PORT } from '@/env-variables';

type StartExpress = {
  workerId?: number;
};

const port = SERVER_PORT || 3000;

const startExpress = ({ workerId }: StartExpress) => {
  const app = express();

  //  middlewares
  app.use(httpLogger);
  app.use(contentSecurityPolicy);
  app.use(routes);

  if (IS_PRODUCTION) {
    // app.use(enforce.HTTPS({ trustXForwardedHostHeader: true }));
    const serverName = `Worker ${workerId}`;
    app.listen(port, () => {
      logger.info(`${serverName} listening on port ${port}`);
    });
  }

  // Error handling
  app.use(errorHandler);
  return app;
};

export default startExpress;
