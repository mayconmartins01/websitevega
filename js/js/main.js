// Array com os dados dos slides (imagens e textos superiores)
const slides = [
    {
        id: "sld-rst",
        image: "./img/bg-s-hero-rst.webp",
        text: "Proteção avançada para veículo individual, frota, maquinário, Telecom, itens de alto valor e mais."
    },
    {
        id: "sld-tlm",
        image: "./img/bg-s-hero-tlm.webp",
        text: "Tecnologia de ponta, IA que identifica, alerta e registra comportamentos de risco no trânsito."
    },
    {
        id: "sld-dts",
        image: "./img/bg-s-hero-dts.webp",
        text: "Dados estratégicos essenciais para otimizar operações, reduzir custos e aumentar a segurança."
    },
    {
        id: "sld-alt",
        image: "./img/bg-s-hero-alt.webp",
        text: "Registro de alertas e notificações sonoras para motoristas quando necessário."
    }
];

// Elementos do DOM (para o slider)
const bgImage = document.getElementById("bg-sh-hero");
const textElement = document.querySelector(".text-sh-home-protection");
const sliders = document.querySelectorAll(".slider");

// Índice do slide atual
let currentSlideIndex = 0;

// Função para pré-carregar a imagem e trocar diretamente
function preloadAndSwapImage(newImageSrc) {
    return new Promise((resolve) => {
        const tempImage = new Image();
        tempImage.src = newImageSrc;

        // Troca a imagem diretamente após o carregamento
        tempImage.onload = () => {
            bgImage.src = newImageSrc; // Troca direta sem transição
            resolve();
        };

        // Fallback: se a imagem não carregar em 0.5s, força a troca
        setTimeout(() => {
            if (bgImage.src !== newImageSrc) {
                tempImage.onload();
            }
        }, 500);
    });
}

// Função para inicializar o slider
function initializeSlider() {
    // Define o estado inicial: primeiro slide ativo, outros com opacidade reduzida
    sliders.forEach((slider, index) => {
        const title = slider.querySelector(".title");
        const description = slider.querySelector(".description");

        if (index === 0) {
            slider.style.opacity = "1";
            title.style.opacity = "1"; // Garante que o título fique branco
            description.style.opacity = "1"; // Garante que a descrição fique branca
            slider.classList.add("active-progress"); // Inicia a barra de progresso
            textElement.style.opacity = "1"; // Texto principal com opacidade total (branco)
        } else {
            slider.style.opacity = "0.5";
            title.style.opacity = "0.5"; // Reduz a opacidade do título
            description.style.opacity = "0.5"; // Reduz a opacidade da descrição
            slider.classList.remove("active-progress");
        }
    });

    // Define a imagem e o texto iniciais
    bgImage.src = slides[0].image;
    textElement.textContent = slides[0].text;

    // Inicia a animação do primeiro slide
    animateSlider();
}

// Função para animar a barra de progresso e trocar os slides
function animateSlider() {
    const currentSlider = sliders[currentSlideIndex];
    const currentTitle = currentSlider.querySelector(".title");
    const currentDescription = currentSlider.querySelector(".description");

    // Reseta a barra de progresso do slide atual
    currentSlider.classList.remove("active-progress");
    setTimeout(() => {
        currentSlider.classList.add("active-progress"); // Inicia a animação da barra
    }, 10);

    // Escuta o evento transitionend para detectar o fim da animação da barra
    const onTransitionEnd = (event) => {
        if (event.propertyName !== "width") return;

        // Remove o listener para evitar múltiplas chamadas
        currentSlider.removeEventListener("transitionend", onTransitionEnd);

        // Reduz a opacidade do slide atual, do título, da descrição e do texto principal
        currentSlider.style.opacity = "0.5";
        currentTitle.style.opacity = "0.5";
        currentDescription.style.opacity = "0.5";
        currentSlider.classList.remove("active-progress"); // Reseta a barra (width: 0)
        textElement.style.opacity = "0.5"; // Reduz a opacidade do texto principal antes da transição

        // Avança para o próximo slide (cíclico)
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        // Ativa o próximo slide
        const nextSlider = sliders[currentSlideIndex];
        const nextTitle = nextSlider.querySelector(".title");
        const nextDescription = nextSlider.querySelector(".description");

        nextSlider.style.opacity = "1";
        nextTitle.style.opacity = "1"; // Garante que o título fique branco
        nextDescription.style.opacity = "1"; // Garante que a descrição fique branca

        // Pré-carrega e troca a imagem diretamente
        preloadAndSwapImage(slides[currentSlideIndex].image).then(() => {
            // Atualiza o texto principal e define opacidade total
            textElement.textContent = slides[currentSlideIndex].text;
            textElement.style.opacity = "1"; // Garante que o texto principal fique branco

            // Inicia a animação do próximo slide somente após a opacidade ser definida
            animateSlider();
        });
    };

    // Adiciona o listener para transitionend
    currentSlider.addEventListener("transitionend", onTransitionEnd);
}

