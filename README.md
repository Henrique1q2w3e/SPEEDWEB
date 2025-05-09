# Portfólio de Templates SPEEDWEB

Este é um portfólio moderno de templates de sites, desenvolvido com HTML, CSS e JavaScript. O projeto apresenta uma coleção de templates prontos para diferentes tipos de negócios, com foco em design responsivo e experiência do usuário.

## Características

- Design moderno e responsivo
- Tema escuro com detalhes em dourado
- Animações suaves e interativas
- Visualização de templates em tela cheia
- Sistema de filtro por categorias
- Interface intuitiva e amigável

## Templates Disponíveis

### Barbearia Moderna
- Sistema de agendamento online
- Galeria de trabalhos
- Lista de serviços e preços
- Integração com mapas
- Design responsivo

### E-commerce Premium
- Catálogo de produtos
- Carrinho de compras
- Sistema de pagamentos
- Área do cliente
- Painel administrativo

### Site Institucional
- Páginas informativas
- Blog integrado
- Formulário de contato
- SEO otimizado
- Design profissional

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS)
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- AOS (Animate On Scroll)

## Estrutura do Projeto

```
speedweb/
├── portfolio.html          # Página principal do portfólio
├── portfolio.css          # Estilos do portfólio
├── portfolio.js           # Scripts do portfólio
├── templates/             # Diretório de templates
│   ├── barbearia/        # Template de barbearia
│   ├── ecommerce/        # Template de e-commerce
│   └── institucional/    # Template institucional
└── imagens/              # Imagens do projeto
```

## Como Usar

1. Clone o repositório
2. Abra o arquivo `portfolio.html` em seu navegador
3. Navegue pelos templates disponíveis
4. Clique em "Visualizar" para ver o template em tela cheia

## Personalização

### Cores
As cores podem ser personalizadas através das variáveis CSS no arquivo `portfolio.css`:

```css
:root {
    --primary-color: #D4AF37;
    --secondary-color: #1a1a1a;
    --text-color: #ffffff;
    --bg-color: #121212;
    --card-bg: #1e1e1e;
    --overlay-bg: rgba(0, 0, 0, 0.8);
}
```

### Adicionar Novos Templates
Para adicionar um novo template:

1. Crie uma nova pasta em `templates/`
2. Adicione os arquivos do template (HTML, CSS, JS)
3. Adicione uma nova entrada no grid de templates em `portfolio.html`
4. Atualize o JavaScript para incluir o novo template

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para mais informações ou suporte, entre em contato através do email: contato@speedweb.com 