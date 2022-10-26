export interface IPreferencePost {
  description: string;
  value: string;
}

export interface IPreferencePut extends IPreferencePost {
    id: number;
}

export interface IPreference {
  idPreference: number;
  description: string;
  value: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPreferenceResponse {
  idpreference: number;
  description: string;
  value: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
