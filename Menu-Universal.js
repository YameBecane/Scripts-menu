// ============================================
// AiCode V2 - Interface Mobile
// Baseado no design das imagens
// ============================================

(function() {
    'use strict';

    // ========== ESTILOS CSS ==========
    const styles = `
        /* ===== OVERLAY ===== */
        #aiCodeOverlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 999998;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            -webkit-tap-highlight-color: transparent;
        }

        #aiCodeOverlay.visible {
            display: block;
            opacity: 1;
        }

        /* ===== TOAST ===== */
        #aiCodeToastContainer {
            position: fixed;
            top: 60px;
            right: 12px;
            z-index: 1000000;
            display: flex;
            flex-direction: column;
            gap: 6px;
            max-width: 280px;
            pointer-events: none;
        }

        .ai-toast {
            padding: 10px 14px;
            border-radius: 10px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 12px;
            font-weight: 500;
            color: #E8EDF5;
            background: #1E2532;
            border: 1px solid #2D3548;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            animation: toastSlideIn 0.3s ease, toastFadeOut 0.3s ease 2.7s forwards;
            pointer-events: auto;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .ai-toast.success { border-left: 3px solid #4CAF50; }
        .ai-toast.error { border-left: 3px solid #F44336; }
        .ai-toast.warning { border-left: 3px solid #FFA726; }
        .ai-toast.info { border-left: 3px solid #42A5F5; }

        @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes toastFadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(40px); }
        }

        /* ===== CONTAINER PRINCIPAL ===== */
        #aiCodeContainer {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.92);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            width: 94vw;
            max-width: 420px;
            max-height: 85vh;
            background: #1A1F2B;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
            border: 1px solid #2D3548;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            user-select: none;
            display: none;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            -webkit-tap-highlight-color: transparent;
        }

        #aiCodeContainer.visible {
            display: block;
            opacity: 1;
            pointer-events: auto;
            transform: translate(-50%, -50%) scale(1);
        }

        @media (max-width: 480px) {
            #aiCodeContainer {
                width: 94vw;
                max-height: 88vh;
                border-radius: 14px;
            }
        }

        /* ===== HEADER ===== */
        #aiCodeHeader {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 14px 16px 10px 16px;
            background: transparent;
            border-bottom: 1px solid #2D3548;
            position: relative;
            z-index: 5;
            min-height: 44px;
        }

        #aiCodeHeader .title {
            font-size: 17px;
            font-weight: 700;
            color: #E8EDF5;
            letter-spacing: -0.5px;
        }

        #aiCodeHeader .close-btn {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #8892A8;
            font-size: 20px;
            cursor: pointer;
            padding: 4px 8px;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        #aiCodeHeader .close-btn:active {
            transform: translateY(-50%) scale(0.88);
        }

        /* ===== TABS ===== */
        #aiCodeTabs {
            display: flex;
            gap: 0;
            padding: 0;
            border-bottom: 1px solid #2D3548;
            background: #151A24;
        }

        #aiCodeTabs .tab {
            flex: 1;
            padding: 12px 8px;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: #8892A8;
            transition: all 0.2s;
            border: none;
            background: transparent;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            position: relative;
        }

        #aiCodeTabs .tab:active {
            transform: scale(0.94);
        }

        #aiCodeTabs .tab.active {
            color: #E8EDF5;
            background: rgba(255, 255, 255, 0.04);
        }

        #aiCodeTabs .tab.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 30%;
            right: 30%;
            height: 3px;
            background: #42A5F5;
            border-radius: 3px 3px 0 0;
        }

        /* ===== CONTEUDO ===== */
        #aiCodeContent {
            padding: 16px;
            overflow-y: auto;
            max-height: calc(85vh - 130px);
            -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 480px) {
            #aiCodeContent {
                padding: 14px;
                max-height: calc(88vh - 120px);
            }
        }

        .tab-content {
            display: none;
            animation: fadeIn 0.2s ease;
        }

        .tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ===== GENERAL ===== */
        .setting-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 0;
            border-bottom: 1px solid #2D3548;
        }

        .setting-group:last-child {
            border-bottom: none;
        }

        .setting-label {
            font-size: 15px;
            color: #E8EDF5;
            font-weight: 500;
        }

        /* Toggle switch */
        .toggle-switch {
            position: relative;
            width: 48px;
            height: 28px;
            background: #2D3548;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.3s;
            flex-shrink: 0;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .toggle-switch:active {
            transform: scale(0.94);
        }

        .toggle-switch.active {
            background: #42A5F5;
        }

        .toggle-switch .knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 24px;
            height: 24px;
            background: #E8EDF5;
            border-radius: 50%;
            transition: all 0.3s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .toggle-switch.active .knob {
            left: 22px;
        }

        /* Slider */
        .slider-group {
            padding: 14px 0;
            border-bottom: 1px solid #2D3548;
        }

        .slider-group label {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            color: #E8EDF5;
            font-weight: 500;
            margin-bottom: 10px;
        }

        .slider-group label span {
            color: #42A5F5;
            font-weight: 600;
            font-size: 16px;
        }

        .slider-group input[type="range"] {
            width: 100%;
            height: 4px;
            -webkit-appearance: none;
            appearance: none;
            background: #2D3548;
            border-radius: 2px;
            outline: none;
        }

        .slider-group input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #42A5F5;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(66, 165, 245, 0.3);
        }

        .slider-group input[type="range"]::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #42A5F5;
            cursor: pointer;
            border: none;
        }

        /* ===== BOTOES DE ACAO ===== */
        .action-buttons {
            display: none;
            gap: 10px;
            margin-top: 14px;
        }

        .action-buttons.visible {
            display: flex;
        }

        .action-buttons button {
            flex: 1;
            padding: 14px 12px;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            letter-spacing: 0.3px;
        }

        .action-buttons button:active {
            transform: scale(0.94);
        }

        .btn-pause {
            background: #F57C00;
            color: #E8EDF5;
        }

        .btn-pause.paused {
            background: #2E7D32;
        }

        .btn-pause.paused::before {
            content: '▶ ';
        }

        .btn-cancel {
            background: #C62828;
            color: #E8EDF5;
        }

        /* ===== EXECUTOR ===== */
        .executor-textarea {
            width: 100%;
            min-height: 150px;
            padding: 12px 14px;
            border: 1px solid #2D3548;
            border-radius: 10px;
            font-size: 15px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            resize: vertical;
            background: #121620;
            color: #E8EDF5;
            transition: all 0.2s;
            box-sizing: border-box;
            -webkit-appearance: none;
            appearance: none;
            -webkit-user-select: text;
            user-select: text;
            line-height: 1.6;
        }

        .executor-textarea:focus {
            outline: none;
            border-color: #42A5F5;
            background: #0D1117;
            box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.15);
        }

        .executor-textarea::placeholder {
            color: #5A6A82;
        }

        .executor-buttons {
            display: flex;
            gap: 8px;
            margin-top: 14px;
        }

        .executor-buttons button {
            flex: 1;
            padding: 14px 12px;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            letter-spacing: 0.3px;
        }

        .executor-buttons button:active {
            transform: scale(0.94);
        }

        .btn-clear-exec {
            background: #C62828;
            color: #E8EDF5;
        }

        .btn-paste-exec {
            background: #2E7D32;
            color: #E8EDF5;
        }

        .btn-execute {
            background: #1A73E8;
            color: #E8EDF5;
        }

        /* Output */
        #executorOutput {
            margin-top: 14px;
            padding: 12px 14px;
            background: #0D1117;
            border-radius: 10px;
            font-size: 13px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            color: #E8EDF5;
            max-height: 120px;
            overflow-y: auto;
            display: none;
            white-space: pre-wrap;
            word-break: break-all;
            border: 1px solid #2D3548;
            -webkit-overflow-scrolling: touch;
            -webkit-user-select: text;
            user-select: text;
            line-height: 1.5;
        }

        #executorOutput.visible {
            display: block;
            animation: fadeIn 0.2s ease;
        }

        /* Scrollbar */
        #aiCodeContent::-webkit-scrollbar,
        #executorOutput::-webkit-scrollbar {
            width: 3px;
        }

        #aiCodeContent::-webkit-scrollbar-track,
        #executorOutput::-webkit-scrollbar-track {
            background: transparent;
        }

        #aiCodeContent::-webkit-scrollbar-thumb,
        #executorOutput::-webkit-scrollbar-thumb {
            background: #2D3548;
            border-radius: 2px;
        }

        /* ===== BOTAO TOGGLE ===== */
        #aiCodeToggle {
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 999999;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #1A1F2B;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1.5px solid #2D3548;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            transition: all 0.25s;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        #aiCodeToggle:active {
            transform: scale(0.85);
        }

        #aiCodeToggle svg {
            width: 24px;
            height: 24px;
            fill: #B0C4DE;
        }

        /* ===== LINHAS DE NUMERACAO ===== */
        .line-numbers {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 28px;
            padding: 12px 0 12px 8px;
            color: #5A6A82;
            font-size: 12px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            text-align: right;
            pointer-events: none;
            line-height: 1.6;
            background: transparent;
            border-right: 1px solid #2D3548;
        }

        .executor-wrapper {
            position: relative;
        }

        .executor-wrapper .executor-textarea {
            padding-left: 40px;
        }
    `;

    // ========== HTML ==========
    const html = `
        <!-- Overlay -->
        <div id="aiCodeOverlay"></div>

        <!-- Toast Container -->
        <div id="aiCodeToastContainer"></div>

        <!-- Botao toggle -->
        <button id="aiCodeToggle" aria-label="Abrir AiCode V2">
            <svg viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2.5"/>
                <circle cx="12" cy="12" r="2.5"/>
                <circle cx="19" cy="12" r="2.5"/>
            </svg>
        </button>

        <!-- Container principal -->
        <div id="aiCodeContainer">
            <!-- Header -->
            <div id="aiCodeHeader">
                <span class="title">AiCode V2</span>
                <button class="close-btn" id="aiCodeCloseBtn">✕</button>
            </div>

            <!-- Tabs -->
            <div id="aiCodeTabs">
                <button class="tab active" data-tab="general">General</button>
                <button class="tab" data-tab="executor">Executor</button>
            </div>

            <!-- Conteudo -->
            <div id="aiCodeContent">
                <!-- Tab General -->
                <div class="tab-content active" id="tab-general">
                    <div class="setting-group">
                        <span class="setting-label">Liberar Colar</span>
                        <div class="toggle-switch" data-toggle="unlockPaste">
                            <div class="knob"></div>
                        </div>
                    </div>

                    <div class="setting-group">
                        <span class="setting-label">Auto Digitar</span>
                        <div class="toggle-switch" data-toggle="autoDigitador">
                            <div class="knob"></div>
                        </div>
                    </div>

                    <div class="slider-group">
                        <label>
                            Velocidade
                            <span id="speedValue">10ms</span>
                        </label>
                        <input type="range" id="speedSlider" min="1" max="100" value="10">
                    </div>

                    <div class="action-buttons" id="actionButtons">
                        <button class="btn-pause" id="btnPause">Pausar</button>
                        <button class="btn-cancel" id="btnCancel">Cancelar</button>
                    </div>
                </div>

                <!-- Tab Executor -->
                <div class="tab-content" id="tab-executor">
                    <div class="executor-wrapper">
                        <div class="line-numbers" id="lineNumbers">1</div>
                        <textarea class="executor-textarea" id="executorInput" placeholder="Cole seu script aqui..."></textarea>
                    </div>

                    <div class="executor-buttons">
                        <button class="btn-clear-exec" id="btnClearExec">Limpar</button>
                        <button class="btn-paste-exec" id="btnPasteExec">Colar</button>
                        <button class="btn-execute" id="btnExecute">Executar</button>
                    </div>

                    <div id="executorOutput"></div>
                </div>
            </div>
        </div>
    `;

    // ========== INJETAR NO DOM ==========
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstElementChild);
    document.body.appendChild(container.lastElementChild);

    // ========== REFERENCIAS ==========
    const toggleBtn = document.getElementById('aiCodeToggle');
    const closeBtn = document.getElementById('aiCodeCloseBtn');
    const mainContainer = document.getElementById('aiCodeContainer');
    const overlay = document.getElementById('aiCodeOverlay');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = {
        general: document.getElementById('tab-general'),
        executor: document.getElementById('tab-executor')
    };
    const toastContainer = document.getElementById('aiCodeToastContainer');

    // ========== TOAST ==========
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `ai-toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    // ========== ABRIR/FECHAR ==========
    let isMenuVisible = false;

    function toggleMenu(show) {
        isMenuVisible = (show !== undefined) ? show : !isMenuVisible;
        
        mainContainer.classList.toggle('visible', isMenuVisible);
        overlay.classList.toggle('visible', isMenuVisible);
        document.body.style.overflow = isMenuVisible ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    closeBtn.addEventListener('click', function() {
        toggleMenu(false);
    });

    overlay.addEventListener('click', function() {
        toggleMenu(false);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuVisible) {
            toggleMenu(false);
        }
    });

    // ========== TOGGLES ==========
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            const label = this.closest('.setting-group').querySelector('.setting-label');
            if (label) {
                const name = label.textContent.trim();
                const status = this.classList.contains('active') ? 'ativado' : 'desativado';
                showToast(`${name} ${status}`, 'info');
            }
        });
    });

    // ========== SLIDER ==========
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    speedSlider.addEventListener('input', function() {
        speedValue.textContent = this.value + 'ms';
        showToast(`Velocidade: ${this.value}ms`, 'info');
    });

    // ========== AUTO DIGITADOR ==========
    const autoDigitadorToggle = document.querySelector('[data-toggle="autoDigitador"]');
    const actionButtons = document.getElementById('actionButtons');

    autoDigitadorToggle.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            actionButtons.classList.add('visible');
            const btnPause = document.getElementById('btnPause');
            btnPause.textContent = 'Pausar';
            btnPause.classList.remove('paused');
            showToast('Auto Digitar ativado', 'success');
        } else {
            actionButtons.classList.remove('visible');
            showToast('Auto Digitar desativado', 'warning');
        }
    });

    // ========== BOTAO PAUSAR ==========
    const btnPause = document.getElementById('btnPause');
    btnPause.addEventListener('click', function() {
        if (this.classList.contains('paused')) {
            this.textContent = 'Pausar';
            this.classList.remove('paused');
            showToast('Execução retomada', 'success');
        } else {
            this.textContent = 'Play';
            this.classList.add('paused');
            showToast('Execução pausada', 'warning');
        }
    });

    // ========== BOTAO CANCELAR ==========
    document.getElementById('btnCancel').addEventListener('click', function() {
        const autoToggle = document.querySelector('[data-toggle="autoDigitador"]');
        autoToggle.classList.remove('active');
        actionButtons.classList.remove('visible');
        const btnPause = document.getElementById('btnPause');
        btnPause.textContent = 'Pausar';
        btnPause.classList.remove('paused');
        showToast('Auto Digitar cancelado', 'error');
    });

    // ========== TABS ==========
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabName = this.dataset.tab;
            Object.keys(tabContents).forEach(key => {
                tabContents[key].classList.toggle('active', key === tabName);
            });
        });
    });

    // ========== LINHAS DO EXECUTOR ==========
    const executorInput = document.getElementById('executorInput');
    const lineNumbers = document.getElementById('lineNumbers');

    function updateLineNumbers() {
        const lines = executorInput.value.split('\n').length;
        let nums = '';
        for (let i = 1; i <= lines; i++) {
            nums += i + '\n';
        }
        lineNumbers.textContent = nums;
    }

    executorInput.addEventListener('input', updateLineNumbers);
    executorInput.addEventListener('scroll', function() {
        lineNumbers.scrollTop = this.scrollTop;
    });

    // ========== EXECUTOR ==========
    const executorOutput = document.getElementById('executorOutput');

    function executeScript(code) {
        try {
            executorOutput.textContent = '';
            executorOutput.classList.remove('visible');

            const result = eval(code);

            if (result !== undefined) {
                executorOutput.textContent = '✅ Executado com sucesso\n\nRetorno: ' + String(result);
            } else {
                executorOutput.textContent = '✅ Script executado com sucesso';
            }
            executorOutput.classList.add('visible');
            showToast('Script executado', 'success');
        } catch (error) {
            executorOutput.textContent = '❌ Erro ao executar\n\n' + error.message;
            executorOutput.classList.add('visible');
            showToast('Erro: ' + error.message, 'error');
        }
    }

    document.getElementById('btnExecute').addEventListener('click', function() {
        const code = executorInput.value.trim();
        if (!code) {
            executorOutput.textContent = '⚠️ Digite ou cole um script para executar';
            executorOutput.classList.add('visible');
            showToast('Nenhum script', 'warning');
            return;
        }
        executeScript(code);
    });

    document.getElementById('btnPasteExec').addEventListener('click', function() {
        const userInput = prompt('📋 Cole seu script aqui:');
        if (userInput !== null) {
            executorInput.value = userInput;
            executorInput.dispatchEvent(new Event('input'));
            updateLineNumbers();
            showToast('Script colado', 'success');
        }
    });

    document.getElementById('btnClearExec').addEventListener('click', function() {
        executorInput.value = '';
        executorOutput.textContent = '';
        executorOutput.classList.remove('visible');
        updateLineNumbers();
        showToast('Campo limpo', 'info');
    });

    executorInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btnExecute').click();
        }
    });

    // ========== INICIAR ==========
    updateLineNumbers();
    console.log('✅ AiCode V2 carregado!');
    console.log('📱 Clique nos 3 pontinhos para abrir');

    setTimeout(() => showToast('AiCode V2 carregado', 'success'), 500);

})();
