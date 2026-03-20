// CONFIGURAÇÕES E TEMPLATES
const INSTRUMENT_GROUPS = [
    { label: "🧠 Inteligência", items: ["WISC-IV","WAIS-III","BETA-III","CPM-RAVEN","SON-R","WMT-2","TIAH/S"] },
    { label: "👁️ Atenção", items: ["BPA-2","TAVIS-4","TESTE D2-R","TEACO/TEADI/TEALT"] },
    { label: "🔄 Funções Executivas", items: ["FDT","TORRE DE LONDRES","BDEFS"] },
    { label: "🧩 Memória", items: ["RAVLT","TEPIC-M-2","TIME-R"] },
    { label: "📖 Leitura, Escrita e Aprendizagem", items: ["TDE-II","PROLEC","PROLEC-SE-R"] },
    { label: "⚡ TDAH", items: ["SNAP-IV","ETDAH-AD","ETDAH-PAIS","ASRS-18","BAARS-IV"] },
    { label: "🔵 TEA / Autismo", items: ["SRS-2","RAADS-R-BR","ATA","AQ-Adolescente","ADOS-2"] },
    { label: "😰 Ansiedade / Humor", items: ["SCARED AUTO","SCARED HETERO","BAI","BDI-II"] }
];

const SCORE_TEMPLATES = {
    "WISC-IV": { title:"WISC-IV — Escala Wechsler de Inteligência para Crianças", cols:["QI / Escore","Percentil","Classificação"], fields:[{k:"QIT",l:"QI Total (QIT)"},{k:"ICV",l:"Índice de Compreensão Verbal (ICV)"},{k:"IOP",l:"Índice de Organização Perceptual (IOP)"},{k:"IMO",l:"Índice de Memória Operacional (IMO)"},{k:"IVP",l:"Índice de Velocidade de Processamento (IVP)"}]},
    "BPA-2": { title:"BPA-2 — Bateria Psicológica para Avaliação da Atenção", cols:["Pontos","Percentil","Classificação"], fields:[{k:"AC",l:"Atenção Concentrada (AC)"},{k:"AD",l:"Atenção Dividida (AD)"},{k:"AA",l:"Atenção Alternada (AA)"},{k:"AG",l:"Atenção Geral (AG)"}]},
    "RAVLT": { title:"RAVLT — Teste de Aprendizagem Auditivo-Verbal de Rey", cols:["Escore","Percentil","Classificação"], fields:[{k:"A1A5",l:"A1–A5 Total (MCP)"},{k:"A7",l:"A7 — Evocação Tardia (MLP)"},{k:"REC",l:"Reconhecimento"}]},
    "SNAP-IV": { title:"SNAP-IV — Escala TDAH/TOD", cols:["Pontos","—","Classificação"], fields:[{k:"des",l:"Desatenção"},{k:"hip",l:"Hiperatividade"},{k:"tod",l:"TOD / Oposição"}]}
};

// NAVEGAÇÃO
let currentStep = 1;

function goStep(n) {
    if (n === 4 && currentStep < 4) buildScoreForms();
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById('phase' + n).classList.add('active');
    
    document.querySelectorAll('.step').forEach((s, i) => {
        s.classList.remove('active','done');
        if (i+1 < n) {
            s.classList.add('done');
            s.querySelector('.num').textContent = '✓';
        } else if (i+1 === n) {
            s.classList.add('active');
            s.querySelector('.num').textContent = i+1;
        }
    });
    currentStep = n;
    window.scrollTo({top:0, behavior:'smooth'});
}

// CONSTRUÇÃO DA LISTA DE INSTRUMENTOS
(function buildInstruments() {
    const container = document.getElementById('instruments-list');
    if(!container) return;
    INSTRUMENT_GROUPS.forEach(g => {
        const col = document.createElement('div');
        col.innerHTML = `<div class="grp-lbl">${g.label}</div>`;
        g.items.forEach(item => {
            const lbl = document.createElement('label');
            lbl.className = 'ic';
            lbl.innerHTML = `<input type="checkbox" value="${item}" onchange="updateInstrSummary()"> ${item}`;
            col.appendChild(lbl);
        });
        container.appendChild(col);
    });
})();

