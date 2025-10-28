import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaPlus, FaSignOutAlt, FaComment } from 'react-icons/fa';

const Sidebar = forwardRef(({ sidebarOpen, chats, activeChatId, onNewChat, onSelectChat }, ref) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div ref={ref} className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button onClick={onNewChat} className="new-chat-btn">
          <FaPlus /> {sidebarOpen && <span>New Chat</span>}
        </button>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-list-item ${chat.id === activeChatId ? 'active' : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            <FaComment /> {sidebarOpen && <span>{chat.messages.length > 0 ? chat.messages[0].text.substring(0, 15) + '...' : 'New Chat'}</span>}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
});

export default Sidebar;