import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import Sidebar from "./components/Sidebar";
import setAuthToken from "./utils/setAuthToken";
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const UserAvatar = () => <div className="avatar" style={{ backgroundColor: '#007bff' }} />;
const AIAvatar = () => <div className="avatar" style={{ backgroundColor: '#4caf50' }} />;

function App() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const chatWindowRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      axios.get('/api/me').then(res => {
        setUser(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (chats.length === 0 && user) {
      handleNewChat();
    }
  }, [chats.length, user]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chats, typing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && sidebarOpen && 
          sidebarRef.current && !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    document.body.className = darkTheme ? 'dark-theme' : 'light-theme';
  }, [darkTheme]);

  const handleNewChat = () => {
    const newChat = { id: Date.now(), messages: [] };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeChatId) return;

    const newMessage = { sender: "user", text: input };
    const updatedChats = chats.map(chat =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );
    setChats(updatedChats);
    setInput("");
    setTyping(true);

    try {
      const response = await axios.post("/api/review", {
        code: input,
      });
      const aiMessage = { sender: "ai", text: response.data.review || response.data };
      const finalChats = updatedChats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      );
      setChats(finalChats);
    } catch (err) {
      const errorMessage = {
        sender: "ai",
        text: "⚠️ Error fetching review. Check the console for details.",
      };
      const errorChats = updatedChats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
      );
      setChats(errorChats);
      console.error("❌ Failed to fetch review from server:", err.message);
    } finally {
      setTyping(false);
    }
  };

  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''} ${darkTheme ? 'dark' : 'light'}`}>
        <Sidebar ref={sidebarRef} sidebarOpen={sidebarOpen} chats={chats} activeChatId={activeChatId} onNewChat={handleNewChat} onSelectChat={handleSelectChat} />
        {sidebarOpen && window.innerWidth <= 768 && <div className="backdrop" onClick={() => setSidebarOpen(false)}></div>}
        <div className="chat-container">
            <header className="app-header">
                <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
                <h1>CodeAstra</h1>
                <button className="theme-toggle" onClick={() => setDarkTheme(!darkTheme)}>
                    {darkTheme ? <FaSun /> : <FaMoon />}
                </button>
            </header>
            <div className="chat-window" ref={chatWindowRef}>
                {activeChat && activeChat.messages.length === 0 && user && (
                    <div className="welcome-message">
                        <h2>Welcome, {user.username}!</h2>
                    </div>
                )}
                {activeChat && activeChat.messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                    {msg.sender === 'ai' ? <AIAvatar /> : <UserAvatar />}
                    <div className="text-content">
                        <Markdown rehypePlugins={[rehypeHighlight]}>{msg.text}</Markdown>
                    </div>
                </div>
                ))}
                {typing && (
                <div className="message ai">
                    <AIAvatar />
                    <div className="text-content">
                    <i>Analyzing...</i>
                    </div>
                </div>
                )}
            </div>
            <div className="input-area">
                <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your code here..."
                rows="1"
                />
                <button onClick={sendMessage}>&#10148;</button>
            </div>
        </div>
    </div>
  );
}

export default App;