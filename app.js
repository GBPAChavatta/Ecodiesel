/**
 * Lógica do Simulador de Arquitetura — Ecodiesel (Versão de Expansão)
 * Autor: GBPA (Techlead Lucas Chavatta)
 * Ano: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // Estado Global da Simulação
    const state = {
        isOnline: true,
        buildings: [
            { id: 'predio-a', name: 'Prédio Único', subtitle: 'Planta Principal', cams: 32, queue: 0 }
        ],
        activeBuildingId: 'predio-a',
        bandwidthUsed: 0.05, // em KB/s por câmera ativa
        dataSentToday: 0.02, // em GB
        selectedNodeId: null,
        simulatingEvent: false,
        selectedHardwareProfile: 'amd', // 'amd' fixed
        nodeQuantity: 1
    };

    // Nomes de prédios realistas para a expansão do projeto
    const availableNewBuildings = [
        { name: 'Prédio D', subtitle: 'Portaria Principal', cams: 2 },
        { name: 'Prédio E', subtitle: 'Oficinas & Garagem', cams: 3 },
        { name: 'Prédio F', subtitle: 'Balança Rodoviária', cams: 2 },
        { name: 'Prédio G', subtitle: 'Administrativo', cams: 6 },
        { name: 'Prédio H', subtitle: 'Depósito de Insumos', cams: 4 },
        { name: 'Prédio I', subtitle: 'Estacionamento Frota', cams: 5 }
    ];

    // Componentes e Elementos DOM
    const toggleNetworkBtn = document.getElementById('toggle-network-btn');
    const triggerEventBtn = document.getElementById('trigger-event-btn');
    const addBuildingBtn = document.getElementById('add-building-btn');
    const addCameraBtn = document.getElementById('add-camera-btn');

    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const linkStatus = document.getElementById('link-status');
    const buildingsTabsContainer = document.getElementById('buildings-tabs-container');

    // Elementos do Prédio Ativo
    const activeBuildingName = document.getElementById('active-building-name');
    const activeBuildingSubtitle = document.getElementById('active-building-subtitle');
    const activeBuildingCams = document.getElementById('active-building-cams');
    const activeQueueCounter = document.getElementById('active-queue-counter');
    const queueStatusLabel = document.querySelector('#node-queue .queue-status');
    const queueNodeCard = document.getElementById('node-queue');

    const alertsFeed = document.getElementById('alerts-feed');
    const logConsole = document.getElementById('log-console');
    const sidebar = document.getElementById('details-sidebar');
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarSubtitle = document.getElementById('sidebar-subtitle');
    const sidebarContentBody = document.getElementById('sidebar-content-body');
    const svgLayer = document.getElementById('connection-svg');

    // Elementos de Métricas (Sem custos financeiros)
    const elNetworkEgress = document.getElementById('network-egress');
    const elSavedBandwidth = document.getElementById('saved-bandwidth');
    const elTotalCameras = document.getElementById('total-cameras-metric');
    const elTotalBuildings = document.getElementById('total-buildings-metric');
    const elExpansionProgressBar = document.getElementById('expansion-progress-bar');

    // Dicionário de Detalhes dos Componentes
    const nodeDetails = {
        'cameras-a': {
            title: 'Câmeras IP e NVR Local',
            subtitle: 'Ingestão Física e CFTV',
            icon: '📹',
            layer: 'Edge (Planta)',
            phase: 'Piloto (Fase 1: 32 câmeras) → Escala: 400 câmeras',
            spec: `<strong>Protocolo:</strong> RTSP (Real-Time Streaming Protocol)<br>
                   <strong>Resolução:</strong> Full HD (1080p), 15 FPS (suficiente para IA)<br>
                   <strong>Backbone Local:</strong> Cabos blindados Cat6, VLAN física de segurança<br>
                   <strong>Largura de Banda:</strong> ~3.5 Mbps por câmera (trafegando apenas localmente no Switch PoE)`,
            desc: 'Representa as câmeras IP físicas instaladas nos prédios da Ecodiesel. O sinal é consolidado no NVR local. Diferente de soluções puras em nuvem, o tráfego pesado de vídeo bruto Full HD morre no switch local da planta, não consumindo banda de internet.',
            rationale: 'Lucas do Rio Verde possui link de internet instável. Trafegar 400 câmeras Full HD para a nuvem exigiria um link dedicado de alta velocidade (custo absurdo) e geraria custos insustentáveis de transferência na nuvem (egress fees).'
        },
        'frigate-a': {
            title: 'Frigate NVR',
            subtitle: 'Ingestão e Processamento Primário de Frames',
            icon: '📦',
            layer: 'Edge (Planta)',
            phase: 'Piloto (Fase 1: Configuração em container Docker)',
            spec: `<strong>Tecnologia:</strong> Open Source NVR com detecção local de movimento<br>
                   <strong>Estratégia:</strong> Processa o stream RTSP, detecta mudanças de pixel e recorta apenas frames de interesse para enviar ao modelo YOLOv8.<br>
                   <strong>Hardware:</strong> CPU local Intel/AMD multicore + otimizações de memória compartilhada.`,
            desc: 'O Frigate atua como a primeira linha de triagem. Ele reduz o uso de GPU ao analisar apenas regiões da imagem onde houve mudança de pixels. Se a câmera estiver estática (sem movimento no pátio à noite), a GPU de inferência permanece em repouso.',
            rationale: 'Evita a sobrecarga da placa gráfica NVIDIA. Em vez de enviar 15 frames por segundo de forma ininterrupta, o Frigate só alimenta o YOLOv8 quando há atividade de relevância física na cena.'
        },
        'yolo-a': {
            title: 'YOLOv8 + TensorRT',
            subtitle: 'Modelo de Visão Computacional de Alto Desempenho',
            icon: '🧠',
            layer: 'Edge (Planta) — Inferência',
            phase: 'Piloto (Fase 1: Modelo pré-treinado com calibração de ambiente local)',
            spec: `<strong>Modelo:</strong> YOLOv8 (You Only Look Once v8) da Ultralytics<br>
                   <strong>Aceleração:</strong> NVIDIA TensorRT (compilação do modelo para FP16/INT8)<br>
                   <strong>Throughput:</strong> GPU RTX 5070 Ti<br>
                   <strong>Tracking:</strong> algoritmo ByteTrack integrado para rastrear o mesmo objeto entre quadros.`,
            desc: 'Aqui reside a inteligência da solução. O YOLOv8 processa o frame recortado pelo Frigate e faz a classificação: "Pessoa", "Veículo", "Animal", "Gato", "Sombra de árvore". O ByteTrack garante que, se uma pessoa passar atrás de um pilar e reaparecer, o sistema entenda que é o mesmo indivíduo.',
            rationale: 'O processamento em edge com TensorRT permite processar até 20 câmeras por placa gráfica de baixo custo com baixíssima latência (near-real-time) sem alugar servidores GPU caros em nuvem.'
        },
        'fastapi-a': {
            title: 'Motor Analítico (FastAPI)',
            subtitle: 'Motor de Regras de Negócio e Filtros de Falso Positivo',
            icon: '⚙️',
            layer: 'Edge (Planta) — Lógica',
            phase: 'Piloto (Fase 1: API em Python integrada no fluxo)',
            spec: `<strong>Tecnologia:</strong> Python 3.11 + FastAPI (assíncrono)<br>
                   <strong>Filtros aplicados:</strong><br>
                   1. Tempo mínimo de permanência (evita disparos falsos de insetos rápidos)<br>
                   2. Máscara de polígono (ignora movimentos em rodovias ou árvores vizinhas)<br>
                   3. Nível de confiança da detecção (> 75% para emissão de alertas).`,
            desc: 'Responsável pela triagem de inteligência corporativa. Ele recebe os dados brutos de detecção (ex: "Pessoa na coordenada X,Y com 85% de certeza por 0.5s") e avalia as regras da planta: "Esta área é restrita? O horário é de risco? O objeto ficou lá por mais de 2 segundos?". Se as regras forem substituídas, gera-se um Alerta Real.',
            rationale: 'Separar o motor de regras da inferência permite alterar as políticas de segurança da planta (ex: mudar o horário de restrição de uma área) instantaneamente sem precisar reinstalar ou re-treinar o modelo de visão computacional.'
        },
        'queue-a': {
            title: 'Fila SQLite Local',
            subtitle: 'Resiliência a Quedas e Entrega Garantida',
            icon: '🗄️',
            layer: 'Edge (Planta) — Armazenamento',
            phase: 'Piloto: Fila em arquivo SQLite persistente | Escala: RabbitMQ / Kafka Local',
            spec: `<strong>Persistência:</strong> Gravação síncrona em disco (Write-Ahead Logging)<br>
                   <strong>Capacidade:</strong> Até 50.000 eventos retidos offline localmente<br>
                   <strong>Mecanismo de Retentativa:</strong> Backoff exponencial automático em caso de falha de conexão WAN.`,
            desc: 'Garante que nenhum alerta gerado na planta seja perdido caso a internet de Lucas do Rio Verde sofra uma queda temporária. Os alertas ficam gravados com timestamp e metadados estruturados. Quando a internet retorna, os eventos são enviados em ordem cronológica à nuvem.',
            rationale: 'Num ambiente agro (TRR de combustíveis), a segurança não pode parar. Se a internet cair, o vigia local ainda deve ser notificado pelos sistemas que se comunicam na rede LAN local, e a nuvem precisa receber o histórico consolidado assim que o link reestabelecer.'
        },
        'nodered-a': {
            title: 'Node-RED Local',
            subtitle: 'Orquestrador de Integração e Envio',
            icon: '🔌',
            layer: 'Edge (Planta) — Integração',
            phase: 'Piloto: Integração padrão via fluxo low-code no container',
            spec: `<strong>Engine:</strong> Node.js assíncrono orientado a fluxos<br>
                   <strong>Segurança:</strong> Inicia conexões de saída TLS 1.3 criptografadas<br>
                   <strong>Protocolo de Saída:</strong> WebSocket seguro (WSS) ou HTTPS POST.`,
            desc: 'O Node-RED é a ponte de saída de dados da planta. Ele escuta a Fila local, empacota o evento estruturado (JSON com ID do nó, ID da câmera, timestamp, tipo de detecção) e inicia o envio para a nuvem. Também é responsável por extrair um clipe do vídeo curto (5s) do NVR caso o alerta seja validado.',
            rationale: 'Facilita a manutenção e integrações locais com dispositivos físicos adicionais na planta (ex: acionar uma sirene física Modbus/TCP local ou um holofote de led se uma invasão for detectada à noite).'
        },
        'security-tunnel': {
            title: 'Túnel de Saída Seguro (Zero-Trust)',
            subtitle: 'Modelo de Comunicação Unidirecional Edge-to-Cloud',
            icon: '🛡️',
            layer: 'Segurança de Rede',
            phase: 'Adotado desde o Piloto como padrão de segurança corporativo',
            spec: `<strong>Direção:</strong> Exclusivamente SAÍDA (Egress)<br>
                   <strong>Portas de Entrada:</strong> Nenhuma porta exposta para a internet (Zero Ingress)<br>
                   <strong>Criptografia:</strong> TLS 1.3 / HTTPS com autenticação de chaves (mTLS).`,
            desc: 'Uma das maiores inovações de segurança deste projeto. O servidor local de IA não tem IP público nem portas abertas no firewall (como 80, 443, 22) para acesso de fora. O Node-RED local é quem "liga" para a nuvem e estabelece o canal de comunicação.',
            rationale: 'Impede ataques cibernéticos externos de scan de portas e tentativas de brute-force contra a rede da planta. Mesmo se um atacante descobrir o IP da internet da Ecodiesel, ele não conseguirá iniciar uma conexão com o servidor de IA local.'
        },
        'kafka': {
            title: 'Broker Apache Kafka Central',
            subtitle: 'Barramento de Mensagens Centralizado em Nuvem',
            icon: '📥',
            layer: 'Nuvem — Ingestão',
            phase: 'Piloto: Broker simplificado (RabbitMQ/Mosquitto) → Escala: Apache Kafka',
            spec: `<strong>Tecnologia:</strong> Apache Kafka / Confluent Cloud<br>
                   <strong>Capacidade:</strong> Alta taxa de ingestão paralela de mensagens<br>
                   <strong>Retenção:</strong> Configurável para manter mensagens mesmo após consumo (replay de auditoria).`,
            desc: 'O Kafka atua como o receptor central na nuvem, desacoplando o processamento das plantas do backend da aplicação. Quando a planta envia um alerta, o Kafka recebe e guarda a mensagem de forma imediata e resiliente, distribuindo-a para o Backend.',
            rationale: 'Permite escalar a solução de 5 câmeras para 400 câmeras (com múltiplos prédios e nós edge) sem que o servidor backend fique sobrecarregado por picos de conexões simultâneas. Também facilita o reenvio de alertas em lote após a reconexão de uma planta.'
        },
        'cloud-backend': {
            title: 'Backend Application (Nuvem)',
            subtitle: 'Orquestração Central e API de Gestão',
            icon: '💻',
            layer: 'Nuvem — Aplicação',
            phase: 'Piloto: Serviço lightweight implantado na GCP ou AWS',
            spec: `<strong>Framework:</strong> FastAPI / Node.js em Container Docker<br>
                   <strong>Função:</strong> Consome eventos do Kafka, gerencia permissões de usuários (RBAC), dispara notificações PUSH para o app móvel, e fornece APIs para o dashboard operacional.`,
            desc: 'O cérebro na nuvem. Gerencia as contas dos usuários, decide quais alertas devem ir para o celular do Fernando e quais vão apenas para o histórico silencioso. Ele também recebe os clipes curtos de vídeo comprimidos dos alertas validados e os armazena no Object Storage.',
            rationale: 'O backend é mantido leve (low cost) porque todo o processamento de IA pesado já foi feito na planta local (edge on-premise).'
        },
        'postgresql': {
            title: 'Banco de Dados Relacional (PostgreSQL)',
            subtitle: 'Armazenamento de Metadados e Logs de Auditoria',
            icon: '🗃️',
            layer: 'Nuvem — Armazenamento',
            phase: 'Piloto: PostgreSQL em container | Escala: Instância gerenciada (RDS/Cloud SQL)',
            spec: `<strong>Tecnologia:</strong> PostgreSQL v16<br>
                   <strong>Logs imutáveis:</strong> Grava registros contendo: data, hora, câmera, classificação, probabilidade e ação tomada pelo usuário (ex: "Excluiu alerta de animal").`,
            desc: 'Armazena todas as tabelas de controle do sistema: cadastro de nós edge, mapeamento de câmeras, configurações de alertas, credenciais de usuários e, o mais importante, a trilha de auditoria para conformidade com a LGPD.',
            rationale: 'Estruturação clássica e segura para relatórios gerenciais e acompanhamento histórico de eficácia da IA (taxa de falsos positivos filtrados).'
        },
        'object-storage': {
            title: 'Object Storage (Cloud Clipes)',
            subtitle: 'Armazenamento Secure de Evidências em Nuvem',
            icon: '☁',
            layer: 'Nuvem — Storage',
            phase: 'Piloto: Bucket simples criptografado na GCP/AWS',
            spec: `<strong>Tecnologia:</strong> Amazon S3 ou Google Cloud Storage<br>
                   <strong>Segurança:</strong> Criptografia de dados em repouso AES-256<br>
                   <strong>Ciclo de vida (Lifecycle):</strong> Apagamento automático após 30 dias para cumprir normas da LGPD.`,
            desc: 'Armazena os pequenos clipes de vídeo (3 a 5 segundos) enviados pelo Node-RED local apenas quando há um alerta real validado. Os clipes servem para que o Fernando ou o vigia visualizem diretamente no celular o que causou o alerta, sem precisar puxar o vídeo pesado do gravador local.',
            rationale: 'Custos de armazenamento de arquivos curtos em Object Storage são ínfimos, viabilizando o armazenamento em nuvem apenas das evidências importantes, mantendo os gigabytes de gravações contínuas salvas localmente.'
        },
        'grafana': {
            title: 'Grafana & Observabilidade',
            subtitle: 'Monitoramento de Saúde da Frota e Acurácia de IA',
            icon: '📊',
            layer: 'Nuvem — Monitoramento',
            phase: 'Piloto: Painéis básicos de saúde dos nós e alertas | Escala: Grafana Enterprise integrado',
            spec: `<strong>Ferramenta:</strong> Grafana Dashboard integrado com PostgreSQL e Prometheus<br>
                   <strong>Métricas visualizadas:</strong> Latência de alertas, uso de GPU e memória de cada nó local, taxa de falsos positivos detectados, monitoramento de desvio de modelo (Model Drift) baseado no feedback do operador.`,
            desc: 'Permite ao Techlead Lucas Chavatta e à Ecodiesel monitorar em tempo real a integridade de todas as câmeras e nós do projeto. Se uma GPU esquentar demais ou uma câmera perder a conexão local, um alerta de manutenção é enviado para a GBPA.',
            rationale: 'Garante a visibilidade da eficácia da inteligência artificial ao longo do tempo (mostrando o ROI em tempo real para a diretoria da Ecodiesel) e ajuda a detectar falhas de hardware no interior do MT antes que virem problemas operacionais.'
        },
        'mobile-app': {
            title: 'App Móvel e Canais de Alerta',
            subtitle: 'Entrega Prática para Tomada de Decisão',
            icon: '📱',
            layer: 'Dispositivos do Usuário',
            phase: 'Piloto: App Híbrido com Auth0 + MFA + Biometria nativa | Escala: App corporativo consolidado',
            spec: `<strong>Segurança:</strong> OAuth2 + PKCE, MFA (TOTP/SMS), FaceID/TouchID nativos<br>
                   <strong>Conexão:</strong> Certificate Pinning para proteção contra ataques MitM<br>
                   <strong>Armazenamento:</strong> iOS Keychain e Android KeyStore para chaves de sessão JWT.`,
            desc: 'Aplicativo mobile híbrido em Flutter/React Native. Permite login seguro por reconhecimento facial, exibição de feed de alertas históricos e player nativo para assistir clipes em tempo real, isolado em sandbox de segurança operacional.',
            rationale: 'Traz a segurança e autenticação corporativa exigidas pela diretoria da Ecodiesel, ao mesmo tempo em que oferece login biométrico ágil de campo.'
        }
    };

    // Função de Renderização dos Prédios (Abas no Edge)
    function renderBuildings() {
        buildingsTabsContainer.innerHTML = '';

        state.buildings.forEach(building => {
            const tab = document.createElement('div');
            tab.className = `building-tab ${building.id === state.activeBuildingId ? 'active' : ''}`;
            tab.setAttribute('data-id', building.id);

            tab.innerHTML = `
                ${building.name}
                <span>${building.subtitle}</span>
                <span class="cams-count" style="margin-top: 4px; font-size: 8px;">${building.cams} Câmeras</span>
            `;

            // Badge da fila se houver itens acumulados
            if (building.queue > 0) {
                const badge = document.createElement('div');
                badge.className = 'tab-badge';
                badge.textContent = building.queue;
                tab.appendChild(badge);
            }

            tab.addEventListener('click', () => {
                switchActiveBuilding(building.id);
            });

            buildingsTabsContainer.appendChild(tab);
        });

        // Força a redensificação das conexões
        setTimeout(drawConnections, 50);
    }

    // Alternar Prédio Ativo e Atualizar Pipeline
    function switchActiveBuilding(buildingId) {
        state.activeBuildingId = buildingId;
        const building = state.buildings.find(b => b.id === buildingId);

        if (building) {
            // Atualiza cabeçalho do NVR do prédio no pipeline central
            activeBuildingName.innerHTML = `${building.name} <span class="subtext">${building.subtitle}</span>`;
            activeBuildingCams.textContent = `${building.cams} Câmeras`;

            // Atualiza fila do prédio no pipeline central
            activeQueueCounter.textContent = building.queue;
            if (building.queue > 0) {
                queueNodeCard.classList.add('has-items');
                queueStatusLabel.textContent = `Status: ${building.queue} acumulados`;
            } else {
                queueNodeCard.classList.remove('has-items');
                queueStatusLabel.textContent = 'Status: Vazia';
            }

            addLog(`Alternando visualização operacional para '${building.name} — ${building.subtitle}'.`, 'system');

            // Re-renderiza abas
            renderBuildings();
        }
    }

    // Atualiza as conexões SVG dinamicamente
    function drawConnections() {
        const noderedNode = document.getElementById('node-nodered');
        const tunnelNode = document.getElementById('node-security-tunnel');
        const kafkaNode = document.getElementById('node-kafka');

        if (!noderedNode || !tunnelNode || !kafkaNode) return;

        const rectA = noderedNode.getBoundingClientRect();
        const rectTunnel = tunnelNode.getBoundingClientRect();
        const rectCloud = kafkaNode.getBoundingClientRect();
        const svgRect = svgLayer.getBoundingClientRect();

        // Coordenadas relativas ao container do SVG
        const x1A = rectA.right - svgRect.left;
        const y1A = (rectA.top + rectA.bottom) / 2 - svgRect.top;

        const xTunnelLeft = rectTunnel.left - svgRect.left;
        const yTunnelLeft = (rectTunnel.top + rectTunnel.bottom) / 2 - svgRect.top;

        const xTunnelRight = rectTunnel.right - svgRect.left;
        const yTunnelRight = (rectTunnel.top + rectTunnel.bottom) / 2 - svgRect.top;

        const xCloudLeft = rectCloud.left - svgRect.left;
        const yCloud = (rectCloud.top + rectCloud.bottom) / 2 - svgRect.top;

        // Path do Node-RED do Prédio Ativo até o Túnel de Segurança
        const pathA = `M ${x1A} ${y1A} C ${(x1A + xTunnelLeft) / 2} ${y1A}, ${(x1A + xTunnelLeft) / 2} ${yTunnelLeft}, ${xTunnelLeft} ${yTunnelLeft}`;
        const pathPredioA = document.getElementById('path-predioA-tunnel');
        if (pathPredioA) pathPredioA.setAttribute('d', pathA);

        // Path do Túnel até o Kafka na nuvem
        const pathCloud = `M ${xTunnelRight} ${yTunnelRight} C ${(xTunnelRight + xCloudLeft) / 2} ${yTunnelRight}, ${(xTunnelRight + xCloudLeft) / 2} ${yCloud}, ${xCloudLeft} ${yCloud}`;
        const pathTunnelCloud = document.getElementById('path-tunnel-cloud');
        if (pathTunnelCloud) pathTunnelCloud.setAttribute('d', pathCloud);

        // Esconde o path B que era estático na versão antiga
        const pathPredioB = document.getElementById('path-predioB-tunnel');
        if (pathPredioB) pathPredioB.setAttribute('d', '');
    }

    // Inicialização e Resize
    window.addEventListener('resize', drawConnections);

    // Sistema de Log na tela
    function addLog(message, type = 'system') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });

        entry.textContent = `[${timeStr}] ${message}`;
        logConsole.appendChild(entry);

        // Scroll automático
        logConsole.scrollTop = logConsole.scrollHeight;
    }

    // Atualização de Métricas (Sem dados de custos)
    function updateMetricsDisplay() {
        // Total de câmeras e prédios calculados do estado
        const totalCams = state.buildings.reduce((sum, b) => sum + b.cams, 0);
        const totalBuildings = state.buildings.length;

        // Banda base: 0.05 KB/s por câmera monitorada
        state.bandwidthUsed = totalCams * 0.02;
        state.dataSentToday = totalCams * 0.007;

        elNetworkEgress.textContent = state.isOnline ? `${state.bandwidthUsed.toFixed(2)} KB/s` : '0.00 KB/s';

        const savedBar = document.querySelector('.metric-card:nth-child(2) .progress-bar');
        if (savedBar) {
            savedBar.style.width = '99.9%'; // Economia absurda sempre visível
        }

        // Dados economizados vs enviados
        const originalDataSize = totalCams * 52.8; // Câmera Full HD gera ~52.8 GB por dia de vídeo contínuo
        elSavedBandwidth.innerHTML = `${state.dataSentToday.toFixed(3)} GB/dia <span style="font-size:10px; color:var(--text-muted); display:block;">Vídeo local bruto evitado: ${originalDataSize.toFixed(1)} GB/dia</span>`;

        // Métricas de Escala
        elTotalCameras.textContent = `${totalCams} Câmeras`;
        elTotalBuildings.textContent = `${totalBuildings} Prédio${totalBuildings > 1 ? 's' : ''} Monitorado${totalBuildings > 1 ? 's' : ''}`;

        // Barra de progresso da escala do projeto (teto de 400 câmeras)
        const progressPercent = Math.min((totalCams / 400) * 100, 100);
        elExpansionProgressBar.style.width = `${Math.max(progressPercent, 2)}%`;
    }

    // Gerenciador de Seleção de Nós (Visualizador do Pipeline)
    const clickableElements = document.querySelectorAll('.element-clickable');
    clickableElements.forEach(el => {
        el.addEventListener('click', () => {
            const nodeId = el.getAttribute('data-node');

            // Remove seleção anterior
            clickableElements.forEach(item => item.classList.remove('selected'));

            // Aplica nova seleção
            el.classList.add('selected');
            state.selectedNodeId = nodeId;

            // Carrega detalhes no sidebar
            const data = nodeDetails[nodeId];
            if (data) {
                sidebarTitle.textContent = data.title;
                sidebarSubtitle.textContent = data.subtitle;

                // Determina classe da tag de camada
                let layerClass = 'pilot';
                if (data.layer.includes('Nuvem')) layerClass = 'expansion';
                if (data.layer.includes('Segurança')) layerClass = 'security';

                sidebarContentBody.innerHTML = `
                    <div class="detail-stack-info">
                        <span class="detail-stack-icon">${data.icon}</span>
                        <div class="detail-stack-title">
                            <h3>${data.title}</h3>
                            <p>${data.subtitle}</p>
                        </div>
                    </div>
                    <div class="detail-body">
                        <div>
                            <span class="detail-section-title">Camada</span>
                            <span class="badge-layer ${layerClass}">${data.layer}</span>
                        </div>
                        <div>
                            <span class="detail-section-title">Fase de Implementação</span>
                            <p style="font-weight: 600; color: var(--text-primary);">${data.phase}</p>
                        </div>
                        <div>
                            <span class="detail-section-title">Especificações Técnicas</span>
                            <p>${data.spec}</p>
                        </div>
                        <div>
                            <span class="detail-section-title">Funcionamento</span>
                            <p>${data.desc}</p>
                        </div>
                        <div>
                            <span class="detail-section-title">Motivação de Arquitetura</span>
                            <p style="font-style: italic; color: var(--text-secondary);">${data.rationale}</p>
                        </div>
                    </div>
                `;
            }
        });
    });

    // Simulação do Fluxo Físico (Animação de Pulso de Alerta)
    function animatePulseDot(pathId, colorClass, duration = 1500, callback = null) {
        const path = document.getElementById(pathId);
        if (!path || !path.getAttribute('d')) return;

        const pathLength = path.getTotalLength();

        // Cria elemento de círculo do pulso
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", colorClass === 'green' ? '#10b981' : (colorClass === 'purple' ? '#8b5cf6' : '#ef4444'));
        circle.setAttribute("filter", `url(#glow-${colorClass})`);

        svgLayer.appendChild(circle);

        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                // Calcula ponto correspondente ao progresso no Path
                const currentLength = progress * pathLength;
                const point = path.getPointAtLength(currentLength);

                circle.setAttribute("cx", point.x);
                circle.setAttribute("cy", point.y);

                requestAnimationFrame(animate);
            } else {
                // Remove ponto de animação e dispara callback se houver
                circle.remove();
                if (callback) callback();
            }
        }

        requestAnimationFrame(animate);
    }

    // Adicionar Prédio (Expansão do Projeto)
    if (addBuildingBtn) {
        addBuildingBtn.addEventListener('click', () => {
            if (availableNewBuildings.length > 0) {
                const nextBuilding = availableNewBuildings.shift();
                const newId = `predio-${String.fromCharCode(98 + state.buildings.length - 1)}`; // predio-b, predio-c, etc.

                const building = {
                    id: newId,
                    name: nextBuilding.name,
                    subtitle: nextBuilding.subtitle,
                    cams: nextBuilding.cams,
                    queue: 0
                };

                state.buildings.push(building);
                addLog(`[CONEXÃO] Novo nó de processamento Edge '${building.name} — ${building.subtitle}' conectado na VLAN.`, 'green');

                // Foca no novo prédio
                switchActiveBuilding(building.id);
                updateMetricsDisplay();
            } else {
                // Caso acabem os pré-definidos, gera dinamicamente
                const letter = String.fromCharCode(65 + state.buildings.length); // H, I, J...
                const building = {
                    id: `predio-${letter.toLowerCase()}`,
                    name: `Prédio ${letter}`,
                    subtitle: 'Área de Expansão Externa',
                    cams: 4,
                    queue: 0
                };
                state.buildings.push(building);
                addLog(`[CONEXÃO] Novo nó de expansão '${building.name}' registrado com sucesso.`, 'green');

                switchActiveBuilding(building.id);
                updateMetricsDisplay();
            }
        });
    }

    // Adicionar Câmera ao Prédio Selecionado
    addCameraBtn.addEventListener('click', () => {
        const activeBuilding = state.buildings.find(b => b.id === state.activeBuildingId);
        if (activeBuilding) {
            activeBuilding.cams += 1;
            activeBuildingCams.textContent = `${activeBuilding.cams} Câmeras`;

            addLog(`[CONFIG] Adicionada nova câmera IP no '${activeBuilding.name}'. Ingestão local expandida para ${activeBuilding.cams} câmeras.`, 'blue');

            renderBuildings();
            updateMetricsDisplay();
        }
    });

    // Toggle de Rede (Queda e Reestabelecimento de Conexão)
    toggleNetworkBtn.addEventListener('click', () => {
        state.isOnline = !state.isOnline;

        if (state.isOnline) {
            // Rede Reestabelecida
            toggleNetworkBtn.textContent = 'Derrubar Internet';
            toggleNetworkBtn.className = 'btn btn-primary';
            statusDot.className = 'status-pulse-dot online';
            statusText.textContent = 'Rede: Online (Lucas do Rio Verde)';

            linkStatus.textContent = 'LINK SEGURO ATIVO';
            linkStatus.className = 'link-status-badge online';

            document.getElementById('path-predioA-tunnel').classList.remove('inactive-flow');
            document.getElementById('path-tunnel-cloud').classList.remove('inactive-flow');

            addLog('Conectividade WAN restabelecida na planta!', 'green');

            // Verifica se algum prédio tem fila e escoa o backlog
            flushAllQueues();
        } else {
            // Queda de Rede
            toggleNetworkBtn.textContent = 'Reestabelecer Conexão';
            toggleNetworkBtn.className = 'btn danger';
            statusDot.className = 'status-pulse-dot offline';
            statusText.textContent = 'Rede: Desconectada (Offline)';

            linkStatus.textContent = 'CONEXÃO WAN CAÍDA';
            linkStatus.className = 'link-status-badge offline';

            document.getElementById('path-predioA-tunnel').classList.add('inactive-flow');
            document.getElementById('path-tunnel-cloud').classList.add('inactive-flow');

            addLog('ALERTA: Perda de conexão de internet detectada pelo Node-RED local.', 'red');
            addLog('Sistema Edge operando autonomamente em modo Offline.', 'amber');
        }

        updateMetricsDisplay();
    });

    // Lógica para descarregar a fila acumulada de todos os prédios após reconexão
    function flushAllQueues() {
        const buildingsWithQueues = state.buildings.filter(b => b.queue > 0);
        if (buildingsWithQueues.length === 0) return;

        addLog(`Iniciando sincronização e escoamento de backlog de ${buildingsWithQueues.length} nó(s) Edge...`, 'blue');

        buildingsWithQueues.forEach(building => {
            const totalToFlush = building.queue;
            let count = 0;

            const interval = setInterval(() => {
                if (building.queue > 0 && state.isOnline) {
                    // Reduz contador da fila do prédio
                    building.queue--;

                    // Se o prédio escoado for o prédio atualmente visualizado, atualiza o pipeline central
                    if (building.id === state.activeBuildingId) {
                        activeQueueCounter.textContent = building.queue;
                        if (building.queue === 0) {
                            queueNodeCard.classList.remove('has-items');
                            queueStatusLabel.textContent = 'Status: Vazia';
                        } else {
                            queueStatusLabel.textContent = `Status: ${building.queue} acumulados`;
                        }
                    }

                    // Incrementa tráfego enviado na nuvem
                    state.dataSentToday += 0.0001;
                    updateMetricsDisplay();
                    renderBuildings();

                    // Anima dot passando pelo túnel até a nuvem se for o prédio ativo
                    if (building.id === state.activeBuildingId) {
                        animatePulseDot('path-predioA-tunnel', 'green', 800, () => {
                            animatePulseDot('path-tunnel-cloud', 'purple', 800, () => {
                                deliverMockAlert(`Alerta Sincronizado: ${building.name}`, building.name);
                            });
                        });
                    } else {
                        // Se for em background, entrega o alerta diretamente no mockup
                        deliverMockAlert(`Alerta Sincronizado: ${building.name}`, building.name);
                    }

                    count++;
                    if (count >= totalToFlush) {
                        clearInterval(interval);
                        addLog(`Backlog do '${building.name}' enviado e sincronizado na nuvem.`, 'green');
                        renderBuildings();
                    }
                } else {
                    clearInterval(interval);
                }
            }, 250);
        });
    }

    // Forçar Alerta (Invasão)
    triggerEventBtn.addEventListener('click', () => {
        if (state.simulatingEvent) return;
        state.simulatingEvent = true;
        triggerEventBtn.disabled = true;

        const activeBuilding = state.buildings.find(b => b.id === state.activeBuildingId);
        if (!activeBuilding) {
            triggerEventBtn.disabled = false;
            state.simulatingEvent = false;
            return;
        }

        addLog(`📹 Câmera no '${activeBuilding.name}': Movimento suspeito detectado.`, 'system');

        // Brilho visual no nó da câmera e processamento local
        const nodesSequence = [
            'node-cameras',
            'node-frigate',
            'node-yolo',
            'node-fastapi'
        ];

        nodesSequence.forEach((nodeId, idx) => {
            setTimeout(() => {
                const node = document.getElementById(nodeId);
                if (node) {
                    node.style.borderColor = 'var(--color-edge)';
                    node.style.boxShadow = '0 0 12px var(--color-edge-glow)';

                    setTimeout(() => {
                        node.style.borderColor = '';
                        node.style.boxShadow = '';
                    }, 500);
                }
            }, idx * 220);
        });

        // Lógica de processamento analítico local
        setTimeout(() => {
            addLog(`🧠 YOLOv8 (${activeBuilding.name}): Identificado humano na cena (Grau: 94%).`, 'system');
            addLog(`⚙️ FastAPI (${activeBuilding.name}): Alerta de área restrita validado com sucesso.`, 'green');

            if (state.isOnline) {
                // Modo Online
                addLog(`🔌 Node-RED (${activeBuilding.name}): Transmitindo evento via túnel TLS seguro.`, 'blue');

                animatePulseDot('path-predioA-tunnel', 'green', 1200, () => {
                    animatePulseDot('path-tunnel-cloud', 'purple', 1000, () => {
                        deliverMockAlert('Pessoa em Área Restrita', activeBuilding.name);
                        addLog(`☁️ Kafka Nuvem: Evento do '${activeBuilding.name}' recebido com sucesso.`, 'green');

                        state.dataSentToday += 0.0001;
                        updateMetricsDisplay();

                        triggerEventBtn.disabled = false;
                        state.simulatingEvent = false;
                    });
                });
            } else {
                // Modo Offline
                addLog(`🗄️ Fila SQLite (${activeBuilding.name}): Sem sinal de internet. Persistindo alerta em disco.`, 'amber');

                // Incrementa contador local do prédio ativo
                activeBuilding.queue++;
                activeQueueCounter.textContent = activeBuilding.queue;
                queueNodeCard.classList.add('has-items');
                queueStatusLabel.textContent = `Status: ${activeBuilding.queue} acumulados`;

                renderBuildings();

                // Brilho na Fila
                const queueNode = document.getElementById('node-queue');
                if (queueNode) {
                    queueNode.style.borderColor = 'var(--color-client)';
                    queueNode.style.boxShadow = '0 0 12px var(--color-client-glow)';
                    setTimeout(() => {
                        queueNode.style.borderColor = '';
                        queueNode.style.boxShadow = '';
                    }, 500);
                }
                setTimeout(() => {
                    triggerEventBtn.disabled = false;
                    state.simulatingEvent = false;
                }, 500);
            }
        }, 1000);
    });

    // Injeta mock alerta no celular
    function deliverMockAlert(alertType, buildingName = 'Prédio A') {
        const emptyState = alertsFeed.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const alertItem = document.createElement('div');
        alertItem.className = 'mock-alert-item';

        const now = new Date();
        const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        alertItem.innerHTML = `
            <div class="alert-tag danger">⚠️ ALERTA REAL</div>
            <div class="alert-camera">${buildingName} — IA</div>
            <div class="alert-desc">${alertType}</div>
            <div class="alert-time">${timeStr}</div>
        `;

        alertsFeed.insertBefore(alertItem, alertsFeed.firstChild);

        if (alertsFeed.children.length > 4) {
            alertsFeed.removeChild(alertsFeed.lastChild);
        }
    }

    // ==========================================================================
    // LÓGICA DO CRONOGRAMA E SELEÇÃO DE VISÃO
    // ==========================================================================
    const sprintDetailsWithMobile = {
        '1': {
            title: 'Sprint 1: Discovery, Visita Técnica & Setup Edge',
            subtitle: 'Semanas 1 e 2 — Diagnóstico local em Lucas do Rio Verde / MT',
            hours: '77 Horas',
            icon: '🔍',
            colorClass: 'edge',
            deliverables: [
                'Relatório de diagnóstico físico e infra de rede local aprovado pelo cliente.',
                'Nó Edge conectado na rede local capturando streams RTSP Full HD via Frigate NVR.'
            ],
            tasks: [
                'Visita técnica presencial em Lucas do Rio Verde / MT (2 dias de campo).',
                'Mapeamento de switches, VLANs e redundância de rede de CFTV corporativa.',
                'Instalação e fixação do servidor de inferência local no rack de TI da planta.',
                'Configuração do Docker, Frigate NVR e caminhos de buffers locais.',
                'Calibração e validação de latência de decodificação de vídeo no edge.'
            ]
        },
        '2': {
            title: 'Sprint 2: Core de IA — YOLOv8, TensorRT e Tracking',
            subtitle: 'Semanas 3 e 4 — IA e Rastreamento de Movimentos local',
            hours: '77 Horas',
            icon: '🧠',
            colorClass: 'edge',
            deliverables: [
                'Modelo YOLOv8 compilado com sucesso em TensorRT (.engine) para GPU.',
                'Mecanismo de rastreamento por ID (ByteTrack) ativo e calibrado para evitar perdas.'
            ],
            tasks: [
                'Configuração de drivers CUDA/TensorRT no servidor edge do piloto.',
                'Otimização do modelo YOLOv8 da Ultralytics para precisão em FP16.',
                'Integração do tracker ByteTrack para persistência de identificador de objetos.',
                'Desenho vetorial de polígonos de máscara de áreas restritas (ROIs).',
                'Calibração contra falsos positivos por sombreamento e reflexos luminosos.'
            ]
        },
        '3': {
            title: 'Sprint 3: Motor Edge & Setup Mobile App',
            subtitle: 'Semanas 5 e 6 — Lógica Edge e Setup de Navegação do App',
            hours: '110 Horas',
            icon: '⚙️',
            colorClass: 'edge',
            deliverables: [
                'API local em FastAPI para filtragem e aplicação de regras analíticas localmente.',
                'Fila SQLite local de resiliência e setup inicial do app móvel com navegação básica.',
                'Armazenamento seguro nativo do celular configurado (Keychain/KeyStore).'
            ],
            tasks: [
                'Desenvolvimento da lógica de permanência mínima e confiança em edge.',
                'Setup do boilerplate do App Híbrido (Flutter) e roteamento de telas principais.',
                'Modelagem e implementação da fila SQLite síncrona em disco.',
                'Criação de telas visuais de feed de alertas, splash e layout de login no app.',
                'Configuração do iOS Keychain e Android KeyStore para tokens criptográficos.'
            ]
        },
        '4': {
            title: 'Sprint 4: Planta-Nuvem & Autenticação OAuth2 + MFA',
            subtitle: 'Semanas 7 e 8 — Conexão Segura e Fluxos de Identidade OAuth2',
            hours: '110 Horas',
            icon: '🔌',
            colorClass: 'security',
            deliverables: [
                'Fluxos locais de extração de clipes de eventos da planta ativos.',
                'Conexão segura edge-to-cloud com broker na nuvem configurado.',
                'Login com OAuth2 utilizando PKCE e autenticação MFA TOTP integrados no app.'
            ],
            tasks: [
                'Implementação no Node-RED local para recortar vídeos (3-5s) e disparar payloads.',
                'Configuração do túnel seguro de saída TLS 1.3 sem portas de entrada (Zero Ingress).',
                'Integração do Auth0/Keycloak SDK no aplicativo móvel com fluxo de PKCE.',
                'Configuração de servidores de MFA com suporte a códigos TOTP e verificação SMS.',
                'Provisionamento e hardening do broker RabbitMQ de mensagens na nuvem.'
            ]
        },
        '5': {
            title: 'Sprint 5: API Cloud & Biometria/FaceID',
            subtitle: 'Semanas 9 e 10 — Infra Cloud e Login por Reconhecimento Facial',
            hours: '120 Horas',
            icon: '💻',
            colorClass: 'cloud',
            deliverables: [
                'API Cloud em FastAPI integrada com BD PostgreSQL de metadados e logs.',
                'Upload de clipes no Object Storage e login biométrico (FaceID) habilitado no app.',
                'Certificate Pinning ativo no app contra ataques de interceptação de rede.'
            ],
            tasks: [
                'Desenvolvimento das APIs de ingestão, banco PostgreSQL e logs de auditoria.',
                'Configuração de lifecycle policy em nuvem (exclusão de clipes após 30 dias).',
                'Integração de biometria nativa (FaceID/TouchID/Fingerprint) no aplicativo móvel.',
                'Desenvolvimento de Certificate Pinning (SSL/TLS) embutido no código do app.',
                'Criação de bot e barramento de entrega de alertas por canais secundários.'
            ]
        },
        '6': {
            title: 'Sprint 6: E2E com App & Homologação',
            subtitle: 'Semanas 11 e 12 — Observabilidade, Ajuste Fino e Validação de Campo',
            hours: '116 Horas',
            icon: '📊',
            colorClass: 'client',
            deliverables: [
                'Dashboards do Grafana gerenciais com taxa de acurácia de IA e ROI do piloto.',
                'App mobile recebendo push notifications com mídias e homologado ponta a ponta.'
            ],
            tasks: [
                'Setup do Grafana conectando logs locais das plantas e saúde de frota.',
                'Testes E2E (câmera -> IA -> SQLite -> Cloud -> App móvel com push notification).',
                'Calibração final e mitigação de falsos positivos em campo sob chuva e poeira.',
                'Simulação de queda longa de conectividade para testar fila e reenvio de alertas.',
                'Treinamento da equipe de segurança física do cliente no uso do aplicativo móvel.'
            ]
        }
    };

    const sprintDetailsOnlyBackend = {
        '1': {
            title: 'Sprint 1: Discovery, Visita Técnica & Setup Edge',
            subtitle: 'Semanas 1 e 2 — Diagnóstico local em Lucas do Rio Verde / MT',
            hours: '77 Horas',
            icon: '🔍',
            colorClass: 'edge',
            deliverables: [
                'Relatório de diagnóstico físico e infra de rede local aprovado pelo cliente.',
                'Nó Edge conectado na rede local capturando streams RTSP Full HD via Frigate NVR.'
            ],
            tasks: [
                'Visita técnica presencial em Lucas do Rio Verde / MT (2 dias de campo).',
                'Mapeamento de switches, VLANs e redundância de rede de CFTV corporativa.',
                'Instalação e fixação do servidor de inferência local no rack de TI da planta.',
                'Configuração do Docker, Frigate NVR e caminhos de buffers locais.',
                'Calibração e validação de latência de decodificação de vídeo no edge.'
            ]
        },
        '2': {
            title: 'Sprint 2: Core de IA — YOLOv8, TensorRT e Tracking',
            subtitle: 'Semanas 3 e 4 — IA e Rastreamento de Movimentos local',
            hours: '77 Horas',
            icon: '🧠',
            colorClass: 'edge',
            deliverables: [
                'Modelo YOLOv8 compilado com sucesso em TensorRT (.engine) para GPU.',
                'Mecanismo de rastreamento por ID (ByteTrack) ativo e calibrado para evitar perdas.'
            ],
            tasks: [
                'Configuração de drivers CUDA/TensorRT no servidor edge do piloto.',
                'Otimização do modelo YOLOv8 da Ultralytics para precisão em FP16.',
                'Integração do tracker ByteTrack para persistência de identificador de objetos.',
                'Desenho vetorial de polígonos de máscara de áreas restritas (ROIs).',
                'Calibração contra falsos positivos por substituindo sombras e reflexos luminosos.'
            ]
        },
        '3': {
            title: 'Sprint 3: Motor Edge & Fila SQLite',
            subtitle: 'Semanas 5 e 6 — Lógica Edge e Resiliência Local',
            hours: '67 Horas',
            icon: '⚙️',
            colorClass: 'edge',
            deliverables: [
                'API local em FastAPI para filtragem e aplicação de regras analíticas localmente.',
                'Fila SQLite local de resiliência a quedas de WAN configurada e integrada.'
            ],
            tasks: [
                'Desenvolvimento da lógica de permanência mínima e confiança em edge.',
                'Modelagem e implementação da fila SQLite síncrona em disco.',
                'Testes locais de stress e de retenção de eventos em banco local.'
            ]
        },
        '4': {
            title: 'Sprint 4: Planta-Nuvem & Broker Cloud',
            subtitle: 'Semanas 7 e 8 — Conexão Segura e Broker de Ingestão',
            hours: '67 Horas',
            icon: '🔌',
            colorClass: 'security',
            deliverables: [
                'Fluxos locais de extração de clipes de eventos da planta ativos.',
                'Conexão segura edge-to-cloud com broker na nuvem configurado.'
            ],
            tasks: [
                'Implementação no Node-RED local para recortar vídeos (3-5s) e disparar payloads.',
                'Configuração do túnel seguro de saída TLS 1.3 sem portas de entrada (Zero Ingress).',
                'Provisionamento e hardening do broker RabbitMQ de mensagens na nuvem.'
            ]
        },
        '5': {
            title: 'Sprint 5: API Cloud & Notificações Bot',
            subtitle: 'Semanas 9 e 10 — Infra Cloud e Notificações de Alertas por Canal Secundário',
            hours: '82 Horas',
            icon: '💻',
            colorClass: 'cloud',
            deliverables: [
                'API Cloud em FastAPI integrada com BD PostgreSQL de metadados e logs.',
                'Upload de clipes no Object Storage configurado com lifecycle de retenção.',
                'Canal secundário de notificação (Telegram Bot) ativo enviando mídias.'
            ],
            tasks: [
                'Desenvolvimento das APIs de ingestão, banco PostgreSQL e logs de auditoria.',
                'Configuração de lifecycle policy em nuvem (exclusão de clipes após 30 dias).',
                'Criação de bot e barramento de entrega de alertas para canais secundários (Telegram Bot).'
            ]
        },
        '6': {
            title: 'Sprint 6: Testes Integrados E2E & Homologação',
            subtitle: 'Semanas 11 e 12 — Observabilidade, Ajuste Fino e Validação de Campo',
            hours: '82 Horas',
            icon: '📊',
            colorClass: 'client',
            deliverables: [
                'Dashboards do Grafana gerenciais com taxa de acurácia de IA e ROI do piloto.',
                'Sistema homologado em produção local entregando alertas de forma contínua nos canais integrados.'
            ],
            tasks: [
                'Setup do Grafana conectando logs locais das plantas e saúde de frota.',
                'Testes E2E (câmera -> IA -> SQLite -> Cloud -> Telegram Bot).',
                'Calibração final e mitigação de falsos positivos em campo sob chuva e poeira.',
                'Simulação de queda longa de conectividade para testar fila e reenvio de alertas.',
                'Homologação final com Fernando (Cliente) e entrega de documentação.'
            ]
        }
    };

    let sprintDetails = sprintDetailsWithMobile;

    // Dados de Preço de Hardware (Baseado em Equipamento.md)
    const hardwareComponents = {
        amd: [
            { name: 'GPU (2x)', model: '2x Palit GeForce RTX 5070 Ti 16GB GDDR7', shop: 'KaBuM! / Terabyte', unitPrice: 7000, qty: 2 },
            { name: 'CPU', model: 'AMD Ryzen 9 9900X3D (12 Cores / 24 Threads) 140mb MCache', shop: 'KaBuM!', unitPrice: 2890, qty: 1 },
            { name: 'RAM', model: 'Corsair Vengeance 64GB (2x32GB) DDR5 6000MHz', shop: 'Pichau', unitPrice: 7000, qty: 1 },
            { name: 'SSD NVMe (2x)', model: '2x Kingston KC3000 2TB PCIe 4.0 NVMe M.2', shop: 'KaBuM!', unitPrice: 2800, qty: 2 },
            { name: 'Placa-Mãe', model: 'ASUS TUF Gaming X670E-PLUS Wi-Fi', shop: 'Terabyte', unitPrice: 2400, qty: 1 },
            { name: 'Fonte (PSU)', model: 'Thermaltake Toughpower GF3 1200W Gold ATX 3.0', shop: 'KaBuM!', unitPrice: 1200, qty: 1 },
            { name: 'Cooler CPU', model: 'Noctua NH-D15 Chromax.Black', shop: 'GK Infostore', unitPrice: 720, qty: 1 },
            { name: 'Gabinete', model: 'Gabinete Rack 2U ou Tower Industrial Airflow', shop: 'Pichau', unitPrice: 750, qty: 1 },
            { name: 'Acessórios', model: 'Riser Cables PCIe 4.0 + Cabos Extras', shop: 'Pichau', unitPrice: 350, qty: 1 }
        ]
    };

    // Navegação de Visão (Simulator vs Schedule vs Hardware Costs)
    const navTabs = document.querySelectorAll('.nav-tab');
    const simulatorMain = document.getElementById('simulator-main');
    const simulatorMetrics = document.getElementById('simulator-metrics');
    const scheduleSection = document.getElementById('schedule-section');
    const hardwareCostsSection = document.getElementById('hardware-costs-section');

    // Elementos da Calculadora
    const hardwareProfileSelect = document.getElementById('hardware-profile-select');
    const nodeQtySlider = document.getElementById('node-qty-slider');
    const nodeQtyDisplay = document.getElementById('node-qty-display');
    const hardwareComponentsTbody = document.getElementById('hardware-components-tbody');

    const summaryNodes = document.getElementById('summary-nodes');
    const summaryCams = document.getElementById('summary-cams');
    const summaryCapex = document.getElementById('summary-capex');
    const summaryOriginalCapex = document.getElementById('summary-original-capex');
    const summaryAmdCapex = document.getElementById('summary-amd-capex');
    const summarySavings = document.getElementById('summary-savings');
    const viabilityText = document.getElementById('viability-text');

    function renderHardwareCalculator() {
        const profile = 'amd';
        const qty = state.nodeQuantity;

        if (nodeQtyDisplay) nodeQtyDisplay.textContent = `${qty} Nó${qty > 1 ? 's' : ''}`;

        const components = hardwareComponents[profile];
        if (!components || !hardwareComponentsTbody) return;

        hardwareComponentsTbody.innerHTML = '';
        let nodeTotal = 0;

        components.forEach(comp => {
            const itemTotal = comp.unitPrice * comp.qty;
            nodeTotal += itemTotal;
            const overallTotal = itemTotal * qty;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${comp.name}</strong></td>
                <td>${comp.model}</td>
                <td><span class="shop-ref">${comp.shop}</span></td>
                <td>R$ ${comp.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>${comp.qty * qty} <span class="unit-per-node">(${comp.qty} por nó)</span></td>
                <td class="table-overall-total">R$ ${overallTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            `;
            hardwareComponentsTbody.appendChild(tr);
        });

        const totalCapex = nodeTotal * qty;
        const originalUnit = 19050;
        const originalTotal = originalUnit * qty;
        const difference = totalCapex - originalTotal;

        if (summaryNodes) summaryNodes.textContent = `${qty} Nó${qty > 1 ? 's' : ''}`;
        if (summaryCams) summaryCams.textContent = `${qty * 32} Câmeras`;
        if (summaryCapex) summaryCapex.textContent = `R$ ${totalCapex.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        if (summaryOriginalCapex) summaryOriginalCapex.textContent = `R$ ${originalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

        if (summarySavings) {
            if (difference > 0) {
                summarySavings.textContent = `R$ ${difference.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} adicionais`;
                summarySavings.className = 'value warning';
            } else if (difference < 0) {
                summarySavings.textContent = `R$ ${Math.abs(difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} economizados`;
                summarySavings.className = 'value success';
            } else {
                summarySavings.textContent = `R$ 0,00`;
                summarySavings.className = 'value';
            }
        }

        if (viabilityText) {
            viabilityText.innerHTML = `O <strong>Nó de Servidor AMD AM5 (Alta Performance)</strong> foi dimensionado para garantir a máxima estabilidade e eficiência em Lucas do Rio Verde/MT. O orçamento real de mercado à vista (PIX) é de <strong>R$ ${totalCapex.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> na escala de ${qty} nós, representando um ajuste de <strong>R$ ${difference.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> adicionais sobre a estimativa original da proposta comercial.`;
        }
    }

    if (nodeQtySlider) {
        nodeQtySlider.addEventListener('input', (e) => {
            state.nodeQuantity = parseInt(e.target.value);
            renderHardwareCalculator();
        });
    }

    // Listener de perfil removido (hardware fixo em AMD)

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetView = tab.getAttribute('data-view');

            // Alterna active state dos tabs
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (targetView === 'simulator') {
                simulatorMain.classList.remove('hidden');
                simulatorMetrics.classList.remove('hidden');
                scheduleSection.classList.add('hidden');
                if (hardwareCostsSection) hardwareCostsSection.classList.add('hidden');
                setTimeout(drawConnections, 100);
            } else if (targetView === 'schedule') {
                simulatorMain.classList.add('hidden');
                simulatorMetrics.classList.add('hidden');
                scheduleSection.classList.remove('hidden');
                if (hardwareCostsSection) hardwareCostsSection.classList.add('hidden');
                const firstSprint = document.querySelector('.element-clickable-sprint');
                if (firstSprint) firstSprint.click();
            } else if (targetView === 'hardware-costs') {
                simulatorMain.classList.add('hidden');
                simulatorMetrics.classList.add('hidden');
                scheduleSection.classList.add('hidden');
                if (hardwareCostsSection) {
                    hardwareCostsSection.classList.remove('hidden');
                    renderHardwareCalculator();
                }
            }
        });
    });

    // Detalhar Sprints ao clicar no Gantt
    const sprintClickables = document.querySelectorAll('.element-clickable-sprint');
    const sprintSidebarContent = document.getElementById('sprint-sidebar-content');

    sprintClickables.forEach(clickable => {
        clickable.addEventListener('click', () => {
            const sprintId = clickable.getAttribute('data-sprint');

            // Remove seleção anterior
            sprintClickables.forEach(c => c.classList.remove('selected'));
            clickable.classList.add('selected');

            const data = sprintDetails[sprintId];
            if (data) {
                // Monta a lista de entregáveis em HTML
                const deliverablesList = data.deliverables.map(item => `<li>${item}</li>`).join('');
                // Monta a lista de tarefas em HTML
                const tasksList = data.tasks.map(item => `<li>${item}</li>`).join('');

                sprintSidebarContent.innerHTML = `
                    <div class="detail-stack-info">
                        <span class="detail-stack-icon">${data.icon}</span>
                        <div class="detail-stack-title">
                            <h3>${data.title}</h3>
                            <p>${data.subtitle}</p>
                        </div>
                    </div>
                    <div class="detail-body">
                        <div>
                            <span class="detail-section-title">Esforço Estimado</span>
                            <span class="badge-layer ${data.colorClass}" style="display: inline-block; font-weight: 700;">${data.hours}</span>
                        </div>
                        <div>
                            <span class="detail-section-title">Entregáveis Principais</span>
                            <ul style="padding-left: 16px; color: var(--text-secondary); margin-top: 4px; font-size: 11px; display: flex; flex-direction: column; gap: 4px;">
                                ${deliverablesList}
                            </ul>
                        </div>
                        <div>
                            <span class="detail-section-title">Tarefas Executadas</span>
                            <ul style="padding-left: 16px; color: var(--text-muted); margin-top: 4px; font-size: 11px; display: flex; flex-direction: column; gap: 4px;">
                                ${tasksList}
                            </ul>
                        </div>
                    </div>
                `;
            }
        });
    });

    // Controle do Switch do Mobile no Cronograma
    const toggleMobileFlow = document.getElementById('toggle-mobile-flow');

    function updateScheduleDisplay() {
        if (!toggleMobileFlow) return;
        const isMobileIncluded = toggleMobileFlow.checked;

        if (isMobileIncluded) {
            sprintDetails = sprintDetailsWithMobile;

            // Atualiza nomes das Sprints no Gantt
            document.getElementById('sprint-name-3').textContent = 'Regras Edge & Setup App';
            document.getElementById('sprint-name-4').textContent = 'Túnel TLS & Auth/MFA';
            document.getElementById('sprint-name-5').textContent = 'API Cloud & Biometria/FaceID';
            document.getElementById('sprint-name-6').textContent = 'E2E com App & Homologação';

            // Atualiza horas nas barras do Gantt
            document.querySelector('#sprint-bar-3 span').textContent = '110h • Edge & App';
            document.querySelector('#sprint-bar-4 span').textContent = '110h • Rede & Auth';
            document.querySelector('#sprint-bar-5 span').textContent = '120h • Cloud & Bio';
            document.querySelector('#sprint-bar-6 span').textContent = '116h • E2E & Rollout';

            // Atualiza rodapé
            document.getElementById('total-hours-metric').innerHTML = '<strong>Horas de Desenvolvimento:</strong> 610 Horas';
        } else {
            sprintDetails = sprintDetailsOnlyBackend;

            // Atualiza nomes das Sprints no Gantt
            document.getElementById('sprint-name-3').textContent = 'Regras Edge & Fila SQLite';
            document.getElementById('sprint-name-4').textContent = 'Túnel TLS & Broker Cloud';
            document.getElementById('sprint-name-5').textContent = 'API Cloud & Notificações Bot';
            document.getElementById('sprint-name-6').textContent = 'Testes Integrados E2E & Homologação';

            // Atualiza horas nas barras do Gantt
            document.querySelector('#sprint-bar-3 span').textContent = '67h • Edge & Fila';
            document.querySelector('#sprint-bar-4 span').textContent = '67h • Rede & Túnel';
            document.querySelector('#sprint-bar-5 span').textContent = '82h • Cloud & Bot';
            document.querySelector('#sprint-bar-6 span').textContent = '82h • E2E & Homologação';

            // Atualiza rodapé
            document.getElementById('total-hours-metric').innerHTML = '<strong>Horas de Desenvolvimento:</strong> 452 Horas';
        }

        // Re-renderiza a sprint selecionada na sidebar para atualizar dados
        const selectedSprint = document.querySelector('.element-clickable-sprint.selected');
        if (selectedSprint) {
            selectedSprint.click();
        }
    }

    if (toggleMobileFlow) {
        toggleMobileFlow.addEventListener('change', updateScheduleDisplay);
        // Garante sincronia inicial
        updateScheduleDisplay();
    }

    // Inicialização da interface
    renderBuildings();
    switchActiveBuilding('predio-a');

    setTimeout(() => {
        const firstNode = document.getElementById('node-cameras');
        if (firstNode) {
            firstNode.click();
        }
    }, 100);
});
