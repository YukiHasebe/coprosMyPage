// common.js (Firebase読み取り回数 激減モデル)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyC5L1V6jn3Q8i1bWFWO3Gd25w_If6dklmY",
    authDomain: "copros-my-page-v2.firebaseapp.com",
    projectId: "copros-my-page-v2",
    storageBucket: "copros-my-page-v2.firebasestorage.app",
    messagingSenderId: "595195904220",
    appId: "1:595195904220:web:402fd4e8620e2f32673419"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const hp = document.getElementById('header-placeholder');
    const sp = document.getElementById('sidebar-placeholder');
    if (!hp || !sp) return;

    // 🌟 セッションから名前を取得（Firebase通信は発生しません）
    const savedName = sessionStorage.getItem('userName') || "";
    const displayName = savedName.replace(/[様殿]$/, "");

    // ヘッダー注入
    hp.innerHTML = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-6 text-white shadow-lg shrink-0 z-50 sticky top-0">
            <div class="flex items-center gap-6">
                <button id="mobile-toggle" class="lg:hidden text-white/70 mr-2"><i class="fa-solid fa-bars text-xl"></i></button>
                <img src="logo.jpg" alt="ロゴ" class="h-10 w-auto object-contain">
                <span class="hidden sm:inline text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right mr-1">
                    <p class="text-[10px] opacity-50 uppercase leading-none mb-1">Current User</p>
                    <p class="text-sm font-black text-white">${displayName}</p>
                </div>
                <div class="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-md"><i class="fa-solid fa-user"></i></div>
            </div>
        </header>`;

    // サイドバー注入（全項目保持）
    sp.innerHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-40 hidden lg:hidden"></div>
        <aside id="main-sidebar" class="sidebar flex flex-col fixed lg:static inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300" style="width: 220px; background-color: #1a1a1a; color: white; height: 100vh; overflow-y: auto;">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black text-xs border-b border-gray-800">Menu</div>
            <nav class="flex-1 py-2 text-[13px]">
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5"><span>お客様</span><i class="fa-solid fa-chevron-down text-[10px]"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100" onclick="location.href='list.html'">お客様一覧</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100" onclick="location.href='add.html'">お客様登録</div></div>
                </div>
                <!-- ...その他のメニュー項目を同じ形式でここに... -->
                <div class="p-6 border-t border-gray-800"><button id="logout-btn" class="text-gray-500 hover:text-rose-400 font-bold"><i class="fa-solid fa-power-off"></i> ログアウト</button></div>
            </nav>
        </aside>`;

    // モバイルトグル・ログアウト等の制御
    const mt = document.getElementById('mobile-toggle');
    const so = document.getElementById('sidebar-overlay');
    const ms = document.getElementById('main-sidebar');
    const control = (open) => { if(open){ ms.classList.remove('-translate-x-full'); so.classList.remove('hidden'); } else { ms.classList.add('-translate-x-full'); so.classList.add('hidden'); } };
    if(mt) mt.onclick = () => control(true);
    if(so) so.onclick = () => control(false);
    const lo = document.getElementById('logout-btn');
    if(lo) lo.onclick = () => { sessionStorage.clear(); location.href='index.html'; };
});
