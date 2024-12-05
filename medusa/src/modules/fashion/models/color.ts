import { model } from '@medusajs/framework/utils';
import { InferTypeOf } from '@medusajs/framework/types';
import Material from './material';

const Color = model.define('color', {
  id: model.id().primaryKey(),
  name: model.text(),
  hex_code: model.text(),
  material: model.belongsTo(() => Material, {
    mappedBy: 'colors',
  }),
});

export type ColorModelType = InferTypeOf<typeof Color>;

export default Color;
