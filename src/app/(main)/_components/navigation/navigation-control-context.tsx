'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ElementRef,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const SIDEBAR_WIDTH = { MIN: 240, MAX: 480 } as const;

type NavigationControl = {
  sidebarRef: RefObject<HTMLElement>;
  headerRef: RefObject<HTMLElement>;
  isMobile: boolean;
  isSetting: boolean;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  handleResizeMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
};
const defaultNavigationControl: NavigationControl = {
  sidebarRef: { current: null },
  headerRef: { current: null },
  isMobile: false,
  isSetting: false,
  isCollapsed: false,
  setIsCollapsed: () => {},
  handleResizeMouseDown: () => {},
  expandSidebar: () => {},
  collapseSidebar: () => {},
};
const NavigationControlContext = createContext<NavigationControl>(defaultNavigationControl);

export const useNavigationControl = () => useContext(NavigationControlContext);

export const NavigationControlProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const headerRef = useRef<ElementRef<'header'>>(null);
  const isResizingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isSetting, setIsSetting] = useState(false);
  const setting = useCallback(
    (callback?: () => void) => {
      setIsSetting(true);
      callback?.();
      setTimeout(() => setIsSetting(false), 300);
    },
    [setIsSetting]
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(`(max-width: ${SIDEBAR_WIDTH.MAX}px)`);
    const handleChange = () => setting(() => setIsMobile(matchMedia.matches));

    handleChange();
    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isMobile) return collapseSidebar();
    if (sidebarRef.current) sidebarRef.current.style.width = `${SIDEBAR_WIDTH.MIN}px`;
    expandSidebar();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapseSidebar();
  }, [pathname, isMobile]);

  const expandSidebar = () => {
    if (!(sidebarRef.current && isCollapsed)) return;
    sidebarRef.current.style.width = isMobile ? '100dvw' : `${SIDEBAR_WIDTH.MIN}px`;
    setting(() => setIsCollapsed(false));
  };

  const collapseSidebar = () => {
    if (!sidebarRef.current || isCollapsed) return;
    sidebarRef.current.style.width = '0';
    setting(() => setIsCollapsed(true));
  };

  const resizeSidebar = (e: MouseEvent) => {
    if (!(isResizingRef.current && sidebarRef.current && headerRef.current)) return;
    let newWidth = e.clientX;
    if (newWidth > SIDEBAR_WIDTH.MAX) newWidth = SIDEBAR_WIDTH.MAX;
    if (newWidth < SIDEBAR_WIDTH.MIN) newWidth = SIDEBAR_WIDTH.MIN;
    sidebarRef.current.style.width = `${newWidth}px`;
  };

  const stopResizingSidebar = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', resizeSidebar);
    document.removeEventListener('mouseup', stopResizingSidebar);
  };

  const startResizingSidebar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener('mousemove', resizeSidebar);
    document.addEventListener('mouseup', stopResizingSidebar);
  };

  return (
    <NavigationControlContext.Provider
      value={{
        sidebarRef,
        headerRef,
        isMobile,
        isSetting,
        isCollapsed,
        setIsCollapsed,
        handleResizeMouseDown: startResizingSidebar,
        expandSidebar,
        collapseSidebar,
      }}
    >
      {children}
    </NavigationControlContext.Provider>
  );
};
