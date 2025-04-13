const container = document.getElementById("lista-pedidos");

fetch("https://9sa19b2fve.execute-api.sa-east-1.amazonaws.com/dev/pedido")
  .then((res) => res.json())
  .then((pedidos) => {
    if (!Array.isArray(pedidos) || pedidos.length === 0) {
      container.innerHTML = "<p>📭 Nenhum pedido encontrado.</p>";
      return;
    }

    pedidos.forEach((pedido) => {
      const div = document.createElement("div");
      div.className = "card-pedido";

      const produtosHTML =
        pedido.produtos?.map((nome) => `<li>${nome}</li>`).join("") || "";
      const status = pedido.status || "Aguardando pagamento";
      const statusClass = status.toLowerCase().includes("pago")
        ? "pago"
        : "pendente";

      div.innerHTML = `
        <h3>Pedido #${pedido.pedidoId}</h3>
        <p><strong>Status:</strong> <span class="status ${statusClass}">${status}</span></p>
        <p><strong>Total:</strong> R$ ${parseFloat(pedido.total).toFixed(2)}</p>
        <p><strong>Produtos:</strong></p>
        <ul>${produtosHTML}</ul>
      `;

      container.appendChild(div);
    });
  })
  .catch((err) => {
    console.error("Erro ao buscar pedidos:", err);
    container.innerHTML =
      "<p>❌ Erro ao carregar pedidos. Tente novamente.</p>";
  });
