'use client';
import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import Image from 'next/image';
import { BsSearch, BsArrowRight } from 'react-icons/bs';
import styles from './ConversationList.module.css';

// Mock data for conversation list
const mockConversations = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    lastMessage: 'Chào bạn, tôi muốn tìm hiểu về khóa học Toán',
    time: '10:30',
    unread: true,
    online: true,
    role: 'tutor'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Khi nào bạn muốn bắt đầu buổi học?',
    time: '09:15',
    unread: false,
    online: false,
    role: 'tutor'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Cảm ơn bạn về buổi học hôm nay',
    time: 'Hôm qua',
    unread: false,
    online: true,
    role: 'student'
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    lastMessage: 'Tôi sẽ gửi bài tập vào tối nay',
    time: 'Thứ 3',
    unread: false,
    online: false,
    role: 'tutor'
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    lastMessage: 'Xin chào, tôi đang tìm gia sư dạy Tiếng Anh',
    time: '18/04',
    unread: true,
    online: true,
    role: 'student'
  }
];

interface ConversationListProps {
  selectedId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function ConversationList({ selectedId, onSelectConversation }: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(mockConversations);

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.conversationList}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tin nhắn</h2>
        <div className={styles.searchContainer}>
          <InputGroup className={styles.searchInput}>
            <InputGroup.Text className={styles.searchIcon}>
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm tin nhắn"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <div className={styles.conversations}>
        {filteredConversations.length > 0 ? (
          filteredConversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`${styles.conversationItem} ${selectedId === conversation.id ? styles.selected : ''} ${conversation.unread ? styles.unread : ''}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className={styles.avatarContainer}>
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  width={50}
                  height={50}
                  className={styles.avatar}
                />
                {conversation.online && <span className={styles.onlineIndicator}></span>}
              </div>
              <div className={styles.content}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{conversation.name}</span>
                  <span className={styles.time}>{conversation.time}</span>
                </div>
                <div className={styles.messageRow}>
                  <p className={styles.message}>{conversation.lastMessage}</p>
                  {conversation.unread && <span className={styles.badge}></span>}
                </div>
                <div className={styles.roleTag}>
                  {conversation.role === 'tutor' ? 'Gia sư' : 'Học viên'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>Không tìm thấy cuộc trò chuyện nào</p>
          </div>
        )}
      </div>
    </div>
  );
}