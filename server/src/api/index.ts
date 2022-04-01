import { Router } from 'express';
import { ErrorException } from '@/error/error-exception';

const router = Router();

router.get('/test', (req, res) => {
  console.log('TEST');
  res.send('TEST!');
});

router.all('/', () => {
  throw new ErrorException('NotFound');
});

export default router;
