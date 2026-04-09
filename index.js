<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A&M Nebula | شات عام + AI - منصة الدراسة الجماعية</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Cairo', sans-serif;
        }

        body {
            min-height: 100vh;
            background: radial-gradient(circle at 10% 20%, #0a0f1e, #03050b);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px;
        }

        /* شاشة الدخول */
        .login-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(5, 15, 30, 0.95);
            backdrop-filter: blur(20px);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-card {
            background: rgba(5, 15, 30, 0.9);
            border-radius: 48px;
            padding: 40px 32px;
            width: 90%;
            max-width: 420px;
            border: 1px solid rgba(0, 255, 255, 0.4);
            text-align: center;
        }

        .avatar-select {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .avatar-option {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00d4ff, #0066ff);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .avatar-option.selected {
            border-color: #ffd700;
            transform: scale(1.1);
            box-shadow: 0 0 15px gold;
        }

        .avatar-option i {
            font-size: 1.6rem;
            color: white;
        }

        .username-input {
            width: 100%;
            padding: 14px 20px;
            border-radius: 60px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(0, 255, 255, 0.4);
            color: white;
            font-size: 1rem;
            text-align: center;
            margin: 15px 0;
        }

        .login-btn {
            background: linear-gradient(145deg, #00c9b0, #0077ee);
            border: none;
            padding: 14px 28px;
            border-radius: 60px;
            color: white;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            font-size: 1rem;
        }

        /* واجهة الشات الرئيسية */
        .chat-container {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 1400px;
            height: 94vh;
            background: rgba(8, 12, 25, 0.75);
            backdrop-filter: blur(12px);
            border-radius: 32px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(0, 255, 255, 0.2);
        }

        .header {
            padding: 14px 20px;
            border-bottom: 1px solid rgba(0, 255, 255, 0.3);
            background: rgba(0, 0, 0, 0.4);
        }

        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }

        .logo h2 {
            font-size: 1.2rem;
            background: linear-gradient(135deg, #0ff, #6f5eff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .online-count {
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 255, 0, 0.15);
            padding: 4px 12px;
            border-radius: 40px;
            font-size: 0.7rem;
        }

        .online-dot {
            width: 8px;
            height: 8px;
            background: #0f0;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }

        /* وضع AI */
        .ai-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(0, 0, 0, 0.5);
            padding: 4px 12px;
            border-radius: 40px;
        }

        .ai-toggle span {
            font-size: 0.7rem;
            color: #aaf0ff;
        }

        .toggle-switch {
            width: 40px;
            height: 20px;
            background: #333;
            border-radius: 20px;
            cursor: pointer;
            position: relative;
            transition: 0.3s;
        }

        .toggle-switch.active {
            background: #00c9b0;
        }

        .toggle-switch::after {
            content: '';
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 3px;
            transition: 0.3s;
        }

        .toggle-switch.active::after {
            left: 21px;
        }

        /* منطقة الرسائل */
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .message {
            display: flex;
            gap: 10px;
            max-width: 80%;
            animation: slideIn 0.2s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .my-message {
            align-self: flex-end;
            flex-direction: row-reverse;
        }

        .other-message {
            align-self: flex-start;
        }

        .ai-message {
            align-self: flex-start;
        }

        .message-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00d4ff, #0066ff);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .message-avatar i {
            font-size: 1.2rem;
            color: white;
        }

        .message-bubble {
            background: rgba(25, 35, 60, 0.95);
            border-radius: 18px;
            padding: 8px 14px;
            max-width: 100%;
        }

        .my-message .message-bubble {
            background: rgba(0, 180, 216, 0.25);
            border: 1px solid rgba(0, 255, 200, 0.4);
        }

        .message-name {
            font-size: 0.65rem;
            font-weight: bold;
            color: #7effe6;
            margin-bottom: 4px;
        }

        .message-text {
            font-size: 0.85rem;
            color: #f0f3fa;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .message-time {
            font-size: 0.5rem;
            color: #8a9ac0;
            margin-top: 4px;
            text-align: left;
        }

        /* منطقة الإدخال */
        .input-area {
            padding: 12px 16px 16px;
            background: rgba(0, 0, 0, 0.4);
            border-top: 1px solid rgba(0, 255, 255, 0.2);
        }

        .input-wrapper {
            display: flex;
            gap: 10px;
            background: rgba(12, 18, 32, 0.9);
            border-radius: 60px;
            padding: 6px 12px;
            border: 1px solid rgba(0, 255, 255, 0.3);
        }

        .message-input {
            flex: 1;
            background: transparent;
            border: none;
            color: white;
            font-size: 0.85rem;
            resize: none;
            min-height: 40px;
            max-height: 80px;
            padding: 8px 4px;
        }

        .send-btn {
            background: linear-gradient(145deg, #00b4aa, #0066cc);
            border: none;
            color: white;
            border-radius: 50%;
            width: 42px;
            height: 42px;
            cursor: pointer;
        }

        .typing-indicator {
            font-size: 0.6rem;
            color: #8ab3ff;
            padding: 4px 12px;
        }

        @media (max-width: 600px) {
            .message { max-width: 95%; }
            .message-avatar { width: 35px; height: 35px; }
            .message-avatar i { font-size: 1rem; }
        }
    </style>
</head>
<body>

<!-- شاشة الدخول -->
<div id="loginOverlay" class="login-overlay">
    <div class="login-card">
        <i class="fas fa-users" style="font-size: 2.5rem; color: #0ff;"></i>
        <h2 style="color: #0ff; margin: 15px 0 5px;">A&M Nebula</h2>
        <p style="color: #8ab3ff;">شات عام + ذكاء اصطناعي للدراسة</p>
        
        <div class="avatar-select" id="avatarSelect">
            <div class="avatar-option selected" data-avatar="👩‍🎓">
                <i class="fas fa-user-graduate"></i>
            </div>
            <div class="avatar-option" data-avatar="👩‍🔬">
                <i class="fas fa-flask"></i>
            </div>
            <div class="avatar-option" data-avatar="👩‍💻">
                <i class="fas fa-laptop-code"></i>
            </div>
            <div class="avatar-option" data-avatar="🌟">
                <i class="fas fa-star"></i>
            </div>
            <div class="avatar-option" data-avatar="📚">
                <i class="fas fa-book"></i>
            </div>
        </div>
        
        <input type="text" id="usernameInput" class="username-input" placeholder="اسم المستخدم" maxlength="25">
        
        <button id="joinBtn" class="login-btn">
            <i class="fas fa-sign-in-alt"></i> دخول إلى الشات العام
        </button>
        
        <div id="loginError" style="color: #ff6b6b; margin-top: 12px; font-size: 0.75rem;"></div>
    </div>
</div>

<!-- واجهة الشات -->
<div id="chatApp" class="chat-container" style="display: none;">
    <div class="header">
        <div class="header-top">
            <div class="logo">
                <h2><i class="fas fa-comments"></i> الشات العام | A&M Nebula</h2>
            </div>
            <div class="online-count">
                <div class="online-dot"></div>
                <span id="onlineCount">0</span> متصل
            </div>
            <div class="ai-toggle">
                <span><i class="fas fa-robot"></i> AI</span>
                <div id="aiToggle" class="toggle-switch"></div>
                <span id="aiStatus" style="font-size: 0.65rem;">إيقاف</span>
            </div>
        </div>
    </div>

    <div class="chat-messages" id="chatMessages"></div>
    
    <div id="typingIndicator" class="typing-indicator" style="display: none;">
        <span>شخص يكتب...</span>
    </div>

    <div class="input-area">
        <div class="input-wrapper">
            <textarea id="messageInput" class="message-input" rows="1" placeholder="اكتب رسالتك... استخدم @AI ليسأل الذكاء الاصطناعي"></textarea>
            <button id="sendBtn" class="send-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
</div>

<script>
    // ==================== إعدادات ====================
    let currentUser = null;
    let messages = [];
    let onlineUsers = new Map();
    let isAIActive = false;
    
    // 🔥 المفتاح سيتم حقنه بواسطة GitHub Actions
    // قيمة افتراضية للاختبار المحلي فقط - سيتم استبدالها أثناء النشر
    let GROQ_API_KEY = "GROQ_API_KEY_PLACEHOLDER";
    
    let typingTimeout = null;
    
    // معرف فريد للجلسة
    const sessionId = localStorage.getItem('sessionId') || 'session_' + Date.now() + '_' + Math.random();
    localStorage.setItem('sessionId', sessionId);
    
    // ==================== البرومبت المحسن للمعلم الأزهري ====================
    function getSystemPrompt() {
        return `أنت فضيلة الشيخ، معلم أزهري متخصص في تدريس الصف الثاني الثانوي 2026.

الشخصية:
- تتحدث بالعامية المصرية مع لمسات من الفصحى البسيطة
- أسلوبك حنون ولطيف ومشجع، مثل الأب الروحي للطالبات
- تستخدم الإيموجيز المناسبة 😊📚🕌

القواعد المهمة:
1. أجب فقط بناءً على معلوماتك كمعلم أزهري متخصص في المنهج الأزهري
2. إذا سُئلت عن شيء خارج المنهج أو لا تعرفه، قل بلطف: "ده مش في منهجنا يا بنتي، لكن ممكن أساعدك في أي سؤال تاني 😊"
3. شجع الطالبات دائمًا على المذاكرة وحب العلم
4. استخدم آيات قرآنية وأحاديث نبوية مناسبة عند الشرح
5. خاطب الطالبة بكلمة "يا بنتي" أو "يا حبيبتي" بحنان
6. إذا كان السؤال دراسي، اشرحه بطريقة مبسطة مع أمثلة
7. اجعل إجابتك من 3-5 جمل قصيرة وواضحة

مثال للرد على سؤال دراسي:
"أهلاً يا حبيبتي 😊، سؤالك جميل جداً. خليني أشرحلك قاعدة الوصايا ببساطة..."

مثال للرد على سؤال خارج المنهج:
"يا بنتي، ده مش في منهج الصف الثاني الثانوي للأسف 😅، لكن اسأليني في أي حاجة تانية من المنهج وأنا أجاوبك بكل حب 💕"`;
    }
    
    // ==================== استدعاء Groq API ====================
    async function callGroq(question) {
    if (GROQ_API_KEY === "GROQ_API_KEY_PLACEHOLDER" || GROQ_API_KEY === "") {
        console.error("API Key is missing");
        return "⚠️ عذراً، لم يتم تكوين مفتاح API. الرجاء التواصل مع المسؤول.";
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-4-scout-17b-16e-instruct',
                messages: [
                    { role: 'system', content: getSystemPrompt() },
                    { role: 'user', content: question }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error('API Error');
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error(error);
        return "⚠️ حصل خطأ في الاتصال بالذكاء الاصطناعي، حاول تاني 😊";
    }
}
    // ==================== إدارة الرسائل ====================
    function saveMessages() {
        const toSave = messages.slice(-200);
        localStorage.setItem('public_chat_messages', JSON.stringify(toSave));
    }
    
    function loadMessages() {
        const stored = localStorage.getItem('public_chat_messages');
        if (stored) {
            try {
                messages = JSON.parse(stored);
                renderMessages();
            } catch(e) {}
        }
    }
    
    function renderMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        container.innerHTML = '';
        messages.forEach(msg => {
            container.appendChild(createMessageElement(msg));
        });
        scrollToBottom();
    }
    
    function createMessageElement(msg) {
        const div = document.createElement('div');
        const isMyMessage = currentUser && msg.userId === currentUser.id;
        
        if (msg.type === 'ai') {
            div.className = 'message ai-message';
        } else {
            div.className = `message ${isMyMessage ? 'my-message' : 'other-message'}`;
        }
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        const avatarIcon = msg.avatarIcon || 'fas fa-user';
        const avatarColor = msg.avatarColor || '#00d4ff';
        avatar.style.background = `linear-gradient(135deg, ${avatarColor}, #0066ff)`;
        avatar.innerHTML = `<i class="${avatarIcon}"></i>`;
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const nameSpan = document.createElement('div');
        nameSpan.className = 'message-name';
        if (msg.type === 'ai') {
            nameSpan.innerHTML = '<i class="fas fa-robot"></i> الذكاء الاصطناعي';
        } else {
            nameSpan.textContent = msg.username;
        }
        
        const textSpan = document.createElement('div');
        textSpan.className = 'message-text';
        textSpan.innerHTML = msg.text.replace(/\n/g, '<br>');
        
        const timeSpan = document.createElement('div');
        timeSpan.className = 'message-time';
        timeSpan.textContent = new Date(msg.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        
        bubble.appendChild(nameSpan);
        bubble.appendChild(textSpan);
        bubble.appendChild(timeSpan);
        
        div.appendChild(avatar);
        div.appendChild(bubble);
        
        return div;
    }
    
    function addMessage(type, username, text, userId, avatarIcon, avatarColor, isAI = false) {
        const msg = {
            id: Date.now() + '_' + Math.random(),
            type: isAI ? 'ai' : 'user',
            username: username,
            text: text,
            userId: userId,
            avatarIcon: avatarIcon,
            avatarColor: avatarColor,
            timestamp: new Date().toISOString()
        };
        messages.push(msg);
        saveMessages();
        renderMessages();
        return msg;
    }
    
    async function sendUserMessage(text) {
        if (!text.trim()) return;
        
        addMessage('user', currentUser.name, text, currentUser.id, currentUser.avatarIcon, currentUser.avatarColor);
        
        const isMentioningAI = text.includes('@AI') || text.includes('@ai') || text.toLowerCase().includes('يا شيخ');
        
        if (isAIActive || isMentioningAI) {
            showTypingIndicator(true);
            
            let question = text.replace(/@AI/gi, '').replace(/@ai/gi, '').replace(/يا شيخ/gi, '').trim();
            if (!question) question = text;
            
            const aiResponse = await callGroq(question);
            
            showTypingIndicator(false);
            
            addMessage('ai', 'AI', aiResponse, 'ai_system', 'fas fa-robot', '#ff6b6b', true);
        }
    }
    
    // ==================== إدارة المستخدمين المتصلين ====================
    function updateOnlineUsers() {
        onlineUsers.set(currentUser.id, {
            name: currentUser.name,
            avatarIcon: currentUser.avatarIcon,
            lastSeen: Date.now()
        });
        
        const now = Date.now();
        for (const [id, data] of onlineUsers.entries()) {
            if (now - data.lastSeen > 300000) {
                onlineUsers.delete(id);
            }
        }
        
        document.getElementById('onlineCount').innerText = onlineUsers.size;
    }
    
    function broadcastPresence() {
        updateOnlineUsers();
        const usersArray = Array.from(onlineUsers.entries()).map(([id, data]) => ({
            id, name: data.name, avatarIcon: data.avatarIcon, lastSeen: data.lastSeen
        }));
        localStorage.setItem('online_users', JSON.stringify(usersArray));
    }
    
    function loadOnlineUsers() {
        const stored = localStorage.getItem('online_users');
        if (stored) {
            try {
                const usersArray = JSON.parse(stored);
                onlineUsers.clear();
                usersArray.forEach(u => {
                    if (u.id !== currentUser?.id) {
                        onlineUsers.set(u.id, u);
                    }
                });
                document.getElementById('onlineCount').innerText = onlineUsers.size + 1;
            } catch(e) {}
        }
    }
    
    // ==================== مؤشر الكتابة ====================
    function showTypingIndicator(show) {
        const indicator = document.getElementById('typingIndicator');
        if (show) {
            indicator.style.display = 'block';
            indicator.innerHTML = '<span><i class="fas fa-spinner fa-pulse"></i> AI يكتب...</span>';
        } else {
            indicator.style.display = 'none';
        }
    }
    
    // ==================== وظائف مساعدة ====================
    function scrollToBottom() {
        const container = document.getElementById('chatMessages');
        if (container) container.scrollTop = container.scrollHeight;
    }
    
    // ==================== الدخول إلى الشات ====================
    async function joinChat() {
        const username = document.getElementById('usernameInput').value.trim();
        if (!username) {
            document.getElementById('loginError').innerText = '⚠️ الرجاء إدخال اسم المستخدم';
            return;
        }
        
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        let avatarIcon = 'fas fa-user-graduate';
        let avatarColor = '#00d4ff';
        
        if (selectedAvatar) {
            const avatarData = selectedAvatar.getAttribute('data-avatar');
            switch(avatarData) {
                case '👩‍🎓': avatarIcon = 'fas fa-user-graduate'; avatarColor = '#ff6b6b'; break;
                case '👩‍🔬': avatarIcon = 'fas fa-flask'; avatarColor = '#4ecdc4'; break;
                case '👩‍💻': avatarIcon = 'fas fa-laptop-code'; avatarColor = '#45b7d1'; break;
                case '🌟': avatarIcon = 'fas fa-star'; avatarColor = '#f9ca24'; break;
                case '📚': avatarIcon = 'fas fa-book'; avatarColor = '#c44569'; break;
            }
        }
        
        currentUser = {
            id: sessionId,
            name: username,
            avatarIcon: avatarIcon,
            avatarColor: avatarColor
        };
        
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('chatApp').style.display = 'flex';
        
        loadMessages();
        loadOnlineUsers();
        
        setTimeout(async () => {
            const welcomeMessage = await callGroq(`أكتب رسالة ترحيب لطالبة جديدة في منصة الدراسة اسمها ${username}، قولها إنها في قناة فضيلة الشيخ، وشجعها على المذاكرة. اجعل الرسالة قصيرة وحلوة ومليانة إيموجيز`);
            addMessage('ai', 'AI', welcomeMessage, 'ai_system', 'fas fa-robot', '#ff6b6b', true);
        }, 500);
        
        updateOnlineUsers();
        setInterval(() => {
            if (currentUser) {
                updateOnlineUsers();
                broadcastPresence();
            }
        }, 30000);
        
        loadOnlineUsers();
    }
    
    // ==================== تبديل وضع AI ====================
    async function toggleAI() {
        isAIActive = !isAIActive;
        const toggle = document.getElementById('aiToggle');
        const status = document.getElementById('aiStatus');
        if (isAIActive) {
            toggle.classList.add('active');
            status.textContent = 'شغال';
            status.style.color = '#0ff';
            const message = await callGroq('اكتب رسالة قصيرة تقول فيها إن تم تفعيل الوضع التلقائي، وكل أسئلة الطالبة هتتوجه لفضيلة الشيخ مباشرة، قولها كمان إنها تقدر تستخدم @AI عشان تسأل حاجة معينة');
            addMessage('ai', 'AI', message, 'ai_system', 'fas fa-robot', '#ff6b6b', true);
        } else {
            toggle.classList.remove('active');
            status.textContent = 'إيقاف';
            status.style.color = '#aaa';
            const message = await callGroq('اكتب رسالة قصيرة تقول فيها إن تم إيقاف الوضع التلقائي، وإن الطالبة تقدر تستخدم @AI قبل سؤالها عشان تطلب المساعدة من فضيلة الشيخ');
            addMessage('ai', 'AI', message, 'ai_system', 'fas fa-robot', '#ff6b6b', true);
        }
    }
    
    // ==================== الأحداث ====================
    document.getElementById('joinBtn')?.addEventListener('click', joinChat);
    document.getElementById('sendBtn')?.addEventListener('click', () => {
        const input = document.getElementById('messageInput');
        if (input.value.trim()) {
            sendUserMessage(input.value);
            input.value = '';
            input.style.height = 'auto';
        }
    });
    
    document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('sendBtn').click();
        }
    });
    
    document.getElementById('aiToggle')?.addEventListener('click', toggleAI);
    
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });
    
    document.getElementById('messageInput')?.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 80) + 'px';
    });
</script>
</body>
</html>
