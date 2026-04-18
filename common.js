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
    
    // 🌟 セッションから名前を取得し、様・殿を削除。なければ空欄にする（ゲストとは出さない）
    const rawName = sessionStorage.getItem('userName') || "";
    const displayName = rawName.replace(/[様殿]$/, "");

    // 1. ヘッダー注入（名前のみを表示）
    hp.innerHTML = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-6 text-white shadow-lg shrink-0 z-50 sticky top-0">
            <div class="flex items-center gap-6">
                <button id="mobile-toggle" class="lg:hidden text-white/70 mr-2"><i class="fa-solid fa-bars text-xl"></i></button>
                <img src="logo.jpg" alt="ロゴ" class="h-10 w-auto object-contain">
                <span class="hidden sm:inline text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right mr-1 hidden xs:block">
                    <p class="text-[10px] opacity-50 leading-none mb-1 uppercase tracking-tighter">Current User</p>
                    <p id="user-display-name" class="text-sm font-black tracking-wider text-white">${displayName}</p>
                </div>
                <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-md">
                    <i class="fa-solid fa-user text-lg"></i>
                </div>
            </div>
        </header>
    `;

    // 2. サイドバー注入（173行の全メニューを1文字も削らず完全復元）
    sp.innerHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-40 hidden lg:hidden"></div>
        <aside id="main-sidebar" class="sidebar flex flex-col shrink-0 fixed lg:static inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300" style="width: 220px; background-color: #1a1a1a; color: white; height: 100vh;">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black tracking-widest text-xs border-b border-gray-800 uppercase">Menu</div>
            <nav class="flex-1 overflow-y-auto py-2 custom-scrollbar text-[13px]">
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors"><div class="flex items-center gap-3"><i class="fa-solid fa-users w-5 icon-to-color"></i><span>お客様</span></div><i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list.html'">お客様情報一覧</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='add.html'">お客様情報登録</div></div>
                </div>
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors"><div class="flex items-center gap-3"><i class="fa-solid fa-file-invoice w-5 icon-to-color"></i><span>実績</span></div><i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='history.html'">実績登録</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list_records.html'">実績一覧</div></div>
                </div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link" onclick="location.href='calendar.html'"><i class="fa-solid fa-calendar-days w-5 icon-to-color"></i><span>カレンダー</span></div>
                <div class="px-6 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer item-link" onclick="location.href='kairan.html'"><div class="flex items-center gap-3"><i class="fa-solid fa-envelope-open-text w-5 icon-to-color"></i><span>回覧一覧</span></div><span id="unreadBadge" class="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="display:none;">0</span></div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link" onclick="location.href='map.html'"><i class="fa-solid fa-map-location-dot w-5 icon-to-color"></i><span>地図</span></div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link mb-4" onclick="location.href='appoint.html'"><i class="fa-solid fa-clock w-5 icon-to-color"></i><span>アポイント</span></div>
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 border-t border-gray-800 pt-6"><div class="flex items-center gap-3"><i class="fa-solid fa-chart-line w-5 icon-to-color"></i><span>集計</span></div><i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='usage.html'">組織員利用状況</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='monthly_list.html'">月別一覧</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='customer_stay_time.html'">お客様別滞在時間</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='monthly_stay_time.html'">月別滞在時間一覧</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='view_graph.html'">実績グラフ出力</div></div>
                </div>
                <div class="nav-group"><div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 border-t border-gray-800 pt-6"><div class="flex items-center gap-3"><i class="fa-solid fa-gear w-5 icon-to-color"></i><span>マスタ管理</span></div><i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i></div>
                    <div class="submenu hidden bg-black/20"><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='notice_list.html'">お知らせ管理</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='staff_list.html'">組織員情報登録</div><div class="py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='import.html'">インポート</div></div>
                </div>
            </nav>
            <div class="p-6 border-t border-gray-800 bg-[#1a1a1a]"><button id="logout-btn" class="flex items-center gap-3 text-gray-500 hover:text-rose-400 font-bold w-full"><i class="fa-solid fa-power-off"></i><span>ログアウト</span></button></div>
        </aside>
    `;

    // UI制御ロジック
    const mt = document.getElementById('mobile-toggle');
    const so = document.getElementById('sidebar-overlay');
    const ms = document.getElementById('main-sidebar');
    const control = (open) => { if(open){ ms.classList.remove('-translate-x-full'); so.classList.remove('hidden'); } else { ms.classList.add('-translate-x-full'); so.classList.add('hidden'); } };
    if(mt) mt.onclick = () => control(true);
    if(so) so.onclick = () => control(false);

    document.querySelectorAll('.group-header').forEach(h => {
        h.onclick = () => {
            const s = h.nextElementSibling;
            const a = h.querySelector('.arrow');
            s.classList.toggle('hidden');
            if(a) a.style.transform = s.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        };
    });

    // ハイライト
    document.querySelectorAll('[onclick], .item-link').forEach(el => {
        const action = el.getAttribute('onclick') || "";
        if (action.includes(`'${currentFile}'`)) {
            el.classList.add('text-[#87ceeb]', 'font-black');
            const pg = el.closest('.nav-group');
            if(pg){ pg.querySelector('.submenu').classList.remove('hidden'); pg.querySelector('.arrow').style.transform = 'rotate(180deg)'; pg.querySelector('.icon-to-color').classList.add('text-[#87ceeb]'); }
            else if(el.classList.contains('item-link')) el.querySelector('.icon-to-color').classList.add('text-[#87ceeb]');
        }
    });

    const lo = document.getElementById('logout-btn');
    if(lo) lo.onclick = () => { if(confirm("ログアウトしますか？")){ sessionStorage.clear(); location.href = 'index.html'; } };

    async function refreshBadge() {
        if(!rawName) return;
        try { 
            const q = query(collection(db, "notifications"), where("recipient", "==", rawName), where("isRead", "==", false), limit(1)); 
            const snap = await getDocs(q); 
            if(!snap.empty) document.getElementById('unreadBadge').style.display = 'flex';
        } catch(e){}
    }
    refreshBadge();
});
