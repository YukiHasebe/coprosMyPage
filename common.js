// common.js
document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

    if (!headerPlaceholder || !sidebarPlaceholder) return;

    const currentFile = window.location.pathname.split("/").pop() || 'index.html';
    const isListPage = currentFile === 'list.html';

    // 1. ヘッダーの挿入
    headerPlaceholder.innerHTML = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-6 text-white shadow-lg shrink-0 z-50">
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                    <img src="logo.jpg" alt="ロゴ" class="h-10 w-auto object-contain">
                    <span class="text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
                </div>
                ${isListPage ? `
                <div class="relative flex items-center group ml-4">
                    <i class="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
                    <input type="text" id="headerSearchInput" placeholder="お客様名で高速検索..." 
                           class="w-80 py-2 pl-10 pr-4 text-sm text-gray-800 rounded-full outline-none focus:ring-2 focus:ring-blue-400/30 transition-all bg-gray-50/90 border border-transparent focus:border-blue-400">
                </div>` : ''}
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right mr-1">
                    <p class="text-[10px] opacity-50 leading-none mb-1 uppercase tracking-tighter">Current User</p>
                    <p class="text-sm font-black tracking-wider text-white">${sessionStorage.getItem('userName') || 'ゲスト'}</p>
                </div>
                <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-md overflow-hidden text-white">
                    <i class="fa-solid fa-user text-lg"></i>
                </div>
            </div>
        </header>
    `;

    // 2. サイドバーの挿入（リンク修正 ＆ バッジ初期非表示）
    sidebarPlaceholder.innerHTML = `
        <aside class="sidebar flex flex-col shrink-0 text-sm shadow-2xl overflow-hidden" style="width: 220px; background-color: #1a1a1a; color: white; height: 100vh;">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black tracking-widest text-xs border-b border-gray-800 uppercase">Menu</div>
            <nav class="flex-1 overflow-y-auto py-2">
                
                <div class="nav-group">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-users w-5 text-[#87ceeb]"></i><span>お客様</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list.html'">お客様情報一覧</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='add.html'">お客様情報登録</div>
                    </div>
                </div>

                <div class="nav-group">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-file-invoice w-5 text-[#87ceeb]"></i><span>実績</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='history.html'">実績登録</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='list_records.html'">実績一覧</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer">実績CSV出力</div>
                    </div>
                </div>

                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer" onclick="location.href='calendar.html'"><i class="fa-solid fa-calendar-days w-5 text-[#87ceeb]"></i><span>カレンダー</span></div>
                
                <div class="px-6 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer" onclick="location.href='kairan.html'">
                    <div class="flex items-center gap-3"><i class="fa-solid fa-envelope-open-text w-5 text-[#87ceeb]"></i><span>回覧一覧</span></div>
                    <!-- 🌟 バッジは最初は隠しておく（display:none） -->
                    <span id="unreadBadge" class="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="display:none;">0</span>
                </div>

                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer" onclick="location.href='map.html'"><i class="fa-solid fa-map-location-dot w-5 text-[#87ceeb]"></i><span>地図</span></div>
                <div class="px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer" onclick="location.href='appoint.html'"><i class="fa-solid fa-clock w-5 text-[#87ceeb]"></i><span>アポイント</span></div>

                <div class="nav-group">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-chart-line w-5 text-[#87ceeb]"></i><span>集計</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='usage.html'">組織員利用状況</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='monthly_list.html'">月別一覧</div>
                        <!-- 🌟 リンクを接続 -->
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='customer_stay_time.html'">お客様別滞在時間一覧</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='monthly_stay_time.html'">お客様別月別滞在時間一覧</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='view_graph.html'">実績グラフ出力</div>
                    </div>
                </div>

                <div class="nav-group">
                    <div class="group-header flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-white/5">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-gear w-5 text-[#87ceeb]"></i><span>マスタ管理</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 arrow transition-transform"></i>
                    </div>
                    <div class="submenu hidden bg-black/20">
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer">お知らせ登録</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='staff_list.html'">組織員情報登録</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer">実績マスタ</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer">お客様情報マスタ</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer">システム管理</div>
                        <div class="py-2 pl-14 pr-4 text-xs opacity-70 hover:opacity-100 hover:text-[#87ceeb] cursor-pointer" onclick="location.href='import.html'">インポート</div>
                    </div>
                </div>
            </nav>
            <div class="p-6 border-t border-gray-800 bg-[#1a1a1a]">
                <a href="index.html" class="flex items-center gap-3 text-gray-500 hover:text-rose-400 transition-colors font-bold">
                    <i class="fa-solid fa-power-off"></i><span>ログアウト</span>
                </a>
            </div>
        </aside>
    `;

    // アコーディオン開閉
    document.querySelectorAll('.group-header').forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');
            const isOpen = !submenu.classList.contains('hidden');
            if (isOpen) {
                submenu.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
            } else {
                submenu.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // ハイライト ＆ 自動開閉（厳格判定）
    document.querySelectorAll('[onclick]').forEach(el => {
        const action = el.getAttribute('onclick');
        if (action && action.includes(`'${currentFile}'`)) { // 完全一致に近い判定
            el.classList.add('text-[#87ceeb]', 'font-bold');
            const parentSubmenu = el.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.classList.remove('hidden');
                const arrow = parentSubmenu.parentElement.querySelector('.arrow');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        }
    });

    // 未読バッジのリアルタイム魔法
    async function refreshUnreadBadge() {
        const myName = sessionStorage.getItem('userName');
        if (!myName) return;
        try {
            const { getFirestore, collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const db = getFirestore();
            const q = query(collection(db, "notifications"), where("recipient", "==", myName), where("isRead", "==", false));
            const snap = await getDocs(q);
            const badge = document.getElementById('unreadBadge');
            if (badge) {
                badge.innerText = snap.size;
                // 🌟 0件なら隠す、1件以上なら出す！
                badge.style.display = snap.size > 0 ? 'flex' : 'none';
            }
        } catch (e) { /* Quotaリセット待ち */ }
    }
    refreshUnreadBadge();
});
