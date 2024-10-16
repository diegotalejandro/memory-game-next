"use client"

import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "./context/GlobalContext";
import { DrawerProvider } from "./context/DrawerContext";


export function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <GlobalProvider>
            <DrawerProvider>
                {children}
            </DrawerProvider>
        </GlobalProvider>
    </ThemeProvider>;
}