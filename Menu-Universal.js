// ============================================
// AiCode v2 - Dark Theme (DeepSeek Style)
// COMPATÍVEL COM MOBILE + DESKTOP
// ============================================

(function() {
    'use strict';

    // ========== ESTILOS CSS ==========
    const styles = `
        /* ===== TOAST SYSTEM ===== */
        #aiCodeToastContainer {
            position: fixed;
            top: 70px;
            right: 12px;
            z-index: 1000000;
            display: flex;
            flex-direction: column;
            gap: 6px;
            max-width: 280px;
            pointer-events: none;
        }

        @media (min-width: 481px) {
            #aiCodeToastContainer {
                top: 80px;
                right: 20px;
                max-width: 360px;
                gap: 8px;
            }
        }

        .ai-toast {
            padding: 10px 14px;
            border-radius: 10px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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

        @media (min-width: 481px) {
            .ai-toast {
                padding: 12px 18px;
                font-size: 13px;
            }
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

        /* ===== OVERLAY ===== */
        #aiCodeOverlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.65);
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

        /* ===== CONTAINER PRINCIPAL ===== */
        #aiCodeContainer {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.92);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            width: 92vw;
            max-width: 480px;
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
                transform: translate(-50%, -50%) scale(0.9);
            }
            #aiCodeContainer.visible {
                transform: translate(-50%, -50%) scale(1);
            }
        }

        /* ===== BARRA DE DRAG ===== */
        #aiCodeDragHandle {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 40px;
            cursor: grab;
            z-index: 10;
            border-radius: 16px 16px 0 0;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            touch-action: none;
        }

        #aiCodeDragHandle:active {
            cursor: grabbing;
        }

        @media (max-width: 480px) {
            #aiCodeDragHandle {
                height: 44px;
            }
        }

        /* ===== BOTAO TOGGLE ===== */
        #aiCodeToggle {
            position: fixed;
            top: 14px;
            right: 14px;
            z-index: 999999;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #1A1F2B;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid #2D3548;
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

        #aiCodeToggle:hover {
            transform: scale(1.05);
            border-color: #3D465C;
        }

        #aiCodeToggle:active {
            transform: scale(0.88);
        }

        #aiCodeToggle svg {
            width: 22px;
            height: 22px;
            fill: #B0C4DE;
        }

        @media (min-width: 481px) {
            #aiCodeToggle {
                top: 20px;
                right: 20px;
                width: 44px;
                height: 44px;
            }
            #aiCodeToggle svg {
                width: 20px;
                height: 20px;
            }
        }

        /* ===== HEADER ===== */
        #aiCodeHeader {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px 10px 14px;
            background: transparent;
            border-bottom: 1px solid #2D3548;
            position: relative;
            z-index: 5;
            min-height: 44px;
        }

        #aiCodeHeader .mac-dots {
            display: flex;
            gap: 6px;
            flex-shrink: 0;
        }

        #aiCodeHeader .mac-dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            transition: all 0.2s;
        }

        #aiCodeHeader .mac-dot.red { background: #FF5F57; }
        #aiCodeHeader .mac-dot.yellow { background: #FFBD2E; }
        #aiCodeHeader .mac-dot.green { background: #28C840; }

        #aiCodeHeader .title {
            font-size: 14px;
            font-weight: 600;
            color: #E8EDF5;
            letter-spacing: -0.3px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
        }

        #aiCodeHeader .spacer {
            width: 44px;
            flex-shrink: 0;
        }

        @media (min-width: 481px) {
            #aiCodeHeader {
                padding: 14px 18px 12px 18px;
                min-height: 48px;
            }
            #aiCodeHeader .mac-dot {
                width: 13px;
                height: 13px;
                gap: 8px;
            }
            #aiCodeHeader .title {
                font-size: 15px;
            }
            #aiCodeHeader .spacer {
                width: 60px;
            }
        }

        /* ===== TABS ===== */
        #aiCodeTabs {
            display: flex;
            gap: 2px;
            padding: 8px 12px 0 12px;
            border-bottom: 1px solid #2D3548;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }

        #aiCodeTabs::-webkit-scrollbar {
            display: none;
        }

        #aiCodeTabs .tab {
            padding: 6px 14px;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            color: #8892A8;
            transition: all 0.2s;
            border: none;
            background: transparent;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            white-space: nowrap;
            flex-shrink: 0;
        }

        #aiCodeTabs .tab:active {
            transform: scale(0.92);
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

        @media (min-width: 481px) {
            #aiCodeTabs {
                padding: 12px 18px 0 18px;
                gap: 4px;
            }
            #aiCodeTabs .tab {
                padding: 8px 20px;
                font-size: 13px;
            }
        }

        /* ===== CONTEUDO ===== */
        #aiCodeContent {
            padding: 14px;
            overflow-y: auto;
            max-height: calc(85vh - 130px);
            -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 481px) {
            #aiCodeContent {
                padding: 18px;
                max-height: 500px;
            }
        }

        @media (max-width: 480px) {
            #aiCodeContent {
                max-height: calc(88vh - 120px);
                padding: 12px;
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
            font-size: 13px;
            color: #E8EDF5;
            font-weight: 500;
        }

        .toggle-label small {
            font-weight: 400;
            color: #8892A8;
            font-size: 11px;
            margin-left: 6px;
        }

        @media (min-width: 481px) {
            .toggle-label {
                font-size: 14px;
            }
            .toggle-label small {
                font-size: 12px;
            }
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
            font-size: 13px;
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
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #42A5F5;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(66, 165, 245, 0.3);
        }

        .slider-group input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #42A5F5;
            cursor: pointer;
            border: none;
        }

        @media (min-width: 481px) {
            .slider-group label {
                font-size: 14px;
            }
            .slider-group input[type="range"]::-webkit-slider-thumb {
                width: 16px;
                height: 16px;
            }
        }

        /* Botoes de acao */
        .action-buttons {
            display: none;
            gap: 8px;
            margin-top: 12px;
        }

        .action-buttons.visible {
            display: flex;
        }

        .action-buttons button {
            flex: 1;
            padding: 12px 12px;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
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

        .btn-cancel {
            background: #C62828;
            color: #E8EDF5;
        }

        @media (min-width: 481px) {
            .action-buttons {
                gap: 10px;
            }
            .action-buttons button {
                padding: 8px 16px;
                font-size: 13px;
            }
        }

        /* ===== EXECUTOR ===== */
        .executor-textarea {
            width: 100%;
            min-height: 90px;
            padding: 10px 12px;
            border: 1px solid #2D3548;
            border-radius: 8px;
            font-size: 13px;
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

        @media (min-width: 481px) {
            .executor-textarea {
                min-height: 120px;
                padding: 12px;
                font-size: 13px;
            }
        }

        @media (max-width: 480px) {
            .executor-textarea {
                min-height: 70px;
                font-size: 14px;
                padding: 10px;
            }
        }

        .executor-buttons {
            display: flex;
            gap: 6px;
            margin-top: 10px;
            flex-wrap: wrap;
        }

        .executor-buttons button {
            flex: 1;
            min-width: 60px;
            padding: 12px 10px;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .executor-buttons button:active {
            transform: scale(0.94);
        }

        .btn-execute {
            background: #1A73E8;
            color: #E8EDF5;
        }

        .btn-paste {
            background: #2E7D32;
            color: #E8EDF5;
        }

        .btn-clear-exec {
            background: #C62828;
            color: #E8EDF5;
        }

        @media (min-width: 481px) {
            .executor-buttons {
                gap: 8px;
                margin-top: 12px;
            }
            .executor-buttons button {
                padding: 8px 20px;
                font-size: 13px;
                min-width: auto;
            }
        }

        /* Output */
        #executorOutput {
            margin-top: 10px;
            padding: 10px 12px;
            background: #0D1117;
            border-radius: 8px;
            font-size: 11px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            color: #E8EDF5;
            max-height: 100px;
            overflow-y: auto;
            display: none;
            white-space: pre-wrap;
            word-break: break-all;
            border: 1px solid #2D3548;
            -webkit-overflow-scrolling: touch;
            -webkit-user-select: text;
            user-select: text;
        }

        #executorOutput.visible {
            display: block;
            animation: fadeIn 0.2s ease;
        }

        @media (min-width: 481px) {
            #executorOutput {
                margin-top: 12px;
                padding: 10px 12px;
                font-size: 12px;
                max-height: 150px;
            }
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

        /* ===== PREVENIR ZOOM EM INPUTS ===== */
        input, textarea, button {
            font-size: 16px !important;
        }

        @media (max-width: 480px) {
            input, textarea, button {
                font-size: 16px !important;
            }
        }
    `;

    // ========== HTML ==========
    const html = `
        <!-- Overlay -->
        <div id="aiCodeOverlay"></div>

        <!-- Container de Toast -->
        <div id="aiCodeToastContainer"></div>

        <!-- Botao toggle -->
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
    const overlay = document.getElementById('aiCodeOverlay');
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

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    function showExampleToasts() {
        setTimeout(() => showToast('AiCode v2 carregado', 'success'), 300);
        setTimeout(() => showToast('Arraste pela barra superior', 'info'), 1200);
        setTimeout(() => showToast('Toque fora para fechar', 'warning'), 2100);
    }

    // ========== ABRIR/FECHAR MENU ==========
    let isMenuVisible = false;

    function toggleMenu(show) {
        isMenuVisible = (show !== undefined) ? show : !isMenuVisible;
        
        mainContainer.classList.toggle('visible', isMenuVisible);
        overlay.classList.toggle('visible', isMenuVisible);
        toggleBtn.style.transform = isMenuVisible ? 'rotate(90deg)' : 'rotate(0deg)';
        document.body.style.overflow = isMenuVisible ? 'hidden' : '';
        
        if (isMenuVisible) {
            showExampleToasts();
        }
    }

    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', function() {
        toggleMenu(false);
    });

    // Fechar com ESC
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
            const label = this.closest('.toggle-group').querySelector('.toggle-label');
            if (label) {
                const name = label.textContent.trim().replace(/\(mostruario\)/, '').trim();
                const status = this.classList.contains('active') ? 'ativado' : 'desativado';
                showToast(`${name} ${status}`, 'info');
            }
        });
    });

    // ========== SLIDER ==========
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    speedSlider.addEventListener('input', function() {
        speedValue.textContent = this.value;
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
            showToast('Auto Digitador ativado', 'success');
        } else {
            actionButtons.classList.remove('visible');
            showToast('Auto Digitador desativado', 'warning');
        }
    });

    // ========== BOTAO PAUSAR ==========
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
            
            showToast(`Aba: ${this.textContent}`, 'info');
        });
    });

    // ========== SISTEMA DE DRAG (MOBILE + DESKTOP) ==========
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let startX = 0;
    let startY = 0;

    function getEventPos(e) {
        if (e.touches) {
            return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
        }
        return { clientX: e.clientX, clientY: e.clientY };
    }

    function onDragStart(e) {
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) {
            return;
        }
        
        const pos = getEventPos(e);
        const rect = mainContainer.getBoundingClientRect();
        dragOffsetX = pos.clientX - rect.left;
        dragOffsetY = pos.clientY - rect.top;
        startX = rect.left;
        startY = rect.top;
        isDragging = true;
        mainContainer.style.transition = 'none';
        mainContainer.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function onDragMove(e) {
        if (!isDragging) return;
        
        const pos = getEventPos(e);
        let newX = pos.clientX - dragOffsetX;
        let newY = pos.clientY - dragOffsetY;
        
        const rect = mainContainer.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        mainContainer.style.left = newX + 'px';
        mainContainer.style.top = newY + 'px';
        mainContainer.style.transform = 'none';
    }

    function onDragEnd() {
        if (isDragging) {
            isDragging = false;
            mainContainer.style.cursor = 'default';
            mainContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    // Mouse events
    dragHandle.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);

    // Touch events (mobile)
    dragHandle.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
    document.addEventListener('touchcancel', onDragEnd);

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
            showToast('Script executado', 'success');
        } catch (error) {
            executorOutput.textContent = 'Erro ao executar\n\n' + error.message;
            executorOutput.classList.add('visible');
            showToast('Erro: ' + error.message, 'error');
        }
    }

    document.getElementById('btnExecute').addEventListener('click', function() {
        const code = executorInput.value.trim();
        if (!code) {
            executorOutput.textContent = 'Digite ou cole um script para executar';
            executorOutput.classList.add('visible');
            showToast('Nenhum script', 'warning');
            return;
        }
        executeScript(code);
    });

    document.getElementById('btnPaste').addEventListener('click', function() {
        const userInput = prompt('Cole seu script aqui:');
        if (userInput !== null) {
            executorInput.value = userInput;
            executorInput.dispatchEvent(new Event('input'));
            showToast('Script colado', 'success');
        }
    });

    document.getElementById('btnClearExec').addEventListener('click', function() {
        executorInput.value = '';
        executorOutput.textContent = '';
        executorOutput.classList.remove('visible');
        showToast('Campo limpo', 'info');
    });

    executorInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btnExecute').click();
        }
    });

    // ========== INICIAR ==========
    console.log('✅ AiCode v2 Mobile carregado!');
    console.log('📱 Clique nos 3 pontinhos no canto superior direito');
    console.log('👆 Arraste pela barra superior para mover');

    setTimeout(() => showToast('AiCode v2 Mobile carregado', 'success'), 500);

})();
