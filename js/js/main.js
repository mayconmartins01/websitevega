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
  
  // Elementos do DOM
  const bgImage = document.getElementById("bg-sh-hero");
  const textElement = document.querySelector(".wrapper-text-protection .text-base");
  const sliders = document.querySelectorAll(".slider");
  
  // Variáveis de controle
  let currentSlideIndex = 0;
  let isTransitioning = false;
  let slideTimeout = null;
  const slideDuration = 8000; // 8 segundos
  const fadeTransitionTime = 1000; // 1 segundo para transição de fade
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeSlider();
    addHoverEffects();
  });
  
  function initializeSlider() {
    sliders.forEach((slider, index) => {
      // Alterado para selecionar text-xs semibold e text-base dentro do slider
      const title = slider.querySelector(".text-xs.semibold") || slider.querySelector("#title-" + slider.id.split("-")[1]);
      const description = slider.querySelector(".text-base");
  
      if (index === 0) {
        slider.classList.add("active-progress");
        title.style.opacity = "1";
        description.style.opacity = "1";
      } else {
        slider.classList.remove("active-progress");
        title.style.opacity = "0.5";
        description.style.opacity = "0.5";
      }
  
      slider.addEventListener("click", () => {
        if (!isTransitioning && index !== currentSlideIndex) {
          goToSlide(index);
        }
      });
    });
  
    bgImage.src = slides[0].image;
    textElement.textContent = slides[0].text;
  
    addTransitionStyles();
    startSlideTimer();
  }
  
  function addHoverEffects() {
    sliders.forEach((slider, index) => {
      const title = slider.querySelector(".text-xs.semibold") || slider.querySelector("#title-" + slider.id.split("-")[1]);
      const description = slider.querySelector(".text-base");
      
      // Adiciona efeito de hover para aumentar opacidade
      slider.addEventListener("mouseenter", () => {
        if (index !== currentSlideIndex) {
          title.style.opacity = "1";
          description.style.opacity = "1";
        }
      });
      
      slider.addEventListener("mouseleave", () => {
        // Se não for o slide atual, retorna para opacidade reduzida
        if (index !== currentSlideIndex) {
          title.style.opacity = "0.5";
          description.style.opacity = "0.5";
        }
      });
    });
  }
  
  function addTransitionStyles() {
    textElement.style.transition = "opacity 0.5s ease";
    sliders.forEach(slider => {
      const title = slider.querySelector(".text-xs.semibold") || slider.querySelector("#title-" + slider.id.split("-")[1]);
      const description = slider.querySelector(".text-base");
  
      title.style.transition = "opacity 0.3s ease";
      description.style.transition = "opacity 0.3s ease";
      slider.style.cursor = "pointer";
    });
  }
  
  function startSlideTimer() {
    if (slideTimeout) clearTimeout(slideTimeout);
  
    slideTimeout = setTimeout(() => {
      const nextIndex = (currentSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, slideDuration);
  }
  
  function goToSlide(index) {
    if (isTransitioning || index === currentSlideIndex) return;
    isTransitioning = true;
  
    if (slideTimeout) clearTimeout(slideTimeout);
  
    const currentSlider = sliders[currentSlideIndex];
    currentSlider.classList.remove("active-progress");
  
    fadeOutCurrentSlide();
  
    preloadImage(slides[index].image).then(() => {
      textElement.style.opacity = "0";
      createTransitionLayer(index);
  
      currentSlideIndex = index;
  
      setTimeout(() => {
        bgImage.src = slides[index].image;
        textElement.textContent = slides[index].text;
        textElement.style.opacity = "1";
        fadeInNewSlide();
        sliders[index].classList.add("active-progress");
        isTransitioning = false;
        startSlideTimer();
      }, fadeTransitionTime);
    });
  }
  
  function createTransitionLayer(index) {
    const transitionImage = document.createElement("img");
    transitionImage.src = slides[index].image;
    transitionImage.alt = "Transition Image";
    transitionImage.style.position = "absolute";
    transitionImage.style.top = "0";
    transitionImage.style.left = "0";
    transitionImage.style.width = "100%";
    transitionImage.style.height = "100%";
    transitionImage.style.opacity = "0";
    transitionImage.style.transition = `opacity ${fadeTransitionTime}ms ease`;
    transitionImage.style.zIndex = "0";
    transitionImage.style.cursor = "pointer";
    transitionImage.style.objectFit = "cover";
  
    const wrapper = document.querySelector(".wrapper-bg-home");
    wrapper.appendChild(transitionImage);
  
    void transitionImage.offsetWidth;
    transitionImage.style.opacity = "1";
  
    setTimeout(() => {
      wrapper.removeChild(transitionImage);
    }, fadeTransitionTime + 100);
  }
  
  function fadeOutCurrentSlide() {
    const currentSlider = sliders[currentSlideIndex];
    const title = currentSlider.querySelector(".text-xs.semibold") || currentSlider.querySelector("#title-" + currentSlider.id.split("-")[1]);
    const description = currentSlider.querySelector(".text-base");
  
    title.style.opacity = "0.5";
    description.style.opacity = "0.5";
  }
  
  function fadeInNewSlide() {
    const newSlider = sliders[currentSlideIndex];
    const title = newSlider.querySelector(".text-xs.semibold") || newSlider.querySelector("#title-" + newSlider.id.split("-")[1]);
    const description = newSlider.querySelector(".text-base");
  
    title.style.opacity = "1";
    description.style.opacity = "1";
  }
  
  function preloadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }


  (function () {
    // Array com os dados de cada categoria (incluindo botão somente para slt-sp, slt-vv e slt-ind)
    const solutionsData = [
      {
        id: "slt-tcm",
        divId: "div-slt-tcm",
        image: "./img/img-tab-telecom.webp",
        title: "TELECOM",
        headerText: "Prevenção avançada contra roubos e furtos para equipamentos de telecomunicações",
        contentTitle: "",
        contentDesc:
          "Garanta a segurança de seus equipamentos de alto valor de forma eficiente. Nossa solução exclusiva Vega foi desenvolvida especificamente para proteger ativos como máquinas de fusão de fibra óptica, OTDRs, baterias estacionárias, entre outros. <br /><br />Com uma tecnologia de rastreamento discreta e inviolável, oferecemos monitoramento 24 horas e visibilidade precisa de seus ativos. Integramos redundância de sistemas de geolocalização, garantindo proteção total e gestão otimizada para suas operações em campo.",
        highlight1:
          "Instalação discreta e inviolável, garantindo máxima segurança contra furtos e sabotagens",
        highlight2:
          "Sistemas de geolocalização com múltiplas redundâncias: GPS, GPRS, LBS, RF e LoRa.",
        highlight3:
          "Equipe de Pronta Resposta própria, com altos índices de recuperação em caso de roubo ou furto.",
        highlight4: ""
      },
      {
        id: "slt-agr",
        divId: "div-slt-agr",
        image: "./img/img-tab-agricola.webp",
        title: "AGRÍCOLA",
        headerText: "Tecnologia para proteger sua produção agrícola",
        contentTitle:
          "Sabemos que no agronegócio, cada minuto importa. Monitore em tempo real o desempenho de suas máquinas, tratores e demais implementos, com nossa solução avançada de rastreamento e telemetria. Garanta visibilidade total no campo, otimização da produtividade e proteção dos seus ativos.",
        contentDesc: "",
        highlight1: "Gestão de tempo ocioso para maior eficiência operacional.",
        highlight2: "Controle de manutenções preventivas, reduzindo paradas inesperadas.",
        highlight3: "Tecnologia de monitoramento contra furtos e uso indevido.",
        highlight4: "Controle detalhado da utilização de seus implementos."
      },
      {
        id: "slt-corp",
        divId: "div-slt-corp",
        image: "./img/img-tab-corporativas.webp",
        title: "CORPORATIVAS",
        headerText: "Dados assertivos para decisões estratégicas.",
        contentTitle:
          "Transformamos a gestão de ativos em uma vantagem competitiva para sua empresa. Monitore em tempo real cada veículo, controle rotas e condutores, e gerencie manutenções preventivas de forma automatizada, com dados reais, extraídos da rede CAN do veículo. <br /><br />Com tecnologia inteligente, você acompanha quilometragem, velocidade e horários de utilização, garantindo segurança, economia e eficiência para suas operações.",
        contentDesc: "",
        highlight1: "Alertas personalizados de acordo com a necessidade de sua empresa.",
        highlight2: "Videomonitoramento (Vega View) para mais segurança e visibilidade.",
        highlight3: "Relatórios detalhados para gestores de frota e diretoria.",
        highlight4: "Gestão automatizada de manutenções preventivas."
      },
      {
        id: "slt-sp",
        divId: "div-slt-sp",
        image: "./img/img-tab-projetos.webp",
        title: "PROJETOS ESPECIAIS",
        headerText: "Soluções sob medida para os mais diversos setores",
        contentTitle:
          "Desenvolvemos soluções exclusivas, adaptadas às necessidades de cada cliente, para atender até as mais complexas demandas de segurança e rastreamento. Ideal para equipamentos de alto valor ou com alto risco de furto, unindo tecnologia de ponta e inovação contínua para máxima proteção.",
        contentDesc:
          "Ideal para empresas que buscam soluções de alta tecnologia para prevenir o furto, roubo e garantir proteção sob medida.",
        highlight1: "Projeto 100% customizado para a sua empresa.",
        highlight2: "Solução adaptada de acordo com a necessidade do cliente.",
        highlight3: "Ideal para equipamentos de alto valor ou com alto risco de furto.",
        highlight4: "Adequada para todos os setores.",
        // Propriedades do botão (apenas para este item)
        buttonText: "SAIBA MAIS",
        buttonLink: "https://exemplo.com/projetos-especiais",
        buttonClass: "btn--solutions"
      },
      {
        id: "slt-crg",
        divId: "div-slt-crg",
        image: "./img/img-tab-cargas.webp",
        title: "CARGAS",
        headerText: "Monitoramento inteligente que garante a segurança total de suas cargas",
        contentTitle:
          "Soluções avançadas para proteção e monitoramento de cargas e ativos, operando 24 horas por dia através de nossa central integrada. Nossa tecnologia combina equipamentos de alta precisão, e um sistema inteligente de rastreamento que permite acompanhamento em tempo real e alertas instantâneos.",
        contentDesc: "",
        highlight1: "Central dedicada 24 horas por dia.",
        highlight2: "Alertas de movimentação não autorizada ou situações de risco.",
        highlight3: "Sistemas de localização para proteção estratégica.",
        highlight4: "Sistema de iscas eletrônicas para proteção estratégica."
      },
      {
        id: "slt-yl",
        divId: "div-slt-yl",
        image: "./img/img-tab-linha-amarela.webp",
        title: "LINHA AMARELA",
        headerText: "Gestão avançada para máquinas pesadas e equipamentos de construção",
        contentTitle:
          "Na operação de equipamentos de linha amarela, eficiência, controle e segurança são fundamentais. Nossa solução de rastreamento e monitoramento em tempo real, desenvolvida para Concessionárias de Rodovias, Construtoras e empresas da Construção Civil, oferece visibilidade total e proteção avançada para seus ativos. Transforme dados em decisões estratégicas, maximize a performance e reduza custos operacionais com tecnologia de ponta que garante produtividade e tranquilidade.",
        contentDesc: "",
        highlight1: "Prevenção eficaz contra roubos e furtos.",
        highlight2: "Controle completo da jornada dos operadores.",
        highlight3: "Gestão eficiente de manutenções preventivas e corretivas.",
        highlight4: "Aumento da produtividade com otimização do uso dos equipamentos."
      },
      {
        id: "slt-vv",
        divId: "div-slt-vv",
        image: "./img/img-tab-vegaview.webp",
        title: "VEGA VIEW",
        headerText: "Monitore, proteja e conquiste mais resultados com o poder da videotelemetria avançada",
        contentTitle:
          "O Vega View é a solução de videotelemetria que vai além do simples monitoramento. Equipado com tecnologia de ponta, incluindo Inteligência Artificial, ele identifica, alerta e registra comportamentos de risco no trânsito, trazendo segurança e eficiência para sua frota.",
        contentDesc: "",
        highlight1: "Monitoramento simultâneo em múltiplos pontos.",
        highlight2: "Identificação precisa de distrações, fadiga e comportamentos arriscados.",
        highlight3: "Notificações sonoras para motoristas.",
        highlight4: "Plataforma de auxílio a tomada de decisão.",
        // Propriedades do botão (apenas para este item)
        buttonText: "SAIBA MAIS",
        buttonLink: "https://exemplo.com/vegaview",
        buttonClass: "btn--solutions"
      },
      {
        id: "slt-ind",
        divId: "div-slt-ind",
        image: "./img/img-tab-pessoa-fisica.webp",
        title: "PESSOA FÍSICA",
        headerText: "Gostou das soluções Vega e é pessoa física?",
        contentTitle:
          "Conheça a Mundi, uma empresa de rastreamento veicular do grupo Vega especializada em rastreamento veicular, ideal para pessoas físicas e profissionais.",
        contentDesc: "",
        highlight1: "Soluções para carros, motos e caminhões.",
        highlight2: "Controle seu veículo por aplicativo ou website.",
        highlight3: "Crie alertas personalizados de velocidade, perímetros e muito mais.",
        highlight4: "Acesse o histórico completo das rotas percorridas.",
        highlight5: "Assistência Veicular 24h.",
        // Propriedades do botão (apenas para este item)
        buttonText: "SAIBA MAIS",
        buttonLink: "https://exemplo.com/pessoa-fisica",
        buttonClass: "btn--solutions"
      }
    ];
    
    // Elementos do DOM (para a seção de soluções)
    const solutionsBgImage = document.getElementById("bg-solutions");
    const solutionsTitleElement = document.querySelector(".slt-title");
    const solutionsHeaderTextElement = document.getElementById("slt-header-text");
    const solutionsContentTitleElement = document.getElementById("slt-content-title");
    const solutionsButtonContainer = document.getElementById("slt-button-container");
    const solutionsContentDescElement = document.getElementById("slt-content-desc");
    const solutionsHighlight1Element = document.getElementById("slt-highlight-1");
    const solutionsHighlight2Element = document.getElementById("slt-highlight-2");
    const solutionsHighlight3Element = document.getElementById("slt-highlight-3");
    const solutionsHighlight4Element = document.getElementById("slt-highlight-4");
    const solutionsHighlight5Element = document.getElementById("slt-highlight-5");
    const solutionsSelectorPoint = document.getElementById("seletor-point");
    const solutionsNavLinks = document.querySelectorAll(".solutions__nav a");
    
    // Função para atualizar o conteúdo com base na categoria selecionada
    function updateSolutionsContent(categoryId) {
      const selectedData = solutionsData.find(data => data.id === categoryId);
      if (!selectedData) return;
    
      solutionsBgImage.src = selectedData.image;
      solutionsTitleElement.textContent = selectedData.title;
    
      switch (selectedData.id) {
        case "slt-tcm":
          solutionsHeaderTextElement.style.maxWidth = "528px";
          break;
        case "slt-sp":
          solutionsHeaderTextElement.style.maxWidth = "449px";
          break;
        case "slt-crg":
          solutionsHeaderTextElement.style.maxWidth = "496px";
          break;
        case "slt-yl":
          solutionsHeaderTextElement.style.maxWidth = "498px";
          break;
        case "slt-vv":
          solutionsHeaderTextElement.style.maxWidth = "574px";
          break;
        default:
          solutionsHeaderTextElement.style.maxWidth = "";
      }
    
      solutionsHeaderTextElement.textContent = selectedData.headerText;
      solutionsContentTitleElement.innerHTML = selectedData.contentTitle;
    
      // Atualiza o botão, se as propriedades estiverem definidas
      if (selectedData.buttonText && selectedData.buttonLink) {
        const btnClass = selectedData.buttonClass ? selectedData.buttonClass : ".btn--solutions";
        solutionsButtonContainer.style.display = "block";
        solutionsButtonContainer.innerHTML = `<a href="${selectedData.buttonLink}" class="${btnClass}">${selectedData.buttonText}</a>`;
      } else {
        solutionsButtonContainer.style.display = "none";
      }
    
      // Atualiza contentDesc
      if (selectedData.contentDesc.trim() !== "") {
        solutionsContentDescElement.style.display = "";
        solutionsContentDescElement.innerHTML = selectedData.contentDesc;
      } else {
        solutionsContentDescElement.style.display = "none";
      }
    
      // Função auxiliar para os highlights
      function updateHighlight(element, content) {
        if (content && content.trim() !== "") {
          element.parentElement.style.display = "";
          element.childNodes[element.childNodes.length - 1].textContent = content;
        } else {
          element.parentElement.style.display = "none";
        }
      }
    
      updateHighlight(solutionsHighlight1Element, selectedData.highlight1);
      updateHighlight(solutionsHighlight2Element, selectedData.highlight2);
      updateHighlight(solutionsHighlight3Element, selectedData.highlight3);
      updateHighlight(solutionsHighlight4Element, selectedData.highlight4);
      if (solutionsHighlight5Element) {
        updateHighlight(solutionsHighlight5Element, selectedData.highlight5);
      }
    
      // Atualiza a cor dos links de navegação
      solutionsNavLinks.forEach(link => {
        link.style.color = "#818B99";
      });
    
      const activeLink = document.getElementById(categoryId);
      activeLink.style.color = "#2E9C1D";
    
      // Move o seletor-point
      const targetDiv = document.getElementById(selectedData.divId);
      if (targetDiv && solutionsSelectorPoint) {
        targetDiv.appendChild(solutionsSelectorPoint);
      }
    }
    
    // Eventos de clique
    solutionsNavLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        updateSolutionsContent(link.id);
      });
    });
    
    document.addEventListener("DOMContentLoaded", () => {
      updateSolutionsContent("slt-tcm");
    });
  })();