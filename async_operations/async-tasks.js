// Задание 1: Основы промисов

// 1.1. Функция createBasicPromise
function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Успех!");
            } else {
                reject(new Error("Ошибка!"));
            }
        }, 1000);
    });
}

// 1.2. Функция handleBasicPromise
function handleBasicPromise() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Результат промисов: Загрузка...';
    
    createBasicPromise(true)
        .then((result) => {
            output.textContent = `Результат промисов: ${result}`;
        })
        .catch((error) => {
            output.textContent = `Результат промисов: Ошибка - ${error.message}`;
        });
}

// 1.3. Функция createPromiseChain
function createPromiseChain() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Результат промисов: Начало цепочки...';
    
    const delay = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

    delay(500, "Шаг 1")
        .then((res1) => {
            output.textContent += `\n${res1} выполнен`;
            return delay(500, `${res1} -> Шаг 2`);
        })
        .then((res2) => {
            output.textContent += `\n${res2} выполнен`;
            return delay(500, `${res2} -> Шаг 3`);
        })
        .then((res3) => {
            output.textContent += `\n${res3} выполнен. Цепочка завершена!`;
        })
        .catch(err => {
            output.textContent += `\nОшибка в цепочке: ${err.message}`;
        });
}

// 1.4. Функция handlePromiseError
function handlePromiseError() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Результат промисов: Загрузка...';
    
    createBasicPromise(false)
        .then((result) => {
            output.textContent = `Результат промисов: ${result}`;
        })
        .catch((error) => {
            output.textContent = `Результат промисов: Перехвачена ошибка - ${error.message}`;
        });
}

// 1.5. Функция setupPromiseEvents
function setupPromiseEvents() {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
}

// Задание 2: Async/Await

// 2.1. Функция basicAsyncAwait
async function basicAsyncAwait() {
    const output = document.getElementById('async-output');
    output.textContent = 'Результат async/await: Загрузка...';
    
    try {
        const result = await createBasicPromise(true);
        // Добавьте задержку перед выводом (например, 0.5 сек)
        await new Promise(resolve => setTimeout(resolve, 500));
        output.textContent = `Результат async/await: ${result}`;
    } catch (error) {
        output.textContent = `Результат async/await: Ошибка - ${error.message}`;
    }
}

// 2.2. Функция handleAsyncError с try/catch
async function handleAsyncError() {
    const output = document.getElementById('async-output');
    output.textContent = 'Результат async/await: Загрузка...';
    
    try {
        const result = await createBasicPromise(false);
        output.textContent = `Результат async/await: ${result}`;
    } catch (error) {
        output.textContent = `Результат async/await: Ошибка (try/catch) - ${error.message}`;
    }
}

// 2.3. Функция parallelAsyncExecution для параллельного выполнения
async function parallelAsyncExecution() {
    const output = document.getElementById('async-output');
    output.textContent = 'Результат async/await: Запуск параллельных задач...';
    
    const startTime = performance.now();
    
    // Запуск 3 промисов параллельно (с разной задержкой для наглядности)
    const p1 = new Promise(resolve => setTimeout(() => resolve("Задача 1"), 1000));
    const p2 = new Promise(resolve => setTimeout(() => resolve("Задача 2"), 1500));
    const p3 = new Promise(resolve => setTimeout(() => resolve("Задача 3"), 2000));

    try {
        const results = await Promise.all([p1, p2, p3]);
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        output.textContent = `Результат async/await: ${results.join(', ')}. Общее время: ${duration} сек.`;
    } catch (error) {
        output.textContent = `Результат async/await: Ошибка - ${error.message}`;
    }
}

// 2.4. Функция setupAsyncEvents
function setupAsyncEvents() {
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
}

// Задание 3: Работа с внешними API

