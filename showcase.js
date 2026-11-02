// Demo gallery search and industry filters.
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('demo-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.demo-card'));
  const search = document.getElementById('demo-search');
  const filters = Array.from(document.querySelectorAll('[data-demo-filter]'));
  const empty = document.getElementById('demo-empty');
  let active = 'all';
  const apply = () => {
    const term = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = active === 'all' || card.dataset.demoCategory === active;
      const haystack = `${card.dataset.demoSearch || ''} ${card.textContent || ''}`.toLowerCase();
      const textMatch = !term || haystack.includes(term);
      const show = categoryMatch && textMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };
  filters.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.demoFilter || 'all';
    filters.forEach(item => item.classList.toggle('is-active', item === button));
    apply();
  }));
  search?.addEventListener('input', apply);
  apply();
});
