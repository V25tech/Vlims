import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ProductsService } from '../Services/products.service';
import { ProdtypeService } from '../Services/prodtype.service';
import { BrandsService } from '../Services/brands.service';
import { CartsService } from '../Services/carts.service';
import { Products } from '../model/products';
import { ProductType } from '../model/productType';
import { Brands } from '../model/brands';
import { Carts } from '../model/carts';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';


declare var $: any;

@Component({
  templateUrl: './productsview.html',
  styles: [`
  .btn-space {
    margin-right: 5px;
    margin-top:20px;
  },
  .paddingbutton{
    padding-left: 0;
  }
`]
})
export class ProductsView {
  prods: Array<Products>;
  ptypes: Array<ProductType>;
  brands: Array<Brands>;
  newobj: Products;
  retailId: number;
  header: string;
  actiontype: number;
  selectedbrand: Brands;
  selectedtype: ProductType;
  pageConfig: any;
  filterStr: string;
  actions: any = null;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closepopup();
  }

  constructor(private commonsvc: CommonService, private prodsvc: ProductsService, private ptypesvc: ProdtypeService, private bsvc: BrandsService, private csvc: CartsService, private toastr: ToastrService, private cd: ChangeDetectorRef, private loader: SpinnerService) {
    this.newobj = new Products;
    this.newobj.Id = 0;
    this.selectedbrand = new Brands;
    this.selectedtype = new ProductType;
    this.header = "Add Product";
    this.actiontype = 1;
    this.pageConfig = commonsvc.pageConfig;
    this.actions = this.commonsvc.fileuploadConfig;
    this.pageConfig.currentPage = 1;
    this.pageConfig.itemsPerPage = 4;
  }

  ngOnInit() {
    this.commonsvc.pullSearchStr().subscribe(p => { this.filterStr = p });
    this.loaddependencies();
  }
  getProducts() {
    this.loader.show();
    this.retailId = this.commonsvc.getretailId();
    return this.prodsvc.getProducts(this.retailId).subscribe((data: any) => {
      this.prods = data;
      this.loader.hide();
    });
  }
  loaddependencies() {
    this.getProducts();
    this.getptypes();
    this.getbrands();

  }
  getptypes() {

    this.retailId = this.commonsvc.getretailId();
    return this.ptypesvc.getproductTypes(this.retailId).subscribe((data: any) => {
      this.ptypes = data;
    });
  }
  getbrands() {
    this.retailId = this.commonsvc.getretailId();
    this.bsvc.getBrands(this.retailId).subscribe((data: any) => {
      this.brands = data;
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }

  createProduct() {
    this.newobj = new Products();
    this.newobj.BrandId = null;
    this.newobj.TypeId = null;
  }

  delete(index: number, objproduct: Products) {
    if (this.commonsvc.confirmDelete()) {
      this.prodsvc.deleteProduct(objproduct.Id).subscribe((data: any) => {
        if (data > 0) {
          let deletedItemIndex = this.prods.indexOf(objproduct);
          this.pageConfig.currentPage = this.commonsvc.setCurrentPage(this.pageConfig, deletedItemIndex, this.prods.length);
          this.prods.splice(deletedItemIndex, 1);
          this.toastr.success('deleted');
          //this.getProducts();
        }
        else {
          this.toastr.error('failed');
        }
      });
    }

  }

  edit(objnew: Products) {
    debugger
    this.header = "Update Product";
    this.newobj = new Products();

    this.newobj = objnew;
    this.cd.detectChanges();
    this.actiontype = 2;
    console.log(this.newobj);
  }
  closepopup() {
    $('#exampleModal').modal('hide');
    this.header = "Add Product";
    this.actiontype = 1;
  }
  addp(newp: Products) {
    this.loader.show();
    newp.RetailId = this.retailId;
    newp.Status = true;
    newp.CreatedBy = "admin";
    this.prodsvc.addProduct(newp).subscribe((data: any) => {
      if (data > 0) {
        //this.types.push(newtype);
        this.newobj = new Products();
        this.toastr.success('Added');
        this.selectedbrand = new Brands;
        this.selectedtype = new ProductType
        this.loader.hide();
        this.getProducts();

      }
      else {
        this.toastr.error('failed');
        this.loader.hide();
      }
    }, er => {
      this.toastr.error('failed');
      this.loader.hide();
    });
  }
  updateType(prod: Products) {
    prod.RetailId = this.retailId;
    this.prodsvc.updateProduct(prod).subscribe((data: any) => {
      if (data > 0) {
        this.actiontype = 1;
        this.toastr.success('Updated');
        this.header = "Add Product";
        this.getProducts();
      }
      else {
        this.toastr.error('failed');
      }
    });
  }
  selecttype(filterVal: any) {
    debugger
    if (filterVal == "0") {

    }
    else {
      let stype = this.ptypes.filter((item) => item.TypeId == filterVal);
      if (stype != null || undefined) {
        this.selectedtype = stype[0];
      }
    }
  }
  selectbrand(filterVal: any) {
    debugger
    if (filterVal == "0") {

    }
    else {
      let sbrand = this.brands.filter((item) => item.BrandId == filterVal);
      if (sbrand != null || undefined) {
        this.selectedbrand = sbrand[0];
      }
    }
  }
  submit(type: number, prod: Products) {
    $('#exampleModal').modal('hide');
    if (type == 1) {
      this.addp(prod);
    }
    else {
      this.updateType(prod);
    }
  }

  addtocart(prod: Products) {
    this.loader.show();
    let cart = new Carts();
    cart.ProductId = prod.Id;
    this.commonsvc.retailerId = 0;
    this.commonsvc.getretailId();
    cart.UserId = this.commonsvc.userId;
    cart.Quantity = 1;
    cart.RetailerId = this.retailId;
    this.csvc.addCart(cart).subscribe((data: any) => {
      if (data > 0) {
        this.toastr.success('added to cart');
        this.commonsvc.modifyCartsCount(1);
      }
      else {
        this.toastr.error('failed');
      }
      this.loader.hide();
    });

  }

  //file upload code here
  fileUpload(files: any) {
    this.commonsvc.fileUpload(files, (formData: any) => {
      console.log(formData);
      this.loader.show();
      this.prodsvc.importProducts(formData, this.commonsvc.getretailId()).subscribe((data: any) => {
        this.loader.hide();
        if (data == 1) {
          this.toastr.success('Import Success');
          this.getProducts();
        } else {
          this.toastr.error('Import Failed.')
        }
      }, er => {
        this.loader.hide();
        this.toastr.error('Import Failed.')
      });
    });
  }

    
  export() {
    this.loader.show();
    this.prodsvc.exportProducts(this.retailId).subscribe((data: any) => {
      this.commonsvc.downloadAsExcel(data, 'Products', this.loader, this.toastr);
    }, (err: any) => {
      console.log(err);
      this.toastr.error('Download Failed');
      this.loader.hide();
    });
  }
}
