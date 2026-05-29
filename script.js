// Dados das Sprints divididos por Fase
const sprintData = {
  piloto: [
    {
      id: "MVP-1",
      tag: "Sprint 1.1",
      weeks: "Semanas 1-2",
      name: "Ingestão, Setup Edge & Pipeline de IA",
      hours: "80h",
      front: "IA / Visão & DevOps",
      summary: "Mapear a infraestrutura de câmeras da matriz, preparar o sistema operacional de borda e rodar a detecção YOLOv8 com aceleração TensorRT.",
      userStories: [
        {
          title: "Setup de Infra e Captura",
          text: "Como desenvolvedor, quero mapear as 32 câmeras e configurar a Golden Image com drivers CUDA no edge local para garantir a recepção estável."
        },
        {
          title: "Detecção e Aceleração",
          text: "Como engenheiro de IA, quero rodar a decodificação por hardware no Frigate e compilar o YOLOv8n em TensorRT para inferência rápida (<15ms)."
        }
      ],
      tasks: [
        { desc: "Discovery e Mapeamento de Câmeras IP (VLANs, IPs e streams RTSP)", est: "20h" },
        { desc: "Preparação do OS Ubuntu Server 24.04, drivers NVIDIA e CUDA Toolkit", est: "10h" },
        { desc: "Setup do NVR Frigate com decodificação por hardware (NVDEC)", est: "20h" },
        { desc: "Compilação e validação do YOLOv8n em engine TensorRT (FP16)", est: "15h" },
        { desc: "Integração do tracker ByteTrack no pipeline local de inferência", est: "12h" },
        { desc: "Ajuste e contingência física em campo", est: "3h" }
      ]
    },
    {
      id: "MVP-2",
      tag: "Sprint 1.2",
      weeks: "Semanas 3-4",
      name: "Motor de Regras, Persistência & Dashboard Local",
      hours: "80h",
      front: "Backend & Frontend",
      summary: "Codificar as regras de negócio em FastAPI, salvar eventos no SQLite local e construir a tela do Dashboard local com alertas sonoros e SSE.",
      userStories: [
        {
          title: "Regras e Banco de Dados",
          text: "Como operador da matriz, quero definir polígonos de exclusão e permanência >2s no FastAPI, salvando em SQLite com limpeza automática de 30 dias."
        },
        {
          title: "Notificações em Tempo Real",
          text: "Como equipe de monitoramento, quero abrir uma página web local que pisque e emita alertas sonoros em menos de 5s usando Server-Sent Events (SSE)."
        }
      ],
      tasks: [
        { desc: "FastAPI Local: regras de ROIs com polígonos e tempo de permanência", est: "20h" },
        { desc: "Setup do SQLite local e cronjob de expurgo de mídias após 30 dias", est: "15h" },
        { desc: "Dashboard SPA local em HTML/JS com SSE (Server-Sent Events)", est: "25h" },
        { desc: "Calibração de acurácia de IA em campo (luz de faróis e poeira)", est: "12h" },
        { desc: "Homologação ponta a ponta com o cliente Fernando e handover", est: "8h" }
      ]
    }
  ],
  fase2: [
    {
      id: "F2-1",
      tag: "Sprint 2.1",
      weeks: "Semanas 1-2",
      name: "Mapeamento de Redes & SD-WAN VPN",
      hours: "80h",
      front: "DevOps / SRE",
      summary: "Mapear a rede de switches e IPs de câmeras das 14 unidades e subir o túnel VPN corporativo criptografado ligando a borda ao master.",
      userStories: [
        {
          title: "Redes Físicas das Filiais",
          text: "Como DevOps, quero catalogar os IPs das 400 câmeras e rotas de rede nas 14 filiais para preparar a infraestrutura física de processamento local."
        },
        {
          title: "Conectividade Segura",
          text: "Como SRE, quero estabelecer e documentar a topologia SD-WAN VPN (IPsec) ligando as unidades à matriz sem abrir portas de entrada."
        }
      ],
      tasks: [
        { desc: "Mapear switches, VLANs, IPs locais e latência física das 14 filiais", est: "50h" },
        { desc: "Configurar túnel VPN IPSec/SD-WAN seguro e rotas outbound", est: "30h" }
      ]
    },
    {
      id: "F2-2",
      tag: "Sprint 2.2",
      weeks: "Semanas 3-4",
      name: "Master Node, Control Plane & Golden Image",
      hours: "100h",
      front: "DevOps / SRE & IA",
      summary: "Provisionar o servidor central do Kubernetes (k3s control plane) e montar a imagem operacional padronizada para os nós de campo.",
      userStories: [
        {
          title: "Orquestrador Central",
          text: "Como SRE, quero provisionar o master node central na nuvem com backup para gerenciar de forma unificada os agentes das 14 filiais."
        },
        {
          title: "Imagem Base de Borda",
          text: "Como DevOps, quero empacotar a Golden Image (Ubuntu + CUDA + Docker + k3s agent) com script de auto-registro e handshake criptografado."
        }
      ],
      tasks: [
        { desc: "Provisionar servidor master central (GCP/AWS/On-Premise) com alta disponibilidade", est: "25h" },
        { desc: "Instalar k3s Server e configurar políticas de comunicação TLS dos nós", est: "25h" },
        { desc: "Criar Golden Image de OS Ubuntu com CUDA Toolkit e drivers NVIDIA", est: "25h" },
        { desc: "Codificar script de bootstrap e auto-handshake seguro k3s agent", est: "25h" }
      ]
    },
    {
      id: "F2-3",
      tag: "Sprint 2.3",
      weeks: "Semanas 5-6",
      name: "Automação e Provisionamento com Ansible",
      hours: "90h",
      front: "DevOps / SRE",
      summary: "Desenvolver a infraestrutura como código (IaC) via Ansible para formatar, parametrizar e configurar os nós edge industriais sem intervenção manual.",
      userStories: [
        {
          title: "Provisionamento IaC",
          text: "Como DevOps, quero rodar scripts Ansible para automatizar a montagem de discos NVMe, docker-daemon e configurações locais de rede nos servidores."
        }
      ],
      tasks: [
        { desc: "Escrever playbooks Ansible de infraestrutura e dependências CUDA/Docker", est: "50h" },
        { desc: "Simular deploy automatizado dos nós em laboratório para validar IaC", est: "40h" }
      ]
    },
    {
      id: "F2-4",
      tag: "Sprint 2.4",
      weeks: "Semanas 7-8",
      name: "Configuração GitOps (ArgoCD) & CI/CD",
      hours: "110h",
      front: "DevOps / SRE",
      summary: "Subir o ArgoCD no master, criar a árvore de overlays Kustomize por prédio e configurar pipelines para build automático de contêineres.",
      userStories: [
        {
          title: "Sincronização de Frota GitOps",
          text: "Como DevOps, quero gerenciar configurações e ConfigMaps de cada câmera via ArgoCD, garantindo deploys em lote baseados em repositório Git."
        },
        {
          title: "Build Automático",
          text: "Como DevOps, quero configurar pipelines CI/CD que compilem e testem as imagens do motor de IA gerando imagens Docker oficiais sob releases."
        }
      ],
      tasks: [
        { desc: "Instalar e configurar ArgoCD integrado ao repositório de código", est: "30h" },
        { desc: "Desenvolver manifestos Kustomize estruturados (Base + Overlays por prédio)", est: "30h" },
        { desc: "Escrever pipelines GitHub Actions/GitLab CI para imagens Docker do Motor", est: "25h" },
        { desc: "Integrar ferramentas de análise estática de código e linting no CI", est: "25h" }
      ]
    },
    {
      id: "F2-5",
      tag: "Sprint 2.5",
      weeks: "Semanas 9-10",
      name: "Treinamento & Otimização: YOLOv8-EPI",
      hours: "120h",
      front: "IA / Visão",
      summary: "Coletar e rotular imagens do pátio real da Ecodiesel, treinar o modelo YOLOv8-EPI e gerar a engine acelerada em TensorRT FP16.",
      userStories: [
        {
          title: "Treinamento do Modelo de EPI",
          text: "Como engenheiro de IA, quero treinar um detector YOLOv8 customizado para capacetes e coletes refletivos sob poeira e luz solar direta."
        },
        {
          title: "Aceleração NVIDIA TensorRT",
          text: "Como engenheiro de IA, quero converter e otimizar o modelo YOLO-EPI em formato TensorRT para rodar em paralelo sem estourar o clock da GPU."
        }
      ],
      tasks: [
        { desc: "Catalogar e rotular dataset de EPIs reais em ambiente agroindustrial", est: "40h" },
        { desc: "Treinar e validar modelo YOLOv8-EPI na GPU de desenvolvimento local", est: "40h" },
        { desc: "Montar pipeline de compilação de TensorRT local", est: "20h" },
        { desc: "Exportar engine .engine em FP16 validando estabilidade de FPS", est: "20h" }
      ]
    },
    {
      id: "F2-6",
      tag: "Sprint 2.6",
      weeks: "Semanas 11-12",
      name: "Lógica FastAPI de EPIs & Calibração de IA",
      hours: "110h",
      front: "IA & Backend",
      summary: "Inserir o detector de EPIs no FastAPI local, gerenciar concorrência de múltiplos modelos na GPU e calibrar limiares de falso positivo.",
      userStories: [
        {
          title: "Regras de EPI local",
          text: "Como Dev Backend, quero integrar o modelo de EPI no FastAPI local e emitir violações apenas quando a pessoa permanecer sem EPI por >3s."
        },
        {
          title: "Calibragem e Concorrência",
          text: "Como engenheiro de IA, quero garantir que a GPU processe YOLOv8n + YOLO-EPI em lote nas 32 câmeras e calibrar confiança sob intempéries."
        }
      ],
      tasks: [
        { desc: "Implementar filtros de permanência de pessoas sem EPI em zonas de risco no FastAPI", est: "30h" },
        { desc: "Otimizar concorrência de modelos YOLOv8 e YOLO-EPI na GPU RTX 5070 Ti", est: "30h" },
        { desc: "Coletar streams das plantas em condições de chuva/poeira para calibragem", est: "25h" },
        { desc: "Ajustar limiares de confiança da IA (>75%) mitigando disparos erráticos", est: "25h" }
      ]
    },
    {
      id: "F2-7",
      tag: "Sprint 2.7",
      weeks: "Semanas 13-14",
      name: "Detector de Veículos, Horários & Node-RED local",
      hours: "125h",
      front: "IA & Backend",
      summary: "Integrar detecção de veículos com ByteTrack para controle logístico, configurar regras de horários restritos e fluxos de corte de mídias no Node-RED.",
      userStories: [
        {
          title: "Segurança Logística e de Horários",
          text: "Como gerente operacional, quero detectar veículos suspeitos estacionados em ROIs críticas fora do horário de funcionamento."
        },
        {
          title: "Orquestração de Mídia local",
          text: "Como SRE, quero que o Node-RED capture o clipe de 5s do Frigate local sob violação de veículos ou EPI e envie via túnel TLS."
        }
      ],
      tasks: [
        { desc: "Otimizar modelo YOLOv8-car e integrar ByteTrack para tracking estável no pátio", est: "50h" },
        { desc: "Escrever regras analíticas de horários proibidos (22h às 05h) no FastAPI", est: "40h" },
        { desc: "Codificar fluxos no Node-RED local para fatiar mídias via API Frigate e realizar retentativas", est: "35h" }
      ]
    },
    {
      id: "F2-8",
      tag: "Sprint 2.8",
      weeks: "Semanas 15-16",
      name: "Rollout e Homologação Física dos 14 Nós",
      hours: "180h",
      front: "DevOps / SRE & QA",
      summary: "Apoiar a instalação física dos 14 servidores industriais, executar o bootstrap do k3s agent e rodar testes de escala de deploy via ArgoCD.",
      userStories: [
        {
          title: "Rollout nos Prédios",
          text: "Como SRE, quero apoiar o TI do cliente na montagem em rack e inicialização do bootstrap do OS nos 14 prédios conectando ao cluster."
        },
        {
          title: "Configurações Globais",
          text: "Como DevOps, quero cadastrar as URLs RTSP de todas as 400 câmeras e polígonos no repositório e rodar o deploy em lote via ArgoCD."
        }
      ],
      tasks: [
        { desc: "Acompanhar instalação em rack e rodar script de bootstrap nos prédios 1 a 7", est: "50h" },
        { desc: "Acompanhar instalação em rack e rodar script de bootstrap nos prédios 8 a 14", est: "50h" },
        { desc: "Configurar ConfigMaps de ROIs e IPs no Git e validar resiliência do SQLite offline", est: "40h" },
        { desc: "Conduzir deploys de atualização massiva pelo ArgoCD e assinar homologação da Fase 2", est: "40h" }
      ]
    }
  ],
  fase3: [
    {
      id: "F3-1",
      tag: "Sprint 3.1",
      weeks: "Semanas 1-2",
      name: "Broker Kafka na Nuvem & Tópicos",
      hours: "90h",
      front: "Backend & Infra Nuvem",
      summary: "Provisionar o broker Apache Kafka centralizado na nuvem para gerenciar o tráfego concorrente de notificações dos 14 nós locais.",
      userStories: [
        {
          title: "Ingestão Paralela",
          text: "Como SRE, quero provisionar um cluster Kafka na nuvem com alta disponibilidade para receber milhares de alertas em batch sem gargalos."
        }
      ],
      tasks: [
        { desc: "Provisionar Apache Kafka gerenciado multi-zona com criptografia TLS", est: "50h" },
        { desc: "Configurar tópicos de alertas, partições de balanceamento e tempos de retenção", est: "40h" }
      ]
    },
    {
      id: "F3-2",
      tag: "Sprint 3.2",
      weeks: "Semanas 3-4",
      name: "Banco de Dados Central & API Cloud",
      hours: "100h",
      front: "Backend & Infra Nuvem",
      summary: "Modelar o banco PostgreSQL central, configurar buckets de Object Storage com políticas de expurgo de 30 dias e criar API com agrupador de eventos.",
      userStories: [
        {
          title: "Camada de Dados Central",
          text: "Como Dev Backend, quero estruturar o PostgreSQL e bucket S3 com ciclo de vida automático para expurgar dados e mídias de vídeo após 30 dias (LGPD)."
        },
        {
          title: "Agrupador de Alertas",
          text: "Como gerente, quero que a API Cloud FastAPI agrupe eventos repetitivos da mesma câmera em janelas de tempo, evitando enxurradas de notificações."
        }
      ],
      tasks: [
        { desc: "Modelar PostgreSQL corporativo e configurar bucket de armazenamento (S3) com expurgo", est: "50h" },
        { desc: "Desenvolver endpoints de ingestão da API Cloud FastAPI com lógica de-duplicação e anti-flood", est: "50h" }
      ]
    },
    {
      id: "F3-3",
      tag: "Sprint 3.3",
      weeks: "Semanas 5-6",
      name: "Dashboard Executivo Web — UI/UX & Gráficos",
      hours: "110h",
      front: "Frontend Web",
      summary: "Desenvolver a interface Web SPA executiva de alta gerência em React/Vue contendo mapas de calor e volumetria por filial.",
      userStories: [
        {
          title: "Visualização Executiva",
          text: "Como diretor, quero acessar um dashboard moderno (Dark/Glass) que apresente as estatísticas de incidentes, filtros rápidos e mapas de calor."
        }
      ],
      tasks: [
        { desc: "Codificar layout moderno em SPA React/Vue com suporte a múltiplos usuários", est: "60h" },
        { desc: "Desenvolver gráficos dinâmicos de violações por filial e mapas de calor de incidentes", est: "50h" }
      ]
    },
    {
      id: "F3-4",
      tag: "Sprint 3.4",
      weeks: "Semanas 7-8",
      name: "Auditoria LGPD & Conexões WebSockets",
      hours: "90h",
      front: "Frontend & Backend",
      summary: "Integrar logs de auditoria de mídias inalteráveis para conformidade LGPD e configurar WebSockets para alertas sonoros instantâneos.",
      userStories: [
        {
          title: "Conformidade LGPD",
          text: "Como oficial de dados (DPO), quero relatórios auditáveis que registrem quem assistiu a qual clipe, gerando logs seguros no banco."
        },
        {
          title: "Monitoramento em Tempo Real",
          text: "Como operador central, quero receber alertas críticos audiovisuais instantâneos na tela web via WebSockets de baixa latência."
        }
      ],
      tasks: [
        { desc: "Desenvolver logs inalteráveis de acesso a vídeos e geração de PDF com marca d'água", est: "45h" },
        { desc: "Implementar WebSockets na API Cloud e disparos de alarmes sonoros dinâmicos no dashboard", est: "45h" }
      ]
    },
    {
      id: "F3-5",
      tag: "Sprint 3.5",
      weeks: "Semanas 9-10",
      name: "App Mobile: Setup, OAuth2/MFA & Keychain",
      hours: "120h",
      front: "Mobile & Segurança",
      summary: "Iniciar o app em Flutter (Clean Architecture), integrar login OAuth2 com MFA corporativo e criptografia biométrica Keychain/KeyStore.",
      userStories: [
        {
          title: "Plataforma Segura Mobile",
          text: "Como desenvolvedor mobile, quero estruturar o projeto Flutter com pipelines Fastlane e login seguro corporativo OAuth2 + MFA."
        },
        {
          title: "Proteção de Chaves locais",
          text: "Como usuário do app, quero salvar meu token com biometria no Keychain nativo e ter HTTPS seguro com Certificate Pinning contra espionagem."
        }
      ],
      tasks: [
        { desc: "Setup do projeto Flutter, Clean Architecture e pipeline de compilação automática", est: "40h" },
        { desc: "Integração de login corporativo OAuth2 com MFA via Keycloak ou similar", est: "40h" },
        { desc: "Integração de biometria nativa e armazenamento seguro via Keychain/KeyStore com Certificate Pinning", est: "40h" }
      ]
    },
    {
      id: "F3-6",
      tag: "Sprint 3.6",
      weeks: "Semanas 11-12",
      name: "App Mobile: Feed UI, Push Ricos & Player",
      hours: "125h",
      front: "Mobile / Frontend",
      summary: "Concluir a interface móvel com feed paginado de incidentes, integrar player de vídeo em loop de 5s e push notifications (FCM/APNS).",
      userStories: [
        {
          title: "Feed e Ação Rápida",
          text: "Como gestor de segurança, quero ver um feed de incidentes paginado com filtros, abrir push enriquecido com foto e acionar botões de resposta rápida."
        },
        {
          title: "Visualização do Clipe",
          text: "Como gestor, quero clicar no alerta e assistir ao clipe de 5 segundos em um player otimizado com buffer rápido e reprodução em loop."
        }
      ],
      tasks: [
        { desc: "Desenvolver UI do feed paginado com filtros dinâmicos e persistência local", est: "45h" },
        { desc: "Configurar SDKs Firebase Cloud Messaging / APNS e handlers de notificações ricas com botões", est: "45h" },
        { desc: "Integrar player de vídeo (Chewie/video_player) nativo otimizado para loops curtos de mídias", est: "35h" }
      ]
    },
    {
      id: "F3-7",
      tag: "Sprint 3.7",
      weeks: "Semanas 13-14",
      name: "Telemetria de Frota, Grafana & Drift de IA",
      hours: "115h",
      front: "DevOps / SRE & IA",
      summary: "Configurar exportação de telemetria de hardware (GPU/CPU) via Prometheus, instrumentar métricas do YOLOv8 e criar painéis Grafana.",
      userStories: [
        {
          title: "Saúde Térmica/Elétrica",
          text: "Como SRE, quero monitorar a temperatura e uso das GPUs RTX 5070 Ti dos 14 nós industriais, recebendo avisos preventivos de hardware."
        },
        {
          title: "Observabilidade de Modelos",
          text: "Como engenheiro de IA, quero rastrear métricas de inferência, FPS ativos e desvios de acurácia (model drift) no Grafana."
        }
      ],
      tasks: [
        { desc: "Instalar Prometheus exporters locais para temperatura e carga das GPUs e CPUs", est: "45h" },
        { desc: "Criar exportador de métricas do YOLOv8 (FPS, latência de inferência e thresholds)", est: "35h" },
        { desc: "Construir painéis centralizados no Grafana com alertas integrados no Teams/Slack", est: "35h" }
      ]
    },
    {
      id: "F3-8",
      tag: "Sprint 3.8",
      weeks: "Semanas 15-16",
      name: "Modelos Preditivos, Teste de Carga E2E & Handover",
      hours: "190h",
      front: "IA & Backend & QA",
      summary: "Desenvolver algoritmos de predição comportamental de incidentes, testar o estresse sob carga de 400 câmeras e conduzir auditorias OWASP finalizando runbooks.",
      userStories: [
        {
          title: "Análise Preditiva",
          text: "Como diretor, quero relatórios que analisem históricos e predigam dias e horas com maior risco de incidentes nas plantas."
        },
        {
          title: "Homologação de Carga e Segurança",
          text: "Como Techlead, quero simular a concorrência de 400 câmeras enviando mídias, auditar a segurança OWASP e treinar a equipe local."
        }
      ],
      tasks: [
        { desc: "Desenvolver modelos de séries temporais na nuvem para análise preditiva de volumetria de riscos", est: "60h" },
        { desc: "Escrever simulador de injeção de carga massiva no Kafka e medir latência edge-to-mobile (<5s)", est: "50h" },
        { desc: "Conduzir auditoria de invasão (OWASP Top 10), criar runbooks de disaster recovery (DR) e dar treinamento", est: "80h" }
      ]
    }
  ]
};

