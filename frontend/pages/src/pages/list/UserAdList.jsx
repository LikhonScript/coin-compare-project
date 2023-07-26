// import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import CoinTable from "../../components/table/CoinTable";
import UserSidebar from "../../components/sidebar/UserSidebar";
import UserDatatable from "../../components/datatable/UserDatatable";
import UserAdtable from "../../components/datatable/UserAdTable";

const UserAdList = () => {
  return (
    <div className="list">
      <UserSidebar />
      <div className="listContainer">
        <Navbar />
        <UserAdtable />
      </div>
    </div>
  );
};

export default UserAdList;
