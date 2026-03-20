// ── STATE ──────────────────────────────────────────
let currentStep = 1;

const SCORE_TEMPLATES = {
  "WISC-IV": {
    title: "WISC-IV — Escala Wechsler de Inteligência para Crianças",
    fields: [
      { key: "QIT", label: "QI Total (QIT)", cols: ["QI", "Percentil", "Classificação"] },
      { key: "ICV", label: "Índice de Compreensão Verbal (ICV)", cols: ["QI", "Percentil", "Classificação"] },
      { key: "IOP", label: "Índice de Organização Perceptual (IOP)", cols: ["QI", "Percentil", "Classificação"] },
      { key: "IMO", label: "Índice de Memória Operacional (IMO)", cols: ["QI", "Percentil", "Classificação"] },
      { key: "IVP", label: "Índice de Velocidade de Processamento (IVP)", cols: ["QI", "Percentil", "Classificação"] },
      { key: "ICG", label: "Índice de Capacidade Geral (ICG/GEMS)", cols: ["QI", "Percentil", "Classificação"] },
    ]
  },
  "WAIS-III": {
    title: "WAIS-III — Escala Wechsler de Inteligência para Adultos",
    fields: [
      { key: "QIT", label: "QI Total", cols: ["QI", "Percentil", "Classificação"] },
      { key: "QIV", label: "QI Verbal", cols: ["QI", "Percentil", "Classificação"] },
      { key: "QIE", label: "QI de Execução", cols: ["QI", "Percentil", "Classificação"] },
      { key: "IMO", label: "Índice de Memória Operacional", cols: ["PP", "Percentil", "Classificação"] },
      { key: "IVP", label: "Índice de Velocidade de Processamento", cols: ["PP", "Percentil", "Classificação"] },
    ]
  },
  "BETA-III": {
    title: "BETA-III — Inteligência Não-Verbal",
    fields: [
      { key: "rac_mat", label: "Raciocínio Matricial", cols: ["PB", "Percentil", "Classificação"] },
      { key: "codigos", label: "Subteste Códigos", cols: ["PB", "Percentil", "Classificação"] },
    ]
  },
  "BPA-2": {
    title: "BPA-2 — Bateria Psicológica para Avaliação da Atenção",
    fields: [
      { key: "AC", label: "Atenção Concentrada (AC)", cols: ["Pontos", "Percentil", "Classificação"] },
      { key: "AD", label: "Atenção Dividida (AD)", cols: ["Pontos", "Percentil", "Classificação"] },
      { key: "AA", label: "Atenção Alternada (AA)", cols: ["Pontos", "Percentil", "Classificação"] },
      { key: "AG", label: "Atenção Geral (AG)", cols: ["Pontos", "Percentil", "Classificação"] },
    ]
  },
  "TAVIS-4": {
    title: "TAVIS-4 — Teste de Atenção Visual",
    fields: [
      { key: "t1_om", label: "Tarefa 1 — Erros Omissão", cols: ["Nº Erros", "Percentil", "Classificação"] },
      { key: "t1_ac", label: "Tarefa 1 — Erros Ação", cols: ["Nº Erros", "Percentil", "Classificação"] },
      { key: "t2_om", label: "Tarefa 2 — Erros Omissão", cols: ["Nº Erros", "Percentil", "Classificação"] },
      { key: "t2_ac", label: "Tarefa 2 — Erros Ação", cols: ["Nº Erros", "Percentil", "Classificação"] },
      { key: "t3_om", label: "Tarefa 3 — Erros Omissão", cols: ["Nº Erros", "Percentil", "Classificação"] },
      { key: "t3_ac", label: "Tarefa 3 — Erros Ação", cols: ["Nº Erros", "Percentil", "Classificação"] },
    ]
  },
  "RAVLT": {
    title: "RAVLT — Teste de Aprendizagem Auditivo-Verbal de Rey",
    fields: [
      { key: "A1A5", label: "A1–A5 Escore Total (MCP Verbal)", cols: ["Escore", "Percentil", "Classificação"] },
      { key: "B1",   label: "B1 — Distrator", cols: ["Escore", "Percentil", "Classificação"] },
      { key: "A6",   label: "A6 — Evocação Imediata", cols: ["Escore", "Percentil", "Classificação"] },
      { key: "A7",   label: "A7 — Evocação Tardia (MLP)", cols: ["Escore", "Percentil", "Classificação"] },
      { key: "REC",  label: "Reconhecimento", cols: ["Escore", "Percentil", "Classificação"] },
      { key: "ALT",  label: "Aprendizagem (ALT)", cols: ["Escore", "Percentil", "Classificação"] },
      { key: "VE",   label: "Velocidade de Esquecimento (A7/A6)", cols: ["Escore", "Percentil", "Classificação"] },
    ]
  },
  "FDT": {
    title: "FDT — Teste dos Cinco Dígitos (Funções Executivas)",
    fields: [
      { key: "leit", label: "Leitura", cols: ["Tempo (s)", "Percentil", "Classificação"] },
      { key: "cont", label: "Contagem", cols: ["Tempo (s)", "Percentil", "Classificação"] },
      { key: "esc",  label: "Escolha", cols: ["Tempo (s)", "Percentil", "Classificação"] },
      { key: "alt",  label: "Alternância", cols: ["Tempo (s)", "Percentil", "Classificação"] },
      { key: "ci",   label: "Controle Inibitório", cols: ["Tempo (s)", "Percentil", "Classificação"] },
      { key: "fc",   label: "Flexibilidade Cognitiva", cols: ["Tempo (s)", "Percentil", "Classificação"] },
    ]
  },
  "TDE-II": {
    title: "TDE-II — Teste do Desempenho Escolar",
    fields: [
      { key: "escrita",    label: "Escrita", cols: ["PB", "Percentil", "Classificação"] },
      { key: "leitura",    label: "Leitura", cols: ["PB", "Percentil", "Classificação"] },
      { key: "aritmetica", label: "Aritmética", cols: ["PB", "Percentil", "Classificação"] },
    ]
  },
  "PROLEC": {
    title: "PROLEC — Avaliação dos Processos de Leitura",
    fields: [
      { key: "sel_lex",   label: "Seleção Lexical", cols: ["PB", "—", "Classificação"] },
      { key: "cat_sem",   label: "Categorização Semântica", cols: ["PB", "—", "Classificação"] },
      { key: "leit_pal",  label: "Leitura de Palavras", cols: ["PB", "—", "Classificação"] },
      { key: "leit_pse",  label: "Leitura de Pseudopalavras", cols: ["PB", "—", "Classificação"] },
      { key: "est_gram1", label: "Estruturas Gramaticais 1", cols: ["PB", "—", "Classificação"] },
      { key: "jul_gram",  label: "Julgamento Gramatical", cols: ["PB", "—", "Classificação"] },
      { key: "sinais",    label: "Sinais de Pontuação", cols: ["PB", "—", "Classificação"] },
      { key: "comp_exp",  label: "Compreensão Expositiva", cols: ["PB", "—", "Classificação"] },
      { key: "comp_nar",  label: "Compreensão Narrativa", cols: ["PB", "—", "Classificação"] },
      { key: "comp_mne",  label: "Compreensão Mnemônica", cols: ["PB", "—", "Classificação"] },
      { key: "comp_oral", label: "Compreensão Oral", cols: ["PB", "—", "Classificação"] },
    ]
  },
  "PROLEC-SE-R": {
    title: "PROLEC-SE-R — Processos de Leitura (6º-Médio)",
    fields: [
      { key: "leit_pal",  label: "Leitura de Palavras", cols: ["PB", "—", "Classificação"] },
      { key: "leit_pse",  label: "Leitura de Pseudopalavras", cols: ["PB", "—", "Classificação"] },
      { key: "est_gram",  label: "Estruturas Gramaticais", cols: ["PB", "—", "Classificação"] },
      { key: "comp_text", label: "Compreensão de Textos", cols: ["PB", "—", "Classificação"] },
    ]
  },
  "SNAP-IV": {
    title: "SNAP-IV — Escala de Avaliação TDAH/TOD",
    fields: [
      { key: "desat",  label: "Subescala Desatenção (itens 1-9)", cols: ["Pontos", "—", "Classificação"] },
      { key: "hiper",  label: "Subescala Hiperatividade/Impulsividade (itens 10-18)", cols: ["Pontos", "—", "Classificação"] },
      { key: "tod",    label: "Subescala TOD / Oposição (itens 19-26)", cols: ["Pontos", "—", "Classificação"] },
    ]
  },
  "ETDAH-AD": {
    title: "ETDAH-AD — Escala de Avaliação TDAH",
    fields: [
      { key: "desatencao", label: "Fator Desatenção (D)", cols: ["Percentil", "—", "Classificação"] },
      { key: "impulsiv",   label: "Fator Impulsividade (I)", cols: ["Percentil", "—", "Classificação"] },
      { key: "asp_emoc",   label: "Fator Aspectos Emocionais (AE)", cols: ["Percentil", "—", "Classificação"] },
      { key: "aama",       label: "Fator AAMA (Autorregulação)", cols: ["Percentil", "—", "Classificação"] },
      { key: "hiperatv",   label: "Fator Hiperatividade (H)", cols: ["Percentil", "—", "Classificação"] },
    ]
  },
  "SRS-2": {
    title: "SRS-2 — Escala de Responsividade Social",
    fields: [
      { key: "perc_soc", label: "Percepção Social", cols: ["PB", "Escore-T", "Classificação"] },
      { key: "cogn_soc", label: "Cognição Social", cols: ["PB", "Escore-T", "Classificação"] },
      { key: "com_soc",  label: "Comunicação Social", cols: ["PB", "Escore-T", "Classificação"] },
      { key: "mot_soc",  label: "Motivação Social", cols: ["PB", "Escore-T", "Classificação"] },
      { key: "pad_rep",  label: "Padrões Restritos e Repetitivos", cols: ["PB", "Escore-T", "Classificação"] },
      { key: "total",    label: "Escore Total", cols: ["PB", "Escore-T", "Classificação"] },
    ]
  },
  "RAADS-R-BR": {
    title: "RAADS-R-BR Screen — Rastreio TEA",
    fields: [
      { key: "total", label: "Pontuação Total (cutoff: 46)", cols: ["Pontos", "—", "Classificação"] },
    ]
  },
  "ATA": {
    title: "ATA — Escala de Avaliação de Traços Autísticos",
    fields: [
      { key: "total", label: "Pontuação Total (cutoff: 15)", cols: ["Pontos", "—", "Classificação"] },
    ]
  },
  "AQ-Adolescente": {
    title: "AQ-Adolescente — Autism Spectrum Quotient",
    fields: [
      { key: "habil_soc",    label: "Habilidades Sociais", cols: ["Pontos", "—", "Classificação"] },
      { key: "mud_atencao",  label: "Mudança de Atenção", cols: ["Pontos", "—", "Classificação"] },
      { key: "atencao_det",  label: "Atenção a Detalhes", cols: ["Pontos", "—", "Classificação"] },
      { key: "comunicacao",  label: "Comunicação", cols: ["Pontos", "—", "Classificação"] },
      { key: "imaginacao",   label: "Imaginação", cols: ["Pontos", "—", "Classificação"] },
      { key: "total",        label: "Total (cutoff: 30)", cols: ["Pontos", "—", "Classificação"] },
    ]
  },
  "SCARED AUTO": {
    title: "SCARED — Autorrelato (Ansiedade)",
    fields: [
      { key: "panico",   label: "Pânico / Sintomas Somáticos", cols: ["PB", "Percentil", "Classificação"] },
      { key: "ansgen",   label: "Ansiedade Generalizada", cols: ["PB", "Percentil", "Classificação"] },
      { key: "anssep",   label: "Ansiedade de Separação", cols: ["PB", "Percentil", "Classificação"] },
      { key: "fobia",    label: "Fobia Social", cols: ["PB", "Percentil", "Classificação"] },
      { key: "evit_esc", label: "Evitação Escolar", cols: ["PB", "Percentil", "Classificação"] },
      { key: "total",    label: "Total", cols: ["PB", "Percentil", "Classificação"] },
    ]
  },
  "SCARED HETERO": {
    title: "SCARED — Heterorrelato (Ansiedade)",
    fields: [
      { key: "panico",   label: "Pânico / Sintomas Somáticos", cols: ["PB", "Percentil", "Classificação"] },
      { key: "ansgen",   label: "Ansiedade Generalizada", cols: ["PB", "Percentil", "Classificação"] },
      { key: "anssep",   label: "Ansiedade de Separação", cols: ["PB", "Percentil", "Classificação"] },
      { key: "fobia",    label: "Fobia Social", cols: ["PB", "Percentil", "Classificação"] },
      { key: "evit_esc", label: "Evitação Escolar", cols: ["PB", "Percentil", "Classificação"] },
      { key: "total",    label: "Total", cols: ["PB", "Percentil", "Classificação"] },
    ]
  },
};

