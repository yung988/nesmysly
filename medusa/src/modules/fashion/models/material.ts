import { model } from '@medusajs/framework/utils';
import { InferTypeOf } from '@medusajs/framework/types';
import Color from './color';

const Material = model.define('material', {
  id: model.id().primaryKey(),
  name: model.text(),
  colors: model.hasMany(() => Color),
});

export type MaterialModelType = InferTypeOf<typeof Material>;

export default Material;
