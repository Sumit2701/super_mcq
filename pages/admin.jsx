import { Input, Layout } from 'antd';
import { Navbar } from "../components/Layouts";
const { Header, Content, Footer, Sider } = Layout;
import { Button, Space } from 'antd';

export default function admin() {

  return (
    
    <div><Navbar><Layout >
  <Content style={{ margin: '0 16px 0',}}>
    
     <div style={{border: '1px solid black',borderRadius:"5px",width:"70%", background:"#F7DBF0", margin:"auto",padding:"10px", marginBlock:"20px" }}>
    Q  <Input placeholder="Question" />

     </div>
     <div style={{border: '1px solid black',borderRadius:"5px",width:"70%", margin:"auto",padding:"10px", marginBlock:"20px", display: "flex", justifyContent: "space-between"}}>
     A<Input placeholder="Question" /> 
     </div>
     <div style={{border: '1px solid black',borderRadius:"5px",width:"70%", margin:"auto",padding:"10px", marginBlock:"20px", display: "flex", justifyContent: "space-between"}}>
     B<Input placeholder="Question" /> 
     </div><div style={{border: '1px solid black',borderRadius:"5px",width:"70%", margin:"auto",padding:"10px", marginBlock:"20px", display: "flex", justifyContent: "space-between"}}>
     C<Input placeholder="Question" />  
     </div><div style={{border: '1px solid black',borderRadius:"5px",width:"70%", margin:"auto",padding:"10px", marginBlock:"20px", display: "flex", justifyContent: "space-between"}}>
     D<Input placeholder="Question" />
    
   </div>  <div style={{border: '1px solid black',borderRadius:"5px",width:"55%", margin:"auto",padding:"10px", marginBlock:"20px", display: "flex", justifyContent: "space-between"}}>
   Option A <Input  type='checkBox'/>Option A <Input type='checkBox'/>Option A <Input type='checkBox'/>Option A <Input type='checkBox'/>
   </div>   
      </Content>
    </Layout></Navbar>
 </div>
  )
}
