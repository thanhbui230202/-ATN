import { SignUpForm } from "../components/molecules/RegisterForm";
export default function SignUpPage() {
  return (
    <div className="w-full h-screen relative flex items-center justify-center  p-6"
    style={{
      backgroundImage: `url('https://img.freepik.com/free-vector/film-reel-strip-with-stars-cinema-background_1017-23462.jpg?t=st=1732860495~exp=1732864095~hmac=606c8f37a612707830fa662b1eca6a8ce6349815be95c618633c82d805ca15b4&w=826')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">ĐĂNG KÝ</h1>
        <SignUpForm />
      </div>
    </div>
  )
}

