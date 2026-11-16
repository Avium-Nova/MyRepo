/* ПР №12 */

// Задание 1: Базовые обработчики событий

function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    if (output) {
        output.textContent = `Событие: ${event.type} | Координаты: X=${event.clientX}, Y=${event.clientY} | Target: ${event.target.tagName}`;
    }
    const btn = event.currentTarget;
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
}

function handleMouseEvents(event) {
    const box = event.currentTarget;
    const mouseOutput = document.getElementById('mouse-output');

    if (event.type === 'mouseenter') {
        box.style.background = '#e74c3c';
    } else if (event.type === 'mouseleave') {
        box.style.background = '#3498db';
    } else if (event.type === 'mousemove' && mouseOutput) {
        mouseOutput.textContent = `Координаты мыши: X=${event.clientX}, Y=${event.clientY}`;
    }
}

function setupBasicEvents() {
    const btn = document.getElementById('basic-btn');
    const box = document.getElementById('color-box');

    if (btn) btn.addEventListener('click', handleBasicClick);
    if (box) {
        box.addEventListener('mouseenter', handleMouseEvents);
        box.addEventListener('mouseleave', handleMouseEvents);
        box.addEventListener('mousemove', handleMouseEvents);
    }
}

// Задание 2: События клавиатуры

function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    
    if (event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (output) output.textContent = 'Перехвачено: Ctrl + S';
        return;
    }
    if (event.altKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        if (output) output.textContent = 'Перехвачено: Alt + C';
        return;
    }
    if (event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        if (output) output.textContent = 'Перехвачено: Shift + A';
        return;
    }

    if (output) {
        output.textContent = `key: ${event.key} | code: ${event.code} | ctrl: ${event.ctrlKey} | alt: ${event.altKey} | shift: ${event.shiftKey}`;
    }
}

function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    if (!input) return;

    input.addEventListener('keydown', handleKeyEvents);
    input.addEventListener('keyup', (e) => {
        const output = document.getElementById('key-output');
        if (output) output.textContent += ` | Отпущена: ${e.key}`;
    });
}

// Задание 3: Делегирование событий

function handleDelegationClick(event) {
    const item = event.target.closest('.item');
    if (!item) return;

    if (event.target.classList.contains('delete')) {
        item.remove();
        updateDelegationOutput();
        return;
    }

    item.classList.toggle('selected');
    updateDelegationOutput();
}

function updateDelegationOutput() {
    const output = document.getElementById('delegation-output');
    if (!output) return;
    const count = document.querySelectorAll('#item-list .item.selected').length;
    output.textContent = `Выбрано элементов: ${count}`;
}

function addNewItem() {
    const list = document.getElementById('item-list');
    if (!list) return;

    const items = list.querySelectorAll('.item');
    const nextId = items.length ? Math.max(...Array.from(items, el => Number(el.dataset.id))) + 1 : 1;

    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.dataset.id = nextId;
    newItem.innerHTML = `Элемент ${nextId} <span class="delete">x</span>`;
    list.appendChild(newItem);
    updateDelegationOutput();
}

function setupDelegationEvents() {
    const list = document.getElementById('item-list');
    const addBtn = document.getElementById('add-item-btn');
    
    if (list) list.addEventListener('click', handleDelegationClick);
    if (addBtn) addBtn.addEventListener('click', addNewItem);
}

// Задание 4: Предотвращение поведения

function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    if (output) output.textContent = 'Переход по ссылке предотвращён!';

    const link = event.currentTarget;
    link.classList.add('shake');
    setTimeout(() => link.classList.remove('shake'), 300);
}

function preventFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('input');
    const output = document.getElementById('prevention-output');
    
    if (!output) return;
    
    if (!input.value.trim()) {
        output.textContent = 'Ошибка: поле ввода не должно быть пустым!';
        return;
    }
    
    output.textContent = `Форма перехвачена. Введено: "${input.value}"`;
    form.reset();
}

function setupPreventionEvents() {
    const link = document.getElementById('prevent-link');
    const form = document.getElementById('prevent-form');
    
    if (link) link.addEventListener('click', preventLinkDefault);
    if (form) form.addEventListener('submit', preventFormSubmit);
}

// Задание 5: Кастомные события

function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: { message: 'Привет от кастомного события!' }
    });
    document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    if (output) output.textContent = `Кастомные события: ${event.detail.message}`;

    const btn = document.getElementById('trigger-custom');
    if (btn) {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 500);
    }
}

