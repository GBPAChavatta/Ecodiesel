// Sprints adaptadas com foco em App Móvel (sem Dashboard Web separado, tudo no App)
const presentationSprints = {
  piloto: [
    {
      id: "MVP-P1",
      tag: "Sprint 1.1",
      weeks: "Semanas 1-2",
      name: "Setup Edge & Ingestão das Câmeras (Matriz)",
      hours: "80h",
      front: "DevOps & IA de Borda",
      summary: "Mapeamento das 32 câmeras da matriz da Ecodiesel, instalação do sistema operacional no servidor edge local e configuração do Frigate NVR com detecção local acelerada via GPU.",
      userStories: [
        {
          title: "Infraestrutura Física de Borda",
          text: "Como desenvolvedor, quero configurar a máquina física local na matriz com Ubuntu Server, CUDA e drivers NVIDIA, garantindo o processamento das 32 câmeras."
        },
        {
          title: "Ingestão e Separação de Frames",
          text: "Como analista de IA, quero capturar streams RTSP locais no Frigate NVR usando decodificação por hardware (NVDEC), isolando o tráfego de vídeo na VLAN interna."
        }
      ],
      tasks: [
        { desc: "Mapeamento físico de switches, VLANs e catalogação de chaves RTSP", est: "20h" },
        { desc: "Setup do Ubuntu Server 24.04, drivers CUDA/NVIDIA e Docker daemon", est: "10h" },
        { desc: "Configuração do Frigate NVR para ingestão das 32 câmeras da matriz", est: "20h" },
        { desc: "Compilação da engine TensorRT do YOLOv8n em FP16 (inferência <15ms)", est: "15h" },
        { desc: "Parametrização do algoritmo de rastreamento ByteTrack local", est: "12h" },
        { desc: "Ajuste físico de estabilidade e refrigeração do nó piloto", est: "3h" }
      ]
    },
    {
      id: "MVP-P2",
      tag: "Sprint 1.2",
      weeks: "Semanas 3-4",
      name: "Motor de Regras & Painel Web Local",
      hours: "80h",
      front: "Backend & Front Local",
      summary: "Desenvolvimento da lógica analítica FastAPI (tempo de permanência, ROIs) e criação de um Dashboard simplificado acessível apenas na rede local via SSE para homologação rápida.",
      userStories: [
        {
          title: "Lógica de Exclusão de Falsos Alertas",
          text: "Como operador local, quero definir polígonos de exclusão (ROIs) no FastAPI para evitar que animais e vento gerem alarmes falsos de invasão."
        },
        {
          title: "Visualizador de Homologação",
          text: "Como Fernando (representante Ecodiesel), quero acessar um link local de navegador que emita alertas e sons no pátio da matriz em menos de 5 segundos."
        }
      ],
      tasks: [
        { desc: "Codificação do Motor de Regras FastAPI (ROIs e permanência >2s)", est: "20h" },
        { desc: "Setup de persistência SQLite e rotina automática de expurgo (30 dias)", est: "15h" },
        { desc: "Desenho da interface web do painel local usando Server-Sent Events", est: "25h" },
        { desc: "Calibração dos limiares de acurácia sob poeira e faróis de veículos", est: "12h" },
        { desc: "Testes de homologação do piloto e encerramento de fase", est: "8h" }
      ]
    }
  ],
  fase2: [
    {
      id: "AP-F2-1",
      tag: "Sprint 2.1",
      weeks: "Semanas 1-2",
      name: "Conectividade de Rede: SD-WAN VPN Criptografada",
      hours: "80h",
      front: "DevOps / Redes",
      summary: "Interligar os 14 prédios da Ecodiesel em uma rede privada segura via VPN IPSec (SD-WAN), estabelecendo rotas outbound de Zero Ingress (sem portas abertas).",
      userStories: [
        {
          title: "Rede Blindada de Comunicação",
          text: "Como DevOps, quero mapear as rotas físicas de rede de todas as filiais e subir túneis VPN criptografados para centralizar o envio seguro de dados leves."
        }
      ],
      tasks: [
        { desc: "Catalogar IPs, switches e VLANs nas 14 filiais da empresa", est: "50h" },
        { desc: "Implementar túnel de VPN IPSec/SD-WAN de saída e regras rígidas de firewall", est: "30h" }
      ]
    },
    {
      id: "AP-F2-2",
      tag: "Sprint 2.2",
      weeks: "Semanas 3-4",
      name: "Master Node Kubernetes & Golden Image SO",
      hours: "100h",
      front: "SRE / Infra",
      summary: "Provisionar o servidor central do Kubernetes (k3s master) e consolidar a imagem de sistema operacional padrão para replicar nas filiais.",
      userStories: [
        {
          title: "Plataforma Centralizada de Frota",
          text: "Como SRE, quero gerenciar todos os servidores de campo através de um orquestrador central Kubernetes Master para atualizar softwares remotamente."
        }
      ],
      tasks: [
        { desc: "Provisionar e configurar servidor Kubernetes Master central", est: "50h" },
        { desc: "Criar imagem operacional base (Golden Image Ubuntu + CUDA) para os nós edge", est: "50h" }
      ]
    },
    {
      id: "AP-F2-3",
      tag: "Sprint 2.3",
      weeks: "Semanas 5-6",
      name: "Infraestrutura como Código com Ansible",
      hours: "90h",
      front: "SRE / Infra",
      summary: "Criar playbooks e scripts automatizados no Ansible para inicializar os servidores edge locais de forma plug-and-play nas filiais.",
      userStories: [
        {
          title: "Configuração em Lote sem Intervenção",
          text: "Como DevOps, quero plugar o servidor na energia da filial e disparar os playbooks Ansible para formatar e rodar o Docker automaticamente."
        }
      ],
      tasks: [
        { desc: "Escrever playbooks Ansible para instalação de drivers NVIDIA, CUDA e Docker", est: "50h" },
        { desc: "Testar provisionamento em lote em servidores simulados no laboratório", est: "40h" }
      ]
    },
    {
      id: "AP-F2-4",
      tag: "Sprint 2.4",
      weeks: "Semanas 7-8",
      name: "ArgoCD GitOps & Pipelines de Imagens",
      hours: "110h",
      front: "DevOps / CI-CD",
      summary: "Instalar o ArgoCD para gerenciar configurações baseadas no repositório de código Git e automatizar a build de novos contêineres de IA.",
      userStories: [
        {
          title: "Atualizações via Repositório Git",
          text: "Como DevOps, quero alterar as regras de uma câmera no Git e ver o ArgoCD sincronizar e aplicar a alteração no nó de borda de forma imediata."
        }
      ],
      tasks: [
        { desc: "Configurar cluster central ArgoCD e mapeamento Kustomize (14 filiais)", est: "60h" },
        { desc: "Desenvolver pipelines de CI/CD para compilação automática das imagens Docker", est: "50h" }
      ]
    },
    {
      id: "AP-F2-5",
      tag: "Sprint 2.5",
      weeks: "Semanas 9-10",
      name: "Novo Detector de IA: Uso de EPIs",
      hours: "120h",
      front: "IA & Visão",
      summary: "Coleta e rotulagem de fotos de campo, treinamento do modelo YOLOv8-EPI para Segurança do Trabalho e exportação para aceleração TensorRT.",
      userStories: [
        {
          title: "Detecção de Capacete e Colete",
          text: "Como engenheiro de IA, quero treinar um modelo para validar se operadores estão usando EPIs obrigatórios nos pátios de abastecimento."
        }
      ],
      tasks: [
        { desc: "Coleta e rotulagem de dataset de EPIs sob sol intenso e poeira", est: "80h" },
        { desc: "Treinamento YOLOv8-EPI e compilação em engine TensorRT FP16 (.engine)", est: "40h" }
      ]
    },
    {
      id: "AP-F2-6",
      tag: "Sprint 2.6",
      weeks: "Semanas 11-12",
      name: "Lógica de Negócios e Filtro de Falsos Alertas de EPI",
      hours: "110h",
      front: "IA & Backend",
      summary: "Configuração do FastAPI local para processar concorrência de modelos YOLO e calibrar filtros de tempo mínimo de permanência sem EPI.",
      userStories: [
        {
          title: "Alerta Apenas de Riscos Reais",
          text: "Como Dev Backend, quero criar regras de permanência para que a ausência passageira de EPI (<3s) não gere alertas desnecessários."
        }
      ],
      tasks: [
        { desc: "Modificar regras no FastAPI local para suportar thresholds temporais de EPI", est: "60h" },
        { desc: "Calibrar thresholds de confiança de IA sob condições reais de seca e chuva", est: "50h" }
      ]
    },
    {
      id: "AP-F2-7",
      tag: "Sprint 2.7",
      weeks: "Semanas 13-14",
      name: "Detector de Veículos & Fluxo Local Node-RED",
      hours: "125h",
      front: "IA & Backend",
      summary: "Treinamento do detector de veículos com tracking ByteTrack e codificação dos fluxos do Node-RED para recortar clipes de vídeo de 5 segundos.",
      userStories: [
        {
          title: "Controle de Entrada e Horários",
          text: "Como gerente, quero detectar movimentação de caminhões e carros fora de horários operacionais permitidos nos pátios de distribuição."
        }
      ],
      tasks: [
        { desc: "Integrar modelo YOLO-car + ByteTrack e criar regras de horários no FastAPI", est: "90h" },
        { desc: "Desenvolver fluxo Node-RED para fatiamento de mídias via API Frigate e retentativas", est: "35h" }
      ]
    },
    {
      id: "AP-F2-8",
      tag: "Sprint 2.8",
      weeks: "Semanas 15-16",
      name: "Rollout Físico e Integração das 14 Filiais",
      hours: "180h",
      front: "SRE / QA",
      summary: "Acompanhar a instalação física das máquinas edge nos racks locais das filiais, rodar bootstrap e homologar a resiliência offline.",
      userStories: [
        {
          title: "Ativação em Lote",
          text: "Como SRE, quero dar suporte ao TI local da Ecodiesel para ligar as 14 máquinas e garantir a estabilidade do processamento das 400 câmeras."
        }
      ],
      tasks: [
        { desc: "Instalação física e bootstrap das 14 filiais via VPN", est: "100h" },
        { desc: "Sincronização de ConfigMaps globais no ArgoCD e teste de resiliência offline (SQLite)", est: "40h" },
        { desc: "Homologação geral de implantação física e testes de carga", est: "40h" }
      ]
    }
  ],
  fase3: [
    {
      id: "AP-F3-1",
      tag: "Sprint 3.1",
      weeks: "Semanas 1-2",
      name: "Broker Kafka Centralizado na Nuvem",
      hours: "90h",
      front: "Backend / Infra Nuvem",
      summary: "Configuração do broker Apache Kafka na nuvem para gerenciar o tráfego concorrente e seguro dos eventos gerados pelas 14 filiais.",
      userStories: [
        {
          title: "Recepção Central de Mensagens",
          text: "Como SRE, quero um barramento Kafka corporativo estável na nuvem para absorver picos de eventos locais em paralelo sem perda de informações."
        }
      ],
      tasks: [
        { desc: "Provisionar cluster Kafka multi-zona na nuvem com criptografia TLS de saída", est: "50h" },
        { desc: "Desenhar tópicos, chaves de balanceamento e partições de dados", est: "40h" }
      ]
    },
    {
      id: "AP-F3-2",
      tag: "Sprint 3.2",
      weeks: "Semanas 3-4",
      name: "PostgreSQL Corporativo & API Cloud FastAPI",
      hours: "100h",
      front: "Backend / Infra Nuvem",
      summary: "Modelar o banco relacional PostgreSQL, configurar o Object Storage S3 para armazenamento de mídias por 30 dias e estruturar a API Cloud.",
      userStories: [
        {
          title: "Object Storage & PostgreSQL",
          text: "Como DPO, quero assegurar que clipes e imagens de pessoas fiquem guardados em nuvem por apenas 30 dias por conformidade com a LGPD."
        }
      ],
      tasks: [
        { desc: "Provisionar PostgreSQL e configurar ciclo de vida automático de expurgo no S3", est: "50h" },
        { desc: "Criar endpoints FastAPI integrados ao Kafka com algoritmos de de-duplicação de alertas", est: "50h" }
      ]
    },
    {
      id: "AP-F3-3",
      tag: "Sprint 3.3",
      weeks: "Semanas 5-6",
      name: "Painel Gerencial e Gráficos no App Flutter",
      hours: "110h",
      front: "Mobile (Flutter)",
      summary: "Desenvolvimento do Painel de Dashboard Executivo (volumetria, mapas de calor, estatísticas de filiais) diretamente no Aplicativo Móvel Flutter, descartando painel web separado.",
      userStories: [
        {
          title: "Dashboard Executivo na Palma da Mão",
          text: "Como diretor, quero abrir o aplicativo no meu celular/tablet e visualizar mapas de calor de incidentes, gráficos e volumetria de violações."
        }
      ],
      tasks: [
        { desc: "Estruturar componentes gráficos dinâmicos no Flutter (ex: fl_chart, gráficos de linha/pizza)", est: "60h" },
        { desc: "Implementar painel de controle por filial e mapas de calor responsivos para dispositivos móveis", est: "50h" }
      ]
    },
    {
      id: "AP-F3-4",
      tag: "Sprint 3.4",
      weeks: "Semanas 7-8",
      name: "Auditoria LGPD & Conexões em Tempo Real no App",
      hours: "90h",
      front: "Mobile (Flutter)",
      summary: "Integrar relatórios de auditoria inalteráveis (LGPD) e conexões WebSockets/SSE direto no aplicativo Flutter para acionar alarmes sonoros instantâneos.",
      userStories: [
        {
          title: "Auditoria LGPD Mobile",
          text: "Como administrador de dados, quero acessar o log inalterável de quem assistiu a cada clipe de vídeo diretamente na aba de auditoria do App."
        },
        {
          title: "Alarmes Ativos Sonoros",
          text: "Como vigilante, quero manter o App aberto em um tablet no pátio e receber alertas sonoros instantâneos em tempo real ao ocorrer invasões."
        }
      ],
      tasks: [
        { desc: "Desenvolver tela de Logs LGPD no Flutter e exportação de PDF com marca d'água de auditoria", est: "45h" },
        { desc: "Implementar cliente WebSockets/SSE no Flutter para disparo de áudio de alarme em segundo plano", est: "45h" }
      ]
    },
    {
      id: "AP-F3-5",
      tag: "Sprint 3.5",
      weeks: "Semanas 9-10",
      name: "Autenticação OAuth2/MFA & Keychain no App",
      hours: "120h",
      front: "Mobile / Segurança",
      summary: "Construir a base do App móvel, configurar integração OAuth2 corporativa com MFA (Token) e segurança biométrica Keychain/KeyStore.",
      userStories: [
        {
          title: "Acesso Seguro e Rápido",
          text: "Como gerente da Ecodiesel, quero logar de forma ultra-segura com o OAuth2 corporativo e desbloquear o aplicativo via Face ID / Impressão Digital."
        }
      ],
      tasks: [
        { desc: "Setup inicial em Flutter (Clean Architecture) e rotinas do Fastlane para builds", est: "40h" },
        { desc: "Integração com provedor OAuth2 com suporte a chaves MFA", est: "40h" },
        { desc: "Criptografia biométrica local Keychain/KeyStore e Certificate Pinning HTTP", est: "40h" }
      ]
    },
    {
      id: "AP-F3-6",
      tag: "Sprint 3.6",
      weeks: "Semanas 11-12",
      name: "Feed de Alertas, Notificações Push Ricas & Player",
      hours: "125h",
      front: "Mobile (Flutter)",
      summary: "Codificar a tela de Feed de Alertas históricos, integrar SDKs de Push ricos com foto e embutir o player nativo para assistir clipes em loop.",
      userStories: [
        {
          title: "Notificação Push com Visualização",
          text: "Como gestor, quero receber uma notificação push com a foto do invasor e clicar para assistir imediatamente o clipe de 5 segundos em loop."
        }
      ],
      tasks: [
        { desc: "Desenvolver tela de Feed paginado com filtros avançados e persistência de dados", est: "45h" },
        { desc: "Integrar Firebase Cloud Messaging (FCM/APNS) e desenvolver push enriquecido com imagens", est: "45h" },
        { desc: "Integrar player de vídeo (video_player/Chewie) nativo para loops rápidos de clipes", est: "35h" }
      ]
    },
    {
      id: "AP-F3-7",
      tag: "Sprint 3.7",
      weeks: "Semanas 13-14",
      name: "Telemetria de Frota & Métricas de IA",
      hours: "115h",
      front: "DevOps & IA",
      summary: "Instrumentar sensores térmicos e elétricos das GPUs industriais de campo via Prometheus e expor no Grafana corporativo com alertas Teams.",
      userStories: [
        {
          title: "Monitoramento de Saúde de Servidores",
          text: "Como SRE da GBPA, quero ser notificado no Teams caso algum nó edge sofra sobreaquecimento térmico ou desvio de acurácia (model drift)."
        }
      ],
      tasks: [
        { desc: "Configurar exporters do Prometheus locais para GPU, CPU e armazenamento NVMe", est: "45h" },
        { desc: "Codificar telemetria de FPS e model drift da inteligência computacional", est: "35h" },
        { desc: "Consolidar painel central do Grafana corporativo integrado ao Slack e Teams", est: "35h" }
      ]
    },
    {
      id: "AP-F3-8",
      tag: "Sprint 3.8",
      weeks: "Semanas 15-16",
      name: "Predição Operacional, Testes de Estresse & Handover",
      hours: "190h",
      front: "Backend & IA & QA",
      summary: "Modelar algoritmos de predição comportamental de incidentes operacionais, rodar testes de estresse com 400 câmeras simuladas e handover final.",
      userStories: [
        {
          title: "Prevenção Operacional de Riscos",
          text: "Como diretor, quero relatórios preditivos gerados pela IA mostrando a probabilidade de incidentes por filial nas próximas semanas."
        }
      ],
      tasks: [
        { desc: "Codificar modelos preditivos de séries temporais para incidentes operacionais", est: "60h" },
        { desc: "Executar testes de estresse com carga massiva no Kafka simulando 400 câmeras e medir latência (<5s)", est: "50h" },
        { desc: "Auditoria OWASP de segurança de APIs/app, escrita de runbooks e treinamento operacional", est: "80h" }
      ]
    }
  ]
};