// ── NAVIGATION ──────────────────────────────────────────
function goStep(n) {
  if (n === 4 && currentStep === 3) buildScoresForms();
  document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active','done');
    if (i + 1 < n) s.classList.add('done');
    if (i + 1 === n) s.classList.add('active');
  });
  document.getElementById('phase' + n).classList.add('active');
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── BUILD SCORE FORMS ──────────────────────────────────────────
function buildScoresForms() {
  const checks = document.querySelectorAll('.instr-check input:checked');
  const container = document.getElementById('scores-container');
  container.innerHTML = '';

  if (checks.length === 0) {
    container.innerHTML = '<p style="color:var(--warn);font-size:14px;">⚠️ Nenhum instrumento selecionado. Volte e marque os testes aplicados.</p>';
    return;
  }

  checks.forEach(cb => {
    const key = cb.value;
    const tmpl = SCORE_TEMPLATES[key];
    if (!tmpl) {
      // Generic free-text for instruments without template
      container.innerHTML += `
        <div class="test-section">
          <div class="test-header" onclick="toggleTest(this)">
            <div class="test-header-left">
              <span class="test-badge">Escores</span>
              <div><div class="test-name">${key}</div></div>
            </div>
            <span class="toggle-icon">▾</span>
          </div>
          <div class="test-body open">
            <div class="field">
              <label>Resultados / Escores obtidos</label>
              <textarea data-inst="${key}" rows="4" placeholder="Descreva os resultados: escores brutos, percentis, classificações e observações relevantes deste instrumento..."></textarea>
            </div>
          </div>
        </div>`;
      return;
    }

    let rows = '';
    tmpl.fields.forEach(f => {
      rows += `<div class="score-row">
        <span class="score-label">${f.label}</span>
        <input class="score-input" data-inst="${key}" data-field="${f.key}_col1" placeholder="${f.cols[0]}">
        <input class="score-input" data-inst="${key}" data-field="${f.key}_col2" placeholder="${f.cols[1]}">
        <input class="score-input" data-inst="${key}" data-field="${f.key}_col3" placeholder="${f.cols[2]}">
      </div>`;
    });

    container.innerHTML += `
      <div class="test-section">
        <div class="test-header" onclick="toggleTest(this)">
          <div class="test-header-left">
            <span class="test-badge">Escores</span>
            <div><div class="test-name">${tmpl.title}</div></div>
          </div>
          <span class="toggle-icon">▾</span>
        </div>
        <div class="test-body open">
          <div class="score-row" style="padding-bottom:6px;border-bottom:2px solid var(--teal-pale)">
            <span class="score-head" style="text-align:left">Subteste / Índice</span>
            <span class="score-head">${tmpl.fields[0].cols[0]}</span>
            <span class="score-head">${tmpl.fields[0].cols[1]}</span>
            <span class="score-head">${tmpl.fields[0].cols[2]}</span>
          </div>
          ${rows}
          <div class="field" style="margin-top:12px">
            <label>Observações adicionais (${key})</label>
            <textarea data-inst="${key}" data-field="obs" rows="2" placeholder="Síntese clínica, padrões observados, pontos relevantes..."></textarea>
          </div>
        </div>
      </div>`;
  });
}

