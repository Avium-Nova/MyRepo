// === FETCH API - ОСНОВНЫЕ ЗАДАНИЯ ===

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

function displayOutput(elementId, data, isError = false) {
    const output = document.getElementById(elementId);
    if (!output) return;
    const timestamp = new Date().toLocaleTimeString();
    let content;
    if (typeof data === 'object' && !(data instanceof Error)) {
        content = JSON.stringify(data, null, 2);
    } else if (data instanceof Error) {
        content = `Ошибка: ${data.message}\n${data.stack}`;
    } else {
        content = String(data);
    }
    output.innerHTML = `[${timestamp}] ${content}`;
    output.className = `output ${isError ? 'error' : 'success'}`;
}

function displayData(elementId, data) {
    const container = document.getElementById(elementId);
    if (!container) return;
    if (Array.isArray(data)) {
        container.innerHTML = data.map(item => `
            <div class="user-card">
                <h4>${item.name || item.title || 'Без названия'}</h4>
                <p>Email: ${item.email || 'Нет'}</p>
                <p>Телефон: ${item.phone || 'Нет'}</p>
                <p>${item.body || item.description || ''}</p>
            </div>
        `).join('');
    } else if (typeof data === 'object') {
        container.innerHTML = `<div class="json-view">${JSON.stringify(data, null, 2)}</div>`;
    } else {
        container.innerHTML = `<p>${String(data)}</p>`;
    }
}

function setLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Загрузка...';
    } else {
        button.disabled = false;
        const originalText = button.getAttribute('data-original-text') || button.textContent;
        button.innerHTML = originalText;
    }
}

function buildUrl(baseUrl, params = {}) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
}

async function measureExecutionTime(asyncFunction) {
    const startTime = Date.now();
    const result = await asyncFunction();
    const endTime = Date.now();
    return { result, executionTime: endTime - startTime };
}

// Задание 1: Базовые GET запросы

async function fetchGetRequest() {
    setLoadingState('fetch-get', true);
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const data = await response.json();
        displayOutput('get-output', `Успех! Пост: ${data.title}`);
    } catch (error) {
        displayOutput('get-output', error, true);
    } finally {
        setLoadingState('fetch-get', false);
    }
}

async function fetchJsonData() {
    setLoadingState('fetch-json', true);
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const users = await response.json();
        displayOutput('get-output', `Загружено пользователей: ${users.length}`);
        displayData('get-data', users);
    } catch (error) {
        displayOutput('get-output', error, true);
    } finally {
        setLoadingState('fetch-json', false);
    }
}

async function fetchWithError() {
    setLoadingState('fetch-error', true);
    try {
        await fetch('https://this-domain-does-not-exist-12345.com/api');
    } catch (error) {
        displayOutput('get-output', `Сетевая ошибка: ${error.message}`, true);
    } finally {
        setLoadingState('fetch-error', false);
    }
}

function setupGetRequests() {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
}

// Задание 2: POST, PUT, DELETE запросы

async function fetchPostRequest() {
    setLoadingState('fetch-post', true);
    const newPost = { title: 'Новый пост', body: 'Текст поста', userId: 1 };
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(newPost)
        });
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const data = await response.json();
        displayOutput('crud-output', `Пост создан! ID: ${data.id}`);
    } catch (error) {
        displayOutput('crud-output', error, true);
    } finally {
        setLoadingState('fetch-post', false);
    }
}

async function fetchPutRequest() {
    setLoadingState('fetch-put', true);
    const updatedPost = { id: 1, title: 'Обновлено (PUT)', body: 'Новый текст (PUT)', userId: 1 };
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost)
        });
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const data = await response.json();
        displayOutput('crud-output', `PUT успешен. Заголовок: ${data.title}`);
    } catch (error) {
        displayOutput('crud-output', error, true);
    } finally {
        setLoadingState('fetch-put', false);
    }
}

async function fetchPatchRequest() {
    setLoadingState('fetch-patch', true);
    const patchData = { title: 'Только заголовок (PATCH)' };
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchData)
        });
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const data = await response.json();
        displayOutput('crud-output', `PATCH успешен. Новый заголовок: ${data.title}`);
    } catch (error) {
        displayOutput('crud-output', error, true);
    } finally {
        setLoadingState('fetch-patch', false);
    }
}

async function fetchDeleteRequest() {
    setLoadingState('fetch-delete', true);
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, { method: 'DELETE' });
        if (response.ok) {
            displayOutput('crud-output', `Пост удален! Статус: ${response.status}`);
        } else {
            throw new Error(`Не удалось удалить. Статус: ${response.status}`);
        }
    } catch (error) {
        displayOutput('crud-output', error, true);
    } finally {
        setLoadingState('fetch-delete', false);
    }
}