// Dados dos componentes de arquitetura interativos
const architectureDetails = {
  cameras: {
    title: "Câmeras IP e NVR",
    badge: "Ingestão local",
    desc: "Câmeras de vigilância locais do pátio e prédios conectadas à rede interna. No piloto, são 32 câmeras em um prédio; na escala, cerca de 400 câmeras distribuídas por 14 filiais. O vídeo bruto Full HD trafega apenas localmente.",
    meta: {
      "Protocolo": "RTSP (H.264 / H.265)",
      "Segurança": "VLAN Isolada (no internet)",
      "Retenção local": "Até 30 dias no NVR",
      "Banda Externa": "0 KB/s (vídeos pesados locais)"
    },
    specs: [
      "Integração nativa com streams RTSP das câmeras Intelbras",
      "Separação de canais de vídeo por VLAN dedicada",
      "Decodificação de hardware habilitada na GPU local",
      "Sem tráfego de vídeo bruto Full HD de saída para internet"
    ]
  },
  nvr: {
    title: "Frigate NVR",
    badge: "Processamento de Stream",
    desc: "NVR open source otimizado de processamento local. Captura streams RTSP, separa frames chave, aplica detectores de pixel de movimento e alimenta os modelos de IA acelerados.",
    meta: {
      "Ambiente": "Docker Container",
      "Aceleração": "NVIDIA NVDEC (GPU)",
      "Consumo RAM": "~512MB por pipeline",
      "Função": "Extração de frames de vídeo"
    },
    specs: [
      "Decodifica múltiplos canais de vídeo simultaneamente",
      "Filtra áreas sem movimento por processamento em CPU (pixels)",
      "Fornece API REST/WebSockets para corte de clipes sob demanda",
      "Integrado ao cluster local Docker / Pod no Kubernetes (nodeAffinity)"
    ]
  },
  edge: {
    title: "Nó de Inferência Edge (IA)",
    badge: "Hardware Industrial",
    desc: "Servidor padrão homologado para rodar em Lucas do Rio Verde/MT. Processa visão computacional na borda de forma autônoma e em tempo real. Cada nó atende ~30 câmeras.",
    meta: {
      "Hardware": "AMD Ryzen 9 + 2x RTX 5070 Ti 16GB",
      "OS Golden Image": "Ubuntu Server 24.04 (drivers CUDA)",
      "Custo PIX CAPEX": "R$ 27.750,00 por nó",
      "Modelos de IA": "YOLOv8 + ByteTrack (TensorRT FP16)"
    },
    specs: [
      "Processamento paralelo: GPU 0 (câmeras 1-16) | GPU 1 (câmeras 17-32)",
      "Modelos: YOLOv8n (invasão), YOLOv8-EPI (conformidade), YOLOv8-car",
      "ByteTrack garante rastreamento de IDs e contagem sem duplicar alertas",
      "Tolerância térmica extrema (cooler a ar dual-tower para poeira)"
    ]
  },
  fastapi: {
    title: "FastAPI Local & SQLite",
    badge: "Lógica de Negócios",
    desc: "Microserviço em Python que processa as detecções, valida polígonos de exclusão e permanência de pessoas/veículos. Mantém fila local resiliente em SQLite caso a internet caia.",
    meta: {
      "Framework": "Python FastAPI",
      "Fila Offline": "SQLite local criptografado",
      "Latência Alvo": "Near real-time (2-10s)",
      "Clean Code": "Clean Architecture estruturado"
    },
    specs: [
      "Aplica máscaras de polígono (ROIs) nas bounding boxes da IA",
      "Calcula regras de permanência (ex: tempo em área perigosa > 2s)",
      "Persiste alarmes em SQLite local se a WAN estiver offline",
      "Sincronização FIFO automática quando a internet retorna"
    ]
  },
  nodered: {
    title: "Node-RED & Fila Local",
    badge: "Integração & Envio",
    desc: "Orquestrador de fluxos local no edge. Captura mídias (clipes de 5s das câmeras) via API do Frigate e empacota payloads. Abre conexões de saída TLS unidirecionais.",
    meta: {
      "Plataforma": "Node-RED (Docker/Pod)",
      "Protocolo de Envio": "HTTPS/TLS 1.3 Outbound",
      "Firewall": "Zero Ingress (nenhuma porta aberta)",
      "Payload": "Clipes JSON/MP4 compactos (KB)"
    },
    specs: [
      "Captura clipes de 5s gravados no Frigate sob eventos",
      "Assina payloads de alertas via HMAC-SHA256 para integridade",
      "Retry exponencial automático com buffer persistente local",
      "Inicia túnel seguro outbound sem expor portas na internet"
    ]
  },
  dashboard_local: {
    title: "Dashboard Web Local",
    badge: "Interface de Operador",
    desc: "Painel web simples acessado de computadores da mesma rede interna. Mostra alertas instantâneos, áudio de aviso e imagens dos alarmes gerados pelo nó edge local (Fase 1).",
    meta: {
      "Stack": "HTML5 / Vanilla CSS / Vanilla JS",
      "Conexão": "SSE (Server-Sent Events) local",
      "Tempo de Carga": "< 2 segundos na LAN",
      "Usuários": "Operadores locais da matriz"
    },
    specs: [
      "Recepção dinâmica e imediata de invasões por SSE",
      "Aviso sonoro em caso de intrusões em zonas vermelhas",
      "Carrega clipes e thumbnails hospedados no servidor edge local",
      "Histórico simples de eventos ocorridos nas últimas 24 horas"
    ]
  },
  k8s: {
    title: "Kubernetes Control Plane",
    badge: "Orquestrador de Frota",
    desc: "Cluster central unificado via k3s. O Master centralizado (nuvem) gerencia todos os 14 nós locais que rodam o k3s agent, centralizando deploys e monitoramento.",
    meta: {
      "Distribuição": "k3s (lightweight Kubernetes)",
      "Deploy Contínuo": "ArgoCD (GitOps central)",
      "Conexão de Agente": "Outbound VPN corporativa",
      "Agendamento": "Node Affinity (vídeo processado local)"
    },
    specs: [
      "GitOps unificado: atualizações de modelos pelo repositório Git",
      "O ArgoCD atualiza imagens Docker nos 14 nós de forma sequencial",
      "Node Affinity garante que o processamento pesado de IA fique local",
      "Telemetria integrada de carga e pods em tempo real"
    ]
  },
  vpn: {
    title: "SD-WAN VPN Segura",
    badge: "Rede Criptografada",
    desc: "Túnel de rede corporativo criptografado ligando de forma segura as 14 filiais ao servidor master central e broker. Bloqueia conexões externas diretas.",
    meta: {
      "Tecnologia": "IPsec / SD-WAN corporativo",
      "Criptografia": "AES-256 e SHA-256",
      "Topologia": "Estrela (Nós -> Servidor Master)",
      "Segurança": "Firewall local Zero Ingress ativo"
    },
    specs: [
      "Interliga os 14 computadores edge em uma rede privada única",
      "Trafega apenas eventos leves comprimidos (KB), poupando banda",
      "Túnel seguro isolado do tráfego público de internet",
      "Mantém conexão contínua de agentes k3s ao master"
    ]
  },
  kafka: {
    title: "Broker Apache Kafka",
    badge: "Mensageria Cloud",
    desc: "Broker de eventos de alta disponibilidade em nuvem. Recebe, enfileira e distribui os payloads de alertas enviados pelos 14 nós locais em paralelo.",
    meta: {
      "Plataforma": "Apache Kafka (AWS/GCP gerenciado)",
      "Protocolo": "TLS 1.3 + Autenticação Certificado",
      "Desempenho": "Milhares de eventos/segundo",
      "Resiliência": "Particionamento multi-zona"
    },
    specs: [
      "Recebe e distribui alertas de-duplicados concorrentes",
      "Permite reprocessamento de mensagens (event replay)",
      "Desacopla os nós de processamento edge do dashboard central",
      "Segurança rigorosa com autenticação cliente X.509"
    ]
  },
  cloud_backend: {
    title: "API Cloud FastAPI & Banco",
    badge: "Gestão Corporativa",
    desc: "Backend central do ecossistema. Executa de-duplicação e agrupamento temporal de alertas (anti-flood), armazena metadados no PostgreSQL e mídias de clipes no Object Storage.",
    meta: {
      "Linguagem": "Python FastAPI Cloud",
      "Banco Relacional": "PostgreSQL centralizado",
      "Storage": "Object Storage (S3 / Cloud Storage)",
      "Expurgo de Mídia": "Automático de 30 dias (LGPD)"
    },
    specs: [
      "Deduplica alarmes idênticos consecutivos (ex: mesma pessoa)",
      "Upload seguro de thumbnails e clipes compactados para S3",
      "Gerenciamento de permissões de usuários (OAuth2 corporativo)",
      "Gera relatórios consolidados de volumetria e auditoria"
    ]
  },
  dash_exec: {
    title: "Dashboard Web Executivo",
    badge: "Interface Gerencial",
    desc: "Aplicação Web SPA moderna para visualização de toda a diretoria e equipes corporativas. Exibe gráficos de tendências, mapas de calor, alarmes ao vivo e logs LGPD.",
    meta: {
      "Framework": "React / Vue SPA",
      "Conexão Live": "WebSockets / SSE Cloud",
      "Aparência": "Premium Dark Mode / Glassmorphism",
      "Auditoria": "Logs de acesso inalteráveis (LGPD)"
    },
    specs: [
      "Gráficos consolidados de incidentes por filial e por dia/horário",
      "Alerta audiovisual ativo imediato na tela sob novas violações",
      "Audit logs detalhados (usuário, hora, vídeo assistido, ação)",
      "Interface responsiva adaptada a monitores e tablets"
    ]
  },
  app_flutter: {
    title: "Aplicativo Móvel Flutter",
    badge: "Cliente Móvel",
    desc: "App nativo para smartphones utilizado pelos responsáveis de segurança. Possui login OAuth2+MFA, biometria nativa, notificações push ricas e player de vídeo nativo.",
    meta: {
      "Tecnologia": "Flutter (Android e iOS)",
      "Segurança": "Biometria nativa + Secure Storage",
      "Notificações": "FCM (Firebase) + APNS (Apple)",
      "Player de Vídeo": "Chewie / Video_player em loop"
    },
    specs: [
      "Login seguro OAuth2 integrado a IdP corporativo com MFA",
      "Push rico com foto instantânea na bandeja e botões de ação",
      "Reprodução fluida do clipe de 5 segundos em loop nativo",
      "Tokens de autenticação protegidos no Keychain/KeyStore nativo"
    ]
  },
  observability: {
    title: "Grafana & Prometheus",
    badge: "Métricas e Saúde",
    desc: "Central de telemetria e monitoramento de saúde do ecossistema. Rastreia logs elétricos/térmicos das GPUs industriais de campo e a acurácia dos modelos de IA.",
    meta: {
      "Métricas": "Prometheus Exporters locals",
      "Dashboard": "Grafana central corporativo",
      "Alertas Suporte": "Teams / Slack integrado",
      "IA Observação": "Thresholds e Desvio de Modelo (Drift)"
    },
    specs: [
      "Monitoramento térmico contínuo de GPUs RTX 5070 Ti nas filiais",
      "Alertas automáticos se nó ficar offline ou GPU atingir >85°C",
      "Detecção de desvio de modelo (model drift) e queda de acurácia",
      "Painéis customizados para a equipe de suporte GBPA e TI local"
    ]
  }
};