function toggleTest(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  body.classList.toggle('open');
  icon.textContent = body.classList.contains('open') ? '▾' : '▸';
}

// ── COLLECT DATA ──────────────────────────────────────────
function collectData() {
  const pac = {
    nome: v('pac_nome'), nasc: v('pac_nasc'), sexo: v('pac_sexo'),
    lat: v('pac_lat'), cpf: v('pac_cpf'), natural: v('pac_natural'),
    mae: v('pac_mae'), pai: v('pac_pai'), escola: v('pac_escola'),
    serie: v('pac_serie'),
  };
  const psi = {
    nome: v('psi_nome'), crp: v('psi_crp'), espec: v('psi_espec'),
    sol: v('sol_nome'), finalidade: v('finalidade'), data: v('data_aval'),
  };
  const ana = {
    demanda: v('ana_demanda'), prenatal: v('ana_prenatal'),
    neurodev: v('ana_neurodev'), escolar: v('ana_escolar'),
    tratamentos: v('ana_tratamentos'), sensorial: v('ana_sensorial'),
    escola_relat: v('ana_escola_relat'),
  };

  // Scores
  const instruments = {};
  document.querySelectorAll('[data-inst]').forEach(el => {
    const inst = el.getAttribute('data-inst');
    const field = el.getAttribute('data-field') || 'texto_livre';
    if (!instruments[inst]) instruments[inst] = {};
    instruments[inst][field] = el.value.trim();
  });

  const obs = v('obs_sessao');
  const tom = v('opt_tom');
  const secoes = v('opt_secoes');

  return { pac, psi, ana, instruments, obs, tom, secoes };
}

