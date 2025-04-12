window.onload = () => {
 const container = document.getElementById("produtos-container");

 produtosDisponiveis.forEach((produto, index) => {
   const div = document.createElement("div");
   div.className = "produto";
   div.innerHTML = `
    <input type="checkbox" id="produto-${index}" value="${produto.nome}">
    <img src="${produto.imagem}" alt="${produto.nome}">
    <div class="produto-info">
      <strong>${produto.nome}</strong>
      <span>R$ ${produto.preco.toFixed(2)}</span>
    </div>
  `;
   container.appendChild(div);
 });
};

function fazerPedido() {
 const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
 if (checkboxes.length === 0) {
   alert("Por favor, selecione pelo menos um produto.");
   return;
 }

 const selecionados = Array.from(checkboxes).map(cb => cb.value);
 const produtosParam = selecionados.map(encodeURIComponent).join(",");
 window.location.href = `revisar.html?produtos=${produtosParam}`;
}
