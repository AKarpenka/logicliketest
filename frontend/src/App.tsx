import { ConfigProvider } from 'antd';
import { App as AntApp } from 'antd';
import { ProjectIdeasList } from './features/project-ideas';

function App() {
  return (
    <ConfigProvider>
      <AntApp>
        <ProjectIdeasList />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
