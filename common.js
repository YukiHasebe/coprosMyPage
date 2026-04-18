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

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const hp = document.getElementById('header-placeholder');
    const sp = document.getElementById('sidebar-placeholder');
    if (!hp || !sp) return;

    const currentFile = window.location.pathname.split("/").pop() || 'index.html';

    // ヘッダー注入（由紀オーナー指定：様・殿なしのログイン名）
    hp.innerHTML = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-6 text-white shadow-lg shrink-0 z-50 sticky top-0">
            <div class="flex items-center gap-6">
                <button id="mobile-toggle" class="lg:hidden text-white/70 mr-2"><i class="fa-solid fa-bars text-xl"></i></button>
                <img src="logo.jpg" alt="ロゴ" class="h-10 w-auto object-contain">
                <span class="hidden sm:inline text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right mr-1 hidden xs:block">
                    <p class="text-[10px] opacity-50 leading-none mb-1 tracking-tighter uppercase">Current User</p>
                    <p id="user-display-name" class="text-sm font-black tracking-wider text-white">ゲスト</p>
                </div>
                <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-md">
                    <i class="fa-solid fa-user text-lg"></i>
                </div>
            </div>
        </header>
    `;

    // サイドバー注入（220px固定・厳格モード）
    sp.innerHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-40 hidden lg:hidden"></div>
        <aside id="main-sidebar" class="sidebar flex flex-col shrink-0 fixed lg:static inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300" style="width: 220px; background-color: #1a1a1a; color: white; height: 100vh;">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black tracking-widest text-xs border-b border-gray-800 uppercase">Menu</div>
            <nav class="flex-1 overflow-y-auto py-2 custom-scrollbar text-[13px]">
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors"><div class="flex items-center gap-3"><i class="fa-solid fa-users w-5 icon-to-color"></i><span>お客様</span></div><i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list.html'">お客様情報一覧</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='add.html'">お客様情報登録</div></div>
                </div>
                <!-- 他のメニューは維持 -->
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5"><div class="flex items-center gap-3"><i class="fa-solid fa-file-invoice w-5 icon-to-color"></i><span>実績</span></div><i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='history.html'">実績登録</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list_records.html'">実績一覧</div></div>
                </div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link" onclick="location.href='calendar.html'"><i class="fa-solid fa-calendar-days w-5 icon-to-color"></i><span>カレンダー</span></div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link" onclick="location.href='map.html'"><i class="fa-solid fa-map-location-dot w-5 icon-to-color"></i><span>地図</span></div>
            </nav>
            <div class="p-6 border-t border-gray-800 bg-[#1a1a1a]"><button id="logout-btn" class="flex items-center gap-3 text-gray-500 hover:text-rose-400 font-bold w-full"><i class="fa-solid fa-power-off"></i><span>ログアウト</span></button></div>
        </aside>
    `;

    // ユーザー名表示（「様」なし）
    const un = sessionStorage.getItem('userName');
    if(un && document.getElementById('user-display-name')) document.getElementById('user-display-name').innerText = un;

    // ...以下、UI制御ロジック、ハイライト、ログアウトは前回のコードを継承...
});