// Detalhes lúdicos da arquitetura para negócios
const businessDetails = {
  cameras: {
    title: "📹 Captura de Vídeo Local",
    badge: "Etapa 1: Olhos da Planta",
    desc: "Câmeras de segurança já instaladas monitoram continuamente áreas críticas como pátios de abastecimento, portarias e depósitos. O vídeo bruto NUNCA é enviado para a nuvem por motivos de conformidade legal, economia de internet e LGPD.",
    meta: {
      "Localização": "Lucas do Rio Verde / MT",
      "Segurança": "VLAN 100% Isolada local",
      "Qualidade": "Full HD (1080p)",
      "Consumo de Link": "0 MB de upload utilizado"
    },
    specs: [
      "Integração imediata com as câmeras Intelbras existentes",
      "Transmissão local rápida e sem atrasos via rede cabeada",
      "Garantia de privacidade: dados ficam sob custódia física da Ecodiesel",
      "Resiliência industrial: funciona mesmo em tempestades ou sem internet"
    ]
  },
  edge: {
    title: "🧠 Cérebro Local (Nó Edge)",
    badge: "Etapa 2: Inteligência na Borda",
    desc: "O supercomputador instalado no rack físico da filial analisa os vídeos em tempo real. Rodando visão computacional de ponta (YOLOv8 + TensorRT), ele filtra insetos, galhos e poeira, detectando com precisão o que de fato importa.",
    meta: {
      "Hardware Homologado": "AMD Ryzen 9 + 2x RTX 5070 Ti",
      "Eficiência de IA": "Inferência em <15ms por quadro",
      "Autonomia": "100% offline (caso falhe internet)",
      "Design Térmico": "Industrial contra poeira e poços térmicos"
    },
    specs: [
      "Processa até 32 câmeras em paralelo por nó industrial",
      "YOLOv8n identifica pessoas e veículos; YOLO-EPI fiscaliza coletes/capacetes",
      "ByteTrack garante que um mesmo invasor mantenha a mesma identidade no pátio",
      "Descarta 99% de alarmes falsos direto na planta"
    ]
  },
  nodered: {
    title: "📦 Fatiador e Mensageiro Expresso",
    badge: "Etapa 3: Segurança e Envio",
    desc: "Quando o Cérebro detecta um evento crítico (ex: invasão ou falta de EPI), este módulo recorta um vídeo curtíssimo de 5 segundos com a ocorrência. Ele criptografa a informação e envia o payload leve via internet.",
    meta: {
      "Protocolo": "Túnel Outbound TLS 1.3",
      "Resiliência": "Fila local SQLite contra quedas",
      "Segurança Firewall": "Zero Ingress (portas fechadas)",
      "Tamanho Alerta": "Apenas poucos kilobytes (JSON + MP4)"
    },
    specs: [
      "Corta automaticamente o clipe de 5 segundos de gravação local",
      "Abre túnel seguro de saída para a nuvem (impede invasores da internet)",
      "Retém alertas em disco se a internet cair e os reenvia automaticamente",
      "Consome banda mínima de dados móveis ou link local"
    ]
  },
  kafka: {
    title: "☁️ Distribuidor em Nuvem (Kafka)",
    badge: "Etapa 4: Coração Cloud",
    desc: "Plataforma na nuvem que recebe, filtra e gerencia simultaneamente todas as notificações enviadas pelas 14 filiais em alta velocidade, enviando o alerta em milissegundos para o seu celular.",
    meta: {
      "Broker": "Apache Kafka Gerenciado",
      "Hospedagem": "Nuvem AWS / GCP segura",
      "Banco de dados": "PostgreSQL corporativo",
      "Retenção em Nuvem": "Expurgo de mídias após 30 dias"
    },
    specs: [
      "Absorve alertas concorrentes das 14 filiais sem filas ou travamentos",
      "Upload seguro do vídeo de 5s para Object Storage criptografado",
      "Deduplica alarmes (ex: 10 fotos da mesma pessoa geram apenas 1 notificação)",
      "Conformidade rígida: deleta vídeos fisicamente após 30 dias"
    ]
  },
  app_flutter: {
    title: "📱 Seu Centro de Controle Móvel",
    badge: "Etapa 5: App Unificado",
    desc: "Toda a solução da Ecodiesel na palma da sua mão. Esqueça telas web complicadas que exigem computador: pelo App no seu celular ou tablet, você visualiza painéis gerenciais de todas as 14 filiais, gerencia auditorias e assiste aos clipes.",
    meta: {
      "Tecnologia": "Flutter (iOS e Android)",
      "Acesso Corporativo": "OAuth2 com MFA (Token seguro)",
      "Alarmes": "Push ricos com fotos e som ativo",
      "Segurança Local": "Desbloqueio por Face ID / Biometria"
    },
    specs: [
      "Notificação Push rica: veja a imagem do invasor direto na bandeja do celular",
      "Player nativo em loop para assistir a ocorrência de 5s instantaneamente",
      "Dashboard Gerencial completo: gráficos, mapas de calor e volumetria",
      "Aba de auditoria LGPD inalterável detalhando quem visualizou cada vídeo"
    ]
  }
};

