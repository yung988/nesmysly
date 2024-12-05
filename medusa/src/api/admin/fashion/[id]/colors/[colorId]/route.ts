import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { z } from 'zod';
import FashionModuleService from '../../../../../../modules/fashion/service';
import { FASHION_MODULE } from '../../../../../../modules/fashion';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  await fashionModuleService.retrieveMaterial(req.params.id, {
    withDeleted: true,
  });

  const color = await fashionModuleService.retrieveColor(req.params.colorId, {
    withDeleted: true,
  });

  res.status(200).json(color);
};

const colorsUpdateBodySchema = z.object({
  name: z.string().min(1),
});

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  await fashionModuleService.retrieveMaterial(req.params.id, {
    withDeleted: true,
  });

  const color = await fashionModuleService.updateColors({
    id: req.params.colorId,
    ...colorsUpdateBodySchema.parse(req.body),
  });

  res.status(200).json(color);
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  await fashionModuleService.retrieveMaterial(req.params.id, {
    withDeleted: true,
  });

  await fashionModuleService.softDeleteColors(req.params.colorId);

  const color = await fashionModuleService.retrieveColor(req.params.colorId, {
    withDeleted: true,
  });

  res.status(200).json(color);
};
