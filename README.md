# 🧠 Rick & Morty Memory Game

Aplicación desarrollada como prueba técnica utilizando **React + TypeScript**, enfocada en arquitectura escalable, manejo robusto de estado y buenas prácticas modernas de frontend.

La aplicación permite autenticación de usuario y un juego de memoria utilizando personajes obtenidos desde la API pública de Rick and Morty.

🔗 API utilizada: [https://rickandmortyapi.com/](https://rickandmortyapi.com/)

---

# 🚀 Stack Tecnológico

El proyecto fue construido utilizando:

* **Next.js** – Enrutamiento, SSR/CSR híbrido y protección de rutas
* **React** – UI declarativa
* **TypeScript** – Tipado estático
* **React Hook Form** – Manejo eficiente de formularios
* **Zod** – Validación basada en esquemas
* **Zustand** – Gestión global de estado
* **TanStack Query** – Manejo de peticiones y caché
* **GSAP** – Microinteracciones y animaciones
* **Lucide** – Sistema de iconografía

---

# 🏗️ Enfoque Arquitectónico

La aplicación fue diseñada bajo los siguientes principios:

* Separación clara de responsabilidades
* Lógica desacoplada de la UI
* Componentes reutilizables
* Estado global mínimo pero centralizado
* Efectos controlados y predecibles
* Escalabilidad futura

---

## 📁 Estructura del Proyecto

```
src/
 ├── app/
 ├── assets/
 ├── components/
 ├── container/
 ├── hooks/
 ├── lib/
 ├── services/
 ├── store/
 ├── types/
 └── utils/
```

Cada carpeta cumple una responsabilidad específica, facilitando mantenimiento, testing y escalabilidad.

---

# 🛠️ Decisiones Técnicas Relevantes

## ✔ Next.js como Base

* Basarse completamente en React
* Mejor manejo de rutas
* Middleware para protección
* Posibilidad de SSR si el proyecto evoluciona
* Estructura más organizada desde el inicio

---

# 🔐 Autenticación

La autenticación fue implementada de forma **mock**, simulando un flujo real de backend:

* Validación de formulario con React Hook Form + Zod
* Generación simulada de token
* Persistencia del token
* Protección de rutas mediante middleware (proxy) de Next.js

---

# 🌐 Manejo de Datos

Se utilizó **TanStack Query** para:

* Manejo automático de caché
* Estados de loading y error
* Reintentos automáticos
* Separación clara entre data-fetching y UI

---

# 🎨 Microinteracciones

Se utilizó **GSAP** para:

* Animación de barajear tarjetas
* Transiciones suaves en comparaciones

El objetivo fue mejorar la experiencia sin sobrecargar la lógica del componente simulando interacciones realistas a un juego.

---

# 📦 Instalación y Ejecución

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/tuusuario/rick-morty-memory.git
cd rick-morty-memory
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

## 3️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

Aplicación disponible en:

```
http://localhost:3000
```

---

