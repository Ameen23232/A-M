export default {
  async fetch(request, env) {
    // 1. التعامل مع طلبات OPTIONS (لأمان المتصفح)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 2. قراءة مفتاح API السري من البيئة الآمنة
    const API_KEY = env.GEMINI_API_KEY;
    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not found' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // 3. إعادة المفتاح للمستخدم (موقعك)
    return new Response(JSON.stringify({ apiKey: API_KEY }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // يسمح لأي موقع بالاتصال بهذا الـ Worker
      },
    });
  },
};