function updateInstrSummary() {
    const checked = [...document.querySelectorAll('#instruments-list input:checked')].map(c => c.value);
    const box = document.getElementById('instr-summary');
    if (checked.length > 0) {
        box.style.display = 'block';
        box.innerHTML = `✅ <strong>${checked.length} instrumento(s):</strong> ${checked.join(' · ')}`;
    } else {
        box.style.display = 'none';
    }
}

// FORMULÁRIOS DE ESCORES
function buildScoreForms() {
    const checked = [...document.querySelectorAll('#instruments-list input:checked')].map(c => c.value);
    const container = document.getElementById('scores-container');
    container.innerHTML = '';
    
    if (!checked.length) {
        container.innerHTML = '<p style="color:var(--warn);">⚠️ Selecione instrumentos na etapa anterior.</p>';
        return;
    }

    checked.forEach(inst => {
        const tmpl = SCORE_TEMPLATES[inst];
        const div = document.createElement('div');
        div.style.marginBottom = '20px';
        
        const html = `
            <div class="th" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                <div class="th-l"><span class="badge">Escores</span><span class="tn">${tmpl ? tmpl.title : inst}</span></div>
                <span>▾</span>
            </div>
            <div class="body-score">
                ${tmpl ? renderTemplate(inst, tmpl) : `<textarea data-inst="${inst}" data-field="obs" rows="4" placeholder="Insira os resultados..."></textarea>`}
            </div>
        `;
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function renderTemplate(inst, tmpl) {
    let rows = tmpl.fields.map(f => `
        <div class="sc-row">
            <span class="sc-lbl">${f.l}</span>
            <input class="sc-inp" data-inst="${inst}" data-field="${f.k}_c1" placeholder="${tmpl.cols[0]}">
            <input class="sc-inp" data-inst="${inst}" data-field="${f.k}_c2" placeholder="${tmpl.cols[1]}">
            <input class="sc-inp" data-inst="${inst}" data-field="${f.k}_c3" placeholder="${tmpl.cols[2]}">
        </div>
    `).join('');
    return rows + `<div class="fld"><label>Observações (${inst})</label><textarea data-inst="${inst}" data-field="obs" rows="2"></textarea></div>`;
}

// GERADOR DE LAUDO (API)
async function gerarLaudo() {
    const apiKey = document.getElementById('api_key').value.trim();
    if (!apiKey) { alert('Insira a chave da API.'); return; }

    const btn = document.getElementById('btn-gerar');
    const outputArea = document.getElementById('output-area');
    const laudoEl = document.getElementById('laudo-output');

    btn.disabled = true;
    btn.textContent = '⏳ Gerando...';
    outputArea.classList.remove('hidden');
    laudoEl.innerHTML = 'A IA está redigindo o laudo...';

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 4000,
                messages: [{ role: 'user', content: "Gere um laudo com base nos dados fornecidos..." }] // Aqui vai a lógica do prompt
            })
        });

        const data = await response.json();
        laudoEl.textContent = data.content[0].text;
    } catch(e) {
        laudoEl.textContent = "Erro: " + e.message;
    } finally {
        btn.disabled = false;
        btn.textContent = '✨ Gerar Laudo Completo';
    }
}

// AUXILIARES
function copiarLaudo() {
    const text = document.getElementById('laudo-output').textContent;
    navigator.clipboard.writeText(text).then(() => alert('Copiado!'));
}

function salvarKey() {
    const k = document.getElementById('api_key').value;
    localStorage.setItem('eq_api_key', k);
    alert('Chave salva!');
}

function checkKey() {
    const k = document.getElementById('api_key').value;
    const box = document.getElementById('key-box');
    if (k.startsWith('sk-ant-')) box.classList.add('key-ok');
}