function setupCrudRequests() {
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
}

// Задание 3: Заголовки и параметры

async function fetchWithHeaders() {
    setLoadingState('fetch-headers', true);
    const headers = { 'X-Custom-Header': 'MyValue123', 'Authorization': 'Bearer test-token' };
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, { headers });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        let msg = 'Отправленные заголовки:\n';
        for (let [k, v] of Object.entries(headers)) msg += `${k}: ${v}\n`;
        displayOutput('headers-output', msg);
    } catch (error) {
        displayOutput('headers-output', error, true);
    } finally {
        setLoadingState('fetch-headers', false);
    }
}

async function fetchWithAuth() {
    setLoadingState('fetch-auth', true);
    try {
        const credentials = btoa('user:password');
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });
        if (response.ok) {
            displayOutput('headers-output', 'Basic Auth выполнен успешно (демо).');
        }
    } catch (error) {
        displayOutput('headers-output', error, true);
    } finally {
        setLoadingState('fetch-auth', false);
    }
}

async function fetchWithParams() {
    setLoadingState('fetch-params', true);
    const url = buildUrl(`${API_BASE_URL}/posts`, { userId: 1, _limit: 5 });
    try {
        const { result: data, executionTime } = await measureExecutionTime(async () => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        });
        displayOutput('headers-output', `URL: ${url}\nНайдено: ${data.length} постов.\nВремя: ${executionTime}мс`);
        displayData('get-data', data);
    } catch (error) {
        displayOutput('headers-output', error, true);
    } finally {
        setLoadingState('fetch-params', false);
    }
}

async function fetchWithTimeout() {
    setLoadingState('fetch-timeout', true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500);

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        displayOutput('headers-output', 'Запрос выполнен без таймаута.');
    } catch (error) {
        if (error.name === 'AbortError') {
            displayOutput('headers-output', 'Ошибка: Превышено время ожидания (AbortError)', true);
        } else {
            displayOutput('headers-output', error, true);
        }
    } finally {
        clearTimeout(timeoutId);
        setLoadingState('fetch-timeout', false);
    }
}

function setupHeadersAndParams() {
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-auth').addEventListener('click', fetchWithAuth);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout').addEventListener('click', fetchWithTimeout);
}

// Задание 4: Обработка ответов

async function fetchCheckStatus() {
    setLoadingState('fetch-status', true);
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        displayOutput('response-output', `Статус: ${response.status} (${response.statusText})\nOK: ${response.ok}`);
    } catch (error) {
        displayOutput('response-output', error, true);
    } finally {
        setLoadingState('fetch-status', false);
    }
}

async function fetchReadHeaders() {
    setLoadingState('fetch-headers-response', true);
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        let headersList = 'Заголовки ответа:\n';
        response.headers.forEach((value, key) => {
            headersList += `${key}: ${value}\n`;
        });
        displayOutput('response-output', headersList);
    } catch (error) {
        displayOutput('response-output', error, true);
    } finally {
        setLoadingState('fetch-headers-response', false);
    }
}

async function fetchBlobData() {
    setLoadingState('fetch-blob', true);
    try {
        // Запрашиваем изображение как Blob
        const response = await fetch('https://picsum.photos/200/300');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        
        const imgUrl = URL.createObjectURL(blob);
        displayOutput('response-output', `Получен Blob: тип ${blob.type}, размер ${blob.size} байт.`);
        
        const container = document.getElementById('response-data');
        container.innerHTML = `<img src="${imgUrl}" alt="Blob image" style="max-width: 100%; border-radius: 8px;">`;
        // Освобождаем память после загрузки
        setTimeout(() => URL.revokeObjectURL(imgUrl), 10000);
    } catch (error) {
        displayOutput('response-output', error, true);
    } finally {
        setLoadingState('fetch-blob', false);
    }
}

