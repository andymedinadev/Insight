# 🏗️ FooTalentGroup, Repositorio del SmartProject: Frontend

Cada desarrollador tiene su propia rama para evitar conflictos.

---

## 📌 Estructura de Ramas

🔹 **`main`** → Rama de producción (solo código estable).  
🔹 **`develop`** → Integración de cambios antes de pasar a `main`.  
🔹 **`dev-nombre`** → Rama personal de cada desarrollador.

---

## 🚀 Cómo Crear Tu Rama de Desarrollo

Cada desarrollador debe crear su propia rama basada en `develop`.

### 🔹 **1️⃣ Clonar el Repositorio**

Si aún no lo tienes en tu máquina:

```bash
git clone <URL-DEL-REPO>
cd <nombre-del-repo>
```

### 🔹 2️⃣ Descargar la Última Versión de develop

```bash
git checkout develop
git pull origin develop
```

### 🔹 3️⃣ Crear y Subir Tu Rama Personal

⚠️ Reemplaza mi-nombre con tu nombre o alias:

```bash
git checkout -b dev-mi-nombre
git push origin dev-mi-nombre
```

✅ Ejemplo real:

```bash
git checkout -b dev-adrian
git push origin dev-adrian
```

### 🔹 4️⃣ Verificar Que la Rama Se Creó Correctamente

```bash
git branch -a
```

Si todo salió bien, verás algo así:

```bash
* dev-adrian
  develop
  remotes/origin/main
  remotes/origin/develop
  remotes/origin/dev-alex
```

---

# 🔄 Flujo de Trabajo

## ⏬ 1️⃣ Antes de Comenzar a Trabajar

Siempre trae lo último de develop antes de hacer cambios:

```bash
git checkout develop
git pull origin develop
git checkout dev-mi-nombre
git merge develop
```

## 📌 2️⃣ Agregar Cambios y Subirlos

```bash
git add .
git commit -m "Descripción del cambio"
git push origin dev-mi-nombre
```

## 🔄 3️⃣ Unir Tu Rama a develop Cuando Esté Lista

⚠️ Solo haz esto cuando el código esté listo y probado.

```bash
git checkout main
git merge develop
git push origin main
```

---

# ❌ ¿Problemas con Conflictos?

Si hay conflictos al hacer merge, sigue estos pasos:

## 1️⃣ Git te mostrará los archivos con conflictos.

## 2️⃣ Edita los archivos manualmente y resuelve los conflictos.

## 3️⃣ Guarda los cambios y sigue con:

```bash
git add .
git commit -m "Resuelvo conflictos"
git push origin dev-mi-nombre
```
