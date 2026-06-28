// ============================================
// AiCode v2 - Dark Theme (DeepSeek Style)
// Menu Flutuante Arrastável com Sistema de Toast
// ============================================

(function() {
    'use strict';

    // ========== ESTILOS CSS ==========
    const styles = `
        /* ===== TOAST SYSTEM ===== */
        #aiCodeToastContainer {
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000000;
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-width: 360px;
            pointer-events: none;
        }

        .ai-toast {
            padding: 12px 18px;
            border-radius: 10px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 13px;
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

        .ai-toast.success {
            border-left: 3px solid #4CAF50;
        }

        .ai-toast.error {
            border-left: 3px solid #F44336;
        }

        .ai-toast.warning {
            border-left: 3px solid #FFA726;
        }

        .ai-toast.info {
            border-left: 3px solid #42A5F5;
        }

        @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes toastFadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(40px); }
        }

        /* ===== CONTAINER PRINCIPAL (DARK THEME) ===== */
        #aiCodeContainer {
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            width: 480px;
            background: #1A1F2B;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 14px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            display: none;
            max-height: 80vh;
            overflow: hidden;
            cursor: default;
            border: 1px solid #2D3548;
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

        /* ===== BARRA DE DRAG ===== */
        #aiCodeDragHandle {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 32px;
            cursor: grab;
            z-index: 10;
            border-radius: 14px 14px 0 0;
        }

        #aiCodeDragHandle:active {
            cursor: grabbing;
        }

        /* ===== BOTÃO TOGGLE (3 PONTINHOS) ===== */
        #aiCodeToggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #1A1F2B;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid #2D3548;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        }

        #aiCodeToggle:hover {
            transform: scale(1.05);
            border-color: #3D465C;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        #aiCodeToggle svg {
            width: 20px;
            height: 20px;
            fill: #B0C4DE;
        }

        /* ===== HEADER ===== */
        #aiCodeHeader {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 18px 12px 18px;
            background: transparent;
            border-bottom: 1px solid #2D3548;
            position: relative;
            z-index: 5;
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
            filter: brightness(0.8);
            transform: scale(0.92);
        }

        #aiCodeHeader .title {
            font-size: 15px;
            font-weight: 600;
            color: #E8EDF5;
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
            border-bottom: 1px solid #2D3548;
        }

        #aiCodeTabs .tab {
            padding: 8px 20px;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: #8892A8;
            transition: all 0.2s;
            border: none;
            background: transparent;
            font-family: inherit;
        }

        #aiCodeTabs .tab:hover {
            color: #E8EDF5;
            background: rgba(255, 255, 255, 0.04);
        }

        #aiCodeTabs .tab.active {
            color: #E8EDF5;
            background: rgba(255, 255, 255, 0.06);
            position: relative;
        }

        #aiCodeTabs .tab.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 20%;
            right: 20%;
            height: 3px;
            background: #42A5F5;
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
            border-bottom: 1px solid #2D3548;
        }

        .toggle-group:last-child {
            border-bottom: none;
        }

        .toggle-label {
            font-size: 14px;
            color: #E8EDF5;
            font-weight: 500;
        }

        .toggle-label small {
            font-weight: 400;
            color: #8892A8;
            font-size: 12px;
            margin-left: 6px;
        }

        /* Toggle switch */
        .toggle-switch {
            position: relative;
            width: 44px;
            height: 24px;
            background: #2D3548;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            flex-shrink: 0;
        }

        .toggle-switch.active {
            background: #42A5F5;
        }

        .toggle-switch .knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
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
            font-size: 14px;
            color: #E8EDF5;
            font-weight: 500;
            margin-bottom: 8px;
        }

        .slider-group label span {
            color: #42A5F5;
            font-weight: 600;
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
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #42A5F5;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(66, 165, 245, 0.3);
        }

        .slider-group input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #42A5F5;
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
            background: #F57C00;
            color: #E8EDF5;
        }

        .btn-pause:hover {
            background: #E65100;
        }

        .btn-pause.paused {
            background: #2E7D32;
        }

        .btn-pause.paused:hover {
            background: #1B5E20;
        }

        .btn-cancel {
            background: #C62828;
            color: #E8EDF5;
        }

        .btn-cancel:hover {
            background: #B71C1C;
        }

        /* ===== EXECUTOR ===== */
        .executor-textarea {
            width: 100%;
            min-height: 120px;
            padding: 12px;
            border: 1px solid #2D3548;
            border-radius: 8px;
            font-size: 13px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            resize: vertical;
            background: #121620;
            color: #E8EDF5;
            transition: all 0.2s;
            box-sizing: border-box;
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
            background: #1A73E8;
            color: #E8EDF5;
        }

        .btn-execute:hover {
            background: #1557B0;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
        }

        .btn-paste {
            background: #2E7D32;
            color: #E8EDF5;
        }

        .btn-paste:hover {
            background: #1B5E20;
            transform: translateY(-1px);
        }

        .btn-clear-exec {
            background: #C62828;
            color: #E8EDF5;
        }

        .btn-clear-exec:hover {
            background: #B71C1C;
            transform: translateY(-1px);
        }

        /* Output */
        #executorOutput {
            margin-top: 12px;
            padding: 10px 12px;
            background: #0D1117;
            border-radius: 8px;
            font-size: 12px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            color: #E8EDF5;
            max-height: 150px;
            overflow-y: auto;
            display: none;
            white-space: pre-wrap;
            word-break: break-all;
            border: 1px solid #2D3548;
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
            background: #2D3548;
            border-radius: 2px;
        }

        #aiCodeContent::-webkit-scrollbar-thumb:hover,
        #executorOutput::-webkit-scrollbar-thumb:hover {
            background: #3D465C;
        }
    `;

    // ========== HTML ==========
    const html = `
        <!-- Container de Toast -->
        <div id="aiCodeToastContainer"></div>

        <!-- Botão toggle (3 pontinhos) -->
        <button id="aiCodeToggle" aria-label="Abrir AiCode v2">
            <svg viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2.5"/>
                <circle cx="12" cy="12" r="2.5"/>
                <circle cx="19" cy="12" r="2.5"/>
            </svg>
        </button>

        <!-- Container principal -->
        <div id="aiCodeContainer">
            <!-- Drag Handle -->
            <div id="aiCodeDragHandle"></div>

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

            <!-- Conteudo -->
            <div id="aiCodeContent">
                <!-- Tab General -->
                <div class="tab-content active" id="tab-general">
                    <div class="toggle-group">
                        <span class="toggle-label">Unlock Paste <small>(mostruario)</small></span>
                        <div class="toggle-switch" data-toggle="unlockPaste">
                            <div class="knob"></div>
                        </div>
                    </div>

                    <div class="toggle-group">
                        <span class="toggle-label">Auto Digitador <small>(mostruario)</small></span>
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
                        <button class="btn-pause" id="btnPause">Pausar</button>
                        <button class="btn-cancel" id="btnCancel">Cancelar</button>
                    </div>
                </div>

                <!-- Tab Executor -->
                <div class="tab-content" id="tab-executor">
                    <textarea class="executor-textarea" id="executorInput" placeholder="Cole ou digite seu script aqui..."></textarea>

                    <div class="executor-buttons">
                        <button class="btn-execute" id="btnExecute">Executar</button>
                        <button class="btn-paste" id="btnPaste">Colar</button>
                        <button class="btn-clear-exec" id="btnClearExec">Limpar</button>
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
    const mainContainer = document.getElementById('aiCodeContainer');
    const dragHandle = document.getElementById('aiCodeDragHandle');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = {
        general: document.getElementById('tab-general'),
        executor: document.getElementById('tab-executor')
    };
    const toastContainer = document.getElementById('aiCodeToastContainer');

    // ========== SISTEMA DE TOAST ==========
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `ai-toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Remove após 3 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    // ========== TOSTS DE EXEMPLO AO ABRIR ==========
    function showExampleToasts() {
        setTimeout(() => showToast('AiCode v2 carregado com sucesso', 'success'), 300);
        setTimeout(() => showToast('Sistema de toasts ativo', 'info'), 1200);
        setTimeout(() => showToast('Arraste o menu pela barra superior', 'warning'), 2100);
    }

    // ========== TOGGLES (APENAS MOSTRUARIO) ==========
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            const label = this.closest('.toggle-group').querySelector('.toggle-label');
            if (label) {
                const name = label.textContent.trim().replace(/\(mostruario\)/, '').trim();
                const status = this.classList.contains('active') ? 'ativado' : 'desativado';
                showToast(`${name} ${status}`, 'info');
            }
        });
    });

    // ========== SLIDER DE VELOCIDADE ==========
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    speedSlider.addEventListener('input', function() {
        speedValue.textContent = this.value;
        showToast(`Velocidade ajustada para ${this.value}ms`, 'info');
    });

    // ========== AUTO DIGITADOR - MOSTRA/ESCONDE BOTOES ==========
    const autoDigitadorToggle = document.querySelector('[data-toggle="autoDigitador"]');
    const actionButtons = document.getElementById('actionButtons');

    autoDigitadorToggle.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            actionButtons.classList.add('visible');
            const btnPause = document.getElementById('btnPause');
            btnPause.textContent = 'Pausar';
            btnPause.classList.remove('paused');
            showToast('Auto Digitador ativado - botoes disponiveis', 'success');
        } else {
            actionButtons.classList.remove('visible');
            showToast('Auto Digitador desativado', 'warning');
        }
    });

    // ========== BOTAO PAUSAR/PLAY ==========
    const btnPause = document.getElementById('btnPause');
    btnPause.addEventListener('click', function() {
        if (this.classList.contains('paused')) {
            this.textContent = 'Pausar';
            this.classList.remove('paused');
            showToast('Execucao retomada', 'success');
        } else {
            this.textContent = 'Play';
            this.classList.add('paused');
            showToast('Execucao pausada', 'warning');
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
        showToast('Auto Digitador cancelado', 'error');
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
            
            showToast(`Aba "${this.textContent}" selecionada`, 'info');
        });
    });

    // ========== TOGGLE DO MENU ==========
    let isMenuVisible = false;

    toggleBtn.addEventListener('click', function() {
        isMenuVisible = !isMenuVisible;
        mainContainer.classList.toggle('visible', isMenuVisible);
        this.style.transform = isMenuVisible ? 'rotate(90deg)' : 'rotate(0deg)';
        
        if (isMenuVisible) {
            showExampleToasts();
        }
    });

    // ========== FECHAR AO CLICAR FORA ==========
    document.addEventListener('click', function(event) {
        if (isMenuVisible && 
            !mainContainer.contains(event.target) && 
            !toggleBtn.contains(event.target)) {
            isMenuVisible = false;
            mainContainer.classList.remove('visible');
            toggleBtn.style.transform = 'rotate(0deg)';
        }
    });

    // ========== SISTEMA DE DRAG ==========
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    dragHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        const rect = mainContainer.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        mainContainer.style.cursor = 'grabbing';
        mainContainer.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        let newX = e.clientX - dragOffsetX;
        let newY = e.clientY - dragOffsetY;
        
        // Limita na tela
        const rect = mainContainer.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        mainContainer.style.left = newX + 'px';
        mainContainer.style.top = newY + 'px';
        mainContainer.style.transform = 'none';
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            mainContainer.style.cursor = 'default';
            mainContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });

    // ========== EXECUTOR ==========
    const executorInput = document.getElementById('executorInput');
    const executorOutput = document.getElementById('executorOutput');

    function executeScript(code) {
        try {
            executorOutput.textContent = '';
            executorOutput.classList.remove('visible');

            const result = eval(code);

            if (result !== undefined) {
                executorOutput.textContent = 'Executado com sucesso\n\nRetorno: ' + String(result);
            } else {
                executorOutput.textContent = 'Script executado com sucesso';
            }
            executorOutput.classList.add('visible');
            showToast('Script executado com sucesso', 'success');
        } catch (error) {
            executorOutput.textContent = 'Erro ao executar\n\n' + error.message;
            executorOutput.classList.add('visible');
            showToast('Erro na execucao: ' + error.message, 'error');
        }
    }

    // ========== BOTAO EXECUTAR ==========
    document.getElementById('btnExecute').addEventListener('click', function() {
        const code = executorInput.value.trim();
        if (!code) {
            executorOutput.textContent = 'Digite ou cole um script para executar';
            executorOutput.classList.add('visible');
            showToast('Nenhum script para executar', 'warning');
            return;
        }
        executeScript(code);
    });

    // ========== BOTAO COLAR (POPUP PROPRIO) ==========
    document.getElementById('btnPaste').addEventListener('click', function() {
        const userInput = prompt('Cole seu script aqui:');
        if (userInput !== null) {
            executorInput.value = userInput;
            executorInput.dispatchEvent(new Event('input'));
            showToast('Script colado com sucesso', 'success');
        } else {
            showToast('Operacao cancelada', 'warning');
        }
    });

    // ========== BOTAO LIMPAR ==========
    document.getElementById('btnClearExec').addEventListener('click', function() {
        executorInput.value = '';
        executorOutput.textContent = '';
        executorOutput.classList.remove('visible');
        showToast('Campo limpo', 'info');
    });

    // ========== ATALHO: CTRL+ENTER ==========
    executorInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btnExecute').click();
        }
    });

    // ========== INICIAR ==========
    console.log('AiCode v2 (Dark Theme) carregado');
    console.log('Clique nos 3 pontinhos para abrir');
    console.log('Arraste o menu pela barra superior');

    // Toast inicial
    setTimeout(() => showToast('AiCode v2 Dark Theme carregado', 'success'), 500);

})();
