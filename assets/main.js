// ============================================
// 取り置きサービス ワイヤーフレーム 共通JS
// ============================================

// アノテーションパネル 開閉
function toggleAnnotation() {
  const toggle = document.querySelector('.annotation-toggle');
  const body = document.querySelector('.annotation-body');
  if (!body) return;
  const isHidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !isHidden);
  toggle.classList.toggle('collapsed', !isHidden);
}

// モーダル系のユーティリティ
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const id = 'toast-' + Date.now();
  const bg = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-secondary';
  container.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="toast align-items-center text-white ${bg} border-0 show" role="alert">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="document.getElementById('${id}').remove()"></button>
      </div>
    </div>
  `);
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.remove();
  }, 3000);
}

// 商品検索モーダル（order-new.html 用）
function searchProduct(query) {
  // ダミーデータ
  const products = [
    { code: 'P-00123', name: '国産牛ロース薄切り 400g', price: 1580 },
    { code: 'P-00456', name: '業務用ぶどうジュース 1L×6本', price: 1280 },
    { code: 'P-00789', name: 'フランス産バター 500g', price: 980 },
    { code: 'P-01234', name: '冷凍ピザ マルゲリータ 4枚入', price: 750 },
    { code: 'P-01567', name: 'オーストラリア産 牛バラ 1kg', price: 1980 },
    { code: 'P-01890', name: '業務用チーズ 1kg', price: 1450 },
  ];
  const filtered = query
    ? products.filter(p => p.name.includes(query) || p.code.includes(query))
    : products;
  const tbody = document.getElementById('product-search-results');
  if (!tbody) return;
  tbody.innerHTML = filtered.map(p => `
    <tr style="cursor:pointer" onclick="selectProduct('${p.code}', '${p.name}', ${p.price})">
      <td><small class="text-muted">${p.code}</small></td>
      <td>${p.name}</td>
      <td class="text-end">¥${p.price.toLocaleString()}</td>
      <td><button class="btn btn-sm btn-outline-primary" onclick="selectProduct('${p.code}', '${p.name}', ${p.price})">選択</button></td>
    </tr>
  `).join('');
}

function selectProduct(code, name, price) {
  const nameEl = document.getElementById('selected-product-name');
  const codeEl = document.getElementById('selected-product-code');
  const priceEl = document.getElementById('selected-product-price');
  const section = document.getElementById('selected-product-section');
  if (nameEl) nameEl.textContent = name;
  if (codeEl) codeEl.textContent = code;
  if (priceEl) priceEl.textContent = '¥' + price.toLocaleString();
  if (section) section.classList.remove('d-none');
  const modal = bootstrap.Modal.getInstance(document.getElementById('productSearchModal'));
  if (modal) modal.hide();
}

// 電話番号検索（order-search.html 用）
function searchByPhone(phone) {
  const dummyOrders = [
    { id: 'H-2024-0312-001', name: '田中 花子', phone: '090-1234-5678', product: '国産牛ロース薄切り 400g', qty: 2, pickup: '2024/03/15', status: 'confirmed' },
    { id: 'H-2024-0312-002', name: '田中 花子', phone: '090-1234-5678', product: '業務用チーズ 1kg', qty: 1, pickup: '2024/03/20', status: 'confirmed' },
    { id: 'H-2024-0310-005', name: '佐藤 次郎', phone: '080-9876-5432', product: 'フランス産バター 500g', qty: 3, pickup: '2024/03/14', status: 'confirmed' },
  ];
  const results = dummyOrders.filter(o => !phone || o.phone.includes(phone));
  const container = document.getElementById('search-results');
  if (!container) return;
  if (results.length === 0) {
    container.innerHTML = '<div class="alert alert-warning">該当する取り置き予約が見つかりませんでした。</div>';
    return;
  }
  const statusLabels = { confirmed: '受付中', received: '受け取り済', cancelled: 'キャンセル' };
  const statusColors = { confirmed: 'badge-confirmed', received: 'badge-received', cancelled: 'badge-cancelled' };
  container.innerHTML = `
    <div class="wf-card">
      <div class="wf-card-title">検索結果 ${results.length}件</div>
      ${results.length > 1 ? '<div class="alert alert-warning py-2"><small>⚠️ 同じ電話番号で複数の取り置きがあります。お客様に内容をご確認ください。</small></div>' : ''}
      <table class="table wf-table">
        <thead><tr>
          <th>予約ID</th><th>お客様名</th><th>商品</th><th>数量</th><th>受け取り希望日</th><th>ステータス</th><th></th>
        </tr></thead>
        <tbody>
          ${results.map(o => `
            <tr>
              <td><small class="text-muted">${o.id}</small></td>
              <td>${o.name}</td>
              <td>${o.product}</td>
              <td>${o.qty}点</td>
              <td>${o.pickup}</td>
              <td><span class="badge ${statusColors[o.status]}">${statusLabels[o.status]}</span></td>
              <td><a href="order-detail.html" class="btn btn-sm btn-outline-secondary">詳細</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
