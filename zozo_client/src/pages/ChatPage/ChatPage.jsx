import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css'; // We'll extract the CSS into a separate file

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Sarah Johnson', content: 'Hey there! How are you?', time: '10:30 AM', isSent: false },
    { sender: 'You', content: "I'm doing great! Just finished that project we talked about.", time: '10:32 AM', isSent: true },
    { sender: 'Sarah Johnson', content: "That's awesome! Can you share the details with me?", time: '10:33 AM', isSent: false },
    { sender: 'You', content: "Sure, I'll email you the files later today.", time: '10:35 AM', isSent: true },
  ]);
  const [chats, setChats] = useState([
    {
      id: 0,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      preview: 'Hey, how are you doing?',
      isActive: true
    },
    {
      id: 1,
      name: 'Mike Peterson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      preview: 'About our meeting tomorrow...',
      isActive: false
    },
    {
      id: 2,
      name: 'ZOZO Support',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      preview: 'Your order has been shipped!',
      isActive: false
    }
  ]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [showChat, setShowChat] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setChats(chats.map(chat => ({
      ...chat,
      isActive: chat.id === chatId
    })));
    if (isMobileView) {
      setShowChat(true);
    }
  };

  const handleBackClick = () => {
    setShowChat(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: 'You',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const activeChatData = chats.find(chat => chat.id === activeChat);

  return (
    <div className="chat-container">
      {/* Sidebar with chat list */}
      <div className={`chat-sidebar ${isMobileView && showChat ? 'hidden' : ''}`}>
        <div className="chat-header">ZOZO Chat</div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search chats..." 
          />
        </div>
        <ul className="chat-list">
          {chats.map(chat => (
            <li 
              key={chat.id}
              className={`chat-item ${chat.isActive ? 'active' : ''}`}
              onClick={() => handleChatSelect(chat.id)}
            >
              <img src={chat.avatar} alt="Profile" className="chat-avatar" />
              <div className="chat-info">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-preview">{chat.preview}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main chat area */}
      <div className={`chat-main ${isMobileView && !showChat ? 'hidden' : ''}`}>
        {activeChatData && (
          <>
            <div className="chat-topbar">
              {isMobileView && (
                <button className="back-button" onClick={handleBackClick}>
                  ←
                </button>
              )}
              <img 
                src={activeChatData.avatar} 
                alt="Profile" 
                className="chat-topbar-avatar" 
              />
              <div className="chat-topbar-name">{activeChatData.name}</div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.isSent ? 'sent' : 'received'}`}
                >
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="send-button" onClick={handleSendMessage}>
                →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;