// ТЕСТЫ

console.log("Начало теста");

// Вспомогательная функция для создания визуального блока с результатом теста
function createTestResult(name, passed, message = "") {
    const container = document.querySelector('.container') || document.body;
    const testDiv = document.createElement('div');
    testDiv.className = `test-result ${passed ? '' : 'test-failure'}`;
    testDiv.innerHTML = `
        <strong>${passed ? '✅ PASS' : '❌ FAIL'}:</strong> ${name}
        ${message ? `<br><small>${message}</small>` : ''}
    `;
    // Вставляем перед футером
    const footer = document.getElementById('main-footer');
    if (footer) {
        container.insertBefore(testDiv, footer);
    } else {
        container.appendChild(testDiv);
    }
}

// Ожидание DOM
document.addEventListener('DOMContentLoaded', async () => {
    let passedCount = 0;
    let failedCount = 0;

    // Функция-обертка для запуска теста
    const runTest = async (name, testFn) => {
        try {
            const result = await testFn();
            if (result === true || result === undefined) {
                createTestResult(name, true);
                passedCount++;
            } else {
                createTestResult(name, false, result);
                failedCount++;
            }
        } catch (error) {
            createTestResult(name, false, `Исключение: ${error.message}`);
            failedCount++;
        }
    };

    // Тест 1: Проверка наличия функций
    await runTest("Задание 1: Функции промисов определены", () => {
        if (typeof createBasicPromise !== 'function') return "createBasicPromise не найдена";
        if (typeof handleBasicPromise !== 'function') return "handleBasicPromise не найдена";
        if (typeof createPromiseChain !== 'function') return "createPromiseChain не найдена";
        if (typeof handlePromiseError !== 'function') return "handlePromiseError не найдена";
        if (typeof setupPromiseEvents !== 'function') return "setupPromiseEvents не найдена";
        return true;
    });

    // Тест 2: Проверка работы createBasicPromise
    await runTest("Задание 1.1: createBasicPromise(резолв)", async () => {
        const start = Date.now();
        const result = await createBasicPromise(true);
        const duration = Date.now() - start;
        
        if (result !== "Успех!") return `Неверный результат: ${result}`;
        if (duration < 900 || duration > 1500) return `Неверная задержка: ${duration}мс`;
        return true;
    });

    // Тест 3: Проверка работы createBasicPromise с ошибкой
    await runTest("Задание 1.1: createBasicPromise(реджект)", async () => {
        try {
            await createBasicPromise(false);
            return "Промис должен был отклониться, но выполнился";
        } catch (error) {
            if (error.message !== "Ошибка!") return `Неверное сообщение: ${error.message}`;
            return true;
        }
    });

    // Тест 4: Проверка delayWithPromise
    await runTest("Задание 4.3: delayWithPromise", async () => {
        const start = Date.now();
        await delayWithPromise(300);
        const duration = Date.now() - start;
        if (duration < 280) return `Слишком быстро: ${duration}мс`;
        return true;
    });

    // Тест 5: Проверка обработчиков событий (наличие на кнопках)
    await runTest("Проверка привязки событий", () => {
        const btn = document.getElementById('basic-promise');
        if (!btn) return "Кнопка #basic-promise не найдена";
        // Простая проверка, что на кнопке есть обработчик (косвенно)
        // В идеале нужно проверить onclick, но addEventListener не оставляет следов в DOM
        return true;
    });

    // Тест 6: Проверка async функции
    await runTest("Задание 2.1: basicAsyncAwait существует", () => {
        if (typeof basicAsyncAwait !== 'function') return "basicAsyncAwait не найдена";
        if (basicAsyncAwait.constructor.name !== 'AsyncFunction') return "Функция не является async";
        return true;
    });

    // Тест 7: Проверка API функций
    await runTest("Задание 3: Функции API определены", () => {
        if (typeof fetchUsers !== 'function') return "fetchUsers не найдена";
        if (typeof createPost !== 'function') return "createPost не найдена";
        if (typeof testApiError !== 'function') return "testApiError не найдена";
        return true;
    });

    // Тест 8: Проверка Promise.all
    await runTest("Задание 6.1: demonstratePromiseAll существует", () => {
        if (typeof demonstratePromiseAll !== 'function') return "demonstratePromiseAll не найдена";
        return true;
    });

    // Тест 9: Проверка ретраев
    await runTest("Задание 5.3: retryWithBackoff", async () => {
        let attempts = 0;
        const operation = async () => {
            attempts++;
            if (attempts < 2) throw new Error("Сбой");
            return "OK";
        };
        const result = await retryWithBackoff(operation, 3);
        if (result !== "OK") return "Неверный результат";
        if (attempts !== 2) return `Неверное количество попыток: ${attempts}`;
        return true;
    });

    // Тест 10: Проверка кэша
    await runTest("Задание 7.3: createRequestCache", async () => {
        if (typeof createRequestCache !== 'function') return "createRequestCache не найдена";
        const cache = createRequestCache();
        if (typeof cache !== 'function') return "Возвращаемое значение не является функцией";
    
        return true;
    });

    // Итоговый результат
    console.log(`\nКонец теста`);
    console.log(`Пройдено: ${passedCount}, Провалено: ${failedCount}`);
    
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'test-result';
    summaryDiv.style.borderLeftColor = failedCount > 0 ? '#e74c3c' : '#27ae60';
    summaryDiv.innerHTML = `<h3>Итог тестирования:</h3>
        <p>Пройдено: ${passedCount}</p>
        <p>Провалено: ${failedCount}</p>
        <p>Подробности в консоли (F12).</p>`;
    
    const footer = document.getElementById('main-footer');
    if (footer) {
        footer.parentNode.insertBefore(summaryDiv, footer);
    }
});