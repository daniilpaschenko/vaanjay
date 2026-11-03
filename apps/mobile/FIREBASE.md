## Firebase Auth (OTP)
- Phone: **+91 12345 12345** 
- Code: **123456**

## iOS
- Bundle ID: `com.vaanjay.vaanjay`
- Конфиг: `ios/Runner/GoogleService-Info.plist` — скачивается из Firebase Console и **не коммитится** (уже в `.gitignore`).
- Файл добавлен в target `Runner` → Build Phases → Copy Bundle Resources.
- Сборка и запуск только на macOS + Xcode. OTP на iOS требует реального устройства, симулятор не поддерживается.
