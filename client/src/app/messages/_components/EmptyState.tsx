'use client';
import React from 'react';
import { BsChatDots } from 'react-icons/bs';
import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <BsChatDots size={48} />
        </div>
        <h2 className={styles.title}>Tin nhắn của bạn</h2>
        <p className={styles.description}>
          Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin
        </p>
      </div>
    </div>
  );
}