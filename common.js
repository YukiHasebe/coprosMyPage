// 👑 CP My Page: 共通基盤JS (common.js) - スムーズ・イン ＆ デザイン固定版
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyC5L1V6jn3Q8i1bWFW03Gd25w_If6dklmY",
    authDomain: "copros-my-page-v2.firebaseapp.com",
    projectId: "copros-my-page-v2",
    storageBucket: "copros-my-page-v2.firebasestorage.app",
    messagingSenderId: "595195904220",
    appId: "1:595195904220:web:402fd4e8620e2f32673419"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🌟 スムーズな表示のためのCSSを注入
const style = document.createElement('style');
style.innerHTML = `
    #header-placeholder, #sidebar-placeholder { opacity: 0; transition: opacity 0.3s ease-in-out; }
    #header-placeholder.loaded, #sidebar-placeholder.loaded { opacity: 1; }
    main { animation: fadeInContent 0.4s ease-out; }
    @keyframes fadeInContent { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (!headerPlaceholder || !sidebarPlaceholder) return;

    const currentFile = window.location.pathname.split("/").pop() || 'index.html';
    const isListPage = currentFile === 'list.html';

    // 1. ヘッダー注入
    headerPlaceholder.innerHTML = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-6 text-white shadow-lg shrink-0 z-50 sticky top-0">
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                    <button id="mobile-toggle" class="lg:hidden text-white/70 mr-2"><i class="fa-solid fa-bars text-xl"></i></button>
                    <img src="logo.jpg" alt="ロゴ" class="h-10 w-auto object-contain">
                    <span class="hidden sm:inline text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
                </div>
                ${isListPage ? `
                <div class="hidden md:flex relative items-center group ml-4">
                    <i class="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
                    <input type="text" id="headerSearchInput" placeholder="お客様名で高速検索..." 
                           class="w-80 py-2 pl-10 pr-4 text-sm text-gray-800 rounded-full outline-none transition-all bg-gray-50/90 border border-transparent focus:border-blue-400">
                </div>` : ''}
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right mr-1 hidden xs:block">
                    <p class="text-[10px] opacity-50 leading-none mb-1 uppercase tracking-tighter">Current User</p>
                    <p id="user-display-name" class="text-sm font-black tracking-wider text-white">ゲスト</p>
                </div>
                <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-md text-white">
                    <i class="fa-solid fa-user text-lg"></i>
                </div>
            </div>
        </header>
    `;

    // 2. サイドバー注入 (デザイン固定版)
    sidebarPlaceholder.innerHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-40 hidden lg:hidden"></div>
        <aside id="main-sidebar" class="sidebar flex flex-col shrink-0 fixed lg:static inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out" style="width: 220px; background-color: #1a1a1a; color: white; height: 100vh;">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black tracking-widest text-xs border-b border-gray-800 uppercase">Menu</div>
            <nav class="flex-1 overflow-y-auto py-2 custom-scrollbar">
                
                <div class="nav-group" data-group="customers">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-users w-5 icon-to-color"></i><span>お客様</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list.html'">お客様情報一覧</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='add.html'">お客様情報登録</div>
                    </div>
                </div>

                <div class="nav-group" data-group="records">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-file-invoice w-5 icon-to-color"></i><span>実績</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='history.html'">実績登録</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list_records.html'">実績一覧</div>
                    </div>
                </div>

                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link" onclick="location.href='calendar.html'"><i class="fa-solid fa-calendar-days w-5 icon-to-color"></i><span>カレンダー</span></div>
                <div class="px-6 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer item-link" onclick="location.href='kairan.html'"><div class="flex items-center gap-3"><i class="fa-solid fa-envelope-open-text w-5 icon-to-color"></i><span>回覧一覧</span></div><span id="unreadBadge" class="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="display:none;">0</span></div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link" onclick="location.href='map.html'"><i class="fa-solid fa-map-location-dot w-5 icon-to-color"></i><span>地図</span></div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link mb-4" onclick="location.href='appoint.html'"><i class="fa-solid fa-clock w-5 icon-to-color"></i><span>アポイント</span></div>

                <div class="nav-group" data-group="stats">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-chart-line w-5 icon-to-color"></i><span>集計</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='usage.html'">組織員利用状況</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='monthly_list.html'">月別一覧</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='customer_stay_time.html'">お客様別滞在時間一覧</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='monthly_stay_time.html'">お客様別月別滞在時間一覧</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='view_graph.html'">実績グラフ出力</div>
                    </div>
                </div>

                <div class="nav-group" data-group="admin">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-gear w-5 icon-to-color"></i><span>マスタ管理</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='notice_list.html'">お知らせ管理</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='staff_list.html'">組織員情報登録</div>
                        <div class="py-2.5 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='import.html'">インポート</div>
                    </div>
                </div>
            </nav>
            <div class="p-6 border-t border-gray-800 bg-[#1a1a1a]">
                <button onclick="logout()" class="flex items-center gap-3 text-gray-500 hover:text-rose-400 transition-colors font-bold w-full text-left">
                    <i class="fa-solid fa-power-off"></i><span>ログアウト</span>
                </button>
            </div>
        </aside>
    `;

    // 🌟 注入完了後、クラスを追加してふわっと表示
    headerPlaceholder.classList.add('loaded');
    sidebarPlaceholder.classList.add('loaded');

    // --- ロジック：ハイライト ＆ 自動開閉（高速化） ---
    document.querySelectorAll('[onclick], .item-link').forEach(el => {
        const action = el.getAttribute('onclick') || "";
        if (action.includes(`'${currentFile}'`)) {
            el.classList.add('text-[#87ceeb]', 'font-black');
            el.classList.remove('opacity-70');
            const parentGroup = el.closest('.nav-group');
            if (parentGroup) {
                const submenu = parentGroup.querySelector('.submenu');
                const arrow = parentGroup.querySelector('.arrow');
                const icon = parentGroup.querySelector('.icon-to-color');
                if (submenu) submenu.classList.remove('hidden');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
                if (icon) icon.classList.add('text-[#87ceeb]');
            } else if (el.classList.contains('item-link')) {
                const icon = el.querySelector('.icon-to-color');
                if (icon) icon.classList.add('text-[#87ceeb]');
            }
        }
    });

    // --- 他のイベント（スマホ制御・アコーディオン）はそのまま維持 ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainSidebar = document.getElementById('main-sidebar');
    const controlSidebar = (open) => {
        if(open) { mainSidebar.classList.remove('-translate-x-full'); sidebarOverlay.classList.remove('hidden'); }
        else { mainSidebar.classList.add('-translate-x-full'); sidebarOverlay.classList.add('hidden'); }
    };
    if(mobileToggle) mobileToggle.onclick = () => controlSidebar(true);
    if(sidebarClose) sidebarClose.onclick = () => controlSidebar(false);
    if(sidebarOverlay) sidebarOverlay.onclick = () => controlSidebar(false);

    document.querySelectorAll('.group-header').forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');
            const isOpen = !submenu.classList.contains('hidden');
            submenu.classList.toggle('hidden');
            if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    const userName = sessionStorage.getItem('userName');
    const nameEl = document.getElementById('user-display-name');
    if (userName && nameEl) nameEl.innerText = userName + " 氏";

    async function refreshUnreadBadge() {
        if (!userName) return;
        try {
            const q = query(collection(db, "notifications"), where("recipient", "==", userName), where("isRead", "==", false), limit(1));
            const snap = await getDocs(q);
            const badge = document.getElementById('unreadBadge');
            if (badge) { badge.style.display = snap.size > 0 ? 'flex' : 'none'; }
        } catch (e) {}
    }
    refreshUnreadBadge();
});

export function logout() {
    if(confirm("ログアウトしますか？")) { sessionStorage.clear(); location.href = 'index.html'; }
}
