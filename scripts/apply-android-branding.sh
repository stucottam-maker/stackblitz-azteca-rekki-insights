#!/usr/bin/env bash

set -euo pipefail

res_dir="${1:-android/app/src/main/res}"

if [[ ! -d "$res_dir" ]]; then
  echo "Android resources directory not found: $res_dir" >&2
  exit 1
fi

mkdir -p \
  "$res_dir/values" \
  "$res_dir/drawable" \
  "$res_dir/mipmap-anydpi" \
  "$res_dir/mipmap-anydpi-v26" \
  "$res_dir/mipmap-anydpi-v33"

cat > "$res_dir/values/ki_colors.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ki_green">#214F3D</color>
    <color name="ki_orange">#BD5F31</color>
    <color name="ki_white">#FFFFFF</color>
</resources>
EOF

cat > "$res_dir/drawable/ki_launcher_foreground.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <!-- The mark stays inside Android's 66dp adaptive-icon safe circle. -->
    <path
        android:fillColor="#BD5F31"
        android:pathData="M32,22 H76 C81.523,22 86,26.477 86,32 V76 C86,81.523 81.523,86 76,86 H32 C26.477,86 22,81.523 22,76 V32 C22,26.477 26.477,22 32,22 Z" />
    <path
        android:fillColor="#FFFFFF"
        android:pathData="M36,36 H43 V72 H36 Z M43,53 L56,36 H65 L50,54 L66,72 H57 L43,56 Z M69,36 H76 V72 H69 Z" />
</vector>
EOF

cat > "$res_dir/drawable/ki_launcher_monochrome.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <!-- Android applies the user's themed-icon colour to this single-colour KI silhouette. -->
    <path
        android:fillColor="#FFFFFFFF"
        android:fillType="evenOdd"
        android:pathData="M32,22 H76 C81.523,22 86,26.477 86,32 V76 C86,81.523 81.523,86 76,86 H32 C26.477,86 22,81.523 22,76 V32 C22,26.477 26.477,22 32,22 Z M36,36 V72 H43 V56 L57,72 H66 L50,54 L65,36 H56 L43,53 V36 Z M69,36 V72 H76 V36 Z" />
</vector>
EOF

cat > "$res_dir/mipmap-anydpi/ic_launcher.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item>
        <shape android:shape="rectangle">
            <solid android:color="@color/ki_green" />
        </shape>
    </item>
    <item android:gravity="center" android:drawable="@drawable/ki_launcher_foreground" />
</layer-list>
EOF
cp "$res_dir/mipmap-anydpi/ic_launcher.xml" "$res_dir/mipmap-anydpi/ic_launcher_round.xml"

cat > "$res_dir/mipmap-anydpi-v26/ic_launcher.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ki_green" />
    <foreground android:drawable="@drawable/ki_launcher_foreground" />
</adaptive-icon>
EOF
cp "$res_dir/mipmap-anydpi-v26/ic_launcher.xml" "$res_dir/mipmap-anydpi-v26/ic_launcher_round.xml"

cat > "$res_dir/mipmap-anydpi-v33/ic_launcher.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ki_green" />
    <foreground android:drawable="@drawable/ki_launcher_foreground" />
    <monochrome android:drawable="@drawable/ki_launcher_monochrome" />
</adaptive-icon>
EOF
cp "$res_dir/mipmap-anydpi-v33/ic_launcher.xml" "$res_dir/mipmap-anydpi-v33/ic_launcher_round.xml"

cat > "$res_dir/drawable/ki_splash.xml" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item>
        <shape android:shape="rectangle">
            <solid android:color="@color/ki_green" />
        </shape>
    </item>
    <item android:width="144dp" android:height="144dp" android:gravity="center" android:drawable="@drawable/ki_launcher_foreground" />
</layer-list>
EOF

python3 - "$res_dir" <<'PY'
from pathlib import Path
import sys

res = Path(sys.argv[1])
for styles in res.glob("values*/styles.xml"):
    text = styles.read_text()
    text = text.replace("@drawable/splash", "@drawable/ki_splash")
    text = text.replace("@color/colorPrimaryDark", "@color/ki_green")
    text = text.replace("@color/colorPrimary", "@color/ki_green")
    text = text.replace("@mipmap/ic_launcher", "@drawable/ki_launcher_foreground")
    styles.write_text(text)
PY

echo "Applied neutral Kitchen Insights Android branding to $res_dir"