// KPIs consolidados por fase
const phaseKpis = {
  piloto: {
    duration: "4 semanas (1 mês)",
    sprints: "2 Sprints",
    effort: "160 horas",
    buffer: "15% contingência",
    cameras: "32 câmeras",
    latency: "2 a 10 segundos",
    scope: "1 Prédio (Matriz)",
    tech: "Docker / SQLite"
  },
  fase2: {
    duration: "16 semanas (4 meses)",
    sprints: "8 Sprints",
    effort: "815 horas",
    buffer: "35% contingência",
    cameras: "~400 câmeras",
    latency: "2 a 10 segundos",
    scope: "14 Prédios / Filiais",
    tech: "k3s / Ansible / ArgoCD"
  },
  fase3: {
    duration: "16 semanas (4 meses)",
    sprints: "8 Sprints",
    effort: "840 horas",
    buffer: "35% contingência",
    cameras: "~400 câmeras",
    latency: "< 5 segundos (E2E)",
    scope: "Todo o Ecossistema",
    tech: "Kafka / Postgres / Flutter"
  }
};

// Variável de estado
let activePhase = "piloto";
let activeSprintId = null;

// Elementos DOM
const tabs = document.querySelectorAll(".phase-tab");
const kpiDuration = document.getElementById("kpi-duration");
const kpiSprints = document.getElementById("kpi-sprints");
const kpiEffort = document.getElementById("kpi-effort");
const kpiBuffer = document.getElementById("kpi-buffer");
const kpiCameras = document.getElementById("kpi-cameras");
const kpiLatency = document.getElementById("kpi-latency");

