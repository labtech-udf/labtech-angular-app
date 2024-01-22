export interface MenuItem {
  label: string;
  icon?: string;
  link?: string;
  action?: () => void;
  subitems?: MenuItem[];
  expanded?: boolean;
}

export interface TableColumn {
  field: string;
  header: string;
  isBoolean?: boolean;
  isAction?: boolean;
  api?: string
}