// Estado da apresentação
let currentStep = 0;
let simulationInterval = null;
let activePhase = "piloto";

// Elementos DOM
const simBtn = document.getElementById("start-sim-btn");
const simSteps = document.querySelectorAll(".sim-step");
const mockNotification = document.getElementById("mock-push-notification");
const phoneScreen = document.getElementById("phone-screen-content");

// Sprints Dom Elements
const sprintTabs = document.querySelectorAll(".phase-tab");
const sprintListContainer = document.getElementById("sprint-list-container");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderSprints("piloto");

  // Abas de Sprints
  sprintTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const phase = tab.getAttribute("data-phase");
      sprintTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // Update accent color
      const root = document.documentElement;
      if (phase === "piloto") {
        root.style.setProperty("--accent-color", "var(--color-pilot)");
        root.style.setProperty("--accent-color-rgb", "var(--color-pilot-rgb)");
      } else if (phase === "fase2") {
        root.style.setProperty("--accent-color", "var(--color-phase2)");
        root.style.setProperty("--accent-color-rgb", "var(--color-phase2-rgb)");
      } else {
        root.style.setProperty("--accent-color", "var(--color-phase3)");
        root.style.setProperty("--accent-color-rgb", "var(--color-phase3-rgb)");
      }
      
      renderSprints(phase);
    });
  });

  // Event listener para simulação
  simBtn.addEventListener("click", () => {
    runSimulation();
  });

  // Mostrar componente inicial ao carregar
  showBusinessDetails("cameras");
});

