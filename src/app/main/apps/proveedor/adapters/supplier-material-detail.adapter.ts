import { ISupplierMaterialDetail } from "../models/proveedor.model";

export const supplierMaterialDetailAdapterc = (
    supplierMaterialDetailAdapter: ISupplierMaterialDetail
): ISupplierMaterialDetail => ({
  id: supplierMaterialDetailAdapter.id,
  idsupplier: supplierMaterialDetailAdapter.idsupplier,
  idmaterial: supplierMaterialDetailAdapter.idmaterial,
  created_at: supplierMaterialDetailAdapter.created_at,
  updated_at: supplierMaterialDetailAdapter.updated_at,
});
