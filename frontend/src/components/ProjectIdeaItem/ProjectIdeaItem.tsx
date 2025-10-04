import { memo, useCallback } from 'react';
import { Button, Typography } from 'antd';
import styles from './ProjectIdeaItem.module.scss';
import { IProjectIdeaWithVoteStatus } from '../../types';

const { Title, Text } = Typography;

export interface IProjectIdeaItemProps {
  item: IProjectIdeaWithVoteStatus;
  onVote: (ideaId: string) => void;
  votedIdeas: Set<string>;
  votingIdeas: Set<string>;
}

/**
 * Компонент отдельного элемента списка идей
 */
export const ProjectIdeaItem = memo<IProjectIdeaItemProps>(({
  item,
  onVote,
  votedIdeas,
  votingIdeas
}) => {
  const isVoted = votedIdeas.has(item.id) || item.hasVoted;
  const isLoading = votingIdeas.has(item.id);

  const handleVoteClick = useCallback(() => {
    onVote(item.id);
  }, [item.id, onVote]);

  const formatVoteCount = (count: number): string => {
    if (count === 1) {
      return 'голос';
    }

    if (count < 5) {
      return 'голоса';
    }
    
    return 'голосов';
  };

  return (
    <div className={styles.listItem}>
      <div className={styles.itemContent}>
        <div className={styles.itemText}>
          <Title level={4} className={styles.itemTitle}>
            {item.title}
          </Title>
          <Text className={styles.itemDescription}>
            {item.description}
          </Text>
        </div>

        <div className={styles.voteSection}>
          <Button
            type="default"
            className={styles.voteButton}
            disabled={isVoted}
            loading={isLoading}
            onClick={handleVoteClick}
          >
            {isVoted ? 'Проголосовано' : 'Проголосовать'}
          </Button>
          <div className={styles.voteCount}>
            {item.votes} {formatVoteCount(item.votes)}
          </div>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // проверка на изменение основных свойств
  if (prevProps.item.id !== nextProps.item.id || 
      prevProps.item.votes !== nextProps.item.votes || 
      prevProps.item.hasVoted !== nextProps.item.hasVoted) {
    return false;
  }

  // Проверяем статус голосования для текущей идеи
  const ideaId = nextProps.item.id;

  return prevProps.votedIdeas.has(ideaId) === nextProps.votedIdeas.has(ideaId) &&
         prevProps.votingIdeas.has(ideaId) === nextProps.votingIdeas.has(ideaId);
});

ProjectIdeaItem.displayName = 'ProjectIdeaItem';
