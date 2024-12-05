import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import FashionModuleService from '../../../../../modules/fashion/service';
import { FASHION_MODULE } from '../../../../../modules/fashion';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  await fashionModuleService.restoreMaterials(req.params.id);

  const material = await fashionModuleService.retrieveMaterial(req.params.id, {
    relations: ['colors'],
    withDeleted: true,
  });

  res.status(200).json(material);
};
