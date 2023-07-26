// import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import CoinTable from "../../components/table/CoinTable";
import UserSidebar from "../../components/sidebar/UserSidebar";
import UserDatatable from "../../components/datatable/UserDatatable";

const UserList = () => {
  return (
    <div className="list">
      <UserSidebar />
      <div className="listContainer">
        <Navbar />
        <UserDatatable />
      </div>
    </div>
  );
};

export default UserList;
