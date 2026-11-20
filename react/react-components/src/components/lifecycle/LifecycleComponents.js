import React, { Component } from 'react';
import './LifecycleComponents.css';

// Задание 5: Методы жизненного цикла
// 5.1
class Timer extends Component {
  state = { seconds: 0, isRunning: false };
  intervalId = null;

  componentDidMount() {
    console.log('Timer смонтирован');
  }

  componentWillUnmount() {
    this.stopTimer();
    console.log('Timer будет удален');
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.intervalId = setInterval(() => {
        this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.setState({ isRunning: false });
    }
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ seconds: 0 });
  };

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Секундомер (Timer)</h4>
        <div className="counter">{this.state.seconds} сек.</div>
        <button onClick={this.startTimer} disabled={this.state.isRunning}>Старт</button>
        <button onClick={this.stopTimer} disabled={!this.state.isRunning}>Стоп</button>
        <button onClick={this.resetTimer}>Сброс</button>
      </div>
    );
  }
}

// 5.2
class WindowSizeTracker extends Component {
  state = { width: window.innerWidth, height: window.innerHeight };

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Размер окна (WindowSizeTracker)</h4>
        <p>Ширина: {this.state.width}px, Высота: {this.state.height}px</p>
      </div>
    );
  }
}

// 5.3
class DataFetcher extends Component {
  state = { data: null, loading: false, error: null };

  fetchData = () => {
    this.setState({ loading: true, error: null });
    fetch(this.props.url)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => this.setState({ data: data.slice(0, 3), loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  render() {
    const { data, loading, error } = this.state;
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>Загрузка данных (DataFetcher)</h4>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
        {data && (
          <ul>
            {data.map(item => <li key={item.id}>{item.name} ({item.email})</li>)}
          </ul>
        )}
      </div>
    );
  }
}

// Основной компонент раздела
class LifecycleComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Жизненный цикл компонентов</h2>
        <div className="component-demo">
          <h3>Задание 5: Методы жизненного цикла</h3>
          <div id="lifecycle-output" className="output">
            <Timer />
            <WindowSizeTracker />
            <DataFetcher url="https://jsonplaceholder.typicode.com/users" />
          </div>
        </div>
      </section>
    );
  }
}

export default LifecycleComponents;