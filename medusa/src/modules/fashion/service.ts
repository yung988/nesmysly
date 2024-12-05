import { MedusaService } from '@medusajs/framework/utils';
import Material from './models/material';
import Color from './models/color';

export default class FashionModuleService extends MedusaService({
  Material,
  Color,
}) {}
