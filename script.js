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
            <div><div class="
