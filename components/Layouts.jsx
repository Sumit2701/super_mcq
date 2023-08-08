import { Menu } from 'antd';
import { useState } from 'react';
import Link from 'next/link';

const { SubMenu } = Menu;

export const Navbar = ({ children }) => {
  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='container'>
      <Menu
        theme='dark'
        mode='horizontal'
        selectedKeys={[current]}
        onClick={handleClick}
        style={{ backgroundColor: '#BEAEE2', display: 'flex', justifyContent: 'center' }}
      >
        <Menu.Item
          key='alipay'
          style={{ backgroundColor: '#BEAEE2', color: 'white' }}
        >
          <Link href='/' rel='noopener noreferrer'>
            Super Quizer
          </Link>
        </Menu.Item>
       
        
        <Menu.Item key='mail' style={{ backgroundColor: '#BEAEE2' }}>
          
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default Navbar;
