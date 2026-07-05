# AppGestionStock - Application Mobile de Gestion de Stock

Application mobile cross-platform de gestion de stock développée avec **React Native**, **Expo** et **TypeScript**. Ce projet a été conçu dans le cadre d'un test technique, en mettant l'accent sur la robustesse du code, l'ergonomie mobile et la persistance des données.

---

## Instructions de Lancement

### Prérequis
Assurez-vous d'avoir installé sur votre machine :
- **Node.js** (v18 ou supérieur recommandé)
- **npm** ou **yarn**
- L'application **Expo Go** installée sur votre smartphone (disponible sur iOS et Android) pour le test physique.

### Installation
1. **Cloner le dépôt Git :**
   ```bash
   git clone https://github.com/Hassims/AppGestionStock.git
2. ** Installer les dépendances **
    ```bash
    npm install

3. ** Démarrage du server de développement **
    ```bash
    npx expo start

### Test
** Pour tester sur Mobile (Recommandé) : Scannez le QR Code affiché dans votre terminal à l'aide de l'application Expo Go (Android) ou de l'appareil photo natif (iOS). Assurez-vous que le serveur et le téléphone soient sous le même réseau local.

### Choix techniques
* Framework Principal : React Native (via Expo SDK)
* Langage : TypeScript
* Gestion d'État Globale : Zustand
* Persistance des Données : AsyncStorage couplé au middleware persist de Zustand
* Navigation : @react-navigation/native-stack
