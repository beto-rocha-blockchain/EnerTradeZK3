![EnerTradeZK](assets/image.jpeg)

# ⚡ EnerTradeZK

**EnerTradeZK** é uma corretora descentralizada de ativos energéticos tokenizados com foco em **privacidade, acessibilidade e inovação social**. A plataforma foi desenvolvida para permitir que **qualquer cidadão participe do mercado de energia elétrica** de forma segura, com **ZK-Proofs (zero-knowledge proofs)** garantindo a privacidade de dados como consumo, identidade e saldo.

---

## 🔋 Objetivo do Projeto

Democratizar o acesso ao mercado de energia, promovendo inclusão e segurança:
- Como **consumidor**, o usuário pode adquirir energia mais barata diretamente de quem produz ou vende.
- Como **investidor**, qualquer pessoa pode negociar kWh tokenizados de forma peer-to-peer.
- Com **zk-SNARKs**, garantimos privacidade total dos dados sensíveis off-chain.

---

## 🪙 Token

- **Nome:** EnerZ
- **Lastro:** 1 Tron = 1 kWh
- **Blockchain:** Ethereum (Testnet Sepolia) e NEAR
- **Privacidade:** Implementada com Circom + SnarkJS

---

## 🛠️ Tecnologias Utilizadas

| Camada              | Tecnologia                            |
|---------------------|----------------------------------------|
| Blockchain          | Ethereum Sepolia + NEAR                |
| Contratos           | Solidity com Hardhat                   |
| Backend             | Node.js + Express + SnarkJS            |
| Frontend            | React + Ethers.js                      |
| ZK-Proofs           | Circom + SnarkJS                       |
| RPC Provider        | Infura                                 |
| Provedor de Carteira| MetaMask                               |

---

## 📁 Estrutura do Projeto

```bash
EnerTradeZK/
├── backend/               # Servidor Express com integração ZK
│   └── zk/                # Provas: circuitos, configuração e geração
├── frontend/              # Interface React conectada à blockchain
│   └── src/
├── smart-contract/        # Contratos inteligentes e scripts (Hardhat)
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   ├── hardhat.config.js
│   └── .env
└── README.md              # Documentação principal do projeto