const diagramTitle = document.getElementById("diagram-title");
const diagramSubtitle = document.getElementById("diagram-subtitle");
const diagramContainer = document.getElementById("diagram-container");

const detailsPanel = document.getElementById("details-panel");
const detailsPlaceholder = document.getElementById("details-placeholder");
const detailsTitle = document.getElementById("details-title");
const detailsBadge = document.getElementById("details-badge");
const detailsDesc = document.getElementById("details-desc");
const detailsMetaContainer = document.getElementById("details-meta-container");
const detailsList = document.getElementById("details-list");

const sprintListContainer = document.getElementById("sprint-list-container");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  switchPhase("piloto");
  
  // Event listeners para as abas
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const phase = tab.getAttribute("data-phase");
      switchPhase(phase);
    });
  });
});

// Alterna entre as fases
function switchPhase(phase) {
  activePhase = phase;
  
  // Atualiza botões
  tabs.forEach(tab => {
    if (tab.getAttribute("data-phase") === phase) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Atualiza CSS Variables accent
  const root = document.documentElement;
  if (phase === "piloto") {
    root.style.setProperty("--accent-color", "var(--color-pilot)");
    root.style.setProperty("--accent-color-rgb", "var(--color-pilot-rgb)");
    root.style.setProperty("--border-hover", "rgba(16, 185, 129, 0.3)");
  } else if (phase === "fase2") {
    root.style.setProperty("--accent-color", "var(--color-phase2)");
    root.style.setProperty("--accent-color-rgb", "var(--color-phase2-rgb)");
    root.style.setProperty("--border-hover", "rgba(59, 130, 246, 0.3)");
  } else {
    root.style.setProperty("--accent-color", "var(--color-phase3)");
    root.style.setProperty("--accent-color-rgb", "var(--color-phase3-rgb)");
    root.style.setProperty("--border-hover", "rgba(139, 92, 246, 0.3)");
  }

  // Atualiza KPIs
  const kpis = phaseKpis[phase];
  kpiDuration.textContent = kpis.duration;
  kpiSprints.textContent = kpis.sprints;
  kpiEffort.textContent = kpis.effort;
  kpiBuffer.textContent = kpis.buffer;
  kpiCameras.textContent = kpis.cameras;
  kpiLatency.textContent = kpis.latency;

  // Atualiza Título do Diagrama
  if (phase === "piloto") {
    diagramTitle.textContent = "Arquitetura MVP (Piloto Local)";
    diagramSubtitle.textContent = "Processamento local em nó único com contêineres Docker, SQLite e dashboard local por SSE.";
  } else if (phase === "fase2") {
    diagramTitle.textContent = "Arquitetura de Escala (K8s & GitOps)";
    diagramSubtitle.textContent = "Cluster Kubernetes central (k3s), VPN IPsec/SD-WAN, deploys via ArgoCD e novos detectores locais.";
  } else {
    diagramTitle.textContent = "Arquitetura Corporativa (Nuvem, Kafka & App)";
    diagramSubtitle.textContent = "Ingestão via Kafka na nuvem, banco centralizado, aplicativo móvel em Flutter e observabilidade no Grafana.";
  }

  // Renderiza Diagrama SVG correspondente
  renderDiagram(phase);

  // Limpa painel de detalhes
  hideDetails();

  // Renderiza lista de Sprints
  renderSprints(phase);
}

// Oculta painel de detalhes e exibe placeholder
function hideDetails() {
  detailsPanel.classList.add("hidden");
  detailsPlaceholder.classList.remove("hidden");
}

// Exibe detalhes de um componente selecionado
function showComponentDetails(componentId) {
  const component = architectureDetails[componentId];
  if (!component) return;

  // Remove seleção anterior de nós SVG
  const allNodes = document.querySelectorAll(".svg-node");
  allNodes.forEach(node => node.classList.remove("selected"));

  // Adiciona seleção ao nó ativo
  const activeNode = document.getElementById(`node-${componentId}`);
  if (activeNode) activeNode.classList.add("selected");

  detailsPlaceholder.classList.add("hidden");
  detailsPanel.classList.remove("hidden");

  detailsTitle.textContent = component.title;
  detailsBadge.textContent = component.badge;
  detailsDesc.textContent = component.desc;

  // Renderiza metadados
  detailsMetaContainer.innerHTML = "";
  for (const [label, val] of Object.entries(component.meta)) {
    const metaItem = document.createElement("div");
    metaItem.className = "meta-item";
    metaItem.innerHTML = `
      <span class="meta-label">${label}</span>
      <span class="meta-value">${val}</span>
    `;
    detailsMetaContainer.appendChild(metaItem);
  }

  // Renderiza lista de specs
  detailsList.innerHTML = "";
  component.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = spec;
    detailsList.appendChild(li);
  });
}

