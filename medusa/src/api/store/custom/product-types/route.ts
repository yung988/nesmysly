import { HttpTypes, ProductTypeDTO } from '@medusajs/framework/types';
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework';

export const GET = async (
  req: AuthenticatedMedusaRequest<HttpTypes.AdminProductTypeListParams>,
  res: MedusaResponse,
) => {
  const query = req.scope.resolve("query")
  const { data: productTypes, metadata } = await query.graph({
    entity: "product_types",
    filters: req.filterableFields,
    fields: req.remoteQueryConfig.fields as (keyof ProductTypeDTO)[],
    pagination: req.remoteQueryConfig.pagination
  })

  res.json({
    product_types: productTypes,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  });
};