// Renderização das Sprints
function renderSprints(phase) {
  activePhase = phase;
  const sprints = presentationSprints[phase];
  sprintListContainer.innerHTML = "";

  sprints.forEach((sprint) => {
    const card = document.createElement("div");
    card.className = "sprint-card";
    card.setAttribute("data-sprint-id", sprint.id);

    card.innerHTML = `
      <div class="sprint-card-header">
        <span class="sprint-tag">${sprint.tag}</span>
        <span class="sprint-weeks">${sprint.weeks}</span>
      </div>
      <div class="sprint-name">${sprint.name}</div>
      <div class="sprint-summary">
        <span class="sprint-front">Responsável: <span class="front-badge">${sprint.front}</span></span>
        <span class="sprint-hours">${sprint.hours}</span>
      </div>
      
      <div class="sprint-details-container" id="details-${sprint.id}">
        <div class="sprint-desc" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
          ${sprint.summary}
        </div>
        
        <div class="user-stories-container">
          <div class="task-list-title">Valor para o Cliente</div>
          ${sprint.userStories.map(us => `
            <div class="us-block">
              <div class="us-title">${us.title}</div>
              <div class="us-text">"${us.text}"</div>
            </div>
          `).join('')}
        </div>
        
        <div class="tasks-container">
          <div class="task-list-title">Tarefas Detalhadas</div>
          <div class="sprint-tasks">
            ${sprint.tasks.map(task => `
              <div class="task-item">
                <span class="task-desc">${task.desc}</span>
                <span class="task-est">${task.est}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest(".sprint-details-container")) return;
      const isAlreadyActive = card.classList.contains("active");
      document.querySelectorAll(".sprint-card").forEach(c => c.classList.remove("active"));
      if (!isAlreadyActive) {
        card.classList.add("active");
      }
    });

    sprintListContainer.appendChild(card);
  });
}

