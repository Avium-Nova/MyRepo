import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';

// Задание 6: Хуки useState и useEffect
// 6.1
const CounterWithHooks = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>Счетчик (Hooks)</h4>
      <div className="counter">{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};

// 6.2
const UserProfile = () => {
  const [profile, setProfile] = useState({ name: 'Иван', age: 25 });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>Профиль (UserProfile)</h4>
      {isEditing ? (
        <div>
          <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Имя" />
          <input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: parseInt(e.target.value) })} placeholder="Возраст" />
          <button onClick={() => setIsEditing(false)}>Сохранить</button>
        </div>
      ) : (
        <div>
          <p>Имя: {profile.name}, Возраст: {profile.age}</p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </div>
      )}
    </div>
  );
};

// 6.3
const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Выполняется после каждого рендера
  useEffect(() => {
    console.log('EffectDemo: Компонент отрендерен (без массива зависимостей)');
  });

  // Выполняется только при монтировании
  useEffect(() => {
    console.log('EffectDemo: Компонент смонтирован (пустой массив)');
    return () => console.log('EffectDemo: Компонент размонтирован');
  }, []);

  // Выполняется при изменении count
  useEffect(() => {
    console.log(`EffectDemo: count изменился на ${count}`);
  }, [count]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>Демонстрация useEffect (откройте консоль)</h4>
      <button onClick={() => setCount(count + 1)}>Изменить count ({count})</button>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Изменить текст" />
    </div>
  );
};

// Задание 7: Кастомные хуки и useContext
// 7.1
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// 7.2
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
};

// 7.3
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ 
        background: theme === 'light' ? '#fff' : '#333', 
        color: theme === 'light' ? '#000' : '#fff',
        padding: '20px',
        borderRadius: '8px',
        transition: 'all 0.3s'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h4>Переключатель темы (Context + localStorage)</h4>
      <p>Текущая тема: <strong>{theme === 'light' ? 'Светлая ☀️' : 'Темная 🌙'}</strong></p>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
};

const HooksUserList = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  if (loading) return <p>Загрузка пользователей...</p>;
  if (error) return <p style={{color: 'red'}}>Ошибка: {error}</p>;
  return (
    <div style={{ marginTop: '10px' }}>
      <h5>Пользователи (useFetch):</h5>
      <ul>{data.slice(0, 3).map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
};

// Основной компонент раздела
function HooksComponents() {
  return (
    <section className="task-section">
      <h2>React Hooks</h2>
      <div className="component-demo">
        <h3>Задание 6: useState и useEffect</h3>
        <div id="hooks-output-1" className="output">
          <CounterWithHooks />
          <UserProfile />
          <EffectDemo />
        </div>
      </div>
      <div className="component-demo">
        <h3>Задание 7: Кастомные хуки и Context</h3>
        <div id="hooks-output-2" className="output">
          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
          <div style={{ marginTop: '20px' }}>
            <HooksUserList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HooksComponents;