import { Button } from "../components/astoms/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/astoms/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/astoms/table"


export default function ProfilePage() {
  const userInfo = {
    name: "Bùi Minh Thành",
    phone: "0911710470",
    address: "Phường Hòa Thuận Tây - Tp Đà Nẵng",
    email: "thanhbui.230202@gmail.com",
    points: 0,
    rewards: 0
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Thông Tin Cá Nhân</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="font-medium text-lg">{userInfo.name}</p>
              <p>Điện thoại: {userInfo.phone}</p>
              <p>Địa chỉ: {userInfo.address}</p>
              <p>Email: {userInfo.email}</p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="QR Code"
                width={150}
                height={150}
                className="border p-2"
              />
            </div>
           <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button variant="outline"><a href="/change-password">Đổi Mật Khẩu</a></Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <a href="/user-update">
                    Cập Nhật Thông Tin
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lịch Sử Giao Dịch</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rạp</TableHead>
                  <TableHead>Tên Phim</TableHead>
                  <TableHead className="text-right">Tổng Tiền</TableHead>
                  <TableHead className="text-right">Điểm Thưởng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

