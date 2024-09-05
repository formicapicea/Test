describe('Google search and check Byndyusoft website', () => {
    it('Searches for Byndyusoft and checks Telegram link', () => {
        // 1. Открываем Google
        cy.visit('https://www.google.ru/');

        // 2. Вводим запрос Byndyusoft и нажимаем Enter
        cy.get('textarea[name="q"]').type('Byndyusoft{enter}');

        // 3. Переходим по первой ссылке, удалив атрибут target для открытия в той же вкладке
        cy.get('#search a').first().invoke('removeAttr', 'target').click();

        // 4. Теперь используем cy.origin для команд, связанных с Byndyusoft
        cy.origin('https://byndyusoft.com', () => {
            // Скроллим к контейнеру с текстом и кликаем на кнопку "Заказать презентацию"
            cy.contains('.knowMore__text', 'Узнайте больше о наших продуктах')
              .parents('.knowMore__container')
              .find('.btn--lg.btn--info')
              .contains('Заказать презентацию')
              .click();

            // 5. Проверяем, что ссылка на телеграмм равна "http://t.me/alexanderbyndyu"
            cy.get('a[href="http://t.me/alexanderbyndyu"]').should('have.attr', 'href', 'http://t.me/alexanderbyndyu');
        });
    });
});
