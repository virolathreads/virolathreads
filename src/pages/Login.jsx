import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (password === "virola123") {
      sessionStorage.setItem("virolatoken", "qwertyasd");
      window.location.href = "/bloglist";
    }
    setLoad(false);
  };

  return (
    // <div class="container containers">
    //   <div class="screen">
    //     <div class="screen__content">
    //       <form class="login" onSubmit={handleSubmit}>
    //         <div class="login__field">
    //           <i class="login__icon fas fa-user"></i>
    //           <input
    //             type="text"
    //             class="login__input"
    //             placeholder="User name"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>
    //         <div class="login__field">
    //           <i class="login__icon fas fa-lock"></i>
    //           <input
    //             type="password"
    //             class="login__input"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             placeholder="Password"
    //           />
    //         </div>
    //         {load ? (
    //           <div class="spinner-border text-primary" role="status">
    //             <span class="sr-only">Loading...</span>
    //           </div>
    //         ) : (
    //           <button class="button login__submit">
    //             <span class="button__text">Log In</span>
    //             <i class="button__icon fas fa-chevron-right"></i>
    //           </button>
    //         )}
    //       </form>
    //     </div>
    //     <div class="screen__background">
    //       <span class="screen__background__shape screen__background__shape4"></span>
    //       <span class="screen__background__shape screen__background__shape3"></span>
    //       <span class="screen__background__shape screen__background__shape2"></span>
    //       <span class="screen__background__shape screen__background__shape1"></span>
    //     </div>
    //   </div>
    // </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      {/* Left Column with Logo and Form */}
      <div className="relative flex flex-col items-center justify-center bg-white p-6">
        {/* Logo at the Top-Left */}
        <img
          src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457982/ef3tnweirfwsvvd1djwc.png"
          alt="Logo"
          className="absolute top-20 left-20 w-60 lg:w-70" // Position top-left with absolute
        />
        {/* Login Card */}
        <Card className="w-full max-w-sm bg-inherit border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Login</CardTitle>
            <CardDescription className="text-gray-500 font-medium">
              Welcome back. Please enter your login details to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-8">
                <div className="grid gap-4">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="grid gap-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>

                {/* Login Button */}
                {load ? (
                  <Button disabled className="w-full text-white rounded-sm">
                    Submitting
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full text-white rounded-sm"
                  >
                    Login
                  </Button>
                )}
              </div>
            </form>
            {/* Forgot Password Link */}
            <div className="mt-4 text-center text-sm">
              <a href="#" className="underline text-black">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Image Column (hidden on small screens) */}
      <div className="hidden lg:flex items-center justify-center bg-gray-100">
        <img
          src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582470/1731157997456_ym91xn.png"
          alt="High-speed internet connection"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
