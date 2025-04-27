'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import { BsArrowLeft, BsEmojiSmile, BsPaperclip, BsSend } from 'react-icons/bs';
import styles from './MessagePanel.module.css';

// Mock data for conversation
const mockUsers = {
  '1': {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    online: true,
    role: 'tutor',
    subject: 'Toán học'
  },
  '2': {
    id: '2',
    name: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    online: false,
    role: 'tutor',
    subject: 'Tiếng Anh'
  },
  '3': {
    id: '3',
    name: 'Lê Văn C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    online: true,
    role: 'student',
    subject: 'Vật lý'
  },
  '4': {
    id: '4',
    name: 'Phạm Thị D',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    online: false,
    role: 'tutor',
    subject: 'Hóa học'
  },
  '5': {
    id: '5',
    name: 'Hoàng Văn E',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    online: true,
    role: 'student',
    subject: 'Tiếng Anh'
  }
};

const mockMessages = {
  '1': [
    { id: '1', sender: 'other', text: 'Chào bạn, tôi muốn tìm hiểu về khóa học Toán.', time: '10:25' },
    { id: '2', sender: 'me', text: 'Xin chào! Rất vui được giúp đỡ bạn. Bạn đang tìm kiếm khóa học Toán cho cấp học nào vậy?', time: '10:27' },
    { id: '3', sender: 'other', text: 'Tôi đang tìm cho con trai tôi, cháu học lớp 10.', time: '10:28' },
    { id: '4', sender: 'me', text: 'Tôi có nhiều năm kinh nghiệm giảng dạy Toán cho học sinh lớp 10. Bạn quan tâm đến chương trình học nào, luyện thi hay học theo chương trình?', time: '10:30' }
  ],
  '2': [
    { id: '1', sender: 'other', text: 'Xin chào, tôi muốn đăng ký khóa học Tiếng Anh.', time: '09:10' },
    { id: '2', sender: 'me', text: 'Xin chào! Bạn quan tâm đến khóa học Tiếng Anh nào?', time: '09:12' },
    { id: '3', sender: 'other', text: 'Tôi muốn học IELTS để đạt 6.5.', time: '09:13' },
    { id: '4', sender: 'me', text: 'Khi nào bạn muốn bắt đầu buổi học?', time: '09:15' }
  ],
  '3': [
    { id: '1', sender: 'me', text: 'Bài tập Vật lý của bạn thế nào rồi?', time: '15:40' },
    { id: '2', sender: 'other', text: 'Em đã làm xong hầu hết, chỉ còn vài bài khó.', time: '15:45' },
    { id: '3', sender: 'me', text: 'Bạn gặp khó khăn ở phần nào?', time: '15:47' },
    { id: '4', sender: 'other', text: 'Phần dao động cơ học ạ. Em không hiểu cách giải bài 5.', time: '15:50' },
    { id: '5', sender: 'me', text: 'Tôi sẽ giải thích cho bạn trong buổi học tới.', time: '15:52' },
    { id: '6', sender: 'other', text: 'Cảm ơn thầy về buổi học hôm nay.', time: '18:30' }
  ],
  '4': [
    { id: '1', sender: 'other', text: 'Chào cô, em không hiểu phần hóa hữu cơ.', time: '14:20' },
    { id: '2', sender: 'me', text: 'Em cần giúp đỡ phần nào cụ thể?', time: '14:25' },
    { id: '3', sender: 'other', text: 'Phần phản ứng thế ạ.', time: '14:28' },
    { id: '4', sender: 'me', text: 'Tôi sẽ gửi bài tập vào tối nay để em luyện thêm.', time: '14:30' }
  ],
  '5': [
    { id: '1', sender: 'other', text: 'Xin chào, tôi đang tìm gia sư dạy Tiếng Anh', time: '18:15' },
    { id: '2', sender: 'me', text: 'Xin chào! Bạn cần học Tiếng Anh ở trình độ nào?', time: '18:20' }
  ]
};

interface MessagePanelProps {
  conversationId: string;
  onBack: () => void;
  isMobileView: boolean;
}

export default function MessagePanel({ conversationId, onBack, isMobileView }: MessagePanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load conversation data
    if (conversationId && mockMessages[conversationId]) {
      setMessages(mockMessages[conversationId]);
      setUser(mockUsers[conversationId]);
    }
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: String(messages.length + 1),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  if (!user) return null;

  return (
    <div className={styles.messagePanel}>
      <div className={styles.header}>
        {isMobileView && (
          <button className={styles.backButton} onClick={onBack}>
            <BsArrowLeft />
          </button>
        )}
        <div className={styles.headerInfo}>
          <div className={styles.avatarContainer}>
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className={styles.avatar}
            />
            {user.online && <span className={styles.onlineIndicator}></span>}
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userStatus}>
              {user.online ? 'Đang hoạt động' : 'Không hoạt động'}
              <span className={styles.dot}>•</span>
              {user.role === 'tutor' ? 'Gia sư' : 'Học viên'}
              {user.subject && (
                <>
                  <span className={styles.dot}>•</span>
                  {user.subject}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageItem} ${msg.sender === 'me' ? styles.sent : styles.received}`}
            >
              {msg.sender !== 'me' && (
                <div className={styles.messageAvatar}>
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                </div>
              )}
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{msg.text}</div>
                <div className={styles.messageTime}>{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <Form onSubmit={handleSendMessage} className={styles.messageForm}>
          <Button
            variant="light"
            className={styles.iconButton}
            type="button"
          >
            <BsEmojiSmile />
          </Button>
          <Button
            variant="light"
            className={styles.iconButton}
            type="button"
          >
            <BsPaperclip />
          </Button>
          <Form.Control
            type="text"
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageInput}
          />
          <Button
            variant="success"
            className={styles.sendButton}
            type="submit"
            disabled={!message.trim()}
          >
            <BsSend />
          </Button>
        </Form>
      </div>
    </div>
  );
}