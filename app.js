const page = document.body.dataset.page;
const storageKey = `siakad-${page}-records`;

const configs = {
  prodi: {
    singular: "Program Studi",
    columns: [
      { key: "kode", label: "Kode Prodi", code: true },
      { key: "nama", label: "Nama Program Studi" },
      { key: "jenjang", label: "Jenjang", badge: true, display: { "D3 - Diploma Tiga": "D3", "D4 - Sarjana Terapan": "D4", "S1 - Sarjana": "S1", "S2 - Magister": "S2" } },
      { key: "kepala", label: "Ketua Program Studi (Kaprodi)" },
      { key: "akreditasi", label: "Akreditasi", badge: true },
      { key: "mahasiswa", label: "Mahasiswa Aktif", suffix: " Mahasiswa" }
    ],
    fields: [
      { key: "kode", label: "Kode Prodi", placeholder: "Contoh: PR01", required: true },
      { key: "nama", label: "Nama Program Studi", placeholder: "Contoh: Teknik Informatika", required: true },
      { key: "jenjang", label: "Jenjang Studi", type: "select", options: ["D3 - Diploma Tiga", "D4 - Sarjana Terapan", "S1 - Sarjana", "S2 - Magister"], required: true },
      { key: "kepala", label: "Ketua Program Studi (Kaprodi)", placeholder: "Nama & Gelar Dosen", required: true },
      { key: "akreditasi", label: "Akreditasi", type: "select", options: ["Unggul", "Baik Sekali", "Baik", "A", "B"], required: true },
      { key: "mahasiswa", label: "Mahasiswa Aktif", type: "number", min: "0", required: true }
    ],
    seed: [
      { id: "p1", kode: "PR001", nama: "Teknik Informatika", jenjang: "S1 - Sarjana", kepala: "Dr. Budi Santoso, M.Kom", akreditasi: "Unggul", mahasiswa: 120 },
      { id: "p2", kode: "PR002", nama: "Sistem Informasi", jenjang: "S1 - Sarjana", kepala: "Siti Aminah, M.T.", akreditasi: "Baik Sekali", mahasiswa: 95 },
      { id: "p3", kode: "PR003", nama: "Teknologi Informasi", jenjang: "D3 - Diploma Tiga", kepala: "Ahmad Dahlan, M.Sc", akreditasi: "Baik", mahasiswa: 60 },
      { id: "p4", kode: "PR004", nama: "Sains Data", jenjang: "S1 - Sarjana", kepala: "Dr. Retno Wulandari, M.Si", akreditasi: "Unggul", mahasiswa: 45 }
    ]
  },
  mahasiswa: {
    singular: "Mahasiswa",
    columns: [
      { key: "nim", label: "NIM", code: true },
      { key: "nama", label: "Nama Mahasiswa" },
      { key: "prodi", label: "Program Studi" },
      { key: "angkatan", label: "Angkatan" },
      { key: "gender", label: "Jenis Kelamin" },
      { key: "email", label: "Email" },
      { key: "status", label: "Status", badge: true }
    ],
    fields: [
      { key: "nim", label: "NIM", placeholder: "Contoh: 230101001", required: true },
      { key: "nama", label: "Nama Mahasiswa", placeholder: "Nama lengkap", required: true },
      { key: "prodi", label: "Program Studi", type: "select", options: ["Teknik Informatika", "Sistem Informasi", "Teknologi Informasi", "Sains Data"], required: true },
      { key: "angkatan", label: "Angkatan", type: "number", min: "2000", max: "2099", required: true },
      { key: "gender", label: "Jenis Kelamin", type: "select", options: ["Laki-laki", "Perempuan"], required: true },
      { key: "email", label: "Email", type: "email", placeholder: "nama@student.ac.id", required: true },
      { key: "status", label: "Status", type: "select", options: ["Aktif", "Cuti"], required: true }
    ],
    seed: [
      { id: "m1", nim: "230101001", nama: "Aditya Pratama", prodi: "Teknik Informatika", angkatan: 2023, gender: "Laki-laki", email: "aditya@student.ac.id", status: "Aktif" },
      { id: "m2", nim: "230101002", nama: "Siti Nurhaliza", prodi: "Teknik Informatika", angkatan: 2023, gender: "Perempuan", email: "siti@student.ac.id", status: "Aktif" },
      { id: "m3", nim: "230102001", nama: "Bagas Radian", prodi: "Sistem Informasi", angkatan: 2023, gender: "Laki-laki", email: "bagas@student.ac.id", status: "Aktif" },
      { id: "m4", nim: "230103001", nama: "Dewi Anggraini", prodi: "Teknologi Informasi", angkatan: 2022, gender: "Perempuan", email: "dewi@student.ac.id", status: "Aktif" },
      { id: "m5", nim: "230104001", nama: "Fajar Ramadan", prodi: "Sains Data", angkatan: 2023, gender: "Laki-laki", email: "fajar@student.ac.id", status: "Aktif" },
      { id: "m6", nim: "230101003", nama: "Gita Savitri", prodi: "Teknik Informatika", angkatan: 2023, gender: "Perempuan", email: "gita@student.ac.id", status: "Cuti" },
      { id: "m7", nim: "230102002", nama: "Hendra Gunawan", prodi: "Sistem Informasi", angkatan: 2022, gender: "Laki-laki", email: "hendra@student.ac.id", status: "Aktif" },
      { id: "m8", nim: "230103002", nama: "Intan Permata", prodi: "Teknologi Informasi", angkatan: 2023, gender: "Perempuan", email: "intan@student.ac.id", status: "Aktif" }
    ]
  }
};