async function fetchFormData() {
    setLoadingState('fetch-formdata', true);
    try {
        const formData = new FormData();
        formData.append('title', 'Отправка через FormData');
        formData.append('body', 'Это тестовые данные');
        formData.append('userId', '1');

        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            body: formData // Fetch автоматически установит Content-Type: multipart/form-data
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayOutput('response-output', `FormData отправлена. Ответ сервера: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        displayOutput('response-output', error, true);
    } finally {
        setLoadingState('fetch-formdata', false);
    }
}

function setupResponseHandling() {
    document.getElementById('fetch-status').addEventListener('click', fetchCheckStatus);
    document.getElementById('fetch-headers-response').addEventListener('click', fetchReadHeaders);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata').addEventListener('click', fetchFormData);
}

// Задание 5: Обработка ошибок

async function fetchNetworkError() {
    setLoadingState('fetch-network-error', true);
    try {
        await fetch('https://invalid-domain-name-xyz.com/api');
    } catch (error) {
        displayOutput('error-output', `Сетевая ошибка (TypeError): ${error.message}`, true);
    } finally {
        setLoadingState('fetch-network-error', false);
    }
}

async function fetchHttpError() {
    setLoadingState('fetch-http-error', true);
    try {
        const response = await fetch(`${API_BASE_URL}/invalid-endpoint`);
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        displayOutput('error-output', error, true);
    } finally {
        setLoadingState('fetch-http-error', false);
    }
}

async function fetchAbort() {
    setLoadingState('fetch-abort', true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 100); // Очень короткий таймаут
    try {
        await fetch(`${API_BASE_URL}/posts`, { signal: controller.signal });
    } catch (error) {
        if (error.name === 'AbortError') {
            displayOutput('error-output', 'Запрос отменен пользователем (AbortError)', true);
        } else {
            displayOutput('error-output', error, true);
        }
    } finally {
        clearTimeout(timeoutId);
        setLoadingState('fetch-abort', false);
    }
}

async function fetchRetry() {
    setLoadingState('fetch-retry', true);
    const maxRetries = 3;
    let attempt = 0;

    const tryFetch = async () => {
        attempt++;
        try {
            // Имитируем нестабильный сервер, который падает в 50% случаев (для демо используем несуществующий URL)
            // В реальности здесь был бы ваш API. Для теста заставим его упасть.
            if (attempt < 3) {
                throw new Error(`Временная ошибка сети (попытка ${attempt})`);
            }
            const response = await fetch(`${API_BASE_URL}/posts/1`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        } catch (error) {
            if (attempt < maxRetries) {
                displayOutput('error-output', `Попытка ${attempt} не удалась. Повтор...`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка 1 сек
                return tryFetch();
            }
            throw error;
        }
    };

    try {
        const data = await tryFetch();
        displayOutput('error-output', `Успех после ${attempt} попыток! ID: ${data.id}`);
    } catch (error) {
        displayOutput('error-output', `Все ${maxRetries} попытки провалились. Ошибка: ${error.message}`, true);
    } finally {
        setLoadingState('fetch-retry', false);
    }
}

function setupErrorHandling() {
    document.getElementById('fetch-network-error').addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error').addEventListener('click', fetchHttpError);
    document.getElementById('fetch-abort').addEventListener('click', fetchAbort);
    document.getElementById('fetch-retry').addEventListener('click', fetchRetry);
}

// Задание 6: Параллельные запросы

async function fetchPromiseAll() {
    setLoadingState('fetch-all', true);
    try {
        const urls = [
            `${API_BASE_URL}/posts/1`,
            `${API_BASE_URL}/users/1`,
            `${API_BASE_URL}/comments/1`
        ];
        const responses = await Promise.all(urls.map(url => fetch(url)));
        
        // Проверяем, что все ответы успешны
        responses.forEach(res => {
            if (!res.ok) throw new Error(`Один из запросов вернул ошибку: ${res.status}`);
        });

        const data = await Promise.all(responses.map(res => res.json()));
        displayOutput('parallel-output', `Promise.all выполнен!\nПолучено объектов: ${data.length}`);
    } catch (error) {
        displayOutput('parallel-output', error, true);
    } finally {
        setLoadingState('fetch-all', false);
    }
}

async function fetchPromiseRace() {
    setLoadingState('fetch-race', true);
    try {
        const urls = [
            `${API_BASE_URL}/posts/1`,
            `${API_BASE_URL}/users/1`,
            `${API_BASE_URL}/comments/1`
        ];
        const fastestResponse = await Promise.race(urls.map(url => fetch(url)));
        const data = await fastestResponse.json();
        displayOutput('parallel-output', `Promise.race: первым ответил запрос со статусом ${fastestResponse.status}.\nДанные: ${JSON.stringify(data).slice(0, 50)}...`);
    } catch (error) {
        displayOutput('parallel-output', error, true);
    } finally {
        setLoadingState('fetch-race', false);
    }
}

async function fetchSequential() {
    setLoadingState('fetch-sequential', true);
    try {
        const { executionTime } = await measureExecutionTime(async () => {
            const res1 = await fetch(`${API_BASE_URL}/posts/1`);
            await res1.json();
            const res2 = await fetch(`${API_BASE_URL}/users/1`);
            await res2.json();
            const res3 = await fetch(`${API_BASE_URL}/comments/1`);
            await res3.json();
        });
        displayOutput('parallel-output', `Последовательные запросы выполнены.\nВремя: ${executionTime}мс (запросы идут строго друг за другом)`);
    } catch (error) {
        displayOutput('parallel-output', error, true);
    } finally {
        setLoadingState('fetch-sequential', false);
    }
}

function setupParallelRequests() {
    document.getElementById('fetch-all').addEventListener('click', fetchPromiseAll);
    document.getElementById('fetch-race').addEventListener('click', fetchPromiseRace);
    document.getElementById('fetch-sequential').addEventListener('click', fetchSequential);
}

// Задание 7: Реальные сценарии

async function fetchUserPosts() {
    setLoadingState('fetch-user-posts', true);
    try {
        // 1. Получаем пользователя
        const userRes = await fetch(`${API_BASE_URL}/users/1`);
        if (!userRes.ok) throw new Error(`Ошибка загрузки пользователя: ${userRes.status}`);
        const user = await userRes.json();

        // 2. Получаем посты пользователя, используя его ID
        const postsUrl = buildUrl(`${API_BASE_URL}/posts`, { userId: user.id });
        const postsRes = await fetch(postsUrl);
        if (!postsRes.ok) throw new Error(`Ошибка загрузки постов: ${postsRes.status}`);
        const posts = await postsRes.json();

        displayOutput('scenario-output', `Пользователь: ${user.name}\nПостов найдено: ${posts.length}`);
        displayData('scenario-data', posts);
    } catch (error) {
        displayOutput('scenario-output', error, true);
    } finally {
        setLoadingState('fetch-user-posts', false);
    }
}

async function fetchSearch() {
    setLoadingState('fetch-search', true);
    try {
        const query = 'qui'; // Искомое слово
        const url = buildUrl(`${API_BASE_URL}/posts`, { q: query });
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const results = await response.json();
        
        displayOutput('scenario-output', `Поиск по запросу "${query}": найдено ${results.length} результатов.`);
        displayData('scenario-data', results);
    } catch (error) {
        displayOutput('scenario-output', error, true);
    } finally {
        setLoadingState('fetch-search', false);
    }
}

async function fetchUploadSimulation() {
    setLoadingState('fetch-upload', true);
    const container = document.getElementById('scenario-data');
    container.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" id="progress-fill" style="width: 0%;"></div>
        </div>
        <p id="upload-status">Загрузка...</p>
    `;
    const progressFill = document.getElementById('progress-fill');
    const uploadStatus = document.getElementById('upload-status');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = `${progress}%`;
        if (progress >= 90) clearInterval(interval); // Имитация зависания на 90% перед реальным запросом
    }, 200);

    try {
        // Реальный запрос для имитации завершения
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Uploaded file', body: 'Simulated data' })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        clearInterval(interval);
        progressFill.style.width = '100%';
        uploadStatus.textContent = 'Загрузка завершена успешно!';
        displayOutput('scenario-output', 'Симуляция загрузки файла завершена.');
    } catch (error) {
        clearInterval(interval);
        uploadStatus.textContent = 'Ошибка загрузки.';
        displayOutput('scenario-output', error, true);
    } finally {
        setTimeout(() => {
            container.innerHTML = '';
            setLoadingState('fetch-upload', false);
        }, 2000);
    }
}

