from pathlib import Path

ROOT = Path("android/app/src/main")
JAVA = ROOT / "java/uk/kitcheninsights/app"
RES = ROOT / "res"

for path in [JAVA, RES / "layout", RES / "drawable", RES / "xml"]:
    path.mkdir(parents=True, exist_ok=True)

files = {
    JAVA / "MainActivity.java": r'''package uk.kitcheninsights.app;

import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String BASE_URL = "https://www.kitcheninsights.uk";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(KitchenInsightsWidgetPlugin.class);
        super.onCreate(savedInstanceState);
        routeWidgetIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        routeWidgetIntent(intent);
    }

    private void routeWidgetIntent(Intent intent) {
        if (intent == null) return;
        String path = intent.getStringExtra("ki_path");
        if (path == null || !path.startsWith("/") || getBridge() == null || getBridge().getWebView() == null) {
            return;
        }
        final String url = BASE_URL + path;
        getBridge().getWebView().postDelayed(() -> getBridge().getWebView().loadUrl(url), 120);
    }
}
''',
    JAVA / "KitchenInsightsWidgetPlugin.java": r'''package uk.kitcheninsights.app;

import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;

@CapacitorPlugin(name = "KitchenInsightsWidget")
public class KitchenInsightsWidgetPlugin extends Plugin {
    private static final String[] KEYS = new String[] {
        "locale", "workspace", "monthSpend", "stockValue", "actualCogs", "variance",
        "invoiceCount", "openOrders", "awaitingInvoice", "ordersDue", "stockAlerts",
        "costAlerts", "highPriority", "issue1", "issue2", "issue3", "updated"
    };

    @PluginMethod
    public void update(PluginCall call) {
        SharedPreferences.Editor editor = WidgetSupport.prefs(getContext()).edit();
        for (String key : KEYS) {
            String value = call.getString(key);
            if (value != null) editor.putString(key, value);
        }
        editor.apply();
        WidgetSupport.updateAll(getContext());
        call.resolve(new JSObject().put("updated", true));
    }
}
''',
    JAVA / "WidgetSupport.java": r'''package uk.kitcheninsights.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

public final class WidgetSupport {
    private WidgetSupport() {}

    static SharedPreferences prefs(Context context) {
        return context.getSharedPreferences("ki_widget", Context.MODE_PRIVATE);
    }

    static String value(SharedPreferences prefs, String key, String fallback) {
        String value = prefs.getString(key, null);
        return value == null || value.trim().isEmpty() ? fallback : value;
    }

    static boolean spanish(SharedPreferences prefs) {
        return "es".equalsIgnoreCase(value(prefs, "locale", "en"));
    }

    static PendingIntent open(Context context, String path, int requestCode) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.setAction("uk.kitcheninsights.app.widget." + requestCode + "." + path);
        intent.putExtra("ki_path", path);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(
            context,
            requestCode,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }

    static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] quick = manager.getAppWidgetIds(new ComponentName(context, QuickActionsWidget.class));
        for (int id : quick) QuickActionsWidget.render(context, manager, id);
        int[] today = manager.getAppWidgetIds(new ComponentName(context, KitchenTodayWidget.class));
        for (int id : today) KitchenTodayWidget.render(context, manager, id);
        int[] managerIds = manager.getAppWidgetIds(new ComponentName(context, ManagerOverviewWidget.class));
        for (int id : managerIds) ManagerOverviewWidget.render(context, manager, id);
    }
}
''',
    JAVA / "QuickActionsWidget.java": r'''package uk.kitcheninsights.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

public class QuickActionsWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        for (int id : appWidgetIds) render(context, manager, id);
    }

    static void render(Context context, AppWidgetManager manager, int id) {
        SharedPreferences prefs = WidgetSupport.prefs(context);
        boolean es = WidgetSupport.spanish(prefs);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_quick_actions);
        views.setTextViewText(R.id.widget_workspace, WidgetSupport.value(prefs, "workspace", "Kitchen Insights"));
        views.setTextViewText(R.id.widget_action_orders, es ? "Pedidos\nCrear y gestionar" : "Orders\nCreate & manage");
        views.setTextViewText(R.id.widget_action_invoice, es ? "Subir factura\nCámara o archivo" : "Upload invoice\nCamera or file");
        views.setTextViewText(R.id.widget_action_stock, es ? "Inventario\nNuevo conteo" : "Stock count\nStart a count");
        views.setTextViewText(R.id.widget_action_reports, es ? "Reportes\nCostos y margen" : "Reports\nCosts & margin");
        views.setTextViewText(R.id.widget_waiting, es ? "Atajos de cocina" : "Kitchen shortcuts");

        views.setOnClickPendingIntent(R.id.widget_quick_root, WidgetSupport.open(context, "/", 101));
        views.setOnClickPendingIntent(R.id.widget_action_orders, WidgetSupport.open(context, "/orders", 102));
        views.setOnClickPendingIntent(R.id.widget_action_invoice, WidgetSupport.open(context, "/invoices/upload", 103));
        views.setOnClickPendingIntent(R.id.widget_action_stock, WidgetSupport.open(context, "/stock", 104));
        views.setOnClickPendingIntent(R.id.widget_action_reports, WidgetSupport.open(context, "/reports", 105));
        manager.updateAppWidget(id, views);
    }
}
''',
    JAVA / "KitchenTodayWidget.java": r'''package uk.kitcheninsights.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

public class KitchenTodayWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        for (int id : appWidgetIds) render(context, manager, id);
    }

    static void render(Context context, AppWidgetManager manager, int id) {
        SharedPreferences prefs = WidgetSupport.prefs(context);
        boolean es = WidgetSupport.spanish(prefs);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_kitchen_today);
        views.setTextViewText(R.id.today_workspace, WidgetSupport.value(prefs, "workspace", "Kitchen Insights"));
        views.setTextViewText(R.id.today_updated, (es ? "Actualizado " : "Updated ") + WidgetSupport.value(prefs, "updated", "—"));
        views.setTextViewText(R.id.today_label_spend, es ? "Gasto mes" : "Month spend");
        views.setTextViewText(R.id.today_label_invoices, es ? "Facturas" : "Invoices");
        views.setTextViewText(R.id.today_label_orders, es ? "Pedidos próximos" : "Orders due");
        views.setTextViewText(R.id.today_label_stock, es ? "Alertas inventario" : "Stock alerts");
        views.setTextViewText(R.id.today_spend, WidgetSupport.value(prefs, "monthSpend", "—"));
        views.setTextViewText(R.id.today_invoices, WidgetSupport.value(prefs, "invoiceCount", "0"));
        views.setTextViewText(R.id.today_orders, WidgetSupport.value(prefs, "ordersDue", "0"));
        views.setTextViewText(R.id.today_stock, WidgetSupport.value(prefs, "stockAlerts", "0"));
        views.setTextViewText(R.id.today_order_action, es ? "+ Pedido" : "+ Order");
        views.setTextViewText(R.id.today_invoice_action, es ? "↑ Factura" : "↑ Invoice");
        views.setTextViewText(R.id.today_stock_action, es ? "□ Inventario" : "□ Stock");
        views.setTextViewText(R.id.today_recipe_action, es ? "◇ Recetas" : "◇ Recipes");

        views.setOnClickPendingIntent(R.id.today_root, WidgetSupport.open(context, "/", 201));
        views.setOnClickPendingIntent(R.id.today_order_action, WidgetSupport.open(context, "/orders", 202));
        views.setOnClickPendingIntent(R.id.today_invoice_action, WidgetSupport.open(context, "/invoices/upload", 203));
        views.setOnClickPendingIntent(R.id.today_stock_action, WidgetSupport.open(context, "/stock", 204));
        views.setOnClickPendingIntent(R.id.today_recipe_action, WidgetSupport.open(context, "/recipes", 205));
        manager.updateAppWidget(id, views);
    }
}
''',
    JAVA / "ManagerOverviewWidget.java": r'''package uk.kitcheninsights.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

public class ManagerOverviewWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        for (int id : appWidgetIds) render(context, manager, id);
    }

    static void render(Context context, AppWidgetManager manager, int id) {
        SharedPreferences prefs = WidgetSupport.prefs(context);
        boolean es = WidgetSupport.spanish(prefs);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_manager_overview);
        views.setTextViewText(R.id.manager_workspace, WidgetSupport.value(prefs, "workspace", "Kitchen Insights"));
        views.setTextViewText(R.id.manager_updated, (es ? "Actualizado " : "Updated ") + WidgetSupport.value(prefs, "updated", "—"));
        views.setTextViewText(R.id.manager_label_spend, es ? "Gasto del mes" : "Month spend");
        views.setTextViewText(R.id.manager_label_invoices, es ? "Por facturar" : "Awaiting invoice");
        views.setTextViewText(R.id.manager_label_cogs, es ? "Alertas de costo" : "Cost alerts");
        views.setTextViewText(R.id.manager_spend, WidgetSupport.value(prefs, "monthSpend", "—"));
        views.setTextViewText(R.id.manager_invoices, WidgetSupport.value(prefs, "awaitingInvoice", "0"));
        views.setTextViewText(R.id.manager_cogs, WidgetSupport.value(prefs, "costAlerts", "0"));
        views.setTextViewText(R.id.manager_attention, es ? "REQUIERE ATENCIÓN" : "NEEDS ATTENTION");
        views.setTextViewText(R.id.manager_issue1, "›  " + WidgetSupport.value(prefs, "issue1", es ? "Sin alertas prioritarias" : "No priority alerts"));
        views.setTextViewText(R.id.manager_issue2, "›  " + WidgetSupport.value(prefs, "issue2", es ? "Sin alertas prioritarias" : "No priority alerts"));
        views.setTextViewText(R.id.manager_issue3, "›  " + WidgetSupport.value(prefs, "issue3", es ? "Sin alertas prioritarias" : "No priority alerts"));
        views.setTextViewText(R.id.manager_open, es ? "Abrir app" : "Open app");
        views.setTextViewText(R.id.manager_reports, es ? "Ver reportes" : "View reports");

        views.setOnClickPendingIntent(R.id.manager_root, WidgetSupport.open(context, "/", 301));
        views.setOnClickPendingIntent(R.id.manager_issue1, WidgetSupport.open(context, "/insights", 302));
        views.setOnClickPendingIntent(R.id.manager_issue2, WidgetSupport.open(context, "/insights", 303));
        views.setOnClickPendingIntent(R.id.manager_issue3, WidgetSupport.open(context, "/insights", 304));
        views.setOnClickPendingIntent(R.id.manager_open, WidgetSupport.open(context, "/", 305));
        views.setOnClickPendingIntent(R.id.manager_reports, WidgetSupport.open(context, "/reports", 306));
        manager.updateAppWidget(id, views);
    }
}
''',
    RES / "drawable/widget_bg.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <gradient android:angle="0" android:startColor="#081A3D" android:endColor="#0E2A63" />
    <corners android:radius="22dp" />
    <stroke android:width="1dp" android:color="#315086" />
</shape>
''',
    RES / "drawable/widget_tile_dark.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="#182F5B" />
    <corners android:radius="14dp" />
    <stroke android:width="1dp" android:color="#35517D" />
</shape>
''',
    RES / "drawable/widget_tile_light.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="#F9FBFF" />
    <corners android:radius="14dp" />
</shape>
''',
    RES / "drawable/widget_blue.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <gradient android:angle="0" android:startColor="#1D4ED8" android:endColor="#2F79FF" />
    <corners android:radius="12dp" />
</shape>
''',
    RES / "drawable/widget_outline.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="#11264F" />
    <corners android:radius="12dp" />
    <stroke android:width="1dp" android:color="#45618D" />
</shape>
''',
    RES / "layout/widget_quick_actions.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/widget_quick_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="12dp"
    android:background="@drawable/widget_bg">

    <LinearLayout android:layout_width="match_parent" android:layout_height="48dp" android:orientation="horizontal" android:gravity="center_vertical">
        <TextView android:layout_width="42dp" android:layout_height="42dp" android:gravity="center" android:text="KI" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="17sp" android:background="@drawable/widget_blue" />
        <LinearLayout android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:orientation="vertical" android:paddingStart="10dp">
            <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Kitchen Insights" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="17sp" />
            <TextView android:id="@+id/widget_workspace" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Kitchen Insights" android:textColor="#B7C6E3" android:textSize="10sp" android:maxLines="1" />
        </LinearLayout>
        <TextView android:id="@+id/widget_waiting" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Kitchen shortcuts" android:textColor="#FF8A3D" android:textSize="10sp" />
    </LinearLayout>

    <LinearLayout android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:orientation="horizontal" android:paddingTop="8dp">
        <TextView android:id="@+id/widget_action_orders" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginEnd="5dp" android:gravity="center" android:padding="8dp" android:text="Orders\nCreate &amp; manage" android:textColor="#13254A" android:textStyle="bold" android:textSize="12sp" android:background="@drawable/widget_tile_light" />
        <TextView android:id="@+id/widget_action_invoice" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginStart="5dp" android:gravity="center" android:padding="8dp" android:text="Upload invoice\nCamera or file" android:textColor="#13254A" android:textStyle="bold" android:textSize="12sp" android:background="@drawable/widget_tile_light" />
    </LinearLayout>
    <LinearLayout android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:orientation="horizontal" android:paddingTop="8dp">
        <TextView android:id="@+id/widget_action_stock" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginEnd="5dp" android:gravity="center" android:padding="8dp" android:text="Stock count\nStart a count" android:textColor="#13254A" android:textStyle="bold" android:textSize="12sp" android:background="@drawable/widget_tile_light" />
        <TextView android:id="@+id/widget_action_reports" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginStart="5dp" android:gravity="center" android:padding="8dp" android:text="Reports\nCosts &amp; margin" android:textColor="#13254A" android:textStyle="bold" android:textSize="12sp" android:background="@drawable/widget_tile_light" />
    </LinearLayout>
</LinearLayout>
''',
    RES / "layout/widget_kitchen_today.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/today_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="12dp"
    android:background="@drawable/widget_bg">

    <LinearLayout android:layout_width="match_parent" android:layout_height="42dp" android:orientation="horizontal" android:gravity="center_vertical">
        <TextView android:layout_width="38dp" android:layout_height="38dp" android:gravity="center" android:text="KI" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="15sp" android:background="@drawable/widget_blue" />
        <LinearLayout android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:orientation="vertical" android:paddingStart="9dp">
            <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Kitchen Today" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="16sp" />
            <TextView android:id="@+id/today_workspace" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Kitchen Insights" android:textColor="#B7C6E3" android:textSize="9sp" android:maxLines="1" />
        </LinearLayout>
        <TextView android:id="@+id/today_updated" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Updated —" android:textColor="#AEBEDB" android:textSize="9sp" />
    </LinearLayout>

    <LinearLayout android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:orientation="horizontal" android:paddingTop="8dp">
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginEnd="3dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/today_label_spend" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Month spend" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/today_spend" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="5dp" android:text="—" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="17sp" android:maxLines="1" />
        </LinearLayout>
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginHorizontal="3dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/today_label_invoices" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Invoices" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/today_invoices" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="5dp" android:text="0" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="20sp" />
        </LinearLayout>
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginHorizontal="3dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/today_label_orders" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Orders due" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/today_orders" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="5dp" android:text="0" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="20sp" />
        </LinearLayout>
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginStart="3dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/today_label_stock" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Stock alerts" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/today_stock" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="5dp" android:text="0" android:textColor="#FF9A4D" android:textStyle="bold" android:textSize="20sp" />
        </LinearLayout>
    </LinearLayout>

    <LinearLayout android:layout_width="match_parent" android:layout_height="46dp" android:orientation="horizontal" android:paddingTop="7dp">
        <TextView android:id="@+id/today_order_action" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginEnd="3dp" android:gravity="center" android:text="+ Order" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="10sp" android:background="@drawable/widget_outline" />
        <TextView android:id="@+id/today_invoice_action" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginHorizontal="3dp" android:gravity="center" android:text="↑ Invoice" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="10sp" android:background="@drawable/widget_outline" />
        <TextView android:id="@+id/today_stock_action" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginHorizontal="3dp" android:gravity="center" android:text="□ Stock" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="10sp" android:background="@drawable/widget_outline" />
        <TextView android:id="@+id/today_recipe_action" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginStart="3dp" android:gravity="center" android:text="◇ Recipes" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="10sp" android:background="@drawable/widget_outline" />
    </LinearLayout>
</LinearLayout>
''',
    RES / "layout/widget_manager_overview.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/manager_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="12dp"
    android:background="@drawable/widget_bg">

    <LinearLayout android:layout_width="match_parent" android:layout_height="42dp" android:orientation="horizontal" android:gravity="center_vertical">
        <TextView android:layout_width="38dp" android:layout_height="38dp" android:gravity="center" android:text="KI" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="15sp" android:background="@drawable/widget_blue" />
        <LinearLayout android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:orientation="vertical" android:paddingStart="9dp">
            <TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Manager Overview" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="16sp" />
            <TextView android:id="@+id/manager_workspace" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Kitchen Insights" android:textColor="#B7C6E3" android:textSize="9sp" android:maxLines="1" />
        </LinearLayout>
        <TextView android:id="@+id/manager_updated" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Updated —" android:textColor="#AEBEDB" android:textSize="9sp" />
    </LinearLayout>

    <LinearLayout android:layout_width="match_parent" android:layout_height="72dp" android:orientation="horizontal" android:paddingTop="8dp">
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginEnd="4dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/manager_label_spend" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Month spend" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/manager_spend" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="4dp" android:text="—" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="16sp" android:maxLines="1" />
        </LinearLayout>
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginHorizontal="4dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/manager_label_invoices" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Awaiting invoice" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/manager_invoices" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="4dp" android:text="0" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="19sp" />
        </LinearLayout>
        <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginStart="4dp" android:orientation="vertical" android:padding="7dp" android:background="@drawable/widget_tile_dark">
            <TextView android:id="@+id/manager_label_cogs" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Cost alerts" android:textColor="#B7C6E3" android:textSize="9sp" />
            <TextView android:id="@+id/manager_cogs" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginTop="4dp" android:text="0" android:textColor="#FF9A4D" android:textStyle="bold" android:textSize="19sp" />
        </LinearLayout>
    </LinearLayout>

    <TextView android:id="@+id/manager_attention" android:layout_width="match_parent" android:layout_height="28dp" android:gravity="center_vertical" android:paddingStart="6dp" android:text="NEEDS ATTENTION" android:textColor="#FF9A4D" android:textStyle="bold" android:textSize="10sp" />
    <TextView android:id="@+id/manager_issue1" android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:gravity="center_vertical" android:paddingHorizontal="10dp" android:maxLines="1" android:ellipsize="end" android:text="›  No priority alerts" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="11sp" android:background="@drawable/widget_tile_dark" />
    <TextView android:id="@+id/manager_issue2" android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:layout_marginTop="4dp" android:gravity="center_vertical" android:paddingHorizontal="10dp" android:maxLines="1" android:ellipsize="end" android:text="›  No priority alerts" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="11sp" android:background="@drawable/widget_tile_dark" />
    <TextView android:id="@+id/manager_issue3" android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:layout_marginTop="4dp" android:gravity="center_vertical" android:paddingHorizontal="10dp" android:maxLines="1" android:ellipsize="end" android:text="›  No priority alerts" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="11sp" android:background="@drawable/widget_tile_dark" />

    <LinearLayout android:layout_width="match_parent" android:layout_height="45dp" android:orientation="horizontal" android:paddingTop="7dp">
        <TextView android:id="@+id/manager_open" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginEnd="4dp" android:gravity="center" android:text="Open app" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="11sp" android:background="@drawable/widget_blue" />
        <TextView android:id="@+id/manager_reports" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:layout_marginStart="4dp" android:gravity="center" android:text="View reports" android:textColor="#FFFFFF" android:textStyle="bold" android:textSize="11sp" android:background="@drawable/widget_outline" />
    </LinearLayout>
</LinearLayout>
''',
    RES / "xml/quick_actions_widget_info.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="180dp"
    android:minHeight="180dp"
    android:minResizeWidth="160dp"
    android:minResizeHeight="160dp"
    android:updatePeriodMillis="0"
    android:initialLayout="@layout/widget_quick_actions"
    android:previewLayout="@layout/widget_quick_actions"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen" />
''',
    RES / "xml/kitchen_today_widget_info.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="300dp"
    android:minHeight="150dp"
    android:minResizeWidth="250dp"
    android:minResizeHeight="130dp"
    android:updatePeriodMillis="0"
    android:initialLayout="@layout/widget_kitchen_today"
    android:previewLayout="@layout/widget_kitchen_today"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen" />
''',
    RES / "xml/manager_overview_widget_info.xml": r'''<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="300dp"
    android:minHeight="250dp"
    android:minResizeWidth="250dp"
    android:minResizeHeight="210dp"
    android:updatePeriodMillis="0"
    android:initialLayout="@layout/widget_manager_overview"
    android:previewLayout="@layout/widget_manager_overview"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen" />
''',
}

for path, content in files.items():
    path.write_text(content.strip() + "\n")

manifest = ROOT / "AndroidManifest.xml"
text = manifest.read_text()
receivers = r'''
        <receiver android:name=".QuickActionsWidget" android:exported="true">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>
            <meta-data android:name="android.appwidget.provider" android:resource="@xml/quick_actions_widget_info" />
        </receiver>
        <receiver android:name=".KitchenTodayWidget" android:exported="true">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>
            <meta-data android:name="android.appwidget.provider" android:resource="@xml/kitchen_today_widget_info" />
        </receiver>
        <receiver android:name=".ManagerOverviewWidget" android:exported="true">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>
            <meta-data android:name="android.appwidget.provider" android:resource="@xml/manager_overview_widget_info" />
        </receiver>
'''.strip()

if ".QuickActionsWidget" not in text:
    text = text.replace("</application>", receivers + "\n    </application>", 1)
    manifest.write_text(text)

print("Kitchen Insights Android widgets installed into generated project")
print(manifest.read_text())
