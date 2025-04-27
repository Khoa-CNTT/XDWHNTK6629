'use client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ConversationList from './_components/ConversationList';
import MessagePanel from './_components/MessagePanel';
import EmptyState from './_components/EmptyState';
import styles from './Messages.module.css';
import { useSearchParams } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('id');
  const user = useCurrentUser();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(conversationId);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedConversation(conversationId);
  }, [conversationId]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    
    // Update URL with conversation ID
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url);
  };

  // Show conversation list on mobile when no conversation is selected
  const showConversationListOnMobile = isMobileView && !selectedConversation;
  // Show message panel on mobile when a conversation is selected
  const showMessagePanelOnMobile = isMobileView && selectedConversation;

  return (
    <div className={styles.messagesPage}>
      <Container fluid className={styles.container}>
        <Row className={styles.messagesContainer}>
          {/* Conversation list - hidden on mobile when conversation selected */}
          {(!isMobileView || showConversationListOnMobile) && (
            <Col md={4} lg={3} className={styles.sidebarCol}>
              <ConversationList 
                selectedId={selectedConversation} 
                onSelectConversation={handleSelectConversation} 
              />
            </Col>
          )}

          {/* Message panel - full width on mobile when conversation selected */}
          <Col md={8} lg={9} className={styles.contentCol}>
            {selectedConversation ? (
              <MessagePanel 
                conversationId={selectedConversation} 
                onBack={() => setSelectedConversation(null)}
                isMobileView={isMobileView}
              />
            ) : (
              !showConversationListOnMobile && <EmptyState />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}