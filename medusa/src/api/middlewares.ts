import { defineMiddlewares } from '@medusajs/medusa';
import { adminProductTypeRoutesMiddlewares } from './store/custom/product-types/middlewares';

export default defineMiddlewares([...adminProductTypeRoutesMiddlewares]);
