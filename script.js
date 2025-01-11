// Inicializando carrinho do localStorage ou como um array vazio
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartBtn = document.getElementById("cart-btn");
let cartModal = document.getElementById("cart-modal");
let closeCartBtn = document.getElementById("close-cart-btn");
let cartItemsContainer = document.getElementById("cart-items");
let totalPriceElement = document.getElementById("total-price");
let checkoutBtn = document.getElementById("checkout-btn");

// Função para atualizar o carrinho (exibir itens e total)
function updateCart() {
    // Atualizar o contador de itens no carrinho
    cartBtn.innerText = `Carrinho (${cart.length})`;

    // Limpar itens atuais no modal
    cartItemsContainer.innerHTML = "";

    // Se o carrinho estiver vazio, exibir mensagem
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        // Exibir os itens do carrinho
        let totalPrice = 0;
        cart.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)}</p>
                <p>Quantidade: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            totalPrice += item.price * item.quantity;
        });

        // Atualizar o valor total
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    // Salvar o carrinho no localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Função para abrir o modal do carrinho
cartBtn.addEventListener("click", () => {
    updateCart(); // Atualiza o carrinho antes de exibir
    cartModal.style.display = "flex"; // Exibe o modal
});

// Função para fechar o modal do carrinho
closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none"; // Esconde o modal
});

// Função para remover um item do carrinho
cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const itemId = e.target.getAttribute("data-id");
        cart = cart.filter(item => item.id !== itemId);
        updateCart(); // Atualiza o carrinho após a remoção
    }
});

// Adicionar itens ao carrinho
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const image = button.previousElementSibling.src;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++; // Aumenta a quantidade se o item já estiver no carrinho
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }

        updateCart(); // Atualiza o carrinho após adicionar o item
    });
});

// Função de checkout (ainda sem backend)
checkoutBtn.addEventListener("click", () => {
    alert("Compra realizada com sucesso! (Este é um protótipo sem backend.)");
    cart = []; // Limpa o carrinho após a compra
    updateCart(); // Atualiza o carrinho para refletir a compra
});