// Inicializa o slider quando a página carrega
document.addEventListener("DOMContentLoaded", initializeSlider);




///////////////////////////////

(function () {
    // Array com os dados de cada categoria (imagens e textos da seção de soluções)
    const solutionsData = [
        {
            id: "slt-tcm",
            divId: "div-slt-tcm",
            image: "./img/img-tab-telecom.webp",
            title: "TELECOM",
            headerText: "Prevenção avançada contra roubos e furtos para equipamentos de telecomunicações",
            contentTitle: "Garantia a segurança de seus equipamentos de alto valor de forma eficiente.",
            contentDesc: "Nossa solução exclusiva Vega foi desenvolvida especialmente para proteger ativos como máquinas de fusão de fibra óptica, OTDRs, baterias estacionárias, entre outros. <br /><br />Com uma tecnologia de rastreamento discreta e invisível, oferecemos monitoramento 24 horas e visibilidade precisa de seus ativos, integrando redundância de sistemas de geolocalização, garantindo proteção total e gestão otimizada para suas operações em campo.",
            highlight1: "Instalação discreta e invisível, garantindo máxima segurança contra furtos e sabotagens.",
            highlight2: "Sistemas de geolocalização com múltiplas redundâncias: GPS, GPRS, LBS, RF e LoRa.",
            highlight3: "Equipe de Pronta Resposta própria, com altos índices de recuperação em caso de roubo ou furto."
        },
        {
            id: "slt-agr",
            divId: "div-slt-agr",
            image: "./img/img-tab-agricola.webp",
            title: "AGRÍCOLA",
            headerText: "Tecnologia para proteger sua produção agrícola",
            contentTitle: "Sabemos que no agronegócio, cada minuto importa. Monitore em tempo real o desempenho de suas máquinas, tratores e demais implementos, com nossa solução avançada de rastreamento e telemetria.",
            contentDesc: "Garanta visibilidade total no campo, otimizando produtividade e proteção dos seus ativos.",
            highlight1: "Gestão em tempo ociso para maior eficiência operacional.",
            highlight2: "Controle de manutenções preventivas, reduzindo paradas inesperadas.",
            highlight3: "Tecnologia de monitoramento contra furtos e uso indevido."
        },
        {
            id: "slt-corp",
            divId: "div-slt-corp",
            image: "./img/img-tab-corporativas.webp",
            title: "CORPORATIVAS",
            headerText: "Dados assertivos para decisões estratégicas.",
            contentTitle: "Transformamos a gestão de ativos em uma vantagem competitiva para sua empresa.",
            contentDesc: "Monitore em tempo real cada veículo, controle rotas e condutas, gerencie dados de forma eficiente, com dados reais, extraindo o melhor da rede CAN do veículo.",
            highlight1: "Alertas personalizados de acordo com a necessidade de sua empresa.",
            highlight2: "Videomonitoramento (Vega View) para mais segurança e visibilidade.",
            highlight3: "Relatórios detalhados para gestões de frota e direção."
        },
        {
            id: "slt-sp",
            divId: "div-slt-sp",
            image: "./img/img-tab-projetos.webp",
            title: "PROJETOS ESPECIAIS",
            headerText: "Soluções sob medida para os mais diversos setores",
            contentTitle: "Desenvolvemos soluções exclusivas, adaptadas às necessidades de cada cliente, para atender às mais complexas demandas de segurança e rastreamento.",
            contentDesc: "Ideal para empresas que buscam soluções de alta tecnologia para prevenir o furto, roubo e garantir proteção sob medida.",
            highlight1: "Projeto 100% customizado para a sua empresa.",
            highlight2: "Soluções adaptadas, com a necessidade do cliente.",
            highlight3: "Ideal para equipamentos de alto valor ou com o risco de furto."
        },
        {
            id: "slt-crg",
            divId: "div-slt-crg",
            image: "./img/img-tab-cargas.webp",
            title: "CARGAS",
            headerText: "Monitoramento inteligente que garante a segurança total de suas cargas",
            contentTitle: "Soluções avançadas para proteger e monitorar suas cargas e ativos, operando 24 horas para atingir a máxima eficiência e segurança no transporte.",
            contentDesc: "Nossa tecnologia combina acompanhamento em tempo real e alertas instantâneos.",
            highlight1: "Central dedicada 24 horas por dia.",
            highlight2: "Alertas de movimentação não autorizada ou situações de risco.",
            highlight3: "Sistemas de localização para proteção estratégica."
        },
        {
            id: "slt-yl",
            divId: "div-slt-yl",
            image: "./img/img-tab-linha-amarela.webp",
            title: "LINHA AMARELA",
            headerText: "Gestão avançada para máquinas pesadas e equipamentos de construção",
            contentTitle: "Na operação de equipamentos de linha amarela, eficiência, controle e segurança são fundamentais.",
            contentDesc: "Nossa solução de rastreamento e monitoramento em tempo real, desenvolvida para a Construção Civil, oferece visibilidade total de ativos, máquinas e equipamentos, transformando dados em decisões estratégicas para reduzir custos e otimizar o uso.",
            highlight1: "Prevenção eficaz contra roubos e furtos.",
            highlight2: "Controle completo durante as operações.",
            highlight3: "Gestão eficiente para prevenir manutenções e corretivas."
        },
        {
            id: "slt-vv",
            divId: "div-slt-vv",
            image: "./img/img-tab-vegaview.webp",
            title: "VEGA VIEW",
            headerText: "Monitore, proteja e conquiste mais resultados com o poder da videotelemetria avançada",
            contentTitle: "O Vega View é a solução de videotelemetria que vai além do simples monitoramento.",
            contentDesc: "Equipado com tecnologia de ponta, incluindo inteligência artificial, ele identifica, alerta e registra comportamentos de risco no trânsito, trazendo segurança e eficiência para sua frota.",
            highlight1: "Monitoramento simultâneo em múltiplos pontos.",
            highlight2: "Identificação de distrações, fadiga e comportamentos arriscados.",
            highlight3: "Plataforma de auxilio à tomada de decisão."
        },
        {
            id: "slt-ind",
            divId: "div-slt-ind",
            image: "./img/img-tab-pessoa-fisica.webp",
            title: "PESSOA FÍSICA",
            headerText: "Gostou das soluções Vega e é pessoa física? Conheça a Mundi, uma empresa do grupo Vega especializada em rastreamento veicular.",
            contentTitle: "Soluções para carros, motos e caminhões.",
            contentDesc: "Controle seu veículo por aplicativo ou website, com alertas personalizados de velocidade, permitindo o uso em tempo real. Acesse o histórico completo das rotas percorridas.",
            highlight1: "Soluções para carros, motos e caminhões.",
            highlight2: "Controle seu veículo por aplicativo ou website.",
            highlight3: "Acesse o histórico completo das rotas percorridas."
        }
    ];

    // Elementos do DOM (para a seção de soluções)
    const solutionsBgImage = document.getElementById("bg-solutions");
    const solutionsTitleElement = document.querySelector(".slt-title");
    const solutionsHeaderTextElement = document.getElementById("slt-header-text");
    const solutionsContentTitleElement = document.getElementById("slt-content-title");
    const solutionsContentDescElement = document.getElementById("slt-content-desc");
    const solutionsHighlight1Element = document.getElementById("slt-highlight-1");
    const solutionsHighlight2Element = document.getElementById("slt-highlight-2");
    const solutionsHighlight3Element = document.getElementById("slt-highlight-3");
    const solutionsSelectorPoint = document.getElementById("seletor-point");
    const solutionsNavLinks = document.querySelectorAll(".solutions__nav a");

    // Função para atualizar o conteúdo com base na categoria selecionada
    function updateSolutionsContent(categoryId) {
        // Encontra os dados da categoria selecionada
        const selectedData = solutionsData.find(data => data.id === categoryId);
        if (!selectedData) return;

        // Atualiza a imagem
        solutionsBgImage.src = selectedData.image;

        // Atualiza os textos
        solutionsTitleElement.textContent = selectedData.title;
        solutionsHeaderTextElement.textContent = selectedData.headerText;
        solutionsContentTitleElement.innerHTML = selectedData.contentTitle;
        solutionsContentDescElement.innerHTML = selectedData.contentDesc;
        // Atualiza apenas o texto dos tópicos, sem mexer nos #point-form
        solutionsHighlight1Element.childNodes[solutionsHighlight1Element.childNodes.length - 1].textContent = selectedData.highlight1;
        solutionsHighlight2Element.childNodes[solutionsHighlight2Element.childNodes.length - 1].textContent = selectedData.highlight2;
        solutionsHighlight3Element.childNodes[solutionsHighlight3Element.childNodes.length - 1].textContent = selectedData.highlight3;

        // Remove a estilização de ativo de todos os links
        solutionsNavLinks.forEach(link => {
            link.style.color = "#818B99"; // Cor padrão (cinza)
        });

        // Adiciona a estilização de ativo ao link clicado
        const activeLink = document.getElementById(categoryId);
        activeLink.style.color = "#2E9C1D"; // Cor ativa (verde)

        // Move o seletor-point para a div correspondente
        const targetDiv = document.getElementById(selectedData.divId);
        if (targetDiv && solutionsSelectorPoint) {
            targetDiv.appendChild(solutionsSelectorPoint); // Move o elemento original
        }
    }

    // Adiciona eventos de clique a todos os links
    solutionsNavLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Impede o comportamento padrão do link
            const categoryId = link.id;
            updateSolutionsContent(categoryId);
        });
    });

    // Inicializa com a categoria "Telecom" ao carregar a página
    document.addEventListener("DOMContentLoaded", () => {
        updateSolutionsContent("slt-tcm");
    });
})();