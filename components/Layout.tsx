import React, { ReactNode, useState }from 'react';
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';
import SideMenu from './SideMenu';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopNavbar onMenuClick={toggleSideMenu} />
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
      
      {/* Overlay when side menu is open on smaller screens */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSideMenu}
        ></div>
      )}

      <main className="flex-grow overflow-y-auto pt-4 pb-20 md:pb-4 px-4"> 
        {/* pb-20 for bottom nav space on mobile, pb-4 for desktop */}
        {children}
      </main>
      
      <BottomNavbar />
      {/* Footer can be removed or kept if desired, current design implies full height app area */}
      {/* <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Business Hub.
      </footer> */}
    </div>
  );
};

export default Layout;