import { BillingInfo } from './billingInfo'
import { BillingProducts } from './billingProducts'
import { BillingTaxInfo } from './billingTaxInfo'

export class Bill {
    public BillInfo: BillingInfo

    public BillProducts: BillingProducts[]

    public BillTaxInfo: BillingTaxInfo
}