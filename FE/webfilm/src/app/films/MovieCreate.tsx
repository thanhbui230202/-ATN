import { Button } from "../../components/astoms/button";
import { DialogFooter } from "../../components/astoms/dialog";
import { Input } from "../../components/astoms/input";
import { Label } from "../../components/astoms/label";
export default function CreateFilm() {
  // const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault()
  //     onsubmit(formData)
  //   }
  return (
    <form>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invoice" className="text-right">
            Invoice
          </Label>
          <Input
            id="invoice"
            name="invoice"
            // value={formData.invoice}
            // onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="paymentStatus" className="text-right">
            Status
          </Label>
          <Input
            id="paymentStatus"
            name="paymentStatus"
            // value={formData.paymentStatus}
            // onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="totalAmount" className="text-right">
            Amount
          </Label>
          <Input
            id="totalAmount"
            name="totalAmount"
            // value={formData.totalAmount}
            // onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="paymentMethod" className="text-right">
            Method
          </Label>
          <Input
            id="paymentMethod"
            name="paymentMethod"
            // value={formData.paymentMethod}
            // onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </form>
  );
}
