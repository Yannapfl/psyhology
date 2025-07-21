import { ReactNode } from 'react';
import '../Layout.css'
import HeaderAdmin from './HeaderAdmin';

type LayoutProps = {
    children: ReactNode;
}

export default function LayoutAdmin({ children }: LayoutProps) {
    return (
        <div className='layout'>
            <HeaderAdmin />
            <main>{children}</main>
        </div>
    )
}