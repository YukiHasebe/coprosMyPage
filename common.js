import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🌟 オーナーのV2プロジェクト設定を完全に反映
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

// 🌟 全画面の「ぐるぐる」を自動でプロ仕様に整える追加機能（既存コードを壊さず機能追加）
function unifyLoaders() {
    const oldLoader = document.getElementById('loading');
    if (oldLoader) {
        oldLoader.className = "fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center";
        oldLoader.innerHTML = `
            <div class="animate-spin mb-4 text-[#ff7e11] text-6xl"><i class="fa-solid fa-circle-notch"></i></div>
            <p class="text-slate-800 font-black tracking-tighter text-lg uppercase italic">Data Synchronizing...</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    unifyLoaders(); // 追加した機能の実行
    const hp = document.getElementById('header-placeholder');
    const sp = document.getElementById('sidebar-placeholder');
    if (!hp || !sp) return;

    const currentFile = window.location.pathname.split("/").pop().split('?')[0] || 'index.html';
    const rawName = sessionStorage.getItem('userName') || "";
    const userDept = sessionStorage.getItem('userDept') || "ALL"; // 🌟 自分の部署を取得
    const displayName = rawName.replace(/[様殿]$/, "");

    // ヘッダー注入（オーナーのオリジナルを完全保持）
    hp.innerHTML = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-4 lg:px-6 text-white shadow-lg shrink-0 z-50 sticky top-0">
            <div class="flex items-center gap-4">
                <button id="mobile-toggle" class="lg:hidden text-white/80 hover:text-white p-2">
                    <i class="fa-solid fa-bars text-2xl"></i>
                </button>
                <img src="logo.jpg" alt="ロゴ" class="h-8 lg:h-10 w-auto object-contain">
                <span class="hidden sm:inline text-lg lg:text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right mr-1">
                    <p class="text-[8px] lg:text-[10px] opacity-50 uppercase leading-none mb-1">Current User</p>
                    <p id="user-display-name" class="text-xs lg:text-sm font-black text-white">${displayName}</p>
                </div>
                <div class="w-8 h-8 lg:w-10 lg:h-10 bg-slate-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-md">
                    <i class="fa-solid fa-user text-sm lg:text-lg text-white"></i>
                </div>
            </div>
        </header>
    `;

    // サイドバー注入（中身を一行も略さず、オーナーの提示通りに再現）
    sp.innerHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 z-40 hidden lg:hidden"></div>
        <aside id="main-sidebar" class="sidebar flex flex-col shrink-0 fixed lg:static inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300" style="width: 220px; background-color: #1a1a1a; color: white; height: 100vh; overflow-y: auto;">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black tracking-widest text-xs border-b border-gray-800 uppercase shrink-0">Menu</div>
            <nav class="flex-1 py-2 custom-scrollbar text-[13px]">
                <div class="nav-group" data-group="customers">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-users w-5 icon-to-color"></i><span>お客様</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform duration-300"></i>
                    </div>
                    <div class="submenu hidden bg-black/40">
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="list.html" onclick="location.href='list.html'">お客様情報一覧</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="add.html" onclick="location.href='add.html'">お客様情報登録</div>
                    </div>
                </div>
                <div class="nav-group" data-group="records">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-file-invoice w-5 icon-to-color"></i><span>実績</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform duration-300"></i>
                    </div>
                    <div class="submenu hidden bg-black/40">
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="history.html" onclick="location.href='history.html'">実績登録</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="list_records.html" onclick="location.href='list_records.html'">実績一覧</div>
                    </div>
                </div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link transition-colors border-l-4 border-transparent" data-page="calendar.html" onclick="location.href='calendar.html'">
                    <i class="fa-solid fa-calendar-days w-5 icon-to-color"></i><span>カレンダー</span>
                </div>
                <div class="px-6 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer item-link transition-colors border-l-4 border-transparent" data-page="kairan.html" onclick="location.href='kairan.html'">
                    <div class="flex items-center gap-3"><i class="fa-solid fa-envelope-open-text w-5 icon-to-color"></i><span>回覧一覧</span></div>
                    <span id="unreadBadge" class="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-bounce" style="display:none;">0</span>
                </div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link transition-colors border-l-4 border-transparent" data-page="map.html" onclick="location.href='map.html'">
                    <i class="fa-solid fa-map-location-dot w-5 icon-to-color"></i><span>地図</span>
                </div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer item-link mb-4 transition-colors border-l-4 border-transparent" data-page="appoint.html" onclick="location.href='appoint.html'">
                    <i class="fa-solid fa-clock w-5 icon-to-color"></i><span>アポイント</span>
                </div>
                <div class="nav-group" data-group="analytics">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 border-t border-gray-800 pt-6 transition-colors">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-chart-line w-5 icon-to-color"></i><span>集計</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform duration-300"></i>
                    </div>
                    <div class="submenu hidden bg-black/40">
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="usage.html" onclick="location.href='usage.html'">組織員利用状況</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="monthly_list.html" onclick="location.href='monthly_list.html'">月別一覧</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="customer_stay_time.html" onclick="location.href='customer_stay_time.html'">お客様別滞在時間</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="monthly_stay_time.html" onclick="location.href='monthly_stay_time.html'">月別滞在時間一覧</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="view_graph.html" onclick="location.href='view_graph.html'">実績グラフ出力</div>
                    </div>
                </div>
                <div class="nav-group" data-group="master">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 border-t border-gray-800 pt-6 transition-colors">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-gear w-5 icon-to-color"></i><span>マスタ管理</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform duration-300"></i>
                    </div>
                    <div class="submenu hidden bg-black/40">
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="notice_list.html" onclick="location.href='notice_list.html'">お知らせ管理</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="staff_list.html" onclick="location.href='staff_list.html'">組織員情報登録</div>
                        <div class="sub-item py-2.5 pl-14 pr-4 opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer transition-all border-l-4 border-transparent" data-page="import.html" onclick="location.href='import.html'">インポート</div>
                    </div>
                </div>
            </nav>
            <div class="p-6 border-t border-gray-800 bg-[#1a1a1a] shrink-0">
                <button id="logout-btn" class="flex items-center gap-3 text-gray-500 hover:text-rose-400 font-bold w-full transition-colors">
                    <i class="fa-solid fa-power-off"></i><span>ログアウト</span>
                </button>
            </div>
        </aside>
    `;

    // 🌟 全画面共通：部署フィルターがあれば初期値を自分の部署に設定する魔法
    const deptSelect = document.getElementById('deptFilter');
    if (deptSelect && userDept !== "ALL") {
        for (let i = 0; i < deptSelect.options.length; i++) {
            if (deptSelect.options[i].value === userDept) {
                deptSelect.selectedIndex = i;
                break;
            }
        }
    }

    // UIロジック
    const ms = document.getElementById('main-sidebar'), so = document.getElementById('sidebar-overlay'), mt = document.getElementById('mobile-toggle');
    const ts = (o) => { ms.classList.toggle('-translate-x-full', !o); so.classList.toggle('hidden', !o); };
    if (mt) mt.onclick = () => ts(true); if (so) so.onclick = () => ts(false);

    document.querySelectorAll('.group-header').forEach(header => {
        header.onclick = () => {
            const submenu = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');
            submenu.classList.toggle('hidden');
            if(arrow) arrow.style.transform = submenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        };
    });

    document.querySelectorAll('.sub-item, .item-link').forEach(el => {
        if (currentFile === el.getAttribute('data-page')) {
            el.classList.add('text-[#87ceeb]', 'opacity-100', 'font-black', 'border-[#87ceeb]');
            const pg = el.closest('.nav-group');
            if (pg) {
                pg.querySelector('.submenu').classList.remove('hidden');
                pg.querySelector('.arrow').style.transform = 'rotate(180deg)';
                pg.querySelector('.group-header').classList.add('text-[#87ceeb]');
                pg.querySelector('.icon-to-color').classList.add('text-[#87ceeb]');
            } else {
                const icon = el.querySelector('.icon-to-color');
                if (icon) icon.classList.add('text-[#87ceeb]');
            }
        }
    });

    const lo = document.getElementById('logout-btn');
    if(lo) lo.onclick = () => { if(confirm("ログアウトしますか？")){ sessionStorage.clear(); location.href = 'index.html'; } };

    async function refreshBadge() {
        if(!rawName) return;
        try { 
            const q = query(collection(db, "notifications"), where("recipient", "==", rawName), where("isRead", "==", false)); 
            const snap = await getDocs(q); 
            const badge = document.getElementById('unreadBadge');
            if(!snap.empty && badge) { badge.innerText = snap.size; badge.style.display = 'flex'; }
            else if(badge) { badge.style.display = 'none'; }
        } catch(e){}
    }
    refreshBadge();
});
