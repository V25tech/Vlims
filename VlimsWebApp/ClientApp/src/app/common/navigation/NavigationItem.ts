
export class NavigationItem {
  public Name: string;
  public path: string;
  public IsEnable: boolean = true;
  public IsVisible: boolean = true;
  public ScreenName: string;
  public IconUrl: string;
  public Parent: string;
  public GrandParent: string;
  public isActive: boolean;
  public prevtab: NavigationItem;
  public nexttab: NavigationItem;
  public tabIconUrl: string;
  public IsItemOfLastHirarchy: boolean;

  constructor(path: string, Name: string, isEnable: boolean, visible: boolean, tabIconUrl?: string, parent?: string, IsItemOfLastHirarchy: boolean = true, grandParent?: string) {
    this.Name = Name;
    this.path = '/' + path;
    this.IsEnable = isEnable;
    this.IsVisible = visible;
    this.tabIconUrl = tabIconUrl;
    this.Parent = parent;
    this.GrandParent = grandParent;
    this.isActive = false;
    this.IsItemOfLastHirarchy = IsItemOfLastHirarchy;
  }
}