// Detalhes de Negócios Lúdicos
function showBusinessDetails(componentId) {
  const comp = businessDetails[componentId];
  if (!comp) return;

  // Highlight step in UI
  document.querySelectorAll(".sim-step").forEach(s => {
    s.classList.remove("selected");
    if (s.getAttribute("data-step") === componentId) {
      s.classList.add("selected");
    }
  });

  const titleEl = document.getElementById("details-title");
  const badgeEl = document.getElementById("details-badge");
  const descEl = document.getElementById("details-desc");
  const metaContainer = document.getElementById("details-meta-container");
  const listEl = document.getElementById("details-list");

  titleEl.textContent = comp.title;
  badgeEl.textContent = comp.badge;
  descEl.textContent = comp.desc;

  // Render meta
  metaContainer.innerHTML = "";
  for (const [key, val] of Object.entries(comp.meta)) {
    metaContainer.innerHTML += `
      <div class="meta-item">
        <span class="meta-label">${key}</span>
        <span class="meta-value">${val}</span>
      </div>
    `;
  }

  // Render specs list
  listEl.innerHTML = "";
  comp.specs.forEach(s => {
    listEl.innerHTML += `<li>${s}</li>`;
  });
}

// Simulador interativo do fluxo
function runSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }

  // Reset steps
  simSteps.forEach(s => s.classList.remove("active", "completed"));
  mockNotification.classList.remove("show");
  simBtn.disabled = true;
  simBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Simulando...`;
  
  // Reset Phone Screen to default loading or dark
  phoneScreen.innerHTML = `
    <div style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; color:rgba(255,255,255,0.4); text-align:center; padding: 2rem;">
      <i class="fa-solid fa-lock" style="font-size: 2.5rem; margin-bottom:1rem;"></i>
      <p style="font-size:0.85rem;">Aguardando ocorrências nas 14 filiais da planta...</p>
    </div>
  `;

  currentStep = 0;
  const stepsOrder = ["cameras", "edge", "nodered", "kafka", "app_flutter"];

  // Executa etapas de simulação
  simulationInterval = setInterval(() => {
    if (currentStep > 0) {
      simSteps[currentStep - 1].classList.remove("active");
      simSteps[currentStep - 1].classList.add("completed");
    }

    if (currentStep < stepsOrder.length) {
      const activeStepId = stepsOrder[currentStep];
      const activeStepEl = document.querySelector(`.sim-step[data-step="${activeStepId}"]`);
      
      activeStepEl.classList.add("active");
      showBusinessDetails(activeStepId);
      
      // Se for etapa final (celular recebe push)
      if (activeStepId === "app_flutter") {
        triggerMobilePush();
      }

      currentStep++;
    } else {
      // Simulação finalizada
      clearInterval(simulationInterval);
      simBtn.disabled = false;
      simBtn.innerHTML = `<i class="fa-solid fa-play"></i> Simular Alerta de Invasão`;
    }
  }, 2200); // transição a cada 2.2 segundos para dar tempo do cliente ler
}

// Dispara push notification no Mockup de celular
function triggerMobilePush() {
  mockNotification.classList.add("show");
  
  // Toca som simulado na aba se o navegador permitir (usaremos apenas feedback visual forte)
  
  // Ao clicar na notificação do celular
  mockNotification.onclick = () => {
    mockNotification.classList.remove("show");
    openAppMockup();
  };

  // Auto abre após 3 segundos caso o usuário não clique
  setTimeout(() => {
    if (mockNotification.classList.contains("show")) {
      mockNotification.classList.remove("show");
      openAppMockup();
    }
  }, 3500);
}

// Mostra o Mockup do App da Ecodiesel funcionando na tela do celular
function openAppMockup() {
  phoneScreen.innerHTML = `
    <div class="app-mock-interface" style="display:flex; flex-direction:column; height:100%; animation: fadeIn 0.5s ease-out;">
      <!-- Header do App -->
      <div style="background:#064e3b; padding:0.8rem; display:flex; align-items:center; gap:0.5rem; border-bottom:1px solid rgba(255,255,255,0.1);">
        <i class="fa-solid fa-leaf" style="color:#10b981;"></i>
        <div>
          <h4 style="font-family:var(--font-title); font-size:0.85rem; margin:0;">EcoDiesel Mobile</h4>
          <span style="font-size:0.6rem; color:#10b981;">● Online (14/14 filiais)</span>
        </div>
      </div>

      <!-- App Views Tabs -->
      <div style="display:flex; background:#043327; font-size:0.7rem; border-bottom:1px solid rgba(255,255,255,0.05); text-align:center;">
        <div style="flex:1; padding:0.5rem; border-bottom:2px solid #10b981; color:white; font-weight:bold; cursor:pointer;" onclick="switchAppTab('alerta')">Alerta</div>
        <div style="flex:1; padding:0.5rem; color:#9ca3af; cursor:pointer;" onclick="switchAppTab('metrics')">Métricas</div>
        <div style="flex:1; padding:0.5rem; color:#9ca3af; cursor:pointer;" onclick="switchAppTab('auditoria')">Auditoria</div>
      </div>

      <!-- Alerta Ativo Content -->
      <div id="app-dynamic-view" style="flex:1; padding:0.8rem; overflow-y:auto; display:flex; flex-direction:column; gap:0.8rem;">
        
        <!-- Video Player Mockup -->
        <div style="position:relative; background:#000; border-radius:10px; overflow:hidden; border:1px solid #ef4444; box-shadow: 0 0 10px rgba(239,68,68,0.2);">
          <div style="position:absolute; top:8px; left:8px; background:rgba(239,68,68,0.85); color:white; font-size:0.6rem; padding:0.1rem 0.4rem; border-radius:4px; font-weight:bold; display:flex; align-items:center; gap:0.25rem;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:white; class="pulse-element"></span>
            INTRUSÃO
          </div>
          <!-- Bounding box overlay in video -->
          <div style="position:absolute; border:2px solid #ef4444; top:25%; left:35%; width:30%; height:55%; border-radius:4px; box-shadow: 0 0 8px #ef4444;">
            <span style="position:absolute; top:-16px; left:-2px; background:#ef4444; color:white; font-size:0.5rem; padding:0.02rem 0.2rem; font-weight:bold;">DESCONHECIDO (94%)</span>
          </div>
          <!-- Camera stream background placeholder -->
          <div style="height:140px; background: linear-gradient(135deg, #1f2937, #111827); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.2);">
            <i class="fa-solid fa-video" style="font-size: 2rem;"></i>
          </div>
          <!-- Player bar -->
          <div style="background:rgba(0,0,0,0.6); padding:0.4rem; font-size:0.6rem; display:flex; align-items:center; justify-content:space-between; color:white;">
            <span><i class="fa-solid fa-play" style="margin-right:0.3rem;"></i> 0:02 / 0:05 (Loop)</span>
            <span style="color:#9ca3af;">Lucas do Rio Verde - Pátio 3</span>
          </div>
        </div>

        <!-- Alerta Metadata -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:0.6rem; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
            <span style="font-size:0.65rem; color:#9ca3af;">Filial:</span>
            <span style="font-size:0.65rem; color:white; font-weight:bold;">Lucas do Rio Verde / MT</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
            <span style="font-size:0.65rem; color:#9ca3af;">Área restrita:</span>
            <span style="font-size:0.65rem; color:#ef4444; font-weight:bold;">Pátio de Tanques 03</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
            <span style="font-size:0.65rem; color:#9ca3af;">Horário:</span>
            <span style="font-size:0.65rem; color:white;">29/05/2026 às 11:14:02</span>
          </div>
        </div>

        <!-- Botões de Ação do App -->
        <div style="display:flex; gap:0.5rem; margin-top:0.25rem;">
          <button style="flex:1; border:none; background:#ef4444; color:white; padding:0.6rem; border-radius:6px; font-weight:bold; font-size:0.7rem; cursor:pointer;" onclick="alert('Polícia acionada/Vigilante Notificado!')">
            <i class="fa-solid fa-bullhorn"></i> Acionar Equipe
          </button>
          <button style="flex:1; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:#9ca3af; padding:0.6rem; border-radius:6px; font-size:0.7rem; cursor:pointer;" onclick="alert('Falso positivo descartado. Sistema calibrado!')">
            Dispensar
          </button>
        </div>
      </div>
    </div>
  `;
}

// Alternar entre as abas do smartphone simulado
function switchAppTab(tabName) {
  const dynamicView = document.getElementById("app-dynamic-view");
  if (!dynamicView) return;

  // Limpar e marcar abas
  const tabs = document.querySelectorAll(".app-mock-interface > div:nth-child(2) > div");
  tabs.forEach(t => {
    t.style.borderBottom = "none";
    t.style.color = "#9ca3af";
    t.style.fontWeight = "normal";
  });

  if (tabName === 'alerta') {
    openAppMockup();
  } else if (tabName === 'metrics') {
    tabs[1].style.borderBottom = "2px solid #10b981";
    tabs[1].style.color = "white";
    tabs[1].style.fontWeight = "bold";

    dynamicView.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:0.8rem; animation: fadeIn 0.3s ease-out;">
        <h4 style="font-family:var(--font-title); font-size:0.8rem; margin:0;">Métricas Gerenciais (Todas as Filiais)</h4>
        
        <!-- Alertas Consolidados Card -->
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:0.7rem; border-radius:8px;">
          <span style="font-size:0.6rem; color:#9ca3af; text-transform:uppercase;">Alertas Hoje</span>
          <div style="font-family:var(--font-title); font-size:1.4rem; font-weight:700; color:#10b981;">18 Ocorrências</div>
          <span style="font-size:0.55rem; color:#10b981;">▼ 92% de falsos positivos eliminados pela IA</span>
        </div>

        <!-- Mini Mapa de calor e gráficos simulados -->
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:0.7rem; border-radius:8px;">
          <span style="font-size:0.6rem; color:#9ca3af; text-transform:uppercase;">Violações por Filial</span>
          <div style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.4rem;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.6rem; margin-bottom:0.1rem;">
                <span>Lucas do Rio Verde</span>
                <span>8</span>
              </div>
              <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                <div style="width:75%; height:100%; background:#ef4444;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.6rem; margin-bottom:0.1rem;">
                <span>Sorriso</span>
                <span>4</span>
              </div>
              <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                <div style="width:40%; height:100%; background:#f59e0b;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.6rem; margin-bottom:0.1rem;">
                <span>Nova Mutum</span>
                <span>2</span>
              </div>
              <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                <div style="width:20%; height:100%; background:#10b981;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Voltar para o alerta botão -->
        <button style="border:none; background:#064e3b; color:white; padding:0.5rem; border-radius:6px; font-size:0.65rem; font-weight:bold; cursor:pointer;" onclick="switchAppTab('alerta')">
          <i class="fa-solid fa-arrow-left"></i> Voltar ao Alerta de Invasão
        </button>
      </div>
    `;
  } else if (tabName === 'auditoria') {
    tabs[2].style.borderBottom = "2px solid #10b981";
    tabs[2].style.color = "white";
    tabs[2].style.fontWeight = "bold";

    dynamicView.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:0.8rem; animation: fadeIn 0.3s ease-out;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="font-family:var(--font-title); font-size:0.8rem; margin:0;">Registro de Auditoria LGPD</h4>
          <span style="font-size:0.55rem; background:rgba(16,185,129,0.1); color:#10b981; padding:0.15rem 0.3rem; border-radius:4px; font-weight:bold;">Auditável</span>
        </div>

        <!-- Tabela simplificada de logs inalteráveis -->
        <div style="background:rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.05); border-radius:6px; font-size:0.55rem; overflow:hidden;">
          <div style="display:flex; background:rgba(255,255,255,0.02); padding:0.4rem; font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.05);">
            <div style="flex:1;">Operador</div>
            <div style="flex:1;">Ação</div>
            <div style="flex:1;">Data/Hora</div>
          </div>
          
          <div style="display:flex; padding:0.4rem; border-bottom:1px solid rgba(255,255,255,0.02); color:#d1d5db;">
            <div style="flex:1; font-weight:bold;">Fernando</div>
            <div style="flex:1; color:#ef4444;">Assistiu Clipe #82</div>
            <div style="flex:1;">29/05 11:14:15</div>
          </div>
          
          <div style="display:flex; padding:0.4rem; border-bottom:1px solid rgba(255,255,255,0.02); color:#d1d5db;">
            <div style="flex:1; font-weight:bold;">Carlos (TI)</div>
            <div style="flex:1; color:#10b981;">Ajustou ROI Pátio 1</div>
            <div style="flex:1;">29/05 10:30:22</div>
          </div>

          <div style="display:flex; padding:0.4rem; color:#d1d5db;">
            <div style="flex:1; font-weight:bold;">Fernando</div>
            <div style="flex:1; color:#3b82f6;">Exportou Relatório</div>
            <div style="flex:1;">28/05 18:12:45</div>
          </div>
        </div>

        <button style="border:1px solid rgba(16,185,129,0.3); background:rgba(16,185,129,0.05); color:#10b981; padding:0.5rem; border-radius:6px; font-size:0.6rem; font-weight:bold; cursor:pointer;" onclick="alert('PDF gerado com marca d\\\'água e enviado ao e-mail cadastrado!')">
          <i class="fa-solid fa-file-pdf"></i> Exportar Logs para PDF
        </button>

        <button style="border:none; background:#064e3b; color:white; padding:0.5rem; border-radius:6px; font-size:0.65rem; font-weight:bold; cursor:pointer;" onclick="switchAppTab('alerta')">
          <i class="fa-solid fa-arrow-left"></i> Voltar ao Alerta
        </button>
      </div>
    `;
  }
}
