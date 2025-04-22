const API_URL = "<SUA_URL_DO_API_GATEWAY_AQUI>"; // 🔧 Exemplo: https://abc123.execute-api.sa-east-1.amazonaws.com/dev

const container = document.getElementById("pagamento-container");

const urlParams = new URLSearchParams(window.location.search);
const pedidoId = urlParams.get("pedidoId");

const form = document.createElement("form");
form.className = "formulario-pagamento";
form.innerHTML = `
  <label for="numero">Número do Cartão</label>
  <input type="text" id="numero" required placeholder="0000 0000 0000 0000" maxlength="19">

  <label for="nome">Nome no Cartão</label>
  <input type="text" id="nome" required placeholder="Seu nome completo">

  <label for="validade">Validade</label>
  <input type="text" id="validade" required placeholder="MM/AA" maxlength="5">

  <label for="cvv">CVV</label>
  <input type="text" id="cvv" required placeholder="123" maxlength="3">

  <button type="submit">Finalizar Pagamento</button>
`;

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!pedidoId) {
    alert("ID do pedido não encontrado na URL.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/pagamentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pedidoId: pedidoId,
        status: "pago",
        numero: document.getElementById("numero").value
      })
    });

    if (!response.ok) {
      const textoErro = await response.text();
      console.error("Erro HTTP:", response.status);
      console.error("Detalhes da resposta:", textoErro);
      throw new Error("Erro ao confirmar pagamento");
    }

    container.innerHTML = `
      <div class="sucesso">
        ✅ Pagamento realizado com sucesso!<br>
        Obrigado pela sua compra.<br><br>
        ID do Pedido: <code>${pedidoId}</code>
      </div>
    `;

    localStorage.removeItem("produtosPedido");

    setTimeout(() => {
      window.location.href = "/pages/meus-pedidos.html";
    }, 3000);

  } catch (error) {
    alert("Falha ao confirmar pagamento. Tente novamente.");
    console.error("Erro:", error);
  }
});

container.appendChild(form);
