import React, { memo, useCallback } from 'react';
import { List, Button, Typography } from 'antd';
import styles from './ProjectIdeasList.module.scss';
import { CustomSpinner } from '@/components/CustomSpinner';
import { useProjectIdeas } from '../../hooks/useProjectIdeas';

const { Title, Text } = Typography;

const ProjectIdeasList: React.FC = memo(() => {
  const { ideas, loading, error } = useProjectIdeas();

  const handleVote = useCallback((title: string) => {
    console.log('Проголосовать за:', title);
  }, []);

  if (loading) {
    return <CustomSpinner />;
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        {error}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Идеи для развития проекта
      </Title>
      
      <List
        dataSource={ideas}
        renderItem={(item) => (
          <List.Item key={item.id} className={styles.listItem}>
            <div className={styles.itemContent}>
              
              <div className={styles.itemText}>
                <Title level={4} className={styles.itemTitle}>
                  {item.title}
                </Title>
                <Text className={styles.itemDescription}>
                  {item.description}
                </Text>
              </div>

              <Button 
                type="default"
                className={styles.voteButton}
                onClick={() => handleVote(item.title)}
              >
                Проголосовать
              </Button>

            </div>
          </List.Item>
        )}
      />
    </div>
  );
});

export default ProjectIdeasList;
