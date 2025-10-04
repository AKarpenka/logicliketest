import React, { memo, useCallback, useState } from 'react';
import { List, Typography, App } from 'antd';
import styles from './ProjectIdeasList.module.scss';
import { CustomSpinner } from '@/components/CustomSpinner';
import { ProjectIdeaItem } from '@/components/ProjectIdeaItem';
import { useProjectIdeas } from '../../hooks/useProjectIdeas';
import { projectIdeasApi } from '../../services/projectIdeasApi';
import { IProjectIdeaWithVoteStatus } from '../../types';
import { handleError } from './utils/errorHandling';

const { Title } = Typography;

const ProjectIdeasList: React.FC = memo(() => {
  const { ideas, loading, error, updateIdeaVotes } = useProjectIdeas();
  const [votedIdeas, setVotedIdeas] = useState<Set<string>>(new Set());
  const [votingIdeas, setVotingIdeas] = useState<Set<string>>(new Set());
  const { notification } = App.useApp();

  const ideasMap = React.useMemo(() => {
    return new Map(ideas.map(idea => [idea.id, idea]));
  }, [ideas]);

  React.useEffect(() => {
    const votedIdeasFromServer = new Set(ideas.filter(idea => idea.hasVoted).map(idea => idea.id));
    
    setVotedIdeas(votedIdeasFromServer);
  }, [ideas]);

  const handleVote = useCallback(async (ideaId: string) => {
    const idea = ideasMap.get(ideaId);

    if (votedIdeas.has(ideaId) || votingIdeas.has(ideaId) || idea?.hasVoted) {
      return;
    }

    setVotingIdeas(prev => {
      const newSet = new Set(prev);

      newSet.add(ideaId);

      return newSet;
    });

    try {
      await projectIdeasApi.voteForIdea(ideaId);

      setVotedIdeas(prev => {
        const newSet = new Set(prev);

        newSet.add(ideaId);

        return newSet;
      });

      updateIdeaVotes(ideaId);
    } catch (error) {
      handleError(error, notification);
    } finally {
      setVotingIdeas(prev => {
        const newSet = new Set(prev);
        newSet.delete(ideaId);
        return newSet;
      });
    }
  }, [votedIdeas, votingIdeas, updateIdeaVotes, ideasMap, notification]);

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
        renderItem={(item: IProjectIdeaWithVoteStatus) => (
          <ProjectIdeaItem
            key={item.id}
            item={item}
            onVote={handleVote}
            votedIdeas={votedIdeas}
            votingIdeas={votingIdeas}
          />
        )}
      />
    </div>
  );
});

ProjectIdeasList.displayName = 'ProjectIdeasList';

export default ProjectIdeasList;