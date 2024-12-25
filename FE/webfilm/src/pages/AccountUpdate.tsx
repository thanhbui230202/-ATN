import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/astoms/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/astoms/form";
import { Input } from "../components/astoms/input";
import { Button } from "../components/astoms/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập họ tên" }),
  address: z.string().min(1, { message: "Vui lòng nhập địa chỉ" }),
  idNumber: z.string().min(1, { message: "Vui lòng nhập số CMND" }),
  dateOfBirth: z.string().min(1, { message: "Vui lòng nhập ngày sinh" }),
  phone: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
});

export default function AccountUpdate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Bùi Minh Thành",
      address: "Phường Hòa Thuận Tây - Tp Đà Nẵng",
      idNumber: "212880808",
      dateOfBirth: "23/02/2002",
      phone: "0911710470",
      email: "thanhbui.230202@gmail.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Thông tin tài khoản</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Họ và tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Vui lòng nhập đầy đủ thông tin vào các trường có dánh dấu (*)
            </p>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Cập nhật
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
