import Link from 'next/link'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Card, Col, Row } from 'antd';
import { Button, Space } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

import React from 'react';
import {Navbar} from "../components/Layouts";
import {Questions} from "../components/Questions";
export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Navbar >
   <Questions/>
   
    
   </Navbar>
  )
}
