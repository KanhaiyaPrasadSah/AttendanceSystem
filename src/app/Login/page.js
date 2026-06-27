import Login from "@/Components/Authentication/Login/Login";
import Footer from "@/Components/common/Footer";
import Header from "@/Components/common/Header";

export const metadata = {
  title: "Admin & Staff Login",
  description: "Secure login portal for administrators and staff members.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  )
}