// Desenha o diagrama SVG interativo de acordo com a fase
function renderDiagram(phase) {
  let svgContent = "";

  if (phase === "piloto") {
    svgContent = `
      <svg class="svg-diagram" viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Boundary Planta Local -->
        <rect x="20" y="20" width="660" height="410" rx="12" class="svg-boundary" />
        <text x="35" y="45" class="svg-boundary-label">Planta Matriz (Borda Local)</text>

        <!-- Connections (Links) -->
        <path d="M 125 150 L 220 150" class="svg-link active" id="link-c-n" />
        <path d="M 330 150 L 420 150" class="svg-link active" id="link-n-e" />
        <path d="M 475 200 L 475 280" class="svg-link active" id="link-e-f" />
        <path d="M 420 330 L 230 330" class="svg-link active" id="link-f-d" />
        <path d="M 230 330 L 125 330" class="svg-link active" id="link-f-c" />

        <!-- Node: Cameras IP -->
        <g class="svg-node" id="node-cameras" onclick="showComponentDetails('cameras')">
          <rect x="35" y="100" width="90" height="100" rx="8" />
          <!-- CCTV Icon -->
          <path d="M 60 135 H 85 M 65 135 L 55 125 V 145 Z" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="80" y="170" text-anchor="middle">Câmeras IP</text>
          <text x="80" y="183" text-anchor="middle" class="sub-label">32 Canais (Matriz)</text>
        </g>

        <!-- Node: Frigate NVR -->
        <g class="svg-node" id="node-nvr" onclick="showComponentDetails('nvr')">
          <rect x="220" y="100" width="110" height="100" rx="8" />
          <!-- Disc Icon -->
          <circle cx="275" cy="135" r="15" stroke="#10b981" stroke-width="2" fill="none" />
          <circle cx="275" cy="135" r="5" fill="#10b981" />
          <text x="275" y="170" text-anchor="middle">Frigate NVR</text>
          <text x="275" y="183" text-anchor="middle" class="sub-label">Ingestão & Decodificação</text>
        </g>

        <!-- Node: Inference Edge -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="420" y="100" width="110" height="100" rx="8" />
          <!-- GPU Icon -->
          <path d="M 455 125 H 495 V 145 H 455 Z M 465 145 V 150 M 475 145 V 150 M 485 145 V 150" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="475" y="170" text-anchor="middle">Inferência IA</text>
          <text x="475" y="183" text-anchor="middle" class="sub-label">YOLOv8 + TensorRT</text>
        </g>

        <!-- Node: FastAPI Local & SQLite -->
        <g class="svg-node" id="node-fastapi" onclick="showComponentDetails('fastapi')">
          <rect x="420" y="280" width="110" height="100" rx="8" />
          <!-- Gear & DB Icon -->
          <path d="M 475 305 A 8 8 0 0 1 475 321 M 475 301 V 305 M 475 321 V 325" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="475" y="350" text-anchor="middle">FastAPI Engine</text>
          <text x="475" y="363" text-anchor="middle" class="sub-label">Regras & SQLite</text>
        </g>

        <!-- Node: Dashboard Local -->
        <g class="svg-node" id="node-dashboard_local" onclick="showComponentDetails('dashboard_local')">
          <rect x="120" y="280" width="110" height="100" rx="8" />
          <!-- Screen Icon -->
          <path d="M 155 305 H 195 V 325 H 155 Z M 165 325 L 160 333 H 190 L 185 325" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="175" y="350" text-anchor="middle">Dashboard Web</text>
          <text x="175" y="363" text-anchor="middle" class="sub-label">SSE Local (Alunos)</text>
        </g>
      </svg>
    `;
  } else if (phase === "fase2") {
    svgContent = `
      <svg class="svg-diagram" viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#1d4ed8" />
          </linearGradient>
        </defs>

        <!-- Boundary 14 Filiais -->
        <rect x="20" y="20" width="280" height="410" rx="12" class="svg-boundary" />
        <text x="35" y="45" class="svg-boundary-label">14 Borda Edge (Filiais)</text>

        <!-- Boundary Nuvem central -->
        <rect x="390" y="20" width="290" height="410" rx="12" class="svg-boundary" />
        <text x="405" y="45" class="svg-boundary-label">Nuvem Master / Matriz</text>

        <!-- Connections (Links) -->
        <path d="M 130 150 L 210 150" class="svg-link active" style="stroke: #3b82f6;" />
        <path d="M 210 200 L 210 280" class="svg-link active" style="stroke: #3b82f6;" />
        <path d="M 265 330 L 435 330" class="svg-link active" style="stroke: #3b82f6;" />
        <path d="M 490 280 L 490 200" class="svg-link active" style="stroke: #3b82f6;" />
        <path d="M 435 150 L 265 150" class="svg-link active" style="stroke: #3b82f6;" />

        <!-- Node: Cameras IP -->
        <g class="svg-node" id="node-cameras" onclick="showComponentDetails('cameras')">
          <rect x="35" y="100" width="95" height="100" rx="8" />
          <path d="M 60 135 H 85 M 65 135 L 55 125 V 145 Z" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="82" y="165" text-anchor="middle">Câmeras IP</text>
          <text x="82" y="178" text-anchor="middle" class="sub-label">~400 Cameras Totais</text>
        </g>

        <!-- Node: Inference Edge (14 nós) -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="155" y="100" width="110" height="100" rx="8" />
          <path d="M 190 125 H 230 V 145 H 190 Z M 200 145 V 150 M 210 145 V 150 M 220 145 V 150" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="210" y="165" text-anchor="middle">14x Nós Edge</text>
          <text x="210" y="178" text-anchor="middle" class="sub-label">k3s agent + GPUs</text>
        </g>

        <!-- Node: FastAPI & Node-RED -->
        <g class="svg-node" id="node-nodered" onclick="showComponentDetails('nodered')">
          <rect x="155" y="280" width="110" height="100" rx="8" />
          <!-- Integrated Flow Icon -->
          <circle cx="210" cy="320" r="12" stroke="#3b82f6" stroke-width="2" fill="none" />
          <path d="M 198 320 H 222" stroke="#3b82f6" stroke-width="2" />
          <text x="210" y="348" text-anchor="middle">FastAPI + N-RED</text>
          <text x="210" y="361" text-anchor="middle" class="sub-label">Fila SQLite & Clipes</text>
        </g>

        <!-- Node: VPN Criptografada -->
        <g class="svg-node" id="node-vpn" onclick="showComponentDetails('vpn')">
          <rect x="435" y="280" width="110" height="100" rx="8" />
          <!-- Shield Icon -->
          <path d="M 490 305 L 505 310 V 323 C 505 332 497 337 490 340 C 483 337 475 332 475 323 V 310 Z" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="490" y="350" text-anchor="middle">SD-WAN / VPN</text>
          <text x="490" y="363" text-anchor="middle" class="sub-label">Zero Ingress TLS 1.3</text>
        </g>

        <!-- Node: K8s Control Plane -->
        <g class="svg-node" id="node-k8s" onclick="showComponentDetails('k8s')">
          <rect x="435" y="100" width="110" height="100" rx="8" />
          <!-- Kubernetes Wheel Icon -->
          <circle cx="490" cy="135" r="14" stroke="#3b82f6" stroke-width="2" fill="none" />
          <path d="M 490 121 V 149 M 476 135 H 504" stroke="#3b82f6" stroke-width="1.5" />
          <text x="490" y="165" text-anchor="middle">Kubernetes Master</text>
          <text x="490" y="178" text-anchor="middle" class="sub-label">Control Plane Central</text>
        </g>

        <!-- Node: GitOps / ArgoCD -->
        <g class="svg-node" id="node-k8s" onclick="showComponentDetails('k8s')">
          <rect x="560" y="100" width="100" height="100" rx="8" />
          <!-- Git Sync Icon -->
          <path d="M 590 135 H 630 M 590 135 L 600 127 M 630 135 L 620 143" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="610" y="165" text-anchor="middle">ArgoCD</text>
          <text x="610" y="178" text-anchor="middle" class="sub-label">GitOps Continuous</text>
        </g>
      </svg>
    `;
  } else {
    svgContent = `
      <svg class="svg-diagram" viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#6d28d9" />
          </linearGradient>
        </defs>

        <!-- Boundary 14 Filiais -->
        <rect x="15" y="20" width="130" height="410" rx="12" class="svg-boundary" />
        <text x="25" y="45" class="svg-boundary-label">14 Borda Edge</text>

        <!-- Boundary Nuvem Central -->
        <rect x="160" y="20" width="370" height="410" rx="12" class="svg-boundary" />
        <text x="175" y="45" class="svg-boundary-label">Nuvem Corporativa (GCP/AWS/Azure)</text>

        <!-- Boundary Usuários Finais -->
        <rect x="545" y="20" width="140" height="410" rx="12" class="svg-boundary" />
        <text x="555" y="45" class="svg-boundary-label">Clientes / Suporte</text>

        <!-- Connections (Links) -->
        <path d="M 80 150 L 195 150" class="svg-link active" style="stroke: #8b5cf6;" />
        <path d="M 250 150 L 375 150" class="svg-link active" style="stroke: #8b5cf6;" />
        <path d="M 430 150 L 590 150" class="svg-link active" style="stroke: #8b5cf6;" />
        <path d="M 430 200 L 430 280" class="svg-link active" style="stroke: #8b5cf6;" />
        <path d="M 375 330 L 250 330" class="svg-link active" style="stroke: #8b5cf6;" />
        <path d="M 195 330 L 80 330" class="svg-link active" style="stroke: #8b5cf6;" />
        <path d="M 485 330 L 590 330" class="svg-link active" style="stroke: #8b5cf6;" />

        <!-- Node: Edge Nodes (14 Filiais) -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="25" y="100" width="110" height="100" rx="8" />
          <path d="M 60 125 H 100 V 145 H 60 Z M 70 145 V 150 M 80 145 V 150 M 90 145 V 150" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="80" y="165" text-anchor="middle">14x Nós Edge</text>
          <text x="80" y="178" text-anchor="middle" class="sub-label">YOLO + N-RED</text>
        </g>

        <!-- Node: Broker Kafka -->
        <g class="svg-node" id="node-kafka" onclick="showComponentDetails('kafka')">
          <rect x="175" y="100" width="100" height="100" rx="8" />
          <!-- Flow circles icon -->
          <circle cx="205" cy="135" r="5" fill="#8b5cf6" />
          <circle cx="225" cy="135" r="5" fill="#8b5cf6" />
          <circle cx="245" cy="135" r="5" fill="#8b5cf6" />
          <path d="M 210 135 H 240" stroke="#8b5cf6" stroke-width="2" />
          <text x="225" y="165" text-anchor="middle">Kafka Broker</text>
          <text x="225" y="178" text-anchor="middle" class="sub-label">Ingestão Paralela</text>
        </g>

        <!-- Node: API Cloud FastAPI -->
        <g class="svg-node" id="node-cloud_backend" onclick="showComponentDetails('cloud_backend')">
          <rect x="360" y="100" width="125" height="100" rx="8" />
          <!-- API cloud icon -->
          <path d="M 405 130 C 400 130 395 135 395 140 C 395 145 405 150 425 150 C 445 150 445 140 435 130 Z" stroke="#8b5cf6" stroke-width="1.5" fill="none" />
          <text x="422" y="165" text-anchor="middle">Cloud Engine</text>
          <text x="422" y="178" text-anchor="middle" class="sub-label">FastAPI & DB/S3</text>
        </g>

        <!-- Node: Grafana & Prometheus -->
        <g class="svg-node" id="node-observability" onclick="showComponentDetails('observability')">
          <rect x="175" y="280" width="115" height="100" rx="8" />
          <!-- Chart Icon -->
          <path d="M 205 325 V 305 H 245 M 205 325 H 245 M 215 320 H 225 M 230 310 H 240" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="232" y="350" text-anchor="middle">Observabilidade</text>
          <text x="232" y="363" text-anchor="middle" class="sub-label">Grafana + Drift</text>
        </g>

        <!-- Node: Dashboard Executivo -->
        <g class="svg-node" id="node-dash_exec" onclick="showComponentDetails('dash_exec')">
          <rect x="360" y="280" width="125" height="100" rx="8" />
          <path d="M 395 305 H 450 V 325 H 395 Z M 410 325 L 405 333 H 440 L 435 325" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="422" y="350" text-anchor="middle">Dash Executivo</text>
          <text x="422" y="363" text-anchor="middle" class="sub-label">WebSockets (Live)</text>
        </g>

        <!-- Node: App Flutter (Mobile) -->
        <g class="svg-node" id="node-app_flutter" onclick="showComponentDetails('app_flutter')">
          <rect x="560" y="100" width="110" height="100" rx="8" />
          <!-- Smartphone Icon -->
          <rect x="595" y="115" width="40" height="70" rx="6" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <circle cx="615" cy="175" r="3" fill="#8b5cf6" />
          <text x="615" y="160" text-anchor="middle" style="font-size: 11px;">Flutter App</text>
          <text x="615" y="215" text-anchor="middle" class="sub-label">Android / iOS Push</text>
        </g>

        <!-- Node: Suporte e TI local -->
        <g class="svg-node" id="node-observability" onclick="showComponentDetails('observability')">
          <rect x="560" y="280" width="110" height="100" rx="8" />
          <!-- Headset Icon -->
          <circle cx="615" cy="315" r="12" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <path d="M 603 315 V 325 H 627 V 315" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="615" y="350" text-anchor="middle">Equipe Suporte</text>
          <text x="615" y="363" text-anchor="middle" class="sub-label">Alertas Slack/Teams</text>
        </g>
      </svg>
    `;
  }

  diagramContainer.innerHTML = svgContent;
}