// 3.1. Функция fetchUsers
async function fetchUsers() {
    const output = document.getElementById('api-output');
    const dataContainer = document.getElementById('api-data');
    
    output.textContent = 'Данные API: Загрузка пользователей...';
    dataContainer.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const users = await response.json();
        output.textContent = `Данные API: Загружено ${users.length} пользователей.`;
        
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h4>${user.name}</h4>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            `;
            dataContainer.appendChild(card);
        });
    } catch (error) {
        output.textContent = `Данные API: Ошибка - ${error.message}`;
    }
}

// 3.2. Функция createPost
async function createPost() {
    const output = document.getElementById('api-output');
    output.textContent = 'Данные API: Отправка поста...';

    const postData = {
        title: 'Новый пост',
        body: 'Это тестовое тело поста.',
        userId: 1
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        output.textContent = `Данные API: Пост успешно создан! ID: ${result.id}, Title: ${result.title}`;
    } catch (error) {
        output.textContent = `Данные API: Ошибка - ${error.message}`;
    }
}

// 3.3. Функция testApiError
async function testApiError() {
    const output = document.getElementById('api-output');
    output.textContent = 'Данные API: Тестирование ошибки...';

    try {
        // Запрос к несуществующему URL
        const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent-endpoint');
        
        if (!response.ok) {
            // Обработка HTTP ошибок (404, 500 и т.д.)
            throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        output.textContent = `Данные API: ${JSON.stringify(data)}`;
    } catch (error) {
        // Обработка сетевых ошибок и ошибок, брошенных вручную
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            output.textContent = 'Данные API: Ошибка сети (проверьте подключение к интернету).';
        } else {
            output.textContent = `Данные API: Перехвачена ошибка - ${error.message}`;
        }
    }
}

// 3.4. Функция setupApiEvents
function setupApiEvents() {
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
}

// Задание 4: Асинхронные таймеры

// 4.1. Функция startAsyncInterval
let intervalId;
let intervalCount = 0;

async function startAsyncInterval() {
    const output = document.getElementById('interval-output');
    if (intervalId) return; // Защита от двойного запуска

    intervalCount = 0;
    output.textContent = 'Интервал: 0';

    intervalId = setInterval(async () => {
        // Используем async функцию внутри интервала
        await new Promise(resolve => setTimeout(resolve, 10)); // Имитация асинхронной работы
        intervalCount++;
        output.textContent = `Интервал: ${intervalCount}`;
    }, 1000);
}

// 4.2. Функция stopAsyncInterval
function stopAsyncInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    intervalCount = 0;
    document.getElementById('interval-output').textContent = 'Интервал: 0 (Остановлен)';
}

// 4.3. Функция delayWithPromise
function delayWithPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 4.4. Функция testDelay
async function testDelay() {
    const output = document.getElementById('timer-output');
    output.textContent = 'Таймер: Начало последовательности...';

    try {
        await delayWithPromise(1000);
        output.textContent = 'Таймер: Прошла 1 секунда...';
        
        await delayWithPromise(1000);
        output.textContent = 'Таймер: Прошло 2 секунды...';
        
        await delayWithPromise(1000);
        output.textContent = 'Таймер: Последовательность завершена (3 сек)!';
    } catch (error) {
        output.textContent = `Таймер: Ошибка - ${error.message}`;
    }
}

// 4.5. Функция setupTimerEvents
function setupTimerEvents() {
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
}

// Задание 5: Обработка ошибок

// 5.1. Функция asyncTryCatch
async function asyncTryCatch() {
    const output = document.getElementById('error-output');
    output.textContent = 'Статус ошибок: Начало...';
    output.className = 'output';

    try {
        output.textContent += '\nПопытка 1: Запуск...';
        await createBasicPromise(false); // Эта операция вызовет ошибку
    } catch (error) {
        output.textContent += `\nВнешний catch: ${error.message}`;
        
        try {
            output.textContent += '\nВнутренняя попытка 2: Запуск...';
            // Симулируем другую ошибку
            throw new Error("Внутренняя ошибка");
        } catch (innerError) {
            output.textContent += `\nВнутренний catch: ${innerError.message}`;
            output.className = 'output error'; // Добавляем класс для красного фона
        }
    }
}

// 5.2. Функция handleMultipleErrors
async function handleMultipleErrors() {
    const output = document.getElementById('error-output');
    output.textContent = 'Статус ошибок: Запуск множественных операций...';
    
    const promises = [
        createBasicPromise(true),  // Успех
        createBasicPromise(false), // Ошибка
        new Promise((_, reject) => setTimeout(() => reject(new Error("Таймаут")), 500)) // Еще одна ошибка
    ];

    const results = await Promise.allSettled(promises);
    
    let successCount = 0;
    let errorCount = 0;
    let log = 'Статус ошибок:\n';

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successCount++;
            log += `Операция ${index + 1}: Успех (${result.value})\n`;
        } else {
            errorCount++;
            log += `Операция ${index + 1}: Ошибка (${result.reason.message})\n`;
        }
    });

    log += `\nИтого: Успешно - ${successCount}, Ошибок - ${errorCount}`;
    output.textContent = log;
    output.className = 'output warning';
}

// 5.3. Функция retryWithBackoff
async function retryWithBackoff(operation, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                throw new Error(`Не удалось выполнить после ${maxRetries} попыток. Последняя ошибка: ${error.message}`);
            }
            // Экспоненциальная задержка: 1s, 2s, 4s...
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`Попытка ${attempt} не удалась. Повтор через ${delay}мс...`);
            await delayWithPromise(delay);
        }
    }
}

// 5.4. Функция setupErrorEvents
function setupErrorEvents() {
    document.getElementById('try-catch').addEventListener('click', asyncTryCatch);
    document.getElementById('multiple-errors').addEventListener('click', handleMultipleErrors);
    
    document.getElementById('retry-pattern').addEventListener('click', async () => {
        const output = document.getElementById('error-output');
        output.textContent = 'Статус ошибок: Тестирование повторных попыток...';
        
        let counter = 0;
        // Операция, которая падает первые 2 раза и succeeds с 3-го
        const unstableOperation = async () => {
            counter++;
            if (counter < 3) throw new Error(`Сбой №${counter}`);
            return "Успех после повторных попыток!";
        };

        try {
            const result = await retryWithBackoff(unstableOperation, 3);
            output.textContent = `Статус ошибок: ${result}`;
            output.className = 'output success';
        } catch (error) {
            output.textContent = `Статус ошибок: ${error.message}`;
            output.className = 'output error';
        }
    });
}

// Задание 6: Параллельные операции

// 6.1. Функция demonstratePromiseAll
async function demonstratePromiseAll() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Параллельные операции: Запуск Promise.all...';
    
    const startTime = performance.now();
    const promises = [
        delayWithPromise(1000).then(() => "Задача A (1s)"),
        delayWithPromise(2000).then(() => "Задача B (2s)"),
        delayWithPromise(1500).then(() => "Задача C (1.5s)"),
        delayWithPromise(500).then(() => "Задача D (0.5s)"),
        delayWithPromise(2500).then(() => "Задача E (2.5s)")
    ];

    try {
        const results = await Promise.all(promises);
        const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        output.textContent = `Параллельные операции (Promise.all):\n${results.join('\n')}\nОбщее время: ${duration} сек.`;
    } catch (error) {
        output.textContent = `Параллельные операции: Ошибка - ${error.message}`;
    }
}

// 6.2. Функция demonstratePromiseRace
async function demonstratePromiseRace() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Параллельные операции: Запуск Promise.race...';
    
    const startTime = performance.now();
    const promises = [
        delayWithPromise(1000).then(() => "Медленная задача (1s)"),
        delayWithPromise(2000).then(() => "Очень медленная задача (2s)"),
        delayWithPromise(300).then(() => "Быстрая задача (0.3s)")
    ];

    try {
        const result = await Promise.race(promises);
        const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        output.textContent = `Параллельные операции (Promise.race):\nПобедитель: ${result}\nВремя: ${duration} сек.`;
    } catch (error) {
        output.textContent = `Параллельные операции: Ошибка - ${error.message}`;
    }
}

// 6.3. Функция demonstratePromiseAllSettled
async function demonstratePromiseAllSettled() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Параллельные операции: Запуск Promise.allSettled...';
    
    const promises = [
        delayWithPromise(1000).then(() => "Успешная 1"),
        createBasicPromise(false), // Ошибка
        delayWithPromise(500).then(() => "Успешная 2")
    ];

    try {
        const results = await Promise.allSettled(promises);
        let log = 'Параллельные операции (Promise.allSettled):\n';
        
        results.forEach((res, i) => {
            if (res.status === 'fulfilled') {
                log += `[${i+1}] Fulfilled: ${res.value}\n`;
            } else {
                log += `[${i+1}] Rejected: ${res.reason.message}\n`;
            }
        });
        output.textContent = log;
    } catch (error) {
        output.textContent = `Параллельные операции: Ошибка - ${error.message}`;
    }
}

// 6.4. Функция setupParallelEvents
function setupParallelEvents() {
    document.getElementById('promise-all').addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race').addEventListener('click', demonstratePromiseRace);
    document.getElementById('promise-allSettled').addEventListener('click', demonstratePromiseAllSettled);
}

// Задание 7: Реальные сценарии

// 7.1. Функция sequentialApiRequests
async function sequentialApiRequests() {
    const output = document.getElementById('scenario-output');
    output.textContent = 'Реальные сценарии: Начало последовательных запросов...';

    try {
        // 1. Получить пользователя (id=1)
        output.textContent += '\n1. Загрузка пользователя...';
        const userRes = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!userRes.ok) throw new Error('Ошибка загрузки пользователя');
        const user = await userRes.json();
        output.textContent += ` Готово (${user.name})`;

        // 2. Получить посты пользователя
        output.textContent += '\n2. Загрузка постов пользователя...';
        const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        if (!postsRes.ok) throw new Error('Ошибка загрузки постов');
        const posts = await postsRes.json();
        output.textContent += ` Готово (${posts.length} постов)`;

        // 3. Получить комментарии к первому посту
        if (posts.length > 0) {
            output.textContent += '\n3. Загрузка комментариев к первому посту...';
            const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}/comments`);
            if (!commentsRes.ok) throw new Error('Ошибка загрузки комментариев');
            const comments = await commentsRes.json();
            output.textContent += ` Готово (${comments.length} комментариев)`;
        }

        output.textContent += '\n\nВсе последовательные запросы выполнены успешно!';
        output.className = 'output success';

    } catch (error) {
        output.textContent += `\nОшибка: ${error.message}`;
        output.className = 'output error';
    }
}

