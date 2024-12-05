import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import FashionModuleService from '../../../../../../../modules/fashion/service';
import { FASHION_MODULE } from '../../../../../../../modules/fashion';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  await fashionModuleService.retrieveMaterial(req.params.id, {
    withDeleted: true,
  });

  await fashionModuleService.restoreColors(req.params.colorId);

  const color = await fashionModuleService.retrieveColor(req.params.colorId, {
    withDeleted: true,
  });

  res.status(200).json(color);
};