const config = configs[page];
if (config) {
  const tableHead = document.querySelector("[data-table-head]");
  const tableBody = document.querySelector("[data-table-body]");
  const searchInput = document.querySelector("[data-search]");
  const pageSizeSelect = document.querySelector("[data-page-size]");
  const pagination = document.querySelector("[data-pagination]");
  const modal = document.querySelector("[data-modal]");
  const form = document.querySelector("[data-record-form]");
  const modalFields = document.querySelector("[data-modal-fields]");
  const records = loadRecords();
  let currentPage = 1;
  let sortKey = config.columns[0].key;
  let sortDirection = 1;
  let editingId = null;

  function loadRecords() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(saved) ? saved : [...config.seed];
    } catch {
      return [...config.seed];
    }
  }

  function saveRecords() {
    localStorage.setItem(storageKey, JSON.stringify(records));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function badgeClass(value) {
    if (["Unggul", "Aktif"].includes(value)) return "badge-success";
    if (["Baik Sekali", "Baik"].includes(value)) return "badge-primary";
    if (["S1", "S2", "D3", "D4"].includes(value)) return "badge-info";
    if (value === "Cuti") return "badge-warning";
    return "badge-muted";
  }

  function cellContent(record, column) {
    const value = record[column.key];
    if (column.code) return `<span class="record-code">${escapeHtml(value)}</span>`;
    if (column.badge) {
      const displayValue = column.display?.[value] ?? value;
      const badgeValue = column.display ? displayValue : value;
      return `<span class="record-badge ${badgeClass(badgeValue)}">${escapeHtml(displayValue)}</span>`;
    }
    return `${escapeHtml(value)}${column.suffix ?? ""}`;
  }

  function filteredRecords() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    return records
      .filter(record => Object.values(record).some(value => String(value).toLocaleLowerCase().includes(query)))
      .sort((first, second) => String(first[sortKey] ?? "").localeCompare(String(second[sortKey] ?? ""), "id", { numeric: true }) * sortDirection);
  }

  function render() {
    tableHead.innerHTML = `<tr><th scope="col">No</th>${config.columns.map(column => `<th scope="col"><button class="sort-button" type="button" data-sort="${column.key}">${column.label}<i class="bi bi-arrow-down-up" aria-hidden="true"></i></button></th>`).join("")}<th scope="col">Aksi</th></tr>`;
    const filtered = filteredRecords();
    const pageSize = Number(pageSizeSelect.value);
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const startIndex = (currentPage - 1) * pageSize;
    const visible = filtered.slice(startIndex, startIndex + pageSize);

    tableBody.innerHTML = visible.length
      ? visible.map((record, index) => `<tr><td>${startIndex + index + 1}</td>${config.columns.map(column => `<td>${cellContent(record, column)}</td>`).join("")}<td><div class="record-actions"><button class="record-action edit" type="button" data-action="edit" data-id="${escapeHtml(record.id)}" aria-label="Edit data"><i class="bi bi-pencil-square"></i></button><button class="record-action delete" type="button" data-action="delete" data-id="${escapeHtml(record.id)}" aria-label="Hapus data"><i class="bi bi-trash-fill"></i></button></div></td></tr>`).join("")
      : `<tr><td colspan="${config.columns.length + 2}" class="text-center">Data tidak ditemukan</td></tr>`;

    const firstEntry = filtered.length ? startIndex + 1 : 0;
    const lastEntry = Math.min(startIndex + pageSize, filtered.length);
    document.querySelector("[data-entry-summary]").textContent = `Showing ${firstEntry} to ${lastEntry} of ${filtered.length} entries`;
    pagination.innerHTML = `<button type="button" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>Previous</button><button type="button" class="current" aria-current="page">${currentPage}</button><button type="button" data-page="${currentPage + 1}" ${currentPage === pageCount ? "disabled" : ""}>Next</button>`;
  }

  function buildFields(record = {}) {
    modalFields.innerHTML = config.fields.map(field => {
      const required = field.required ? "required" : "";
      const value = record[field.key] ?? "";
      const control = field.type === "select"
        ? `<select id="field-${field.key}" name="${field.key}" ${required}>${field.options.map(option => `<option value="${escapeHtml(option)}" ${value === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`
        : `<input id="field-${field.key}" name="${field.key}" type="${field.type ?? "text"}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder ?? "")}" ${field.min ? `min="${field.min}"` : ""} ${field.max ? `max="${field.max}"` : ""} ${required} />`;
      return `<label class="record-field" for="field-${field.key}">${field.label}${control}</label>`;
    }).join("");
  }

  function openModal(record = null) {
    editingId = record?.id ?? null;
    document.querySelector("[data-modal-title]").textContent = `${editingId ? "Edit" : "Form"} ${config.singular}`;
    buildFields(record ?? {});
    modal.hidden = false;
    modal.querySelector("input, select")?.focus();
  }

  function closeModal() {
    modal.hidden = true;
    form.reset();
    editingId = null;
  }

  document.querySelector("[data-add-record]").addEventListener("click", () => openModal());
  document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });
  searchInput.addEventListener("input", () => { currentPage = 1; render(); });
  pageSizeSelect.addEventListener("change", () => { currentPage = 1; render(); });
  tableHead.addEventListener("click", event => {
    const button = event.target.closest("[data-sort]");
    if (!button) return;
    sortDirection = sortKey === button.dataset.sort ? sortDirection * -1 : 1;
    sortKey = button.dataset.sort;
    render();
  });
  tableBody.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const record = records.find(item => item.id === button.dataset.id);
    if (button.dataset.action === "edit" && record) openModal(record);
    if (button.dataset.action === "delete" && record && window.confirm(`Hapus data ${record[config.columns[0].key]}?`)) {
      records.splice(records.indexOf(record), 1);
      saveRecords();
      render();
    }
  });
  pagination.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    currentPage = Number(button.dataset.page);
    render();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.id = editingId ?? `${page}-${Date.now()}`;
    if (page === "prodi") data.mahasiswa = Number(data.mahasiswa);
    if (page === "mahasiswa") data.angkatan = Number(data.angkatan);
    const existingIndex = records.findIndex(record => record.id === editingId);
    if (existingIndex >= 0) records[existingIndex] = data;
    else records.push(data);
    saveRecords();
    closeModal();
    render();
  });

  render();
}