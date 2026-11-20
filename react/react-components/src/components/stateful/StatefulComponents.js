import React, { Component } from 'react';
import './StatefulComponents.css';

// Задание 3: Классовые компоненты с состоянием
// 3.1
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialValue || 0 };
  }

  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Счетчик (Классовый)</h4>
        <div className="counter">{this.state.count}</div>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

// 3.2
class LoginForm extends Component {
  state = { email: '', password: '', error: '' };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email.includes('@')) {
      this.setState({ error: 'Некорректный email' });
    } else if (password.length < 6) {
      this.setState({ error: 'Пароль должен быть не менее 6 символов' });
    } else {
      this.setState({ error: '', email: '', password: '' });
      alert('Успешный вход!');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h4>Вход (LoginForm)</h4>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
        <input type="password" name="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} />
        <button type="submit">Войти</button>
      </form>
    );
  }
}

// 3.3
class ColorPicker extends Component {
  state = { selectedColor: '' };

  render() {
    const { colors } = this.props;
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Выбор цвета (ColorPicker)</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          {colors.map(color => (
            <button 
              key={color} 
              style={{ backgroundColor: color, width: '40px', height: '40px', border: this.state.selectedColor === color ? '3px solid black' : 'none', cursor: 'pointer', padding: 0 }} 
              onClick={() => this.setState({ selectedColor: color })}
            />
          ))}
        </div>
        {this.state.selectedColor && <p>Выбран цвет: <span style={{ color: this.state.selectedColor }}>{this.state.selectedColor}</span></p>}
      </div>
    );
  }
}

// Задание 4: Обработка событий и формы
// 4.1
class TodoList extends Component {
  state = { todos: [], inputValue: '' };

  addTodo = () => {
    if (this.state.inputValue.trim()) {
      this.setState({
        todos: [...this.state.todos, { text: this.state.inputValue, completed: false }],
        inputValue: ''
      });
    }
  };

  toggleTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos[index].completed = !newTodos[index].completed;
    this.setState({ todos: newTodos });
  };

  removeTodo = (index) => {
    const newTodos = this.state.todos.filter((_, i) => i !== index);
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Список задач (TodoList)</h4>
        <input 
          value={this.state.inputValue} 
          onChange={(e) => this.setState({ inputValue: e.target.value })} 
          placeholder="Новая задача..." 
        />
        <button onClick={this.addTodo}>Добавить</button>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              <button onClick={() => this.toggleTodo(index)}>✔</button>
              <button onClick={() => this.removeTodo(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// 4.2
class SearchBox extends Component {
  state = { query: '' };

  render() {
    const { items } = this.props;
    const filteredItems = items.filter(item => 
      item.toLowerCase().includes(this.state.query.toLowerCase())
    );

    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Поиск (SearchBox)</h4>
        <input 
          value={this.state.query} 
          onChange={(e) => this.setState({ query: e.target.value })} 
          placeholder="Поиск..." 
        />
        {this.state.query && (
          <button onClick={() => this.setState({ query: '' })}>Очистить</button>
        )}
        <ul>
          {filteredItems.length > 0 ? filteredItems.map((item, i) => <li key={i}>{item}</li>) : <li>Ничего не найдено</li>}
        </ul>
      </div>
    );
  }
}

// Основной компонент раздела
class StatefulComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Компоненты с состоянием</h2>
        <div className="component-demo">
          <h3>Задание 3: Классовые компоненты</h3>
          <div id="stateful-output-1" className="output">
            <Counter initialValue={0} />
            <LoginForm />
            <ColorPicker colors={['#ff0000', '#00ff00', '#0000ff']} />
          </div>
        </div>

        <div className="component-demo">
          <h3>Задание 4: Обработка событий</h3>
          <div id="stateful-output-2" className="output">
            <TodoList />
            <SearchBox items={['React', 'JavaScript', 'HTML', 'CSS']} />
          </div>
        </div>
      </section>
    );
  }
}

export default StatefulComponents;