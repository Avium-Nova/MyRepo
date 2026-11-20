import React, { useState } from 'react';
import './BasicComponents.css';

// Задание 1: Функциональный компонент с props
// 1.1
const WelcomeMessage = ({ name, age }) => {
  return <h3>Привет, {name}! Тебе {age} лет.</h3>;
};

// 1.2
const UserCard = ({ user }) => {
  const { name, email, avatar, isOnline } = user;
  return (
    <div className="user-card" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <img src={avatar} alt={name} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
      <div style={{ textAlign: 'left' }}>
        <h4>{name}</h4>
        <p>{email}</p>
        <span style={{ color: isOnline ? 'green' : 'red' }}>
          {isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
        </span>
      </div>
    </div>
  );
};

// 1.3
const Button = ({ variant = 'primary', size = 'medium', onClick, children }) => {
  const baseStyle = { padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px' };
  const variants = {
    primary: { backgroundColor: '#3498db', color: 'white' },
    secondary: { backgroundColor: '#95a5a6', color: 'white' }
  };
  const sizes = {
    small: { padding: '5px 10px', fontSize: '12px' },
    medium: { padding: '10px 20px', fontSize: '16px' },
    large: { padding: '15px 30px', fontSize: '20px' }
  };

  return (
    <button 
      style={{ ...baseStyle, ...variants[variant], ...sizes[size] }} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Задание 2: Работа с children и условный рендеринг
// 2.1
const Card = ({ title, children }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      <h4 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>{title}</h4>
      <div>{children}</div>
    </div>
  );
};

// 2.2
const Toggle = ({ buttonText, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>{buttonText}</button>
      {isVisible && <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0' }}>{children}</div>}
    </div>
  );
};

// 2.3
const ConditionalMessage = ({ status }) => {
  let styles = { padding: '10px', borderRadius: '5px', margin: '10px 0' };
  let message = '';

  switch (status) {
    case 'success':
      styles.backgroundColor = '#d4edda';
      styles.color = '#155724';
      message = '✅ Успешно выполнено!';
      break;
    case 'error':
      styles.backgroundColor = '#f8d7da';
      styles.color = '#721c24';
      message = '❌ Произошла ошибка!';
      break;
    case 'warning':
      styles.backgroundColor = '#fff3cd';
      styles.color = '#856404';
      message = '⚠️ Внимание!';
      break;
    default:
      message = 'Неизвестный статус';
  }

  return <div style={styles}>{message}</div>;
};


// Основной компонент раздела
function BasicComponents() {
  const userData = {
    name: "Анна Иванова",
    email: "anna@example.com",
    avatar: "https://i.pravatar.cc/100",
    isOnline: true,
  };

  return (
    <section className="task-section">
      <h2>Базовые компоненты</h2>
      <div className="component-demo">
        <h3>Задание 1: Компоненты с props</h3>
        <div id="basic-output-1" className="output">
          <WelcomeMessage name="Иван" age={25} />
          <UserCard user={userData} />
          <Button variant="primary" onClick={() => alert('Клик!')}>Нажми меня (Primary)</Button>
          <Button variant="secondary" size="small">Маленькая кнопка</Button>
        </div>
      </div>

      <div className="component-demo">
        <h3>Задание 2: Children и условный рендеринг</h3>
        <div id="basic-output-2" className="output">
          <Card title="Пример карточки">
            <p>Это содержимое карточки, переданное через children.</p>
          </Card>

          <Toggle buttonText="Показать/скрыть">
            <p>Секретный контент! 🕵️‍♂️</p>
          </Toggle>

          <ConditionalMessage status="success" />
          <ConditionalMessage status="error" />
          <ConditionalMessage status="warning" />
        </div>
      </div>
    </section>
  );
}

export default BasicComponents;