(function runTests() {
    const results = [];
    const assert = (name, condition) => {
        results.push({ name, passed: !!condition });
    };

    // Задание 1
    assert('basic-btn существует', !!document.getElementById('basic-btn'));
    assert('basic-output существует', !!document.getElementById('basic-output'));
    assert('color-box существует', !!document.getElementById('color-box'));
    assert('mouse-output существует', !!document.getElementById('mouse-output'));

    // Задание 2
    assert('key-input существует', !!document.getElementById('key-input'));
    assert('key-output существует', !!document.getElementById('key-output'));

    // Задание 3
    const list = document.getElementById('item-list');
    assert('item-list существует', !!list);
    assert('есть .item внутри item-list', list && list.querySelectorAll('.item').length >= 3);
    assert('add-item-btn существует', !!document.getElementById('add-item-btn'));
    assert('delegation-output существует', !!document.getElementById('delegation-output'));

    // Задание 4
    assert('prevent-link существует', !!document.getElementById('prevent-link'));
    assert('prevent-form существует', !!document.getElementById('prevent-form'));
    assert('prevention-output существует', !!document.getElementById('prevention-output'));

    // Задание 5
    assert('trigger-custom существует', !!document.getElementById('trigger-custom'));
    assert('multiple-listeners существует', !!document.getElementById('multiple-listeners'));
    assert('custom-output существует', !!document.getElementById('custom-output'));

    // Задание 6
    assert('load-image существует', !!document.getElementById('load-image'));
    assert('load-error существует', !!document.getElementById('load-error'));
    assert('loading-output существует', !!document.getElementById('loading-output'));
    assert('image-container существует', !!document.querySelector('.image-container'));

    // Задание 7
    assert('start-timer существует', !!document.getElementById('start-timer'));
    assert('stop-timer существует', !!document.getElementById('stop-timer'));
    assert('debounce-btn существует', !!document.getElementById('debounce-btn'));
    assert('throttle-btn существует', !!document.getElementById('throttle-btn'));
    assert('timer-output существует', !!document.getElementById('timer-output'));
    assert('async-output существует', !!document.getElementById('async-output'));

    // Проверка поддержки CustomEvent
    let customOk = false;
    try {
        const ev = new CustomEvent('testEvent', { detail: { ok: true } });
        document.addEventListener('testEvent', (e) => { customOk = e.detail.ok; });
        document.dispatchEvent(ev);
    } catch (_) {}
    assert('CustomEvent поддерживается', customOk);

    // Вывод
    console.group('Результаты тестов ПР12');
    results.forEach((r) => console.log(`${r.passed ? '✅' : '❌'} ${r.name}`));
    const passed = results.filter(r => r.passed).length;
    console.log(`Итого: ${passed}/${results.length} тестов пройдено`);
    console.groupEnd();

    if (passed === results.length) {
        console.log('Все проверки пройдены.', 'color: green; font-weight: bold;');
    } else {
        console.warn('Некоторые проверки не пройдены.');
    }
})();