const API_URL = "<SUA_URL_DO_API_GATEWAY_AQUI>"; // 🔧 Exemplo: https://abc123.execute-api.sa-east-1.amazonaws.com/dev

const container = document.getElementById("lista-pedidos");

fetch(`${API_URL}/pedidos`)
  .then((res) => res.json())
  .then((pedidos) => {
    if (!Array.isArray(pedidos) || pedidos.length === 0) {
      container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
      return;
    }

    pedidos.forEach((pedido) => {
      const div = document.createElement("div");
      div.className = "card-pedido";

      const produtosHTML =
        pedido.produtos?.map((nome) => `<li>${nome}</li>`).join("") || "";
      const status = pedido.status || "Aguardando pagamento";
      let statusClass = "";
      if (status.toLowerCase().includes("pago")) {
        statusClass = "pago";
      } else if (status.toLowerCase().includes("cancelado")) {
        statusClass = "cancelado";
      }

      let motivoHTML = "";
      if (status.toLowerCase() === "cancelado" && pedido.motivo) {
        motivoHTML = `
          <p><strong>Motivo:</strong> ${pedido.motivo}</p>
        `;

        if (
          pedido.motivo.toLowerCase().includes("cartão") ||
          pedido.motivo.toLowerCase().includes("fraude")
        ) {
          motivoHTML += `<p style="color:red;"><strong>🚨 O FBI vai bater na sua porta em breve...</strong></p>`;
        }
      }

      div.innerHTML = `
        <h3>Pedido #${pedido.pedidoId}</h3>
        <p><strong>Status:</strong> <span class="status ${statusClass}">${status}</span></p>
        <p><strong>Total:</strong> R$ ${parseFloat(pedido.total).toFixed(2)}</p>
        <p><strong>Produtos:</strong></p>
        <ul>${produtosHTML}</ul>
        ${motivoHTML}
      `;

      container.appendChild(div);
    });
  })
  .catch((err) => {
    console.error("Erro ao buscar pedidos:", err);
    container.innerHTML =
      "<p>❌ Erro ao carregar pedidos. Tente novamente.</p>";
  });