function v(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

// ── GENERATE REPORT ──────────────────────────────────────────
async function gerarLaudo() {
  const btn = document.getElementById('btn-gerar');
  const outputArea = document.getElementById('output-area');
  const laudoEl = document.getElementById('laudo-output');

  btn.disabled = true; btn.textContent = '⏳ Gerando laudo...';
  outputArea.style.display = 'block';
  laudoEl.className = 'loading';
  laudoEl.innerHTML = '<div class="spinner"></div> A IA está redigindo o laudo clínico...';
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  const data = collectData();
  const prompt = buildPrompt(data);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        system: "Você é um neuropsicólogo especialista com domínio completo das normas do CFP (Resoluções 06/2019, 01/2009 e 31/2022). Redija laudos neuropsicológicos completos, profissionais e tecnicamente precisos. Nunca invente escores. Faça integração real dos dados clínicos. Use linguagem clínica precisa e contextualizada.",
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${response.status}`);
    }

    const result = await response.json();
    const text = result.content?.map(c => c.text || '').join('') || 'Erro ao gerar laudo.';
    laudoEl.className = '';
    laudoEl.textContent = text;
  } catch(e) {
    laudoEl.className = '';
    laudoEl.innerHTML = `<span style="color:var(--warn)">⚠️ Erro ao gerar laudo: ${e.message}<br><br>Verifique sua conexão e tente novamente.</span>`;
  }

  btn.disabled = false; btn.textContent = '✨ Gerar Laudo Completo';
}

function buildPrompt(d) {
  const { pac, psi, ana, instruments, obs, tom, secoes } = d;

  // Calcula idade
  let idadeStr = '';
  if (pac.nasc) {
    const nasc = new Date(pac.nasc);
    const hoje = new Date();
    const anos = hoje.getFullYear() - nasc.getFullYear();
    const meses = hoje.getMonth() - nasc.getMonth();
    idadeStr = `${anos} anos e ${((meses + 12) % 12)} meses`;
  }

  // Monta escores em texto estruturado
  let escoresText = '';
  for (const [inst, fields] of Object.entries(instruments)) {
    if (Object.values(fields).some(v => v)) {
      escoresText += `\n\n### ${inst}\n`;
      for (const [fk, fv] of Object.entries(fields)) {
        if (fv) escoresText += `- ${fk}: ${fv}\n`;
      }
    }
  }

  const tomDesc = tom === 'clinico' ? 'técnico-clínico, com linguagem científica conforme padrão CFP'
    : tom === 'didatico' ? 'acessível e didático, para ser compreendido por familiares e escola, mas mantendo precisão clínica'
    : 'formal e pericial, com linguagem objetiva para uso judicial ou médico';

  return `Você é um neuropsicólogo especialista com domínio completo das normas do CFP (Resoluções 06/2019, 01/2009 e 31/2022). Você irá redigir um laudo neuropsicológico COMPLETO, PROFISSIONAL e TECNICAMENTE PRECISO para a Clínica Equilibrium Med Center.

O tom deve ser: ${tomDesc}.
Seções a incluir: ${secoes === 'so_conclusao' ? 'APENAS Hipótese Diagnóstica e Conclusão' : secoes === 'sem_ref' ? 'Laudo completo exceto referências bibliográficas' : 'Laudo neuropsicológico completo com todas as seções'}.

═══════════════════════════════════════
DADOS DO CASO
═══════════════════════════════════════

PACIENTE:
- Nome: ${pac.nome || '[não informado]'}
- Data Nascimento: ${pac.nasc || '[não informada]'} (Idade: ${idadeStr || '[calcular]'})
- Sexo: ${pac.sexo} | Lateralidade: ${pac.lat}
- CPF: ${pac.cpf || '[não informado]'}
- Natural de: ${pac.natural || '[não informado]'}
- Mãe: ${pac.mae || '[não informada]'} | Pai: ${pac.pai || '[não informado]'}
- Escolaridade: ${pac.escola} — ${pac.serie || '[série não informada]'}

PROFISSIONAL RESPONSÁVEL:
- Neuropsicólogo(a): ${psi.nome || '[não informado]'} — CRP: ${psi.crp || '[não informado]'}
- Qualificações: ${psi.espec || '[não informadas]'}
- Profissional Solicitante: ${psi.sol || '[não informado]'}
- Finalidade / Hipóteses CID-11: ${psi.finalidade || '[não informadas]'}
- Data da Avaliação: ${psi.data || '[não informada]'}

═══════════════════════════════════════
ANAMNESE
═══════════════════════════════════════

DESCRIÇÃO DA DEMANDA:
${ana.demanda || '[não informada]'}

HISTÓRICO PRÉ-NATAL E PERINATAL:
${ana.prenatal || '[não informado]'}

HISTÓRICO DO NEURODESENVOLVIMENTO:
${ana.neurodev || '[não informado]'}

HISTÓRICO ESCOLAR:
${ana.escolar || '[não informado]'}

HISTÓRICO DE INTERVENÇÕES E TRATAMENTOS:
${ana.tratamentos || '[não informado]'}

PERFIL SENSORIAL E COMPORTAMENTOS:
${ana.sensorial || '[não informado]'}

RELATÓRIO DA ESCOLA / OBSERVAÇÕES ESCOLARES:
${ana.escola_relat || '[não informado]'}

═══════════════════════════════════════
INSTRUMENTOS E ESCORES OBTIDOS
═══════════════════════════════════════
${escoresText || '[Escores não informados — redija o laudo com base nas informações disponíveis]'}

═══════════════════════════════════════
OBSERVAÇÕES COMPORTAMENTAIS DA SESSÃO
═══════════════════════════════════════
${obs || '[não informadas]'}

═══════════════════════════════════════
INSTRUÇÕES PARA O LAUDO
═══════════════════════════════════════

Redija o laudo completo seguindo EXATAMENTE esta estrutura:

1. REFERENCIAL TEÓRICO — breve embasamento sobre neuropsicologia e avaliação neuropsicológica (cite Malloy-Diniz, 2008; Lezak et al., 2004).

2. IDENTIFICAÇÃO DO PACIENTE — apresente todos os dados cadastrais de forma organizada.

3. IDENTIFICAÇÃO PROFISSIONAL — responsável técnico, solicitante e finalidade.

4. ENTREVISTA DE ANAMNESE — com subseções:
   - Descrição da Demanda (interpretação clínica das queixas, NÃO apenas transcrição)
   - Histórico Pré-Natal e Perinatal
   - Histórico do Neurodesenvolvimento
   - Histórico Escolar
   - Histórico de Intervenções e Tratamentos
   - Perfil Sensorial e Comportamentos Relacionados

5. RELATÓRIO ESCOLAR (se informado)

6. PROCEDIMENTOS — liste os instrumentos utilizados com suas descrições técnicas.

7. RESULTADOS — para CADA instrumento, apresente:
   - Introdução explicando o que o teste avalia
   - Tabela ou descrição estruturada dos escores obtidos
   - Interpretação clínica detalhada dos resultados, com linguagem específica para cada domínio cognitivo
   - Cruzamento com as queixas da anamnese quando relevante

8. INTEGRAÇÃO DOS RESULTADOS — análise transversal que cruza todos os instrumentos, identificando padrões, discrepâncias e o perfil cognitivo global do paciente.

9. HIPÓTESE DIAGNÓSTICA — liste as hipóteses com CID-11 de forma clara e fundamentada.

10. CONCLUSÃO — síntese objetiva e clínica do perfil.

11. ORIENTAÇÕES E ENCAMINHAMENTOS — plano de intervenção específico para o caso.

${secoes !== 'sem_ref' ? '12. REFERÊNCIAS BIBLIOGRÁFICAS — liste todas as referências dos instrumentos utilizados.' : ''}

REGRAS INVIOLÁVEIS:
- Nunca invente escores. Se um escore não foi informado, omita ou mencione que não foi coletado.
- Use linguagem clínica precisa. Evite termos genéricos como "apresenta dificuldades" sem contextualizar.
- Faça integração real dos dados — o laudo deve contar uma história clínica coerente.
- Mencione o nome do paciente ao longo do texto (não use "o paciente" apenas).
- O laudo deve estar em conformidade com as Resoluções CFP 06/2019, 01/2009 e 31/2022.
- Local e data ao final: Uberlândia, ${psi.data ? new Date(psi.data).toLocaleDateString('pt-BR', {day:'numeric',month:'long',year:'numeric'}) : 'data da avaliação'}.

Comece diretamente com o laudo, sem introdução ou explicação prévia.`;
}

function copiarLaudo() {
  const texto = document.getElementById('laudo-output').textContent;
  navigator.clipboard.writeText(texto).then(() => {
    alert('Laudo copiado para a área de transferência!');
  });
}
