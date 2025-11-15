(function() {
    const paragraph = "\n\n";

    const createHandlers = (previewGenerator) => ({
        previewGenerator,
        copyHandler: () => {
            if (typeof doCopy === 'function') {
                doCopy(previewGenerator());
            }
        }
    });

    const createMorningHandlers = () => {
        const previewGenerator = () => {
            const greetingText = (typeof morningGreeting === 'function') ? morningGreeting() : '';
            const workType = (typeof getWorkType === 'function') ? getWorkType() : '';
            const share = (typeof getShare === 'function') ? getShare() : '';
            const mtg = (typeof getMtg === 'function') ? getMtg() : '';
            const todo = (typeof getTodo === 'function') ? getTodo() : '';
            const business = (window.temp && window.temp.common && window.temp.common.business) ? window.temp.common.business : '';

            return (
                greetingText + paragraph +
                workType + paragraph +
                business + paragraph +
                mtg + "\n" +
                todo +
                share
            );
        };

        return createHandlers(previewGenerator);
    };

    const createEveningHandlers = () => {
        const previewGenerator = () => {
            const greetingText = (typeof eveningGreeting === 'function') ? eveningGreeting() : '';
            const workType = (typeof getWorkType === 'function') ? getWorkType() : '';
            const share = (typeof getShare === 'function') ? getShare() : '';
            const remaining = (typeof getRemailing === 'function') ? getRemailing() : '';
            const mtg = (typeof getMtg === 'function') ? getMtg() : '';
            const todo = (typeof getTodo === 'function') ? getTodo() : '';
            const business = (window.temp && window.temp.common && window.temp.common.business) ? window.temp.common.business : '';

            return (
                greetingText + paragraph +
                workType + paragraph +
                business + paragraph +
                mtg + "\n" +
                todo +
                remaining + paragraph +
                share
            );
        };

        return createHandlers(previewGenerator);
    };

    const handlersByMode = {
        morning: createMorningHandlers,
        evening: createEveningHandlers
    };

    function bootstrap() {
        const body = document.body;
        if (!body) {
            return;
        }

        const mode = body.dataset.reportMode || 'morning';
        const handlerFactory = handlersByMode[mode];
        if (!handlerFactory) {
            console.warn('Unsupported report mode:', mode);
            return;
        }

        const { previewGenerator, copyHandler } = handlerFactory();
        if (typeof previewGenerator !== 'function' || typeof copyHandler !== 'function') {
            console.warn('Invalid handler configuration for mode:', mode);
            return;
        }

        const updatePreview = () => {
            const previewArea = document.getElementById('previewArea');
            if (previewArea) {
                previewArea.textContent = previewGenerator();
            }
        };
        window.updatePreview = updatePreview;

        const copyButton = document.getElementById('copyButton');
        if (copyButton) {
            copyButton.addEventListener('click', copyHandler);
        }

        const mtgAddButtonElement = document.getElementById('mtgAddButton');
        if (mtgAddButtonElement && typeof window.mtgAddButton === 'function') {
            mtgAddButtonElement.addEventListener('click', function() {
                window.mtgAddButton();
                setTimeout(updatePreview, 0);
            });
        }

        const todoAddButtonElement = document.getElementById('todoAddButton');
        if (todoAddButtonElement && typeof window.todoAddButton === 'function') {
            todoAddButtonElement.addEventListener('click', function() {
                window.todoAddButton();
                setTimeout(updatePreview, 0);
            });
        }

        document.addEventListener('input', function(event) {
            if (event.target.closest('input') || event.target.closest('textarea') || event.target.closest('select')) {
                updatePreview();
            }
        });

        updatePreview();
    }

    window.addEventListener('load', bootstrap);
})();
