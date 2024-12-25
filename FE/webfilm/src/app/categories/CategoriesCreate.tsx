import { Button } from "../../components/astoms/button";
import { DialogFooter } from "../../components/astoms/dialog";
import { Input } from "../../components/astoms/input";
import { Label } from "../../components/astoms/label";

export default function CreateCategory() {
  // const [category, setCategory] = useState("");
  return (
    <form>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invoice" className="text-right">
            Category Name
          </Label>
          <Input id="category_name" className="col-span-3" type="text" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="paymentStatus" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            className="col-span-3"
            type="text"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </form>
  );
}