// 7.2. Функция simulateFileUpload
async function simulateFileUpload() {
    const output = document.getElementById('scenario-output');
    const progressBar = document.getElementById('progress-fill');
    
    output.textContent = 'Реальные сценарии: Симуляция загрузки файла...';
    output.className = 'output';
    progressBar.style.width = '0%';

    // Функция, возвращающая промис для имитации шага загрузки
    const uploadStep = (percent) => new Promise(resolve => {
        setTimeout(() => {
            progressBar.style.width = `${percent}%`;
            output.textContent = `Реальные сценарии: Загрузка... ${percent}%`;
            resolve();
        }, 100);
    });

    try {
        for (let i = 10; i <= 100; i += 10) {
            await uploadStep(i);
        }
        output.textContent = 'Реальные сценарии: Файл успешно загружен!';
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Реальные сценарии: Ошибка загрузки - ${error.message}`;
        output.className = 'output error';
    }
}

// 7.3. Функция createRequestCache
function createRequestCache() {
    const cache = new Map();
    
    return async function cachedRequest(url) {
        if (cache.has(url)) {
            console.log(`[Cache] Возврат из кэша для: ${url}`);
            return cache.get(url);
        }

        console.log(`[Network] Запрос к: ${url}`);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            
            cache.set(url, data);
            return data;
        } catch (error) {
            throw error;
        }
    };
}

// 7.4. Функция setupRealScenarioEvents
function setupRealScenarioEvents() {
    document.getElementById('sequential-requests').addEventListener('click', sequentialApiRequests);
    document.getElementById('upload-simulation').addEventListener('click', simulateFileUpload);
    
    // Инициализация кэша для кнопки
    const cachedFetch = createRequestCache();
    
    document.getElementById('cache-requests').addEventListener('click', async () => {
        const output = document.getElementById('scenario-output');
        output.textContent = 'Реальные сценарии: Тестирование кэширования (см. консоль)...';
        const url = 'https://jsonplaceholder.typicode.com/todos/1';

        try {
            // Первый запрос - идет в сеть
            await cachedFetch(url);
            output.textContent += '\n1-й запрос выполнен (сеть)';
            
            // Второй запрос - должен взяться из кэша
            await cachedFetch(url);
            output.textContent += '\n2-й запрос выполнен (кэш)';
            output.className = 'output success';
        } catch (error) {
            output.textContent += `\nОшибка: ${error.message}`;
            output.className = 'output error';
        }
    });
}

// Инициализация

document.addEventListener('DOMContentLoaded', () => {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
    setupErrorEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
    
    console.log('Все обработчики событий успешно назначены.');
});