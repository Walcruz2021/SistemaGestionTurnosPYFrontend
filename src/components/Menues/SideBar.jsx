import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  touchSide = touchSideState,
  setTouchSide = setTouchSideState,
}) => {
  const changeState = () => {
    setTouchSide(!touchSide);
  };

  return (
    <div style={{ overflow: "scroll initial" }}>
      <CDBSidebar className="bg-white border border-right position-fixed">
        <CDBSidebarHeader style={{ display: "flex", justifyContent: "center" }}
          prefix={
            <i
              onClick={changeState}
              className="fa fa-bars fa-2x text-secondary"
              style={{ margin: 0, padding: 0, cursor: "pointer" }}
            ></i>
          }
        >
          {/*         
          <a href="/" className="text-decoration-none text-secondary">
            INICIO
          </a> */}
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns" className="text-secondary">
                Turnos
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table" className="text-secondary">
                Tables
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" className="text-secondary">
                Perfil
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/InformeVentas" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line" className="text-secondary">
                Informes
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
