import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { IProductModuleService } from '@medusajs/framework/types';
import { FASHION_MODULE } from '../../../../../modules/fashion';
import FashionModuleService from '../../../../../modules/fashion/service';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const productModuleService: IProductModuleService = req.scope.resolve(
    Modules.PRODUCT,
  );
  const fashionModuleService: FashionModuleService =
    req.scope.resolve(FASHION_MODULE);

  const [product] = await productModuleService.listProducts(
    {
      handle: req.params.productHandle,
    },
    {
      relations: ['options', 'variants', 'variants.options'],
      take: 1,
    },
  );

  const materialOption = product.options.find(
    (option) => option.title === 'Material',
  );
  const colorOption = product.options.find(
    (option) => option.title === 'Color',
  );

  if (!materialOption || !colorOption) {
    res.status(200).json({
      materials: [],
    });
    return;
  }

  const materialsAndColorsNamesTree = new Map<string, string[]>();

  for (const productVariant of product.variants) {
    const materialName = productVariant.options.find(
      (option) => option.option_id === materialOption.id,
    )?.value;

    if (!materialName) {
      continue;
    }

    const colorNames = productVariant.options
      .filter((option) => option.option_id === colorOption.id)
      .map((option) => option.value);

    if (!materialsAndColorsNamesTree.has(materialName)) {
      materialsAndColorsNamesTree.set(materialName, colorNames);
    } else {
      const existingColorNames = materialsAndColorsNamesTree.get(materialName);

      materialsAndColorsNamesTree.set(
        materialName,
        Array.from(new Set([...existingColorNames, ...colorNames])),
      );
    }
  }

  const materials = await fashionModuleService.listMaterials(
    {
      name: Array.from(materialsAndColorsNamesTree.keys()),
    },
    {
      relations: ['colors'],
    },
  );

  res.status(200).json({
    materials: materials.map((material) => ({
      id: material.id,
      name: material.name,
      colors: material.colors
        .filter((color) =>
          materialsAndColorsNamesTree.get(material.name).includes(color.name),
        )
        .map((color) => ({
          id: color.id,
          name: color.name,
          hex_code: color.hex_code,
        })),
    })),
  });
};
