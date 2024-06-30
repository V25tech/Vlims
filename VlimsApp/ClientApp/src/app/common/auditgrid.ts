export class DataGrid {
  constructor() {
 
  }
  Headers?: HeaderItem[];
  Config: Config | undefined;
  //Actions: Actions | undefined;
  gridData?: any = {};
  entity?: string;
}
 
export class HeaderItem {
  Name: string | undefined;
  DisplayName: string | undefined;
  isAction?: boolean = false;
  filterType?: string;
  checkRefund?: boolean = false;
  width?: number = 20;
  sort: boolean = false;
  isNavigation: boolean = false;
}
export class Config {
  id?: string;
  itemsPerPage: number = 10;
  currentPage: number =1;
  totalItems?: number = 100;
  isCheckBoxRequired?: boolean = false;
  isPolicy?: boolean = false;
  rowsPerPageOptions?: any[] = [];
  gridDisplayName: string ='';
}
export class Actions {
  editAction: boolean | undefined;
  deleteAction: boolean | undefined;
  downloadAction?: boolean = false;
  addAction?: boolean = false;
}
 
 
export class FilterItem extends HeaderItem {
 
}
