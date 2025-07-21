'use client'

import './Header.css'
import Image from "next/image";
import logo from '../../../../public/icons/Logo.svg';
import bell from '../../../../public/icons/bell.svg'
import profile from '../../../../public/icons/profile.svg'
import { useRouter } from "next/navigation";
import { AppRoutes } from '@/constants/AppRoutes';
import { useRole } from '@/contexts/RoleContext';

export default function Header() {
    const router = useRouter();
    const { role } = useRole();

    const homerouter = role === 'client' ? 'homeclient' : 'homepsyhology';

    return (
        <header>
            <div className="navigation-header-left">
                <Image
                    src={logo}
                    alt='logo'
                    height={24}
                    onClick={() => router.push(AppRoutes[homerouter])}
                    style={{ cursor: 'pointer'}}
                />
                <div className="navigation-header">
                    <a onClick={() => router.push(AppRoutes.application_psy)}>Вопросы-ответы</a>
                    <a href='###'>Правила участия</a>
                </div>
            </div>
            <div className="navigation-header-right">
                 <Image
                    src={bell}
                    alt='bell'
                />
                <Image
                    src={profile}
                    alt='profile'
                    onClick={() => router.push(AppRoutes.homepsyhology)}
                    style={{ cursor: 'pointer'}}
                />
            </div>
        </header>
    )
}