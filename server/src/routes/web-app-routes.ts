import { Request, Response, Router, static as expressStatic } from 'express';
import path from 'path';
import { CURRENT_DIRNAME, IS_PRODUCTION } from '@/env-variables';

const dirName = CURRENT_DIRNAME();
const webappLocation = path.join(dirName, 'cosmo');

const renderApp = (req: Request, res: Response) => {
  if (IS_PRODUCTION) {
    return res.sendFile(path.join(webappLocation, 'index.html'), 'utf8');
  }
  return res.status(200).send('<h1>Dev Mode</h1>');
};

const router = Router();
router.use(expressStatic(webappLocation));
router.all(/(.*)/, renderApp);

export default router;
