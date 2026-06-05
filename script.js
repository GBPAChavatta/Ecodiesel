// Dados das Sprints divididos por Fase (Revisado: Otimizações de Processamento + Hardware Tipo B1)
const sprintData = {
  piloto: [
    {
      id: "MVP-1",
      tag: "Sprint 1.1",
      weeks: "Semanas 1-2",
      name: "Setup Edge, Ingestão das Câmeras & Image Proxy",
      hours: "80h",
      front: "DevOps & IA de Borda",
      summary: "Mapear câmeras da matriz, preparar OS com CUDA, subir Frigate com NVDEC e implementar o Image Proxy com pHash nativo, skip rate e SQLite WAL — base do pipeline otimizado de baixo consumo.",
      userStories: [
        {
          title: "Setup de Infra e Captura",
          text: "Como desenvolvedor, quero mapear as 32 câmeras e configurar a Golden Image com drivers CUDA e uvloop no edge local para garantir recepção estável e baixa latência."
        },
        {
          title: "Image Proxy & Quick Wins de Performance",
          text: "Como engenheiro de IA, quero o Image Proxy com pHash nativo, ROI motion score e SQLite WAL mode para reduzir em 80% o número de frames enviados à GPU."
        }
      ],
      tasks: [
        { desc: "Discovery e Mapeamento de Câmeras IP (VLANs, IPs e streams RTSP)", est: "20h" },
        { desc: "Preparação do OS Ubuntu Server 24.04, drivers NVIDIA, CUDA Toolkit e uvloop", est: "10h" },
        { desc: "Setup do NVR Frigate com decodificação por hardware (NVDEC)", est: "20h" },
        { desc: "Image Proxy: pHash nativo (sem PIL), ROI motion score, deque O(1), SQLite WAL", est: "18h" },
        { desc: "Ajuste e contingência física em campo (Lucas do Rio Verde/MT)", est: "12h" }
      ]
    },
    {
      id: "MVP-2",
      tag: "Sprint 1.2",
      weeks: "Semanas 3-4",
      name: "IA Pipeline (TensorRT + ByteTrack), Motor de Regras & Fila Redis",
      hours: "80h",
      front: "IA / Visão & Backend",
      summary: "Compilar YOLOv8n em TensorRT, integrar ByteTrack, implementar o motor de regras FastAPI (ROIs + permanência) e subir a fila persistente Redis Streams com AsyncBatchLogger e SQLite WAL.",
      userStories: [
        {
          title: "Pipeline de IA Otimizado",
          text: "Como engenheiro de IA, quero o YOLOv8n compilado em TensorRT com tracker ByteTrack rodando na borda local para detectar e rastrear pessoas e veículos em tempo real."
        },
        {
          title: "Motor de Regras e Fila Resiliente",
          text: "Como operador da matriz, quero regras de ROI e permanência no FastAPI com fila em Redis Streams (com backpressure) e SQLite WAL para persistência offline."
        }
      ],
      tasks: [
        { desc: "Compilação e validação do YOLOv8n em engine TensorRT FP16/INT8", est: "15h" },
        { desc: "Integração do tracker ByteTrack no pipeline local de inferência", est: "12h" },
        { desc: "FastAPI Local: regras de ROIs com polígonos e tempo de permanência", est: "20h" },
        { desc: "Setup Redis Streams com consumer groups e backpressure (substituindo lpush/rpop)", est: "15h" },
        { desc: "AsyncBatchLogger com SQLite WAL e cronjob de expurgo de mídias (30 dias LGPD)", est: "18h" }
      ]
    },
    {
      id: "MVP-3",
      tag: "Sprint 1.3",
      weeks: "Semanas 5-6",
      name: "Dashboard Local, Calibração de Acurácia & Homologação",
      hours: "40h",
      front: "Backend & Frontend",
      summary: "Sprint final com horas excedentes do Piloto: entregar dashboard SPA local via SSE, calibrar acurácia em campo, gerar benchmark E2E (antes/depois) e fazer a homologação com o cliente Fernando.",
      userStories: [
        {
          title: "Dashboard e Benchmark de Validação",
          text: "Como equipe de monitoramento, quero alertas em <5s no dashboard local (SSE) e um relatório de benchmark E2E comprovando a redução de carga antes/depois das otimizações."
        }
      ],
      tasks: [
        { desc: "Dashboard SPA local em HTML/JS com SSE (Server-Sent Events)", est: "15h" },
        { desc: "Calibração de acurácia de IA e thresholds do Proxy em campo (poeira, faróis)", est: "10h" },
        { desc: "Benchmark E2E antes/depois (CPU%, latência P95, skip rate) — relatório para Fernando", est: "10h" },
        { desc: "Homologação ponta a ponta com o cliente Fernando e handover", est: "5h" }
      ]
    }
  ],
  fase2: [
    {
      id: "F2-1",
      tag: "Sprint 2.1",
      weeks: "Semanas 5-6",
      name: "Mapeamento de Redes & Distribuição de Câmeras",
      hours: "80h",
      front: "DevOps / SRE",
      summary: "Mapear switches e câmeras das 14 unidades, registrar distribuição real (16-100 cams/unidade) e subir o túnel SD-WAN VPN. Cada nó processa LOCALMENTE — vídeo RTSP não sai pela WAN.",
      userStories: [
        {
          title: "Mapa Real de Câmeras por Unidade",
          text: "Como DevOps, quero catalogar a distribuição exata de câmeras (16 a 100) por unidade para dimensionar o hardware de cada nó Tipo B1 antes da compra."
        },
        {
          title: "Conectividade Segura Zero Ingress",
          text: "Como SRE, quero o túnel VPN IPSec/SD-WAN outbound das 14 filiais ao master sem abrir nenhuma porta de entrada — apenas eventos leves (KB) trafegam pela WAN."
        }
      ],
      tasks: [
        { desc: "Mapear switches, VLANs, IPs e quantidade exata de câmeras nas 14 filiais", est: "50h" },
        { desc: "Configurar túnel VPN IPSec/SD-WAN seguro e rotas outbound", est: "30h" }
      ]
    },
    {
      id: "F2-2",
      tag: "Sprint 2.2",
      weeks: "Semanas 7-8",
      name: "Master Node, Control Plane & Golden Image Tipo B1",
      hours: "100h",
      front: "IA / Visão & DevOps",
      summary: "Provisionar o k3s Master central e criar a Golden Image del Nó Tipo B1 (Ryzen 5 7600 + 16GB + RTX 5060 Ti 16GB) com Image Proxy pré-configurado — hardware padronizado para os 14 nós.",
      userStories: [
        {
          title: "Orquestrador Central k3s",
          text: "Como SRE, quero provisionar o master node central com k3s para gerenciar os 14 nós de borda via GitOps (deploy, config, health) — sem balancear vídeo entre nós."
        },
        {
          title: "Golden Image do Nó Tipo B1",
          text: "Como DevOps, quero a Golden Image do Nó Tipo B1 (Ubuntu + CUDA + Docker + Image Proxy + k3s agent) pronta para bootstrap plug-and-play nos 14 prédios."
        }
      ],
      tasks: [
        { desc: "Provisionar servidor master central (GCP/AWS/On-Premise) com alta disponibilidade", est: "25h" },
        { desc: "Instalar k3s Server e configurar políticas de comunicação TLS dos nós", est: "25h" },
        { desc: "Criar Golden Image Ubuntu com CUDA, drivers NVIDIA e Image Proxy otimizado", est: "25h" },
        { desc: "Codificar script de bootstrap e auto-handshake seguro k3s agent", est: "25h" }
      ]
    },
    {
      id: "F2-3",
      tag: "Sprint 2.3",
      weeks: "Semanas 9-10",
      name: "Shared Memory IPC & Automação Ansible",
      hours: "130h",
      front: "DevOps / SRE & IA",
      summary: "Implementar Shared Memory IPC zero-copy entre Frigate e Image Proxy (maior redução de latência), e desenvolver os playbooks Ansible que configuram os 14 nós Tipo B1 automaticamente.",
      userStories: [
        {
          title: "Shared Memory Zero-Copy",
          text: "Como engenheiro de IA, quero SharedFrameBuffer via multiprocessing.shared_memory para eliminar a serialização JPEG entre Frigate e Image Proxy, reduzindo latência em ~40ms por frame."
        },
        {
          title: "Provisionamento IaC Ansible",
          text: "Como DevOps, quero playbooks Ansible para formatar NVMe, configurar docker-daemon, Redis e Image Proxy nos 14 nós Tipo B1 sem intervenção manual."
        }
      ],
      tasks: [
        { desc: "Implementar SharedFrameBuffer (multiprocessing.shared_memory) no Image Proxy", est: "20h" },
        { desc: "Benchmark de latência IPC: shared memory vs HTTP/JPEG vs Unix socket", est: "10h" },
        { desc: "Escrever playbooks Ansible de infraestrutura e dependências CUDA/Docker", est: "50h" },
        { desc: "Simular deploy automatizado dos nós em laboratório para validar IaC", est: "50h" }
      ]
    },
    {
      id: "F2-4",
      tag: "Sprint 2.4",
      weeks: "Semanas 11-12",
      name: "GitOps (ArgoCD), CI/CD & Benchmark Automatizado",
      hours: "125h",
      front: "DevOps / SRE",
      summary: "ArgoCD com overlays Kustomize por prédio, CI/CD com build de imagens Docker e pipeline de benchmark automatizado no CI (protege regressões de performance a cada deploy).",
      userStories: [
        {
          title: "GitOps por Unidade",
          text: "Como DevOps, quero overlays Kustomize individuais por prédio no ArgoCD para gerenciar campsites (16-100), thresholds do Proxy e ROIs de forma centralizada sem tocar no hardware."
        },
        {
          title: "CI de Benchmark de Performance",
          text: "Como Tech Lead, quero um pipeline de benchmark no CI que execute os testes de skip rate, latência P95 e CPU% a cada PR, evitando regressões de performance nas otimizações."
        }
      ],
      tasks: [
        { desc: "Instalar e configurar ArgoCD integrado ao repositório de código", est: "30h" },
        { desc: "Desenvolver manifestos Kustomize estruturados (Base + Overlays por prédio)", est: "30h" },
        { desc: "Escrever pipelines GitHub Actions/GitLab CI para imagens Docker do Motor", est: "25h" },
        { desc: "Implementar pipeline de benchmark automatizado de performance no CI", est: "25h" },
        { desc: "Integrar ferramentas de análise estática de código e linting no CI", est: "15h" }
      ]
    },
    {
      id: "F2-5",
      tag: "Sprint 2.5",
      weeks: "Semanas 13-14",
      name: "TensorRT INT8 & Dynamic Batching (5x throughput)",
      hours: "160h",
      front: "IA / Visão",
      summary: "Calibrar e exportar o YOLOv8 em INT8 (160fps vs 30fps na RTX 5060 Ti 16GB) com Dynamic Batching de 4-8 crops por inferência. Ganho de 5x in throughput na mesma GPU — base para EPIs na Fase 2.",
      userStories: [
        {
          title: "TensorRT INT8 com Calibração",
          text: "Como engenheiro de IA, quero exportar o YOLOv8n em TensorRT INT8 com dataset de calibração das câmeras Intelbras reais para obter 160fps sem perda de acurácia > 0.5% mAP."
        },
        {
          title: "Dynamic Batching de Crops",
          text: "Como engenheiro de IA, quero inferência em batches de 4-8 crops simultâneos por chamada para maximizar a utilização da VRAM da RTX 5060 Ti 16GB com múltiplos modelos ativos."
        }
      ],
      tasks: [
        { desc: "Coletar dataset de calibração INT8 das câmeras Intelbras (poeira, noite, IR)", est: "20h" },
        { desc: "Exportar YOLOv8n em TensorRT INT8 com calibração e validar acurácia (mAP50)", est: "40h" },
        { desc: "Implementar Dynamic Batching no Image Proxy (4-8 crops por inferência)", est: "30h" },
        { desc: "Benchmark: FPS INT8 vs FP16, utilização VRAM, latência P99", est: "15h" },
        { desc: "Treinar e rotular dataset de EPIs reais (capacetes, coletes) em ambiente agroindustrial", est: "40h" },
        { desc: "Treinar e exportar YOLOv8-EPI in FP16 validando estabilidade de FPS em paralelo", est: "15h" }
      ]
    },
    {
      id: "F2-6",
      tag: "Sprint 2.6",
      weeks: "Semanas 15-16",
      name: "FastAPI EPIs, DuckDB Analytics & Calibração",
      hours: "120h",
      front: "IA & Backend",
      summary: "Integrar YOLO-EPI no FastAPI com Dynamic Batching, adicionar DuckDB para analytics rápido de histórico de violações (4-8x mais rápido que SQLite para queries), e calibrar thresholds em campo.",
      userStories: [
        {
          title: "Regras de EPI com Dynamic Batching",
          text: "Como Dev Backend, quero o YOLO-EPI integrado no FastAPI com Dynamic Batching e filtro de permanência >3s, garantindo que a GPU da RTX 5060 Ti 16GB não sature com dois modelos simultâneos."
        },
        {
          title: "DuckDB para Analytics de Violações",
          text: "Como gestor, quero consultas de violações históricas por turno e câmera respondendo em <200ms usando DuckDB com Parquet — sem bloquear o pipeline de inferência del SQLite."
        }
      ],
      tasks: [
        { desc: "Integrar YOLO-EPI no FastAPI com Dynamic Batching e regras de permanência >3s", est: "30h" },
        { desc: "Implementar DuckDB com Parquet para analytics de violações por turno e câmera", est: "25h" },
        { desc: "Otimizar concorrência de modelos na RTX 5060 Ti 16GB com CUDA Streams paralelos", est: "25h" },
        { desc: "Calibrar limiares de confiança da IA (>75%) em campo: chuva, poeira, faróis", est: "25h" },
        { desc: "Ajustar thresholds do Image Proxy por unidade (16-100 câmeras, ambientes diferentes)", est: "15h" }
      ]
    },
    {
      id: "F2-7",
      tag: "Sprint 2.7",
      weeks: "Semanas 17-18",
      name: "Detector de Veículos, Horários & Node-RED",
      hours: "125h",
      front: "IA & Backend",
      summary: "Detector de veículos com ByteTrack para pátios, regras de horários restritos no FastAPI e fluxos de corte de mídias no Node-RED com retry via túnel TLS outbound.",
      userStories: [
        {
          title: "Segurança Logística e Horários",
          text: "Como gerente operacional, quero detectar veículos suspeitos em ROIs de pátio fora do horário (22h-05h) sem sobrecarregar a GPU — Image Proxy filtra frames parados automaticamente."
        },
        {
          title: "Orquestração de Mídia Local",
          text: "Como SRE, quero que the Node-RED capture clipes de 5s do Frigate sob violações de veículo/EPI e envie via túnel TLS com retry exponencial e buffer local em SQLite."
        }
      ],
      tasks: [
        { desc: "Otimizar modelo YOLOv8-car e integrar ByteTrack para tracking estável no pátio", est: "50h" },
        { desc: "Escrever regras analíticas de horários proibidos (22h às 05h) no FastAPI", est: "40h" },
        { desc: "Codificar fluxos no Node-RED local para fatiar mídias e realizar retentativas TLS", est: "35h" }
      ]
    },
    {
      id: "F2-8",
      tag: "Sprint 2.8",
      weeks: "Semanas 19-20",
      name: "Rollout, Tuning por Unidade & Homologação dos 14 Nós",
      hours: "220h",
      front: "DevOps / SRE & QA",
      summary: "Instalação física e bootstrap dos 14 Nós Tipo B1 (Ryzen 5 7600 + 16GB + RTX 5060 Ti 16GB) nas unidades. Tuning do Image Proxy por unidade (16-100 câmeras cada) e homologação E2E del cluster.",
      userStories: [
        {
          title: "Rollout dos 14 Nós Tipo B1",
          text: "Como SRE, quero apoiar o TI do cliente na montagem em rack e bootstrap del OS nos 14 prédios, conectando cada nó Tipo B1 ao cluster k3s e validando o pipeline de IA local."
        },
        {
          title: "Tuning do Proxy e Configurações por Unidade",
          text: "Como DevOps, quero calibrar os thresholds do Image Proxy e ROIs para cada unidade (desde 16 até 100 câmeras) e cadastrar as 440 câmeras no Git via ArgoCD em lote."
        }
      ],
      tasks: [
        { desc: "Acompanhar instalação em rack e rodar bootstrap nos prédios 1 a 7", est: "50h" },
        { desc: "Acompanhar instalação em rack e rodar bootstrap nos prédios 8 a 14", est: "50h" },
        { desc: "Tuning do Image Proxy por unidade: skip rate, pHash threshold, ROI motion", est: "60h" },
        { desc: "Configurar ConfigMaps de ROIs e IPs das 440 câmeras no Git e validar SQLite offline", est: "30h" },
        { desc: "Deploy massivo via ArgoCD e homologação E2E del cluster completo de 14 nós", est: "30h" }
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
      summary: "Provisionar Apache Kafka gerenciado na nuvem para centralizar os eventos dos 14 nós locais. Redis Streams na borda já garante entrega resiliente; Kafka recebe apenas eventos confirmados.",
      userStories: [
        {
          title: "Ingestão Paralela de 14 Nós",
          text: "Como SRE, quero provisionar Kafka na nuvem com alta disponibilidade para receber eventos dos 14 nós em paralelo, com particionamento por unidade e retenção configurável."
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
      summary: "PostgreSQL central com modelagem de eventos multi-filial, bucket S3 com expurgo automático de 30 dias (LGPD) e API Cloud com agrupador de alertas anti-flood.",
      userStories: [
        {
          title: "Camada de Dados Central Multi-Filial",
          text: "Como Dev Backend, quero PostgreSQL com schema por unidade e bucket S3 com ciclo de vida de 30 dias para expurgar mídias automaticamente conforme LGPD."
        },
        {
          title: "Agrupador de Alertas Anti-Flood",
          text: "Como gerente, quero que a API Cloud agrupe eventos repetitivos (mesma câmera, mesmo tipo) em janelas de 5min, evitando enxurradas de notificações após reconexão pós-queda."
        }
      ],
      tasks: [
        { desc: "Modelar PostgreSQL corporativo multi-filial e configurar bucket S3 com expurgo", est: "50h" },
        { desc: "Desenvolver endpoints de ingestão FastAPI Cloud com de-duplicação e anti-flood", est: "50h" }
      ]
    },
    {
      id: "F3-3",
      tag: "Sprint 3.3",
      weeks: "Semanas 5-6",
      name: "Dashboard Executivo Web — UI/UX & Gráficos",
      hours: "110h",
      front: "Frontend Web",
      summary: "SPA executiva premium com mapas de calor de violações por filial, gráficos de tendência, alertas WebSocket ao vivo e audit log LGPD. Dark/Glassmorphism design.",
      userStories: [
        {
          title: "Visualização Executiva por Filial",
          text: "Como diretor do Grupo Cortezia, quero um dashboard premium com mapa de calor de incidentes por prédio (das 14 filiais), filtros por tipo de evento e tendências semanais."
        }
      ],
      tasks: [
        { desc: "Codificar layout moderno SPA React/Vue com suporte a múltiplos usuários", est: "60h" },
        { desc: "Desenvolver gráficos de violações por filial, mapas de calor e exportação PDF", est: "50h" }
      ]
    },
    {
      id: "F3-4",
      tag: "Sprint 3.4",
      weeks: "Semanas 7-8",
      name: "Auditoria LGPD & Conexões WebSockets",
      hours: "90h",
      front: "Frontend & Backend",
      summary: "Logs de auditoria inalteráveis (LGPD) para cada acesso a clipes, e alertas audiovisuais instantâneos via WebSockets de baixa latência no dashboard corporativo.",
      userStories: [
        {
          title: "Conformidade LGPD com Audit Trail",
          text: "Como oficial de dados (DPO), quero registros inalteráveis de quem assistiu a qual clipe, com timestamp e ação, exportáveis em PDF com marca d'água da empresa."
        },
        {
          title: "Alertas Live via WebSockets",
          text: "Como operador central, quero receber alertas críticos audiovisuais instantâneos (<1s no dashboard web) via WebSockets com reconexão automática."
        }
      ],
      tasks: [
        { desc: "Desenvolver logs inalteráveis de acesso a vídeos e geração de PDF com marca d'água", est: "45h" },
        { desc: "Implementar WebSockets na API Cloud com alarmes sonoros e reconexão automática", est: "45h" }
      ]
    },
    {
      id: "F3-5",
      tag: "Sprint 3.5",
      weeks: "Semanas 9-10",
      name: "App Mobile: Setup, OAuth2/MFA & Keychain",
      hours: "120h",
      front: "Mobile & Segurança",
      summary: "App Flutter com Clean Architecture, login OAuth2+MFA corporativo e biometria Keychain/KeyStore — base segura para os responsáveis de segurança das 14 unidades.",
      userStories: [
        {
          title: "Plataforma Segura Mobile",
          text: "Como desenvolvedor mobile, quero estruturar o Flutter com pipelines Fastlane e login OAuth2+MFA, pronto para integração com o IdP corporativo do Grupo Cortezia."
        },
        {
          title: "Proteção de Chaves Locais",
          text: "Como usuário do app, quero salvar meu token com biometria no Keychain nativo e HTTPS com Certificate Pinning para proteção contra interceptação em campo."
        }
      ],
      tasks: [
        { desc: "Setup do projeto Flutter, Clean Architecture e pipeline de compilação automática", est: "40h" },
        { desc: "Integração com provedor OAuth2 com suporte a chaves MFA", est: "40h" },
        { desc: "Biometria nativa e armazenamento seguro via Keychain/KeyStore com Certificate Pinning", est: "40h" }
      ]
    },
    {
      id: "F3-6",
      tag: "Sprint 3.6",
      weeks: "Semanas 11-12",
      name: "App Mobile: Feed UI, Push Ricos & Player",
      hours: "125h",
      front: "Mobile / Frontend",
      summary: "Feed paginado de incidentes por filial, push notifications enriquecidas FCM/APNS e player de vídeo em loop de 5s otimizado para conexões móveis de campo.",
      userStories: [
        {
          title: "Feed de Incidentes e Ação Rápida",
          text: "Como gestor de segurança, quero feed paginado com filtros por filial, tipo de evento e horário, com push enriquecido e botões de ação direta (confirmar/dispensar alerta)."
        },
        {
          title: "Player de Clipe Otimizado",
          text: "Como gestor, quero assistir ao clipe de 5s em player nativo com buffer inteligente e loop — funcional mesmo com o 4G instável do MT rural."
        }
      ],
      tasks: [
        { desc: "Desenvolver UI do feed paginado com filtros dinâmicos e persistência local", est: "45h" },
        { desc: "Configurar SDKs FCM/APNS e handlers de notificações ricas com botões de ação", est: "45h" },
        { desc: "Integrar player de vídeo (Chewie/video_player) com buffer adaptativo para baixa banda", est: "35h" }
      ]
    },
    {
      id: "F3-7",
      tag: "Sprint 3.7",
      weeks: "Semanas 13-14",
      name: "Telemetria de Frota, Grafana & Drift de IA",
      hours: "115h",
      front: "DevOps / SRE & IA",
      summary: "Prometheus exporters para GPU/CPU/RAM dos 14 nós Tipo B1, painel Grafana com alertas de temperatura >85°C e monitoramento de model drift do YOLOv8 e YOLO-EPI.",
      userStories: [
        {
          title: "Saúde Térmica e Elétrica dos Nós",
          text: "Como SRE, quero monitorar temperatura, uso de GPU e RAM dos 14 Nós Tipo B1 (RTX 5060 Ti) em campo, recebendo alertas preventivos antes de falha de hardware em MT."
        },
        {
          title: "Observabilidade de Modelos",
          text: "Como engenheiro de IA, quero rastrear FPS, skip rate, latência P95 e desvios de acurácia (model drift) no Grafana para detectar degradação do modelo sem visita presencial."
        }
      ],
      tasks: [
        { desc: "Instalar Prometheus exporters para GPU/CPU/RAM dos 14 Nós Tipo B1", est: "45h" },
        { desc: "Criar exportador de métricas do Image Proxy (skip rate, pHash hits, queue depth)", est: "35h" },
        { desc: "Construir painéis Grafana com alertas de drift, temperatura e latência no Teams/Slack", est: "35h" }
      ]
    },
    {
      id: "F3-8",
      tag: "Sprint 3.8",
      weeks: "Semanas 15-16",
      name: "Modelos Preditivos, Teste de Carga E2E & Handover",
      hours: "190h",
      front: "IA & Backend & QA",
      summary: "Análise preditiva de risco por série temporal, teste de estresse com 440 câmeras simuladas, auditoria OWASP, runbooks de DR e treinamento final da equipe do cliente.",
      userStories: [
        {
          title: "Análise Preditiva de Incidentes",
          text: "Como diretor, quero relatórios preditivos que identifiquem dias e horários de maior risco por unidade, baseados no histórico do DuckDB e modelos de série temporal."
        },
        {
          title: "Homologação de Carga e Segurança",
          text: "Como Tech Lead, quero simular 440 câmeras concorrentes enviando mídias ao Kafka, auditar segurança OWASP Top 10 e treinar a equipe de TI do Grupo Cortezia."
        }
      ],
      tasks: [
        { desc: "Desenvolver modelos de séries temporais para análise preditiva de volumetria de riscos", est: "60h" },
        { desc: "Escrever simulador de carga de 440 câmeras no Kafka e medir latência edge-to-mobile (<5s)", est: "50h" },
        { desc: "Auditoria OWASP Top 10, runbooks de disaster recovery (DR) e treinamento da equipe", est: "80h" }
      ]
    }
  ]
};

// Dados dos componentes de arquitetura interativos (Hardware atualizado: Nó Tipo B1)
const architectureDetails = {
  cameras: {
    title: "Câmeras IP (Intelbras) & NVR",
    badge: "Ingestão local",
    desc: "Câmeras de vigilância Intelbras Full HD conectadas à rede interna de cada unidade. No piloto, são 32 câmeras em 1 prédio; na escala final, 440 câmeras em 14 filiais (16 a 100 por unidade). O vídeo RTSP bruto (~3.5 Mbps/câmera) NUNCA sai da planta.",
    meta: {
      "Protocolo": "RTSP (H.264 / H.265)",
      "Segurança": "VLAN Isolada (zero internet)",
      "Retenção local": "Até 30 dias no NVR",
      "Banda WAN": "0 KB/s — vídeo 100% local"
    },
    specs: [
      "Streams RTSP consumidos apenas 1x pelo go2rtc → Frigate (sem cópias)",
      "Separação por VLAN dedicada por unidade — sem tráfego de câmera no backbone",
      "Decodificação de hardware NVDEC na GPU local (RTX 5060 Ti 16GB)",
      "Condições adversas: poeira, chuva, fumaça, vibração, baixa iluminação"
    ]
  },
  image_proxy: {
    title: "Image Proxy Otimizado",
    badge: "Filtro de Frames",
    desc: "Camada de filtragem inteligente entre o Frigate e o YOLOv8. Usa pHash nativo (sem PIL), ROI motion score e skip rate configurável para enviar apenas 15-25% dos frames à GPU — reduzindo carga da IA em 80%.",
    meta: {
      "Skip Rate": "75-85% dos frames ignorados",
      "pHash": "Nativo NumPy (sem PIL) — 7ms/frame",
      "Transporte": "Shared Memory IPC (zero-copy)",
      "Fila": "Redis Streams com backpressure"
    },
    specs: [
      "pHash nativo (numpy, sem PIL): -70% no tempo de deduplicação",
      "fast_motion_score() com ROI sampling: -80% de pixels calculados",
      "Shared Memory zero-copy: elimina serialização JPEG entre processos",
      "Deque(maxlen=60): histórico de motion O(1) sem lock contention",
      "SQLite WAL mode: leituras e escritas simultâneas sem bloqueio"
    ]
  },
  nvr: {
    title: "Frigate NVR + go2rtc",
    badge: "Ingestão & Decodificação",
    desc: "NVR open source que consome os streams RTSP das câmeras uma única vez via go2rtc (evita múltiplas conexões ao hardware da câmera). Decodifica com NVDEC na GPU de contenção (RTX 5060 Ti) e alimenta o Image Proxy via Shared Memory.",
    meta: {
      "Ambiente": "Docker Container",
      "Aceleração": "NVIDIA NVDEC (GPU RTX 5060 Ti 16GB)",
      "Proxy RTSP": "go2rtc (1 conexão por câmera)",
      "Saída": "Shared Memory (zero-copy)"
    },
    specs: [
      "go2rtc multiplica 1 stream RTSP para N consumidores sem sobrecarga na câmera",
      "NVDEC decodifica streams 1080p na GPU RTX 5060 Ti 16GB de Contenção",
      "Feeds frame buffers em /dev/shm (H.264 comprimido, ~250MB para 32 cams)",
      "API REST/WebSockets para corte de clipes de eventos sob demanda"
    ]
  },
  edge: {
    title: "Nó Tipo B1 — GPU de Contenção",
    badge: "Hardware Padronizado",
    desc: "Servidor industrial homologado para as 14 filiais. Suporta de 16 a 100 câmeras por nó. Processamento local em lote (batch a cada 5-10 minutos). A GPU de contenção evita sobrecarga na CPU e garante margem para alertas futuros.",
    meta: {
      "CPU": "AMD Ryzen 5 7600 (6C/12T, 65W)",
      "GPU": "1× RTX 5060 Ti 16GB (TensorRT INT8)",
      "RAM": "16GB DDR5-4800 MHz"
    },
    specs: [
      "GPU utilização média: ~3% (bursts de 10s de processamento a cada 5min)",
      "TensorRT INT8: 160 FPS vs 30 FPS no FP32 — processamento rápido em lote",
      "Dynamic Batching (4-8 crops): VRAM eficiente na RTX 5060 Ti de 16GB",
      "Ryzen 5 7600 (65W TDP): operação silenciosa, fria e econômica em campo"
    ]
  },
  fastapi: {
    title: "FastAPI Local & SQLite WAL",
    badge: "Lógica de Negócios",
    desc: "Microserviço Python que valida detecções, aplica regras de ROI e permanência, persiste em SQLite WAL (leituras/escritas simultâneas sem bloqueio) e enfileira no Redis Streams com backpressure.",
    meta: {
      "Framework": "Python FastAPI + uvloop",
      "Persistência": "SQLite WAL + Redis Streams",
      "Analytics": "DuckDB (Parquet) — <200ms queries",
      "Latência Alvo": "Assíncrona / Lote (5 a 10 min)"
    },
    specs: [
      "SQLite WAL mode: escritas não bloqueiam leituras — crítico para alta carga de eventos",
      "Redis Streams com consumer groups: backpressure nativo, zero perda de evento",
      "AsyncBatchLogger: batch insert para SQLite — evita picos de I/O por evento unitário",
      "DuckDB Parquet: queries analíticas de histórico 4-8× mais rápidas que SQLite"
    ]
  },
  nodered: {
    title: "Node-RED & Fila Local",
    badge: "Integração & Envio",
    desc: "Orquestrador de fluxos no edge. Captura clipes de 5s das câmeras via API do Frigate, assina os payloads e abre conexões TLS outbound. Nunca aceita conexões de entrada da internet.",
    meta: {
      "Plataforma": "Node-RED (Docker/Pod)",
      "Protocolo de Envio": "HTTPS/TLS 1.3 Outbound",
      "Firewall": "Zero Ingress (nenhuma porta aberta)",
      "Payload": "Clipes JSON/MP4 compactos (KB)"
    },
    specs: [
      "Captura clipes de 5s gravados pelo Frigate sob detecção de evento",
      "Assina payloads via HMAC-SHA256 para integridade do alerta",
      "Retry exponencial automático com buffer persistente local em SQLite",
      "Inicia túnel TLS outbound — a planta nunca expõe portas para a internet"
    ]
  },
  k8s: {
    title: "Kubernetes — Deploy & Health (k3s)",
    badge: "Orquestrador de Frota",
    desc: "Cluster k3s gerencia deploy, configuração e saúde dos 14 nós. NÃO balanceia processamento de vídeo entre nós — cada nó processa apenas as câmeras da sua unidade local (RTSP não viaja pela WAN).",
    meta: {
      "Distribuição": "k3s (lightweight Kubernetes)",
      "Deploy Contínuo": "ArgoCD — GitOps central",
      "O que gerencia": "Deploy, config, health, update",
      "O que NÃO faz": "Balancear vídeo entre sites"
    },
    specs: [
      "GitOps: 1 commit no Git atualiza os 14 nós via ArgoCD sequencialmente",
      "Overlays Kustomize por prédio: config individual de câmeras, ROIs e thresholds",
      "Node Affinity: pods do Frigate/YOLO ficam presos ao nó físico local (vídeo não viaja)",
      "Detecta nó offline e alerta via Grafana — o restante da frota continua operando"
    ]
  },
  vpn: {
    title: "SD-WAN / VPN (Zero Ingress)",
    badge: "Rede Criptografada",
    desc: "Túnel corporativo criptografado ligando os 14 nós ao master central. Trafega APENAS eventos leves (KB), jamais streams de vídeo. Mover RTSP pela WAN exigiria 350 Mbps contínuos de upload — arquiteturalmente inviável.",
    meta: {
      "Tecnologia": "IPsec / SD-WAN corporativo",
      "Criptografia": "AES-256 + TLS 1.3",
      "Tráfego WAN": "Apenas eventos JSON (KB) — NUNCA vídeo",
      "Segurança": "Zero Ingress — firewall bloqueia toda entrada"
    },
    specs: [
      "Princípio: SE É VÍDEO, FICA NA PLANTA. SE É EVENTO, VAI PARA A NUVEM.",
      "100 câmeras × 3.5 Mbps = 350 Mbps de WAN necessário para mover vídeo — inviável",
      "Eventos são JSON comprimidos de ~2-5 KB — toda a frota usa < 1 Mbps de WAN",
      "Queda de WAN não impacta processamento de IA — nó opera offline com fila local"
    ]
  },
  kafka: {
    title: "Broker Apache Kafka",
    badge: "Mensageria Cloud",
    desc: "Broker de alta disponibilidade na nuvem. Recebe eventos confirmados dos 14 nós (já filtrados pelo Image Proxy e FastAPI local) e distribui para consumidores cloud sem gargalo.",
    meta: {
      "Plataforma": "Apache Kafka (AWS/GCP gerenciado)",
      "Protocolo": "TLS 1.3 + Cert. X.509",
      "Volume real": "< 1% do que seria sem Image Proxy",
      "Resiliência": "Particionamento multi-zona"
    },
    specs: [
      "Recebe apenas eventos validados — o Image Proxy já eliminou 80% do ruído na borda",
      "Tópicos particionados por unidade (predio-01 ... predio-14) para paralelismo",
      "Permite reprocessamento (event replay) sem perda de histórico",
      "Desacopla os 14 nós edge do backend cloud — independência total de falhas"
    ]
  },
  cloud_backend: {
    title: "API Cloud FastAPI & Banco",
    badge: "Gestão Corporativa",
    desc: "Backend central do ecossistema. Consolida eventos das 14 filiais, agrupa alertas anti-flood, persiste no PostgreSQL e sobe clipes no S3 com expurgo automático de 30 dias (LGPD).",
    meta: {
      "Linguagem": "Python FastAPI Cloud",
      "Banco Relacional": "PostgreSQL centralizado",
      "Storage": "Object Storage S3 + expurgo 30d",
      "Analytics": "DuckDB / PostgreSQL queries"
    },
    specs: [
      "Deduplica alertas consecutivos da mesma câmera (anti-flood pós-queda de link)",
      "Upload seguro de thumbnails e clipes compactados para S3",
      "Schema multi-filial no PostgreSQL com particionamento por unidade",
      "Relatórios executivos exportáveis por período, filial e tipo de evento"
    ]
  },
  dash_exec: {
    title: "Dashboard Web Executivo",
    badge: "Interface Gerencial",
    desc: "SPA premium para a diretoria do Grupo Cortezia. Mapas de calor de incidentes por filial, tendências semanais, alertas ao vivo via WebSockets e audit trail LGPD completo.",
    meta: {
      "Framework": "React / Vue SPA",
      "Conexão Live": "WebSockets — alertas em <1s",
      "Aparência": "Premium Dark / Glassmorphism",
      "Cobertura": "14 filiais — 440 câmeras"
    },
    specs: [
      "Mapa de calor interativo por filial com drill-down por câmera e horário",
      "Alerta audiovisual instantâneo via WebSocket com reconnect automático",
      "Audit logs inalteráveis exportáveis em PDF com marca d'água (LGPD)",
      "Responsivo para monitores de controle e tablets do supervisor de campo"
    ]
  },
  app_flutter: {
    title: "Aplicativo Móvel Flutter",
    badge: "Cliente Móvel",
    desc: "App nativo para smartphones dos responsáveis de segurança das 14 unidades. OAuth2+MFA, biometria, push rico com foto e player de clipe otimizado para 4G instável do interior do MT.",
    meta: {
      "Tecnologia": "Flutter (Android e iOS)",
      "Segurança": "Biometria + Secure Storage + Pinning",
      "Notificações": "FCM (Firebase) + APNS (Apple)",
      "Player": "Chewie / video_player — buffer adaptativo"
    },
    specs: [
      "Login OAuth2+MFA integrado ao IdP corporativo do Grupo Cortezia",
      "Push rico com foto do evento na bandeja e botões de ação imediata",
      "Player com buffer adaptativo para conexões 4G instáveis no interior do MT",
      "Feed paginado com filtros por filial, câmera, tipo de evento e turno"
    ]
  },
  observability: {
    title: "Grafana & Prometheus",
    badge: "Métricas e Saúde",
    desc: "Telemetria completa dos 14 Nós Tipo B1: GPU/CPU/RAM, temperatura, skip rate do Image Proxy, FPS do YOLO e model drift. Alertas preventivos antes de falhas em campo.",
    meta: {
      "Métricas": "Prometheus Exporters locais",
      "Dashboard": "Grafana corporativo centralizado",
      "Alertas": "Teams / Slack integrado",
      "Novidade": "Skip rate, pHash hits, queue depth"
    },
    specs: [
      "Monitoramento de GPU RTX 5060 Ti: temperatura, utilização e fila de lote",
      "Métricas do Image Proxy: skip rate, pHash cache hit, queue depth Redis Streams",
      "Model drift: FPS do YOLO, latência P95 e mAP estimado em produção",
      "Alerta automático se nó offline, GPU >85°C ou skip rate cair abaixo do esperado"
    ]
  }
};

// KPIs consolidados por fase (revisado com otimizações e 440 câmeras)
const phaseKpis = {
  piloto: {
    duration: "6 semanas (1,5 mês)",
    sprints: "3 Sprints",
    effort: "200 horas",
    buffer: "15% contingência",
    cameras: "32 câmeras (matriz)",
    latency: "5 a 10 minutos (Lote)"
  },
  fase2: {
    duration: "16 semanas (4 meses)",
    sprints: "8 Sprints",
    effort: "1060 horas",
    buffer: "35% contingência",
    cameras: "440 câmeras (14 filiais)",
    latency: "5 a 10 minutos (Lote)"
  },
  fase3: {
    duration: "16 semanas (4 meses)",
    sprints: "8 Sprints",
    effort: "940 horas",
    buffer: "35% contingência",
    cameras: "440 câmeras (frota completa)",
    latency: "5 a 10 minutos (Lote)"
  }
};

// Estado da aplicação
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
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchPhase(tab.getAttribute("data-phase"));
    });
  });
});

