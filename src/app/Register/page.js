import Register from "@/Components/Authentication/Register/Register";
import Footer from "@/Components/common/Footer";
import Header from "@/Components/common/Header";

export const metadata = {
  title: "Admin Registration",
  description: "Create a new administrative account portal.",
};

export default function RegisterPage() {
  return <>
  <Header/>
  <Register/>
  <Footer/>
  </>
}