import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";


const Main = () => {
    return (
        <div className="container mx-auto my-8">
            <Header></Header>
          <Outlet></Outlet> 
        </div>
    );
};

export default Main;