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
- **Lastro:** 1 EnerZ = 1 kWh
- **Blockchain:** Ethereum (Testnet Sepolia)
- **Privacidade:** Implementada com Circom + SnarkJS

---

## 🛠️ Tecnologias Utilizadas

| Camada              | Tecnologia                            |
|---------------------|----------------------------------------|
| Blockchain          | Ethereum Sepolia                       |
| Contratos           | Solidity com Hardhat                   |
| Backend             | Node.js + Express + SnarkJS            |
| ZK-Proofs           | Circom + SnarkJS                       |
| RPC Provider        | Infura                                 |
| Provedor de Carteira| MetaMask                               |

---

## 📁 Estrutura do Projeto

```bash
EnerTradeZK/
├── assets/              # Recursos estáticos (imagens, ícones, etc.)
├── node_modules/        # Dependências do projeto
├── smart-contract/      # Contratos inteligentes em Solidity
├── .gitattributes
├── LICENSE              # Licença MIT
├── README.md            # Documentação do projeto
├── package-lock.json
└── package.json         # Gerenciamento de dependências
```

Licença: O projeto está licenciado sob a Licença MIT, permitindo uso, modificação e distribuição.