// Renderiza a lista de Sprints com base na fase selecionada
function renderSprints(phase) {
  const sprints = sprintData[phase];
  sprintListContainer.innerHTML = "";

  sprints.forEach((sprint, index) => {
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
        <span class="sprint-front">Frente: <span class="front-badge">${sprint.front}</span></span>
        <span class="sprint-hours">${sprint.hours}</span>
      </div>
      
      <!-- Detalhes Expandidos (Sanfona) -->
      <div class="sprint-details-container" id="details-${sprint.id}">
        <div class="sprint-desc" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
          ${sprint.summary}
        </div>
        
        <div class="user-stories-container">
          <div class="task-list-title">User Stories</div>
          ${sprint.userStories.map(us => `
            <div class="us-block">
              <div class="us-title">${us.title}</div>
              <div class="us-text">"${us.text}"</div>
            </div>
          `).join('')}
        </div>
        
        <div class="tasks-container">
          <div class="task-list-title">Tarefas e Estimativas</div>
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

    // Toggle ao clicar na Sprint Card
    card.addEventListener("click", (e) => {
      // Evita o trigger se clicar em tarefas/stories internos
      if (e.target.closest(".sprint-details-container")) return;

      const isAlreadyActive = card.classList.contains("active");
      
      // Fecha todos os cards
      document.querySelectorAll(".sprint-card").forEach(c => c.classList.remove("active"));
      
      if (!isAlreadyActive) {
        card.classList.add("active");
        activeSprintId = sprint.id;
      } else {
        activeSprintId = null;
      }
    });

    sprintListContainer.appendChild(card);
  });
}
