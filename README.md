# 💰 Tandem – Application de Budget Collaboratif pour Couples & Familles

**Tandem** est une application web et mobile pensée pour aider les couples et les familles à gérer leur budget partagé en toute simplicité, transparence et bienveillance.

---

## ✨ Fonctionnalités principales

- ✅ Authentification sécurisée (email / magic link)
- 👥 Groupes collaboratifs (couples, familles, colocations)
- 💸 Ajout de dépenses avec répartition automatique ou personnalisée
- 📊 Budgets mensuels par catégorie
- 🎯 Objectifs d’épargne à deux
- 🔔 Notifications intelligentes (dépassements, rappels)
- 📁 Export PDF/CSV des dépenses
- 💎 Abonnement Premium (via Stripe)

---

## 🛠️ Technologies utilisées

| Frontend       | Backend / BDD     | Paiement     | Notifications | Design       |
|----------------|-------------------|--------------|----------------|--------------|
| React (web)    | Supabase (PostgreSQL + Auth) | Stripe       | OneSignal / Expo Notifications | Figma (kit UI personnalisé) |
| React Native (Expo) | Supabase Storage / RLS |              |                | Tailwind CSS |

---

## 🧱 Structure du projet

```
/web         → Application React (interface web)
/mobile      → Application React Native (Expo)
/supabase    → Fichiers SQL, RLS, et config Edge Functions
/design      → Kit UI (Figma) et documentation visuelle
```

---

## 🚀 Lancement local

1. Clonez le repo :
```bash
git clone https://github.com/melaineberth/tandem.git
cd tandem
```

2. Configuration des variables d’environnement :
Créez un fichier `.env` dans chaque dossier `/web` et `/mobile` avec :
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
STRIPE_PUBLIC_KEY=...
```

3. Lancer le projet :
```bash
# Web
cd web && npm install && npm run dev

# Mobile
cd mobile && npm install && npx expo start
```

---

## 📐 Design & accessibilité

- Police principale : **Inter**
- Palette respectant WCAG AA/AAA (bleu #3B82F6, vert #10B981, rouge #EF4444, gris #1F2937)
- Design responsive, accessible, pensé pour mobile-first

---

## 📦 Feuille de route technique

> Voir les documents :
- [`Feuille_de_route_Developpement`](./docs/Developpement_Tandem.docx)
- [`Feuille_de_route_Detaillee`](./docs/Presentation_Tandem.docx)

---

## 💬 Rejoindre la bêta

Nous préparons une version bêta ouverte pour collecter vos retours. Rejoignez la liste d’attente ici : [tandem.app/beta](https://tandem.app/beta)

---

## 📄 Licence

Projet sous licence MIT. Créé avec ❤️ pour rapprocher les gens autour de leurs projets communs.
