export interface ICard {
    url: string;
    uuid: string;
    title: string;
    content_type: string;
}

export interface IDrawerProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export interface IDrawerContextProps {
    isOpen: boolean;
    toggleDrawer: () => void;
}