# Kommee Android 1.0 release gates
Application ID: uk.co.kommee.app. Keep existing identity. This branch is preparation only, not an approved release.
## Native build
- Replace debug APK release with reproducible signed release AAB workflow; pin exact reviewed Capacitor versions and CI dependencies.
- Verify current Play target API, 16 KB page-size compatibility of native libraries, supported devices, versionCode and versionName.
- Set up Play App Signing and protect the upload key in a restricted CI environment. Never commit key material.
- Review Capacitor server.url usage (remote shell), navigation allowlists, camera permission denial, offline behaviour, session restoration and widget data clearing on logout. Preview widget deep links must not navigate to production.
- Run physical-device checks (Samsung/Pixel, small screens, different Android releases), including sign-in, workspace switching, upload, AM/PM checks, stock, costs, recipes, logout and widget privacy.
## Store and payment
- Consumption-only Android build: existing customers sign in; remove subscription purchase links and checkout from Android surfaces, including WebView navigation and deep links. Do not use a user agent alone for authorisation or billing enforcement.
- Confirm current Play policy and UK distribution requirements; website billing remains separate. No live Stripe billing until verified webhooks and provisioning are complete.
- Public privacy notice, deletion request path and in-app account deletion where required; distinguish legal record retention and shared business records. Audit actual data processing, permissions, AI/invoice processors and SDKs before Data Safety declaration.
- Developer identity verification, support email, 512px icon, 1024x500 feature graphic, actual screenshots, content rating, reviewer access to isolated sample restaurant.
- Internal test and any mandatory closed test, resolve pre-launch reports, then staged rollout.
- Website shows Coming soon on Google Play until listing is publicly available. Replace with official badge and verified link only after approval.
