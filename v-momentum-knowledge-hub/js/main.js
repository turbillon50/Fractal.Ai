const integrationsContainer = document.getElementById('integrationCards');
const knowledgeContainer = document.getElementById('knowledgeCards');
const roadmapList = document.getElementById('roadmapList');
const imageGrid = document.getElementById('imageGrid');
const systemFlow = document.getElementById('systemFlow');
const manifestoText = document.getElementById('manifestoText');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

function openModal(title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.showModal();
}

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

function button(label, text) {
  const btn = document.createElement('button');
  btn.className = 'btn btn-secondary';
  btn.textContent = label;
  btn.addEventListener('click', () => openModal(label, text));
  return btn;
}

function renderIntegrationCards(items) {
  integrationsContainer.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="tag">${item.category}</p>
      <p>${item.description}</p>
      <p class="muted">Status: ${item.status}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'card-actions';
    actions.append(
      button('Qué es', `${item.name} es una integración clave del sistema V Momentum.`),
      button('Para qué sirve', `${item.name} sirve para potenciar el flujo técnico del hub.`),
      button('Learn more', `${item.description} Categoría: ${item.category}.`)
    );
    card.append(actions);
    integrationsContainer.append(card);
  });
}

function renderKnowledgeCards(items) {
  knowledgeContainer.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p class="muted">Level: ${item.level}</p>
    `;
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    actions.append(button('Learn more', `${item.title}: ${item.description}`));
    card.append(actions);
    knowledgeContainer.append(card);
  });
}

function renderRoadmap() {
  roadmapList.innerHTML = '';
  window.roadmapSteps.forEach((step, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${step}`;
    roadmapList.append(li);
  });
}

function renderImageLibrary() {
  imageGrid.innerHTML = '';
  window.integrations.forEach((item) => {
    ['Qué es', 'Para qué sirve'].forEach((type) => {
      const block = document.createElement('article');
      block.className = 'image-item';
      block.innerHTML = `
        <h4>${item.name}</h4>
        <p>${type}</p>
        <p class="muted">Placeholder image pending</p>
      `;
      imageGrid.append(block);
    });
  });
}

function populateCategoryFilter() {
  const categories = [...new Set(window.integrations.map((item) => item.category))];
  categories.forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.append(option);
  });
}

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filteredIntegrations = window.integrations.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);
    const matchCategory = category === 'all' || item.category === category;
    return matchSearch && matchCategory;
  });

  const filteredKnowledge = window.knowledgeBase.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  });

  renderIntegrationCards(filteredIntegrations);
  renderKnowledgeCards(filteredKnowledge);
}

function init() {
  manifestoText.textContent = window.manifesto;
  window.systemMap.forEach((step) => {
    const node = document.createElement('div');
    node.className = 'flow-item';
    node.textContent = step;
    systemFlow.append(node);
  });
  populateCategoryFilter();
  renderIntegrationCards(window.integrations);
  renderKnowledgeCards(window.knowledgeBase);
  renderRoadmap();
  renderImageLibrary();
  document.getElementById('year').textContent = new Date().getFullYear();

  searchInput.addEventListener('input', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);
}

init();
