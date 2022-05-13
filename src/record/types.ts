export interface RecordType {
  id: number;
  type: string;
  created_at: Date;
  updated_ate: Date;
}

export interface SecureRecord {
  id: number;
  name: string;
  user_id: number;
  folder_id: number;
  record_type_id: number;
  created_at: Date;
  updated_at: Date;
}