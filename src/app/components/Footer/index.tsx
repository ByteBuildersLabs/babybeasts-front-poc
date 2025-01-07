import Image from 'next/image';

import github from '../../img/github-sign.png';
import twitter from '../../img/twitter.png';
import unity from '../../img/unity.png';
import starknet from '../../img/starknet.png';
import rolo from '../../img/rol.jpg';
import juan from '../../img/Juan.jpg';
import cox from '../../img/marco.jpeg';
import luis from '../../img/Luis.png';
import daniel from '../../img/daniel.jpeg';

import './main.module.css';

function Footer() {
  return (
    <>
      <div className='team mt-5 mb-4'>
        <a href='https://github.com/RolandoDrRobot' target='_blank'>
          <Image src={rolo} alt="Rolando" className='footer-team' />
        </a>
        <a href='https://github.com/juandiegocv27' target='_blank'>
          <Image src={juan} alt="Juan" className='footer-team' />
        </a>
        <a href='https://github.com/coxmars' target='_blank'>
          <Image src={cox} alt="Marco" className='footer-team' />
        </a>
        <a href='https://github.com/jimenezz22' target='_blank'>
          <Image src={luis} alt="Luis" className='footer-team' />
        </a>
        <a href='https://github.com/danielcdz' target='_blank'>
          <Image src={daniel} alt="Daniel" className='footer-team' />
        </a>
      </div>
      <div className="footer mb-3">
        <a href='https://github.com/orgs/ByteBuildersLabs/repositories' target='_blank'>
          <Image src={github} alt="GitHub" className='footer-logo' />
        </a>
        <a href='https://x.com/0xByteBeasts' target='_blank'>
          <Image src={twitter} alt="Twitter" className='footer-logo' />
        </a>
        <a href='https://unity.com/' target='_blank'>
          <Image src={unity} alt="Unity" className='footer-logo' />
        </a>
        <a href='https://www.starknet.io/' target='_blank'>
          <Image src={starknet} alt="Starknet" className='footer-logo' />
        </a>
        <a href='https://www.dojoengine.org/' target='_blank'>
          <img src='https://book.dojoengine.org/dojo-logo.svg' height={18} />
        </a>
      </div>
    </>
  );
}

export default Footer;