// Alterna entre as fases
function switchPhase(phase) {
  activePhase = phase;
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-phase") === phase);
  });

  const root = document.documentElement;
  const colors = {
    piloto: { color: "var(--color-pilot)", rgb: "var(--color-pilot-rgb)", border: "rgba(16, 185, 129, 0.3)" },
    fase2:  { color: "var(--color-phase2)", rgb: "var(--color-phase2-rgb)", border: "rgba(59, 130, 246, 0.3)" },
    fase3:  { color: "var(--color-phase3)", rgb: "var(--color-phase3-rgb)", border: "rgba(139, 92, 246, 0.3)" }
  };
  const c = colors[phase];
  root.style.setProperty("--accent-color", c.color);
  root.style.setProperty("--accent-color-rgb", c.rgb);
  root.style.setProperty("--border-hover", c.border);

  const kpis = phaseKpis[phase];
  kpiDuration.textContent = kpis.duration;
  kpiSprints.textContent = kpis.sprints;
  kpiEffort.textContent = kpis.effort;
  kpiBuffer.textContent = kpis.buffer;
  kpiCameras.textContent = kpis.cameras;
  kpiLatency.textContent = kpis.latency;

  const titles = {
    piloto: { title: "Arquitetura MVP — Piloto Local Otimizado (Batch)", sub: "32 câmeras | Image Proxy + Fila Redis + RTX 5060 Ti | SQLite WAL — processamento local em lote." },
    fase2:  { title: "Arquitetura de Escala — 14 Nós Tipo B1 (RTX 5060 Ti)", sub: "440 câmeras (16-100/filial) | Cada nó processa localmente via Fila e Lote assíncrono." },
    fase3:  { title: "Arquitetura Corporativa — Kafka, Fila Cloud & App Mobile", sub: "Kafka cloud + PostgreSQL + Flutter | Telemetria Grafana dos 14 nós Tipo B1 | Analytics DuckDB." }
  };
  diagramTitle.textContent = titles[phase].title;
  diagramSubtitle.textContent = titles[phase].sub;

  renderDiagram(phase);
  hideDetails();
  renderSprints(phase);
}

