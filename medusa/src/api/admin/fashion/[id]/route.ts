import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { z } from 'zod';
import FashionModuleService from '../../../../modules/fashion/service';
import { FASHION_MODULE } from '../../../../modules/fashion';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  const material = await fashionModuleService.retrieveMaterial(req.params.id, {
    relations: ['colors'],
    withDeleted: true,
  });

  res.status(200).json(material);
};

const updateMaterialBodySchema = z.object({
  name: z.string().min(1),
});

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  const material = await fashionModuleService.updateMaterials({
    id: req.params.id,
    ...updateMaterialBodySchema.parse(req.body),
  });

  res.status(200).json(material);
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  await fashionModuleService.softDeleteMaterials(req.params.id);

  const material = await fashionModuleService.retrieveMaterial(req.params.id, {
    relations: ['colors'],
    withDeleted: true,
  });

  res.status(200).json(material);
};