function setupMultipleListeners() {
    const output = document.getElementById('custom-output');
    
    document.addEventListener('customAction', () => {
        if (output) output.textContent += ' | Слушатель 2';
    });
    document.addEventListener('customAction', () => {
        if (output) output.textContent += ' | Слушатель 3';
    });
    document.addEventListener('customAction', () => {
        if (output) output.textContent += ' | Слушатель 4';
    });
    
    if (output) output.textContent = 'Добавлены 3 обработчика. Нажмите "Запустить...".';
}

function setupCustomEvents() {
    const triggerBtn = document.getElementById('trigger-custom');
    const multipleBtn = document.getElementById('multiple-listeners');
    
    document.addEventListener('customAction', handleCustomEvent);
    if (triggerBtn) triggerBtn.addEventListener('click', triggerCustomEvent);
    if (multipleBtn) multipleBtn.addEventListener('click', setupMultipleListeners);
}

// Задание 6: События загрузки и ошибок

function loadImageWithEvents() {
    const container = document.querySelector('.image-container');
    const output = document.getElementById('loading-output');
    if (!container) return;

    container.innerHTML = ''; 
    const img = document.createElement('img');
    img.alt = 'Загружаемое изображение';

    img.addEventListener('loadstart', () => {
        container.className = 'image-container loading';
        if (output) output.textContent = 'Статус загрузки: Загрузка началась...';
    });
    img.addEventListener('load', () => {
        container.className = 'image-container success';
        if (output) output.textContent = 'Статус загрузки: Изображение успешно загружено!';
    });
    img.addEventListener('error', () => {
        container.className = 'image-container error';
        if (output) output.textContent = 'Статус загрузки: Ошибка загрузки!';
    });
    img.addEventListener('loadend', () => {
        if (output) output.textContent += ' (Процесс завершен)';
    });

    img.src = 'https://picsum.photos/300/200';
    container.appendChild(img);
}

function simulateLoadError() {
    const container = document.querySelector('.image-container');
    const output = document.getElementById('loading-output');
    if (!container) return;

    container.innerHTML = '';
    const img = document.createElement('img');
    img.alt = 'Ошибка';

    img.addEventListener('loadstart', () => {
        container.className = 'image-container loading';
        if (output) output.textContent = 'Статус загрузки: Попытка загрузки...';
    });
    img.addEventListener('error', () => {
        container.className = 'image-container error';
        if (output) output.textContent = 'Ошибка: Изображение не найдено (404)!';
    });
    img.addEventListener('loadend', () => {
        if (output) output.textContent += ' (Процесс завершен)';
    });

    img.src = 'https://picsum.photos/invalid-url-404.jpg';
    container.appendChild(img);
}

function setupLoadingEvents() {
    const loadBtn = document.getElementById('load-image');
    const errorBtn = document.getElementById('load-error');
    
    if (loadBtn) loadBtn.addEventListener('click', loadImageWithEvents);
    if (errorBtn) errorBtn.addEventListener('click', simulateLoadError);
}

// Задание 7: Таймеры и асинхронные события

let timerInterval;
let timerValue = 0;

function startTimer() {
    if (timerInterval) return; // Запрет множественного запуска
    const output = document.getElementById('timer-output');
    
    timerInterval = setInterval(() => {
        timerValue++;
        if (output) output.textContent = `Таймер: ${timerValue} сек.`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerValue = 0;
    const output = document.getElementById('timer-output');
    if (output) output.textContent = 'Таймер: 0';
}

function createDebounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createThrottle(func, interval) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= interval) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

function testDebounce() {
    const output = document.getElementById('async-output');
    if (!output) return;
    
    output.textContent = 'Debounce: 5 быстрых вызовов... ';
    
    const debouncedLog = createDebounce(() => {
        output.textContent += ' [Сработало 1 раз!]';
    }, 500);

    for (let i = 0; i < 5; i++) {
        debouncedLog();
    }
}

function testThrottle() {
    const output = document.getElementById('async-output');
    if (!output) return;
    
    output.textContent = 'Throttle: 10 быстрых кликов (интервал 300мс)... ';
    let count = 0;
    
    const throttledLog = createThrottle(() => {
        output.textContent += ` [Вызов ${++count}]`;
    }, 300);

    const interval = setInterval(() => {
        throttledLog();
    }, 50);

    setTimeout(() => clearInterval(interval), 1000);
}

function setupTimerEvents() {
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');
    const debounceBtn = document.getElementById('debounce-btn');
    const throttleBtn = document.getElementById('throttle-btn');
    
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (stopBtn) stopBtn.addEventListener('click', stopTimer);
    if (debounceBtn) debounceBtn.addEventListener('click', testDebounce);
    if (throttleBtn) throttleBtn.addEventListener('click', testThrottle);
}

// Инициализация

document.addEventListener('DOMContentLoaded', () => {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
});