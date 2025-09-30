import { ConfigProvider } from 'antd';
import { App as AntApp } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <AntApp>
        <div>Hello World</div>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
