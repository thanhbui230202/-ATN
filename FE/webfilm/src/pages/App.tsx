import { Outlet } from "react-router";
import Footer from "../components/molecules/Footer";
import { Header } from "../components/molecules/Header";

export default function App(){
    return(
        <div>
            <Header onLogin={function (): void {
                throw new Error("Function not implemented.");
            } } onRegister={function (): void {
                throw new Error("Function not implemented.");
            } } onLogout={function (): void {
                throw new Error("Function not implemented.");
            } }></Header>
            <Outlet/>
            <Footer></Footer>
        </div>
    )
}