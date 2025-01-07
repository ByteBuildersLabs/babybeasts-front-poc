import fight from '../../img/banner.jpeg';
import './main.module.css';
import Image from 'next/image';

function Play() {
  return (
    <>
      <div>
        <div className="section-tab yellow-border">
          <p className={'title text-center mb-3'}>
            You play, feed, sleep and more
            <span className='d-block'> Look at It, otherwise It'll die</span>
          </p>
          <div className="new yellow-border mb-3">
            <Image src={fight} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Play;
