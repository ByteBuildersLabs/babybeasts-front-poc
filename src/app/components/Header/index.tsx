import monster from '../../img/logo.jpeg';
import './main.module.css';
import Image from 'next/image';

function Header() {
  return (
    <>
      <nav className="navbar">
        <div className='logo'>
          <a href="/">
            <Image src={monster} alt="Logo" />
          </a>
          <h2>Baby <span>Beast</span></h2>
        </div>
      </nav>
    </>
  )
}

export default Header;
