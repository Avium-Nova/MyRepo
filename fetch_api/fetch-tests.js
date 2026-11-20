// === FETCH API - ТЕСТЫ ===

const TEST_API_URL = 'https://jsonplaceholder.typicode.com';

// Вспомогательная функция для вывода результатов теста
function logTestResult(testName, isSuccess, message = '') {
    const container = document.createElement('div');
    container.className = `test-result ${isSuccess ? 'test-success' : 'test-failure'}`;
    
    const statusText = isSuccess ? '✅ УСПЕХ' : '❌ ОШИБКА';
    container.innerHTML = `
        <strong>${statusText}:</strong> ${testName}
        ${message ? `<br><small>${message}</small>` : ''}
    `;
    
    const footer = document.getElementById('main-footer');
    if (footer) {
        footer.parentNode.insertBefore(container, footer);
    } else {
        document.body.appendChild(container);
    }
    
    if (isSuccess) {
        console.log(`%c✅ ${testName}`, 'color: #27ae60; font-weight: bold;', message);
    } else {
        console.error(`❌ ${testName}`, message);
    }
}

// --- НАБОР ТЕСТОВ ---

async function runTests() {
    console.log('🚀 Запуск тестов Fetch API (все 7 заданий)...');

    // Задание 1: Базовые GET запросы
    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`);
        const data = await response.json();
        if (response.ok && data.id === 1) {
            logTestResult('[Задание 1] GET /posts/1', true, `Статус: ${response.status}, ID: ${data.id}`);
        } else {
            logTestResult('[Задание 1] GET /posts/1', false, `Неверные данные: ${response.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 1] GET /posts/1', false, error.message);
    }

    try {
        const response = await fetch(`${TEST_API_URL}/users`);
        const users = await response.json();
        if (response.ok && Array.isArray(users) && users.length > 0) {
            logTestResult('[Задание 1] GET /users', true, `Получено пользователей: ${users.length}`);
        } else {
            logTestResult('[Задание 1] GET /users', false, 'Данные пусты или не массив');
        }
    } catch (error) {
        logTestResult('[Задание 1] GET /users', false, error.message);
    }

    // Задание 2: POST, PUT, DELETE
    try {
        const response = await fetch(`${TEST_API_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Test', body: 'Test body', userId: 1 })
        });
        const data = await response.json();
        if (response.status === 201 && data.id) {
            logTestResult('[Задание 2] POST /posts', true, `Создан пост ID: ${data.id}`);
        } else {
            logTestResult('[Задание 2] POST /posts', false, `Статус: ${response.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 2] POST /posts', false, error.message);
    }

    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, title: 'Updated', body: 'Updated body', userId: 1 })
        });
        const data = await response.json();
        if (response.ok && data.title === 'Updated') {
            logTestResult('[Задание 2] PUT /posts/1', true, `Заголовок: ${data.title}`);
        } else {
            logTestResult('[Задание 2] PUT /posts/1', false, 'Данные не обновились');
        }
    } catch (error) {
        logTestResult('[Задание 2] PUT /posts/1', false, error.message);
    }

    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Patched' })
        });
        const data = await response.json();
        if (response.ok && data.title === 'Patched') {
            logTestResult('[Задание 2] PATCH /posts/1', true, `Заголовок: ${data.title}`);
        } else {
            logTestResult('[Задание 2] PATCH /posts/1', false, 'Данные не обновились');
        }
    } catch (error) {
        logTestResult('[Задание 2] PATCH /posts/1', false, error.message);
    }

    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`, { method: 'DELETE' });
        if (response.ok) {
            logTestResult('[Задание 2] DELETE /posts/1', true, `Статус: ${response.status}`);
        } else {
            logTestResult('[Задание 2] DELETE /posts/1', false, `Статус: ${response.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 2] DELETE /posts/1', false, error.message);
    }

    // Задание 3: Заголовки и параметры
    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`, {
            headers: { 'X-Custom-Header': 'TestValue', 'Authorization': 'Bearer fake-token' }
        });
        if (response.ok) {
            logTestResult('[Задание 3] Кастомные заголовки', true, 'Запрос прошел успешно');
        } else {
            logTestResult('[Задание 3] Кастомные заголовки', false, `Статус: ${response.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 3] Кастомные заголовки', false, error.message);
    }

    try {
        const url = new URL(`${TEST_API_URL}/posts`);
        url.searchParams.append('userId', '1');
        url.searchParams.append('_limit', '5');
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok && Array.isArray(data) && data.length === 5) {
            logTestResult('[Задание 3] Параметры URL', true, `Получено 5 постов`);
        } else {
            logTestResult('[Задание 3] Параметры URL', false, `Ожидалось 5, получено: ${data.length}`);
        }
    } catch (error) {
        logTestResult('[Задание 3] Параметры URL', false, error.message);
    }

    // Задание 4: Обработка ответов
    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`);
        if (response.status === 200 && response.ok) {
            logTestResult('[Задание 4] Проверка статуса', true, `Статус: ${response.status}`);
        } else {
            logTestResult('[Задание 4] Проверка статуса', false, `Неверный статус`);
        }
    } catch (error) {
        logTestResult('[Задание 4] Проверка статуса', false, error.message);
    }

    try {
        const response = await fetch(`${TEST_API_URL}/posts/1`);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            logTestResult('[Задание 4] Чтение заголовков', true, `Content-Type: ${contentType}`);
        } else {
            logTestResult('[Задание 4] Чтение заголовков', false, `Неверный Content-Type: ${contentType}`);
        }
    } catch (error) {
        logTestResult('[Задание 4] Чтение заголовков', false, error.message);
    }

    try {
        const response = await fetch('https://picsum.photos/100/100');
        const blob = await response.blob();
        if (blob.size > 0 && blob.type.startsWith('image/')) {
            logTestResult('[Задание 4] Работа с Blob', true, `Размер: ${blob.size} байт, тип: ${blob.type}`);
        } else {
            logTestResult('[Задание 4] Работа с Blob', false, 'Blob пуст или не изображение');
        }
    } catch (error) {
        logTestResult('[Задание 4] Работа с Blob', false, error.message);
    }

    try {
        const formData = new FormData();
        formData.append('title', 'FormData Test');
        formData.append('body', 'Test');
        formData.append('userId', '1');
        const response = await fetch(`${TEST_API_URL}/posts`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (response.status === 201 && data.title === 'FormData Test') {
            logTestResult('[Задание 4] Отправка FormData', true, `Создан пост ID: ${data.id}`);
        } else {
            logTestResult('[Задание 4] Отправка FormData', false, `Статус: ${response.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 4] Отправка FormData', false, error.message);
    }

    // Задание 5: Обработка ошибок
    try {
        await fetch('https://this-domain-definitely-does-not-exist-123.com/api');
        logTestResult('[Задание 5] Сетевая ошибка', false, 'Запрос должен был упасть');
    } catch (error) {
        if (error instanceof TypeError) {
            logTestResult('[Задание 5] Сетевая ошибка', true, 'Корректно перехвачена TypeError');
        } else {
            logTestResult('[Задание 5] Сетевая ошибка', false, `Неожиданный тип: ${error.name}`);
        }
    }

    try {
        const response = await fetch(`${TEST_API_URL}/nonexistent-endpoint-12345`);
        if (response.status === 404) {
            logTestResult('[Задание 5] HTTP ошибка (404)', true, 'Корректно получен статус 404');
        } else {
            logTestResult('[Задание 5] HTTP ошибка (404)', false, `Статус: ${response.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 5] HTTP ошибка (404)', false, error.message);
    }

    try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 50); // Отменяем через 50мс
        await fetch(`${TEST_API_URL}/posts`, { signal: controller.signal });
        logTestResult('[Задание 5] Отмена запроса', false, 'Запрос не был отменен');
    } catch (error) {
        if (error.name === 'AbortError') {
            logTestResult('[Задание 5] Отмена запроса', true, 'Корректно перехвачен AbortError');
        } else {
            logTestResult('[Задание 5] Отмена запроса', false, `Неожиданная ошибка: ${error.name}`);
        }
    }

    // Задание 6: Параллельные запросы
    try {
        const urls = [
            `${TEST_API_URL}/posts/1`,
            `${TEST_API_URL}/users/1`,
            `${TEST_API_URL}/comments/1`
        ];
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const allOk = responses.every(res => res.ok);
        if (allOk) {
            logTestResult('[Задание 6] Promise.all', true, `Все ${responses.length} запроса успешны`);
        } else {
            logTestResult('[Задание 6] Promise.all', false, 'Один из запросов вернул ошибку');
        }
    } catch (error) {
        logTestResult('[Задание 6] Promise.all', false, error.message);
    }

    try {
        const urls = [
            `${TEST_API_URL}/posts/1`,
            `${TEST_API_URL}/users/1`,
            `${TEST_API_URL}/comments/1`
        ];
        const fastest = await Promise.race(urls.map(url => fetch(url)));
        if (fastest.ok) {
            logTestResult('[Задание 6] Promise.race', true, `Первый ответ: статус ${fastest.status}`);
        } else {
            logTestResult('[Задание 6] Promise.race', false, `Статус: ${fastest.status}`);
        }
    } catch (error) {
        logTestResult('[Задание 6] Promise.race', false, error.message);
    }

    // Задание 7: Реальные сценарии
    try {
        const userRes = await fetch(`${TEST_API_URL}/users/1`);
        const user = await userRes.json();
        const postsUrl = new URL(`${TEST_API_URL}/posts`);
        postsUrl.searchParams.append('userId', user.id);
        const postsRes = await fetch(postsUrl);
        const posts = await postsRes.json();
        if (userRes.ok && postsRes.ok && Array.isArray(posts)) {
            logTestResult('[Задание 7] Пользователь и посты', true, `Пользователь: ${user.name}, постов: ${posts.length}`);
        } else {
            logTestResult('[Задание 7] Пользователь и посты', false, 'Ошибка в цепочке запросов');
        }
    } catch (error) {
        logTestResult('[Задание 7] Пользователь и посты', false, error.message);
    }

    try {
        const url = new URL(`${TEST_API_URL}/posts`);
        url.searchParams.append('q', 'qui');
        const response = await fetch(url);
        const results = await response.json();
        if (response.ok && Array.isArray(results)) {
            logTestResult('[Задание 7] Поиск с API', true, `Найдено результатов: ${results.length}`);
        } else {
            logTestResult('[Задание 7] Поиск с API', false, 'Ошибка поиска');
        }
    } catch (error) {
        logTestResult('[Задание 7] Поиск с API', false, error.message);
    }

    try {
        const cacheKey = 'test_cached_data';
        sessionStorage.removeItem(cacheKey); // Очищаем перед тестом
        
        // Первый запрос (должен сохранить в кэш)
        const res1 = await fetch(`${TEST_API_URL}/users/1`);
        const data1 = await res1.json();
        sessionStorage.setItem(cacheKey, JSON.stringify(data1));

        // Второй запрос (должен взять из кэша)
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            const parsed = JSON.parse(cached);
            logTestResult('[Задание 7] Кэширование', true, `Данные взяты из кэша (ID: ${parsed.id})`);
        } else {
            logTestResult('[Задание 7] Кэширование', false, 'Кэш не сработал');
        }
        sessionStorage.removeItem(cacheKey); // Очистка
    } catch (error) {
        logTestResult('[Задание 7] Кэширование', false, error.message);
    }

    console.log('🏁 Все тесты завершены.');
}

// Запуск тестов после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runTests, 500);
});