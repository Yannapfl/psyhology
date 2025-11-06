import './Footer.css'
import Image from "next/image";
import tiktok from '../../../../public/icons/tiktok.svg'
import instagram from '../../../../public/icons/instagram.svg'
import youtube from '../../../../public/icons/youtube.svg'
import whatsapp from '../../../../public/icons/whatsapp.svg'
import logo from '../../../../public/icons/Logo.svg'
import email from '../../../../public/icons/email.svg'

export default function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <div className="footer-meta">
    
                </div>
                <div className="footer-social-media">
                    <div className="social-media-block">
                        <p>Социальные сети</p>
                        <div className="socail-media-icons">
                            <a href='###'><Image src={tiktok} alt='tiktok' /></a>
                            <a href='###'><Image src={instagram} alt='tiktok' /></a>
                            <a href='###'><Image src={youtube} alt='tiktok' /></a>
                        </div>
                    </div>
                    <div className="social-media-block">
                        <p>Чат с менеджером</p>
                        <div className="socail-media-icons">
                            <a href='###'><Image src={whatsapp} alt='tiktok' /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-info'>
                <div className='footer-info-left'>
                    <Image src={logo} alt='logo' height={24}/>
                    <p>© 2020-2023 ТОО &quot;Psyforpeople&quot;</p>
                </div>
                <div className='footer-info-right'>
                    <Image src={email} alt='email' />
                    <p>psyforpeople@project</p>
                </div>
            </div>
        </footer>
    )
}