function hideDetails() {
  detailsPanel.classList.add("hidden");
  detailsPlaceholder.classList.remove("hidden");
}

function showComponentDetails(componentId) {
  const component = architectureDetails[componentId];
  if (!component) return;

  document.querySelectorAll(".svg-node").forEach(n => n.classList.remove("selected"));
  const activeNode = document.getElementById(`node-${componentId}`);
  if (activeNode) activeNode.classList.add("selected");

  detailsPlaceholder.classList.add("hidden");
  detailsPanel.classList.remove("hidden");

  detailsTitle.textContent = component.title;
  detailsBadge.textContent = component.badge;
  detailsDesc.textContent = component.desc;

  detailsMetaContainer.innerHTML = "";
  for (const [label, val] of Object.entries(component.meta)) {
    const metaItem = document.createElement("div");
    metaItem.className = "meta-item";
    metaItem.innerHTML = `<span class="meta-label">${label}</span><span class="meta-value">${val}</span>`;
    detailsMetaContainer.appendChild(metaItem);
  }

  detailsList.innerHTML = "";
  component.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = spec;
    detailsList.appendChild(li);
  });
}

// Desenha o diagrama SVG interativo por fase
function renderDiagram(phase) {
  let svgContent = "";

  if (phase === "piloto") {
    svgContent = `
      <svg class="svg-diagram" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#10b981" opacity="0.7"/>
          </marker>
        </defs>

        <!-- Boundary Planta Local -->
        <rect x="15" y="15" width="690" height="450" rx="14" class="svg-boundary" />
        <text x="30" y="40" class="svg-boundary-label">PLANTA MATRIZ — Processamento 100% Local (Edge)</text>

        <!-- Sub-boundary: Pipeline de IA -->
        <rect x="220" y="55" width="470" height="200" rx="10" fill="rgba(16,185,129,0.02)" stroke="rgba(16,185,129,0.1)" stroke-width="1" stroke-dasharray="4 4"/>
        <text x="235" y="74" class="svg-boundary-label" style="fill: rgba(16,185,129,0.5);">Pipeline de IA Otimizado</text>

        <!-- Connections -->
        <path d="M 118 155 L 210 155" class="svg-link active" marker-end="url(#arrow-green)"/>
        <path d="M 320 155 L 395 155" class="svg-link active" marker-end="url(#arrow-green)"/>
        <path d="M 505 155 L 580 155" class="svg-link active" marker-end="url(#arrow-green)"/>
        <path d="M 455 205 L 455 290" class="svg-link active" marker-end="url(#arrow-green)"/>
        <path d="M 395 340 L 220 340" class="svg-link active" marker-end="url(#arrow-green)"/>
        <path d="M 110 290 L 110 205" class="svg-link active" marker-end="url(#arrow-green)"/>

        <!-- Label: Shared Memory -->
        <text x="323" y="148" style="fill:#10b981;font-size:8px;font-family:var(--font-title);opacity:0.7;">Shared Mem (IPC)</text>
        <!-- Label: INT8 160fps -->
        <text x="498" y="148" style="fill:#10b981;font-size:8px;font-family:var(--font-title);opacity:0.7;">TRT INT8 160fps</text>
        <!-- Label: Skip 80% -->
        <text x="228" y="148" style="fill:#10b981;font-size:8px;font-family:var(--font-title);opacity:0.7;">Skip 80%</text>

        <!-- Node: Cameras IP -->
        <g class="svg-node" id="node-cameras" onclick="showComponentDetails('cameras')">
          <rect x="28" y="105" width="90" height="100" rx="8" />
          <path d="M 55 140 H 80 M 60 140 L 50 130 V 150 Z" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="73" y="172" text-anchor="middle">Câmeras IP</text>
          <text x="73" y="185" text-anchor="middle" class="sub-label">32 Canais RTSP</text>
        </g>

        <!-- Node: Image Proxy -->
        <g class="svg-node" id="node-image_proxy" onclick="showComponentDetails('image_proxy')">
          <rect x="210" y="105" width="110" height="100" rx="8" />
          <path d="M 240 135 L 260 125 L 280 135 L 260 145 Z" stroke="#10b981" stroke-width="1.5" fill="rgba(16,185,129,0.1)" />
          <path d="M 250 150 V 158" stroke="#10b981" stroke-width="1.5"/>
          <text x="265" y="173" text-anchor="middle">Image Proxy</text>
          <text x="265" y="185" text-anchor="middle" class="sub-label">pHash · ROI · Skip</text>
        </g>

        <!-- Node: Frigate NVR -->
        <g class="svg-node" id="node-nvr" onclick="showComponentDetails('nvr')">
          <rect x="395" y="105" width="110" height="100" rx="8" />
          <circle cx="450" cy="140" r="16" stroke="#10b981" stroke-width="2" fill="none" />
          <circle cx="450" cy="140" r="5" fill="#10b981" />
          <text x="450" y="172" text-anchor="middle">Frigate NVR</text>
          <text x="450" y="185" text-anchor="middle" class="sub-label">NVDEC + go2rtc</text>
        </g>

        <!-- Node: Inference Edge (YOLOv8 + TensorRT) -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="580" y="105" width="110" height="100" rx="8" />
          <path d="M 610 128 H 660 V 148 H 610 Z M 620 148 V 155 M 635 148 V 155 M 650 148 V 155" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="635" y="172" text-anchor="middle">RTX 5060 Ti</text>
          <text x="635" y="185" text-anchor="middle" class="sub-label">YOLOv8 INT8 · ~3% (Lote)</text>
        </g>

        <!-- Node: FastAPI + SQLite WAL + Redis -->
        <g class="svg-node" id="node-fastapi" onclick="showComponentDetails('fastapi')">
          <rect x="395" y="290" width="110" height="100" rx="8" />
          <path d="M 450 315 A 10 10 0 0 1 450 335" stroke="#10b981" stroke-width="2" fill="none"/>
          <circle cx="450" cy="315" r="4" fill="#10b981"/>
          <text x="450" y="358" text-anchor="middle">FastAPI Engine</text>
          <text x="450" y="371" text-anchor="middle" class="sub-label">SQLite WAL · Redis Streams</text>
        </g>

        <!-- Node: Dashboard Local -->
        <g class="svg-node" id="node-dashboard_local" onclick="showComponentDetails('dashboard_local')">
          <rect x="28" y="290" width="110" height="100" rx="8" />
          <path d="M 60 315 H 110 V 340 H 60 Z M 75 340 L 68 352 H 102 L 95 340" stroke="#10b981" stroke-width="2" fill="none" />
          <text x="83" y="368" text-anchor="middle">Dashboard Local</text>
          <text x="83" y="381" text-anchor="middle" class="sub-label">SSE · Alertas Sonoros</text>
        </g>

      </svg>
    `;
  } else if (phase === "fase2") {
    svgContent = `
      <svg class="svg-diagram" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" opacity="0.7"/>
          </marker>
        </defs>

        <!-- Boundary: Filial Local (cada um dos 14) -->
        <rect x="15" y="15" width="310" height="450" rx="14" class="svg-boundary" />
        <text x="30" y="40" class="svg-boundary-label" style="fill:rgba(59,130,246,0.6);">Filial Local (1 de 14) — Processamento 100% local</text>

        <!-- Sub-label no-go -->
        <text x="30" y="455" style="fill:rgba(59,130,246,0.4);font-size:8px;font-family:var(--font-title);">⚡ RTSP nunca sai desta caixa → K8s NÃO balanceia vídeo entre filiais</text>

        <!-- Boundary: Nuvem Central -->
        <rect x="365" y="15" width="340" height="450" rx="14" class="svg-boundary" />
        <text x="380" y="40" class="svg-boundary-label" style="fill:rgba(59,130,246,0.6);">Nuvem Master / Matriz (K8s Control Plane)</text>

        <!-- Connections borda → nuvem (só eventos KB, nunca vídeo) -->
        <path d="M 325 160 L 365 160" class="svg-link active" style="stroke:#3b82f6;" marker-end="url(#arrow-blue)"/>
        <path d="M 325 340 L 365 340" class="svg-link active" style="stroke:#3b82f6;" marker-end="url(#arrow-blue)"/>
        <!-- Label WAN -->
        <text x="328" y="155" style="fill:#3b82f6;font-size:7px;font-family:var(--font-title);opacity:0.8;">Eventos (KB)</text>
        <text x="328" y="335" style="fill:#3b82f6;font-size:7px;font-family:var(--font-title);opacity:0.8;">k3s heartbeat</text>

        <!-- Connections internas filial -->
        <path d="M 120 150 L 195 150" class="svg-link active" style="stroke:#3b82f6;" marker-end="url(#arrow-blue)"/>
        <path d="M 240 200 L 240 290" class="svg-link active" style="stroke:#3b82f6;" marker-end="url(#arrow-blue)"/>

        <!-- Connections internas nuvem -->
        <path d="M 530 160 L 600 160" class="svg-link active" style="stroke:#3b82f6;" marker-end="url(#arrow-blue)"/>
        <path d="M 535 200 L 535 290" class="svg-link active" style="stroke:#3b82f6;" marker-end="url(#arrow-blue)"/>

        <!-- Node: Câmeras (local) -->
        <g class="svg-node" id="node-cameras" onclick="showComponentDetails('cameras')">
          <rect x="30" y="100" width="90" height="100" rx="8" />
          <path d="M 55 135 H 80 M 60 135 L 50 125 V 145 Z" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="75" y="168" text-anchor="middle">16-100 Cams</text>
          <text x="75" y="181" text-anchor="middle" class="sub-label">RTSP Intelbras</text>
        </g>

        <!-- Node: Nó Tipo M (local) -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="195" y="100" width="120" height="100" rx="8" />
          <path d="M 225 128 H 285 V 148 H 225 Z M 240 148 V 153 M 255 148 V 153 M 270 148 V 153" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="255" y="168" text-anchor="middle">Nó Tipo B1</text>
          <text x="255" y="180" text-anchor="middle" class="sub-label">Ryzen 5 + RTX 5060 Ti</text>
          <text x="255" y="191" text-anchor="middle" class="sub-label">16GB RAM · SSD 512GB (Lote)</text>
        </g>

        <!-- Node: FastAPI + Image Proxy (local) -->
        <g class="svg-node" id="node-fastapi" onclick="showComponentDetails('fastapi')">
          <rect x="195" y="290" width="120" height="100" rx="8" />
          <path d="M 255 315 A 10 10 0 0 1 255 335" stroke="#3b82f6" stroke-width="2" fill="none"/>
          <circle cx="255" cy="315" r="4" fill="#3b82f6"/>
          <text x="255" y="358" text-anchor="middle">Image Proxy</text>
          <text x="255" y="370" text-anchor="middle" class="sub-label">FastAPI + Redis Streams</text>
          <text x="255" y="382" text-anchor="middle" class="sub-label">Skip 80% · SQLite WAL</text>
        </g>

        <!-- Node: VPN/SD-WAN -->
        <g class="svg-node" id="node-vpn" onclick="showComponentDetails('vpn')">
          <rect x="380" y="100" width="120" height="100" rx="8" />
          <path d="M 440 120 L 455 125 V 138 C 455 147 447 152 440 155 C 433 152 425 147 425 138 V 125 Z" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="440" y="172" text-anchor="middle">SD-WAN / VPN</text>
          <text x="440" y="184" text-anchor="middle" class="sub-label">Zero Ingress · TLS 1.3</text>
          <text x="440" y="196" text-anchor="middle" class="sub-label">Apenas eventos (KB)</text>
        </g>

        <!-- Node: K8s Master -->
        <g class="svg-node" id="node-k8s" onclick="showComponentDetails('k8s')">
          <rect x="530" y="100" width="150" height="100" rx="8" />
          <circle cx="605" cy="138" r="16" stroke="#3b82f6" stroke-width="2" fill="none" />
          <path d="M 605 122 V 154 M 589 138 H 621 M 595 126 L 615 150 M 615 126 L 595 150" stroke="#3b82f6" stroke-width="1.5" />
          <text x="605" y="168" text-anchor="middle">k3s Master</text>
          <text x="605" y="180" text-anchor="middle" class="sub-label">Deploy · Health · Config</text>
          <text x="605" y="192" text-anchor="middle" class="sub-label">NÃO balanceia vídeo</text>
        </g>

        <!-- Node: ArgoCD GitOps -->
        <g class="svg-node" id="node-k8s" onclick="showComponentDetails('k8s')">
          <rect x="380" y="290" width="120" height="100" rx="8" />
          <path d="M 410 335 H 460 M 410 335 L 422 325 M 460 335 L 448 345" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="440" y="360" text-anchor="middle">ArgoCD</text>
          <text x="440" y="372" text-anchor="middle" class="sub-label">GitOps — 1 commit</text>
          <text x="440" y="384" text-anchor="middle" class="sub-label">atualiza 14 nós</text>
        </g>

        <!-- Node: Observabilidade -->
        <g class="svg-node" id="node-observability" onclick="showComponentDetails('observability')">
          <rect x="530" y="290" width="150" height="100" rx="8" />
          <path d="M 560 340 V 320 H 665 M 560 340 H 665 M 580 335 H 595 M 605 325 H 620" stroke="#3b82f6" stroke-width="2" fill="none" />
          <text x="605" y="360" text-anchor="middle">Grafana + Prometheus</text>
          <text x="605" y="372" text-anchor="middle" class="sub-label">GPU · Skip Rate · Drift</text>
          <text x="605" y="384" text-anchor="middle" class="sub-label">Alertas 14 nós Tipo B1</text>
        </g>

      </svg>
    `;
  } else {
    svgContent = `
      <svg class="svg-diagram" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6" opacity="0.7"/>
          </marker>
        </defs>

        <!-- Boundary: 14 Filiais -->
        <rect x="10" y="15" width="140" height="450" rx="12" class="svg-boundary" />
        <text x="22" y="40" class="svg-boundary-label" style="fill:rgba(139,92,246,0.6);">14 Nós Edge</text>

        <!-- Boundary: Nuvem Corporativa -->
        <rect x="165" y="15" width="385" height="450" rx="12" class="svg-boundary" />
        <text x="180" y="40" class="svg-boundary-label" style="fill:rgba(139,92,246,0.6);">Nuvem Corporativa (GCP / AWS / Azure)</text>

        <!-- Boundary: Clientes -->
        <rect x="563" y="15" width="147" height="450" rx="12" class="svg-boundary" />
        <text x="572" y="40" class="svg-boundary-label" style="fill:rgba(139,92,246,0.6);">Responsáveis</text>

        <!-- Connections -->
        <path d="M 150 155 L 175 155" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>
        <path d="M 280 155 L 360 155" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>
        <path d="M 470 155 L 575 155" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>
        <path d="M 420 200 L 420 290" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>
        <path d="M 280 340 L 220 340" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>
        <path d="M 470 340 L 575 340" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>
        <path d="M 150 340 L 175 340" class="svg-link active" style="stroke:#8b5cf6;" marker-end="url(#arrow-purple)"/>

        <!-- Node: 14x Edge -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="22" y="105" width="120" height="110" rx="8" />
          <path d="M 52 133 H 112 V 153 H 52 Z M 65 153 V 158 M 80 153 V 158 M 95 153 V 158" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="82" y="172" text-anchor="middle">14x Nós Tipo B1</text>
          <text x="82" y="184" text-anchor="middle" class="sub-label">RTX 5060 Ti · 16GB</text>
          <text x="82" y="196" text-anchor="middle" class="sub-label">440 cams · Fila & Lote</text>
        </g>

        <!-- Node: Kafka -->
        <g class="svg-node" id="node-kafka" onclick="showComponentDetails('kafka')">
          <rect x="175" y="105" width="110" height="100" rx="8" />
          <circle cx="205" cy="140" r="6" fill="#8b5cf6" />
          <circle cx="230" cy="140" r="6" fill="#8b5cf6" />
          <circle cx="255" cy="140" r="6" fill="#8b5cf6" />
          <path d="M 211 140 H 249" stroke="#8b5cf6" stroke-width="2" />
          <text x="230" y="168" text-anchor="middle">Kafka Broker</text>
          <text x="230" y="180" text-anchor="middle" class="sub-label">Ingestão Paralela</text>
          <text x="230" y="192" text-anchor="middle" class="sub-label">14 tópicos por filial</text>
        </g>

        <!-- Node: Cloud Engine -->
        <g class="svg-node" id="node-cloud_backend" onclick="showComponentDetails('cloud_backend')">
          <rect x="360" y="105" width="120" height="100" rx="8" />
          <path d="M 395 135 C 390 135 383 140 383 147 C 383 154 395 160 420 160 C 445 160 447 147 435 135 Z" stroke="#8b5cf6" stroke-width="1.5" fill="none" />
          <text x="420" y="172" text-anchor="middle">Cloud Engine</text>
          <text x="420" y="184" text-anchor="middle" class="sub-label">FastAPI · PostgreSQL</text>
          <text x="420" y="196" text-anchor="middle" class="sub-label">S3 · Expurgo 30d LGPD</text>
        </g>

        <!-- Node: Observabilidade -->
        <g class="svg-node" id="node-observability" onclick="showComponentDetails('observability')">
          <rect x="175" y="290" width="110" height="110" rx="8" />
          <path d="M 200 345 V 320 H 265 M 200 345 H 265 M 215 340 H 228 M 238 328 H 252" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="230" y="365" text-anchor="middle">Grafana & Prometheus</text>
          <text x="230" y="377" text-anchor="middle" class="sub-label">GPU · Skip Rate</text>
          <text x="230" y="389" text-anchor="middle" class="sub-label">DuckDB Analytics</text>
        </g>

        <!-- Node: Dashboard Executivo -->
        <g class="svg-node" id="node-dash_exec" onclick="showComponentDetails('dash_exec')">
          <rect x="360" y="290" width="120" height="110" rx="8" />
          <path d="M 390 318 H 450 V 342 H 390 Z M 405 342 L 399 353 H 441 L 435 342" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="420" y="367" text-anchor="middle">Dash Executivo</text>
          <text x="420" y="379" text-anchor="middle" class="sub-label">WebSockets Live</text>
          <text x="420" y="391" text-anchor="middle" class="sub-label">Mapa de calor 14 filiais</text>
        </g>

        <!-- Node: App Flutter -->
        <g class="svg-node" id="node-app_flutter" onclick="showComponentDetails('app_flutter')">
          <rect x="578" y="100" width="118" height="110" rx="8" />
          <rect x="613" y="115" width="48" height="82" rx="8" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <circle cx="637" cy="188" r="4" fill="#8b5cf6" />
          <text x="637" y="175" text-anchor="middle" style="font-size:10px;">Flutter App</text>
          <text x="637" y="226" text-anchor="middle" class="sub-label">Android / iOS</text>
          <text x="637" y="238" text-anchor="middle" class="sub-label">Push Rico FCM/APNS</text>
        </g>

        <!-- Node: Suporte e TI -->
        <g class="svg-node" id="node-observability" onclick="showComponentDetails('observability')">
          <rect x="578" y="290" width="118" height="110" rx="8" />
          <circle cx="637" cy="328" r="14" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <path d="M 623 328 V 340 H 651 V 328" stroke="#8b5cf6" stroke-width="2" fill="none" />
          <text x="637" y="364" text-anchor="middle">Equipe Suporte</text>
          <text x="637" y="376" text-anchor="middle" class="sub-label">Teams / Slack</text>
          <text x="637" y="388" text-anchor="middle" class="sub-label">Alertas de Drift de IA</text>
        </g>

        <!-- Node: 14x Edge (Fase 3 - repetition on left side) -->
        <g class="svg-node" id="node-edge" onclick="showComponentDetails('edge')">
          <rect x="22" y="290" width="120" height="110" rx="8" />
          <path d="M 45 338 H 120 M 52 338 L 40 325 V 350 Z" stroke="#8b5cf6" stroke-width="2" fill="none"/>
          <text x="82" y="365" text-anchor="middle">Node-RED</text>
          <text x="82" y="377" text-anchor="middle" class="sub-label">Fila SQLite · TLS</text>
          <text x="82" y="389" text-anchor="middle" class="sub-label">Retry · Zero Ingress</text>
        </g>

      </svg>
    `;
  }

  diagramContainer.innerHTML = svgContent;
}

// Renderiza a lista de Sprints
function renderSprints(phase) {
  const sprints = sprintData[phase];
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
        <span class="sprint-front">Frente: <span class="front-badge">${sprint.front}</span></span>
        <span class="sprint-hours">${sprint.hours}</span>
      </div>

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

    card.addEventListener("click", (e) => {
      if (e.target.closest(".sprint-details-container")) return;
      const isAlreadyActive = card.classList.contains("active");
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
