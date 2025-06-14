import { Outlet } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = (): void => {
        /**
         * TODO: Complete method to allow sidebar visibility state to be toggled
         */
        setSidebarVisible(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarVisible &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setSidebarVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarVisible]);

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/** 
             * TODO: Fix this navbar by adding the appropriate props
             */}
            <TopNavbar toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 overflow-hidden">
                <div ref={sidebarRef} className={`transition-all duration-300 ${sidebarVisible ? 'w-64' : 'w-0'} flex-shrink-0 overflow-hidden`}>
                    <Sidebar visible={sidebarVisible} />
                </div>
                <Outlet />
            </div>

        </div>
    );
}