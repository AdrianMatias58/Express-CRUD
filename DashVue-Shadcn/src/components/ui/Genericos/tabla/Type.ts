export interface ColumnConfig<T> {
  key: keyof T | 'actions'; 
  header: string;           
}