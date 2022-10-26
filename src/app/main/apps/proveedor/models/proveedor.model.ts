export interface IProveedorPost {
  iddocument_type: number;
  document_number: number;
  businessname: string;
  phone: string;
  email: string;
  representative_name: string;
  representative_phone: string;
  representative_email: string;
}

export interface IProveedorPut extends IProveedorPost {
    id: number;
}

export interface IProveedor {
  idSupplier: number;
  iddocumentType: string;
  documentNumber: string;
  businessname: string;
  phone: string;
  email: string;
  representativeName: string;
  representativePhone: string;
  representativeEmail: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
  documenttype:IDocumenttype;
}

export interface IProveedorResponse {
  idsupplier: number;
  iddocument_type: string;
  document_number: string;
  businessname: string;
  phone: string;
  email: string;
  representative_name: string;
  representative_phone: string;
  representative_email: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
  documenttype:IDocumenttype;
}

export interface IDocumenttype {
  description: string;
}