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
          <Link
            href='/'
            rel='noopener noreferrer'
          >
            Super Quizer
          </Link>
        </Menu.Item>
        <Menu.Item key='app' style={{ backgroundColor: '#BEAEE2' }}>
          Navigation Two
        </Menu.Item>
        <Menu.Item key='SubMenu' style={{ backgroundColor: '#BEAEE2' }}>
          Navigation Three - Submenu
        </Menu.Item>
        <SubMenu
          title='Navigation Four - Link'
          style={{ backgroundColor: '#BEAEE2' }}
        >
          <Menu.Item key='setting:1'>Option 1</Menu.Item>
          <Menu.Item key='setting:2'>Option 2</Menu.Item>
          <Menu.Item key='setting:3'>Option 3</Menu.Item>
          <Menu.Item key='setting:4'>Option 4</Menu.Item>
        </SubMenu>
        <Menu.Item key='mail' style={{ backgroundColor: '#BEAEE2' }}>
       navbar  </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default Navbar;
