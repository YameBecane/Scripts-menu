// ============================================
// AiCode v2 - Menu Flutuante com Interface macOS
// ============================================

(function() {
    'use strict';

    // ========== ESTILOS CSS ==========
    const styles = `
        /* Container principal */
        #aiCodeContainer {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            width: 480px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 14px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25), 0 2px 10px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            display: none;
            max-height: 80vh;
            overflow: hidden;
        }

        #aiCodeContainer.visible {
            display: block;
            animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
            }
        }

        /* Botão toggle (3 pontinhos do macOS) */
        #aiCodeToggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        }

        #aiCodeToggle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        #aiCodeToggle svg {
            width: 20px;
            height: 20px;
            fill: #1a1a1a;
        }

        /* ===== HEADER ===== */
        #aiCodeHeader {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 18px;
            background: transparent;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        #aiCodeHeader .mac-dots {
            display: flex;
            gap: 8px;
        }

        #aiCodeHeader .mac-dot {
            width: 13px;
            height: 13px;
            border-radius: 50%;
            transition: all 0.2s;
        }

        #aiCodeHeader .mac-dot.red { background: #FF5F57; }
        #aiCodeHeader .mac-dot.yellow { background: #FFBD2E; }
        #aiCodeHeader .mac-dot.green { background: #28C840; }

        #aiCodeHeader .mac-dot:hover {
            filter: brightness(0.9);
            transform: scale(0.95);
        }

        #aiCodeHeader .title {
            font-size: 15px;
            font-weight: 600;
            color: #1a1a1a;
            letter-spacing: -0.3px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        #aiCodeHeader .spacer {
            width: 60px;
        }

        /* ===== TABS ===== */
        #aiCodeTabs {
            display: flex;
            gap: 4px;
            padding: 12px 18px 0 18px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        #aiCodeTabs .tab {
            padding: 8px 20px;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: #6e6e6e;
            transition: all 0.2s;
            border: none;
            background: transparent;
            font-family: inherit;
        }

        #aiCodeTabs .tab:hover {
            color: #1a1a1a;
            background: rgba(0, 0, 0, 0.04);
        }

        #aiCodeTabs .tab.active {
            color: #1a1a1a;
            background: rgba(0, 0, 0, 0.06);
            position: relative;
        }

        #aiCodeTabs .tab.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 20%;
            right: 20%;
            height: 3px;
            background: #007AFF;
            border-radius: 3px 3px 0 0;
        }

        /* ===== CONTEÚDO ===== */
        #aiCodeContent {
            padding: 18px;
            overflow-y: auto;
            max-height: 500px;
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
        .toggle-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .toggle-group:last-child {
            border-bottom: none;
        }

        .toggle-label {
            font-size: 14px;
            color: #1a1a1a;
            font-weight: 500;
        }

        .toggle-label small {
            font-weight: 400;
            color: #6e6e6e;
            font-size: 12px;
            margin-left: 6px;
        }

        /* Toggle switch */
        .toggle-switch {
            position: relative;
            width: 44px;
            height: 24px;
            background: #e0e0e0;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            flex-shrink: 0;
        }

        .toggle-switch.active {
            background: #007AFF;
        }

        .toggle-switch .knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            transition: all 0.3s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .toggle-switch.active .knob {
            left: 22px;
        }

        /* Slider */
        .slider-group {
            padding: 14px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .slider-group label {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #1a1a1a;
            font-weight: 500;
            margin-bottom: 8px;
        }

        .slider-group label span {
            color: #007AFF;
            font-weight: 600;
        }

        .slider-group input[type="range"] {
            width: 100%;
            height: 4px;
            -webkit-appearance: none;
            appearance: none;
            background: #e0e0e0;
            border-radius: 2px;
            outline: none;
        }

        .slider-group input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #007AFF;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
        }

        .slider-group input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #007AFF;
            cursor: pointer;
            border: none;
        }

        /* Botões de ação */
        .action-buttons {
            display: none;
            gap: 10px;
            margin-top: 12px;
        }

        .action-buttons.visible {
            display: flex;
        }

        .action-buttons button {
            flex: 1;
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }

        .btn-pause {
            background: #FF9F0A;
            color: white;
        }

        .btn-pause:hover {
            background: #e68e00;
        }

        .btn-pause.paused {
            background: #28C840;
        }

        .btn-pause.paused:hover {
            background: #1fb03a;
        }

        .btn-cancel {
            background: #FF3B30;
            color: white;
        }

        .btn-cancel:hover {
            background: #e6352b;
        }

        /* ===== EXECUTOR ===== */
        .executor-textarea {
            width: 100%;
            min-height: 120px;
            padding: 12px;
            border: 1px solid #d1d1d1;
            border-radius: 8px;
            font-size: 13px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            resize: vertical;
            background: #f8f8f8;
            color: #1a1a1a;
            transition: all 0.2s;
            box-sizing: border-box;
        }

        .executor-textarea:focus {
            outline: none;
            border-color: #007AFF;
            background: white;
            box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
        }

        .executor-buttons {
            display: flex;
            gap: 8px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .executor-buttons button {
            padding: 8px 20px;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }

        .btn-execute {
            background: #007AFF;
            color: white;
        }

        .btn-execute:hover {
            background: #0066d6;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .btn-paste {
            background: #34C759;
            color: white;
        }

        .btn-paste:hover {
            background: #2db84e;
            transform: translateY(-1px);
        }

        .btn-clear-exec {
            background: #FF3B30;
            color: white;
        }

        .btn-clear-exec:hover {
            background: #e6352b;
            transform: translateY(-1px);
        }

        /* Output */
        #executorOutput {
            margin-top: 12px;
            padding: 10px 12px;
            background: #f0f0f0;
            border-radius: 8px;
            font-size: 12px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            color: #1a1a1a;
            max-height: 150px;
            overflow-y: auto;
            display: none;
            white-space: pre-wrap;
            word-break: break-all;
        }

        #executorOutput.visible {
            display: block;
            animation: fadeIn 0.2s ease;
        }

        /* Scrollbar personalizada */
        #aiCodeContent::-webkit-scrollbar,
        #executorOutput::-webkit-scrollbar {
            width: 4px;
        }

        #aiCodeContent::-webkit-scrollbar-track,
        #executorOutput::-webkit-scrollbar-track {
            background: transparent;
        }

        #aiCodeContent::-webkit-scrollbar-thumb,
        #executorOutput::-webkit-scrollbar-thumb {
            background: #c0c0c0;
            border-radius: 2px;
        }

        #aiCodeContent::-webkit-scrollbar-thumb:hover,
        #executorOutput::-webkit-scrollbar-thumb:hover {
            background: #a0a0a0;
        }
    `;

    // ========== HTML ==========
    const html = `
        <!-- Botão toggle (3 pontinhos macOS) -->
        <button id="aiCodeToggle" aria-label="Abrir AiCode v2">
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
                <div class="mac-dots">
                    <span class="mac-dot red"></span>
                    <span class="mac-dot yellow"></span>
                    <span class="mac-dot green"></span>
                </div>
                <span class="title">AiCode v2</span>
                <div class="spacer"></div>
            </div>

            <!-- Tabs -->
            <div id="aiCodeTabs">
                <button class="tab active" data-tab="general">General</button>
                <button class="tab" data-tab="executor">Executor</button>
            </div>

            <!-- Conteúdo -->
            <div id="aiCodeContent">
                <!-- Tab General -->
                <div class="tab-content active" id="tab-general">
                    <div class="toggle-group">
                        <span class="toggle-label">Unlock Paste <small>(mostruário)</small></span>
                        <div class="toggle-switch" data-toggle="unlockPaste">
                            <div class="knob"></div>
                        </div>
                    </div>

                    <div class="toggle-group">
                        <span class="toggle-label">Auto Digitador <small>(mostruário)</small></span>
                        <div class="toggle-switch" data-toggle="autoDigitador">
                            <div class="knob"></div>
                        </div>
                    </div>

                    <div class="slider-group">
                        <label>
                            Velocidade (MS)
                            <span id="speedValue">50</span>
                        </label>
                        <input type="range" id="speedSlider" min="1" max="100" value="50">
                    </div>

                    <div class="action-buttons" id="actionButtons">
                        <button class="btn-pause" id="btnPause">⏸ Pausar</button>
                        <button class="btn-cancel" id="btnCancel">✕ Cancelar</button>
                    </div>
                </div>

                <!-- Tab Executor -->
                <div class="tab-content" id="tab-executor">
                    <textarea class="executor-textarea" id="executorInput" placeholder="Cole ou digite seu script aqui..."></textarea>
                    
                    <div class="executor-buttons">
                        <button class="btn-execute" id="btnExecute">▶ Executar</button>
                        <button class="btn-paste" id="btnPaste">📋 Colar</button>
                        <button class="btn-clear-exec" id="btnClearExec">🗑 Limpar</button>
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

    // ========== REFERÊNCIAS ==========
    const toggleBtn = document.getElementById('aiCodeToggle');
    const mainContainer = document.getElementById('aiCodeContainer');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = {
        general: document.getElementById('tab-general'),
        executor: document.getElementById('tab-executor')
    };

    // Toggles (apenas mostruário)
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    });

    // Slider de velocidade
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    speedSlider.addEventListener('input', function() {
        speedValue.textContent = this.value;
    });

    // Auto Digitador - mostra/esconde botões
    const autoDigitadorToggle = document.querySelector('[data-toggle="autoDigitador"]');
    const actionButtons = document.getElementById('actionButtons');
    
    autoDigitadorToggle.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            actionButtons.classList.add('visible');
            // Resetar botão pause para "Pausar"
            const btnPause = document.getElementById('btnPause');
            btnPause.textContent = '⏸ Pausar';
            btnPause.classList.remove('paused');
        } else {
            actionButtons.classList.remove('visible');
        }
    });

    // Botão Pausar/Play
    const btnPause = document.getElementById('btnPause');
    btnPause.addEventListener('click', function() {
        if (this.classList.contains('paused')) {
            this.textContent = '⏸ Pausar';
            this.classList.remove('paused');
        } else {
            this.textContent = '▶ Play';
            this.classList.add('paused');
        }
    });

    // Botão Cancelar
    document.getElementById('btnCancel').addEventListener('click', function() {
        const autoToggle = document.querySelector('[data-toggle="autoDigitador"]');
        autoToggle.classList.remove('active');
        actionButtons.classList.remove('visible');
        const btnPause = document.getElementById('btnPause');
        btnPause.textContent = '⏸ Pausar';
        btnPause.classList.remove('paused');
    });

    // ===== TABS =====
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Mostra o conteúdo correto
            const tabName = this.dataset.tab;
            Object.keys(tabContents).forEach(key => {
                tabContents[key].classList.toggle('active', key === tabName);
            });
        });
    });

    // ===== TOGGLE DO MENU =====
    let isMenuVisible = false;

    toggleBtn.addEventListener('click', function() {
        isMenuVisible = !isMenuVisible;
        mainContainer.classList.toggle('visible', isMenuVisible);
        this.style.transform = isMenuVisible ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function(event) {
        if (isMenuVisible && 
            !mainContainer.contains(event.target) && 
            !toggleBtn.contains(event.target)) {
            isMenuVisible = false;
            mainContainer.classList.remove('visible');
            toggleBtn.style.transform = 'rotate(0deg)';
        }
    });

    // ===== EXECUTOR =====
    const executorInput = document.getElementById('executorInput');
    const executorOutput = document.getElementById('executorOutput');

    // Função para executar script
    function executeScript(code) {
        try {
            // Limpa output anterior
            executorOutput.textContent = '';
            executorOutput.classList.remove('visible');

            // Executa o código
            const result = eval(code);
            
            // Mostra resultado
            if (result !== undefined) {
                executorOutput.textContent = '✅ Executado com sucesso!\n\nRetorno: ' + String(result);
            } else {
                executorOutput.textContent = '✅ Script executado com sucesso!';
            }
            executorOutput.classList.add('visible');
        } catch (error) {
            executorOutput.textContent = '❌ Erro ao executar:\n\n' + error.message;
            executorOutput.classList.add('visible');
        }
    }

    // Botão Executar
    document.getElementById('btnExecute').addEventListener('click', function() {
        const code = executorInput.value.trim();
        if (!code) {
            executorOutput.textContent = '⚠️ Digite ou cole um script para executar.';
            executorOutput.classList.add('visible');
            return;
        }
        executeScript(code);
    });

    // Botão Colar com popup próprio
    document.getElementById('btnPaste').addEventListener('click', function() {
        const userInput = prompt('📋 Cole seu script aqui:');
        if (userInput !== null) {
            executorInput.value = userInput;
            // Dispara evento para atualizar
            executorInput.dispatchEvent(new Event('input'));
        }
    });

    // Botão Limpar
    document.getElementById('btnClearExec').addEventListener('click', function() {
        executorInput.value = '';
        executorOutput.textContent = '';
        executorOutput.classList.remove('visible');
    });

    // Atalho: Ctrl+Enter para executar
    executorInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btnExecute').click();
        }
    });

    // ========== INICIAR ==========
    console.log('🚀 AiCode v2 carregado! Clique nos 3 pontinhos para abrir.');
})();
