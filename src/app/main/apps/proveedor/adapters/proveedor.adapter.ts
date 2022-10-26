import { IProveedor, IProveedorResponse } from "../models/proveedor.model";

export const proveedorAdapter = (
  proveedorAdapter: IProveedorResponse
): IProveedor => ({
  idSupplier: proveedorAdapter.idsupplier,
  iddocumentType: proveedorAdapter.iddocument_type,
  documentNumber: proveedorAdapter.document_number,
  businessname: proveedorAdapter.businessname,
  phone: proveedorAdapter.phone,
  email: proveedorAdapter.email,
  representativeName: proveedorAdapter.representative_name,
  representativePhone: proveedorAdapter.representative_phone,
  representativeEmail: proveedorAdapter.representative_email,
  enable: proveedorAdapter.enable,
  createdAt: proveedorAdapter.created_at,
  updatedAt: proveedorAdapter.updated_at,
  documenttype:{
    description:proveedorAdapter.documenttype.description
  }
});