async function fetchCache() {
    setLoadingState('fetch-cache', true);
    const cacheKey = 'cached_user_1';
    
    try {
        // Проверяем, есть ли данные в кэше
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
            displayOutput('scenario-output', `Данные взяты из КЭША (sessionStorage):\n${cachedData}`);
            setLoadingState('fetch-cache', false);
            return;
        }

        // Если кэша нет, делаем запрос
        displayOutput('scenario-output', 'Кэш пуст. Выполняется запрос к API...');
        const response = await fetch(`${API_BASE_URL}/users/1`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // Сохраняем в кэш (в виде строки)
        const jsonString = JSON.stringify(data, null, 2);
        sessionStorage.setItem(cacheKey, jsonString);
        
        displayOutput('scenario-output', `Данные загружены с сервера и сохранены в кэш:\n${jsonString}`);
    } catch (error) {
        displayOutput('scenario-output', error, true);
    } finally {
        setLoadingState('fetch-cache', false);
    }
}

function setupRealScenarios() {
    document.getElementById('fetch-user-posts').addEventListener('click', fetchUserPosts);
    document.getElementById('fetch-search').addEventListener('click', fetchSearch);
    document.getElementById('fetch-upload').addEventListener('click', fetchUploadSimulation);
    document.getElementById('fetch-cache').addEventListener('click', fetchCache);
}

// ИНИЦИАЛИЗАЦИЯ

function initializeFetchAPI() {
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
    setupErrorHandling();
    setupParallelRequests();
    setupRealScenarios();
    
    document.querySelectorAll('button').forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
    });
    console.log('Все обработчики Fetch API инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeFetchAPI);