// Global functions requested
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    document.getElementById('darkIcon').classList.toggle('hidden');
    document.getElementById('lightIcon').classList.toggle('hidden');
}
 
function changeJournalFont(fontFamily) {
    document.querySelectorAll('.handwriting-text').forEach(el => {
        el.style.fontFamily = fontFamily;
    });
    if (typeof showToast === 'function') showToast("Journal font updated!");
}

function changeFontSize(size) {
    const map = { small: '1.2rem', medium: '1.5rem', large: '1.8rem' };
    document.querySelectorAll('.handwriting-text').forEach(el => {
        el.style.fontSize = map[size] || '1.5rem';
    });
    if (typeof showToast === 'function') showToast(`Font size set to ${size}`);
}

function openModal(id) { 
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden'); 
}

function closeModal(id) { 
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden'); 
}

class AppHeader extends HTMLElement {
    connectedCallback() {
        this.style.display = 'block';
        this.style.width = '100%';
        this.style.position = 'sticky';
        this.style.top = '0';
        this.style.zIndex = '40';
        this.innerHTML = `
        <header class="w-full sticky top-0 z-40 bg-midnightViolet text-brandBlush backdrop-blur-md border-b border-brandTaupe/40 px-4 lg:px-8 py-3 flex items-center justify-between shadow-md transition-colors">
        <a href="/">
        <div class="flex items-center gap-3">
            <img src="Image/logo1.png" alt="PustakaTranslate Logo" class="h-8 w-auto object-contain aspect-[16/9]" />
            <div>
                <h1 class="font-serif text-lg font-bold tracking-tight text-brandBlush">Tinta Ritma</h1>
                <p class="text-[10px] tracking-widest uppercase font-semibold text-brandMint">Workbench Translator</p>
            </div>
        </div></a>

        <div class="flex items-center gap-4 sm:gap-6">
            <nav class="flex items-center gap-4 sm:gap-6 text-sm font-medium text-brandBlush/90">
                <button onclick="openModal('aboutModal')" class="hover:text-brandCoral transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-info"></i> About
                </button>
                <button onclick="openModal('settingsModal')" class="hover:text-brandCoral transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-sliders"></i> Settings
                </button>
                <button onclick="openModal('helpModal')" class="hover:text-brandCoral transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-question"></i> Help
                </button>
            </nav>

            <button id="darkModeBtn" onclick="toggleDarkMode()" class="p-2.5 rounded-full bg-midnightViolet/80 text-brandCoral hover:bg-midnightViolet transition-all shadow-sm border border-brandCoral/40" title="Toggle Theme">
                <svg id="darkIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>
                <svg id="lightIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 hidden"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            </button>
        </div>
    </header>

    <!-- MODALS -->
    <!-- ABOUT TINTA RITMA MODAL -->
<div id="aboutModal" class="fixed inset-0 bg-midnightViolet/70 backdrop-blur-md z-50 hidden flex items-center justify-center p-4 sm:p-6">
    <div class="bg-brandBlush dark:bg-midnightViolet border border-brandTaupe dark:border-[#4b543b] p-6 sm:p-8 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[88vh] flex flex-col justify-between overflow-y-auto">
        
        <!-- Header & Title -->
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-brandTaupe/60 dark:border-white/10">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-midnightViolet text-brandBlush dark:bg-brandCoral dark:text-midnightViolet flex items-center justify-center font-bold shadow">
                    <i class="fa-solid fa-feather-pointed text-lg"></i>
                </div>
                <div>
                    <h3 class="font-serif text-2xl font-bold text-midnightViolet dark:text-brandBlush">About Tinta Ritma</h3>
                    <p class="text-xs uppercase tracking-widest text-midnightViolet/60 dark:text-brandBlush/60 font-semibold">Language Services & Education Technology</p>
                </div>
            </div>
            <button onclick="closeModal('aboutModal')" class="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-midnightViolet dark:text-brandBlush flex items-center justify-center transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <!-- Scrollable Content Body -->
        <div class="space-y-6 text-sm text-midnightViolet/90 dark:text-brandBlush/90 font-sans leading-relaxed pr-1">
            
            <!-- Intro Story -->
            <div>
                <p class="mb-3">
                    Founded in <strong>2012 in Kuala Lumpur, Malaysia</strong>, <strong>Tinta Ritma Sdn Bhd</strong> combines <span class="italic font-serif">"Tinta"</span> (Ink) and <span class="italic font-serif">"Ritma"</span> (Rhythm)—reflecting our belief that language is both a meticulous written craft and an expressive spoken flow.
                </p>
                <p>
                    With over 85 dedicated staff members, we transcribe classical manuscripts and literary texts obtained directly from authors and archives, building modern technology tools to make literary knowledge interactive and living.
                </p>
            </div>

            <!-- Vision & Mission Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="p-3.5 rounded-xl bg-white/60 dark:bg-black/20 border border-brandTaupe/50 dark:border-white/10">
                    <div class="text-xs font-bold uppercase tracking-wider text-midnightViolet dark:text-brandCoral mb-1 flex items-center gap-1.5">
                        <i class="fa-solid fa-eye text-xs"></i> Our Vision
                    </div>
                    <p class="text-xs leading-normal">
                        To make literature accessible, living, and relevant in the digital age.
                    </p>
                </div>

                <div class="p-3.5 rounded-xl bg-white/60 dark:bg-black/20 border border-brandTaupe/50 dark:border-white/10">
                    <div class="text-xs font-bold uppercase tracking-wider text-midnightViolet dark:text-brandCoral mb-1 flex items-center gap-1.5">
                        <i class="fa-solid fa-bullseye text-xs"></i> Our Mission
                    </div>
                    <p class="text-xs leading-normal">
                        To merge literary heritage with innovative technology so everyone can discover and create language.
                    </p>
                </div>
            </div>

            <!-- Side-by-Side Logo Showcase -->
            <div class="pt-2 border-t border-brandTaupe/40 dark:border-white/10">
                <h4 class="text-xs font-bold uppercase tracking-wider text-midnightViolet/70 dark:text-brandBlush/70 mb-3">Brand Identity & Emblem</h4>
                
                <div class="grid grid-cols-2 gap-4 items-center">
                    <!-- Logo Box 1 (Light Background) -->
                    <div class="aspect-square bg-white border border-brandTaupe/60 dark:border-white/10 rounded-xl p-4 flex items-center justify-center shadow-sm hover:shadow transition">
                        <img src="Image/logo2.png" alt="Tinta Ritma Logo Light Variant" class="w-full h-full object-contain">
                    </div>

                    <!-- Logo Box 2 (Dark Background) -->
                    <div class="aspect-square bg-midnightViolet border border-brandTaupe/60 dark:border-white/10 rounded-xl p-4 flex items-center justify-center shadow-sm hover:shadow transition">
                        <img src="Image/logo1.png" alt="Tinta Ritma Logo Dark Variant" class="w-full h-full object-contain">
                    </div>
                </div>

                <p class="text-xs italic text-midnightViolet/80 dark:text-brandBlush/80 mt-3 text-center leading-normal">
                    The violet hue signifies <strong>trust and knowledge</strong>, the cursive <strong>'T'</strong> stems from "Tinta", and the pen emblem honors our dedication to literature.
                </p>
            </div>

            <!-- Corporate Leadership & Team Summary -->
            <div class="p-4 rounded-xl bg-brandTaupe/20 dark:bg-white/5 border border-brandTaupe/40 dark:border-white/10 text-xs space-y-1.5 font-mono">
                <div><strong class="text-midnightViolet dark:text-brandCoral">Managing Director & Founder:</strong> Dr. Huseina Binti Abdullah</div>
                <div><strong class="text-midnightViolet dark:text-brandCoral">Core Team:</strong> Software Engineers, Literary Editors, UX/Digitization Specialists & Admin</div>
                <div><strong class="text-midnightViolet dark:text-brandCoral">Objective:</strong> Leading language literacy tech platform in Malaysia.</div>
            </div>

        </div>

        <!-- Close Action Button -->
        <div class="pt-5 mt-4 border-t border-brandTaupe/60 dark:border-white/10">
            <button onclick="closeModal('aboutModal')" class="w-full py-2.5 bg-brandCoral hover:bg-brandCoral-hover text-midnightViolet font-bold rounded-xl text-sm transition shadow-md border border-brandCoral-dark">
                Close About Panel
            </button>
        </div>

    </div>
</div>
<div id="settingsModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-[#f4ebe8] dark:bg-[#24211e] border border-[#d6cbbf] dark:border-[#4b543b] p-6 rounded-2xl max-w-md w-full shadow-2xl">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#d6cbbf] dark:border-[#422040]">
            <h3 class="font-serif text-xl font-bold text-[#422040] dark:text-[#f2c3b9]">Workbench Settings</h3>
            <button onclick="closeModal('settingsModal')" class="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <div class="space-y-4 text-sm font-sans text-stone-700 dark:text-stone-300">
            <!-- Font Style Picker -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#422040] dark:text-[#97b3ae] mb-1.5">Journal Handwriting Font</label>
                <select id="fontSelector" onchange="changeJournalFont(this.value)" class="w-full bg-white dark:bg-[#1e1a18] border border-[#d6cbbf] dark:border-stone-700 rounded-lg px-3 py-2 text-sm text-stone-800 dark:text-stone-100 focus:outline-none">
                    <option value="'Caveat', cursive" selected>Caveat (Casual Cursive)</option>
                    <option value="'Kalam', cursive">Kalam (Notebook Pen)</option>
                    <option value="'Cinzel', serif">Cinzel (Classic Novel / Serif)</option>
                    <option value="'Courier Prime', monospace">Courier (Vintage Typewriter)</option>
                    <option value="'Inter', sans-serif">Inter (Clean Modern Sans)</option>
                </select>
            </div>

            <!-- Font Size Toggle -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#422040] dark:text-[#97b3ae] mb-1.5">Font Size</label>
                <div class="flex items-center gap-2">
                    <button onclick="changeFontSize('small')" class="flex-1 py-1.5 border border-[#d6cbbf] dark:border-stone-700 rounded-lg text-xs font-bold hover:bg-[#f2c3b9]/20">Small</button>
                    <button onclick="changeFontSize('medium')" class="flex-1 py-1.5 border border-[#422040] bg-[#422040] text-white rounded-lg text-xs font-bold">Medium</button>
                    <button onclick="changeFontSize('large')" class="flex-1 py-1.5 border border-[#d6cbbf] dark:border-stone-700 rounded-lg text-xs font-bold hover:bg-[#f2c3b9]/20">Large</button>
                </div>
            </div>

            <!-- Script / Learning Toggle -->
            <div class="pt-2 border-t border-[#d6cbbf]/60 dark:border-stone-700 space-y-2.5">
                <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-xs font-semibold">Show Phonetic Script (Pinyin / Romaji)</span>
                    <input type="checkbox" id="phoneticToggle" class="accent-[#e57a44] rounded">
                </label>
                <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-xs font-semibold">3D Scroll Physics Unfolding</span>
                    <input type="checkbox" id="physicsToggle" checked class="accent-[#e57a44] rounded">
                </label>
            </div>
        </div>

        <button onclick="closeModal('settingsModal')" class="w-full mt-6 py-2.5 bg-[#422040] hover:bg-[#321831] text-white font-bold rounded-xl text-sm shadow transition">Apply & Save</button>
    </div>
</div>

    <div id="helpModal" class="fixed inset-0 bg-midnightViolet/70 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-brandBlush dark:bg-midnightViolet border border-brandTaupe p-6 rounded-xl max-w-md w-full shadow-2xl">
            <h3 class="font-serif text-xl font-bold text-midnightViolet dark:text-brandBlush mb-2">How to Use</h3>
            <ul class="list-disc list-inside space-y-2 text-xs text-midnightViolet dark:text-brandBlush font-sans mb-6">
                <li>Write or paste source text on Page 01.</li>
                <li>Click <strong>TRANSLATE</strong> or scroll down to open the translated text in the journal.</li>
                <li>Click into Page 02 to edit the translated text.</li>
                <li>The various tabs besides the Page 02 serves different functions.</li>
                
            </ul>
            <button onclick="closeModal('helpModal')" class="w-full py-2 bg-brandCoral hover:bg-brandCoral-hover text-midnightViolet font-bold rounded-lg text-sm transition shadow border border-brandCoral-dark">Got it</button>
        </div>
    </div>
    `;
    }
}

customElements.define('app-header', AppHeader);