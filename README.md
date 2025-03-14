# 📖 Guia de Tipografia - Projeto CSS/SASS

## 🖋 Introdução
Esta documentação explica como utilizar a **tipografia padronizada** do projeto.  
Utilizamos a fonte **Inter** como padrão para textos e a **Poppins** para títulos.  

A tipografia foi estruturada para **facilitar o uso e manter a consistência visual**.

---

## 🏗 1. Estrutura de Classes
As classes foram organizadas para **dois tipos de elementos**:

**Títulos (`h1`, `h2`, `h3`, etc.)**  
**Textos (`p`, `span`, `a`, etc.)**

Cada classe de texto pode ter variações de **peso da fonte**:
- `.semibold` → **600** (Semibold)
- `.medium` → **500** (Medium)
- `.regular` → **400** (Regular)

---

## 🔠 2. Uso de Títulos (`h1` a `h4`)
Os títulos seguem um padrão fixo e não precisam de classes adicionais.

```html
<h1>Título Principal</h1>
<h2>Subtítulo Importante</h2>
<h3>Seção Secundária</h3>
<h3 class="thin">Seção Secundária (peso menor)</h3>
<h4>Seção de Destaque</h4>
<h4 class="bold">Seção de Destaque (peso maior)</h4>
