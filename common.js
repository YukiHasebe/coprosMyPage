// common.js
document.addEventListener('DOMContentLoaded', () => {
       // 1. ヘッダーの挿入（ロゴ画像を追加）
    const headerHtml = `
        <header class="h-16 bg-[#3c4b5a] flex items-center justify-between px-6 text-white shadow-lg shrink-0 z-50">
            <div class="flex items-center gap-6">
                <!-- ロゴ画像：heightを調整して綺麗に収めます -->
                <div class="flex items-center gap-3">
                    <img src="logo.jpg" alt="コプロスロゴ" class="h-10 w-auto object-contain">
                    <span class="text-xl font-bold tracking-tighter text-[#87ceeb]">株式会社コプロス</span>
                </div>
                <div class="relative flex items-center group ml-4">
                    <i class="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
                    <input type="text" placeholder="お客様名で高速検索..." 
                           class="w-80 py-2 pl-10 pr-4 text-sm text-gray-800 rounded-full outline-none focus:ring-2 focus:ring-blue-400/30 transition-all bg-gray-50/90 border border-transparent focus:border-blue-400">
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <p class="text-[10px] opacity-60 leading-none mb-1">SALES SUPPORT SYSTEM</p>
                    <p class="text-sm font-bold tracking-wide">${sessionStorage.getItem('userName') || 'ゲスト'} 様</p>
                </div>
                <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center border-2 border-white/30 shadow-inner overflow-hidden">
                    <i class="fa-solid fa-user text-white text-lg"></i>
                </div>
            </div>
        </header>
    `;

    // 2. サイドバーの挿入（あなたの「崩れない完璧版」をベースにしています）
    const sidebarHtml = `
        <aside class="sidebar flex flex-col shrink-0 text-sm shadow-2xl">
            <div class="h-16 flex items-center px-6 text-gray-500 font-black tracking-widest text-xs border-b border-gray-800 uppercase">Menu</div>
            <nav class="flex-1 overflow-y-auto py-4">
                <!-- お客様メニュー -->
                <div class="nav-item group" id="nav-customer">
                    <div class="flex items-center justify-between pointer-events-none">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-users w-5 main-icon text-[#87ceeb]"></i><span>お客様</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 group-[.open]:rotate-180 transition-transform"></i>
                    </div>
                    <div class="submenu overflow-hidden max-h-0 group-[.open]:max-h-40 transition-all duration-300 bg-black/20">
                        <div class="submenu-item py-2 pl-12 pr-4 hover:bg-blue-600/20 cursor-pointer text-xs" onclick="location.href='list.html'">お客様情報一覧</div>
                        <div class="submenu-item py-2 pl-12 pr-4 hover:bg-blue-600/20 cursor-pointer text-xs" onclick="location.href='add.html'">お客様情報登録</div>
                    </div>
                </div>
                <!-- 実績メニュー -->
                <div class="nav-item group" id="nav-history">
                    <div class="flex items-center justify-between pointer-events-none">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-file-invoice w-5 main-icon"></i><span>実績</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 group-[.open]:rotate-180 transition-transform"></i>
                    </div>
                    <div class="submenu overflow-hidden max-h-0 group-[.open]:max-h-40 transition-all duration-300 bg-black/20">
                        <div class="submenu-item py-2 pl-12 pr-4 hover:bg-blue-600/20 cursor-pointer text-xs" onclick="location.href='history.html'">実績登録</div>
                        <div class="submenu-item py-2 pl-12 pr-4 hover:bg-blue-600/20 cursor-pointer text-xs" onclick="location.href='list_records.html'">実績一覧</div>
                    </div>
                </div>
                <!-- その他単体メニュー -->
                <div class="nav-item py-4 px-6 flex items-center gap-3 hover:bg-blue-600/10 cursor-pointer transition-colors border-l-4 border-transparent hover:border-[#87ceeb]" onclick="location.href='calendar.html'">
                    <i class="fa-solid fa-calendar-days w-5 text-[#87ceeb]"></i><span>カレンダー</span>
                </div>
                <!-- マスタ管理 -->
                <div class="nav-item group" id="nav-master">
                    <div class="flex items-center justify-between pointer-events-none">
                        <div class="flex items-center gap-3"><i class="fa-solid fa-gear w-5 main-icon text-[#87ceeb]"></i><span>マスタ管理</span></div>
                        <i class="fa-solid fa-chevron-down text-[10px] opacity-30 group-[.open]:rotate-180 transition-transform"></i>
                    </div>
                    <div class="submenu overflow-hidden max-h-0 group-[.open]:max-h-40 transition-all duration-300 bg-black/20">
                        <div class="submenu-item py-2 pl-12 pr-4 hover:bg-blue-600/20 cursor-pointer text-xs" onclick="location.href='import.html'">インポート</div>
                    </div>
                </div>
            </nav>
            <div class="p-6 border-t border-gray-800">
                <a href="index.html" class="flex items-center gap-3 text-gray-500 hover:text-rose-400 transition-colors font-bold">
                    <i class="fa-solid fa-power-off"></i><span>ログアウト</span>
                </a>
            </div>
        </aside>
    `;

    // 画面への書き込み
    document.getElementById('header-placeholder').innerHTML = headerHtml;
    document.getElementById('sidebar-placeholder').innerHTML = sidebarHtml;

    // アコーディオンの開閉クリックイベント設定
    document.querySelectorAll('.nav-item.group').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });

    // 【自動色付け機能】今開いているページのメニューを青くする
    const currentFile = window.location.pathname.split("/").pop();
    document.querySelectorAll('.submenu-item, .nav-item').forEach(el => {
        if (el.getAttribute('onclick')?.includes(currentFile)) {
            el.classList.add('text-[#87ceeb]', 'font-bold', 'bg-blue-600/10');
            // 親メニューを開いた状態にする
            el.closest('.nav-item.group')?.classList.add('open');
        }
    });
});
